//*****VARIABLES*****//
const width = 7;
const height = 6;
const board = [];
let currPlayer = 'player1'; // active player: 1 or 2

//*****METHODS FOR START*****//

const makeBoard = () => {
	for (let j = 0; j < height; j++) {
		board.push(new Array());
		for (let i = 0; i < width; i++) {
			board[j].push(new Array());
		}
	}
	return board;
};

const makeHtmlBoard = () => {
	const htmlBoard = document.querySelector('#board');

	//create a top row where user clicks to drop piece
	const top = document.createElement('tr');
	top.setAttribute('id', 'column-top');

	//add listener so when clicked, run function handleClick
	top.addEventListener('click', handleClick);

	// for 1-7 (width), create a cell setting ID to the column number - this is the header row
	for (let x = 0; x < width; x++) {
		const headCell = document.createElement('td');
		headCell.setAttribute('id', x);
		top.append(headCell);
	}
	htmlBoard.append(top);

	//for 1-6 (height), create 6 rows of 7 cells with ID 1-1 (col 1, row 1), etc.
	for (let y = 0; y < height; y++) {
		const row = document.createElement('tr');
		for (let x = 0; x < width; x++) {
			const cell = document.createElement('td');
			cell.setAttribute('id', `${y}-${x}`);
			row.append(cell);
		}
		htmlBoard.append(row);
	}
};

makeBoard();
makeHtmlBoard();

//*****METHODS FOR PLAY*****//

function handleClick(evt) {
	// get x from ID of clicked cell
	let x = +evt.target.id;

	// get next spot in column (if none (undefined), ignore click)
	let y = findSpotForCol(x);
	if (y === undefined) {
		return false; //end click event here;
	}
	placeInTable(y, x);
	board[y][x] = currPlayer;

	// check for win
	if (checkForWin()) {
		return endGame(`Player ${currPlayer} won!`);
	}

	// check for tie
	if (checkTie()) {
		return endGame('Player 1 and Player 2 Tied');
	}

	// switch players
	switchPlayer();
}
const placeInTable = (y, x) => {
	// make a div and insert into correct table cell
	let gameCell = document.getElementById(`${y}-${x}`);
	const gamePiece = document.createElement('div');
	gamePiece.setAttribute('class', 'piece');
	//need to set current player class here
	gamePiece.classList.add(currPlayer);
	gameCell.appendChild(gamePiece);
	//this places the piece into the appropriate column
};

function findSpotForCol(x) {
	//check to see if lowest is full (# should be equal to height at lowest), then check height -1, height -2, until top (height = 0 is top row
	for (let i = height - 1; i >= 0; i--) {
		if (document.getElementById(`${i}-${x}`).childElementCount === 0) {
			return i;
		}
	}
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */
function checkForWin() {
	function _win(cells) {
		// Check four cells to see if they're all color of current player
		//  - cells: list of four (y, x) cells
		//  - returns true if all are legal coordinates & all match currPlayer
		return cells.every(
			([y, x]) =>
				y >= 0 &&
				y < height &&
				x >= 0 &&
				x < width &&
				board[y][x] === currPlayer //this line i am not sure about
		);
	}

	for (let y = 0; y < height; y++) {
		for (let x = 0; x < width; x++) {
			//check horizontal rows - four adjacent spots from current spot
			const horiz = [
				[y, x],
				[y, x + 1],
				[y, x + 2],
				[y, x + 3],
			];
			//check vertical columns - four adjacent spots from current spot
			const vert = [
				[y, x],
				[y + 1, x],
				[y + 2, x],
				[y + 3, x],
			];
			//check diagonal to the right from the current spot
			const diagDR = [
				[y, x],
				[y + 1, x + 1],
				[y + 2, x + 2],
				[y + 3, x + 3],
			];
			//check diagonal to the left from the current spot
			const diagDL = [
				[y, x],
				[y + 1, x - 1],
				[y + 2, x - 2],
				[y + 3, x - 3],
			];
			//if any of the above types of wins returns true, then return true
			if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
				return true;
			}
		}
	}
}

const switchPlayer = () =>
	currPlayer === 'player1'
		? (currPlayer = 'player2')
		: (currPlayer = 'player1');

const checkTie = () => {
	for (let j = 0; j < height; j++) {
		for (let i = 0; i < width; i++) {
			if (board[j][i] === 'player1' || board[j][i] === 'player2') {
				return true;
			}
			return false;
		}
	}
};

const endGame = (msg) => alert(msg);
