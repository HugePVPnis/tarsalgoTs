CREATE DATABASE autoberles DEFAULT CHARACTER SET utf8 COLLATE utf8_hungarian_ci;
berlok tábla
CREATE TABLE `autoberles`.`berlok` ( `id` INT NOT NULL AUTO_INCREMENT ,  `nev` VARCHAR(100) NOT NULL ,  `jogositvanyszama` VARCHAR(15) NOT NULL ,  `telefonszam` VARCHAR(20) NULL ,  `szuletesiido` DATE NOT NULL ,  `lakcim` VARCHAR(50) NOT NULL ,    PRIMARY KEY  (`id`)) ENGINE = InnoDB;
autok tábla
CREATE TABLE `autoberles`.`berlok` ( `id` INT NOT NULL AUTO_INCREMENT ,  `nev` VARCHAR(100) NOT NULL ,  `jogositvanyszama` VARCHAR(15) NOT NULL ,  `telefonszam` VARCHAR(20) NULL ,  `szuletesiido` DATE NOT NULL ,  `lakcim` VARCHAR(50) NOT NULL ,    PRIMARY KEY  (`id`)) ENGINE = InnoDB;
kolcsonzes tábla
CREATE TABLE `autoberles`.`berlok` ( `id` INT NOT NULL AUTO_INCREMENT ,  `nev` VARCHAR(100) NOT NULL ,  `jogositvanyszama` VARCHAR(15) NOT NULL ,  `telefonszam` VARCHAR(20) NULL ,  `szuletesiido` DATE NOT NULL ,  `lakcim` VARCHAR(50) NOT NULL ,    PRIMARY KEY  (`id`)) ENGINE = InnoDB;
kapcsolatok létrehozása
autok tabla feltöltése adatokkal
INSERT INTO `autok` (`id`, `rendszam`, `tipus`, `evjarat`, `szin`) VALUES (NULL, 'ABC456', 'Ford Ka', '2003', 'Pink'), (NULL, 'ABC123', 'Volkswagen Golf', '2011', 'Fehér'), (NULL, 'ABC157', 'Ford Mondeo', '2015', 'Fekete'),(NULL, 'ABC448', 'Volkswagen Golf', '2012', 'Kék');
berlok tabla feltöltése adatokkal
INSERT INTO `berlok` (`id`, `nev`, `jogositvanyszama`, `telefonszam`, `szuletesiido`, `lakcim`) VALUES (NULL, 'Kandúr Károly', 'LR337157', '06-41-334112', '', ''), (NULL, 'Gipsz Jakab', 'VE445112', '06-41-555223', '', '');
kolcsonzes tabla feltöltése adatokkal
INSERT INTO `kolcsonzes` (`id`, `berloid`, `autoid`, `berletkezdete`, `napokszama`, `napidij`) VALUES (NULL, '1', '4', '2017-04-23', NULL, '12500'), (NULL, '2', '3', '2017-04-25', NULL, '9999');
UPDATE `kolcsonzes` SET `napokszama` = '6' WHERE `kolcsonzes`.`id` = 1;
lekérdezések
SELECT berlok.nev,kolcsonzes.napokszama*kolcsonzes.napidij AS bérletidíj FROM berlok INNER JOIN kolcsonzes ON berlok.id=kolcsonzes.berloid WHERE berlok.nev="Kandúr Károly"
SELECT berlok.nev,autok.rendszam FROM berlok INNER JOIN kolcsonzes ON berlok.id=kolcsonzes.berloid INNER JOIN autok ON autok.id=kolcsonzes.autoid WHERE kolcsonzes.napokszama IS NULL