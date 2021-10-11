var mysql = require("mysql");

var connMySql = function() {
    return mysql.createConnection({
        host : "localhost",
        user : "root",
        password : "root",
        database : "sistema_padrao"
    });  
}
module.exports = function() {  
    return connMySql;
}
