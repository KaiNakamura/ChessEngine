class King extends Piece {
	constructor(board, square, color) {
		super(board, square, color);

		if(this.color == Color.WHITE) {
			this.image = WHITE_KING_IMAGE;
		}
		else {
			this.image = BLACK_KING_IMAGE;
		}
	}
	
	getValidSquares() {
		let validSquares = [];

		validSquares = validSquares.concat(this.getValidSquaresInDirection(1, 0, 1));
		validSquares = validSquares.concat(this.getValidSquaresInDirection(0, 1, 1));
		validSquares = validSquares.concat(this.getValidSquaresInDirection(-1, 0, 1));
		validSquares = validSquares.concat(this.getValidSquaresInDirection(0, -1, 1));
		validSquares = validSquares.concat(this.getValidSquaresInDirection(1, 1, 1));
		validSquares = validSquares.concat(this.getValidSquaresInDirection(-1, 1, 1));
		validSquares = validSquares.concat(this.getValidSquaresInDirection(1, -1, 1));
		validSquares = validSquares.concat(this.getValidSquaresInDirection(-1, -1, 1));

		return validSquares;
	}
}
