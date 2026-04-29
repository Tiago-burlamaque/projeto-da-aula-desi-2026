CREATE SCHEMA `gestao_faxina` ;

USE `gestao_faxina`

CREATE TABLE `gestao_faxina`.`cliente` (
  `idcliente` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(225) NULL,
  `email` VARCHAR(225) NULL,
  `senha` CHAR(64) NULL,
  `ativo` INT NULL DEFAULT 1,
  PRIMARY KEY (`idcliente`));

CREATE TABLE `gestao_faxina`.`funcionario` (
  `idfuncionario` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(225) NULL,
  `email` VARCHAR(255) NULL,
  `telefone` BIGINT NULL,
  `cidade` VARCHAR(255) NULL,
  `agendamento_servico` DATETIME NULL,
  `nome_servico` VARCHAR(255) NULL,
  `valor_servico` DECIMAL(10,2) NULL,
  `status` ENUM('Pendente', 'Cancelado', 'Confirmado', 'Concluído') NULL,
  `ativo` INT 1,
  PRIMARY KEY(`idfuncionario`)
  ) 
  