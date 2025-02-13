/** CONSTANTES E VARIÁVEIS */
const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "todolist.json");

const Task = require("./Task");
const { validate } = require("./lib");

class TaskRepository {
	static list() {
		try {
			const file = JSON.parse(fs.readFileSync(filePath));
			return Array.from(file);
		} catch (error) {
			if (error.code === "ENOENT") {
				save(new Array()); // create file with empty array
				const file = JSON.parse(fs.readFileSync(filePath));
				return Array.from(file);
			}
		}
	}

	static createTaskObjectFrom(input) {
		return new Task({
			id: Task.getNextIdFrom(this.list()),
			description: validate(input),
			status: "todo",
			createdAt: new Date().toISOString().slice(0, 10),
			updatedAt: new Date()
				.toISOString()
				.replace(/T/, ", ") // replace T with a comma
				.replace(/\..+/, ""), // delete the dot and everything after
		});
	}

	static save(list) {
		const listString = JSON.stringify(list);
		fs.writeFileSync(filePath, listString);
	}
}

module.exports = TaskRepository;
