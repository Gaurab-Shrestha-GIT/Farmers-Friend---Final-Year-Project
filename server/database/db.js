const mysql = require("mysql");

const db = mysql.createConnection({
  // host: "localhost",
  // user: "root",
  // password: "admin123",
  // database: "farmer_friend",
  host: "us-cdbr-east-05.cleardb.net",
  user: "be4fd9448086e0",
  password: "99e4f13d",
  database: "heroku_2f3a5afed2151cd",
});
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("MySql Database is Connected");
});

module.exports = db;
