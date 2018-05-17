const { Pool } = require('pg');
var config = require('../../configKeys');

const pool = new Pool({
  user: process.env.PGUSER || config.PgressUser,
  host: process.env.PGHOST || config.PgressHost,
  database: process.env.PGDATABASE || config.PgressDB,
  password: process.env.PGPASSWORD || config.PgressPassword,
  port: process.env.PGPORT || config.PgressPort,
  max: process.env.PGMAXPOOL || 10,
  idleTimeoutMillis: process.env.PGIDLETIMEOUT || 30000,
  connectionTimeoutMillis: process.env.PGCONNECTIONTIMEOUT || 10000
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
