const TaskRepository = require("./TaskRepository");

class TaskController {
	static add(input) {
		const newTask = TaskRepository.createTaskObjectFrom(input);
		const updatedList = [...TaskRepository.list(), newTask];
		TaskRepository.save(updatedList);
		return TaskRepository.list().slice(-1)[0]; // returns last item only
	}

	static listAll() {
		return Array.from(TaskRepository.list());
	}
}

module.exports = TaskController;
