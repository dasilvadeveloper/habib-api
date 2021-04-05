const db = require('../config/db');

class User {
	constructor(
		id,
		country,
		username,
		image,
		name,
		surname,
		bornDate,
		phone,
		password
	) {
		this.id = id;
		this.country = country;
		this.username = username;
		this.image = image;
		this.name = name;
		this.surname = surname;
		this.bornDate = bornDate;
		this.phone = phone;
		this.password = password;
	}

	/**
	 * Method to post users
	 */
	async post(res) {
		if (global.debug) {
			// log user
			console.log(`INSERT INTO user
			(CountryID,
			Username,
			Image,
			Name,
			Surname,
			BornDate,
			Phone,
			Password)
			VALUES
			(
			${this.country},
			'${this.username}',
			'${this.image}',
			'${this.name}',
			'${this.surname}',
			'${this.bornDate}',
			${this.phone},
			sha(512, '${this.password}')
			)`);
		}

		// connect to database
		const conn = await db.connect();

		// execute query
		conn.query(
			`INSERT INTO user
			(CountryID,
			Username,
			Image,
			Name,
			Surname,
			BornDate,
			Phone,
			Password)
			VALUES
			(
			${this.country},
			'${this.username}',
			'${this.image}',
			'${this.name}',
			'${this.surname}',
			'${this.bornDate}',
			${this.phone},
			'${this.password}'
			)`,
			(err, results, fields) => {
				if (err) {
					// Retorno
					res.json({
						username_error: {
							type: 'ER_DUP_ENTRY',
							description:
								'Username duplicated',
						},
					});
				} else {
					// Retorno
					res.json({
						message: "Success",
					});
				}
			}
		);
	}
}

module.exports = User;
