drop database if exists keysmanager;
create database keysmanager default character set=utf8;

use keysmanager;

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

create table tokens(
	token_id integer auto_increment primary key,
	token_number integer,
    is_active boolean default true,
    token_type varchar(45) default null,
    token_description varchar(255) default null,
    added_date timestamp default current_timestamp,
    deleted_date datetime null default null
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

create table keyassignments (
    token_id integer NOT NULL,
    mitarbeiter_id int(11) NOT NULL,
    ausgabedatum timestamp default current_timestamp,
    rueckgabedatum datetime default NULL,
    primary key (token_id, mitarbeiter_id, ausgabedatum),
    foreign key (token_id) references tokens(token_id) on delete cascade on update cascade,
    foreign key (mitarbeiter_id) references mitarbeiter(mitarbeiter_id) on delete cascade on update cascade
);

create view active_keyassignments as
    select ka.*
    from keyassignments ka
    join tokens t on ka.token_id = t.token_id
    where t.is_active = true and ka.rueckgabedatum is null;