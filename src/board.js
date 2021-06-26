class Board {
	constructor() {
		this.loadFromFEN(START_FEN);
		this.generateMoves();
	}

	// What the hell is FEN?
	// See: https://en.wikipedia.org/wiki/Forsyth-Edwards_Notation
	loadFromFEN(fen) {
		let fenRecord = fen.split(' ');
		let fenPosition = fenRecord[0];
		let fenActiveColor = fenRecord[1];

		this.squares = new Array(64).fill(0);
		let file = 0, rank = 7;
		for (let char of fenPosition) {
			if (char === '/') {
				file = 0;
				rank--;
			}
			else {
				if (!isNaN(char)) {
					file += parseInt(char);
				}
				else {
					this.squares[Square.getSquare(rank, file)] = Piece.Symbols[char];
					file++;
				}
			}
		}

		this.activeColor = fenActiveColor === 'w' ? Piece.WHITE : Piece.BLACK;
	}

	generateMoves() {
		this.moves = [];

		for (let startSquare = 0; startSquare < this.squares.length; startSquare++) {
			let piece = this.squares[startSquare];
			if (piece != Piece.NONE && Piece.isColor(piece, this.activeColor)) {
				if (Piece.isSlidingPiece(piece)) {
					this.generateSlidingMoves(piece, startSquare);
				}
				else if (Piece.isType(piece, Piece.KNIGHT)) {
					this.generateKnightMoves(piece, startSquare);
				}
				else if (Piece.isType(piece, Piece.KING)) {
					this.generateKingMoves(piece, startSquare);
				}
			}
		}
	}

	generateSlidingMoves(piece, startSquare) {
		let startDirectionIndex = (Piece.isType(piece, Piece.BISHOP)) ? 4 : 0;
		let endDirectionIndex = (Piece.isType(piece, Piece.ROOK)) ? 4 : 8;

		for (let directionIndex = startDirectionIndex; directionIndex < endDirectionIndex; directionIndex++) {
			for (let i = 0; i < Square.NUM_SQUARES_TO_EDGE[startSquare][directionIndex]; i++) {
				let targetSquare = startSquare + Square.DIRECTION_OFFSETS[directionIndex] * (i + 1);
				let pieceOnTargetSquare = this.squares[targetSquare];

				// Stop if blocked by piece of same color
				if (Piece.isColor(pieceOnTargetSquare, Piece.getColor(piece))) {
					break;
				}

				this.moves.push(new Move(startSquare, targetSquare));

				// Don't go any further if blocked by opponent
				if (Piece.isColor(pieceOnTargetSquare, Piece.getOppositeColor(piece))) {
					break;
				}
			}
		}
	}

	generateKnightMoves(piece, startSquare) {
		for (let directionIndex = 0; directionIndex < 8; directionIndex++) {
			// Skip move if invalid knight move
			if (!Square.VALID_KNIGHT_MOVES[startSquare][directionIndex]) {
				continue;
			}

			let targetSquare = startSquare + Square.KNIGHT_OFFSETS[directionIndex];
			let pieceOnTargetSquare = this.squares[targetSquare];

			// Knight can't capture own piece
			if (Piece.isColor(pieceOnTargetSquare, Piece.getColor(piece))) {
				continue;
			}

			this.moves.push(new Move(startSquare, targetSquare));
		}
	}

	generateKingMoves(piece, startSquare) {
		for (let directionIndex = 0; directionIndex < 8; directionIndex++) {
			// Don't let the king fall off the edge of the board
			if (Square.NUM_SQUARES_TO_EDGE[startSquare][directionIndex] <= 0) {
				continue;
			}

			let targetSquare = startSquare + Square.DIRECTION_OFFSETS[directionIndex];
			let pieceOnTargetSquare = this.squares[targetSquare];

			// King can't move into his own piece
			if (Piece.isColor(pieceOnTargetSquare, Piece.getColor(piece))) {
				continue;
			}

			this.moves.push(new Move(startSquare, targetSquare));
		}
	}

	move(move) {
		let piece = this.squares[move.startSquare];
		this.squares[move.targetSquare] = piece;
		this.squares[move.startSquare] = Piece.NONE;

		this.activeColor = Piece.getOppositeColor(piece);
		this.generateMoves();
	}

	draw() {
		for (let i = 0; i < this.squares.length; i++) {
			let x = Square.getX(i);
			let y = Square.getY(i);
			let isLightSquare = Square.isLightSquare(i);
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
				image(Piece.Images[piece], x, y, SQUARE_SIZE, SQUARE_SIZE);
			}

			// Draw moves
			for (let move of this.moves) {
				if (move.startSquare === this.selectedSquare) {
					fill(
						Square.isLightSquare(move.targetSquare) ?
						HIGHLIGHTED_LIGHT_SQUARE_COLOR :
						HIGHLIGHTED_DARK_SQUARE_COLOR
					);
					ellipse(
						Square.getX(move.targetSquare) + SQUARE_SIZE / 2.0,
						Square.getY(move.targetSquare) + SQUARE_SIZE / 2.0,
						25,
					);
				}
			}
		}
	}

	mouseClicked() {
		for (let i = 0; i < this.squares.length; i++) {
			if (Square.mouseIsOver(i)) {
				for (let move of this.moves) {
					if (
						move.startSquare === this.selectedSquare &&
						move.targetSquare === i
					) {
						this.move(move);
					}
				}
				this.selectedSquare = i;
			}
		}
	}
}