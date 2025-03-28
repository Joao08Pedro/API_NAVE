DROP DATABASE nave;

CREATE DATABASE nave;

USE nave;

CREATE TABLE tipos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(20) NOT NULL
);

CREATE TABLE naves (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(25) NOT NULL,
    cor VARCHAR(15) NOT NULL,
    tipos_id INT NOT NULL,
    FOREIGN KEY (tipos_id) REFERENCES tipos(id)
);

INSERT INTO tipos(nome) VALUES ("Nave Mineradora");