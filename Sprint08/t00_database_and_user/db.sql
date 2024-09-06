-- Active: 1725544609567@@localhost@3306
CREATE DATABASE ucode_web;

-- Create the user with a secure password
CREATE USER 'dmytro'@'localhost' IDENTIFIED BY '12345678';

-- Grant all privileges on the new database to the user
GRANT ALL PRIVILEGES ON ucode_web.* TO 'dmytro'@'localhost';

-- Apply the changes
FLUSH PRIVILEGES;
