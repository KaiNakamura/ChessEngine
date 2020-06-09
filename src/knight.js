class Knight extends Piece {
	constructor(board, square, color) {
		super(board, square, color);

		if(this.color == Color.WHITE) {
			this.image = WHITE_KNIGHT_IMAGE;
		}
		else {
			this.image = BLACK_KNIGHT_IMAGE;
		}
	}

	getValidSquares() {
		let validSquares = [];

		validSquares = validSquares.concat(this.getValidSquaresInDirection(2, -1, 1));
		validSquares = validSquares.concat(this.getValidSquaresInDirection(1, -2, 1));
		validSquares = validSquares.concat(this.getValidSquaresInDirection(-1, -2, 1));
		validSquares = validSquares.concat(this.getValidSquaresInDirection(-2, -1, 1));
		validSquares = validSquares.concat(this.getValidSquaresInDirection(-2, 1, 1));
		validSquares = validSquares.concat(this.getValidSquaresInDirection(-1, 2, 1));
		validSquares = validSquares.concat(this.getValidSquaresInDirection(1, 2, 1));
		validSquares = validSquares.concat(this.getValidSquaresInDirection(2, 1, 1));

		return validSquares;
	}
}
