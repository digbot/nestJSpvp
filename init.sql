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


CREATE TABLE `day` (
    id INT AUTO_INCREMENT PRIMARY KEY, -- Auto-incrementing primary key
    date DATE NOT NULL,                -- Corresponds to the "date" field
    value DECIMAL(10, 2) NOT NULL,     -- Corresponds to the "value" field (using DECIMAL for precision)
    comment VARCHAR(255) NOT NULL,     -- Corresponds to the "comment" field
    note VARCHAR(255) NOT null,       -- Corresponds to the "note" field,
    type ENUM('cc', 'manuel') NOT null,     -- Enum column with predefined values,
    hash VARCHAR(255) NOT NULL                -- Hash column for storing string hashes
);