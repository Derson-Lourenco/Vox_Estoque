// // backend/createTables.js
// const connection = require('./db');

// const createTables = () => {
//   const contratoQuery = `
//     CREATE TABLE IF NOT EXISTS contratos (
//       id INT AUTO_INCREMENT PRIMARY KEY,
//       processoAno VARCHAR(255) NOT NULL,
//       modalidade VARCHAR(255) NOT NULL,
//       tipo VARCHAR(255) NOT NULL,
//       contratante VARCHAR(255) NOT NULL,
//       createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//     );
//   `;

//   connection.query(contratoQuery, (err) => {
//     if (err) {
//       console.error('Erro ao criar a tabela de contratos:', err);
//     } else {
//       console.log('Tabela de contratos criada com sucesso!');
//     }
//     connection.end();
//   });
// };

// createTables();
