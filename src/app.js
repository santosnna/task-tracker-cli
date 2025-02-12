const path = require("path");
const filePath = path.join(__dirname, "todolist.json");
const Repository = require("./Repository");

let validate = function (data) {
	let validString = "";
	if (!data.length > 1) {
		return data[0];
	}
	for (let piece of data) {
		validString += `${piece} `;
	}
	return validString;
};

let repository = new Repository(filePath);
let arg = process.argv.slice(2);
let operation = arg[0];
let input = validate(arg.slice(1));
let output = "";

switch (operation) {
	case "add":
		let result = repository.add(input);
		let addedTask = result.slice(-1)[0];
		output = `Task successfully added (ID: ${addedTask.id})`;
		process.stdout.write(output);
		break;
	default:
		break;
}
