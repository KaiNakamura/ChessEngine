let board;

function setup() {
	board = new Board();
	createCanvas(BOARD_SIZE, BOARD_SIZE);	
}

function draw() {
	board.draw();
}
