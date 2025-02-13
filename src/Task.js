class Task {
	constructor(task) {
		const { id, description, createdAt, updatedAt } = task;
		this.id = id;
		this.description = description;
		this.status = "todo";
		this.createdAt = createdAt;
		this.updatedAt = updatedAt;
	}
}

module.exports = Task;
