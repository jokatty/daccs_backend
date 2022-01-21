import express from 'express';
import pg from 'pg';

const app = express();
const PORT = 3004;
const { Pool } = pg;

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
