const mysql = require('mysql2');

const pool = mysql.createPool({
  host:     process.env.DB_HOST     || 'localhost',
  user:     process.env.DB_USER     || 'u952083334_Admin',
  password: process.env.DB_PASSWORD || 'cXlxh]1AA',
  database: process.env.DB_NAME     || 'u952083334_sistemCapacita',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

pool.getConnection((err, connection) => {
  if (err) {
    console.error('Error al conectar con la base de datos:', err.message);
    return;
  }
  console.log('Conectado a la base de datos MySQL');
  connection.release();
});

module.exports = pool.promise();