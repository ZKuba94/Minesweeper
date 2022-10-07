const gamePlate = document.querySelector('.game-box__plate');
const navBar = document.querySelector('.navbar');
const gameList = document.querySelector('.navbar__list-game');
const navItems = gameList.querySelectorAll('.navbar__list__item');
const counterMines = document.querySelector('.counter-mines');

const plateElements = gamePlate.getElementsByClassName('game-box__plate__element');

const begginer = [8, 8, 10];
const intermediate = [16, 16, 40];
const expert = [31, 16, 99];

let bombsNumber = 0;
let bombs = [];
let boxes = [];
let chosenLevel = begginer;

const countBoxes = chosenLevel => {
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
	constructor(id, bomb, bombsAround) {
		this.id = id;
		this.bomb = bomb;
		this.bombsAround = bombsAround;
	}
}

const createGamePlate = boxesAmount => {
	for (let i = 0; i < boxesAmount; i++) {
		checkBombAround(i, chosenLevel[0]);
		boxes[i] = new GamePlate(i, false, bombsNumber);
		bombsNumber = 0;
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
	bombs = [];
	boxes = [];
};

const newGame = () => {
	clearPlate();
	counterMines.innerHTML = `0${chosenLevel[2]}`;
	shuffle(countBoxes(chosenLevel), chosenLevel[2]);
	createGamePlate(countBoxes(chosenLevel));
	plantBombs();
	drawGamePlate(countBoxes(chosenLevel));
};

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

const putFlag = e => {
	e.preventDefault();
	e.target.classList.toggle('put-flag');
};

const showAll = () => {
	const plateElements = gamePlate.getElementsByClassName('game-box__plate__element');

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

const checkBombAround = (i, rowLength) => {
	// let id = Number.parseFloat(e.target.id);
	// const plateElements = gamePlate.getElementsByClassName('game-box__plate__element');

	if (i === 0) {
		// top-left corner check
		if (bombs.includes(i + 1)) {
			bombsNumber++;
		}
		if (bombs.includes(i + rowLength)) {
			bombsNumber++;
		}
		if (bombs.includes(i + (rowLength + 1))) {
			bombsNumber++;
		}
	} else if (i === rowLength - 1) {
		// top-right corner check
		if (bombs.includes(i - 1)) {
			bombsNumber++;
		}
		if (bombs.includes(i + rowLength)) {
			bombsNumber++;
		}
		if (bombs.includes(i + (rowLength - 1))) {
			bombsNumber++;
		}
	} else if (i === rowLength * rowLength - rowLength) {
		// bottom-left corner check
		if (bombs.includes(i + 1)) {
			bombsNumber++;
		}
		if (bombs.includes(i - rowLength)) {
			bombsNumber++;
		}
		if (bombs.includes(i - (rowLength - 1))) {
			bombsNumber++;
		}
	} else if (i === rowLength * rowLength - 1) {
		// bottom-right corner check
		if (bombs.includes(i - 1)) {
			bombsNumber++;
		}
		if (bombs.includes(i - rowLength)) {
			bombsNumber++;
		}
		if (bombs.includes(i - (rowLength + 1))) {
			bombsNumber++;
		}
	} else if (i % rowLength === 0) {
		// side left check
		if (bombs.includes(i - rowLength)) {
			bombsNumber++;
		}
		if (bombs.includes(i - rowLength + 1)) {
			bombsNumber++;
		}
		if (bombs.includes(i + 1)) {
			bombsNumber++;
		}
		if (bombs.includes(i + rowLength)) {
			bombsNumber++;
		}
		if (bombs.includes(i + rowLength + 1)) {
			bombsNumber++;
		}
	} else if ((i + 1) % rowLength === 0) {
		// side right check
		if (bombs.includes(i - rowLength)) {
			bombsNumber++;
		}
		if (bombs.includes(i - rowLength - 1)) {
			bombsNumber++;
		}
		if (bombs.includes(i - 1)) {
			bombsNumber++;
		}
		if (bombs.includes(i + rowLength)) {
			bombsNumber++;
		}
		if (bombs.includes(i + rowLength - 1)) {
			bombsNumber++;
		}
	} else if (i - rowLength < 0) {
		// side top check
		if (bombs.includes(i - 1)) {
			bombsNumber++;
		}
		if (bombs.includes(i + 1)) {
			bombsNumber++;
		}
		if (bombs.includes(i + rowLength + 1)) {
			bombsNumber++;
		}
		if (bombs.includes(i + rowLength)) {
			bombsNumber++;
		}
		if (bombs.includes(i + rowLength - 1)) {
			bombsNumber++;
		}
	} else if (i > rowLength * rowLength - rowLength) {
		// side bottom check
		if (bombs.includes(i - 1)) {
			bombsNumber++;
		}
		if (bombs.includes(i + 1)) {
			bombsNumber++;
		}
		if (bombs.includes(i - rowLength + 1)) {
			bombsNumber++;
		}
		if (bombs.includes(i - rowLength)) {
			bombsNumber++;
		}
		if (bombs.includes(i - rowLength - 1)) {
			bombsNumber++;
		}
	} else {
		// the rest of boxes
		if (bombs.includes(i - 1)) {
			bombsNumber++;
		}
		if (bombs.includes(i + 1)) {
			bombsNumber++;
		}
		if (bombs.includes(i - rowLength + 1)) {
			bombsNumber++;
		}
		if (bombs.includes(i - rowLength)) {
			bombsNumber++;
		}
		if (bombs.includes(i - rowLength - 1)) {
			bombsNumber++;
		}
		if (bombs.includes(i + rowLength + 1)) {
			bombsNumber++;
		}
		if (bombs.includes(i + rowLength)) {
			bombsNumber++;
		}
		if (bombs.includes(i + rowLength - 1)) {
			bombsNumber++;
		}
		// if (bombsNumber === 0) {
		// 	plateElements[id].classList.add(`show-number`);
		// 	plateElements[id - 1].classList.add(`show-number`);
		// 	plateElements[id + 1].classList.add(`show-number`);
		// 	plateElements[id - rowLength + 1].classList.add(`show-number`);
		// 	plateElements[id - rowLength].classList.add(`show-number`);
		// 	plateElements[id - rowLength - 1].classList.add(`show-number`);
		// 	plateElements[id + rowLength + 1].classList.add(`show-number`);
		// 	plateElements[id + rowLength].classList.add(`show-number`);
		// 	plateElements[id + rowLength - 1].classList.add(`show-number`);
		// }
	}
};

const showEmptyForZeroBombs = (i, rowLength) => {
	console.log(i);
	if (i === 0) {
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
		if (!plateElements[i - 1].classList.contains('show-empty')) {
			showEmpty(i - 1, rowLength);
		}
		if (!plateElements[i - 1 + rowLength].classList.contains('show-empty')) {
			showEmpty(i - 1 + rowLength, rowLength);
		}
		if (!plateElements[i + rowLength].classList.contains('show-empty')) {
			showEmpty(i + rowLength, rowLength);
		}
	} else if (i === rowLength * rowLength - rowLength) {
		if (!plateElements[i + 1].classList.contains('show-empty')) {
			showEmpty(i + 1, rowLength);
		}
		if (!plateElements[i - rowLength].classList.contains('show-empty')) {
			showEmpty(i - rowLength, rowLength);
		}
		if (!plateElements[i - 1 - rowLength].classList.contains('show-empty')) {
			showEmpty(i - 1 - rowLength, rowLength);
		}
	} else if (i === rowLength * rowLength - 1) {
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
	} else if (i > rowLength * rowLength - rowLength) {
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

const showEmpty = (e, rowLength) => {
	// e.target.classList.add('show-empty');
	// checkBombAround(e, chosenLevel[0]);
	let i = Number.parseFloat(e);
	if (boxes[i].bombsAround === 0) {
		plateElements[i].classList.add('show-empty');
		// checkBombAround(e, chosenLevel[0]);
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
	return;
};

const leftClick = e => {
	if (e.target.classList.contains('put-flag')) {
		e.preventDefault();
	} else if (boxes[e.target.id].bomb === false) {
		showEmpty(e.target.id, chosenLevel[0]);
	} else if (boxes[e.target.id].bomb === true) {
		e.target.classList.add('show-trigger');
		showAll();
	}
};

//  Listeners
navBar.addEventListener('click', unfoldMenu);
navItems.forEach(item => item.addEventListener('click', chooseLevel));
gamePlate.addEventListener('contextmenu', putFlag);
gamePlate.addEventListener('click', leftClick);

newGame();
