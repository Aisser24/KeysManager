<?php
header('Content-Type: application/json');
$method = $_SERVER['REQUEST_METHOD'];

$path_info = isset($_SERVER['PATH_INFO']) ? $_SERVER['PATH_INFO'] : '';
$request = explode('/', trim($path_info, '/'));

if (empty($request[0])) {
    // Either show API info or redirect to documentation
    echo json_encode([
        'status' => 'API is running',
        'available_endpoints' => [
            '/users' => 'User management endpoints'
            // Add other endpoints as you create them
        ]
    ]);
    exit;
}

switch ($request[0]) {
    case 'users':
        require_once 'users.php';
        break;
    default:
        http_response_code(404);
        echo json_encode(['error' => 'Not Found']);
        break;
}