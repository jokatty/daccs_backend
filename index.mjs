import express from 'express';
import pg from 'pg';
import cors from 'cors';

const app = express();
const PORT = 3004;
const { Pool } = pg;

// Bind Express middleware to parse requests body for POST requests
app.use(express.urlencoded({ extended: true }));

// read data from our AJAX POST request and populate request.body
app.use(express.json());

// let the backend know the response is coming from local host
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';

// set CORS header
app.use(cors({
  credentials: true,
  origin: FRONTEND_URL,
}));

// configure database
let pgConnectionConfig;
if (process.env.DATABASE_URL) {
  pgConnectionConfig = {
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  };
} else {
  pgConnectionConfig = {
    user: 'jyotikattani',
    host: 'localhost',
    database: 'daccs',
    port: '5432',
  };
}

const pool = new Pool(pgConnectionConfig);

// set a home route. Sends user data in the response body.
app.get('/', (req, res) => {
  const sqlQuery = 'SELECT * FROM users';
  pool.query(sqlQuery, (error, result) => {
    if (error) {
      res.status(503).send(result.rows);
    }
    const userData = {
      data: result.rows,
    };
    res.send(userData.data);
  });
});

// post request route for receiving updated data.
app.post('/update', (req, res) => {
  const {
    id, userName, email, phone, address, bankAccount,
  } = req.body;
  const sqlQuery = `UPDATE users SET user_name='${userName}', user_address='${address}', phone='${phone}', email='${email}', bank_account='${bankAccount}' WHERE id=${id}`;

  pool.query(sqlQuery, (error, result) => {
    if (error) {
      res.status(503).send(result);
    }
    res.send(result);
  });
});

// spin the server in port 3004
app.listen(PORT);
