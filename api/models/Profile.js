class Profile {
	constructor(userTypeID, userID, date) {
		this.userTypeID = userTypeID;
		this.userID = userID;
		this.date = date;
	}

	/**
	 * function that returns columns to insert 
	 * @returns Columns to insert
	 */
	getPostColumns() {
		return `(UserTypeID, UserID, Date)`;
	}

	/**
	 * function that returns columns to insert 
	 * @returns Values to insert
	 */
	getValues() {
		return `(${this.userTypeID}, ${this.userID}, '${this.date}')`;
	}
}

module.exports = Profile;
