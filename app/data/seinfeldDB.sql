DROP DATABASE IF EXISTS seinfeldDB;
CREATE database seinfeldDB;

USE seinfeldDB;

CREATE TABLE actors (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(45) NULL,
  coolness_points INT NULL,
  attitude VARCHAR(45) NULL,
  created_at datetime default now()
);

INSERT INTO actors (name, coolness_points, attitude)
VALUES ("Jerry", 10, "smug")
  , ("Kramer", 20, "spazzy")
  , ("Louis", 15, "smart")
  , ("George", 12, "nervous");

SELECT * FROM actors;
