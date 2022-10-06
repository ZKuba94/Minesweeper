const gamePlate = document.querySelector('.game-box__plate');
const navBar = document.querySelector('.navbar');
const gameList = document.querySelector('.navbar__list-game');
const navItems = gameList.querySelectorAll('.navbar__list__item');
const counterMines = document.querySelector('.counter-mines');

const begginer = [8, 8, 10];
const intermediate = [16, 16, 40];
const expert = [31, 16, 99];

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
	constructor(id, bomb) {
		this.id = id;
		this.bomb = bomb;
	}
}

const createGamePlate = boxesAmount => {
	for (let i = 0; i < boxesAmount; i++) {
		boxes[i] = new GamePlate(i, false);
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

let bombsNumber = 0;

const checkBombAround = (e, rowLength) => {
	let id = Number.parseFloat(e.target.id);
	if (id === 0) {
		// top-left corner check
		if (bombs.includes(id + 1)) {
			bombsNumber++;
		}
		if (bombs.includes(id + rowLength)) {
			bombsNumber++;
		}
		if (bombs.includes(id + (rowLength + 1))) {
			bombsNumber++;
		}
	} else if (id === rowLength - 1) {
		// top-right corner check
		if (bombs.includes(id - 1)) {
			bombsNumber++;
		}
		if (bombs.includes(id + rowLength)) {
			bombsNumber++;
		}
		if (bombs.includes(id + (rowLength - 1))) {
			bombsNumber++;
		}
	} else if (id === rowLength * rowLength - rowLength) {
		// bottom-left corner check
		if (bombs.includes(id + 1)) {
			bombsNumber++;
		}
		if (bombs.includes(id - rowLength)) {
			bombsNumber++;
		}
		if (bombs.includes(id - (rowLength - 1))) {
			bombsNumber++;
		}
	} else if (id === rowLength * rowLength - 1) {
		// bottom-right corner check
		if (bombs.includes(id - 1)) {
			bombsNumber++;
		}
		if (bombs.includes(id - rowLength)) {
			bombsNumber++;
		}
		if (bombs.includes(id - (rowLength + 1))) {
			bombsNumber++;
		}
	} else if (id % rowLength === 0) {
		// side left check
		if (bombs.includes(id - rowLength)) {
			bombsNumber++;
		}
		if (bombs.includes(id - rowLength + 1)) {
			bombsNumber++;
		}
		if (bombs.includes(id + 1)) {
			bombsNumber++;
		}
		if (bombs.includes(id + rowLength)) {
			bombsNumber++;
		}
		if (bombs.includes(id + rowLength + 1)) {
			bombsNumber++;
		}
	} else if ((id + 1) % rowLength === 0) {
		// side right check
		if (bombs.includes(id - rowLength)) {
			bombsNumber++;
		}
		if (bombs.includes(id - rowLength - 1)) {
			bombsNumber++;
		}
		if (bombs.includes(id - 1)) {
			bombsNumber++;
		}
		if (bombs.includes(id + rowLength)) {
			bombsNumber++;
		}
		if (bombs.includes(id + rowLength - 1)) {
			bombsNumber++;
		}
	} else if (id - rowLength < 0) {
		// side top check
		if (bombs.includes(id - 1)) {
			bombsNumber++;
		}
		if (bombs.includes(id + 1)) {
			bombsNumber++;
		}
		if (bombs.includes(id + rowLength + 1)) {
			bombsNumber++;
		}
		if (bombs.includes(id + rowLength)) {
			bombsNumber++;
		}
		if (bombs.includes(id + rowLength - 1)) {
			bombsNumber++;
		}
		console.log('pokaz mnie to');
	} else if (id > rowLength * rowLength - rowLength) {
		// side bottom check
		if (bombs.includes(id - 1)) {
			bombsNumber++;
		}
		if (bombs.includes(id + 1)) {
			bombsNumber++;
		}
		if (bombs.includes(id - rowLength + 1)) {
			bombsNumber++;
		}
		if (bombs.includes(id - rowLength)) {
			bombsNumber++;
		}
		if (bombs.includes(id - rowLength - 1)) {
			bombsNumber++;
		}
	} else {
		// the rest of boxes
		if (bombs.includes(id - 1)) {
			bombsNumber++;
		}
		if (bombs.includes(id + 1)) {
			bombsNumber++;
		}
		if (bombs.includes(id - rowLength + 1)) {
			bombsNumber++;
		}
		if (bombs.includes(id - rowLength)) {
			bombsNumber++;
		}
		if (bombs.includes(id - rowLength - 1)) {
			bombsNumber++;
		}
		if (bombs.includes(id + rowLength + 1)) {
			bombsNumber++;
		}
		if (bombs.includes(id + rowLength)) {
			bombsNumber++;
		}
		if (bombs.includes(id + rowLength - 1)) {
			bombsNumber++;
		}
	}

	e.target.innerHTML = bombsNumber;
	bombsNumber = 0;
};

const showEmpty = e => {
	e.target.classList.add('show-empty');
	checkBombAround(e, chosenLevel[0]);
};

const leftClick = e => {
	if (e.target.classList.contains('put-flag')) {
		e.preventDefault();
	} else if (boxes[e.target.id].bomb === false) {
		showEmpty(e);
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
