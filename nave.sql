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
INSERT INTO tipos(nome) VALUES ("Nave Quadrada");
INSERT INTO tipos(nome) VALUES ("Nave Dead Pool");

INSERT INTO naves(nome, cor, tipos_id) VALUES ("Nave do Grimas", "Roxa", 1);
INSERT INTO naves(nome, cor, tipos_id) VALUES ("Nave do Herik", "Laranja", 2);
INSERT INTO naves(nome, cor, tipos_id) VALUES ("Nave do Jão3", "Preto", 3);

SELECT naves.nome, tipos.nome FROM naves
INNER JOIN tipos ON tipos.id = naves.tipos_id;