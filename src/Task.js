class Task {
	constructor(description) {
		this.id;
		this.description = description;
		this.createdAt;
		this.updatedAt;
	}

	setId(id) {
		this.id = id;
	}

	setDescription(description) {
		this.description = description;
	}

	setCreatedAt(creationDate) {
		this.createdAt = creationDate;
	}

	setUpdatedAt() {
		let updateDate = new Date().toISOString();
		this.updatedAt = updateDate;
	}
}

module.exports = Task;
