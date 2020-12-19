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
  "SELECT e.id, e.first_name, e.last_name, title, salary, dept_name, CONCAT(m.first_name, ' ', m.last_name) AS 'Manager' FROM employee e LEFT JOIN employee m ON m.id = e.managerId LEFT JOIN roles ON e.rolesId = (roles.rId) LEFT JOIN department ON roles.departId = (department.dId) ORDER by e.id";
const departmentsAll =
  "SELECT dept_name AS 'Department', title AS 'Title', salary AS 'Salary', CONCAT(first_name, ' ' , last_name) AS 'Name' FROM department LEFT JOIN roles ON roles.departId = (department.dId) LEFT JOIN employee ON employee.rolesId = (roles.rId)";
const rolesAll =
  "SELECT rId, title,  salary, dept_name FROM roles LEFT JOIN department ON roles.departId = (department.dId)";
const employeesEverything =
  "SELECT e.id, e.first_name, e.last_name, title, salary, e.rolesId, e.managerId, CONCAT(m.first_name, ' ', m.last_name) AS 'manager' FROM employee e LEFT JOIN employee m ON m.id = e.managerId LEFT JOIN roles ON e.rolesId = (roles.rId) LEFT JOIN department ON roles.departId = (department.dId)";

// connection
connection.connect((err) => {
  if (err) throw err;
  console.log(`Connected at ${connection.threadId}`);
  splashTitle();
  menu();
});

//functions
const menu = () => {
  inquirer
    .prompt({
      type: "list",
      name: "action",
      message: "What would you like to do?",
      choices: [
        "View All Employees",
        "View All Roles",
        "View All Departments",
        "Add Employee",
        "Add Role",
        "Add Department",
        "Update Employee Role",
        "Exit",
      ],
    })
    .then(({ action }) => {
      switch (action) {
        case "View All Employees":
          new View(employeesByAll);
          break;
        case "View All Roles":
          new View(rolesAll);
          break;
        case "View All Departments":
          new View(departmentsAll);
          break;
        case "Add Employee":
          addEmployee();
          break;
        case "Add Role":
          addRole();
          break;
        case "Add Department":
          addDepartment();
          break;
        case "Update Employee Role":
          updateRole();
          break;
        case "Exit":
          connection.end();
          break;
      }
    });
};

const addEmployee = () => {
  console.log("Adding employee...");
  connection.query(
    "SELECT id, first_name, last_name FROM employee",
    (err, res) => {
      if (err) throw err;
      let management = res.map((managers) => {
        return {
          name: managers.first_name + " " + managers.last_name,
          value: managers.id,
        };
      });
      connection.query("SELECT rId, title FROM roles", (err, res) => {
        if (err) throw err;
        let titles = res.map((roleTitle) => {
          return {
            name: roleTitle.title,
            value: roleTitle.rId,
          };
        });
        inquirer
          .prompt([
            {
              type: "input",
              name: "first_name",
              message: "Please enter the first name of the employee: ",
            },
            {
              type: "input",
              name: "last_name",
              message: "Please enter the last name of the employee: ",
            },
            {
              type: "list",
              name: "rolesId",
              message: "Please choose a role from the following list",
              choices: [...titles],
            },
            {
              type: "list",
              name: "managerId",
              message: "Who is the employers manager?",
              choices: [...management, "None"],
            },
          ])
          .then(({ first_name, last_name, rolesId, managerId }) => {
            managerId === "None" ? (managerId = null) : managerId;
            connection.query(
              "INSERT INTO employee SET ?",
              {
                first_name,
                last_name,
                rolesId,
                managerId,
              },
              (err) => {
                if (err) throw err;
                console.log("Employee added!");
                menu();
              }
            );
          });
      });
    }
  );
};

const addDepartment = () => {
  console.log("Adding department...");
  inquirer
    .prompt([
      {
        type: "input",
        name: "dept_name",
        message: "Please enter the name of a new Department: ",
        validate: (response) =>
          response === ""
            ? console.log("Department name cannot be left blank")
            : true,
      },
    ])
    .then((answer) => {
      const query = "INSERT INTO department SET ?";
      connection.query(query, { dept_name: answer.dept_name }, (err, res) => {
        if (err) throw err;
        console.log("Department added!");
        menu();
      });
    });
};

const addRole = () => {
  console.log("Adding Role...");
  connection.query("SELECT * FROM department", (err, res) => {
    if (err) throw err;
    let dept = res.map((roleDept) => {
      return {
        name: roleDept.dept_name,
        value: roleDept.dId,
      };
    });
    inquirer
      .prompt([
        {
          type: "input",
          name: "title",
          message: "Please enter the name of new Role: ",
          validate: (response) =>
            response === ""
              ? console.log("Department name cannot be left blank")
              : true,
        },
        {
          type: "input",
          name: "salary",
          message:
            "Please enter the salary for the new Role without spaces or commas please: ",
          validate: (response) => {
            const num = response.match(/\d+$/);
            if (num) {
              return true;
            } else {
              return "Salary must be a number.";
            }
          },
        },
        {
          type: "list",
          name: "departId",
          message: "Please select a department for this role",
          choices: [...dept],
        },
      ])
      .then(({ title, salary, departId }) => {
        connection.query(
          "INSERT INTO roles SET ?",
          {
            title,
            salary,
            departId,
          },
          (err) => {
            if (err) throw err;
            console.log("Role added!");
            menu();
          }
        );
      });
  });
};

const updateRole = () => {
  console.log("Updating role...");
  connection.query(
    "SELECT id, first_name, last_name FROM employee",
    (err, res) => {
      if (err) throw err;
      let employees = res.map((empList) => {
        return {
          name: empList.first_name + " " + empList.last_name,
          value: empList.id,
        };
      });
      connection.query("SELECT rId, title FROM roles", (err, res) => {
        if (err) throw err;
        let titles = res.map((roleTitle) => {
          return {
            name: roleTitle.title,
            value: roleTitle.rId,
          };
        });
        inquirer
          .prompt([
            {
              type: "list",
              name: "id",
              message: "Please choose an employee",
              choices: [...employees],
            },
            {
              type: "list",
              name: "rolesId",
              message: "Please choose a new role",
              choices: [...titles],
            },
          ])
          .then(({ rolesId, id }) => {
            connection.query(
              "UPDATE employee SET ? WHERE ?",
              [
                {
                  rolesId,
                },
                {
                  id: id,
                },
              ],
              (err) => {
                if (err) throw err;
                console.log("Employee role updated!");
                menu();
              }
            );
          });
      });
    }
  );
};
// Constructor functions and other query functions
function View(category) {
  this.category = category;
  connection.query(category, (err, data) => {
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
