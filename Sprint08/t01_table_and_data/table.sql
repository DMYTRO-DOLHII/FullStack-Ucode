-- Drop the table if it already exists
USE ucode_web;

DROP TABLE IF EXISTS heroes;

-- Create the table
CREATE TABLE heroes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL UNIQUE,
    description TEXT NOT NULL,
    class_role ENUM('tankman', 'healer', 'dps') NOT NULL
);
