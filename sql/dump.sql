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
  `email` VARCHAR(225) NULL,
  `telefone` BIGINT NULL,
  `cidade` VARCHAR(225) NULL,
  PRIMARY KEY (`idfuncionario`));

CREATE TABLE `gestao_faxina`.`servico` (
  `idservico` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(225) NOT NULL,
  `valor` DECIMAL(10,2) NOT NULL,
  `funcionario_idfuncionario` INT NOT NULL,

  PRIMARY KEY (`idservico`),

  CONSTRAINT `fk_servico_funcionario`
    FOREIGN KEY (`funcionario_idfuncionario`)
    REFERENCES `gestao_faxina`.`funcionario` (`idfuncionario`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE TABLE `gestao_faxina`.`agendamento` (
  `idagendamento` INT NOT NULL AUTO_INCREMENT,
  `data_hora` DATETIME NOT NULL,
  `status` ENUM('agendado', 'cancelado', 'concluido') NOT NULL,

  `cliente_idcliente` INT NOT NULL,
  `funcionario_idfuncionario` INT NOT NULL,

  PRIMARY KEY (`idagendamento`),

  CONSTRAINT `fk_agendamento_cliente`
    FOREIGN KEY (`cliente_idcliente`)
    REFERENCES `gestao_faxina`.`cliente` (`idcliente`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,

  CONSTRAINT `fk_agendamento_funcionario`
    FOREIGN KEY (`funcionario_idfuncionario`)
    REFERENCES `gestao_faxina`.`funcionario` (`idfuncionario`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);