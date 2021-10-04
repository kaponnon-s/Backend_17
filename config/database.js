const mysql = require("mysql")

const connect = mysql.createConnection({
    host     : 'localhost',
    user     : 'node',
    password : 'password',
    database : 'test_db',
    connectionLimit: 5
})

connect.connect((err) =>{
    if(err) throw err
    console.log("success");
})

module.exports = connect