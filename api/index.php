<?php
require_once 'Router.php';
require_once 'handlers.php';
header('Content-Type: application/json');

$router = new Router('/api');

// Tokens
$router->add("GET", "/tokens", "listTokens");
$router->add("GET", "/tokens/{id}", "getToken");
$router->add("POST", "/tokens", "createToken");
$router->add("PUT", "/tokens/{id}", "updateToken");
$router->add("DELETE", "/tokens/{id}", "deleteToken");
$router->add("GET", "/tokens/{id}/history", "getTokenHistory");

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