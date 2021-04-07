const express = require('express');
const router = express.Router();
const Profile = require('../models/Profile');
const db = require('../config/db');
const date = require('date-and-time');

let allOkResult = [];

//#region GET
// GET ALL
router.get('/', (req, res, next) => {
	// Make get
	db.fetch(Profile.name, undefined, undefined, undefined, undefined, res);
});

// GET BY ID
router.get('/:userID/:userTypeID', (req, res, next) => {
	// retrieve data from the database
	db.fetch(
		Profile.name,
		undefined,
		`UserID=${req.params.userID} and UserTypeID=${req.params.userTypeID}`,
		undefined,
		undefined,
		res
	);
});

// GET ALL WHIT PAGINATION
router.get('/:page/:resPerPage', (req, res, next) => {
	// retrieve data from the database
	db.fetch(
		Profile.name,
		undefined,
		undefined,
		req.params.page,
		req.params.resPerPage,
		res
	);
});
//#endregion

//#region POST
// Handle post req
router.post('/', (req, res, next) => {
	// Validate user data
	if (allOk(req.body)) {
		// Create new profile
		let profile = new Profile(
			req.body.userTypeID,
			req.body.userID,
			date.format(new Date(), 'YYYY-MM-DD HH:mm')
		);

		if (global.debug) {
			// log profile
			console.log(profile);
		}

		// Make post
		db.post(
			Profile.name,
			profile.getPostColumns(),
			profile.getValues(),
			res
		);
	} else {
		// return the result of the validations
		res.status(200).json({
			message: allOkResult,
		});
	}
});
//#endregion

//#region validations
/**
 * Function to validate all data from user
 */
function allOk(bodyParams) {
	// Set validations result to true and empty
	let allOk = true;
	allOkResult = [];

	// validate usertypeid
	if (
		typeof bodyParams.userTypeID != 'number' ||
		!bodyParams.userTypeID
	) {
		// set allOk to false
		allOk = false;

		allOkResult.push({
			userTypeID: false,
		});
	}

	// validate userid
	if (typeof bodyParams.userID != 'number' || !bodyParams.userID) {
		// set allOk to false
		allOk = false;

		allOkResult.push({
			userID: false,
		});
	}

	// return the result
	return allOk;
}
//#endregion

module.exports = router;
