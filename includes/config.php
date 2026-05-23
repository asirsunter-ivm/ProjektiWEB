<?php
// Database
define('DB_HOST', 'localhost');
define('DB_NAME', 'postaweb');
define('DB_USER', 'root');
define('DB_PASS', '');
 
// Encryption key (32 karaktere - mos e ndrysho pas instalimit!)
define('ENCRYPTION_KEY', 'PostaWeb_AES_Key_2026_FiniteLoop!');
define('ENCRYPTION_CIPHER', 'AES-256-CBC');
 
// PayPal Sandbox
define('PAYPAL_CLIENT_ID', 'VENDOS_KETU_PAYPAL_CLIENT_ID');
define('PAYPAL_SECRET',    'VENDOS_KETU_PAYPAL_SECRET');
define('PAYPAL_MODE',      'sandbox'); // ndrysho ne 'live' per prodhim
 
// SMTP (Gmail)
define('SMTP_HOST', 'smtp.gmail.com');
define('SMTP_USER', 'darliselman@gmail.com');
define('SMTP_PASS', 'gqzq ytvf anwa jila');
define('SMTP_PORT', 587);
 
// Site
define('SITE_URL', 'http://localhost/postaweb');
define('SITE_NAME', 'PostaWeb');
 ?>