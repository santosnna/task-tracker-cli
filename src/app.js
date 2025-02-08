const path = require("path");
const filePath = path.join(__dirname, "todolist.json");
const Repository = require("./Repository");

let repository = new Repository(filePath);
let argv = process.argv.slice(2);
let operation = argv[0];
let input = repository.validate(argv.slice(1));

switch (operation) {
	case "add":
		let task = repository.add(input);
		process.stdout.write(`Added ${JSON.stringify(task)}\n`);
		break;

	case "list":
		let list = repository.listAll();
		process.stdout.write(`List All:\n`);
		for (let task of list) {
			process.stdout.write(`${JSON.stringify(task)}\t`);
		}
		break;

	default:
		break;
}
