class Task {
	constructor() {
		this.id;
		this.description = "";
		this.createdAt;
		this.updatedAt;
	}

	stringBuilder(data) {
		let str = "";
		for (let element of data) {
			str += `${element} `;
		}
		return str;
	}
}

module.exports = Task;
