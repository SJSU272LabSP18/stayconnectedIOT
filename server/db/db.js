const { Pool } = require('pg');
const keys = require('../config/keys');

function getConnection() {
  const pool = new Pool({
    user: keys.PgressUser,
    host: keys.PgressHost,
    database: keys.PgressDB,
    password: keys.PgressPassword,
    port: keys.PgressPort
  });
  return pool;
}

exports.fetchData = (callback, sqlQuery) => {
  console.log('\nSQL Query:: ' + sqlQuery);
  var connection = getConnection();
  console.log('Fetch Data');
  connection.query(sqlQuery, function(err, rows, fields) {
    if (err) {
      console.log('ERROR: ' + err.message);
    } else {
      // return err or result
      console.log('DB Results:' + JSON.stringify(rows));
    }
    callback(err, rows);
    connection.end();
  });
  console.log('\nConnection closed..');
};
