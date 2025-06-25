/*M!999999\- enable the sandbox mode */ 
-- MariaDB dump 10.19  Distrib 10.11.13-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: piggybank_db
-- ------------------------------------------------------
-- Server version	10.11.13-MariaDB-0ubuntu0.24.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `campanhas`
--

DROP TABLE IF EXISTS `campanhas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `campanhas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `titulo` varchar(60) NOT NULL,
  `meta` float NOT NULL,
  `recebido` float NOT NULL,
  `descricao` text NOT NULL,
  `fk_id_entidade` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_id_entidade` (`fk_id_entidade`),
  CONSTRAINT `campanhas_ibfk_1` FOREIGN KEY (`fk_id_entidade`) REFERENCES `entidades` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `campanhas`
--

LOCK TABLES `campanhas` WRITE;
/*!40000 ALTER TABLE `campanhas` DISABLE KEYS */;
INSERT INTO `campanhas` VALUES
(1,'100 cobertores para moradores de rua',1300,300,'Ajude-nos a comprar 100 cobertores para moradores de rua.',4),
(2,'Cirurgia para a cachorra Laika',5000,100,'Nossa cachorra Laika necessita de uma cirurgia para remoção de útero',2),
(3,'Sopão Comunitário',650.99,100,'Ajude-nos a realizarmos um sopão comunitário para moradores em situação de rua.',1),
(4,'Roupas para crianças em situação de guerra',1000,0,'Ajude-nos a comprar roupas novas para crianças em situação de guerra no Líbano',4);
/*!40000 ALTER TABLE `campanhas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `enderecos`
--

DROP TABLE IF EXISTS `enderecos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `enderecos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `rua` varchar(100) NOT NULL,
  `numero` int(11) NOT NULL,
  `bairro` varchar(100) NOT NULL,
  `estado` varchar(2) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `enderecos`
--

LOCK TABLES `enderecos` WRITE;
/*!40000 ALTER TABLE `enderecos` DISABLE KEYS */;
/*!40000 ALTER TABLE `enderecos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `entidades`
--

DROP TABLE IF EXISTS `entidades`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `entidades` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(80) NOT NULL,
  `fk_endereco` int(11) DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `senha` varchar(72) NOT NULL COMMENT 'Esse dado vem criptografado do backend para o banco de dados (usando o bcrypt)',
  `criado_em` date NOT NULL DEFAULT current_timestamp(),
  `alterado_em` date DEFAULT NULL COMMENT 'Esse dado vem do backend',
  PRIMARY KEY (`id`),
  KEY `fk_endereco` (`fk_endereco`),
  CONSTRAINT `entidades_ibfk_1` FOREIGN KEY (`fk_endereco`) REFERENCES `enderecos` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `entidades`
--

LOCK TABLES `entidades` WRITE;
/*!40000 ALTER TABLE `entidades` DISABLE KEYS */;
INSERT INTO `entidades` VALUES
(1,'Instituição de Caridade Amor à Vida',NULL,'amoravida@ong.com','admin','2025-06-04',NULL),
(2,'Instituição Amor à Vida',NULL,'amoravida@ong.com','admin','2025-06-04',NULL),
(3,'Igreja Padre Leon',NULL,'igrejapadreleon@org.com','admin','2025-06-04',NULL),
(4,'Associação de Caridade de Fortaleza',NULL,'caridadefortaleza@ong.com','admin','2025-06-04',NULL);
/*!40000 ALTER TABLE `entidades` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(80) NOT NULL,
  `tel` varchar(11) NOT NULL,
  `email` varchar(100) NOT NULL,
  `cpf` varchar(11) NOT NULL,
  `senha` varchar(72) NOT NULL,
  `pfp_img` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES
(12,'Victor','85999999999','victor@adriano.com','12345678910','$2y$10$rSwklkSW6pEO.RIs5Aq65ekprqZJix1rJz0hwubYvIzAOWEBCAAb6','1750821808_0194c62e8c30210fa97f.jpeg'),
(13,'Jayane','85999999999','jay@ane.com','12345678910','$2y$10$tZuNlSZvo4LKrOSdxxT6XOcjY2kSD.UxE5/GKanlJXhBHEvFc4zDy','1750821854_b34d993132c696eea0fd.jpeg'),
(14,'Jayane','85999999999','jay@ane.com','12345678910','$2y$10$trECJQyr8i6Z7igojdY9jue1WWbjQfpuO2DSMgVqrCd.6pq71H6zK','1750823287_56f1c0208b2a3d593187.jpeg');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-06-25  0:51:59
