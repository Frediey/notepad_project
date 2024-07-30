//////////////////////////////////////
//////////	TO-DO LIST ///////////////
//////////////////////////////////////

const createTodo = document.querySelector(".create-todo");
const todoBody = document.querySelector(".todo-body");
const form = document.querySelector(".todo-form");
const todoUlMain = document.querySelector(".todo-list");
const todoUL = document.querySelector(".todo-list-items");
const saveTodoBtn = document.querySelector(".btn-save");
const addTodo = document.querySelector(".btn-add");
const todo = document.querySelectorAll(".to-do");
const closeModal = document.querySelector(".close-modal");
const todoBodyContainer = document.querySelector(".todo-body-container");
const todoHeading = document.querySelector(".todo-heading");
const percent = document.querySelector(".percent-complete");
const percentSpan = document.querySelector(".percent-complete_span");
const closeTodo = document.querySelector(".close-todo-modal");
const todoOverlay = document.querySelector(".overlay-explode");
const todoModal = document.querySelector(".todo-modal");
const todoName = document.querySelector(".todo");
const dateTodo = document.querySelector(".todo-date");
const todoPriority = document.querySelector(".todo-priority");
const todoFrom = document.querySelector(".todo-from");
const todoTo = document.querySelector(".todo-to");
const todoStatus = document.querySelector(".todo-status");

// All form inputs
const groupName = document.querySelector(".todo-groupname");
const todoInput = document.querySelector(".todo-input_value");
const todoDate = document.querySelector(".date");
const priority = document.querySelector(".priority");
const timeframeFrom = document.querySelector(".tframe-from");
const timeframeTo = document.querySelector(".tframe-to");

function randomNums() {
	const numArray = [];
	let randomNum;
	for (let i = 0; i < 5; i++) {
		if (numArray.length === 5) return;

		randomNum = Math.round(Math.random() * 9);

		numArray.push(randomNum);
	}

	return numArray.toString().split(",").join("");
}

class Todo {
	constructor(groupName, todoInput, date, priority, from, to, checkedState) {
		this.groupName = groupName;
		this.todoInput = todoInput;
		this.date = date;
		this.priority = priority;
		this.from = from;
		this.to = to;
		this.todoId = "TodoID-".concat(randomNums());
		this.checked = checkedState;
	}
}

class GroupIdObject {
	constructor(array, groupName, todoId) {
		this.array = array;
		this.groupName = groupName;
		this.todoId = todoId;
	}
}

let todoItem, todoAll;
class TodoList {
	todoListArray = [];
	todoObjectArray = [];

	constructor() {
		createTodo.addEventListener("click", this.createTodoFunction.bind(this));

		addTodo.addEventListener("click", this.addTodoFunction.bind(this));

		saveTodoBtn.addEventListener("click", this.saveTodos.bind(this));

		todoUlMain.addEventListener("click", this.explodeView.bind(this));

		closeModal.addEventListener("click", this.closeModalFunction.bind(this));

		closeTodo.addEventListener("click", this.closeTodoModal.bind(this));
		todoOverlay.addEventListener("click", this.closeTodoModal.bind(this));

		this.getTodoObjectArray();
		this.getTodoListArray();
		this.percentComplete();
	}

	// HELPER FUNCTIONS
	updateTodo(object, ul, todoEl) {
		if (ul === todoUL) {
			const {
				todo = object.todoInput,
				todoId = object.todoId,
				checkedState = object.checked,
			} = object;

			console.log(todo, todoId, checkedState);

			this.todoList1(todo, todoId, checkedState, ul);

			this.setDeleteBtn(todoEl);
		}

		if (ul === todoUlMain) {
			const { todo = object.groupName, todoId = object.todoId } = object;

			console.log(todo, todoId);

			this.todoList2(todo, todoId, ul);

			this.setDeleteBtn(todoEl);
		}
	}

	todoList1(todo, todoId, checkedState, ul) {
		let html = `
						<li class="todo-item" id=${todoId}>
							<div class="flex flex-gap-md width-85">
								<input class="checkbox" type="checkbox" ${checkedState ? "checked" : ""}>
								<p class='width-100 todoName'>${todo}</p>
							</div>

							<span class="material-symbols-rounded md-18 close delete-todo">
								close
							</span>
						</li>

	`;

		return ul.insertAdjacentHTML("afterbegin", html);
	}

	todoList2(todo, todoId, ul) {
		let html = `<li class="to-do" id=${todoId}>
										<p class="task-name width-85">${todo.toUpperCase()}</p>
										<span class="material-symbols-rounded md-18 close delete-todo">
												close
										</span>
									</li>`;

		return ul.insertAdjacentHTML("afterbegin", html);
	}

	setDeleteBtn(todoItem) {
		const deleteTodoBtn = document.querySelectorAll(".delete-todo");
		deleteTodoBtn.forEach((delBtn) => {
			delBtn.addEventListener("click", (e) => this.deleteTodo(e, todoItem));
		});
	}

	checkBoxFunction(e, checkBox) {
		const target = e.target.parentElement.parentElement;

		const targetObject = this.todoObjectArray.find(
			(arrayItem) => arrayItem.todoId === target.id
		);

		if (!checkBox.hasAttribute("checked")) {
			checkBox.setAttribute("checked", "");
			targetObject.checked = true;
		} else {
			checkBox.removeAttribute("checked");
			targetObject.checked = false;
		}

		this.setLocalStorage("todos", this.todoObjectArray);
		this.percentComplete();
	}

	addExplodeFormat() {
		saveTodoBtn.classList.remove("hidden");
		todoUL.classList.remove("hidden");

		todoBody.removeAttribute("data-placeholder");
		todoBodyContainer.classList.remove("hidden");
	}

	saveDeleteFormat() {
		todoHeading.textContent = "";
		todoHeading.removeAttribute("id");
		saveTodoBtn.classList.add("hidden");
		todoBodyContainer.classList.add("hidden");
		todoBody.setAttribute(
			"data-placeholder",
			"You do not have any active todo entries. Click the create todo button to start"
		);
	}

	clearFormInputs() {
		todoInput.value =
			todoDate.value =
			priority.value =
			timeframeFrom.value =
			timeframeTo.value =
				"";
	}

	createTodoFunction(e) {
		e.preventDefault();

		if (themeValue.textContent === "Night") {
			formModal.style.backgroundColor = bodyStyle.color;
			formModal.style.color = bodyStyle.backgroundColor;
		}

		formModal.classList.remove("hidden");
		document.querySelector(".overlay").classList.remove("hidden");

		if (!todoHeading.id) formModal.id = "todoGroupID-".concat(randomNums());
		if (todoHeading.id) {
			formModal.id = todoHeading.id;
			groupName.value = todoHeading.textContent;
		}

		this.clearFormInputs();
	}

	explodeTodo(e) {
		console.log("Trying to explode todo");

		const target = e.target.closest(".todoName");

		if (!target) return;

		todoModal.classList.remove("hidden");
		todoOverlay.classList.remove("hidden");

		const targetTodo = this.todoObjectArray.find(
			(arrayItem) => arrayItem.todoId === target.parentElement.parentElement.id
		);
		console.log(target, targetTodo);

		todoName.textContent = targetTodo.todoInput;
		dateTodo.textContent = targetTodo.date;
		todoPriority.textContent = targetTodo.priority;
		todoFrom.textContent = targetTodo.from;
		todoTo.textContent = targetTodo.to;
		todoStatus.textContent = targetTodo.checked ? "Done" : "Pending";

		if (themeValue.textContent === "Night") {
			todoModal.style.backgroundColor = bodyStyle.color;
			todoModal.style.color = bodyStyle.backgroundColor;
		}
	}

	addTodoFunction(e) {
		e.preventDefault();

		todoHeading.id = formModal.id;
		todoHeading.textContent = groupName.value.toUpperCase();

		const newTodo = new Todo(
			groupName.value,
			todoInput.value,
			todoDate.value,
			priority.value,
			timeframeFrom.value,
			timeframeTo.value,
			false
		);

		this.todoObjectArray.push(newTodo);

		todoItem = document.querySelectorAll(".todo-item");
		this.updateTodo(newTodo, todoUL, todoItem);

		const checkBox = document.querySelector(".checkbox");
		checkBox.addEventListener("click", (e) => {
			this.checkBoxFunction(e, checkBox);
		});

		// todoUL.addEventListener("click", (e) => {
		// 	this.explodeTodo(e);
		// });

		this.percentComplete();
		this.addExplodeFormat();

		todoInput.focus();
		this.clearFormInputs();
	}

	saveTodos() {
		const todoItemArray = [];

		todoItem = document.querySelectorAll(".todo-item");
		todoItem.forEach((todo) => {
			todoItemArray.push(todo.id);
			todo.remove();
		});

		// currently working here
		const targetTodo = this.todoListArray.find(
			(arrayItem) => arrayItem.todoId === todoHeading.id
		);

		if (targetTodo) {
			console.log(targetTodo);
			targetTodo.array = todoItemArray;
			targetTodo.groupName = todoHeading.textContent;
			targetTodo.todoId = todoHeading.id;

			const targetTodoEl = Array.from(todoUlMain.children).find(
				(todo) => todo.id === todoHeading.id
			);

			targetTodoEl.firstElementChild.textContent = todoHeading.textContent;

			console.log("theres no array", todoItemArray);
		}

		if (!targetTodo) {
			const todoObject = new GroupIdObject(
				todoItemArray,
				groupName.value,
				todoHeading.id
			);

			this.todoListArray.push(todoObject);

			this.updateTodo(todoObject, todoUlMain);
			todoAll = document.querySelectorAll(".to-do");
		}

		formModal.removeAttribute("id");

		this.setLocalStorage("todos", this.todoObjectArray);
		this.setLocalStorage("groupId", this.todoListArray);
		this.saveDeleteFormat();
		this.clearFormInputs();

		groupName.value = "";
	}

	explodeView(e) {
		const target = e.target.closest(".task-name");
		if (!target) return;

		const targetTodo = this.todoListArray.find(
			(arrayItem) => arrayItem.todoId === target.parentElement.id
		);

		console.log(targetTodo);

		todoItem = document.querySelectorAll(".todo-item");
		todoItem.forEach((todo) => {
			todo.remove();
		});

		todoHeading.textContent = targetTodo.groupName.toUpperCase();
		todoHeading.id = targetTodo.todoId;

		targetTodo.array.forEach((todoId) => {
			const todo = this.todoObjectArray.find(
				(arrayItem) => arrayItem.todoId === todoId
			);

			this.updateTodo(todo, todoUL, todoItem);

			todoUL.addEventListener("click", (e) => {
				this.explodeTodo(e);
			});

			const checkBox = document.querySelector(".checkbox");
			checkBox.addEventListener("click", (e) => {
				this.checkBoxFunction(e, checkBox);
			});

			this.addExplodeFormat();
		});
		console.log(target.parentElement.id, targetTodo.array);
	}

	deleteTodoCallBack(target, array, arrayType) {
		const index = array.findIndex((arrayItem) => arrayItem.todoId === target);

		array.splice(index, 1);
		this.setLocalStorage(arrayType, array);
	}

	deleteTodo(e, todoItem) {
		const deleteTarget = e.target.parentElement;

		if (deleteTarget.parentElement === todoUL) {
			// To delete object from the todoObjectArray
			if (this.todoListArray.length === 0) return;

			this.deleteTodoCallBack(deleteTarget.id, this.todoObjectArray, "todos");

			// To find the container todo list
			const targetTodo = Array.from(todoUlMain.children).find(
				(todo) => todo.id === todoHeading.id
			);
			// To find the container todo list's object
			const todoListItem = this.todoListArray.find(
				(todoItem) => todoItem.todoId === targetTodo.id
			);
			// To search the array property of the container todo list's object to find the deleteTarget id
			const todoIndex = todoListItem.array.findIndex(
				(arrayItem) => arrayItem === deleteTarget.id
			);
			// Delete deleteTarget id from array property of the container todo list's object
			todoListItem.array.splice(todoIndex, 1);
			this.setLocalStorage("groupId", this.todoListArray);
			deleteTarget.remove();
			// If array property of the container todo list's object is empty delete container todo list's object from this.todoListArray
			if (todoListItem.array.length === 0) {
				this.deleteTodoCallBack(targetTodo.id, this.todoListArray, "groupId");
				this.saveDeleteFormat();

				targetTodo.remove();
			}
		}

		if (deleteTarget.id === todoHeading.id) {
			todoItem = document.querySelectorAll(".todo-item");
			todoItem.forEach((todo) => {
				todo.remove();
			});

			this.saveDeleteFormat();
		}

		if (deleteTarget.parentElement === todoUlMain) {
			const targetTodo = this.todoListArray.find(
				(targTodo) => targTodo.todoId === deleteTarget.id
			);

			targetTodo.array.forEach((todoId) => {
				const index = this.todoObjectArray.findIndex(
					(arrayItem) => arrayItem.todoId === todoId
				);

				this.todoObjectArray.splice(index, 1);
				this.setLocalStorage("todos", this.todoObjectArray);
			});

			this.deleteTodoCallBack(deleteTarget.id, this.todoListArray, "groupId");
			deleteTarget.remove();
		}

		this.percentComplete();
	}

	closeModalFunction() {
		formModal.removeAttribute("id");
		formModal.classList.add("hidden");
		document.querySelector(".overlay").classList.add("hidden");
	}

	closeTodoModal() {
		todoModal.classList.add("hidden");
		todoOverlay.classList.add("hidden");
	}

	setLocalStorage(arrayType, array) {
		localStorage.setItem(arrayType, JSON.stringify(array));
	}

	getTodoObjectArray() {
		const data = JSON.parse(localStorage.getItem("todos"));
		if (!data) return;

		this.todoObjectArray = data;
	}

	getTodoListArray() {
		const data = JSON.parse(localStorage.getItem("groupId"));
		if (!data) return;
		this.todoListArray = data;

		this.todoListArray.forEach((arrayItem) => {
			this.updateTodo(arrayItem, todoUlMain);
		});
	}

	colorModifier(color) {
		percent.style.color = color;
		percent.style.borderColor = color;
	}

	percentComplete() {
		const totalComplete = this.todoObjectArray.filter(
			(arrayItem) => arrayItem.checked === true
		).length;

		const percentComplete =
			this.todoObjectArray.length !== 0
				? Math.round((totalComplete / this.todoObjectArray.length) * 100)
				: 0;

		percent.textContent = percentComplete + "%";
		percentSpan.textContent = percentComplete + "%";

		if (percentComplete === 100) {
			this.colorModifier("#06f506");
		}

		if (percentComplete >= 50 && percentComplete < 100) {
			this.colorModifier("#008000");
		}

		if (percentComplete >= 40 && percentComplete < 50) {
			this.colorModifier("#803e00");
		}

		if (percentComplete < 40) {
			this.colorModifier("#ff0000");
		}
	}
}

const todoNew = new TodoList();

var formModal = document.querySelector(".form-modal");
