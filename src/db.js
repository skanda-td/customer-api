const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host:     process.env.DB_HOST,
  port:     process.env.DB_PORT,
  database: process.env.DB_NAME,
  user:     process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

// const a = {
//     host : process.env.DB_HOST
// }

// console.log(a.host)
// console.log(typeof a.host)

// Test the connection on startup
pool.connect((err, client, release) => {
  if (err) {
    console.error('Database connection failed:', err.message);
  } else {
    console.log('Connected to PostgreSQL');
    release();
    // why release? because we are just testing the connection, 
    // we don't need to keep it open. 
    // releasing it allows other parts of the application to use the connection pool without running into issues of too many open connections.
  }
});

module.exports = pool;