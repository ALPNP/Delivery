
-- phpMyAdmin SQL Dump
-- version 3.5.2.2
-- http://www.phpmyadmin.net
--
-- Хост: localhost
-- Время создания: Июн 13 2017 г., 14:24
-- Версия сервера: 10.1.22-MariaDB
-- Версия PHP: 5.2.17

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- База данных: `u673981634_del`
--

-- --------------------------------------------------------

--
-- Структура таблицы `filestore`
--

CREATE TABLE IF NOT EXISTS `filestore` (
  `filename` varchar(100) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `ftp`
--

CREATE TABLE IF NOT EXISTS `ftp` (
  `fio` varchar(100) NOT NULL,
  `adr` varchar(300) NOT NULL,
  `ord` varchar(100) NOT NULL,
  `rew` varchar(500) NOT NULL,
  `foto` varchar(100) NOT NULL,
  `types` varchar(300) NOT NULL,
  `rating` int(1) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
