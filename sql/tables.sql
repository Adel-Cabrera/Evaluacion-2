CREATE TABLE users (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	first_name VARCHAR(90) NOT NULL,
	last_name VARCHAR(90) NOT NULL,
	bio TEXT,
	email VARCHAR(255) NOT NULL
);

CREATE TABLE quotes (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	author VARCHAR(90) NOT NULL,
	quote TEXT,
	photo TEXT,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	user_id INT,
	KEY user_id_idx(user_id)
);

INSERT INTO users (first_name, last_name, bio, email) VALUES (
	'Aedel', 'Darkonnen', 'Im a software engineer at Google', 'adel.cabrera@ciisa.cl'
);