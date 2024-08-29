////////////////
/// NEW FILE ///
////////////////
// .gitignore
const alphaNumeric = [
	"A",
	"B",
	"C",
	"D",
	"E",
	"F",
	"G",
	"H",
	"I",
	"J",
	"K",
	"L",
	"M",
	"N",
	"O",
	"P",
	"Q",
	"R",
	"S",
	"T",
	"U",
	"V",
	"W",
	"X",
	"Y",
	"Z",
	"a",
	"b",
	"c",
	"d",
	"e",
	"f",
	"g",
	"h",
	"i",
	"j",
	"k",
	"l",
	"m",
	"n",
	"o",
	"p",
	"q",
	"r",
	"s",
	"t",
	"u",
	"v",
	"w",
	"x",
	"y",
	"z",
	0,
	1,
	2,
	3,
	4,
	5,
	6,
	7,
	8,
	9,
];

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
		this.fileId = generateUID();
	}

	setCreationDate() {
		const dateString = this.date.toDateString().slice(4);
		const timeString = this.date.toTimeString().slice(0, 5);
		return `${dateString} - ${timeString}`;
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
		this.getStoredFiles();
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
			clearTimeout(displayMsgTimeout);
			displaySuccessMsg("File", "saved");
		}

		this.setLocalStorage("files", this.fileArray);
	}

	// Save to bookmark
	saveBookmark() {
		if (!textField.id) return;

		const currentFile = this.fileArray.find(
			(file) => file.fileId === textField.id
		);

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

		clearTimeout(displayMsgTimeout);
		displaySuccessMsg("Bookmark", "saved");
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
			// To remove empty-file placeholder
			summary.removeAttribute("data-placeholder");
			summary.removeAttribute("contenteditable");
		}

		if (array === this.bookmarkArray) {
			emptyBookmark.style.display = "none";
			emptyBookmark.previousElementSibling.style.display = "grid";
			emptyBookmark.previousElementSibling.classList.remove("hidden");
		}
		// Append listItem
		ul.insertAdjacentHTML("afterbegin", this.fileItem);

		// To implement day/night on all newly created list items
		listItem = document.querySelector(".file-list");
		fileList = Array.from(document.querySelectorAll(".file-list"));
	}

	// Save to Local Storage
	setLocalStorage(arrayname, array) {
		localStorage.setItem(arrayname, JSON.stringify(array));
	}

	// Retrieve from Local Storage
	getStoredFiles() {
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

		item.remove();

		const itemType =
			arrayName[0].toUpperCase() + arrayName.slice(1, arrayName.length - 1);

		clearTimeout(displayMsgTimeout);
		displaySuccessMsg(itemType, "deleted");

		this.setLocalStorage(arrayName, array);

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
