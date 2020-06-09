class Rook extends Piece {
	constructor(board, square, color) {
		super(board, square, color);

		if(this.color == Color.WHITE) {
			this.image = WHITE_ROOK_IMAGE;
		}
		else {
			this.image = BLACK_ROOK_IMAGE;
		}
	}

	getValidSquares() {
		let validSquares = [];

		validSquares = validSquares.concat(this.getValidSquaresInDirection(1, 0));
		validSquares = validSquares.concat(this.getValidSquaresInDirection(0, 1));
		validSquares = validSquares.concat(this.getValidSquaresInDirection(-1, 0));
		validSquares = validSquares.concat(this.getValidSquaresInDirection(0, -1));

		return validSquares;
	}
}
