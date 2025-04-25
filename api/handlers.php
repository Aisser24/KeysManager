<?php
require_once __DIR__ . '/../vendor/autoload.php';
$pdo = require_once 'db.php';
if (!$pdo) {
    http_response_code(500);
    echo json_encode(['error' => 'Database connection failed']);
    exit;
}

//###### EXCEL ######
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
function getColumnLetter($colIndex) {
    return \PhpOffice\PhpSpreadsheet\Cell\Coordinate::stringFromColumnIndex($colIndex);
}
//###################

// Tokens
function listTokens(): void
{
    global $pdo;

    $sql = "SELECT token_id, token_number, token_type, token_description, added_date FROM tokens where is_active = 1";
    $stmt = $pdo->prepare($sql);
    $stmt->execute();
    $tokens = $stmt->fetchAll(PDO::FETCH_ASSOC);
    if ($tokens) {
        echo json_encode($tokens);
    } else {
        http_response_code(404);
        echo json_encode(['error' => 'No tokens found']);
    }
}
function getToken($id): void
{
    global $pdo;

    $sql = "SELECT * FROM tokens WHERE token_id = ?";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$id]);
    $token = $stmt->fetch(PDO::FETCH_ASSOC);
    if ($token) {
        echo json_encode($token);
    } else {
        http_response_code(404);
        echo json_encode(['error' => 'Token not found']);
    }
}
function createToken(): void
{
    global $pdo;

    $data = json_decode(file_get_contents('php://input'), true);
    if (!isset($data['token_number'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Token is required']);
        return;
    }

    $token_number = $data['token_number'];
    $token_type = $data['token_type'] ?? null;
    $token_description = $data['token_description'] ?? null;

    $sql = "INSERT INTO tokens (token_number, token_type, token_description) VALUES (?, ?, ?)";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$token_number, $token_type, $token_description]);
    $id = $pdo->lastInsertId();
    if ($id) {
        http_response_code(201);
        echo json_encode([
            'token_id' => $id,
            'token_number' => $token_number,
            'token_type' => $token_type,
            'token_description' => $token_description
        ]);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to create token']);
    }
}
function updateToken($id): void
{
    global $pdo;

    $original_sql = "SELECT * FROM tokens WHERE token_id = ?";
    $original_stmt = $pdo->prepare($original_sql);
    $original_stmt->execute([$id]);
    $original_token = $original_stmt->fetch(PDO::FETCH_ASSOC);
    if (!$original_token) {
        http_response_code(404);
        echo json_encode(['error' => 'Token not found']);
        return;
    }

    $data = json_decode(file_get_contents('php://input'), true);

    $token_number = $data['token_number'] ?? $original_token['token_number'];
    $token_type = $data['token_type'] ?? $original_token['token_type'];
    $token_description = $data['token_description'] ?? $original_token['token_description'];

    $sql = "UPDATE tokens SET token_number = ?, token_type = ?, token_description = ? WHERE token_id = ?";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$token_number, $token_type, $token_description, $id]);

    if ($stmt->rowCount()) {
        http_response_code(200);
        echo json_encode([
            'token_id' => $id,
            'token_number' => $token_number,
            'token_type' => $token_type,
            'token_description' => $token_description
        ]);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to update token']);
    }
}
function deleteToken($id): void
{
    global $pdo;

    $check_sql = "SELECT * FROM tokens WHERE token_id = ?";
    $check_stmt = $pdo->prepare($check_sql);
    $check_stmt->execute([$id]);
    $token = $check_stmt->fetch(PDO::FETCH_ASSOC);
    if (!$token) {
        http_response_code(404);
        echo json_encode(['error' => 'Token not found']);
        return;
    }

    $sql = "UPDATE tokens SET is_active = 0, deleted_date = current_date WHERE token_id = ?";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$id]);
    if ($stmt->rowCount()) {
        http_response_code(200);
        echo json_encode(['message' => 'Token deleted successfully']);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to delete token']);
    }
}
function getTokenHistory($id): void
{
    global $pdo;

    $check_sql = "SELECT * FROM tokens WHERE token_id = ?";
    $check_stmt = $pdo->prepare($check_sql);
    $check_stmt->execute([$id]);
    $token = $check_stmt->fetch(PDO::FETCH_ASSOC);
    if (!$token) {
        http_response_code(404);
        echo json_encode(['error' => 'Token not found']);
        return;
    }

    $sql = "SELECT ka.mitarbeiter_id, ka.ausgabedatum, ka.rueckgabedatum
            FROM keyassignments ka
            WHERE ka.token_id = ?";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$id]);
    $history = $stmt->fetchAll(PDO::FETCH_ASSOC);
    if ($history) {
        echo json_encode($history);
    } else {
        http_response_code(404);
        echo json_encode(['error' => 'No history found for this token']);
    }
}
function getTokenTypes(): void {
    global $pdo;

    $sql = "SELECT DISTINCT token_type FROM tokens where is_active = 1";
    $stmt = $pdo->prepare($sql);
    $stmt->execute();
    $tokens = $stmt->fetchAll(PDO::FETCH_COLUMN);
    if ($tokens) {
        echo json_encode($tokens);
    } else {
        echo json_encode([]);
    }
}

// Mitarbeiter
function listMitarbeiter(): void
{
    global $pdo;

    $sql = "SELECT mitarbeiter_id, vorname, nachname, email, position FROM mitarbeiter where status = 0";
    $stmt = $pdo->prepare($sql);
    $stmt->execute();
    $mitarbeiter = $stmt->fetchAll(PDO::FETCH_ASSOC);
    if ($mitarbeiter) {
        echo json_encode($mitarbeiter);
    } else {
        http_response_code(404);
        echo json_encode(['error' => 'No mitarbeiter found']);
    }
}
function getMitarbeiter($id): void
{
    global $pdo;

    $sql = "SELECT mitarbeiter_id, vorname, nachname, email, position FROM mitarbeiter WHERE mitarbeiter_id = ?";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$id]);
    $mitarbeiter = $stmt->fetch(PDO::FETCH_ASSOC);
    if ($mitarbeiter) {
        echo json_encode($mitarbeiter);
    } else {
        http_response_code(404);
        echo json_encode(['error' => 'Mitarbeiter not found']);
    }
}
function getMitarbeiterTokens($id): void
{
    global $pdo;

    $check_sql = "SELECT * FROM mitarbeiter WHERE mitarbeiter_id = ?";
    $check_stmt = $pdo->prepare($check_sql);
    $check_stmt->execute([$id]);
    $mitarbeiter = $check_stmt->fetch(PDO::FETCH_ASSOC);
    if (!$mitarbeiter) {
        http_response_code(404);
        echo json_encode(['error' => 'Mitarbeiter not found']);
        return;
    }

    $sql = "SELECT t.token_id, t.token_number, t.token_type, t.token_description, ka.ausgabedatum, ka.rueckgabedatum
            FROM tokens t
            JOIN keyassignments ka ON t.token_id = ka.token_id
            WHERE ka.mitarbeiter_id = ?";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$id]);
    $tokens = $stmt->fetchAll(PDO::FETCH_ASSOC);
    if ($tokens) {
        echo json_encode($tokens);
    } else {
        http_response_code(404);
        echo json_encode(['error' => 'No tokens found for this mitarbeiter']);
    }
}

// Token Assignments
function listAssignments(): void
{
    global $pdo;

    $sql = "SELECT * from keyassignments";
    $stmt = $pdo->prepare($sql);
    $stmt->execute();
    $assignments = $stmt->fetchAll(PDO::FETCH_ASSOC);
    if ($assignments) {
        echo json_encode($assignments);
    } else {
        http_response_code(404);
        echo json_encode(['error' => 'No assignments found']);
    }
}
function listActiveAssignments(): void
{
    global $pdo;

    $sql = "
    SELECT 
        ka.token_id, 
        ka.mitarbeiter_id, 
        ka.ausgabedatum, 
        m.vorname, 
        m.nachname, 
        t.token_type, 
        t.token_number, 
        t.token_description
    FROM keyassignments ka
    JOIN mitarbeiter m ON ka.mitarbeiter_id = m.mitarbeiter_id
    JOIN tokens t ON ka.token_id = t.token_id
    WHERE ka.rueckgabedatum IS NULL
";
    $stmt = $pdo->prepare($sql);
    $stmt->execute();
    $assignments = $stmt->fetchAll(PDO::FETCH_ASSOC);
    if ($assignments) {
        echo json_encode($assignments);
    } else {
        http_response_code(404);
        echo json_encode(['error' => 'No active assignments found']);
    }
}
function createAssignment(): void
{
    global $pdo;

    $data = json_decode(file_get_contents('php://input'), true);
    if (!isset($data['mitarbeiter_id']) || !isset($data['token_id'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Mitarbeiter ID and Token ID are required']);
        return;
    }

    $mitarbeiter_id = $data['mitarbeiter_id'];
    $token_id = $data['token_id'];

    // Check if mitarbeiter_id and token_id exist
    $check_mitarbeiter_sql = "SELECT * FROM mitarbeiter WHERE mitarbeiter_id = ?";
    $check_mitarbeiter_stmt = $pdo->prepare($check_mitarbeiter_sql);
    $check_mitarbeiter_stmt->execute([$mitarbeiter_id]);
    $mitarbeiter = $check_mitarbeiter_stmt->fetch();
    if (!$mitarbeiter) {
        http_response_code(404);
        echo json_encode(['error' => 'Mitarbeiter not found']);
        return;
    }

    $check_token_sql = "SELECT * FROM tokens WHERE token_id = ?";
    $check_token_stmt = $pdo->prepare($check_token_sql);
    $check_token_stmt->execute([$token_id]);
    $token = $check_token_stmt->fetch();
    if (!$token) {
        http_response_code(404);
        echo json_encode(['error' => 'Token not found']);
        return;
    }

    // Check if the token is already assigned
    $check_assignment_sql = "SELECT * FROM keyassignments WHERE token_id = ? AND rueckgabedatum IS NULL";
    $check_assignment_stmt = $pdo->prepare($check_assignment_sql);
    $check_assignment_stmt->execute([$token_id]);
    $existing_assignment = $check_assignment_stmt->fetch();
    if ($existing_assignment) {
        http_response_code(409);
        echo json_encode(['error' => 'Token is already assigned']);
        return;
    }

    $sql = "INSERT INTO keyassignments (mitarbeiter_id, token_id) VALUES (?, ?)";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$mitarbeiter_id, $token_id]);
    if ($stmt->rowCount()) {
        http_response_code(201);
        echo json_encode(['message' => 'Assignment created successfully']);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to create assignment']);
    }
}
function returnToken(): void
{
    global $pdo;

    $data = json_decode(file_get_contents('php://input'), true);
    if (!isset($data['mitarbeiter_id']) || !isset($data['token_id'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Mitarbeiter ID and Token ID are required']);
        return;
    }

    $mitarbeiter_id = $data['mitarbeiter_id'];
    $token_id = $data['token_id'];

    // Check if the assignment exists
    $check_assignment_sql = "SELECT * FROM keyassignments WHERE mitarbeiter_id = ? AND token_id = ? AND rueckgabedatum IS NULL";
    $check_assignment_stmt = $pdo->prepare($check_assignment_sql);
    $check_assignment_stmt->execute([$mitarbeiter_id, $token_id]);
    $assignment = $check_assignment_stmt->fetch();
    if (!$assignment) {
        http_response_code(404);
        echo json_encode(['error' => 'Assignment not found']);
        return;
    }

    // Update the assignment with the return date
    $sql = "UPDATE keyassignments SET rueckgabedatum = current_date WHERE mitarbeiter_id = ? AND token_id = ? AND rueckgabedatum IS NULL";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$mitarbeiter_id, $token_id]);
    if ($stmt->rowCount()) {
        http_response_code(200);
        echo json_encode(['message' => 'Token returned successfully']);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to return token']);
    }
}

// Exports
function exportXlsx(): void
{
    global $pdo;

    $sql = "
        SELECT
            t.token_id,
            t.token_number,
            t.token_type,
            t.token_description,
            m.vorname,
            m.nachname,
            k.ausgabedatum
        FROM mitarbeiter m
        JOIN keyassignments k ON m.mitarbeiter_id = k.mitarbeiter_id
        JOIN tokens t ON k.token_id = t.token_id
        WHERE k.rueckgabedatum is NULL
    ";
    $stmt = $pdo->prepare($sql);
    $stmt->execute();
    $data = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if ($data) {
        $spreadsheet = new Spreadsheet();
        $sheet = $spreadsheet->getActiveSheet();

        $headers = array_keys($data[0]);
        foreach ($headers as $i => $header) {
            $columnLetter = getColumnLetter($i + 1); // index starts from 1
            $sheet->setCellValue($columnLetter . '1', $header);
        }

        $row = 2;
        foreach ($data as $item) {
            foreach ($headers as $i => $key) {
                $columnLetter = getColumnLetter($i + 1);
                $sheet->setCellValue($columnLetter . $row, $item[$key]);
            }
            $row++;
        }


        $writer = new Xlsx($spreadsheet);
        header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        header('Content-Disposition: attachment;filename="tokens_export.xlsx"');
        header('Cache-Control: max-age=0');
        header('Expires: Fri, 11 Nov 1981 00:00:00 GMT');
        header('Last-Modified: ' . gmdate('D, d M Y H:i:s') . ' GMT');
        header('Cache-Control: cache, must-revalidate');
        header('Pragma: public');

        $writer->save('php://output');
    } else {
        http_response_code(404);
        echo json_encode(['error' => 'No data found for export']);
    }
}