const BOARD_SIZE = 720;
const SQUARE_SIZE = BOARD_SIZE / 8.0;

const LIGHT_SQUARE_COLOR = '#FFFFDD';
const DARK_SQUARE_COLOR = '#86A666';

const Piece = {
	NONE: 0,
	PAWN: 1,
	KNIGHT: 2,
	BISHOP: 3,
	ROOK: 4,
	QUEEN: 5,
	KING: 6,
	WHITE: 8,
	BLACK: 16
};

const PieceSymbol = {
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

const PieceImages = {};
function preload() {
	PieceImages[Piece.WHITE | Piece.PAWN] = loadImage("/images/white-pawn.png");
	PieceImages[Piece.WHITE | Piece.KNIGHT] = loadImage("/images/white-knight.png");
	PieceImages[Piece.WHITE | Piece.BISHOP] = loadImage("/images/white-bishop.png");
	PieceImages[Piece.WHITE | Piece.ROOK] = loadImage("/images/white-rook.png");
	PieceImages[Piece.WHITE | Piece.QUEEN] = loadImage("/images/white-queen.png");
	PieceImages[Piece.WHITE | Piece.KING] = loadImage("/images/white-king.png");
	PieceImages[Piece.BLACK | Piece.PAWN] = loadImage("/images/black-pawn.png");
	PieceImages[Piece.BLACK | Piece.KNIGHT] = loadImage("/images/black-knight.png");
	PieceImages[Piece.BLACK | Piece.BISHOP] = loadImage("/images/black-bishop.png");
	PieceImages[Piece.BLACK | Piece.ROOK] = loadImage("/images/black-rook.png");
	PieceImages[Piece.BLACK | Piece.QUEEN] = loadImage("/images/black-queen.png");
	PieceImages[Piece.BLACK | Piece.KING] = loadImage("/images/black-king.png")
}
