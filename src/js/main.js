const gamePlate = document.querySelector('.game-box__plate');
const navBar = document.querySelector('.navbar');
const gameList = navBar.querySelector('.navbar__list-game');
const optionsList = navBar.querySelector('.navbar__list-options');
const helpList = navBar.querySelector('.navbar__list-help');
const navItemsGame = gameList.querySelectorAll('.navbar__list__item');
const navItemsOptions = optionsList.querySelectorAll('.navbar__list__item');
const navItemsHelp = helpList.querySelectorAll('.navbar__list__item');
const root = document.querySelector(':root');
const counterMines = document.querySelector('.counter-mines');
const counterTime = document.querySelector('.counter-time');
const statusFace = document.querySelector('.game-box__bar__status-face');
const plateElements = gamePlate.getElementsByClassName('game-box__plate__element');
const begginer = [8, 8, 10];
const intermediate = [16, 16, 40];
const expert = [31, 16, 99];
let bombs = [];
let boxes = [];
let bombsIndexes = [];
let counterToFinishGame = 0;
let bombsNumber = 0;
let flagsNumber = 0;
let flagsCounter = 0;
let seconds = 0;
let timer;
let chosenLevel = begginer;

// Things to improve : After double click at the end, if you lose, show trigger on bomb that you didn't spoted by flag and it cause lose.

// Function to run before first play

const countFields = chosenLevel => {
	return chosenLevel[0] * chosenLevel[1];
};

const shuffle = (boxesAmount, bombsAmount) => {
	for (let i = 0; i < bombsAmount; i++) {
		let randomNum = Math.floor(Math.random() * boxesAmount);
		if (randomNum === 0 || bombs.includes(randomNum)) {
			i--;
		} else {
			bombs.push(randomNum);
		}
	}
};

class GamePlate {
	constructor(id, bomb, bombsAround, bombsIndexes) {
		this.id = id;
		this.bomb = bomb;
		this.bombsAround = bombsAround;
		this.bombsIndexes = bombsIndexes;
	}
}

const createGamePlate = boxesAmount => {
	for (let i = 0; i < boxesAmount; i++) {
		boxes[i] = new GamePlate(i, false, bombsNumber, bombsIndexes);
		boxes[i].bombsIndexes = [];
		checkBombsAround(i, chosenLevel[0]);
		boxes[i].bombsAround = bombsNumber;
		bombsNumber = 0;
	}
};

const checkBombsAround = (i, rowLength) => {
	if (i === 0) {
		// top-left corner check
		if (bombs.includes(i + 1)) {
			bombsNumber++;
			boxes[i].bombsIndexes.push(i + 1);
		}
		if (bombs.includes(i + rowLength)) {
			bombsNumber++;
			boxes[i].bombsIndexes.push(i + rowLength);
		}
		if (bombs.includes(i + (rowLength + 1))) {
			bombsNumber++;
			boxes[i].bombsIndexes.push(i + 1 + rowLength);
		}
	} else if (i === rowLength - 1) {
		// top-right corner check
		if (bombs.includes(i - 1)) {
			bombsNumber++;
			boxes[i].bombsIndexes.push(i - 1);
		}
		if (bombs.includes(i + rowLength)) {
			bombsNumber++;
			boxes[i].bombsIndexes.push(i + rowLength);
		}
		if (bombs.includes(i + (rowLength - 1))) {
			bombsNumber++;
			boxes[i].bombsIndexes.push(i + (rowLength - 1));
		}
	} else if (i === countFields(chosenLevel) - rowLength) {
		// bottom-left corner check
		if (bombs.includes(i + 1)) {
			bombsNumber++;
			boxes[i].bombsIndexes.push(i + 1);
		}
		if (bombs.includes(i - rowLength)) {
			bombsNumber++;
			boxes[i].bombsIndexes.push(i - rowLength);
		}
		if (bombs.includes(i - (rowLength - 1))) {
			bombsNumber++;
			boxes[i].bombsIndexes.push(i - (rowLength - 1));
		}
	} else if (i === countFields(chosenLevel) - 1) {
		// bottom-right corner check
		if (bombs.includes(i - 1)) {
			bombsNumber++;
			boxes[i].bombsIndexes.push(i - 1);
		}
		if (bombs.includes(i - rowLength)) {
			bombsNumber++;
			boxes[i].bombsIndexes.push(i - rowLength);
		}
		if (bombs.includes(i - (rowLength + 1))) {
			bombsNumber++;
			boxes[i].bombsIndexes.push(i - (rowLength + 1));
		}
	} else if (i % rowLength === 0) {
		// side left check
		if (bombs.includes(i - rowLength)) {
			bombsNumber++;
			boxes[i].bombsIndexes.push(i - rowLength);
		}
		if (bombs.includes(i - rowLength + 1)) {
			bombsNumber++;
			boxes[i].bombsIndexes.push(i - rowLength + 1);
		}
		if (bombs.includes(i + 1)) {
			bombsNumber++;
			boxes[i].bombsIndexes.push(i + 1);
		}
		if (bombs.includes(i + rowLength)) {
			bombsNumber++;
			boxes[i].bombsIndexes.push(i + rowLength);
		}
		if (bombs.includes(i + rowLength + 1)) {
			bombsNumber++;
			boxes[i].bombsIndexes.push(i + rowLength + 1);
		}
	} else if ((i + 1) % rowLength === 0) {
		// side right check
		if (bombs.includes(i - rowLength)) {
			bombsNumber++;
			boxes[i].bombsIndexes.push(i - rowLength);
		}
		if (bombs.includes(i - rowLength - 1)) {
			bombsNumber++;
			boxes[i].bombsIndexes.push(i - rowLength - 1);
		}
		if (bombs.includes(i - 1)) {
			bombsNumber++;
			boxes[i].bombsIndexes.push(i - 1);
		}
		if (bombs.includes(i + rowLength)) {
			bombsNumber++;
			boxes[i].bombsIndexes.push(i + rowLength);
		}
		if (bombs.includes(i + rowLength - 1)) {
			bombsNumber++;
			boxes[i].bombsIndexes.push(i + rowLength - 1);
		}
	} else if (i - rowLength < 0) {
		// side top check
		if (bombs.includes(i - 1)) {
			bombsNumber++;
			boxes[i].bombsIndexes.push(i - 1);
		}
		if (bombs.includes(i + 1)) {
			bombsNumber++;
			boxes[i].bombsIndexes.push(i + 1);
		}
		if (bombs.includes(i + rowLength + 1)) {
			bombsNumber++;
			boxes[i].bombsIndexes.push(i + rowLength + 1);
		}
		if (bombs.includes(i + rowLength)) {
			bombsNumber++;
			boxes[i].bombsIndexes.push(i + rowLength);
		}
		if (bombs.includes(i + rowLength - 1)) {
			bombsNumber++;
			boxes[i].bombsIndexes.push(i + rowLength - 1);
		}
	} else if (i > countFields(chosenLevel) - rowLength) {
		// side bottom check
		if (bombs.includes(i - 1)) {
			bombsNumber++;
			boxes[i].bombsIndexes.push(i - 1);
		}
		if (bombs.includes(i + 1)) {
			bombsNumber++;
			boxes[i].bombsIndexes.push(i + 1);
		}
		if (bombs.includes(i - rowLength + 1)) {
			bombsNumber++;
			boxes[i].bombsIndexes.push(i - rowLength + 1);
		}
		if (bombs.includes(i - rowLength)) {
			bombsNumber++;
			boxes[i].bombsIndexes.push(i - rowLength);
		}
		if (bombs.includes(i - rowLength - 1)) {
			bombsNumber++;
			boxes[i].bombsIndexes.push(i - rowLength - 1);
		}
	} else {
		// the rest of boxes
		if (bombs.includes(i - 1)) {
			bombsNumber++;
			boxes[i].bombsIndexes.push(i - 1);
		}
		if (bombs.includes(i + 1)) {
			bombsNumber++;
			boxes[i].bombsIndexes.push(i + 1);
		}
		if (bombs.includes(i - rowLength + 1)) {
			bombsNumber++;
			boxes[i].bombsIndexes.push(i - rowLength + 1);
		}
		if (bombs.includes(i - rowLength)) {
			bombsNumber++;
			boxes[i].bombsIndexes.push(i - rowLength);
		}
		if (bombs.includes(i - rowLength - 1)) {
			bombsNumber++;
			boxes[i].bombsIndexes.push(i - rowLength - 1);
		}
		if (bombs.includes(i + rowLength + 1)) {
			bombsNumber++;
			boxes[i].bombsIndexes.push(i + rowLength + 1);
		}
		if (bombs.includes(i + rowLength)) {
			bombsNumber++;
			boxes[i].bombsIndexes.push(i + rowLength);
		}
		if (bombs.includes(i + rowLength - 1)) {
			bombsNumber++;
			boxes[i].bombsIndexes.push(i + rowLength - 1);
		}
	}
};

const plantBombs = () => {
	boxes.forEach(box => {
		if (bombs.includes(box.id)) {
			box.bomb = true;
		}
	});
};

const drawGamePlate = boxesAmount => {
	for (let i = 0; i < boxesAmount; i++) {
		let emptyBox = document.createElement('div');
		emptyBox.setAttribute('id', i);
		gamePlate.append(emptyBox);
		emptyBox.classList.add('game-box__plate__element');
	}
	counterMines.innerHTML = `0${chosenLevel[2]}`;
	// tu moze forEachemptyBox
};

const clearPlate = () => {
	gamePlate.innerHTML = '';
	counterTime.innerHTML = `000`;
	flagsCounter = 0;
	counterToFinishGame = 0;
	seconds = 0;
	bombs = [];
	boxes = [];
	statusFace.classList.add('status-face-ok');
	statusFace.classList.remove('status-face-lost');
	statusFace.classList.remove('status-face-succes');
	statusFace.classList.remove('status-face-wow');
};
// Navigation things, option, new game, select level...
const chooseLevel = e => {
	clearPlate();
	if (e.target.textContent === 'New Game') {
		newGame();
	} else if (e.target.classList.contains('begginer')) {
		chosenLevel = begginer;
		gamePlate.classList.remove('plate-intermediate');
		gamePlate.classList.remove('plate-expert');
		gamePlate.classList.add('plate-begginer');
	} else if (e.target.classList.contains('intermediate')) {
		chosenLevel = intermediate;
		gamePlate.classList.remove('plate-begginer');
		gamePlate.classList.remove('plate-expert');
		gamePlate.classList.add('plate-intermediate');
	} else if (e.target.classList.contains('expert')) {
		chosenLevel = expert;
		gamePlate.classList.remove('plate-begginer');
		gamePlate.classList.remove('plate-intermediate');
		gamePlate.classList.add('plate-expert');
	}
	navItemsGame.forEach(item => item.classList.toggle('navbar__list-game__item'));
	newGame();
};

const changeTheme = e => {
	if (e.target.classList.contains('first-theme')) {
		root.style.setProperty('--linear', 'radial-gradient(91% 146%, #282b29 47%, #282b29 100%)');
		root.style.setProperty('--items-color', '#626c66');
		root.style.setProperty('--plates-color', '#d5c6e0');
		root.style.setProperty('--border-color', '#434a42');
		root.style.setProperty('--dark-font-color', '#000');
		root.style.setProperty('--light-font-color', '#fff');
		root.style.setProperty('--flag', `'🚩'`);
	} else if (e.target.classList.contains('second-theme')) {
		root.style.setProperty('--linear', 'radial-gradient(91% 146%, #c455a8 47%, #e5cdc8 100%)');
		root.style.setProperty('--items-color', '#c455a8');
		root.style.setProperty('--plates-color', '#d7a6b3');
		root.style.setProperty('--border-color', '#14281d');
		root.style.setProperty('--dark-font-color', '#000');
		root.style.setProperty('--light-font-color', '#fff');
		root.style.setProperty('--flag', `'🐷'`);
	} else if (e.target.classList.contains('third-theme')) {
		root.style.setProperty('--linear', 'radial-gradient(91% 146%, #1b2cc1 47%, #1b2cc1 100%)');
		root.style.setProperty('--items-color', '#1b2cc1');
		root.style.setProperty('--plates-color', '#7692ff');
		root.style.setProperty('--border-color', '#091540');
		root.style.setProperty('--dark-font-color', '#000');
		root.style.setProperty('--light-font-color', '#fff');
		root.style.setProperty('--flag', `'🪖'`);
	} else if (e.target.classList.contains('fourth-theme')) {
		root.style.setProperty('--linear', 'radial-gradient(91% 146%, #6ba292 47%, #ddd 100%)');
		root.style.setProperty('--items-color', '#6ba292');
		root.style.setProperty('--plates-color', '#6ba292');
		root.style.setProperty('--border-color', '#080f0f');
		root.style.setProperty('--dark-font-color', '#000');
		root.style.setProperty('--light-font-color', '#fff');
		root.style.setProperty('--flag', `'🛟'`);
	} else if (e.target.classList.contains('fifth-theme')) {
		root.style.setProperty('--linear', 'radial-gradient(91% 146%, #a1cca5 47%, #ddd 100%)');
		root.style.setProperty('--items-color', '#415d43');
		root.style.setProperty('--plates-color', '#709775');
		root.style.setProperty('--border-color', '#111d13');
		root.style.setProperty('--dark-font-color', '#000');
		root.style.setProperty('--light-font-color', '#000');
		root.style.setProperty('--flag', `'🌳'`);
	}
};

const menuAction = e => {
	if (
		e.target.classList.contains('navbar__list-game') ||
		e.target.classList.contains('navbar__list-options') ||
		e.target.classList.contains('navbar__list-help')
	) {
		unfoldMenu(e);
	} else {
		navItemsGame.forEach(item => item.classList.remove('navbar__list-game__item'));
		navItemsOptions.forEach(item => item.classList.remove('navbar__list-options__item'));
		navItemsHelp.forEach(item => item.classList.remove('navbar__list-help__item'));
	}
};

const unfoldMenu = e => {
	if (e.target.classList.contains('navbar__list-game')) {
		navItemsGame.forEach(item => item.classList.toggle('navbar__list-game__item'));
		navItemsOptions.forEach(item => item.classList.remove('navbar__list-options__item'));
		navItemsHelp.forEach(item => item.classList.remove('navbar__list-help__item'));
	} else if (e.target.classList.contains('navbar__list-options')) {
		navItemsOptions.forEach(item => item.classList.toggle('navbar__list-options__item'));
		navItemsGame.forEach(item => item.classList.remove('navbar__list-game__item'));
		navItemsHelp.forEach(item => item.classList.remove('navbar__list-help__item'));
	} else if (e.target.classList.contains('navbar__list-help')) {
		navItemsHelp.forEach(item => item.classList.toggle('navbar__list-help__item'));
		navItemsGame.forEach(item => item.classList.remove('navbar__list-game__item'));
		navItemsOptions.forEach(item => item.classList.remove('navbar__list-options__item'));
	}
};
// Inner bar things, counters and status face
const countMines = e => {
	if (chosenLevel[2] - flagsCounter < 10) {
		counterMines.innerHTML = `00${chosenLevel[2] - flagsCounter}`;
	} else if (chosenLevel[2] - flagsCounter < 100) {
		counterMines.innerHTML = `0${chosenLevel[2] - flagsCounter}`;
	}
};
// Functions to run during the game and after finishing it
const putFlag = e => {
	e.preventDefault();
	if (
		!e.target.classList.contains('show-empty') &&
		!e.target.classList.contains('show-bomb') &&
		!e.target.classList.contains('show-trigger') &&
		!e.target.classList.contains('show-number') &&
		!e.target.classList.contains('wrong-bet') &&
		e.target.classList.contains('game-box__plate__element')
	) {
		if (!e.target.classList.contains('put-flag')) {
			if (flagsCounter < chosenLevel[2]) {
				e.target.classList.add('put-flag');
				flagsCounter++;
			}
		} else if (e.target.classList.contains('put-flag') && e.target.classList.contains('game-box__plate__element')) {
			e.target.classList.remove('put-flag');
			flagsCounter--;
		}
	}
};

const newGame = () => {
	endGame();
	playTime();
	countMines();
	clearPlate();
	shuffle(countFields(chosenLevel), chosenLevel[2]);
	createGamePlate(countFields(chosenLevel));
	plantBombs();
	drawGamePlate(countFields(chosenLevel));
};

const showAllFieldsWrongBet = () => {
	for (const box of boxes) {
		if (box.bomb === true) {
			if (!plateElements[box.id].classList.contains('put-flag')) {
				plateElements[box.id].classList.add('show-bomb');
			}
		}
		if (box.bomb === false) {
			if (plateElements[box.id].classList.contains('put-flag')) {
				plateElements[box.id].classList.add('wrong-bet');
			}
		}
	}
};

const showEmptyForZeroBombs = (i, rowLength) => {
	if (i === 0) {
		// top-left corner
		if (!plateElements[i + 1].classList.contains('show-empty')) {
			showEmpty(i + 1, rowLength);
		}
		if (!plateElements[i + 1 + rowLength].classList.contains('show-empty')) {
			showEmpty(i + 1 + rowLength, rowLength);
		}
		if (!plateElements[i + rowLength].classList.contains('show-empty')) {
			showEmpty(i + rowLength, rowLength);
		}
	} else if (i === rowLength - 1) {
		// top-right corner
		if (!plateElements[i - 1].classList.contains('show-empty')) {
			showEmpty(i - 1, rowLength);
		}
		if (!plateElements[i - 1 + rowLength].classList.contains('show-empty')) {
			showEmpty(i - 1 + rowLength, rowLength);
		}
		if (!plateElements[i + rowLength].classList.contains('show-empty')) {
			showEmpty(i + rowLength, rowLength);
		}
	} else if (i === countFields(chosenLevel) - rowLength) {
		// bottom-left corner
		if (!plateElements[i + 1].classList.contains('show-empty')) {
			showEmpty(i + 1, rowLength);
		}
		if (!plateElements[i - rowLength].classList.contains('show-empty')) {
			showEmpty(i - rowLength, rowLength);
		}
		if (!plateElements[i + 1 - rowLength].classList.contains('show-empty')) {
			showEmpty(i + 1 - rowLength, rowLength);
		}
	} else if (i === countFields(chosenLevel) - 1) {
		// bottom-right corner
		if (!plateElements[i - 1].classList.contains('show-empty')) {
			showEmpty(i - 1, rowLength);
		}
		if (!plateElements[i - rowLength].classList.contains('show-empty')) {
			showEmpty(i - rowLength, rowLength);
		}
		if (!plateElements[i - 1 - rowLength].classList.contains('show-empty')) {
			showEmpty(i - 1 - rowLength, rowLength);
		}
	} else if (i % rowLength === 0) {
		// all left side without corners
		if (!plateElements[i - rowLength].classList.contains('show-empty')) {
			showEmpty(i - rowLength, rowLength);
		}
		if (!plateElements[i + 1 - rowLength].classList.contains('show-empty')) {
			showEmpty(i + 1 - rowLength, rowLength);
		}
		if (!plateElements[i + 1].classList.contains('show-empty')) {
			showEmpty(i + 1, rowLength);
		}
		if (!plateElements[i + rowLength].classList.contains('show-empty')) {
			showEmpty(i + rowLength, rowLength);
		}
		if (!plateElements[i + 1 + rowLength].classList.contains('show-empty')) {
			showEmpty(i + 1 + rowLength, rowLength);
		}
	} else if ((i + 1) % rowLength === 0) {
		// all right side without corners
		if (!plateElements[i - rowLength].classList.contains('show-empty')) {
			showEmpty(i - rowLength, rowLength);
		}
		if (!plateElements[i - rowLength - 1].classList.contains('show-empty')) {
			showEmpty(i - rowLength - 1, rowLength);
		}
		if (!plateElements[i - 1].classList.contains('show-empty')) {
			showEmpty(i - 1, rowLength);
		}
		if (!plateElements[i + rowLength].classList.contains('show-empty')) {
			showEmpty(i + rowLength, rowLength);
		}
		if (!plateElements[i + rowLength - 1].classList.contains('show-empty')) {
			showEmpty(i + rowLength - 1, rowLength);
		}
	} else if (i - rowLength < 0) {
		// all top line without corners
		if (!plateElements[i - 1].classList.contains('show-empty')) {
			showEmpty(i - 1, rowLength);
		}
		if (!plateElements[i + 1].classList.contains('show-empty')) {
			showEmpty(i + 1, rowLength);
		}
		if (!plateElements[i + rowLength + 1].classList.contains('show-empty')) {
			showEmpty(i + rowLength + 1, rowLength);
		}
		if (!plateElements[i + rowLength].classList.contains('show-empty')) {
			showEmpty(i + rowLength, rowLength);
		}
		if (!plateElements[i + rowLength - 1].classList.contains('show-empty')) {
			showEmpty(i + rowLength - 1, rowLength);
		}
	} else if (i > countFields(chosenLevel) - rowLength) {
		// all bottom line without corners
		if (!plateElements[i - 1].classList.contains('show-empty')) {
			showEmpty(i - 1, rowLength);
		}
		if (!plateElements[i + 1].classList.contains('show-empty')) {
			showEmpty(i + 1, rowLength);
		}
		if (!plateElements[i - rowLength + 1].classList.contains('show-empty')) {
			showEmpty(i - rowLength + 1, rowLength);
		}
		if (!plateElements[i - rowLength].classList.contains('show-empty')) {
			showEmpty(i - rowLength, rowLength);
		}
		if (!plateElements[i - rowLength - 1].classList.contains('show-empty')) {
			showEmpty(i - rowLength - 1, rowLength);
		}
	} else {
		// rest fields away from edges
		if (!plateElements[i - 1].classList.contains('show-empty')) {
			showEmpty(i - 1, rowLength);
		}
		if (!plateElements[i + 1].classList.contains('show-empty')) {
			showEmpty(i + 1, rowLength);
		}
		if (!plateElements[i - rowLength + 1].classList.contains('show-empty')) {
			showEmpty(i - rowLength + 1, rowLength);
		}
		if (!plateElements[i - rowLength].classList.contains('show-empty')) {
			showEmpty(i - rowLength, rowLength);
		}
		if (!plateElements[i - rowLength - 1].classList.contains('show-empty')) {
			showEmpty(i - rowLength - 1, rowLength);
		}
		if (!plateElements[i + rowLength - 1].classList.contains('show-empty')) {
			showEmpty(i + rowLength - 1, rowLength);
		}
		if (!plateElements[i + rowLength].classList.contains('show-empty')) {
			showEmpty(i + rowLength, rowLength);
		}
		if (!plateElements[i + rowLength + 1].classList.contains('show-empty')) {
			showEmpty(i + rowLength + 1, rowLength);
		}
	}
};

const checkIfGameFinished = () => {
	if (counterToFinishGame === 0) {
		startGame();
	}
	counterToFinishGame = 0;
	for (let i = 0; i < plateElements.length; i++) {
		if (plateElements[i].classList.contains('show-empty') || plateElements[i].classList.contains('show-number')) {
			counterToFinishGame++;
		} else if (
			plateElements[i].classList.contains('show-trigger') ||
			plateElements[i].classList.contains('wrong-bet')
		) {
			endGame();
		}
	}
	if (counterToFinishGame === plateElements.length - bombs.length) {
		statusFace.classList.add('status-face-succes');
		for (let i = 0; i < countFields(chosenLevel); i++) {
			if (bombs.includes(i)) {
				plateElements[i].classList.add('put-flag');
			}
		}
		endGame();
	}
};

const showEmpty = (i, rowLength) => {
	if (!plateElements[i].classList.contains('put-flag')) {
		if (boxes[i].bombsAround === 0) {
			plateElements[i].classList.add('show-empty');
			showEmptyForZeroBombs(i, rowLength);
		} else if (boxes[i].bombsAround === 1) {
			plateElements[i].classList.add('show-number');
			plateElements[i].classList.add('show-number-1');
		} else if (boxes[i].bombsAround === 2) {
			plateElements[i].classList.add('show-number');
			plateElements[i].classList.add('show-number-2');
		} else if (boxes[i].bombsAround === 3) {
			plateElements[i].classList.add('show-number');
			plateElements[i].classList.add('show-number-3');
		} else if (boxes[i].bombsAround === 4) {
			plateElements[i].classList.add('show-number');
			plateElements[i].classList.add('show-number-4');
		} else if (boxes[i].bombsAround === 5) {
			plateElements[i].classList.add('show-number');
			plateElements[i].classList.add('show-number-5');
		} else if (boxes[i].bombsAround === 6) {
			plateElements[i].classList.add('show-number');
			plateElements[i].classList.add('show-number-6');
		} else if (boxes[i].bombsAround === 7) {
			plateElements[i].classList.add('show-number');
			plateElements[i].classList.add('show-number-7');
		} else if (boxes[i].bombsAround === 8) {
			plateElements[i].classList.add('show-number');
			plateElements[i].classList.add('show-number-8');
		}
	}
	checkIfGameFinished();
};

const leftClickCheckField = e => {
	if (e.button === 0) {
		if (e.target.classList.contains('put-flag')) {
		} else if (boxes[e.target.id].bomb === false) {
			showEmpty(Number.parseFloat(e.target.id), chosenLevel[0]);
		} else if (boxes[e.target.id].bomb === true) {
			e.target.classList.add('show-trigger');
			statusFace.classList.add('status-face-lost');
			showAllFieldsWrongBet();
		}
		checkIfGameFinished();
	}
};

const checkFlagsAround = (i, rowLength) => {
	if (i === 0) {
		// top-left corner
		if (plateElements[i + 1].classList.contains('put-flag')) {
			flagsNumber++;
		}
		if (plateElements[i + rowLength].classList.contains('put-flag')) {
			flagsNumber++;
		}
		if (plateElements[i + rowLength + 1].classList.contains('put-flag')) {
			flagsNumber++;
		}
	} else if (i === rowLength - 1) {
		// top-right corner
		if (plateElements[i - 1].classList.contains('put-flag')) {
			flagsNumber++;
		}
		if (plateElements[i + rowLength].classList.contains('put-flag')) {
			flagsNumber++;
		}
		if (plateElements[i + rowLength - 1].classList.contains('put-flag')) {
			flagsNumber++;
		}
	} else if (i === countFields(chosenLevel) - rowLength) {
		// bottom-left corner
		if (plateElements[i + 1].classList.contains('put-flag')) {
			flagsNumber++;
		}
		if (plateElements[i - rowLength].classList.contains('put-flag')) {
			flagsNumber++;
		}
		if (plateElements[i - rowLength + 1].classList.contains('put-flag')) {
			flagsNumber++;
		}
	} else if (i === countFields(chosenLevel) - 1) {
		// bottom-right corner
		if (plateElements[i - 1].classList.contains('put-flag')) {
			flagsNumber++;
		}
		if (plateElements[i - rowLength].classList.contains('put-flag')) {
			flagsNumber++;
		}
		if (plateElements[i - rowLength - 1].classList.contains('put-flag')) {
			flagsNumber++;
		}
	} else if (i % rowLength === 0) {
		// all left side without corners
		if (plateElements[i - rowLength].classList.contains('put-flag')) {
			flagsNumber++;
		}
		if (plateElements[i - rowLength + 1].classList.contains('put-flag')) {
			flagsNumber++;
		}
		if (plateElements[i + 1].classList.contains('put-flag')) {
			flagsNumber++;
		}
		if (plateElements[i + rowLength].classList.contains('put-flag')) {
			flagsNumber++;
		}
		if (plateElements[i + rowLength + 1].classList.contains('put-flag')) {
			flagsNumber++;
		}
	} else if ((i + 1) % rowLength === 0) {
		// all right side without corners
		if (plateElements[i - rowLength].classList.contains('put-flag')) {
			flagsNumber++;
		}
		if (plateElements[i - rowLength - 1].classList.contains('put-flag')) {
			flagsNumber++;
		}
		if (plateElements[i - 1].classList.contains('put-flag')) {
			flagsNumber++;
		}
		if (plateElements[i + rowLength].classList.contains('put-flag')) {
			flagsNumber++;
		}
		if (plateElements[i + rowLength - 1].classList.contains('put-flag')) {
			flagsNumber++;
		}
	} else if (i - rowLength < 0) {
		// all top line without corners
		if (plateElements[i - 1].classList.contains('put-flag')) {
			flagsNumber++;
		}
		if (plateElements[i + 1].classList.contains('put-flag')) {
			flagsNumber++;
		}
		if (plateElements[i + rowLength + 1].classList.contains('put-flag')) {
			flagsNumber++;
		}
		if (plateElements[i + rowLength].classList.contains('put-flag')) {
			flagsNumber++;
		}
		if (plateElements[i + rowLength - 1].classList.contains('put-flag')) {
			flagsNumber++;
		}
	} else if (i > countFields(chosenLevel) - rowLength) {
		// all bottom line without corners
		if (plateElements[i - 1].classList.contains('put-flag')) {
			flagsNumber++;
		}
		if (plateElements[i + 1].classList.contains('put-flag')) {
			flagsNumber++;
		}
		if (plateElements[i - rowLength + 1].classList.contains('put-flag')) {
			flagsNumber++;
		}
		if (plateElements[i - rowLength].classList.contains('put-flag')) {
			flagsNumber++;
		}
		if (plateElements[i - rowLength - 1].classList.contains('put-flag')) {
			flagsNumber++;
		}
	} else {
		// rest fields away from edges
		if (plateElements[i - 1].classList.contains('put-flag')) {
			flagsNumber++;
		}
		if (plateElements[i + 1].classList.contains('put-flag')) {
			flagsNumber++;
		}
		if (plateElements[i - rowLength + 1].classList.contains('put-flag')) {
			flagsNumber++;
		}
		if (plateElements[i - rowLength].classList.contains('put-flag')) {
			flagsNumber++;
		}
		if (plateElements[i - rowLength - 1].classList.contains('put-flag')) {
			flagsNumber++;
		}
		if (plateElements[i + rowLength + 1].classList.contains('put-flag')) {
			flagsNumber++;
		}
		if (plateElements[i + rowLength].classList.contains('put-flag')) {
			flagsNumber++;
		}
		if (plateElements[i + rowLength - 1].classList.contains('put-flag')) {
			flagsNumber++;
		}
	}
};

const showFieldAfterDoubleClick = (j, k) => {
	if (bombs.includes(k)) {
		showEmptyForZeroBombs(j, chosenLevel[0]);
	} else {
		plateElements[k].classList.add('wrong-bet');
		// try to code something that makes nearest bomb trigger after wrong-bet and double click on number
		// plateElements[k].classList.add('show-trigger') - this work wrong
		statusFace.classList.add('status-face-lost');
		showAllFieldsWrongBet();
		checkIfGameFinished();
	}
};

const checkAfterDoubleClick = (e, rowLength) => {
	if (boxes[e.target.id].bombsAround === boxes[e.target.id].bombsIndexes.length) {
		let j = Number.parseFloat(e.target.id);
		if (j === 0) {
			// top-left corner
			if (plateElements[j + 1].classList.contains('put-flag')) {
				showFieldAfterDoubleClick(j, j + 1);
			}
			if (plateElements[j + 1 + rowLength].classList.contains('put-flag')) {
				showFieldAfterDoubleClick(j, j + 1 + rowLength);
			}
			if (plateElements[j + rowLength].classList.contains('put-flag')) {
				showFieldAfterDoubleClick(j, j + rowLength);
			}
		} else if (j === rowLength - 1) {
			// top-right corner
			if (plateElements[j - 1].classList.contains('put-flag')) {
				showFieldAfterDoubleClick(j, j - 1);
			}
			if (plateElements[j + rowLength].classList.contains('put-flag')) {
				showFieldAfterDoubleClick(j, j + rowLength);
			}
			if (plateElements[j + rowLength - 1].classList.contains('put-flag')) {
				showFieldAfterDoubleClick(j, j + rowLength - 1);
			}
		} else if (j === countFields(chosenLevel) - rowLength) {
			// bottom-left corner
			if (plateElements[j + 1].classList.contains('put-flag')) {
				showFieldAfterDoubleClick(j, j + 1);
			}
			if (plateElements[j - rowLength].classList.contains('put-flag')) {
				showFieldAfterDoubleClick(j, j - rowLength);
			}
			if (plateElements[j - rowLength + 1].classList.contains('put-flag')) {
				showFieldAfterDoubleClick(j, j - rowLength + 1);
			}
		} else if (j === countFields(chosenLevel) - 1) {
			// bottom-right corner
			if (plateElements[j - 1].classList.contains('put-flag')) {
				showFieldAfterDoubleClick(j, j - 1);
			}
			if (plateElements[j - rowLength].classList.contains('put-flag')) {
				showFieldAfterDoubleClick(j, j - rowLength);
			}
			if (plateElements[j - rowLength - 1].classList.contains('put-flag')) {
				showFieldAfterDoubleClick(j, j - rowLength - 1);
			}
		} else if (j % rowLength === 0) {
			// all left side without corners
			if (plateElements[j + 1].classList.contains('put-flag')) {
				showFieldAfterDoubleClick(j, j + 1);
			}
			if (plateElements[j - rowLength].classList.contains('put-flag')) {
				showFieldAfterDoubleClick(j, j - rowLength);
			}
			if (plateElements[j - rowLength + 1].classList.contains('put-flag')) {
				showFieldAfterDoubleClick(j, j - rowLength + 1);
			}
			if (plateElements[j + rowLength].classList.contains('put-flag')) {
				showFieldAfterDoubleClick(j, j + rowLength);
			}
			if (plateElements[j + rowLength + 1].classList.contains('put-flag')) {
				showFieldAfterDoubleClick(j, j + rowLength + 1);
			}
		} else if ((j + 1) % rowLength === 0) {
			// all right side without corners
			if (plateElements[j - 1].classList.contains('put-flag')) {
				showFieldAfterDoubleClick(j, j - 1);
			}
			if (plateElements[j - rowLength].classList.contains('put-flag')) {
				showFieldAfterDoubleClick(j, j - rowLength);
			}
			if (plateElements[j + rowLength - 1].classList.contains('put-flag')) {
				showFieldAfterDoubleClick(j, j + rowLength - 1);
			}
			if (plateElements[j + rowLength].classList.contains('put-flag')) {
				showFieldAfterDoubleClick(j, j + rowLength);
			}
			if (plateElements[j - rowLength - 1].classList.contains('put-flag')) {
				showFieldAfterDoubleClick(j, j - rowLength - 1);
			}
		} else if (j - rowLength < 0) {
			// all top line without corners
			if (plateElements[j - 1].classList.contains('put-flag')) {
				showFieldAfterDoubleClick(j, j - 1);
			}
			if (plateElements[j + 1].classList.contains('put-flag')) {
				showFieldAfterDoubleClick(j, j + 1);
			}
			if (plateElements[j + rowLength - 1].classList.contains('put-flag')) {
				showFieldAfterDoubleClick(j, j + rowLength - 1);
			}
			if (plateElements[j + rowLength].classList.contains('put-flag')) {
				showFieldAfterDoubleClick(j, j + rowLength);
			}
			if (plateElements[j + rowLength + 1].classList.contains('put-flag')) {
				showFieldAfterDoubleClick(j, j + rowLength + 1);
			}
		} else if (j > countFields(chosenLevel) - rowLength) {
			// all bottom line without corners
			if (plateElements[j - 1].classList.contains('put-flag')) {
				showFieldAfterDoubleClick(j, j - 1);
			}
			if (plateElements[j + 1].classList.contains('put-flag')) {
				showFieldAfterDoubleClick(j, j + 1);
			}
			if (plateElements[j - rowLength - 1].classList.contains('put-flag')) {
				showFieldAfterDoubleClick(j, j - rowLength - 1);
			}
			if (plateElements[j - rowLength + 1].classList.contains('put-flag')) {
				showFieldAfterDoubleClick(j, j - rowLength + 1);
			}
			if (plateElements[j - rowLength].classList.contains('put-flag')) {
				showFieldAfterDoubleClick(j, j - rowLength);
			}
		} else {
			// rest fields away from edges
			if (plateElements[j - 1].classList.contains('put-flag')) {
				showFieldAfterDoubleClick(j, j - 1);
			}
			if (plateElements[j + 1].classList.contains('put-flag')) {
				showFieldAfterDoubleClick(j, j + 1);
			}
			if (plateElements[j - rowLength + 1].classList.contains('put-flag')) {
				showFieldAfterDoubleClick(j, j - rowLength + 1);
			}
			if (plateElements[j - rowLength].classList.contains('put-flag')) {
				showFieldAfterDoubleClick(j, j - rowLength);
			}
			if (plateElements[j - rowLength - 1].classList.contains('put-flag')) {
				showFieldAfterDoubleClick(j, j - rowLength - 1);
			}
			if (plateElements[j + rowLength + 1].classList.contains('put-flag')) {
				showFieldAfterDoubleClick(j, j + rowLength + 1);
			}
			if (plateElements[j + rowLength].classList.contains('put-flag')) {
				showFieldAfterDoubleClick(j, j + rowLength);
			}
			if (plateElements[j + rowLength - 1].classList.contains('put-flag')) {
				showFieldAfterDoubleClick(j, j + rowLength - 1);
			}
		}
	}
};

const doubleClick = e => {
	let k = Number.parseFloat(e.target.id);
	if (e.target.classList.contains('show-number')) {
		flagsNumber = 0;
		checkFlagsAround(Number.parseFloat(e.target.id), chosenLevel[0]);

		if (e.target.classList.contains('show-number-1') && flagsNumber === 1) {
			checkAfterDoubleClick(e, chosenLevel[0]);
		} else if (e.target.classList.contains('show-number-2') && flagsNumber === 2) {
			checkAfterDoubleClick(e, chosenLevel[0]);
		} else if (e.target.classList.contains('show-number-3') && flagsNumber === 3) {
			checkAfterDoubleClick(e, chosenLevel[0]);
		} else if (e.target.classList.contains('show-number-4') && flagsNumber === 4) {
			checkAfterDoubleClick(e, chosenLevel[0]);
		} else if (e.target.classList.contains('show-number-5') && flagsNumber === 5) {
			checkAfterDoubleClick(e, chosenLevel[0]);
		} else if (e.target.classList.contains('show-number-6') && flagsNumber === 6) {
			checkAfterDoubleClick(e, chosenLevel[0]);
		} else if (e.target.classList.contains('show-number-7') && flagsNumber === 7) {
			checkAfterDoubleClick(e, chosenLevel[0]);
		} else if (e.target.classList.contains('show-number-8') && flagsNumber === 8) {
			checkAfterDoubleClick(e, chosenLevel[0]);
		}
	}
};

const uncertainFace = e => {
	if (e.button === 0) {
		statusFace.classList.add('status-face-wow');
	}
};

const neutralFace = e => {
	if (e.button === 0) {
		statusFace.classList.remove('status-face-wow');
	}
};

const endGame = () => {
	clearInterval(timer);
	pauseTime();
};

const startGame = () => {
	clearInterval(timer);
	timer = setInterval(() => {
		if (seconds < 9) {
			seconds++;
			counterTime.innerHTML = `00${seconds}`;
		} else if (seconds < 99) {
			seconds++;
			counterTime.innerHTML = `0${seconds}`;
		} else if (seconds < 1000) {
			seconds++;
			counterTime.innerHTML = `${seconds}`;
		}
	}, 1000);
};

const noRightClickMenu = e => {
	e.preventDefault();
};

//  Listeners

navItemsGame.forEach(item => item.addEventListener('click', chooseLevel));
navItemsOptions.forEach(item => item.addEventListener('click', changeTheme));
document.addEventListener('click', menuAction);
document.addEventListener('contextmenu', countMines);
statusFace.addEventListener('click', newGame);
const playTime = () => {
	gamePlate.addEventListener('contextmenu', putFlag);
	gamePlate.addEventListener('click', leftClickCheckField);
	gamePlate.addEventListener('mouseup', leftClickCheckField);
	gamePlate.addEventListener('dblclick', doubleClick);
	gamePlate.addEventListener('contextmenu', doubleClick);
	gamePlate.addEventListener('mousedown', uncertainFace);
	gamePlate.addEventListener('mouseup', neutralFace);
};
const pauseTime = () => {
	gamePlate.removeEventListener('contextmenu', putFlag);
	gamePlate.removeEventListener('click', leftClickCheckField);
	gamePlate.removeEventListener('mouseup', leftClickCheckField);
	gamePlate.removeEventListener('dblclick', doubleClick);
	gamePlate.removeEventListener('contextmenu', doubleClick);
	gamePlate.removeEventListener('mousedown', uncertainFace);
	gamePlate.removeEventListener('mouseup', neutralFace);
	gamePlate.addEventListener('contextmenu', noRightClickMenu);
};
newGame();
