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
// MySQL view query variables
const employeesByAll =
  "SELECT id, first_name, last_name, title, salary, dept_name, CONCAT(first_name, ' ', last_name) AS 'Manager' FROM employee LEFT JOIN roles ON employee.rolesId = (roles.rId) LEFT JOIN department ON roles.departId = (department.dId)";
const employeesByDept = "";
const employeesByManager = "";

const addEmployeE = "";
const addDept = "";
const addRole = "";

const addOperator = "";
const addCuService = "";
const employeesNames =
  "SELECT id, CONCAT(first_name, + ' ' ,last_name) FROM employee";

connection.connect((err) => {
  if (err) throw err;
  console.log(`Connected at ${connection.threadId}`);
  splashTitle();
  menu();
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
        "View All Employees By Department", // this one isn't even in the ReadMe
        "View All Employees By Manager", //bonus
        "View All Departments",
        "View All Roles",
        "Add Department",
        "Add Role",
        "Add Employee",
        "Remove Employee", //bonus
        "Update Employee Role",
        "Update Employee Manager", // bonus
        "Exit",
      ],
    })
    .then(({ action }) => {
      switch (action) {
        case "View All Employees":
          const empAll = new View(employeesByAll);
          break;
        case "View All Employees By Department":
          console.log("Hey from all employees by dept");
          break;
        case "View All Employees By Manager":
          console.log("Hey from all employees by manager");
          break;
        case "Add Employee":
          addEmployee();
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
          break;
      }
    });
};

function addEmployee() {
  console.log("Adding employee...");
  inquirer
    .prompt([
      {
        type: "input",
        name: "first_name",
        message: "Please enter the first name of the employee",
        validate: (response) =>
          response === ""
            ? console.log("First name cannot be left blank")
            : true,
      },
      {
        type: "input",
        name: "last_name",
        message: "Please enter the last name of the employee",
        validate: (response) =>
          response === ""
            ? console.log("Last name cannot be left blank")
            : true,
      },
      {
        type: "list",
        name: "role",
        message: "Please choose a role from the following list",
        choices: ["Job Captain", "Operator", "Customer Service"],
      },
    ])
    .then(function (choice) {
      // const addJobCaptain = "INSERT INTO employee SET ?";

      if (choice.role === "Job Captain") {
        new Add(addJobCaptain);
      } else if (choice.role === "Operator") {
        console.log("Hello, Operator");
        // new Add(addOperator);
      } else {
        console.log("Customer Service, how may I be of, uh... Service");
        // new Add(addCuService);
      }
    });
}

// add department, add roles, add employees
// view department, view roles, view employees, view employee by manager
// update employee roles, update employee managers
// Delete departments, roles, and employees
// view (sort) total budget by dept, combine salaries

// Constructor functions and other query functions
function View(category) {
  this.category = category;
  connection.query(category, (err, data) => {
    if (err) throw err;
    console.table(data);
    menu();
  });
}

function Add(role) {
  this.role = role;
  connection.query(role, (err, data) => {
    if (err) throw err;
    console.table(data);
    menu();
  });
  console.log(query.sql);
}

// useless but fun splash page
const splashTitle = () =>
  console.log(
    logo({
      name: "Employours",
      font: "Speed",
      lineCHars: 10,
      padding: 2,
      margin: 3,
      borderColor: "bold-cyan",
      logoColor: "bold-yellow",
      textColor: "teal",
    })
      .emptyLine()
      .render()
  );
