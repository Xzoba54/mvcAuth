const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "mvcauth",
  password: "",
});
module.exports = db.promise();
