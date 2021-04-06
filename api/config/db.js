const mysql = require('mysql2');
require('dotenv').config();

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

		// passar a conn por referencia para a var global
		global.conn = conn;

		return conn;
	} catch (err) {
		console.log(err);
	}
}

/**
 * Method to insert data
 */
async function post(table, columns, values, res) {
	if (global.debug) {
		console.log(`Table: ${table}`);
		console.log(`Columns: ${columns}`);
		console.log(`Values: ${values}`);
	}

	// stablish the connection whit the database
	const conn = await connect();

	// post the data
	conn.query(
		`INSERT INTO ${table} ${columns} VALUES ${values}`,
		(err, results, fields) => {
			if (err) {
				// Retorno
				res.json({
					err,
				});
			} else {
				// Retorno
				res.json({
					message: results,
				});
			}
		}
	);
}

module.exports = { post };
