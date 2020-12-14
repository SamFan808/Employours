DROP DATABASE IF EXISTS employee_DB;

CREATE DATABASE employee_DB;

USE employee_DB;

CREATE TABLE employee (
    id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    rolesId INTEGER,
    managerId INTEGER
    );

CREATE TABLE department (
    id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
    dept_name VARCHAR(30)
);

CREATE TABLE roles (
    id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30),
    salary DECIMAL(6,0),
    departId INTEGER
);

INSERT INTO department (dept_name) values ("Management");
INSERT INTO department (dept_name) values ("Fieldwork");
INSERT INTO department (dept_name) values ("Corporate");

INSERT INTO roles (title, salary, departId) values ("Job Captain", 100000, 1);
INSERT INTO roles (title, salary, departId) values ("Operator", 30000, 2);
INSERT INTO roles (title, salary, departId) values ("Field_Coordinator", 500000, 3);

INSERT INTO employee (first_name, last_name, rolesId, managerId) values ("V", "V", 3, 1);
INSERT INTO employee (first_name, last_name, rolesId) values ("Dexter", "DeShawn", 1);
INSERT INTO employee (first_name, last_name, rolesId, managerId) values ("Jackie", "Wells", 3, 1);

SELECT * FROM employee;
