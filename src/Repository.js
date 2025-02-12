/**
 * REPOSITORY CLASS
 * Repository of functions to access and modify data
 *
 * @param {String} filePath file path to document location
 */

const fs = require("fs");
const Task = require("./Task");

class Repository {
	constructor(filePath) {
		this.file = filePath;
		this.list = new Array();

		/**
		 * Retrieves data from database
		 * @returns {Array<Task>} list
		 */
		try {
			const taskList = JSON.parse(fs.readFileSync(this.file));
			taskList.map((task) => {
				this.list.push({
					id: task.id,
					description: task.description,
					status: task.status,
					createdAt: task.createdAt,
					updatedAt: task.updatedAt,
				});
			});
		} catch (error) {
			if (error.code === "ENOENT") {
				fs.writeFileSync(this.file, JSON.stringify(this.list)); // create file with empty array
			}
		}
	}

	/**
	 * Creates a new database entry
	 * @param {Array<String>} description
	 * @returns description of the task that was created
	 */
	add(input) {
		const id = this.list.length + 1;
		let newTask = new Task(id, input);
		newTask.setCreatedAt(new Date().toISOString().slice(0, 10));
		newTask.updatedAt();
		this.list.push(newTask);
		fs.writeFileSync(this.file, JSON.stringify(this.list));
		return JSON.parse(fs.readFileSync(this.file));
	}
}
module.exports = Repository;
