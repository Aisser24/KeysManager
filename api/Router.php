<?php

class Router
{
    private $routes = [];
    private $prefix = '';

    public function __construct($prefix = '')
    {
        $this->prefix = rtrim($prefix, '/');
    }

    public function add($method, $path, $handler): void
    {
        // Convert route parameters to regex pattern
        $pattern = preg_replace('#\{([^/]+)\}#', '(?P<$1>[^/]+)', $path);
        $pattern = "#^" . preg_quote($this->prefix, '#') . $pattern . "$#";
        
        $this->routes[] = [
            'method' => $method,
            'pattern' => $pattern,
            'handler' => $handler,
            'params' => $this->extractParams($path)
        ];
    }

    public function extractParams($path): array
    {
        preg_match_all('#\{([^/]+)\}#', $path, $matches);
        return $matches[1];
    }

    public function dispatch($method, $path_info = null)
    {
        // Get the URI from REQUEST_URI or PATH_INFO
        $uri = $path_info ?? $_SERVER['REQUEST_URI'] ?? '/';
        
        // Remove query parameters
        $uri = parse_url($uri, PHP_URL_PATH);
        
        // Debug output (remove in production)
        error_log("Router Debug - Method: $method, URI: $uri, Prefix: {$this->prefix}");
        
        foreach ($this->routes as $route) {
            error_log("Checking route pattern: " . $route['pattern']);
            
            if ($method === $route['method'] && preg_match($route['pattern'], $uri, $matches)) {
                // Remove the full match from the beginning
                array_shift($matches);
                
                // Extract named parameters
                $params = [];
                foreach ($route['params'] as $param) {
                    if (isset($matches[$param])) {
                        $params[] = $matches[$param];
                    }
                }
                
                error_log("Route matched! Calling handler: " . $route['handler']);
                call_user_func_array($route['handler'], $params);
                return;
            }
        }

        error_log("No route matched for: $method $uri");
        http_response_code(404);
        echo json_encode(['error' => 'Route not found', 'method' => $method, 'uri' => $uri]);
    }
}