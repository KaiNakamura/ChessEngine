var board;

function setup() {
	createCanvas(WIDTH, HEIGHT);	
	board = new Board();	
}

function draw() {
	board.draw();
}

function mousePressed() {
	board.mousePressed();
}
