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

A knight moves like this
+----+----+----+----+----+
|    | +15|    | +17|    |
+----+----+----+----+----+
| +6 |    |    |    | +10|
+----+----+----+----+----+
|    |    |  N |    |    |
+----+----+----+----+----+
| -10|    |    |    | -6 |
+----+----+----+----+----+
|    | -17|    | -15|    |
+----+----+----+----+----+
*/
class Square {
	static Direction = {
		NORTH: 0,
		SOUTH: 1,
		WEST: 2,
		EAST: 3,
		NORTH_WEST: 4,
		SOUTH_EAST: 5,
		NORTH_EAST: 6,
		SOUTH_WEST: 7
	};
	static DIRECTION_OFFSETS = [8, -8, -1, 1, 7, -7, 9, -9];
	static KNIGHT_OFFSETS = [10, 17, 15, 6, -10, -17, -15, -6];

	// Calculate the number of squares to the edge from each square
	static NUM_SQUARES_TO_EDGE = new Array(64).fill(0).map((element, index) => {
		let rank = Square.getRank(index);
		let file = Square.getFile(index);
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

	// Calculate if knight move is valid from each square
	static VALID_KNIGHT_MOVES = new Array(64).fill(0).map((element, index) => {
		let numSquaresToEdge = Square.NUM_SQUARES_TO_EDGE[index];
		let returnValue = 
		[
			numSquaresToEdge[Square.Direction.NORTH] >= 1 && numSquaresToEdge[Square.Direction.EAST] >= 2,
			numSquaresToEdge[Square.Direction.NORTH] >= 2 && numSquaresToEdge[Square.Direction.EAST] >= 1,
			numSquaresToEdge[Square.Direction.NORTH] >= 2 && numSquaresToEdge[Square.Direction.WEST] >= 1,
			numSquaresToEdge[Square.Direction.NORTH] >= 1 && numSquaresToEdge[Square.Direction.WEST] >= 2,
			numSquaresToEdge[Square.Direction.SOUTH] >= 1 && numSquaresToEdge[Square.Direction.WEST] >= 2,
			numSquaresToEdge[Square.Direction.SOUTH] >= 2 && numSquaresToEdge[Square.Direction.WEST] >= 1,
			numSquaresToEdge[Square.Direction.SOUTH] >= 2 && numSquaresToEdge[Square.Direction.EAST] >= 1,
			numSquaresToEdge[Square.Direction.SOUTH] >= 1 && numSquaresToEdge[Square.Direction.EAST] >= 2
		];
		return returnValue;
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