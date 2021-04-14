DROP DATABASE IF EXISTS employee_DB;

CREATE DATABASE employee_DB;

USE employee_DB;

CREATE TABLE department (
    dId INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
    dept_name VARCHAR(30)
);

CREATE TABLE roles (
    rId INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30),
    salary DECIMAL(8,0),
    departId INTEGER,
    FOREIGN KEY(departId) REFERENCES department(dId)
);

CREATE TABLE employee (
    id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    rolesId INTEGER ,
    managerId INTEGER,
	FOREIGN KEY (rolesId) REFERENCES roles(rId),
    FOREIGN KEY (managerId) REFERENCES employee(id)
    );
    
INSERT INTO department (dept_name) values ("Management");
INSERT INTO department (dept_name) values ("Fieldwork");
INSERT INTO department (dept_name) values ("Client Relations");
INSERT INTO department (dept_name) values ("Technical Support");


INSERT INTO roles (title, salary, departId) values ("Job Captain", 100000, 1);
INSERT INTO roles (title, salary, departId) values ("Operator", 30000, 2);
INSERT INTO roles (title, salary, departId) values ("Customer Service", 75000, 3);
INSERT INTO roles (title, salary, departId) values ("Technician", 50000, 4);
INSERT INTO roles (title, salary, departId) values ("Independant Contractor", 85000, 2);


INSERT INTO employee (first_name, last_name, rolesId) values ("Evelyn", "Parker", 3);
INSERT INTO employee (first_name, last_name, rolesId) values ("Dexter", "DeShawn", 1);
INSERT INTO employee (first_name, last_name, rolesId, managerId) values ("Jackie", "Welles", 2, 2);
INSERT INTO employee (first_name, rolesId, managerId) values ("V", 2, 2);
INSERT INTO employee (first_name, last_name, rolesId) values ("Johnny", "Silverhand", 5);
INSERT INTO employee (first_name, last_name, rolesId, managerId) values ("Judy", "Alvarez", 4, 1);
