class Piece {
	constructor(board, square, color) {
		this.board = board;
		this.square = square;
		this.color = color;
		this.image = PIECE_IMAGE;
		this.hasMoved = false;
	}

	getValidSquares() {
		let validSquares = [];

		for(let i = 0; i < 8; i++) {
			for(let j = 0; j < 8; j++) {
				validSquares.push(this.board.squares[i][j]);
			}
		}

		return validSquares;
	}

	getValidSquaresInDirection(xStep, yStep, steps, canCapture=true, canOnlyCapture=false) {
		let validSquares = [];

		let i = this.square.x + xStep;
		let j = this.square.y + yStep;
		let step = 0;

		while((steps == null || step < steps) && i < 8 && i >= 0 && j < 8 && j >= 0) {
			let square = this.board.squares[i][j];
			let piece = this.board.getPiece(square);

			if(canOnlyCapture && (piece == null || (piece != null && piece.color == this.color))) {
				break;
			}

			if(piece != null) {
				if(canCapture && piece.color != this.color) {
					validSquares.push(square);
				}
				break;
			}

			validSquares.push(square);

			step++;
			i += xStep;
			j += yStep;
		}

		return validSquares;
	}

	draw() {
		imageMode(CENTER);

		image(
			this.image,
			this.square.x * SQUARE_SIZE + SQUARE_SIZE / 2.0,
			this.square.y * SQUARE_SIZE + SQUARE_SIZE / 2.0,
			SQUARE_SIZE,
			SQUARE_SIZE
		);
	}
}
