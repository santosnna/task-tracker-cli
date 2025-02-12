class Task {
	constructor(id, description) {
		this.id = id;
		this.description = description;
		this.status = "todo";
		this.createdAt;
		this.updatedAt;
	}

	getId() {
		return this.id;
	}

	setId(id) {
		this.id = id;
	}

	getDescription() {
		return this.description;
	}

	setDescription(description) {
		this.description = description;
	}

	setStatus(newStatus) {
		this.status = newStatus;
	}

	getCreatedAt() {
		return this.createdAt;
	}

	setCreatedAt(date) {
		this.createdAt = date;
	}

	updatedAt() {
		this.updatedAt = new Date().toISOString();
	}
}

module.exports = Task;
