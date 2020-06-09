class Square {
	constructor(board, x, y, color) {
		this.board = board;
		this.x = x;
		this.y = y;
		this.color = color;
		this.highlighted = false;
	}

	mouseIsOver() {
		let x = this.x * SQUARE_SIZE;
		let y = this.y * SQUARE_SIZE;

		return 	mouseX > x &&
				mouseX < x + SQUARE_SIZE &&
				mouseY > y &&
				mouseY < y + SQUARE_SIZE;
	}

	draw() {
		noStroke();

		// Set color
		if(this.color == Color.WHITE) {
			if(this.highlighted) {
				fill(150, 214, 212);
			}
			else {
				fill(255, 255, 221);
			}
		}
		else {
			if(this.highlighted) {
				fill(79, 162, 142);
			}
			else {
				fill(134, 166, 102);
			}
		}

		rect(this.x * SQUARE_SIZE, this.y * SQUARE_SIZE, SQUARE_SIZE, SQUARE_SIZE);
	}
}
