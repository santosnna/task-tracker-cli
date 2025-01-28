const fs = require("fs");
const Task = require("./Task");

class Repository {
	constructor(filePath) {
		this.filePath = filePath;
	}

	// Access list file
	getList() {
		let list = new Array();
		let data = JSON.parse(fs.readFileSync(this.filePath));
		data.forEach((element, index) => {
			let task = new Task();
			task.id = index;
			task.description = element.description;
			task.createdAt = element.createdAt;
			task.updatedAt = element.updatedAt;
			list.push(task);
		});
		return list;
	}

	save(data) {
		let currentList = this.getList();
		let task = new Task();
		task.id = currentList.length + 1;
		task.description = task.stringBuilder(data);
		task.createdAt = new Date();
		task.updatedAt = new Date();
		currentList.push(task);
		fs.writeFileSync(this.filePath, JSON.stringify(currentList));
		return this.getList().slice(-1)[0];
	}
}
module.exports = Repository;
