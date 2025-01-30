const path = require("path");
const filePath = path.join(__dirname, "todolist.json");

const Repository = require("./Repository");
let repo = new Repository(filePath);

let argv = process.argv.slice(2);
let operation = argv[0];
let input = argv.slice(1);
// criar input validation para add e update
// verificar caso não esteja entre aspas.

switch (operation) {
	case "add":
		let task = repo.add(input);
		process.stdout.write(`Added\t${JSON.stringify(task)}\n`);
		break;

	case "list":
		let list = repo.listAll();
		process.stdout.write(`List All:\n`);
		for (let task of list) {
			process.stdout.write(`${JSON.stringify(task)}\t`);
		}
		break;

	default:
		break;
}
