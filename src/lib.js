const validate = (data) => {
	if (data.length > 1) {
		let validString = "";
		for (let piece of data) {
			validString += ` ${piece}`;
		}
		return validString;
	}
	return data[0];
};

module.exports = { validate };
