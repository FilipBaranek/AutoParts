
CREATE DATABASE IF NOT EXISTS autopartsdb;

USE autopartsdb;

-- Create a table to store car brands, models, years, and engines
CREATE TABLE IF NOT EXISTS car_brands (
    id INT AUTO_INCREMENT PRIMARY KEY,
    brand VARCHAR(50) NOT NULL,
    model VARCHAR(100) NOT NULL,
    year INT NOT NULL,
    engine VARCHAR(50) NOT NULL
);

-- Insert data for car brands, models, years, and engines
INSERT INTO car_brands (brand, model, year, engine) VALUES
('BMW', '3 Series', 2020, '2.0L 4-Cylinder Turbo'),
('BMW', '5 Series', 2021, '3.0L 6-Cylinder Turbo'),
('Audi', 'A4', 2020, '2.0L 4-Cylinder Turbo'),
('Audi', 'Q5', 2021, '2.0L 4-Cylinder Turbo'),
('Mercedes', 'C-Class', 2020, '2.0L 4-Cylinder Turbo'),
('Mercedes', 'E-Class', 2021, '3.0L V6 Turbo'),
('Toyota', 'Corolla', 2020, '1.8L 4-Cylinder'),
('Toyota', 'Camry', 2021, '2.5L 4-Cylinder');


CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

