<?php

class Router
{
    private $routes = [];
    private $prefix = '';

    public function __construct($prefix = '')
    {
        $this->prefix = $prefix;
    }

    public function add($method, $path, $handler): void
    {
        $pattern = preg_replace('#\{[^/]+\}#', '([^/]+)', $path);
        $pattern = "#^" . $this->prefix . $pattern . "$#";
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

    public function dispatch($method, $uri): void
    {
        foreach ($this->routes as $route) {
            if ($method === $route['method'] && preg_match($route['pattern'], $uri, $matches)) {
                array_shift($matches);
                $params = array_combine($route['params'], $matches);
                call_user_func_array($route['handler'], $params);
                return;
            }
        }

        http_response_code(404);
        echo json_encode(['error' => 'Not Found']);
    }
}