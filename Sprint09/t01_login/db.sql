CREATE DATABASE IF NOT EXISTS sword;
USE sword;
ALTER TABLE users ADD COLUMN status ENUM('admin', 'user') DEFAULT 'user';
