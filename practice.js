const board = [];
const height = 6;
const width = 7;

const makeBoard = () => {
	let row = [];
	for (let i = 0; i <= width - 1; i++) row.push([]);
	for (let j = 0; j <= height - 1; j++) board.push(row);

	return board;
};
