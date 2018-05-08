const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
  max: process.env.PGMAXPOOL,
  idleTimeoutMillis: process.env.PGIDLETIMEOUT,
  connectionTimeoutMillis: process.env.PGCONNECTIONTIMEOUT
});

exports.execQuery = (callback, sqlQuery) => {
  pool.connect((err, client, release) => {
    client.query(sqlQuery, function(err, result) {
      release();
      callback(err, result);
    });
  });
};

function closeConnection() {
  pool.end().then(() => console.log('\nConnection closed and Pools ended..'));
}
