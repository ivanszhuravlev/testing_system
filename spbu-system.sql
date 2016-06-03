-- phpMyAdmin SQL Dump
-- version 4.0.8
-- http://www.phpmyadmin.net
--
-- Хост: 127.0.0.1:3306
-- Время создания: Июн 03 2016 г., 03:43
-- Версия сервера: 5.6.14-log
-- Версия PHP: 5.5.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- База данных: `spbu-system`
--

-- --------------------------------------------------------

--
-- Структура таблицы `answers`
--

CREATE TABLE IF NOT EXISTS `answers` (
  `value` int(11) NOT NULL,
  `question_id` int(11) NOT NULL,
  `text` text NOT NULL,
  `symbols` tinyint(4) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `questions`
--

CREATE TABLE IF NOT EXISTS `questions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` tinytext NOT NULL,
  `s` tinyint(4) NOT NULL,
  `q` tinyint(4) NOT NULL,
  `v` tinyint(4) NOT NULL,
  `text` text NOT NULL,
  `goto` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nickname` tinytext NOT NULL,
  `email` tinytext NOT NULL,
  `password` text NOT NULL,
  `stage` tinyint(4) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=66 ;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`id`, `nickname`, `email`, `password`, `stage`) VALUES
(62, 'ivan', 'litle_98@mail.ru', '$2y$10$DmtB35NXL9tdZ5PfbQnIz.2WuaNsZ7bdcXKrqZ993z/P.N/e07UqK', 1),
(63, 'lolly', 'lolly@mail.ru', '$2y$10$Ww1nWk9Az.0dhzarG32ffeakZwc6QMCgmwE8yYL5r7DpQLw9iVT5y', 1),
(64, 'lucas', 'starwars@gmail.com', '$2y$10$3PnysKMeOTYopK/2SIRocOWDJUN424vz5HN9qYnJE2V5D9TSymC.C', 1),
(65, 'admin', 'admin@gmail.com', '$2y$10$96sGE7NnsBFd7uOnFy3tUe8fRdNXM6PoGxtOVSdCzen7SEr0JkbJm', 1);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
