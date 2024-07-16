"use strict";

///////////////////////////////////////
// Selectors
const themeValue = document.querySelector(".theme-value");
const toggleDayAndNight = document.querySelector(".toggle-buttons");
const toggleDay = document.querySelector(".toggle-day");
const toggleNight = document.querySelector(".toggle-night");
const settings = document.querySelector(".settings");
const main = document.querySelector(".main");
const textField = document.querySelector(".text-field");
const textFieldTitle = document.querySelector(".text-field-title");
const textArea = document.querySelector(".text-area");
const bookmarkField = document.getElementById("field-bookmark");
const bookmarkTitle = document.getElementById("text-title-bookmark");
const bookmarkText = document.getElementById("text-area-bookmark");
const bookmarkBtn = document.querySelector(".bookmark");
const saveBtn = document.querySelector(".save");
const addFile = document.querySelector(".add-file");
const summary = document.querySelector(".summary");
const fileWrap = document.querySelectorAll(".file-wrap");
const anchors = document.querySelectorAll(".menu-list-link");
const files = document.querySelector(".files");
const closeBtns = document.querySelectorAll(".close");
const emptyBookmark = document.querySelector(".bookmark > .bookmark");

////////////////////////////
/// DAY AND NIGHT TOGGLE ///
////////////////////////////
const color1 = "#050517";
const color2 = "#fff";
const color3 = "#4530ce";
const bodyStyle = document.body.style;

// Default active tab
let activeEl = Array.from(anchors).find((anchor) =>
	anchor.parentElement.classList.contains("active")
);
activeEl.parentElement.style.borderBottom = `4px solid ${bodyStyle.color}`;

// Day and night implementation helper function
function dayNightImplementation(lists) {
	lists.forEach((listItem) => {
		listItem.style.backgroundColor = bodyStyle.color;
		listItem.style.color = bodyStyle.backgroundColor;
	});
}

// Toggle functionality
const toggles = function (firstColor, secondColor) {
	activeEl = Array.from(anchors).find((anchor) =>
		anchor.parentElement.classList.contains("active")
	);

	bodyStyle.backgroundColor = secondColor;
	bodyStyle.color = firstColor;
	bookmarkField.style.backgroundColor = bodyStyle.color;
	bookmarkField.style.color = bodyStyle.backgroundColor;
	textField.style.backgroundColor = bodyStyle.color;
	textField.style.color = bodyStyle.backgroundColor;
	settingsPage.style.color = bodyStyle.color;
	settingsPage.style.backgroundColor = bodyStyle.backgroundColor;

	activeEl.parentElement.style.borderBottom = `4px solid ${bodyStyle.color}`;

	if (unorderedList?.contains(listItem)) {
		dayNightImplementation(fileList);
	}

	themeSetting();
};

function themeSetting() {
	toggleDay.classList.contains("hidden")
		? (themeValue.textContent = "Night")
		: (themeValue.textContent = "Day");
}
themeSetting();

// Toggle Function
const toggle = function () {
	if (toggleDay.classList.contains("hidden")) {
		toggleDay.classList.remove("hidden");
		toggleNight.classList.add("hidden");

		toggles(color1, color2);
	} else {
		toggleNight.classList.remove("hidden");
		toggleDay.classList.add("hidden");

		toggles(color2, color1);
	}
};

toggleDayAndNight.addEventListener("click", toggle);

/////////////////////////////
//// TABS IMPLEMENTATION ////
/////////////////////////////
// Callback Functions
function tabFormat() {
	anchors.forEach((anchor) => {
		anchor.parentElement.classList?.remove("active");
		anchor.parentElement.style.borderBottom = "";
	});
}

function callBack(e, tab) {
	tab.classList.remove("hidden");
	tab.style.display = "block";
	e.target.parentElement.style.borderBottom = `4px solid ${textField.style.backgroundColor}`;
	e.target.parentElement.classList.add("active");
}

function tabActive(e) {
	fileWrap.forEach((tab) => {
		tab.style.display = "none";
		tab.classList.add("hidden");

		if (tab.id === e.target.id) callBack(e, tab);
	});
}

function clearText() {
	textFieldTitle.value = "";
	textArea.value = "";
	if (textField.id) textField.removeAttribute("id");
}

// Implementation
anchors.forEach((anchor) => {
	anchor.addEventListener("click", (e) => {
		tabFormat();
		tabActive(e);
	});
});

addFile.addEventListener("click", (e) => {
	clearText();
	tabFormat();
	tabActive(e);
	fileWrap.forEach((tab) => {
		if (tab.id === e.target.previousElementSibling.id) callBack(e, tab);
	});
});

////////////////
/// NEW FILE ///
////////////////
let fileList;
let listItem;
let unorderedList = document.querySelector(".summary > .summary-list");
let bookmarkList = document.querySelector(".bookmark-list");

// NEW FILE WITH OOP
// Constructor function
class Newfile {
	date = new Date();

	constructor(heading, note) {
		this.heading = heading;
		this.note = note;
		this.creationDate = this.setCreationDate();
		this.fileId = this.setFileId();
	}

	setFileId() {
		return `file${this.date.getTime()}`;
	}

	setCreationDate() {
		return this.date.toISOString().slice(0, 10);
	}
}

class Create {
	fileArray = [];
	bookmarkArray = [];

	constructor() {
		window.addEventListener("DOMContentLoaded", this.windowLoad.bind(this));

		saveBtn.addEventListener("click", this.createNewFile.bind(this));

		bookmarkBtn.addEventListener("click", this.saveBookmark.bind(this));

		unorderedList.addEventListener("click", (e) =>
			this.explodedView(e, this.fileArray, textFieldTitle, textArea)
		);

		unorderedList.addEventListener("click", (e) =>
			this.deleteItem(e, "files", this.fileArray)
		);

		bookmarkList.addEventListener("click", (e) =>
			this.explodedView(e, this.bookmarkArray, bookmarkTitle, bookmarkText)
		);

		bookmarkList.addEventListener("click", (e) =>
			this.deleteItem(e, "bookmarks", this.bookmarkArray)
		);
	}

	windowLoad(e) {
		this.getStoragedFiles();
		this.getStoredBookmarks();
	}

	createNewFile() {
		if (textArea.value === "" && textFieldTitle.value === "") return;

		const note = textArea.value;

		let heading;
		if (textFieldTitle.value !== "") {
			heading = textFieldTitle.value;
		} else if (textFieldTitle.value === "") {
			heading = textFieldTitle.value = "NO TITLE";
		}

		const newFile = new Newfile(heading, note);
		console.log(newFile.heading, newFile.fileId);

		if (textField.id) {
			const currentFile = this.fileArray.find(
				(file) => file.fileId === textField.id
			);
			const currentFileItem = document.getElementById(currentFile.fileId);
			currentFileItem.innerHTML = "";

			let content = `
					<h4 class="note-header">${newFile.heading}</h4>
					<p class="note">${newFile.note}</p>
					<p class="creation-date">Created on ${currentFile.creationDate}</p>
			`;

			currentFileItem.innerHTML = content;
			currentFile.heading = newFile.heading;
			currentFile.note = newFile.note;
		}

		if (!textField.id) {
			textField.id = newFile.fileId;
			this.update(newFile, unorderedList, this.fileArray);
			this.fileArray.push(newFile);
		}

		this.setLocalStorage("files", this.fileArray);
	}

	// Save to bookmark
	saveBookmark() {
		if (!textField.id) return;

		const currentFile = this.fileArray.find(
			(file) => file.fileId === textField.id
		);

		console.log(this.bookmarkArray.includes(currentFile));
		if (this.bookmarkArray.includes(currentFile)) return;

		console.log(bookmarkList, currentFile.fileId);

		emptyBookmark.style.display = "none";
		emptyBookmark.previousElementSibling.style.display = "grid";
		emptyBookmark.previousElementSibling.classList.remove("hidden");
		bookmarkField.setAttribute("contenteditable", false);

		this.createNewFile();

		this.update(currentFile, bookmarkList, this.bookmarkArray);

		this.bookmarkArray.push(currentFile);

		this.setLocalStorage("bookmarks", this.bookmarkArray);
	}

	// UI Update function
	update(file, ul, array) {
		this.createList(file);
		this.listItemAppend(ul, array);
	}

	// Function to create new list item
	createList(file) {
		if (!file) return;
		let fileItem = `
				<li class="file-list" >
					<div class="file-content" id="${file.fileId}">
						<h4 class="note-header">${file.heading}</h4>
						<p class="note">${file.note}</p>
						<p class="creation-date">Created on ${file.creationDate}</p>
					</div>
					<span class="material-symbols-rounded md-18 close"> close </span>
				</li> 
		`;

		this.fileItem = fileItem;
	}

	// Function to append list item
	listItemAppend(ul, array) {
		if (array === this.fileArray) {
			console.log("trying to update files UI");
			// To remove empty-file placeholder
			summary.removeAttribute("data-placeholder");
			summary.removeAttribute("contenteditable");
		}

		if (array === this.bookmarkArray) {
			console.log("trying to update bookmarks UI");
			emptyBookmark.style.display = "none";
			emptyBookmark.previousElementSibling.style.display = "grid";
			emptyBookmark.previousElementSibling.classList.remove("hidden");
		}
		// Append listItem
		ul.insertAdjacentHTML("afterbegin", this.fileItem);

		// To implement day/night on all newly created list items
		listItem = document.querySelector(".file-list");
		fileList = Array.from(document.querySelectorAll(".file-list"));

		dayNightImplementation(fileList);
	}

	// Save to Local Storage
	setLocalStorage(arrayname, array) {
		localStorage.setItem(arrayname, JSON.stringify(array));
	}

	// Retrieve from Local Storage
	getStoragedFiles() {
		const data = JSON.parse(localStorage.getItem("files"));

		if (!data) return;

		this.fileArray = data;

		this.fileArray.forEach((file) => {
			this.update(file, unorderedList, this.fileArray);
		});
	}

	getStoredBookmarks() {
		const data = JSON.parse(localStorage.getItem("bookmarks"));

		if (!data) return;
		if (data.length === 0) return;

		this.bookmarkArray = data;

		this.bookmarkArray.forEach((bookmark) => {
			// const bookmarkFile = this.fileArray.find(
			// 	(file) => file.fileId === bookmark
			// );

			this.update(bookmark, bookmarkList, this.bookmarkArray);
		});
	}

	// Delete items from list
	deleteItem(e, arrayName, array) {
		const deleteTarget = e.target.closest(".close");

		if (!deleteTarget) return; // Control clause

		const index = array.findIndex(
			(file) => file.fileId === deleteTarget.previousElementSibling.id
		);

		const item = e.target.parentElement;

		array.splice(index, 1);
		this.setLocalStorage(arrayName, array);

		item.remove();

		if (deleteTarget.previousElementSibling.id === textField.id) clearText();

		if (array === this.fileArray) {
			// this.deleteItem(e, "bookmarks", this.bookmarkArray, bookmarkList);
			const arrayItem = this.bookmarkArray.find(
				(file) => file.fileId === deleteTarget.previousElementSibling.id
			);
			if (this.bookmarkArray.includes(arrayItem)) {
				const arrayIndex = this.bookmarkArray.findIndex(
					(file) => file.fileId === arrayItem.fileId
				);
				this.bookmarkArray.splice(arrayIndex, 1);
				this.setLocalStorage("bookmarks", this.bookmarkArray);
			}

			if (array.length < 1) {
				summary.setAttribute("data-placeholder", "File is empty");
				summary.setAttribute("contenteditable", false);
				clearText();
			}
		}

		if (array === this.bookmarkArray && array.length < 1) {
			emptyBookmark.style.display = "flex";
			emptyBookmark.previousElementSibling.style.display = "none";
			emptyBookmark.previousElementSibling.classList.add("hidden");
		}
	}

	// Explode list content
	explodedView(e, array, textTitle, textArea) {
		const target = e.target.closest(".file-content");

		if (!target) return; // Control clause

		const targetFile = array.find((file) => file.fileId === target.id);

		textTitle.value = targetFile.heading;
		textArea.value = targetFile.note;
		textField.id = targetFile.fileId;
	}
}

const fileCl = new Create();

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

		todoInput.value =
			todoDate.value =
			priority.value =
			timeframeFrom.value =
			timeframeTo.value =
				"";
	}

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

		if (!checkBox.hasAttribute("checked")) {
			checkBox.setAttribute("checked", "");

			const targetObject = this.todoObjectArray.find(
				(arrayItem) => arrayItem.todoId === target.id
			);

			targetObject.checked = true;
			this.setLocalStorage("todos", this.todoObjectArray);
		} else {
			checkBox.removeAttribute("checked");

			const targetObject = this.todoObjectArray.find(
				(arrayItem) => arrayItem.todoId === target.id
			);

			targetObject.checked = false;
			this.setLocalStorage("todos", this.todoObjectArray);
		}

		this.percentComplete();
	}

	formatFunction() {
		saveTodoBtn.classList.remove("hidden");
		todoUL.classList.remove("hidden");

		todoBody.removeAttribute("data-placeholder");
		todoBodyContainer.classList.remove("hidden");
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
		todoStatus.textContent = targetTodo.checked === true ? "Done" : "Pending";

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

		this.formatFunction();

		todoInput.focus();
		todoInput.value =
			todoDate.value =
			priority.value =
			timeframeFrom.value =
			timeframeTo.value =
				"";
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
		todoHeading.removeAttribute("id");

		this.setLocalStorage("todos", this.todoObjectArray);
		this.setLocalStorage("groupId", this.todoListArray);

		todoBodyContainer.classList.add("hidden");
		saveTodoBtn.classList.add("hidden");

		todoBody.setAttribute(
			"data-placeholder",
			"You do not have any active todo entries. Click the create todo button to start"
		);

		todoHeading.textContent =
			groupName.value =
			todoInput.value =
			todoDate.value =
			priority.value =
			timeframeFrom.value =
			timeframeTo.value =
				"";
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

			this.formatFunction();
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

				targetTodo.remove();
			}
		}

		if (deleteTarget.id === todoHeading.id) {
			todoItem = document.querySelectorAll(".todo-item");
			todoItem.forEach((todo) => {
				todo.remove();
			});

			todoHeading.textContent = "";
			todoHeading.removeAttribute("id");
			saveTodoBtn.classList.add("hidden");
			todoBodyContainer.classList.add("hidden");
			todoBody.setAttribute(
				"data-placeholder",
				"You do not have any active todo entries. Click the create todo button to start"
			);
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

		if (todoItem === todoItem && todoUL.children?.length === 0) {
			todoHeading.textContent = "";
			saveTodoBtn.classList.add("hidden");
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

//////////////////////////////////////
/// SETTINGS
/////////////////////////////////////
// Displaying and Hidding Settings Page
const settingsPage = document.querySelector(".settings-page");
settings.addEventListener("click", () => {
	settingsPage.classList.toggle("hidden");
});

// Font Size selection
const fontSizeSelectors = document.querySelectorAll(".selector");
const html = document.querySelector("html");
// console.log(html);

let idCount = 12;

class SettingsObj {
	constructor(fontSize, theme) {
		this.fontSize = fontSize;
		this.theme = theme;
	}
}

class Setting {
	constructor() {
		this.settingId();
		this.fontSizeFunction();
		// this.themeSetting();

		fontSizeSelectors[1].style.backgroundColor = color3;
		this.defaultFontSize = fontSizeSelectors[1].id;
		html.style.fontSize = `${(this.defaultFontSize / 16) * 100}%`;
		// console.log(html.style.fontSize);
	}

	settingId() {
		fontSizeSelectors.forEach((selector) => {
			selector.id = idCount;
			idCount += 2;
		});
	}

	fontSizeFunction() {
		fontSizeSelectors.forEach((selector) => {
			selector.addEventListener("click", (e) => {
				console.log(selector.id);

				fontSizeSelectors.forEach((selector) => {
					selector.style.backgroundColor = "";
				});

				e.target.style.backgroundColor = color3;

				html.style.fontSize = `${(selector.id / 16) * 100}%`;
				// console.log(html.style.fontSize);
			});
		});
	}

	// Theme Day/Night
	// themeSetting() {
	// 	const themeValue = document.querySelector(".theme-value");
	// 	toggleDay.classList.contains("hidden")
	// 		? (themeValue.textContent = "Night")
	// 		: (themeValue.textContent = "Day");
	// }
}

const newSetting = new Setting();
