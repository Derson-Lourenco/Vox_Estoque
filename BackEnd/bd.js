// db.js
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'M@!r@L@r@99795816',
  database: 'Gerenciador',
});

connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao MySQL:', err);
  } else {
    console.log('Conexão com o MySQL estabelecida com sucesso!');
  }
});

module.exports = connection;
