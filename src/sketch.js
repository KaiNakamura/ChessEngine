let board;

function preload() {
	Piece.loadImages();
}

function setup() {
	board = new Board();
	createCanvas(BOARD_SIZE, BOARD_SIZE);	
}

function draw() {
	board.draw();
}

function mouseClicked() {
	board.mouseClicked();
}