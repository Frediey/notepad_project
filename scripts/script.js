///////////////////////////////////////
// Selectors
// const toggleDayAndNight = document.querySelector(".toggle-buttons");
// const toggleDay = document.querySelector(".toggle-day");
// const toggleNight = document.querySelector(".toggle-night");
// const settings = document.querySelector(".settings");
// const backgroundDay = document.querySelector(".background-day");
// const backgroundNight = document.querySelector(".background-night");
// const icons = document.querySelectorAll(".material-symbols-outlined.md-18");
// const textField = document.querySelector(".text-field");
// const textFieldTitle = document.querySelector(".text-field-title");
// const textArea = document.querySelector(".text-area");
// const textFieldHeader = document.querySelector(".text-field-header");
// const saveAndBookmark = document.querySelector(".save-bookmark");
// const bookmarkBtn = document.querySelector(".bookmark");
// const saveBtn = document.querySelectorAll(".save");
// const addFile = document.querySelector(".add-file");
// const closeFile = document.querySelector(".close-file");
// const container = document.querySelector(".container");
// const main = document.querySelector(".main");
// const summary = document.querySelector(".summary");
// const tab = document.querySelectorAll(".menu-list-item");

// const toggles = function (bgrColor, textClr) {
// 	if (unorderedList?.contains(listItem)) {
// 		fileList.forEach((listItem) => {
// 			listItem.style.backgroundColor = bgrColor;
// 			listItem.style.color = textClr;
// 		});
// 	}

// 	textField.style.backgroundColor = bgrColor;
// 	textField.style.color = textClr;
// 	textFieldTitle.style.color = textClr;
// 	textArea.style.color = textClr;
// 	saveAndBookmark.style.color = textClr;
// 	document.body.style.backgroundColor = textClr;
// 	document.body.style.color = bgrColor;
// };

// const toggle = function () {
// 	if (toggleDay.classList.contains("hidden")) {
// 		toggleDay.classList.remove("hidden");
// 		backgroundDay.classList.remove("hidden");
// 		toggleNight.classList.add("hidden");
// 		backgroundNight.classList.add("hidden");

// 		toggles("#050517", "#fff");
// 	} else {
// 		toggleNight.classList.remove("hidden");
// 		backgroundNight.classList.remove("hidden");
// 		toggleDay.classList.add("hidden");
// 		backgroundDay.classList.add("hidden");

// 		toggles("#fff", "#050517");
// 	}
// };

// toggleDayAndNight.addEventListener("click", toggle);

// const clickFunction = function (tabItem) {
// 	tabItem.classList.add("active");
// };
// console.log(tab);
// for (let i = 0; i < tab.length; i++) {
// 	tab[i].addEventListener("click", () => {
// 		clickFunction(tab[i]);
// 	});
// }

// addFile.addEventListener("click", function () {
// 	console.log("addFile is clicked");
// 	console.log(summary.contains(unorderedList));

// 	if (!summary.contains(unorderedList)) {
// 		console.log("No ul");
// 		if (
// 			main.classList.contains("hidden") &&
// 			closeFile.classList.contains("hidden")
// 		) {
// 			container?.classList.add("container-grid");
// 			main.classList.remove("hidden");
// 			closeFile.classList.remove("hidden");
// 			addFile.classList.add("hidden");
// 			listItem?.style.width === "15rem";
// 			summary.setAttribute("contenteditable", "false");
// 			summary.setAttribute("data-placeholder", "File is empty");
// 		}

// 		unorderedList = document.createElement("ul");
// 		unorderedList.setAttribute("class", "summary-list");
// 		summary.appendChild(unorderedList);
// 		summary.insertAdjacentElement("beforeend", unorderedList);
// 	} else {
// 		console.log("ul present");
// 		console.log(summary.contains(unorderedList));
// 		if (
// 			main.classList.contains("hidden") &&
// 			closeFile.classList.contains("hidden")
// 		) {
// 			container?.classList.add("container-grid");
// 			main.classList.remove("hidden");
// 			closeFile.classList.remove("hidden");
// 			addFile.classList.add("hidden");
// 			listItem?.style.width === "15rem";
// 		} else {
// 			container?.classList.add("container-grid");
// 			textField.classList.remove("hidden");
// 			closeFile.classList.remove("hidden");
// 			addFile.classList.add("hidden");
// 			listItem?.style.width === "15rem";
// 		}
// 	}
// });

// const saveToFiles = function () {
// 	console.log(listItem.innerText);

// 	storageCounter += 1;
// 	// const fileContent = {
// 	// 	[`file${storageCounter}`]: { ["header"]: "", ["note"]: "" },
// 	// };
// 	// fileContent[`file${storageCounter}`]["header"] = headingParagraph.innerText;
// 	// fileContent[`file${storageCounter}`]["note"] = noteParagraph.innerText;

// 	// const fileObj = function ()

// 	// const fileContent = new fileObj()

// 	localStorage.setItem(`file${storageCounter}`, JSON.stringify(fileContent));

// 	const getItems = function (fileItem) {
// 		textFieldTitle.value = "";
// 		textArea.value = "";
// 		JSON.parse(localStorage.getItem(fileItem));
// 		textFieldTitle.value = fileContent[fileItem]["header"];
// 		textArea.value = fileContent[fileItem]["note"];
// 	};

// 	listItem.addEventListener("click", () => {
// 		getItems(listItem.id);
// 		console.log(listItem.id);
// 	});
// };

// localStorage.clear();
// listItem = document.createElement("li");
// listItem.className = "file-list";

// listItem.id = `file${fileCount}`;
// console.log(listItem.id);

// headingParagraph = document.createElement("h4");
// noteParagraph = document.createElement("p");
// creationDate = document.createElement("p");

// headingParagraph.className = "note-header";
// noteParagraph.className = "note";
// creationDate.className = "creation-date";

// headingParagraph.innerText = heading;
// noteParagraph.innerText = note;
// creationDate.innerText = `Created on ${currentDate}`;

// listItem.appendChild(headingParagraph);
// listItem.appendChild(noteParagraph);
// listItem.appendChild(creationDate);

////////////////////////////////////////
// TAB IMPLEMENTATION
// files.querySelectorAll(".file-wrap").forEach((fileWrap) => {
// 	fileWrap.style.display = "none";
// });
// let currentFileWrap = files.querySelector(`#${e.target.id}`);
// currentFileWrap.style.display = "block";

// Create Newfile function
// const createNewFile = function () {
// 	fileCount += +1;
// 	fileId = fileCount;
// 	const note = textArea.value;
// 	const currentDate = new Date().toJSON().slice(0, 10);

// 	let heading;
// 	if (textArea.value !== "" && textFieldTitle.value !== "") {
// 		heading = textFieldTitle.value;
// 	} else if (textArea.value !== "" && textFieldTitle.value === "") {
// 		heading = textFieldTitle.value = "NO TITLE";
// 	}
// 	let fileItem = `
// 				<li class="file-list" id="file${fileId}">
// 					<h4 class="note-header">${heading}</h4>
// 					<p class="note">${note}</p>
// 					<p class="creation-date">Created on ${currentDate}</p>
// 				</li>
// 	`;

// 	unorderedList = document.querySelector(".summary > .summary-list");
// 	unorderedList.insertAdjacentHTML("afterbegin", fileItem);
// };

// // To remove empty-file placeholder
// summary.removeAttribute("data-placeholder");
// summary.removeAttribute("contenteditable");

// // To implement day/night on all newly created list items
// fileList = Array.from(document.querySelectorAll(".file-list"));
// fileList.forEach((listItem) => {
// 	listItem.style.backgroundColor = textField.style.backgroundColor;
// 	listItem.style.color = textField.style.color;
// });

// // To clear the text field after save
// clearText();
