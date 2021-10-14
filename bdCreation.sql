-- --------------------------------------------------------
-- Servidor:                     127.0.0.1
-- Versão do servidor:           5.6.49-log - MySQL Community Server (GPL)
-- OS do Servidor:               Win64
-- HeidiSQL Versão:              11.0.0.5919
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Copiando estrutura do banco de dados para sistema_padrao
DROP DATABASE IF EXISTS `sistema_padrao`;
CREATE DATABASE IF NOT EXISTS `sistema_padrao` /*!40100 DEFAULT CHARACTER SET latin1 COLLATE latin1_general_ci */;
USE `sistema_padrao`;

-- Copiando estrutura para tabela sistema_padrao.fabpermissoes
DROP TABLE IF EXISTS `fabpermissoes`;
CREATE TABLE IF NOT EXISTS `fabpermissoes` (
  `idPermissao` int(11) NOT NULL AUTO_INCREMENT,
  `idPermissaoTipo` int(11) NOT NULL,
  `modulo` bit(1) NOT NULL DEFAULT b'0',
  `descricao` varchar(50) NOT NULL,
  `varSession` varchar(30) NOT NULL,
  `padrao` bit(1) NOT NULL DEFAULT b'1',
  PRIMARY KEY (`idPermissao`),
  KEY `idPermissaoTipo` (`idPermissaoTipo`),
  CONSTRAINT `FK_fabPermissoes_fabPermissoesTipos` FOREIGN KEY (`idPermissaoTipo`) REFERENCES `fabpermissoestipos` (`idPermissaoTipo`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Exportação de dados foi desmarcado.

-- Copiando estrutura para tabela sistema_padrao.fabpermissoestipos
DROP TABLE IF EXISTS `fabpermissoestipos`;
CREATE TABLE IF NOT EXISTS `fabpermissoestipos` (
  `idPermissaoTipo` int(11) NOT NULL AUTO_INCREMENT,
  `descricao` varchar(30) NOT NULL,
  PRIMARY KEY (`idPermissaoTipo`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Exportação de dados foi desmarcado.

-- Copiando estrutura para tabela sistema_padrao.usuacessos
DROP TABLE IF EXISTS `usuacessos`;
CREATE TABLE IF NOT EXISTS `usuacessos` (
  `idAcesso` int(11) NOT NULL AUTO_INCREMENT,
  `idUsuario` int(11) NOT NULL,
  `data` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `ip` varchar(32) NOT NULL,
  PRIMARY KEY (`idAcesso`),
  KEY `idUsuario` (`idUsuario`),
  CONSTRAINT `FK_usuAcessos_usuUsuarios` FOREIGN KEY (`idUsuario`) REFERENCES `usuusuarios` (`idUsuario`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Exportação de dados foi desmarcado.

-- Copiando estrutura para tabela sistema_padrao.usuareas
DROP TABLE IF EXISTS `usuareas`;
CREATE TABLE IF NOT EXISTS `usuareas` (
  `idArea` int(11) NOT NULL AUTO_INCREMENT,
  `titulo` varchar(50) NOT NULL,
  `ativo` bit(1) NOT NULL DEFAULT b'1',
  `tsInclusao` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `tsAlteracao` datetime DEFAULT NULL,
  PRIMARY KEY (`idArea`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

-- Exportação de dados foi desmarcado.

-- Copiando estrutura para tabela sistema_padrao.usucargos
DROP TABLE IF EXISTS `usucargos`;
CREATE TABLE IF NOT EXISTS `usucargos` (
  `idCargo` int(11) NOT NULL AUTO_INCREMENT,
  `idArea` int(11) NOT NULL,
  `titulo` varchar(50) NOT NULL,
  `ativo` bit(1) NOT NULL DEFAULT b'1',
  `tsInclusao` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `tsAlteracao` datetime DEFAULT NULL,
  PRIMARY KEY (`idCargo`),
  KEY `idArea` (`idArea`),
  CONSTRAINT `FK_usuAcessos_usuAreas` FOREIGN KEY (`idArea`) REFERENCES `usuareas` (`idArea`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

-- Exportação de dados foi desmarcado.

-- Copiando estrutura para tabela sistema_padrao.usupermissoes
DROP TABLE IF EXISTS `usupermissoes`;
CREATE TABLE IF NOT EXISTS `usupermissoes` (
  `idUsuarioPermissao` int(11) NOT NULL AUTO_INCREMENT,
  `idUsuario` int(11) NOT NULL,
  `idPermissao` int(11) NOT NULL,
  `tsInclusao` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `tsAlteracao` datetime DEFAULT NULL,
  PRIMARY KEY (`idUsuarioPermissao`),
  KEY `idUsuario` (`idUsuario`),
  KEY `idPermissao` (`idPermissao`),
  CONSTRAINT `FK_usuPermissoes_fabPermissoes` FOREIGN KEY (`idPermissao`) REFERENCES `fabpermissoes` (`idPermissao`),
  CONSTRAINT `FK_usuPermissoes_usuUsuarios` FOREIGN KEY (`idUsuario`) REFERENCES `usuusuarios` (`idUsuario`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Exportação de dados foi desmarcado.

-- Copiando estrutura para tabela sistema_padrao.usuusuarios
DROP TABLE IF EXISTS `usuusuarios`;
CREATE TABLE IF NOT EXISTS `usuusuarios` (
  `idUsuario` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(50) NOT NULL,
  `sobrenome` varchar(50) NOT NULL,
  `idArea` int(11) NOT NULL,
  `idCargo` int(11) NOT NULL,
  `login` varchar(50) NOT NULL DEFAULT '',
  `senha` varchar(50) NOT NULL,
  `diaNascimento` int(11) NOT NULL,
  `mesNascimento` int(11) NOT NULL,
  `anoNascimento` int(11) NOT NULL,
  `email` varchar(50) NOT NULL DEFAULT '',
  `telCelular` varchar(20) NOT NULL,
  `telFixo` varchar(20) NOT NULL,
  `endereco` varchar(50) NOT NULL,
  `numero` varchar(15) NOT NULL,
  `complemento` varchar(25) NOT NULL,
  `bairro` varchar(50) NOT NULL,
  `cep` varchar(9) NOT NULL,
  `estado` char(2) NOT NULL,
  `cidade` varchar(50) NOT NULL,
  `cpf` varchar(14) NOT NULL,
  `banco` varchar(50) NOT NULL,
  `agencia` varchar(10) NOT NULL,
  `conta` varchar(20) NOT NULL,
  `foto` varchar(50) DEFAULT NULL,
  `ativo` bit(1) NOT NULL DEFAULT b'1',
  `tsInclusao` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `tsAlteracao` datetime DEFAULT NULL,
  `cor` varchar(30) DEFAULT NULL,
  `dashboardInicial` varchar(3) DEFAULT NULL,
  `tokenPhoneApp` varchar(100) DEFAULT NULL,
  `estadoCivil` varchar(20) DEFAULT NULL,
  `formacaoAcademica` varchar(50) DEFAULT NULL,
  `regiao` varchar(6) DEFAULT NULL,
  `salario` decimal(11,2) NOT NULL,
  `observacoes` text,
  PRIMARY KEY (`idUsuario`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

-- Exportação de dados foi desmarcado.

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
