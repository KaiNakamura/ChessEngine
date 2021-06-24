/*
Each square is assigned a number like so
+---+---+---+---+---+---+---+---+
| 56| 57| 58| 59| 60| 61| 62| 63|
+---+---+---+---+---+---+---+---+
| 48| 49| 50| 51| 52| 53| 54| 55|
+---+---+---+---+---+---+---+---+
| 40| 41| 42| 43| 44| 45| 46| 47|
+---+---+---+---+---+---+---+---+
| 32| 33| 34| 35| 36| 37| 38| 39|
+---+---+---+---+---+---+---+---+
| 24| 25| 26| 27| 28| 29| 30| 31|
+---+---+---+---+---+---+---+---+
| 16| 17| 18| 19| 20| 21| 22| 23|
+---+---+---+---+---+---+---+---+
|  8|  9| 10| 11| 12| 13| 14| 15|
+---+---+---+---+---+---+---+---+
|  0|  1|  2|  3|  4|  5|  6|  7|
+---+---+---+---+---+---+---+---+
*/

class Board {
	constructor() {
		this.squares = new Array(64).fill(0);

		this.squares[0] = Piece.WHITE | Piece.BISHOP;
		this.squares[63] = Piece.BLACK | Piece.QUEEN;
		this.squares[7] = Piece.BLACK | Piece.KNIGHT;
	}

	// What the hell is FEN? See: https://en.wikipedia.org/wiki/Forsyth-Edwards_Notation
	loadPositionFromFEN() {

	}

	draw() {
		for (let i = 0; i < this.squares.length; i++) {
			let rank = Math.floor(i / 8);
			let file = i % 8;
			let isLightSquare = (rank + file) % 2 != 0;
			let x = file * SQUARE_SIZE;
			let y = BOARD_SIZE - (rank + 1) * SQUARE_SIZE;
			let piece = this.squares[i];
			
			// Draw square
			noStroke();
			fill(isLightSquare ? LIGHT_SQUARE_COLOR : DARK_SQUARE_COLOR);
			rect(x, y, SQUARE_SIZE, SQUARE_SIZE);

			// Debug numbers
			fill(isLightSquare ? DARK_SQUARE_COLOR : LIGHT_SQUARE_COLOR);
			text(i, x, y + 10);
			
			// Draw piece
			if (piece != Piece.NONE) {
				image(PieceImages[piece], x, y, SQUARE_SIZE, SQUARE_SIZE);
			}
		}
	}
}