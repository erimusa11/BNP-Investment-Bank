-- phpMyAdmin SQL Dump
-- version 4.9.4
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jan 22, 2021 at 07:48 AM
-- Server version: 10.3.27-MariaDB-log-cll-lve
-- PHP Version: 7.3.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dilaxzzk_bnpbankdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `bonifico`
--

CREATE TABLE `bonifico` (
  `bonifico_id` int(11) NOT NULL,
  `bonifico_data` date DEFAULT NULL,
  `bonifico_quantita` float DEFAULT NULL,
  `client_reconazition` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `bonifico`
--

INSERT INTO `bonifico` (`bonifico_id`, `bonifico_data`, `bonifico_quantita`, `client_reconazition`) VALUES
(30, '2020-10-05', 1800, 12),
(31, '2020-10-05', 1800, 15),
(32, '2020-05-23', 23000, 12),
(33, '2020-05-23', 23000, 16),
(34, '2020-07-17', 5000, 16),
(35, '2020-07-20', 18000, 16),
(36, '2020-08-11', 10000, 16),
(37, '2020-09-24', 4900, 16),
(38, '2020-09-25', 6800, 12),
(39, '2020-09-28', 2500, 16),
(40, '2018-10-18', 20000, 12),
(41, '2019-10-25', 20000, 12),
(42, '2018-11-19', 20000, 12),
(43, '2020-10-09', 20000, 12),
(44, '2018-11-19', 20000, 12),
(45, '2018-11-19', 20000, 16),
(46, '2018-11-20', 20000, 16),
(47, '2020-09-26', 6800, 16),
(48, '2018-11-19', 15195, 16),
(50, '2020-10-08', 13000, 18),
(51, '2020-10-08', 20000, 19),
(52, '2020-01-13', 200, 21),
(53, '2020-01-13', 200, 21),
(54, '2020-01-21', 5000, 21),
(56, '2019-01-21', 12500, 21),
(57, '2020-02-03', 12500, 21),
(58, '2020-02-25', 14000, 21),
(59, '2020-02-25', 14000, 21),
(61, '2020-03-03', 28000, 21),
(62, '2020-03-16', 15000, 21),
(63, '2020-03-16', 15000, 21),
(64, '2020-03-31', 25000, 21),
(65, '2020-03-03', 90000, 21),
(66, '2020-03-16', 800, 21),
(67, '2020-09-09', 4000, 22),
(68, '2020-09-14', 4000, 22),
(69, '2020-08-20', 1000, 22),
(70, '2020-09-03', 3000, 22),
(72, '2020-09-25', 1200, 22),
(73, '2020-09-18', 1300, 22),
(74, '2020-09-14', 2500, 22),
(77, '2020-09-29', 4000, 22),
(78, '2020-09-29', 2289, 22);

-- --------------------------------------------------------

--
-- Table structure for table `client`
--

CREATE TABLE `client` (
  `client_id` int(11) NOT NULL,
  `client_name` varchar(150) DEFAULT NULL,
  `client_subname` varchar(150) DEFAULT NULL,
  `username` varchar(150) DEFAULT NULL,
  `password` varchar(150) DEFAULT NULL,
  `client_email` varchar(150) DEFAULT NULL,
  `client_phone` varchar(150) DEFAULT NULL,
  `payemnt_due` date DEFAULT NULL,
  `date_client` date DEFAULT NULL,
  `client_adress` varchar(150) DEFAULT NULL,
  `client_tax` varchar(150) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `client`
--

INSERT INTO `client` (`client_id`, `client_name`, `client_subname`, `username`, `password`, `client_email`, `client_phone`, `payemnt_due`, `date_client`, `client_adress`, `client_tax`) VALUES
(12, 'Maurizio', 'Mordenti', 'test', 'test', 'mordentimaurizio0@gmil.com', '3887790786', '2020-10-01', '2020-08-27', 'Rieti ', '7.5');

-- --------------------------------------------------------

--
-- Table structure for table `importo`
--

CREATE TABLE `importo` (
  `importo_id` int(11) NOT NULL,
  `importo_amount` float DEFAULT NULL,
  `cliente_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `importo`
--

INSERT INTO `importo` (`importo_id`, `importo_amount`, `cliente_id`) VALUES
(9, 5600, 15),
(10, 371872, 12),
(11, 371872, 16),
(14, 25000, 18),
(15, 62000, 19),
(18, 232000, 21),
(19, 41359, 22);

-- --------------------------------------------------------

--
-- Table structure for table `prelievo`
--

CREATE TABLE `prelievo` (
  `prelievo_id` int(11) NOT NULL,
  `beneficario` varchar(150) DEFAULT NULL,
  `swift` varchar(250) DEFAULT NULL,
  `importo` float DEFAULT NULL,
  `iban` varchar(250) DEFAULT NULL,
  `causale` varchar(150) DEFAULT NULL,
  `citta` varchar(150) DEFAULT NULL,
  `stato` varchar(150) DEFAULT NULL,
  `client_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `prelievo`
--

INSERT INTO `prelievo` (`prelievo_id`, `beneficario`, `swift`, `importo`, `iban`, `causale`, `citta`, `stato`, `client_id`) VALUES
(4, 'bnp ', 'bjjjfi', 770000, 'mokjacfosijcfoisdjhvioD', 'BFCBVFB', 'KDCVIKDS', 'FDGAFGB', 12),
(5, 'kajskajskasjkas', 'asasasassS', 50000, '000000554545988494866', 'PRELIEVO', 'ROMA', 'ITALIA', 21),
(6, 'kajskajskasjkas', 'asasasassS', 50000, '000000554545988494866', 'PRELIEVO', 'ROMA', 'ITALIA', 21);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `website_on_of` int(1) DEFAULT 0,
  `secretpass` varchar(50) DEFAULT NULL,
  `user_username` varchar(100) DEFAULT NULL,
  `user_password` varchar(100) DEFAULT NULL,
  `user_name` varchar(100) DEFAULT NULL,
  `user_subname` varchar(100) DEFAULT NULL,
  `livello` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `website_on_of`, `secretpass`, `user_username`, `user_password`, `user_name`, `user_subname`, `livello`) VALUES
(1, 0, 'test', 'support@administrator.com', 'test', 'demo', 'demo', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bonifico`
--
ALTER TABLE `bonifico`
  ADD PRIMARY KEY (`bonifico_id`);

--
-- Indexes for table `client`
--
ALTER TABLE `client`
  ADD PRIMARY KEY (`client_id`);

--
-- Indexes for table `importo`
--
ALTER TABLE `importo`
  ADD PRIMARY KEY (`importo_id`);

--
-- Indexes for table `prelievo`
--
ALTER TABLE `prelievo`
  ADD PRIMARY KEY (`prelievo_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bonifico`
--
ALTER TABLE `bonifico`
  MODIFY `bonifico_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=79;

--
-- AUTO_INCREMENT for table `client`
--
ALTER TABLE `client`
  MODIFY `client_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `importo`
--
ALTER TABLE `importo`
  MODIFY `importo_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `prelievo`
--
ALTER TABLE `prelievo`
  MODIFY `prelievo_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
