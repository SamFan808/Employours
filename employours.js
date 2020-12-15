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
  "SELECT id, first_name, last_name, title, salary, dept_name, CONCAT(first_name, ' ', last_name) AS 'Manager' FROM employee INNER JOIN roles ON employee.rolesId = (roles.rId) INNER JOIN department ON roles.departId = (department.dId)";
const employeesByDept = "";
const employeesByManager = "";
const addJobCaptain = "";
const addOperator = "";
const addCuService = "";

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
          new View(employeesByAll);
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
      if (choice.role === "Job Captain") {
        console.log(choice.first_name);
        // new Add(addJobCaptain);
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
  // console.log(`Selecting from ${category}`);
  const query = connection.query(category, (err, data) => {
    if (err) throw err;
    console.table(data);
    menu();
  });
}

function Add(role) {
  this.role = role;
  console.log(`Selecting from ${role}`);
  const query = connection.query(role, (err, data) => {
    if (err) throw err;
    console.table(data);
    menu();
  });
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

splashTitle();
menu();

connection.connect((err) => {
  if (err) throw err;
  console.log(`Connected at ${connection.threadId}`);
});
