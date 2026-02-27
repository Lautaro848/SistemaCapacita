const mysql = require('mysql2');

const pool = mysql.createPool({
  host:     '127.0.0.1',
  user:     'u952083334_Admin',
  password: 'cXlxh]1AA',
  database: 'u952083334_sistemCapacita',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

pool.getConnection((err, connection) => {
  if (err) {
    console.error(' Error BD:', err.message);
    return;
  }
  console.log(' Conectado a MySQL');
  connection.release();
});

module.exports = pool.promise();