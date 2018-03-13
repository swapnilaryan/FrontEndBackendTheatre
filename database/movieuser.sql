-- phpMyAdmin SQL Dump
-- version 4.5.2
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Jul 14, 2016 at 07:34 PM
-- Server version: 5.7.9
-- PHP Version: 5.6.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `movie_theatre`
--

-- --------------------------------------------------------

--
-- Table structure for table `movieuser`
--

DROP TABLE IF EXISTS `movieuser`;
CREATE TABLE IF NOT EXISTS `movieuser` (
  `movieUserId` varchar(36) NOT NULL,
  `movieUserFirstName` varchar(20) NOT NULL,
  `movieUserLastName` varchar(20) NOT NULL,
  `movieUserEmailId` varchar(50) NOT NULL,
  `movieUserPassword` varchar(100) NOT NULL,
  PRIMARY KEY (`movieUserId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `movieuser`
--

INSERT INTO `movieuser` (`movieUserId`, `movieUserFirstName`, `movieUserLastName`, `movieUserEmailId`, `movieUserPassword`) VALUES
('B1UMGIHD', 'Swapnil', 'Kumar', 'swapnil@gmail.com', '$2a$10$7Y1yXUnAwCrb/xSCic/0teawZ5GofrhUomVmUs6/CbGe.J9JjYpDS'),
('r1VgZLHP', 'Swapnil', 'Kumar', 'swapnil@india.com', '$2a$10$YO0QpIgMVScsuOqNVn5tl.tqmsJW4qMh3iUg61ivN/5bXV/60uf6y');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
