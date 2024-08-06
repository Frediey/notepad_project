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
const anchors = document.querySelectorAll(".nav-item");
const files = document.querySelector(".files");
const closeBtns = document.querySelectorAll(".close");
const emptyBookmark = document.querySelector(".bookmark > .bookmark");
const todoList = document.querySelector(".to-do-list");
const diary = document.querySelector(".diary");

////////////////////////////
/// DAY AND NIGHT TOGGLE ///
////////////////////////////
const color1 = "#050517";
const color2 = "#f8f8f8";
const color3 = "#4530ce";
const bodyStyle = document.body.style;

// Default active tab
let activeEl = Array.from(anchors).find((anchor) =>
	anchor.classList.contains("active")
);
activeEl.style.borderLeft = `6px solid ${bodyStyle.color}`;
console.log(activeEl);
// activeEl.style.fontVariationSettings = `FILL 1`;

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
		anchor.classList.contains("active")
	);

	console.log(activeEl);

	bodyStyle.backgroundColor = secondColor;
	bodyStyle.color = firstColor;
	fileWrap.style.color = bodyStyle.backgroundColor;
	fileWrap.style.backgroundColor = bodyStyle.color;

	// todoList.style.backgroundColor = bodyStyle.backgroundColor;
	// todoList.style.color = bodyStyle.color;
	// diary.style.backgroundColor = bodyStyle.color;
	// diary.style.color = bodyStyle.backgroundColor;
	settingsPage.style.color = bodyStyle.color;
	settingsPage.style.backgroundColor = bodyStyle.backgroundColor;

	activeEl.style.borderLeft = `6px solid ${bodyStyle.color}`;

	if (unorderedList?.contains(listItem)) {
		console.log("contains listItem");
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
		anchor.classList?.remove("active");
		anchor.style.borderLeft = "";
	});
}

function callBack(e, tab) {
	const target = e.target.closest("span");
	if (!target) return;

	console.log(target);
	console.log(target.parentElement);

	tab.classList.remove("hidden");
	tab.style.display = "block";
	target.parentElement.style.borderLeft = `6px solid ${bodyStyle.color}`;
	target.parentElement.classList.add("active");

	const title = document.querySelector(".title");
	title.innerText = e.target.nextElementSibling.innerText;
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

// addFile.addEventListener("click", (e) => {
// 	clearText();
// 	tabFormat();
// 	tabActive(e);
// 	fileWrap.forEach((tab) => {
// 		if (tab.id === e.target.previousElementSibling.id) callBack(e, tab);
// 	});
// });

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

		fontSizeSelectors[0].style.backgroundColor = color3;
		this.defaultFontSize = fontSizeSelectors[0].id;
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
