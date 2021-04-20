const mysql = require('mysql2');
require('dotenv').config();

/**
 * Function to connect to database
 * @returns Conection
 */
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

//#region
/**
 * function to insert data
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
					err: err.code,
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
//#endregion

//#region Fetch
/**
 *
 * @param {TABLE} table
 * @param {JOINS} joins
 * @param {CONDITION} condition
 * @param {PAGE} page
 * @param {RESULTS PER PAGE} resPerPage
 * @param {RESPONSE} res
 */
async function fetch(table, joins, condition, page, resPerPage, res) {
	if (global.debug) {
		console.log(`Table: ${table}`);
		console.log(`Joins: ${joins}`);
		console.log(`Condition: ${condition}`);
		console.log(`Page: ${page}`);
		console.log(`Results per page: ${resPerPage}`);
		console.log(
			`Query: SELECT * FROM 
			${table}
			${joins ? joins : ''} 
			${condition ? ' WHERE ' + condition : ''}
			${page ? 'LIMIT ' + (page - 1) * resPerPage + ', ' : ''}
			${resPerPage ? resPerPage : ''}
			`.trim()
		);
	}

	// stablish the connection whit the database
	const conn = await connect();

	// prepare and execute the query
	conn.query(
		`SELECT * FROM 
		${table}
		${joins ? joins : ''} 
		${condition ? ' WHERE ' + condition : ''}
		${page ? 'LIMIT ' + (page - 1) * resPerPage + ', ' : ''}
		${resPerPage ? resPerPage : ''}
		`,
		(err, results, fields) => {
			if (err) {
				// Return
				res.json({
					err,
				});
			} else {
 
				// Return
				res.json(results);
			}
		}
	);
}

/**
 *
 * @param {TABLE} table
 * @param {JOINS} joins
 * @param {CONDITION} condition
 * @param {PAGE} page
 * @param {RESULTS PER PAGE} resPerPage
 * @param {RESPONSE} res
 */
 async function count(table, joins, condition, page, resPerPage, res) {
	if (global.debug) {
		console.log(`Table: ${table}`);
		console.log(`Joins: ${joins}`);
		console.log(`Condition: ${condition}`);
		console.log(`Page: ${page}`);
		console.log(`Results per page: ${resPerPage}`);
		console.log(
			`Query: SELECT count(*) FROM 
			${table}
			${joins ? joins : ''} 
			${condition ? ' WHERE ' + condition : ''}
			${page ? 'LIMIT ' + (page - 1) * resPerPage + ', ' : ''}
			${resPerPage ? resPerPage : ''}
			`.trim()
		);
	}

	// stablish the connection whit the database
	const conn = await connect();

	// prepare and execute the query
	conn.query(
		`SELECT count(*) FROM 
		${table}
		${joins ? joins : ''} 
		${condition ? ' WHERE ' + condition : ''}
		`,
		(err, results, fields) => {
			if (err) {
				// Return
				res.json({
					err,
				});
			} else {
 
				// Return
				res.json(results);
			}
		}
	);
}
//#endregion

//#region Patch
/**
 *
 * @param {TABLE} table
 * @param {VALUES} values
 * @param {NEW DATA} newData
 * @param {REGISTER ID TO UPDATE} id
 * @param {RESPONSE} res
 */
async function patch(table, values, newData, id, res) {
	if (global.debug) {
		console.log(`Table: ${table}`);
		console.log(`Values: ${values}`);
		console.log(`Data: ${newData}`);
		console.log(`ID: ${id}`);
	}

	// stablish the connection whit the database
	const conn = await connect();

	// prepare and execute the query
	conn.query(
		`
		UPDATE ${table} SET 
		${values}
		WHERE id = ${id}
		`,
		newData,
		(err, results, fields) => {
			if (err) {
				// Return
				res.json({
					err,
				});
			} else {
				// Return
				res.json({
					results: results,
				});
			}
		}
	);
}
//#endregion

module.exports = { post, fetch, patch, count };
