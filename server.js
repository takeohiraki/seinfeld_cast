const express = require('express')
const path = require("path");

const mysql = require("mysql")
require("dotenv").config();
var keys = require("./keys.js")

// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, '/app/public')));

var client = mysql.createConnection({
    host: "localhost",
    port: 3306,
     
    user: keys.mysql.id,
    password: keys.mysql.secret,

    database: "seinfeldDB"
});


// Routes
app.get("/cast", function(req, res) {

    console.log("cast");
    var query = 'SELECT * FROM actors;'
    queryData(query, res)

});

app.get("/coolness-chart", function(req, res) {

    console.log("coolness");
    var query = 'SELECT * FROM actors ORDER BY coolness_points DESC;'
    queryData(query, res)
    
});

app.get("/attitude-chart/:att", function(req, res) {

    var att = req.params.att
    console.log("attitude");
    var query = "SELECT * FROM actors WHERE attitude = '"
    query += att + "';"
    console.log(query)

    queryData(query, res)

});


function queryData(query, res) {
    console.log('search query run')
    console.log(query);

    // client.connect();
    client.query(query, (err, result) => {
    
        if (err) throw err;
        
        this.sql
        client.end();
        console.log(result);
        return res.send(result);
        
    });
}


// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
