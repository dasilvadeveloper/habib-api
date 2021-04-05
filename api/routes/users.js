const express = require('express');
const router = express.Router();
const User = require('../models/User');

let debug = true;
let allOkResult = [];

// No caso de um get all
router.get('/', (req, res, next) => {
	// Retorno
	res.status(200).json({
		data: {
			message: 'habib -> user -> get',
		},
	});
});

// Handle post req
router.post('/', (req, res, next) => {
	// Validate user data
	if (allOk(req.body)) {
		// Create new user
		let user = new User(
			-1,
			req.body.country,
			req.body.username,
			req.body.image,
			req.body.name,
			req.body.surname,
			req.body.bornDate,
			req.body.phone,
			req.body.password
		);

		if (debug) {
			// log user
			console.log(user);
		}

		// Retorno
		res.status(200).json({
			message: 'Aluno quase inserido',
		});
	} else {
		// return the result of the validations
		res.status(200).json({
			message: allOkResult,
		});
	}
});

/**
 * Function to validate all data from user
 */
function allOk(bodyParams) {
	// Set validations result to true and empty
	let allOk = true;
	allOkResult = [];

	// validate username
	if (
		typeof bodyParams.username != "string" ||
		!bodyParams.username ||
		!/^(?=.{2,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/.test(
			bodyParams.username
		)
	) {
		// set allOk to false
		allOk = false;

		allOkResult.push({
			username: false,
		});
	}
	// } else {
	// 	// VIR
	// 	//if(User.checkUsername(bodyParams.username)){
	// 	if (false) {
	// 		// set allOk to false
	// 		allOk = false;

	// 		// push error msg to array
	// 		allOkResult.push({
	// 			username: false,
	// 		});
	// 	}
	// }

	// return the result
	return allOk;
}

module.exports = router;
