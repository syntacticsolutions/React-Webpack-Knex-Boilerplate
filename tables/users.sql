CREATE TABLE users (
id INT NOT NULL AUTO_INCREMENT,
first_name VARCHAR(20) NOT NULL,
last_name VARCHAR(20) NOT NULL,
address VARCHAR(35) NOT NULL,
city VARCHAR(30) NOT NULL,
state VARCHAR(30) NOT NULL,
zip INT NOT NULL,
PRIMARY KEY (id)
);

-- INSERT INTO users ( id, first_name, last_name, address, city, state, zip )
-- VALUES ( DEFAULT, 'Michael', 'Coder', '2600 Quail Ridge W Lane','Roseville', 'CA', '95678'),
-- (DEFAULT, 'Rachael', 'Coder', '2600 Quail Ridge W Lane', 'Roseville', 'CA', '95678'),
-- (DEFAULT, 'Jessica', 'Gonzalez', '4104 Storm Ave.', 'Yakima', 'WA', '98908'),
-- (DEFAULT, 'Denise', 'Tucker', '3801 Lily St.', 'Sacramento', 'CA', '95838');