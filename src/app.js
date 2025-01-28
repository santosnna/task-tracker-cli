const path = require("path");
const filePath = path.join(__dirname, "todolist.json");

const Repository = require("./Repository");
let repo = new Repository(filePath);

let argv = process.argv.slice(2);
let operation = argv[0];
let input = argv.slice(1);

switch (operation) {
	case "save":
		let task = repo.save(input);
		process.stdout.write(`Saved: ${JSON.stringify(task.description)}`);
	case "add":
		break;

	case "list":
		let list = repo.getList();
		process.stdout.write(`List All:
			${JSON.stringify(list)}`);
		break;

	default:
		break;
}
