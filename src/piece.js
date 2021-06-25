/*
The first two bits denote the color, 01 for white and 10 for black
NONE            00000
WHITE_PAWN      01001
WHITE_KNIGHT    01010
WHITE_BISHOP    01011
WHITE_ROOK      01100
WHITE_QUEEN     01101
WHITE_KING      01110
BLACK_PAWN      10001
BLACK_KNIGHT    10010
BLACK_BISHOP    10011
BLACK_ROOK      10100
BLACK_QUEEN     10101
BLACK_KING      10110
*/
class Piece {
	static NONE = 0;
	static PAWN = 1;
	static KNIGHT = 2;
	static BISHOP = 3;
	static ROOK = 4;
	static QUEEN = 5;
	static KING = 6;
	static WHITE = 8;
	static BLACK = 16;

	static Symbols = {
		'P': Piece.WHITE | Piece.PAWN,
		'N': Piece.WHITE | Piece.KNIGHT,
		'B': Piece.WHITE | Piece.BISHOP,
		'R': Piece.WHITE | Piece.ROOK,
		'Q': Piece.WHITE | Piece.QUEEN,
		'K': Piece.WHITE | Piece.KING,
		'p': Piece.BLACK | Piece.PAWN,
		'n': Piece.BLACK | Piece.KNIGHT,
		'b': Piece.BLACK | Piece.BISHOP,
		'r': Piece.BLACK | Piece.ROOK,
		'q': Piece.BLACK | Piece.QUEEN,
		'k': Piece.BLACK | Piece.KING
	};

	static Images = {};

	static getColor(piece) {
		return piece >>> 3 << 3;
	}

	static getType(piece) {
		return (7 & piece);
	}

	static isColor(piece, color) {
		return Piece.getColor(piece) === color;
	}

	static isType(piece, type) {
		return Piece.getType(piece) === type;
	}

	static getOppositeColor(piece) {
		if (Piece.isColor(piece, Piece.WHITE)) {
			return Piece.BLACK;
		}
		else if (Piece.isColor(piece, Piece.BLACK)) {
			return Piece.WHITE;
		}
		else {
			return Piece.NONE;
		}
	}

	static isSlidingPiece(piece) {
		return (
			Piece.isType(piece, Piece.BISHOP) ||
			Piece.isType(piece, Piece.ROOK) ||
			Piece.isType(piece, Piece.QUEEN)
		);
	}

	static loadImages() {
		Piece.Images[Piece.WHITE | Piece.PAWN] = loadImage('/images/white-pawn.png');
		Piece.Images[Piece.WHITE | Piece.KNIGHT] = loadImage('/images/white-knight.png');
		Piece.Images[Piece.WHITE | Piece.BISHOP] = loadImage('/images/white-bishop.png');
		Piece.Images[Piece.WHITE | Piece.ROOK] = loadImage('/images/white-rook.png');
		Piece.Images[Piece.WHITE | Piece.QUEEN] = loadImage('/images/white-queen.png');
		Piece.Images[Piece.WHITE | Piece.KING] = loadImage('/images/white-king.png');
		Piece.Images[Piece.BLACK | Piece.PAWN] = loadImage('/images/black-pawn.png');
		Piece.Images[Piece.BLACK | Piece.KNIGHT] = loadImage('/images/black-knight.png');
		Piece.Images[Piece.BLACK | Piece.BISHOP] = loadImage('/images/black-bishop.png');
		Piece.Images[Piece.BLACK | Piece.ROOK] = loadImage('/images/black-rook.png');
		Piece.Images[Piece.BLACK | Piece.QUEEN] = loadImage('/images/black-queen.png');
		Piece.Images[Piece.BLACK | Piece.KING] = loadImage('/images/black-king.png')
	}
};