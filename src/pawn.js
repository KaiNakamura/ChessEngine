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

		validSquares = validSquares.concat(
			this.getValidSquaresInDirection(
				0,
				this.color == Color.WHITE ? -1 : 1,
				this.hasMoved ? 1 : 2)
		);

		return validSquares;
	}
}
