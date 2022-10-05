const gamePlate = document.querySelector('.game-box__plate');
const navBar = document.querySelector('.navbar');
const gameList = document.querySelector('.navbar__list-game');
const navItems = gameList.querySelectorAll('.navbar__list__item');

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
	console.log(boxes);
};

const drawGamePlate = boxesAmount => {
	for (let i = 0; i < boxesAmount; i++) {
		const emptyBox = document.createElement('div');
		emptyBox.setAttribute('id', i);
		gamePlate.append(emptyBox);
		emptyBox.classList.add('game-box__plate__element');
	}
	// tu moze forEachemptyBox
};

const chooseLevel = e => {
	if (e.target.classList.contains('begginer')) {
		chosenLevel = begginer;
		gamePlate.classList.remove('plate-intermediate');
		gamePlate.classList.remove('plate-expert');
		gamePlate.classList.add('plate-begginer');
		let bombs = [];
		let boxes = [];
	} else if (e.target.classList.contains('intermediate')) {
		chosenLevel = intermediate;
		gamePlate.classList.remove('plate-begginer');
		gamePlate.classList.remove('plate-expert');
		gamePlate.classList.add('plate-intermediate');
		let bombs = [];
		let boxes = [];
	} else if (e.target.classList.contains('expert')) {
		chosenLevel = expert;
		gamePlate.classList.remove('plate-begginer');
		gamePlate.classList.remove('plate-intermediate');
		gamePlate.classList.add('plate-expert');
		let bombs = [];
		let boxes = [];
	}
	navItems.forEach(item => item.classList.toggle('navbar__list-game__item'));
	shuffle(countBoxes(chosenLevel), chosenLevel[2]);
	createGamePlate(countBoxes(chosenLevel));
	plantBombs();
	drawGamePlate(countBoxes(chosenLevel));
};

const unfoldMenu = e => {
	if (e.target.classList.contains('navbar__list-game')) {
		navItems.forEach(item => item.classList.toggle('navbar__list-game__item'));
	}
};

//  Listeners
navBar.addEventListener('click', unfoldMenu);
navItems.forEach(item => item.addEventListener('click', chooseLevel));

// Functions to draw first plate
shuffle(countBoxes(chosenLevel), chosenLevel[2]);
createGamePlate(countBoxes(chosenLevel));
plantBombs();
drawGamePlate(countBoxes(chosenLevel));
