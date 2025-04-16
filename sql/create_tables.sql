create database if not exists keysmanager default character set=utf8;

use keysmanager;

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

create table tokens(
	token_id integer auto_increment primary key,
	token_number integer
);

CREATE TABLE mitarbeiter (
    mitarbeiter_id int(11) NOT NULL AUTO_INCREMENT,
    vorname varchar(45) DEFAULT NULL,
    nachname varchar(45) DEFAULT NULL,
    email varchar(100) DEFAULT NULL,
    position varchar(45) DEFAULT NULL,
    status tinyint(4) DEFAULT NULL COMMENT '0=Arbeit, 1=abgemeldet',
    PRIMARY KEY (mitarbeiter_id)
);

create table keysmitarbeiter(
    token_id integer NOT NULL,
    mitarbeiter_id int(11) NOT NULL,
    ausgabedatum date,
    rueckgabedatum date,
    primary key (token_id, mitarbeiter_id, ausgabedatum),
    foreign key (token_id) references tokens(token_id),
    foreign key (mitarbeiter_id) references mitarbeiter(mitarbeiter_id)
);