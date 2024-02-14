require('dotenv').config()
const cors = require('cors')
const express = require('express');
const mysql = require('mysql2');
const db = require('./models');
const { invoiceRouter,productRouter } = require('./routes');


const PORT = process.env.PORT || 2000;

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});
  
const app = express()
app.use(express.json());
app.use(cors())
app.use('/invoice', invoiceRouter);
app.use('/product',productRouter)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  // if you add table you can unComment this line 30
  // if you want to delete all table change alter to force 
  
    db.sequelize.sync({ alter: true });
});

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