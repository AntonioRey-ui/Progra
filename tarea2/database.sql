-- Database creation
CREATE DATABASE IF NOT EXISTS products_db;
USE products_db;

-- Products table definition
CREATE TABLE IF NOT EXISTS products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  stock INT NOT NULL,
  description TEXT NOT NULL,
  brand VARCHAR(255) NULL,
  img TEXT NULL,
  active BOOLEAN NOT NULL DEFAULT TRUE
);

-- Seed data for testing
INSERT INTO products (name, price, stock, description, brand, img, active) VALUES
('Laptop Pro 14', 18999.00, 15, 'Laptop ligera con pantalla de 14 pulgadas, 16 GB de RAM y SSD de 512 GB.', 'TechBrand', 'https://example.com/laptop.jpg', TRUE),
('Audífonos Inalámbricos', 1299.50, 40, 'Audífonos Bluetooth con cancelación activa de ruido y hasta 30 horas de batería.', 'AudioMax', 'https://example.com/audifonos.jpg', TRUE),
('Smartwatch Active', 2499.00, 25, 'Reloj inteligente resistente al agua con monitor de ritmo cardíaco y GPS.', 'WristTech', 'https://example.com/smartwatch.jpg', TRUE),
('Teclado Mecánico RGB', 1150.00, 18, 'Teclado mecánico switches red con retroiluminación RGB configurable.', 'KeyGamer', 'https://example.com/teclado.jpg', TRUE),
('Mouse Ergonómico', 650.00, 30, 'Mouse inalámbrico recargable con diseño ergonómico de 6 botones.', 'ErgoPro', 'https://example.com/mouse.jpg', FALSE);
