// npm dependencies
const mysql = require("mysql");
const inquirer = require("inquirer");
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

const menu = () => {
  inquirer
    .prompt({
      type: "list",
      name: "action",
      message: "What would you like to do?",
      choices: [
        "View All Employees",
        "View All Employees By Department",
        "View All Employees By Manager",
        "Add Employee",
        "Remove Employee",
        "Update Employee Role",
        "Update Employee Manager",
        "Exit",
      ],
    })
    .then(({ action }) => {
      switch (action) {
        case "View All Employees":
          console.log("Hey from All Employees");
          break;
        case "View All Employees By Department":
          console.log("Hey from all employees by dept");
          break;
        case "View All Employees By Manager":
          console.log("Hey from all employees by manager");
          break;
        case "Add Employee":
          console.log("Hey From Add employee");
          break;
        case "Remove Employee":
          console.log("Hey from remove employee");
          break;
        case "Update Employee Role":
          console.log("Hey from update Employee Role");
          break;
        case "Update Employee Manager":
          console.log("Hey from update employee Manager");
          break;
        case "Exit":
          connection.end();
      }
    });
};

menu();

// add department, add roles, add employees
// view department, view roles, view employees, view employee by manager
// update employee roles, update employee managers
// Delete departments, roles, and employees
// view (sort) total budget by dept, combine salaries

// Constructor functions

function View(category) {
  console.log(`Selecting from ${category}..`);
  connection.query(`SELECT * FROM ${category}`, (err, data) => {
    if (err) throw err;
    console.log(data);
    connection.end;
  });
}

const employees = new View(EMPLOYEE);

connection.connect((err) => {
  if (err) throw err;
  console.log(`Connected at ${connection.threadId}`);
});
