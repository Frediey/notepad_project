const diaryDate = document.querySelector(".diary-date");
const saveDiaryBtn = document.querySelector(".save-diary");

const diaryTextArea = document.querySelector(".diary-text-area");
const diaries = document.querySelector(".diaries");

const date = new Date();

const days = [
	"Sunday",
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday",
];

const months = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];

const day = days[date.getDay()];
const month = months[date.getMonth()];
const year = date.getFullYear();
const diaryDateString = `${day}, ${date.getDate()} ${month} ${year}`;

diaryDate.innerText = diaryDateString;

class CreateDiary {
	constructor(date, note) {
		this.date = date;
		this.note = note;
		this.diaryId = generateUID();
	}
}

class Diary {
	diaryArray = [];
	constructor() {
		saveDiaryBtn.addEventListener("click", this.saveDiary.bind(this));

		diaries.addEventListener("click", (e) => this.explodedView(e));

		this.getStoredDiaries();
	}

	update(diaryObj) {
		let html = `<li class="file-list">
									<div class="file-content" id=${diaryObj.diaryId}>
										<h4 class="diary-header">${diaryObj.date}</h4>
									</div>
									<span class="material-symbols-rounded md-18 close delete-diary">
										close
									</span>
								</li>`;

		diaries.insertAdjacentHTML("afterbegin", html);

		const deleteDiaryBtn = document.querySelector(".delete-diary");

		deleteDiaryBtn.addEventListener("click", this.deleteDiaryNote.bind(this));
	}

	saveDiary() {
		const diaryNote = diaryTextArea.value;

		const newDiary = new CreateDiary(diaryDateString, diaryNote);

		this.diaryArray.push(newDiary);

		console.log(newDiary);

		this.setLocalStorage();

		this.update(newDiary);
	}

	setLocalStorage() {
		localStorage.setItem("diaries", JSON.stringify(this.diaryArray));
	}

	getStoredDiaries() {
		const data = JSON.parse(localStorage.getItem("diaries"));

		if (!data) return;

		this.diaryArray = data;

		this.diaryArray.forEach((arrayItem) => this.update(arrayItem));
	}

	explodedView(e) {
		const target = e.target.closest(".file-content");

		if (!target) return;

		const targetDiary = this.diaryArray.find(
			(arrayItem) => arrayItem.diaryId === target.id
		);

		if (targetDiary.date === diaryDateString) {
			diaryDate.innerText = targetDiary.date;
			diaryTextArea.value = targetDiary.note;
			diaryTextArea.readOnly = false;
			saveDiaryBtn.style.pointerEvents = "all";
			saveDiaryBtn.style.opacity = "1";
		}

		if (targetDiary.date !== diaryDateString) {
			saveDiaryBtn.style.pointerEvents = "none";
			saveDiaryBtn.style.opacity = "0.5";
			diaryTextArea.readOnly = true;
			diaryTextArea.scrollIntoView(true);
			// diaryTextArea.scrollBy(
			// 	0,
			// 	window.getComputedStyle(diaryTextArea).marginTop
			// );
			// saveDiaryBtn.style.cursor = "not-allowed";
			// diaryTextArea.scrollTo({ top: 100, behavior: "smooth" });
			diaryDate.innerText = targetDiary.date;
			diaryTextArea.value = targetDiary.note;
		}
	}

	deleteDiaryNote(e) {
		const deleteTarget = e.target.previousElementSibling.id;
		console.log(deleteTarget);

		const index = this.diaryArray.findIndex(
			(arrayItem) => arrayItem.diaryId === deleteTarget
		);

		const item = e.target.parentElement;

		item.remove();

		this.diaryArray.splice(index, 1);
		this.setLocalStorage();
	}
}

new Diary();
