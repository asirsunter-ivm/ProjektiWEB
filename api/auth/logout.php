<?php
require_once __DIR__ . '/../../includes/session.php';
 
session_unset();
session_destroy();
 
// Nese eshte AJAX request
if (!empty($_SERVER['HTTP_X_REQUESTED_WITH']) &&
    strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) === 'xmlhttprequest') {
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode(['success' => true, 'redirect' => '/postaweb/index.php']);
} else {
    header('Location: /postaweb/index.php');
}
exit;
?>