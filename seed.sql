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
    dId INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
    dept_name VARCHAR(30)
);

CREATE TABLE roles (
    rId INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30),
    salary DECIMAL(6,0),
    departId INTEGER
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

SELECT * FROM employee;
SELECT * FROM roles;
SELECT 	* FROM department;

SELECT e.id, e.first_name, e.last_name, title, salary, dept_name, CONCAT(m.first_name, ' ', m.last_name)
AS "Manager" FROM employee e
INNER JOIN employee m ON m.id = e.managerId
LEFT JOIN roles ON e.rolesId = (roles.rId)
LEFT JOIN department ON roles.departId = (department.dId)
ORDER by e.id;

SELECT e.id, e.first_name, e.last_name, CONCAT(m.first_name, ' ', m.last_name) AS 'Manager'
FROM employee e INNER JOIN employee m
ON m.id = e.managerId
ORDER by e.id;

SELECT rId, title,  salary, dept_name FROM roles LEFT JOIN department ON roles.departId = (department.dId);

SELECT dept_name AS 'Department', title AS 'Title', salary AS 'Salary', CONCAT(first_name, ' ' , last_name) AS 'Name' FROM department
LEFT JOIN roles ON roles.departId = (department.dId)
LEFT JOIN employee ON employee.rolesId = (roles.rId);

SELECT id, first_name, last_name, title, managerId, CONCAT(first_name, ' ', last_name) AS 'Manager'
FROM employee
LEFT JOIN roles ON employee.rolesId = (roles.rId)
LEFT JOIN department ON roles.departId = (department.dId);

