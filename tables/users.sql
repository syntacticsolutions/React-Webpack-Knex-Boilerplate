CREATE TABLE IF NOT EXISTS {}.users (
id INT NOT NULL AUTO_INCREMENT,
first_name VARCHAR(20) NOT NULL,
last_name VARCHAR(20) NOT NULL,
address VARCHAR(35) NOT NULL,
city VARCHAR(30) NOT NULL,
state VARCHAR(30) NOT NULL,
zip INT NOT NULL,
PRIMARY KEY (id)
);
