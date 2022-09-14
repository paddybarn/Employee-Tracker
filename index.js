const inquirer = require("inquirer")
const fs = require("fs")
const cTable = require('console.table');
var mysql = require('mysql2');


const runDb = () => {
    return inquirer.prompt([
        {
            type: "list",
            message: "Select from the following options:",
            name: "startMenu",
            choices: ["view all departments", "view all roles", "view all employees", "add a department", "add a role", "add an employee", "update an employee role"],
        }
    ]) .then((select) => {
        if(select.startMenu === "view all departments"){
            return viewDepeartments()
        } else if(select.startMenu === "view all roles"){
            return viewRoles()
        } else if(select.startMenu === "view all employees"){
            return viewEmployees()
        } else if(select.startMenu === "add a department"){
            return addDepartment()
        } else if(select.startMenu === "add a role"){
            return addRole()
        } else if(select.startMenu === "add an employee"){
            return addEmployee()
        } else if(select.startMenu === "update an employee role"){
            return updateRole()
        }
    })
}

runDb()

const viewDepeartments = () => {
    

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "employee_db"
});

con.connect(function(err) {
  if (err) throw err;
  con.query("SELECT * FROM department", function (err, result, fields) {
    if (err) throw err;
    console.table(result);
  });
  runDb()
});
}

const viewRoles = () => {
    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "password",
        database: "employee_db"
      });
      
      con.connect(function(err) {
        if (err) throw err;
        con.query("SELECT * FROM roles", function (err, result, fields) {
          if (err) throw err;
          console.table(result);
        });
      runDb()
      });
      }

const viewEmployees = () => {
    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "password",
        database: "employee_db"
      });
      
      con.connect(function(err) {
        if (err) throw err;
        con.query("SELECT * FROM employee", function (err, result, fields) {
          if (err) throw err;
          console.table(result);
        });
      runDb()
      });
}

const addDepartment = () => {
    return inquirer.prompt([
        {
            type:'number',
            message:'insert id number',
            name:'deptID'
        },
        {
            type:'input',
            message:'insert department name',
            name:'deptName'
        }
    ]) .then((resp) => {
    runDb()
    var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "employee_db"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var sql = `INSERT INTO department (id, department_name) VALUES (${resp.deptID}, "${resp.deptName}")`
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("=====New department inserted!=====");
  });
})
    })
}

const addRole = () => {
      return inquirer.prompt([
        {
            type:'number',
            message:'insert id number',
            name:'roleID'
        },
        {
            type:'input',
            message:'insert role title',
            name:'roleName'
        },
        {
          type: 'number',
          message: 'insert salary amount',
          name: 'roleSalary'
        }
    ]) .then((resp) => {
    var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "employee_db"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var sql = `INSERT INTO roles (id, title, salary) VALUES (${resp.roleID}, "${resp.roleName}", ${resp.roleSalary})`
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("=====New role inserted!=====");
  });
})
  runDb()
    })
}

const addEmployee = () => {
  return inquirer.prompt([
    {
        type:'number',
        message:'insert id number',
        name:'empID'
    },
    {
        type:'input',
        message:'insert employee first name',
        name:'empFirstName'
    },
    {
      type: 'input',
      message: 'insert employee last name',
      name: 'empLastName'
    },
    {
      type: 'number',
      message: 'insert manager id',
      name: 'manID'
    }
]) .then((resp) => {
var con = mysql.createConnection({
host: "localhost",
user: "root",
password: "password",
database: "employee_db"
});

con.connect(function(err) {
if (err) throw err;
console.log("Connected!");
var sql = `INSERT INTO employee (id, first_name, last_name, manager_id) VALUES (${resp.empID}, "${resp.empFirstName}", "${resp.empLastName}", ${resp.manID})`
con.query(sql, function (err, result) {
if (err) throw err;
console.log("=====New employee inserted!=====");
});
})
runDb()
})
}

const updateRole = () => {
  return inquirer.prompt([
    {
      type:'number',
      message:'insert role id you wish to change',
      name:'roleID'
    },
    {
        type:'input',
        message:'insert new role',
        name:'newRole'
    }
]) .then((resp) => {
var con = mysql.createConnection({
host: "localhost",
user: "root",
password: "password",
database: "employee_db"
});

con.connect(function(err) {
if (err) throw err;
console.log("Connected!");
var sql = `UPDATE roles SET title = "${resp.newRole}" WHERE id = ${resp.roleID}`
con.query(sql, function (err, result) {
if (err) throw err;
console.log("=====Role updated!=====");
});
})
runDb()
})
}