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
define('PAYPAL_CLIENT_ID', 'Ae7N67KpGasmFOKugvismAQClIY1Sr28FZKLx0m79gNErCuZBBSqkgO9p0gaiyr_UPijGMsr-p2Rdrqj');
define('PAYPAL_SECRET',    'EEMfCa2EnWQkVqc_mvgHCXL-SmyCFi2J57x4c7EdOwQf9hZZ4Gtm_hIE97v27YSlGUMnpzbrabFXWvRb');
define('PAYPAL_MODE',      'sandbox'); // ndrysho ne 'live' per prodhim
 
// SMTP (Gmail)
define('SMTP_HOST', 'smtp.gmail.com');
define('SMTP_USER', 'postaweb.finiteloop@gmail.com');
define('SMTP_PASS', 'VENDOS_KETU_APP_PASSWORD');
define('SMTP_PORT', 587);
 
// Site
define('SITE_URL', 'http://localhost/ProjektiWEB');
define('SITE_NAME', 'PostaWeb');
 ?>