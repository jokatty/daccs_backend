import express from 'express';
import pg from 'pg';
import cors from 'cors';

const app = express();
const PORT = 3004;
const { Pool } = pg;

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

// set a home route
app.get('/', (req, res) => {
  const sqlQuery = 'SELECT * FROM users';
  pool.query(sqlQuery, (error, result) => {
    if (error) {
      console.log('error executing the query', error.stack);
      res.status(503).send(result.rows);
    }
    const userData = {
      data: result.rows,
    };
    res.send(userData);
  });
});
// spin the server in port 3004
app.listen(PORT, () => {
  console.log(`listing to port:${PORT}`);
});
