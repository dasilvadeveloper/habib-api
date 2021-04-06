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
	 * function that returns columns to insert an user
	 * @returns Columns to insert an user
	 */
	getPostColumns() {
		return `(CountryID, Username, Image, Name, Surname, BornDate, Phone, Password)`;
	}

	/**
	 * function that returns columns to insert an user
	 * @returns Values to insert an user
	 */
	getValues() {
		return `(${this.country}, '${this.username}', '${this.image}', '${this.name}', '${this.surname}', '${this.bornDate}', ${this.phone}, sha2('${this.password}',512))`;
	}

	/**
	 * function that returns columns to PATCH
	 * @returns Values to insert an user
	 */
	getPatchPreparedValues() {
		return `CountryID = ?, Username = ?, Image = ?, Name = ?, Surname = ?, BornDate = ?, Phone = ?, Password = sha2(?,512)`;
	}

	/**
	 * function that returns columns to PATCH
	 * @returns Values to insert an user
	 */
	getPatchValues() {
		return [
			this.country,
			`${this.username}`,
			`${this.image}`,
			`${this.name}`,
			`${this.surname}`,
			`${this.bornDate}`,
			this.phone,
			`${this.password}`,
		];
	}
}

module.exports = User;
