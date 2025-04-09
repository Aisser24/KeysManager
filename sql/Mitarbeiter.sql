-- phpMyAdmin SQL Dump
-- version 4.5.4.1deb2ubuntu2.1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Erstellungszeit: 09. Apr 2025 um 13:31
-- Server-Version: 5.7.33-0ubuntu0.16.04.1
-- PHP-Version: 7.0.33-0ubuntu0.16.04.16

create database if not exists keysmanager default character set=utf8;

use keysmanager;

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Datenbank: `keysmanager`
--

create table tokens(
	idkeys integer auto_increment primary key,
	numberkey integer
);

create table keysmitarbeiter(
    idkeys integer NOT NULL,
    idMitarbeiter int(11) NOT NULL,
    ausgabedatum date,
    rueckgabedatum date,
    primary key (idkeys, idMitarbeiter, ausgabedatum),
    foreign key (idkeys) references tokens(idkeys),
    foreign key (idMitarbeiter) references Mitarbeiter(idMitarbeiter)
);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `Mitarbeiter`
--

CREATE TABLE `Mitarbeiter` (
  `idMitarbeiter` int(11) NOT NULL,
  `id` varchar(30) DEFAULT NULL COMMENT 'id aus ntfs',
  `vorname` varchar(45) DEFAULT NULL,
  `nachname` varchar(45) DEFAULT NULL,
  `strasse` varchar(45) DEFAULT NULL,
  `hausnummer` varchar(45) DEFAULT NULL,
  `plz` int(11) DEFAULT NULL,
  `ort` varchar(45) DEFAULT NULL,
  `gebDatum` date DEFAULT NULL,
  `svNummer` varchar(45) DEFAULT NULL,
  `geschlecht` varchar(45) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `firmenTelefonnummer` varchar(45) DEFAULT NULL,
  `privateTelefonnummer` varchar(45) DEFAULT NULL,
  `iban` varchar(45) DEFAULT NULL,
  `bic` varchar(45) DEFAULT NULL,
  `position` varchar(45) DEFAULT NULL,
  `weiterePosition` varchar(45) DEFAULT NULL,
  `bemerkung` text,
  `status` tinyint(4) DEFAULT NULL COMMENT '0=Arbeit, 1=abgemeldet',
  `password` varchar(200) DEFAULT NULL,
  `berechtigung` varchar(45) DEFAULT NULL,
  `urlaubsanspruch` int(11) DEFAULT NULL COMMENT 'Urlaubsanspruch in Stunden',
  `aktWochenStd` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `Mitarbeiter`
--
ALTER TABLE `Mitarbeiter`
  ADD PRIMARY KEY (`idMitarbeiter`);

--
-- AUTO_INCREMENT für exportierte Tabellen
--

--
-- AUTO_INCREMENT für Tabelle `Mitarbeiter`
--
ALTER TABLE `Mitarbeiter`
  MODIFY `idMitarbeiter` int(11) NOT NULL AUTO_INCREMENT;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
