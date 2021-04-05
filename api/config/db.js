const mysql = require('mysql2');
require('dotenv').config();

// dados da conexão
const user = process.env.USER;
const pass = process.env.PASS;
const db = process.env.DB;
const host = process.env.HOST;

async function connect() {
	// verificar se a conn existe e o estado dela é diferente de desconectada
	if (global.conn && global.conn.state !== 'disconnected')
		return global.conn;

	// Conn string
	try {
		const conn = await mysql.createConnection({
			host: process.env.HOST,
			user: process.env.USER,
			password: process.env.PASS,
			database: process.env.DB,
		});

		console.log('Conn established');

		// passar a conn por referencia para a var global
		global.conn = conn;

		return conn;
	} catch (err) {
		console.log(err);
	}
}

module.exports = {connect};
