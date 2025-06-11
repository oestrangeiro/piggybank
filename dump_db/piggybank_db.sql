-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 11/06/2025 às 15:53
-- Versão do servidor: 10.4.32-MariaDB
-- Versão do PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `piggybank_db`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `campanhas`
--

CREATE TABLE `campanhas` (
  `id` int(11) NOT NULL,
  `titulo` varchar(60) NOT NULL,
  `meta` float NOT NULL,
  `recebido` float NOT NULL,
  `descricao` text NOT NULL,
  `fk_id_entidade` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `campanhas`
--

INSERT INTO `campanhas` (`id`, `titulo`, `meta`, `recebido`, `descricao`, `fk_id_entidade`) VALUES
(1, '100 cobertores para moradores de rua', 1300, 300, 'Ajude-nos a comprar 100 cobertores para moradores de rua.', 4),
(2, 'Cirurgia para a cachorra Laika', 5000, 100, 'Nossa cachorra Laika necessita de uma cirurgia para remoção de útero', 2),
(3, 'Sopão Comunitário', 650.99, 100, 'Ajude-nos a realizarmos um sopão comunitário para moradores em situação de rua.', 1),
(4, 'Roupas para crianças em situação de guerra', 1000, 0, 'Ajude-nos a comprar roupas novas para crianças em situação de guerra no Líbano', 4);

-- --------------------------------------------------------

--
-- Estrutura para tabela `enderecos`
--

CREATE TABLE `enderecos` (
  `id` int(11) NOT NULL,
  `rua` varchar(100) NOT NULL,
  `numero` int(11) NOT NULL,
  `bairro` varchar(100) NOT NULL,
  `estado` varchar(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `entidades`
--

CREATE TABLE `entidades` (
  `id` int(11) NOT NULL,
  `nome` varchar(80) NOT NULL,
  `fk_endereco` int(11) DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `senha` varchar(72) NOT NULL COMMENT 'Esse dado vem criptografado do backend para o banco de dados (usando o bcrypt)',
  `criado_em` date NOT NULL DEFAULT current_timestamp(),
  `alterado_em` date DEFAULT NULL COMMENT 'Esse dado vem do backend'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `entidades`
--

INSERT INTO `entidades` (`id`, `nome`, `fk_endereco`, `email`, `senha`, `criado_em`, `alterado_em`) VALUES
(1, 'Instituição de Caridade Amor à Vida', NULL, 'amoravida@ong.com', 'admin', '2025-06-04', NULL),
(2, 'Instituição Amor à Vida', NULL, 'amoravida@ong.com', 'admin', '2025-06-04', NULL),
(3, 'Igreja Padre Leon', NULL, 'igrejapadreleon@org.com', 'admin', '2025-06-04', NULL),
(4, 'Associação de Caridade de Fortaleza', NULL, 'caridadefortaleza@ong.com', 'admin', '2025-06-04', NULL);

-- --------------------------------------------------------

--
-- Estrutura para tabela `users`
--

CREATE TABLE `users` (
  `id` int(11) UNSIGNED NOT NULL,
  `name` varchar(80) NOT NULL,
  `tel` varchar(11) NOT NULL,
  `email` varchar(100) NOT NULL,
  `cpf` varchar(11) NOT NULL,
  `senha` varchar(72) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `users`
--

INSERT INTO `users` (`id`, `name`, `tel`, `email`, `cpf`, `senha`) VALUES
(1, 'Mateus Almeida', '', '', '', ''),
(2, 'Caio David Urano de Carvalho', '', '', '', ''),
(3, 'Pamela Frota de Araújo', '85999625602', 'pamelafrota@email.com', '00055166612', 'admin');

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `campanhas`
--
ALTER TABLE `campanhas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_id_entidade` (`fk_id_entidade`);

--
-- Índices de tabela `enderecos`
--
ALTER TABLE `enderecos`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `entidades`
--
ALTER TABLE `entidades`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_endereco` (`fk_endereco`);

--
-- Índices de tabela `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `campanhas`
--
ALTER TABLE `campanhas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de tabela `enderecos`
--
ALTER TABLE `enderecos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `entidades`
--
ALTER TABLE `entidades`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de tabela `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `campanhas`
--
ALTER TABLE `campanhas`
  ADD CONSTRAINT `campanhas_ibfk_1` FOREIGN KEY (`fk_id_entidade`) REFERENCES `entidades` (`id`);

--
-- Restrições para tabelas `entidades`
--
ALTER TABLE `entidades`
  ADD CONSTRAINT `entidades_ibfk_1` FOREIGN KEY (`fk_endereco`) REFERENCES `enderecos` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
