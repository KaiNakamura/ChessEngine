class Bishop extends Piece {
	constructor(board, square, color) {
		super(board, square, color);

		if(this.color == Color.WHITE) {
			this.image = WHITE_BISHOP_IMAGE;
		}
		else {
			this.image = BLACK_BISHOP_IMAGE;
		}
	}

	getValidSquares() {
		let validSquares = [];

		validSquares = validSquares.concat(this.getValidSquaresInDirection(1, 1));
		validSquares = validSquares.concat(this.getValidSquaresInDirection(-1, 1));
		validSquares = validSquares.concat(this.getValidSquaresInDirection(1, -1));
		validSquares = validSquares.concat(this.getValidSquaresInDirection(-1, -1));

		return validSquares;
	}
}
