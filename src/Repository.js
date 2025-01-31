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
 * - create input validation (add/update functions)
 * * - check if input is inside quotes ("") or not
 * - create JSON document if it does not exist
 * - adapt functions to work assynchronously (maybe)
 * - test all functions
 */

class Repository {
	constructor(filePath) {
		this.filePath = filePath;
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
	 * @param {Array<String>} task
	 * @returns description of the task that was created
	 */
	add(task) {
		let description = task[0];
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
