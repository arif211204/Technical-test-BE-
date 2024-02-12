require('dotenv').config()
const cors = require('cors')
const express = require('express');
const mysql = require('mysql2');
const db = require('./models');


const PORT = process.env.PORT || 2000;

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});
  
const app = express()
app.use(cors())

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    db.sequelize.sync({ alter: true });
});
console.log(process.env.PORT);
console.log(process.env.MYSQL_HOST );

app.use((req, res, next) => {
    pool.getConnection((err, connection) => {
      if (err) {
        console.error('Error getting database connection:', err);
        return res.status(500).json({ error: 'Database connection error' });
      }
  
      req.dbConnection = connection;
      next();
    });
  });
  
  app.use((req, res, next) => {
    if (req.dbConnection) {
      req.dbConnection.release();
    }
    next();
  });