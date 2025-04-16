<?php
require_once __DIR__ . '/../vendor/autoload.php';

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/../');
$dotenv->load();

$host = getenv('DBHOST');
$db = getenv('DBNAME');
$db_port = getenv('DBPORT');
$user = getenv('DBUSER');
$pass = getenv('DBPASS');

try {
    $pdo = new PDO("mysql:host=$host;port=$db_port;dbname=$db", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    return $pdo;
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Database connection failed: ' . $e->getMessage()]);
    exit;
}