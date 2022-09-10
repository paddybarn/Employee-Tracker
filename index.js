const inquirer = require("inquirer")
const fs = require("fs")
const cTable = require('console.table');
var mysql = require('mysql2');


const commands = []
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
    console.log(result);
  });
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
          console.log(result);
        });
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
          console.log(result);
        });
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

    var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "employee_db"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var sql = `INSERT INTO department (${resp.deptID}, ${resp.deptName}) VALUES (id, department_name)`
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });
})
    })
}
