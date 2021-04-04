const http = require('http');
const app = require('./app');

// Porta para inicializar o servidor
const port = process.env.PORT || 3001;

// Criar o server comn a nossa api
const server = http.createServer(app);

// Inicializar escuta do server na porta definida
server.listen(port)