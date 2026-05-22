CREATE SCHEMA `farmacia_db`

CREATE TABLE `farmacia_db`.`usuario` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(225) NULL,
  `cpf` VARCHAR(45) NULL,
  `email` VARCHAR(225) NULL,
  `senha` VARCHAR(225) NULL,
  `ativo` INT NULL DEFAULT 1,
  PRIMARY KEY (`id`));

  CREATE TABLE `farmacia_db`.`medicamentos` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(225) NULL,
  `tipo` VARCHAR(225) NULL,
  `dosagem` VARCHAR(225) NULL,
  `marca` VARCHAR(225) NULL,
  `quantidade` INT NULL,
  `estoque_minimo` INT NULL,
  `ativo` INT NULL DEFAULT 1,
  PRIMARY KEY (`id`));
