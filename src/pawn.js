class Pawn extends Piece {
	constructor(board, square, color) {
		super(board, square, color);

		if(this.color == Color.WHITE) {
			this.image = WHITE_PAWN_IMAGE;
		}
		else {
			this.image = BLACK_PAWN_IMAGE;
		}
	}

	getValidSquares() {
		let validSquares = [];
		let yStep = this.color == Color.WHITE ? -1 : 1;

		// Moving forward
		validSquares = validSquares.concat(
			this.getValidSquaresInDirection(0, yStep, this.hasMoved ? 1 : 2, false)
		);

		// Capturing
		validSquares = validSquares.concat(
			this.getValidSquaresInDirection(-1, yStep, 1, true, true)
		);
		validSquares = validSquares.concat(
			this.getValidSquaresInDirection(1, yStep, 1, true, true)
		);

		return validSquares;
	}
}
