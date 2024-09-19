CREATE DATABASE IF NOT EXISTS card_game;
DROP USER IF EXISTS 'dmytro'@'localhost';
CREATE USER 'dmytro'@'localhost' IDENTIFIED BY '12345678';
GRANT ALL PRIVILEGES ON card_game.* TO 'dmytro'@'localhost';
USE card_game;

CREATE TABLE IF NOT EXISTS users(
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    login VARCHAR(255) NOT NULL UNIQUE,
    password TINYTEXT NOT NULL
);