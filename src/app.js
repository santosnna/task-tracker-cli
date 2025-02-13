/** CONSTANTES E VARIÁVEIS */
const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "todolist.json");

/** FUNÇÕES */
const validate = (data) => {
	let validString = "";
	if (!data.length > 1) {
		return data[0];
	}
	for (let piece of data) {
		validString += `${piece}`;
	}
	return validString;
};

const getList = () => {
	try {
		return JSON.parse(fs.readFileSync(filePath));
	} catch (error) {
		if (error.code === "ENOENT") {
			fs.writeFileSync(filePath, JSON.stringify(new Array())); // create file with empty array
			return JSON.parse(fs.readFileSync(filePath));
		}
	}
};

const getNextId = () => {
	return getList().length + 1;
};

const add = (taskObject) => {
	const newTask = new Task(taskObject);
	let list = getList();
	list.push(newTask);
	fs.writeFileSync(this.file, JSON.stringify(list));
	return this.getList().slice(-1)[0];
};

/** APP */

let arg = process.argv.slice(2);
let operation = arg[0];
let input = arg.slice(1);
let output = "";

switch (operation) {
	case "add":
		const taskObject = {
			id: getNextId(),
			description: validate(input),
			createdAt: new Date().toISOString().slice(0, 10),
			updatedAt: new Date()
				.toISOString()
				.replace(/T/, ", ") // replace T with a comma
				.replace(/\..+/, ""), // delete the dot and everything after
		};
		const newTask = add(taskObject);
		output = `Task successfully added (ID: ${newTask.id})`;
		process.stdout.write(output);
		break;
	default:
		break;
}
