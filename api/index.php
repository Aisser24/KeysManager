<?php
require_once 'Router.php';
require_once 'handlers.php';
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *'); // Erlaubt Zugriff von allen Domains
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

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

$router->dispatch($_SERVER['REQUEST_METHOD'], $_SERVER['PATH_INFO']);