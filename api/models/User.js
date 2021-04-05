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
}

module.exports = User;
