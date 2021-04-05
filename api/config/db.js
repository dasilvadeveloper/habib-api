require("dotenv").config()


// dados da conexão
const user = process.env.USER;
const pass = process.env.PASS;
const db = process.env.DB;
const host = process.env.HOST;

async function connect() {

    // verificar se a conn existe e o estado dela é diferente de desconectada
    if(global.conn && global.conn.state !== 'disconnected')

	// receber o promise do mysql2
	const mysql = require('mysql2/promise');

	// Conn string
	const conn = await mysql.createConnection(
		`mysql://${user}:${pass}@${host}:3306/${db}`
	);

    console.log('Conn established');

    // passar a conn por referencia para a var global
    global.conn = conn;
}

connect();

module.exports = {};