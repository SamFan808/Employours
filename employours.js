// npm dependencies
const mysql = require("mysql");
const inquirer = require("inquier");
const consoleTable = require("console.table");
// connection
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "honk balloon tennis",
  database: "employee_DB",
});

//functions
// inquirer - department {id, name}, role {id, title, salary, department_id}, employee {id, first_name, last_name, role_id, manager_id}

connection.connect((err) => {
  if (err) throw err;
  console.log(`Connected at ${connection.threadId}`);
});
