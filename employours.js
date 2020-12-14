// npm dependencies
const mysql = require("mysql");
const inquirer = require("inquirer");
const consoleTable = require("console.table");
const logo = require("asciiart-logo");
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
  console.log(
    logo({
      name: "Employours",
      font: "Speed",
      lineCHars: 10,
      padding: 2,
      margin: 3,
      borderColor: "pink",
      logoColor: "bold-green",
      textColor: "teal",
    })
      .emptyLine()
      .render()
  );
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
          view();
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

// add department, add roles, add employees
// view department, view roles, view employees, view employee by manager
// update employee roles, update employee managers
// Delete departments, roles, and employees
// view (sort) total budget by dept, combine salaries

// Constructor functions

const view = () => {
  console.log("Selecting from Employee");
  connection.query("SELECT * FROM employee", (err, data) => {
    if (err) throw err;
    console.table(data);
    connection.end;
  });
};

menu();

connection.connect((err) => {
  if (err) throw err;
  console.log(`Connected at ${connection.threadId}`);
});
