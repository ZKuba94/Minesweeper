const gamePlate = document.querySelector('.game-box__plate');
const navBar = document.querySelector('.navbar');
const gameList = document.querySelector('.navbar__list-game');
const navItems = gameList.querySelectorAll('.navbar__list__item');
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

let bombsNumber = 0;
let flagsNumber = 0;
let flagsCounter = 0;
// let timeInitializer = 0;
// let count;
// let seconds = 0;

let chosenLevel = begginer;

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
	// timeInitializer = 0;
	// seconds = 0;
	bombs = [];
	boxes = [];
	statusFace.classList.add('status-face-ok');
	statusFace.classList.remove('status-face-lost');
	statusFace.classList.remove('status-face-succes');
};
// Navigation things, option, new game, select level...
const chooseLevel = e => {
	clearPlate();
	if (e.target.classList.contains('begginer')) {
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
	navItems.forEach(item => item.classList.toggle('navbar__list-game__item'));

	newGame();
};

const unfoldMenu = e => {
	if (e.target.classList.contains('navbar__list-game')) {
		navItems.forEach(item => item.classList.toggle('navbar__list-game__item'));
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
	countMines();
	clearPlate();
	shuffle(countFields(chosenLevel), chosenLevel[2]);
	createGamePlate(countFields(chosenLevel));
	plantBombs();
	drawGamePlate(countFields(chosenLevel));
};

const showAllFields = () => {
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
};

const leftClickCheckField = e => {
	if (e.button === 0) {
		if (e.target.classList.contains('put-flag')) {
			e.preventDefault();
		} else if (boxes[e.target.id].bomb === false) {
			showEmpty(Number.parseFloat(e.target.id), chosenLevel[0]);
		} else if (boxes[e.target.id].bomb === true) {
			e.target.classList.add('show-trigger');
			statusFace.classList.add('status-face-lost');
			showAllFields();
			// endGame();
		}
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

const checkFlagAfterDoubleClick = (j, k) => {
	if (bombs.includes(k)) {
		showEmptyForZeroBombs(j, chosenLevel[0]);
	} else {
		plateElements[k].classList.add('showtrigger');
		statusFace.classList.add('status-face-lost');
		showAllFields();
	}
};

const showAfterDoubleClick = (e, rowLength) => {
	if (boxes[e.target.id].bombsAround === boxes[e.target.id].bombsIndexes.length) {
		let j = Number.parseFloat(e.target.id);
		if (j === 0) {
			// top-left corner
			if (plateElements[j + 1].classList.contains('put-flag')) {
				checkFlagAfterDoubleClick(j, j + 1);
			}
			if (plateElements[j + 1 + rowLength].classList.contains('put-flag')) {
				checkFlagAfterDoubleClick(j, j + 1 + rowLength);
			}

			if (plateElements[j + rowLength].classList.contains('put-flag')) {
				checkFlagAfterDoubleClick(j, j + rowLength);
			}
		} else if (j === rowLength - 1) {
			// top-right corner
			if (plateElements[j - 1].classList.contains('put-flag')) {
				checkFlagAfterDoubleClick(j, j - 1);
			}
			if (plateElements[j + rowLength].classList.contains('put-flag')) {
				checkFlagAfterDoubleClick(j, j + rowLength);
			}

			if (plateElements[j + rowLength - 1].classList.contains('put-flag')) {
				checkFlagAfterDoubleClick(j, j + rowLength - 1);
			}
		} else if (j === countFields(chosenLevel) - rowLength) {
			// bottom-left corner
			if (plateElements[j + 1].classList.contains('put-flag')) {
				checkFlagAfterDoubleClick(j, j + 1);
			}
			if (plateElements[j - rowLength].classList.contains('put-flag')) {
				checkFlagAfterDoubleClick(j, j - rowLength);
			}

			if (plateElements[j - rowLength + 1].classList.contains('put-flag')) {
				checkFlagAfterDoubleClick(j, j - rowLength + 1);
			}
		} else if (j === countFields(chosenLevel) - 1) {
			// bottom-right corner
			if (plateElements[j - 1].classList.contains('put-flag')) {
				checkFlagAfterDoubleClick(j, j - 1);
			}
			if (plateElements[j - rowLength].classList.contains('put-flag')) {
				checkFlagAfterDoubleClick(j, j - rowLength);
			}

			if (plateElements[j - rowLength - 1].classList.contains('put-flag')) {
				checkFlagAfterDoubleClick(j, j - rowLength - 1);
			}
		} else if (j % rowLength === 0) {
			// all left side without corners
			if (plateElements[j + 1].classList.contains('put-flag')) {
				checkFlagAfterDoubleClick(j, j + 1);
			}
			if (plateElements[j - rowLength].classList.contains('put-flag')) {
				checkFlagAfterDoubleClick(j, j - rowLength);
			}
			if (plateElements[j - rowLength + 1].classList.contains('put-flag')) {
				checkFlagAfterDoubleClick(j, j - rowLength + 1);
			}
			if (plateElements[j + rowLength].classList.contains('put-flag')) {
				checkFlagAfterDoubleClick(j, j + rowLength);
			}
			if (plateElements[j + rowLength + 1].classList.contains('put-flag')) {
				checkFlagAfterDoubleClick(j, j + rowLength + 1);
			}
		} else if ((j + 1) % rowLength === 0) {
			// all right side without corners
			if (plateElements[j - 1].classList.contains('put-flag')) {
				checkFlagAfterDoubleClick(j, j - 1);
			}
			if (plateElements[j - rowLength].classList.contains('put-flag')) {
				checkFlagAfterDoubleClick(j, j - rowLength);
			}
			if (plateElements[j + rowLength - 1].classList.contains('put-flag')) {
				checkFlagAfterDoubleClick(j, j + rowLength - 1);
			}
			if (plateElements[j + rowLength].classList.contains('put-flag')) {
				checkFlagAfterDoubleClick(j, j + rowLength);
			}
			if (plateElements[j - rowLength - 1].classList.contains('put-flag')) {
				checkFlagAfterDoubleClick(j, j - rowLength - 1);
			}
		} else if (j - rowLength < 0) {
			// all top line without corners
			if (plateElements[j - 1].classList.contains('put-flag')) {
				checkFlagAfterDoubleClick(j, j - 1);
			}
			if (plateElements[j + 1].classList.contains('put-flag')) {
				checkFlagAfterDoubleClick(j, j + 1);
			}
			if (plateElements[j + rowLength - 1].classList.contains('put-flag')) {
				checkFlagAfterDoubleClick(j, j + rowLength - 1);
			}
			if (plateElements[j + rowLength].classList.contains('put-flag')) {
				checkFlagAfterDoubleClick(j, j + rowLength);
			}
			if (plateElements[j + rowLength + 1].classList.contains('put-flag')) {
				checkFlagAfterDoubleClick(j, j + rowLength + 1);
			}
		} else if (j > countFields(chosenLevel) - rowLength) {
			// all bottom line without corners
			if (plateElements[j - 1].classList.contains('put-flag')) {
				checkFlagAfterDoubleClick(j, j - 1);
			}
			if (plateElements[j + 1].classList.contains('put-flag')) {
				checkFlagAfterDoubleClick(j, j + 1);
			}
			if (plateElements[j - rowLength - 1].classList.contains('put-flag')) {
				checkFlagAfterDoubleClick(j, j - rowLength - 1);
			}
			if (plateElements[j - rowLength + 1].classList.contains('put-flag')) {
				checkFlagAfterDoubleClick(j, j - rowLength + 1);
			}
			if (plateElements[j - rowLength].classList.contains('put-flag')) {
				checkFlagAfterDoubleClick(j, j - rowLength);
			}
		} else {
			// rest fields away from edges
			if (plateElements[j - 1].classList.contains('put-flag')) {
				checkFlagAfterDoubleClick(j, j - 1);
			}
			if (plateElements[j + 1].classList.contains('put-flag')) {
				checkFlagAfterDoubleClick(j, j + 1);
			}
			if (plateElements[j - rowLength + 1].classList.contains('put-flag')) {
				checkFlagAfterDoubleClick(j, j - rowLength + 1);
			}
			if (plateElements[j - rowLength].classList.contains('put-flag')) {
				checkFlagAfterDoubleClick(j, j - rowLength);
			}
			if (plateElements[j - rowLength - 1].classList.contains('put-flag')) {
				checkFlagAfterDoubleClick(j, j - rowLength - 1);
			}
			if (plateElements[j + rowLength + 1].classList.contains('put-flag')) {
				checkFlagAfterDoubleClick(j, j + rowLength + 1);
			}
			if (plateElements[j + rowLength].classList.contains('put-flag')) {
				checkFlagAfterDoubleClick(j, j + rowLength);
			}
			if (plateElements[j + rowLength - 1].classList.contains('put-flag')) {
				checkFlagAfterDoubleClick(j, j + rowLength - 1);
			}
		}
	}
};

const doubleClick = e => {
	let k = Number.parseFloat(e.target.id);
	e.preventDefault();
	if (e.target.classList.contains('show-number')) {
		flagsNumber = 0;
		checkFlagsAround(Number.parseFloat(e.target.id), chosenLevel[0]);

		if (e.target.classList.contains('show-number-1') && flagsNumber === 1) {
			showAfterDoubleClick(e, chosenLevel[0]);
		} else if (e.target.classList.contains('show-number-2') && flagsNumber === 2) {
			showAfterDoubleClick(e, chosenLevel[0]);
		} else if (e.target.classList.contains('show-number-3') && flagsNumber === 3) {
			showAfterDoubleClick(e, chosenLevel[0]);
		} else if (e.target.classList.contains('show-number-4') && flagsNumber === 4) {
			showAfterDoubleClick(e, chosenLevel[0]);
		} else if (e.target.classList.contains('show-number-5') && flagsNumber === 5) {
			showAfterDoubleClick(e, chosenLevel[0]);
		} else if (e.target.classList.contains('show-number-6') && flagsNumber === 6) {
			showAfterDoubleClick(e, chosenLevel[0]);
		} else if (e.target.classList.contains('show-number-7') && flagsNumber === 7) {
			showAfterDoubleClick(e, chosenLevel[0]);
		} else if (e.target.classList.contains('show-number-8') && flagsNumber === 8) {
			showAfterDoubleClick(e, chosenLevel[0]);
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

// const clockCounter = e => {
// 	if (
// 		e.target.classList.contains('show-empty') ||
// 		(e.target.classList.contains('show-number') && timeInitializer === 0)
// 	) {
// 		timeInitializer++;
// 		clearInterval(count);
// 		count = setInterval(() => {
// 			if (seconds < 9) {
// 				seconds++;
// 				counterTime.innerHTML = `00${seconds}`;
// 			} else if (seconds < 100) {
// 				seconds++;
// 				counterTime.innerHTML = `0${seconds}`;
// 			} else if (seconds < 1000) {
// 				seconds++;
// 				counterTime.innerHTML = `${seconds}`;
// 			}
// 		}, 1000);
// 	}
// 	// try it until there will be no fields to open and the same amount flag as bombs
// };

//  Listeners
navBar.addEventListener('click', unfoldMenu);
navItems.forEach(item => item.addEventListener('click', chooseLevel));
document.addEventListener('contextmenu', countMines);
gamePlate.addEventListener('contextmenu', putFlag);
gamePlate.addEventListener('click', leftClickCheckField);
gamePlate.addEventListener('mouseup', leftClickCheckField);
gamePlate.addEventListener('dblclick', doubleClick);
gamePlate.addEventListener('contextmenu', doubleClick);

statusFace.addEventListener('click', newGame);
gamePlate.addEventListener('mousedown', uncertainFace);
gamePlate.addEventListener('mouseup', neutralFace);
// gamePlate.addEventListener('click', clockCounter);

newGame();
