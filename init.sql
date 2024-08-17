CREATE DATABASE IF NOT EXISTS pvp;
USE pvp;

CREATE TABLE  IF NOT EXISTS   `month` (
  `in` int NOT NULL,
  `out` int NOT NULL,
  `date` datetime NOT NULL,
  `buffer` int DEFAULT NULL,
  `id` bigint NOT NULL AUTO_INCREMENT,
  `invest` int NOT NULL,
  PRIMARY KEY (`id`)
);


CREATE TABLE  IF NOT EXISTS  `month_save2` (
  `in` int NOT NULL,
  `out` int NOT NULL,
  `date` datetime NOT NULL,
  `buffer` int DEFAULT NULL,
  `id` bigint NOT NULL AUTO_INCREMENT,
  `invest` int NOT NULL,
  PRIMARY KEY (`id`)
);