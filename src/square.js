/*
Each square is assigned an index like so
+----+----+----+----+----+----+----+----+
| 56 | 57 | 58 | 59 | 60 | 61 | 62 | 63 |
+----+----+----+----+----+----+----+----+
| 48 | 49 | 50 | 51 | 52 | 53 | 54 | 55 |
+----+----+----+----+----+----+----+----+
| 40 | 41 | 42 | 43 | 44 | 45 | 46 | 47 |
+----+----+----+----+----+----+----+----+
| 32 | 33 | 34 | 35 | 36 | 37 | 38 | 39 |
+----+----+----+----+----+----+----+----+
| 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31 |
+----+----+----+----+----+----+----+----+
| 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 |
+----+----+----+----+----+----+----+----+
|  8 |  9 | 10 | 11 | 12 | 13 | 14 | 15 |
+----+----+----+----+----+----+----+----+
|  0 |  1 |  2 |  3 |  4 |  5 |  6 |  7 |
+----+----+----+----+----+----+----+----+

Pieces can move by changing their index
+----+----+----+
| +7 | +8 | +9 |
+----+----+----+
| -1 |  K | +1 |
+----+----+----+
| -9 | -8 | -7 |
+----+----+----+
*/
class Square {
	static DIRECTION_OFFSETS = [8, -8, -1, 1, 7, -7, 9, -9];

	// Calculate the number of squares to the edge from each square
	static NUM_SQUARES_TO_EDGE = new Array(64).fill(0).map((element, index) => {
		let rank = Math.floor(index / 8);
		let file = index % 8;
		let numNorth = 7 - rank;
		let numSouth = rank;
		let numWest = file;
		let numEast = 7 - file;
		return [
			numNorth,
			numSouth,
			numWest,
			numEast,
			Math.min(numNorth, numWest),
			Math.min(numSouth, numEast),
			Math.min(numNorth, numEast),
			Math.min(numSouth, numWest)
		];
	});

	static getSquare(rank, file) {
		return rank * 8 + file;
	}

	static getRank(square) {
		return Math.floor(square / 8);
	}

	static getFile(square) {
		return square % 8;
	}

	static isLightSquare(square) {
		return (Square.getRank(square) + Square.getFile(square)) % 2 != 0;
	}

	static isDarkSquare(square) {
		return !Square.isLightSquare(square);
	}

	static getX(square) {
		return Square.getFile(square) * SQUARE_SIZE;
	}

	static getY(square) {
		return BOARD_SIZE - (Square.getRank(square) + 1) * SQUARE_SIZE;
	}

	static mouseIsOver(square) {
		let x = Square.getX(square);
		let y = Square.getY(square);

		return (
			mouseX > x &&
			mouseX < x + SQUARE_SIZE &&
			mouseY > y &&
			mouseY < y + SQUARE_SIZE
		);
	}
}