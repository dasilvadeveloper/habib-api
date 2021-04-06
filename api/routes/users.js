const express = require('express');
const router = express.Router();
const User = require('../models/User');
const db = require('../config/db');

let allOkResult = [];

// Handle get req
router.get('/', (req, res, next) => {
	// Make get
	db.fetch(User.name, undefined, undefined, undefined, undefined, res);
});

// Handle get by id
router.get('/:userID', (req, res, next) => {
	// retrieve data from the database
	db.fetch(
		User.name,
		undefined,
		`id=${req.params.userID}`,
		undefined,
		undefined,
		res
	);
});

// Handle get req whit params
router.get('/:page/:resPerPage', (req, res, next) => {
	// retrieve data from the database
	db.fetch(
		User.name,
		undefined,
		undefined,
		req.params.page,
		req.params.resPerPage,
		res
	);
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

		if (global.debug) {
			// log user
			console.log(user);
		}

		// Make post
		db.post(
			User.name,
			user.getPostColumns(),
			user.getValues(),
			res
		);
	} else {
		// return the result of the validations
		res.status(200).json({
			message: allOkResult,
		});
	}
});

//#region validations
/**
 * Function to validate all data from user
 */
function allOk(bodyParams) {
	// Set validations result to true and empty
	let allOk = true;
	allOkResult = [];

	// validate country
	if (typeof bodyParams.country != 'number' || !bodyParams.country) {
		// set allOk to false
		allOk = false;

		allOkResult.push({
			country: false,
		});
	}

	// validate username
	if (
		typeof bodyParams.username != 'string' ||
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

	// validate name
	if (
		typeof bodyParams.name != 'string' ||
		!bodyParams.name ||
		bodyParams.name.length > 40 ||
		bodyParams.name.length < 2 ||
		!/^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/.test(
			bodyParams.name
		)
	) {
		// set allOk to false
		allOk = false;

		allOkResult.push({
			name: false,
		});
	}

	// validate surname
	if (
		typeof bodyParams.surname != 'string' ||
		!bodyParams.surname ||
		bodyParams.surname.length > 40 ||
		bodyParams.surname.length < 2 ||
		!/^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/.test(
			bodyParams.surname
		)
	) {
		// set allOk to false
		allOk = false;

		allOkResult.push({
			surname: false,
		});
	}

	// validate date
	if (!Date.parse(bodyParams.bornDate)) {
		// set allOk to false
		allOk = false;

		allOkResult.push({
			bornDate: false,
		});
	}

	// validate phone number
	if (bodyParams.phone) {
		if (
			typeof bodyParams.phone != 'number' ||
			!/9[1236][0-9]{7}|2[1-9]{1,2}[0-9]{7}/.test(
				bodyParams.phone
			)
		) {
			// set allOk to false
			allOk = false;

			allOkResult.push({
				phone: false,
			});
		}
	}

	// validate password
	if (
		typeof bodyParams.password != 'string' ||
		!bodyParams.password ||
		bodyParams.password.length > 30 ||
		bodyParams.password.length < 8
	) {
		// set allOk to false
		allOk = false;

		allOkResult.push({
			password: false,
		});
	}

	// validate image
	if (!bodyParams.image) {
		bodyParams.image = 'default';
	}

	// validate phone
	if (!bodyParams.phone) {
		bodyParams.phone = null;
	}

	// return the result
	return allOk;
}
//#endregion

module.exports = router;
