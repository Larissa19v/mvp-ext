--
-- Drop Tables
--

SET foreign_key_checks = 0;
DROP TABLE if exists projects;
DROP TABLE IF EXISTS userpalace; 
SET foreign_key_checks = 1;

--
-- Create Tables
--
CREATE TABLE projects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    projectname VARCHAR(255) NOT NULL,
    type VARCHAR(255),
    materials VARCHAR(255),
    description VARCHAR(255),
    image VARCHAR(255),
    complete BOOLEAN,
    favorite BOOLEAN
);

INSERT INTO projects (projectname, type, materials, description, image, complete, favorite) VALUES ("My first project", "sewing", "cotton", "a cute cat toy", "", false, false);



CREATE TABLE userpalace (
	id INT NOT NULL AUTO_INCREMENT,
	name VARCHAR(40) NOT NULL, 
	username VARCHAR(40) NOT NULL, 
	password VARCHAR(200) NOT NULL, 
	email VARCHAR(200) NOT NULL, 
	PRIMARY KEY (id),
    UNIQUE (username)
);
