<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

require_once 'Router.php';
require_once 'handlers.php';

// CORS Headers
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Set JSON content type for API responses
header('Content-Type: application/json');

// Debug logging
error_log("=== API Request Debug ===");
error_log("Request Method: " . $_SERVER['REQUEST_METHOD']);
error_log("Request URI: " . $_SERVER['REQUEST_URI']);
error_log("PATH_INFO: " . ($_SERVER['PATH_INFO'] ?? 'not set'));
error_log("Script Name: " . $_SERVER['SCRIPT_NAME']);

// Get the path - try different methods
$path = '';
if (isset($_SERVER['PATH_INFO'])) {
    $path = $_SERVER['PATH_INFO'];
} elseif (isset($_SERVER['REQUEST_URI'])) {
    $path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
    // Remove the script name if it's part of the path
    if (isset($_SERVER['SCRIPT_NAME'])) {
        $script_dir = dirname($_SERVER['SCRIPT_NAME']);
        if ($script_dir !== '/' && strpos($path, $script_dir) === 0) {
            $path = substr($path, strlen($script_dir));
        }
    }
}

// Ensure path starts with /
if (empty($path) || $path[0] !== '/') {
    $path = '/' . $path;
}

error_log("Final path: $path");

$router = new Router('/api');

// Tokens
$router->add("GET", "/tokens", "listTokens");
$router->add("GET", "/tokens/{id}", "getToken");
$router->add("POST", "/tokens", "createToken");
$router->add("PUT", "/tokens/{id}", "updateToken");
$router->add("DELETE", "/tokens/{id}", "deleteToken");
$router->add("GET", "/tokens/{id}/history", "getTokenHistory");
$router->add("GET", "/tokens/types/", "getTokenTypes");
$router->add("GET", "/tokens/available/", "getAvailableTokens");

// Mitarbeiter
$router->add("GET", "/mitarbeiter", "listMitarbeiter");
$router->add("GET", "/mitarbeiter/{id}", "getMitarbeiter");
$router->add("GET", "/mitarbeiter/{id}/tokens", "getMitarbeiterTokens");

// Token Assignments
$router->add("GET", "/assignments", "listAssignments");
$router->add("GET", "/assignments/active", "listActiveAssignments");
$router->add("POST", "/assignments", "createAssignment");
$router->add("PUT", "/assignments/return", "returnToken");

// Exports
$router->add("GET", "/exports/xlsx", "exportXlsx");

// Test Route
$router->add("GET", "/test", "testRoute");

try {
    $router->dispatch($_SERVER['REQUEST_METHOD'], $path);
} catch (Exception $e) {
    error_log("Router exception: " . $e->getMessage());
    http_response_code(500);
    echo json_encode(['error' => 'Internal server error', 'message' => $e->getMessage()]);
}