
CREATE DATABASE IF NOT EXISTS postaweb 
    CHARACTER SET utf8mb4 
    COLLATE utf8mb4_unicode_ci;

USE postaweb;


DROP TABLE IF EXISTS contact_messages;
DROP TABLE IF EXISTS notifications;
DROP TABLE IF EXISTS return_requests;
DROP TABLE IF EXISTS tracking_history;
DROP TABLE IF EXISTS packages;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS cities;
DROP TABLE IF EXISTS countries;
DROP TABLE IF EXISTS package_types;


CREATE TABLE countries (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(80) UNIQUE NOT NULL,
    iso_code CHAR(2) UNIQUE NOT NULL
) ENGINE=InnoDB;


CREATE TABLE cities (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(80) NOT NULL,
    country_id INT NOT NULL,
    UNIQUE KEY uniq_city (name, country_id),
    FOREIGN KEY (country_id) REFERENCES countries(id) ON DELETE RESTRICT
) ENGINE=InnoDB;


CREATE TABLE package_types (
    id INT AUTO_INCREMENT PRIMARY KEY,
    type_name VARCHAR(50) UNIQUE NOT NULL,
    base_price DECIMAL(10,2) NOT NULL,
    description VARCHAR(255)
) ENGINE=InnoDB;



CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    phone_encrypted TEXT,
    address_encrypted TEXT,
    city_id INT,
    role ENUM('client','admin') DEFAULT 'client',
    profile_image VARCHAR(255) DEFAULT NULL,
    is_active TINYINT(1) DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (city_id) REFERENCES cities(id) ON DELETE SET NULL,
    INDEX idx_email (email),
    INDEX idx_role (role)
) ENGINE=InnoDB;


CREATE TABLE packages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tracking_code VARCHAR(20) UNIQUE NOT NULL,
    sender_id INT NOT NULL,
    receiver_name VARCHAR(100) NOT NULL,
    receiver_email VARCHAR(150),
    receiver_phone_encrypted TEXT,
    receiver_address_encrypted TEXT NOT NULL,
    receiver_city_id INT NOT NULL,
    package_type_id INT NOT NULL,
    weight_kg DECIMAL(6,2) NOT NULL,
    length_cm DECIMAL(6,2),
    width_cm DECIMAL(6,2),
    height_cm DECIMAL(6,2),
    declared_value DECIMAL(10,2) DEFAULT 0,
    description TEXT,
    shipping_cost DECIMAL(10,2) NOT NULL,
    payment_status ENUM('pending','paid','failed','refunded') DEFAULT 'pending',
    payment_id VARCHAR(100) DEFAULT NULL,
    current_status ENUM('created','picked_up','in_transit','out_for_delivery','delivered','returned','cancelled') DEFAULT 'created',
    label_path VARCHAR(255) DEFAULT NULL,
    notes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    delivered_at DATETIME DEFAULT NULL,
    FOREIGN KEY (sender_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (receiver_city_id) REFERENCES cities(id) ON DELETE RESTRICT,
    FOREIGN KEY (package_type_id) REFERENCES package_types(id) ON DELETE RESTRICT,
    INDEX idx_tracking (tracking_code),
    INDEX idx_status (current_status),
    INDEX idx_sender (sender_id)
) ENGINE=InnoDB;


CREATE TABLE tracking_history (
    id INT AUTO_INCREMENT PRIMARY KEY,
    package_id INT NOT NULL,
    status VARCHAR(50) NOT NULL,
    location VARCHAR(150),
    note TEXT,
    updated_by INT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (package_id) REFERENCES packages(id) ON DELETE CASCADE,
    FOREIGN KEY (updated_by) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_package (package_id)
) ENGINE=InnoDB;


CREATE TABLE return_requests (
    id INT AUTO_INCREMENT PRIMARY KEY,
    package_id INT NOT NULL UNIQUE,
    reason TEXT NOT NULL,
    status ENUM('pending','approved','rejected') DEFAULT 'pending',
    admin_response TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    resolved_at DATETIME DEFAULT NULL,
    FOREIGN KEY (package_id) REFERENCES packages(id) ON DELETE CASCADE
) ENGINE=InnoDB;



CREATE TABLE notifications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    title VARCHAR(150),
    message TEXT NOT NULL,
    is_read TINYINT(1) DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user (user_id)
) ENGINE=InnoDB;


CREATE TABLE contact_messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL,
    subject VARCHAR(200),
    message TEXT NOT NULL,
    is_read TINYINT(1) DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;


INSERT INTO countries (name, iso_code) VALUES
('Albania', 'AL'),
('Kosovo', 'XK'),
('Italy', 'IT'),
('Germany', 'DE'),
('Greece', 'GR');

INSERT INTO cities (name, country_id) VALUES
('Tirana', 1),
('Durres', 1),
('Vlore', 1),
('Shkoder', 1),
('Prishtina', 2),
('Prizren', 2),
('Roma', 3),
('Milano', 3),
('Berlin', 4),
('Athens', 5);

INSERT INTO package_types (type_name, base_price, description) VALUES
('Document', 3.00, 'Letra dhe dokumenta deri ne 0.5kg'),
('Small Box', 5.00, 'Kuti e vogel deri ne 2kg'),
('Medium Box', 8.00, 'Kuti mesatare deri ne 5kg'),
('Large Box', 12.00, 'Kuti e madhe deri ne 15kg'),
('Custom', 10.00, 'Pako te tjera me permasa specifike');


INSERT INTO users (full_name, email, password_hash, phone_encrypted, city_id, role) VALUES
('Site Administrator', 'admin@postaweb.al', ' $2y$10$quVnQwbhkN.2xhjkV04LsuIFc3TwaDcBgA0rr14iFJqkBvPaYkMDG', NULL, 1, 'admin'),
('Klienti Test 1', 'klient1@test.al',     ' $2y$10$KtgyaV9C/5DOUuP5WvDzP.3tdbD5aj2XqwcGnxcYMfO77CowO.JBK', NULL, 1, 'client'),
('Klienti Test 2', 'klient2@test.al',     ' $2y$10$juXchV0z8bU7xdx5RE4AweRTc5VAY3rJKwQGa2V9kgQrnkEbGVHwe', NULL, 5, 'client');


INSERT INTO packages (
    tracking_code, sender_id, receiver_name, receiver_email,
    receiver_address_encrypted, receiver_city_id, package_type_id,
    weight_kg, shipping_cost, payment_status, current_status
) VALUES
('PW260504ABC1', 2, 'Eldon Krasniqi', 'eldon@example.com', 'rr. Skenderbeg 12', 5, 2, 1.5, 7.50, 'paid', 'in_transit'),
('PW260504DEF2', 2, 'Marsida Hoxha',  'marsida@example.com', 'rr. Dervish Hima 25', 1, 1, 0.3, 3.00, 'paid', 'delivered'),
('PW260504GHI3', 3, 'Genti Berisha',  'genti@example.com', 'rr. Migjeni 8', 2, 3, 4.2, 10.50, 'pending', 'created');

INSERT INTO tracking_history (package_id, status, location, note) VALUES
(1, 'created', 'Tirana', 'Pako u krijua dhe etiketa u gjenerua'),
(1, 'picked_up', 'Tirana - Qendra', 'Pako u mor nga klienti'),
(1, 'in_transit', 'Durres - Hub', 'Ne tranzit drejt Prishtines'),
(2, 'created', 'Tirana', 'Pako u krijua'),
(2, 'picked_up', 'Tirana - Qendra', 'Pako u mor'),
(2, 'in_transit', 'Tirana - Hub', 'Ne tranzit'),
(2, 'out_for_delivery', 'Tirana', 'Po dergohet sot'),
(2, 'delivered', 'Tirana', 'U dorezua me sukses ne ora 14:30'),
(3, 'created', 'Prishtina', 'Pako u krijua, ne pritje te pageses');


INSERT INTO notifications (user_id, title, message) VALUES
(2, 'Pako ne tranzit', 'Pakoja juaj PW260504ABC1 eshte ne tranzit.'),
(2, 'Pako u dorezua', 'Pakoja juaj PW260504DEF2 u dorezua me sukses.'),
(3, 'Konfirmim pageses', 'Ju lutem perfundoni pagesen per pako PW260504GHI3.');


INSERT INTO contact_messages (name, email, subject, message) VALUES
('Vizitor Test', 'vizitor@example.com', 'Pyetje per cmime', 'Sa kushton dergesa nga Tirana ne Prishtine?');