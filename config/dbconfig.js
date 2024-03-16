const mysql = require("mysql2");

const pool = mysql.createPool({
  host: process.env.hostName,
  user: process.env.user,
  password: process.env.password,
  database: process.env.dbName,
  waitForConnections: true, // This option waits for a free connection if the maximum connection limit is reached.
  // connectionLimit: 10, // Adjust this value based on your server's capabilities and requirements.
  queueLimit: 0, // No limit on the connection queue.
});

pool.getConnection(function (err, connection) {
  if (err) {
    console.log("Error connecting to the database:", err);
  } else {
    console.log("Connected to the database!");
    // Perform database operations here using the 'connection' object.
  }
});

module.exports = pool;
