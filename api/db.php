<?php
require_once __DIR__ . '/vendor/autoload.php';

$envPath = __DIR__;  // Ändere dies - kein Slash am Ende

try {
    if (file_exists($envPath . '/.env')) {
        $dotenv = Dotenv\Dotenv::createImmutable($envPath);
        $dotenv->load();
        error_log('Loaded .env file from ' . $envPath);
    } else {
        error_log('Warning: .env file not found at ' . $envPath);
    }

    $host = $_ENV['DBHOST'] ?? 'db';
    $db = $_ENV['DBNAME'] ?? 'keysmanager';
    $db_port = $_ENV['DBPORT'] ?? '3306';
    $user = $_ENV['DBUSER'] ?? 'phpstorm_user';
    $pass = $_ENV['DBPASS'] ?? 'phpstorm';

    $pdo = new PDO("mysql:host=$host;port=$db_port;dbname=$db", $user, $pass);

    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    return $pdo;
} catch (PDOException $e) {
    http_response_code(500);
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');
    $debug = [
        'error' => 'Database connection failed: ' . $e->getMessage(),
        'env_file_exists' => file_exists($envPath . '/.env'),
        'env_path' => $envPath,
        'host' => $host ?? 'not set',
        'db' => $db ?? 'not set',
        'user' => $user ?? 'not set',
        'pass' => ($pass ?? 'not set') ? '[hidden]' : 'not set'
    ];
    echo json_encode($debug);
    exit;
}