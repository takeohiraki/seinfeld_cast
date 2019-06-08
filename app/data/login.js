require('dotenv').config()
const mysql = require('mysql'),
      path = require('path'),
      fs = require('fs'),
      inquirer = require('inquirer')

// Path to SQL File
const SQLFile = 'seinfeldDB.sql'

var uploadFile = function(username, password){
  connection = mysql.createConnection({
    host: 'localhost',
    user: process.env.DB_USER || username,
    password: process.env.DB_PASSWORD || process.env.DB_PASS || password,
    port: 3306
  });
  
  connection.connect();
  
  let queries = fs.readFileSync(path.join(__dirname, SQLFile), { encoding: "UTF-8" }).split(";\n");
  for (let query of queries) {
    query = query.trim();
    if (query.length !== 0 && !query.match(/\/\*/)) {
      connection.query(query, function (err, sets, fields) {
        if (err) {
          console.log(err)
          console.log(`Importing failed for Mysql Database  - Query:${query}`);
        } else {
          console.log(`Importing Mysql Database  - Query:${query}`);
        }
      });
    }
  };
  connection.end()
}

if (!process.env.DB_USER) {
  console.log('No credentials found for MySQL in .env')
  inquirer
    .prompt([{
        message: 'Please enter your MySQL username',
        name: 'username'
    },
    {
        message: 'Please enter your MySQL password',
        name: 'password',
        type: 'password'
    }])
    .then(answers => {
      var db_credentials = 'DB_USER=' + answers.username + '\nDB_PASSWORD=' + answers.password

    fs.writeFile(path.join(__dirname, '../../.env'), db_credentials, (err) => {
        if (err) throw err;
        console.log('Credentials saved into .env file');
    });
      uploadFile(answers.username, answers.password)
    });
  } else {
    uploadFile()
  }