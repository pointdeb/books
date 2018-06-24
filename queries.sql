DROP TABLE IF EXISTS user;
CREATE TABLE user (
	id INT PRIMARY KEY AUTO_INCREMENT,
	first_name VARCHAR(50) NOT NULL,
	last_name VARCHAR(50) NULL,
	email VARCHAR(50) NOT NULL,
	password VARCHAR(50) NOT NULL,
	active BOOLEAN NOT NULL DEFAULT true,
	admin BOOLEAN NOT NULL DEFAULT false,
	creation_date DATETIME NOT NULL DEFAULT NOW()
);

INSERT INTO user (first_name, last_name, email, password, admin) VALUES ('developer', NULL, 'developer@gmail.com', '8e2ad3b8e7ee8cdf34d66b120fae70625ab1a4ae', true);
INSERT INTO user (first_name, last_name, email, password, admin) VALUES ('user', NULL, 'user@gmail.com', '8e2ad3b8e7ee8cdf34d66b120fae70625ab1a4ae', false);

DROP TABLE IF EXISTS book;
CREATE TABLE book (
	id INT PRIMARY KEY AUTO_INCREMENT,
	name VARCHAR(50) NOT NULL,
	edition VARCHAR(50) NOT NULL,
	author VARCHAR(50) NOT NULL,
	nbr VARCHAR(50) NOT NULL,
	user INT NOT NULL ,
	active BOOLEAN NOT NULL DEFAULT true ,
	creation_date DATETIME NOT NULL DEFAULT NOW()
);

INSERT INTO book (name, edition, author, nbr, user) VALUES ('PHP advanced', 'EYROLLES', 'EYROLLES', 5, 1);
INSERT INTO book (name, edition, author, nbr, user) VALUES ('PHP unit', 'EYROLLES', 'EYROLLES', 5, 1);

DROP TABLE IF EXISTS emprunt;
CREATE TABLE emprunt (
	id INT PRIMARY KEY AUTO_INCREMENT,
	start_date DATE NOT NULL,
	end_date DATE NOT NULL,
	book INT NOT NULL,
	user INT NOT NULL,
	active BOOLEAN NOT NULL DEFAULT true,
	creation_date DATETIME NOT NULL DEFAULT NOW()
);