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
		for (let element of data) {
			let task = new Task(element.description);
			task.setId(element.id);
			task.setCreatedAt(element.setCreatedAt);
			task.setUpdatedAt(element.setUpdatedAt);
			list.push(task);
		}
		return list;
	}

	listAll() {
		let currentList = this.getList();
		let taskList = new Array();
		for (let task of currentList) taskList.push(task.description);
		return taskList;
	}

	add(task) {
		let description = task[0];
		let newTask = new Task(description);
		newTask.setCreatedAt(new Date().toISOString().slice(0, 10));
		let result = this.save(newTask);
		return result.description;
	}

	save(task) {
		let list = new Array();
		list = this.getList();
		if (!task.id) task.setId(list.length + 1);
		task.setUpdatedAt();
		list.push(task);
		fs.writeFileSync(this.filePath, JSON.stringify(list));
		let result = this.getList().slice(-1)[0];
		return result;
	}
}
module.exports = Repository;
