const express = require('express');
const cors = require('cors');
const routes = require('./routes/contratos');


const app = express();
const port = 5000;


// Middleware para registrar solicitações
app.use((req, res, next) => {
 console.log(`Recebida solicitação: ${req.method} ${req.url}`);
 next();
});


app.use(cors());
app.use(express.json());
app.use('/contratos', routes);


app.listen(port, () => {
 console.log(`Server is running on port ${port}`);
});
