"use strict";

///////////////////////////////////////
// Selectors
const wrap = document.querySelector(".wrap-box");
const pageLoad = document.querySelector(".page-loading");
const themeValue = document.querySelector(".theme-value");
const toggleDayAndNight = document.querySelector(".toggle-buttons");
const toggleDay = document.querySelector(".toggle-day");
const toggleNight = document.querySelector(".toggle-night");
const settings = document.querySelector(".settings");
const main = document.querySelector(".main");
const title = document.querySelector(".title");
const messageDialog = document.querySelector(".success-msg-dialog");
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
const closeSuccessMsg = document.querySelector(".close-dialog");
const emptyBookmark = document.querySelector(".bookmark > .bookmark");
const todoList = document.querySelector(".to-do-list");
const diary = document.querySelector(".diary");

////////////////////////////
/// DAY AND NIGHT TOGGLE ///
////////////////////////////
const color1 = "#050517";
const color2 = "#f8f8f8";
const color3 = "#4530ce";
const bodyStyle = wrap.style;

setTimeout(() => {
	pageLoad.style.display = "none";
	wrap.style.opacity = 1;
}, 1000);

// Default active tab
let activeEl = Array.from(anchors).find((anchor) =>
	anchor.classList.contains("active")
);
activeEl.style.borderLeft = `6px solid ${bodyStyle.color}`;

let displayMsgTimeout = undefined;

/////////////////////////////////
//// DISPLAY SUCCESS MESSAGE ////
/////////////////////////////////
function displaySuccessMsg(item, action) {
	const html = `<div class="success-msg-dialog">
						      <div class="flex space-between">
							      <p class="success-msg">${item} ${action} successfully</p>
							      <span class="material-symbols-rounded md-18 close close-dialog">
								      close
							      </span>
						      </div>
					      </div>`;

	files.insertAdjacentHTML("afterbegin", html);

	const messageDialogs = document.querySelectorAll(".success-msg-dialog");
	const closeSuccessMsg = document.querySelector(".close-dialog");

	for (let i = 0; i < messageDialogs.length; i++) {
		messageDialogs[i].style.opacity = "0";
		messageDialogs[i].style.opacity = "1";

		displayMsgTimeout = setTimeout(() => {
			messageDialogs[i].style.opacity = "0";
			messageDialogs[i].remove();
		}, 3000);

		closeSuccessMsg.addEventListener("click", () => messageDialog[i].remove());
	}
}

/////////////////////////////
//// TABS IMPLEMENTATION ////
/////////////////////////////
// Callback Functions
function tabFormat() {
	anchors.forEach((anchor) => {
		anchor.classList?.remove("active");
		anchor.style.borderLeft = "";
	});

	!settingsPage.classList.contains("hidden")
		? settingsPage.classList.add("hidden")
		: "";
}

function callBack(e, tab) {
	const target = e.target.closest("span");
	if (!target) return;

	tab.classList.remove("hidden");
	tab.style.display = "block";
	target.parentElement.style.borderLeft = `6px solid ${bodyStyle.color}`;
	target.parentElement.classList.add("active");

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

addFile.addEventListener("click", (e) => {
	clearText();
});

//////////////////////////////////////
/// SETTINGS
/////////////////////////////////////
// Displaying and Hidding Settings Page
const settingsPage = document.querySelector(".settings-page");
const textAreas = document.getElementsByName("text-area");
settings.addEventListener("click", () => {
	settingsPage.classList.toggle("hidden");
});

// Font Size selection
const fontSizeSelectors = document.querySelectorAll(".selector");

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
		this.getStoredSettings();
		toggleDayAndNight.addEventListener("click", this.toggle.bind(this));
	}

	settingId() {
		fontSizeSelectors.forEach((selector) => {
			selector.id = idCount;
			idCount += 2;
		});
	}

	fontSizeFunction() {
		fontSizeSelectors[0].style.backgroundColor = color3;

		fontSizeSelectors.forEach((selector) => {
			selector.addEventListener("click", (e) => {
				fontSizeSelectors.forEach((selector) => {
					selector.style.backgroundColor = "";
				});

				e.target.style.backgroundColor = color3;

				textAreas.forEach(
					(textArea) => (textArea.style.fontSize = selector.id + "px")
				);

				this.currentFontSize = window.getComputedStyle(textArea).fontSize;

				this.newSetting.fontSize = this.currentFontSize;
				localStorage.setItem("settings", JSON.stringify(this.newSetting));
			});
		});
	}

	getStoredSettings() {
		const data = JSON.parse(localStorage.getItem("settings"));
		if (!data) {
			this.currentFontSize = fontSizeSelectors[0].id + "px";
			this.newSetting = new SettingsObj(
				this.currentFontSize,
				themeValue.innerText
			);
			localStorage.setItem("settings", JSON.stringify(this.newSetting));
		}

		if (data) {
			this.newSetting = data;

			if (this.newSetting.theme === "Day") {
				toggleDay.classList.add("hidden");
				this.toggle();
			} else {
				toggleDay.classList.remove("hidden");
				this.toggle();
			}

			const numInteger = parseFloat(this.newSetting.fontSize);
			const fontTab = document.getElementById(numInteger);
			fontTab.click();
		}
	}

	toggles = function (firstColor, secondColor) {
		activeEl = Array.from(anchors).find((anchor) =>
			anchor.classList.contains("active")
		);

		bodyStyle.backgroundColor = secondColor;
		bodyStyle.color = firstColor;
		settingsPage.style.color = bodyStyle.color;
		settingsPage.style.backgroundColor = bodyStyle.backgroundColor;

		activeEl.style.borderLeft = `6px solid ${bodyStyle.color}`;
	};

	// Toggle Function
	toggle = function () {
		if (toggleDay.classList.contains("hidden")) {
			toggleDay.classList.remove("hidden");
			toggleNight.classList.add("hidden");
			addFile.style.color = color1;
			themeValue.textContent = this.newSetting.theme = "Day";

			this.toggles(color1, color2);
			localStorage.setItem("settings", JSON.stringify(this.newSetting));
		} else {
			toggleNight.classList.remove("hidden");
			toggleDay.classList.add("hidden");
			addFile.style.color = color1;
			themeValue.textContent = this.newSetting.theme = "Night";

			this.toggles(color2, color1);
			localStorage.setItem("settings", JSON.stringify(this.newSetting));
		}
	};
}

const newSettingsObj = new Setting();
