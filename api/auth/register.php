<?php
require_once __DIR__ . '/../../includes/db.php';
require_once __DIR__ . '/../../includes/session.php';
require_once __DIR__ . '/../../includes/crypto.php';
 
header('Content-Type: application/json; charset=utf-8');
 
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'message' => 'Metode e gabuar.']);
    exit;
}
 
$full_name = trim($_POST['full_name'] ?? '');
$email     = trim($_POST['email']     ?? '');
$password  = $_POST['password']       ?? '';
$phone     = trim($_POST['phone']     ?? '');
$city_id   = (int)($_POST['city_id'] ?? 0);
 
// Validim
if (empty($full_name) || strlen($full_name) < 2) {
    echo json_encode(['success' => false, 'message' => 'Emri eshte i detyrueshem (min 2 karaktere).']);
    exit;
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['success' => false, 'message' => 'Email i pavlefshem.']);
    exit;
}
if (strlen($password) < 8) {
    echo json_encode(['success' => false, 'message' => 'Fjalekalimi duhet te kete min 8 karaktere.']);
    exit;
}
 
// Kontroll duplikat email
$stmt = $pdo->prepare('SELECT id FROM users WHERE email = ?');
$stmt->execute([$email]);
if ($stmt->fetch()) {
    echo json_encode(['success' => false, 'message' => 'Ky email eshte regjistruar me pare.']);
    exit;
}
 
// Enkriptim
$password_hash    = password_hash($password, PASSWORD_DEFAULT);
$phone_encrypted  = !empty($phone) ? encryptData($phone) : null;
$city_id_val      = $city_id > 0 ? $city_id : null;
 
// Insert
$stmt = $pdo->prepare(
    'INSERT INTO users (full_name, email, password_hash, phone_encrypted, city_id, role)
     VALUES (?, ?, ?, ?, ?, "client")'
);
$stmt->execute([$full_name, $email, $password_hash, $phone_encrypted, $city_id_val]);
 
$userId = $pdo->lastInsertId();
 
// Krijo sesion
session_regenerate_id(true);
$_SESSION['user_id']   = $userId;
$_SESSION['full_name'] = $full_name;
$_SESSION['email']     = $email;
$_SESSION['role']      = 'client';
 
echo json_encode([
    'success'  => true,
    'message'  => 'Regjistrimi u krye me sukses!',
    'redirect' => SITE_URL . '/dashboard.php'
]);
?>