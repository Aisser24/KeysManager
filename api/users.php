<?php
$pdo = require_once 'db.php';

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $statement = $pdo->query("SELECT * FROM mitarbeiter");
    $users = $statement->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($users);
} elseif ($method === 'POST') {
    // Beispiel: Neuen User erstellen
    $data = json_decode(file_get_contents("php://input"), true);
    echo json_encode([
        "message" => "User created",
        "user" => $data
    ]);
} else {
    http_response_code(405);
    echo json_encode(["message" => "Method not allowed"]);
}
