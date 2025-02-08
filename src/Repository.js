/**
 * REPOSITORY CLASS
 * Repository of functions to access and modify data
 *
 * @param {String} filePath file path to document location
 */

const fs = require("fs");
const Task = require("./Task");

/**
 * TO DO
 * - update function
 * * - update description
 * * - mark as to-do
 * * - mark as in-progress
 * * - mark as done
 * - delete function
 * - adapt functions to work assynchronously (maybe)
 * - test all functions
 * - USE fs.write() to use Streams
 */

class Repository {
	constructor(filePath) {
		this.filePath = filePath;

		try {
			fs.readFileSync(this.filePath);
		} catch (error) {
			if (error.code === "ENOENT") {
				fs.writeFileSync(this.filePath, "[]"); // create file with empty array
			}
		}
	}

	validate(array) {
		let str = "";
		if (array.length > 1) {
			for (let el of array) {
				str += `${el} `;
			}
			return str;
		} else {
			return array;
		}
	}

	/**
	 * Retrieves data from database
	 * @returns {Array<Task>} list
	 */
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

	/**
	 * Builds list with more relevant data
	 * @returns {Array<Task>} taskList
	 */
	listAll() {
		let currentList = this.getList();
		let taskList = new Array();
		for (let task of currentList) taskList.push(task.description);
		return taskList;
	}

	/**
	 * Creates a new database entry
	 * @param {Array<String>} description
	 * @returns description of the task that was created
	 */
	add(description) {
		let newTask = new Task(description);
		newTask.setCreatedAt(new Date().toISOString().slice(0, 10));
		let result = this.save(newTask);
		return result.description;
	}

	/**
	 * Persists data to database
	 * @param {Task} task
	 * @returns result, the last task entry in database
	 */
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
