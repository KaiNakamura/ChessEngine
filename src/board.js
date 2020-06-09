class Board {
	constructor() {
		// Create squares
		this.squares = new Array(8);

		for(let i = 0; i < 8; i++) {
			this.squares[i] = new Array(8);
			for(let j = 0; j < 8; j++) {
				this.squares[i][j] = new Square(
					this, i, j, i % 2 == 0 != j % 2 == 1 ? Color.WHITE : Color.BLACK
				);
			}
		}

		// Create pieces
		this.pieces = [];

		// White pieces
		for(let i = 0; i < 8; i++) {
			this.pieces.push(new Pawn(this, this.squares[i][6], Color.WHITE));
		}

		this.pieces.push(new Knight(this, this.squares[1][7], Color.WHITE));
		this.pieces.push(new Knight(this, this.squares[6][7], Color.WHITE));

		this.pieces.push(new Bishop(this, this.squares[2][7], Color.WHITE));
		this.pieces.push(new Bishop(this, this.squares[5][7], Color.WHITE));

		this.pieces.push(new Rook(this, this.squares[0][7], Color.WHITE));
		this.pieces.push(new Rook(this, this.squares[7][7], Color.WHITE));

		this.pieces.push(new Queen(this, this.squares[3][7], Color.WHITE));

		this.pieces.push(new King(this, this.squares[4][7], Color.WHITE));

		// Black Pieces
		for(let i = 0; i < 8; i++) {
			this.pieces.push(new Pawn(this, this.squares[i][1], Color.BLACK));
		}

		this.pieces.push(new Knight(this, this.squares[1][0], Color.BLACK));
		this.pieces.push(new Knight(this, this.squares[6][0], Color.BLACK));

		this.pieces.push(new Bishop(this, this.squares[2][0], Color.BLACK));
		this.pieces.push(new Bishop(this, this.squares[5][0], Color.BLACK));

		this.pieces.push(new Rook(this, this.squares[0][0], Color.BLACK));
		this.pieces.push(new Rook(this, this.squares[7][0], Color.BLACK));

		this.pieces.push(new Queen(this, this.squares[3][0], Color.BLACK));

		this.pieces.push(new King(this, this.squares[4][0], Color.BLACK));

		// Game logic
		this.inHand;
		this.turn = Color.WHITE;
	}

	mousePressed() {
		// Get pressed square
		let pressedSquare;
		checkSquares:
		for(let i = 0; i < 8; i++) {
			for(let j = 0; j < 8; j++) {
				if(this.squares[i][j].mouseIsOver()) {
					pressedSquare = this.squares[i][j];
					break checkSquares;
				}
			}
		}

		// Get pressed piece, if one exists
		let pressedPiece;
		for(let piece of this.pieces) {
			if(piece.square == pressedSquare) {
				pressedPiece = piece;
				break;
			}
		}

		// If pressed sqaure has piece, pick up piece
		if(pressedPiece != null && this.inHand == null) {
			for(let piece of this.pieces) {
				// Only pick up pieces if it's their player's turn
				if(piece.square.mouseIsOver() && piece.color == this.turn) {
					this.inHand = piece;

					// Highlight picked up piece
					this.setSquareHighlight(false);
					this.inHand.square.highlighted = true;
				}
			}
		}
		// If piece in hand, place down piece
		else if (this.inHand != null){
			// Get new square
			let newSquare;
			findNewSquare:
			for(let i = 0; i < 8; i++) {
				for(let j = 0; j < 8; j++) {
					if(this.squares[i][j].mouseIsOver()) {
						newSquare = this.squares[i][j];

						// Check if new square is a valid move
						for(let validSquare of this.inHand.getValidSquares()) {
							// If new square is a valid move, move piece
							if(validSquare == newSquare) {
								// Highlight new square
								newSquare.highlighted = true;

								// Move piece
								this.inHand.square = newSquare;
								this.inHand.hasMoved = true;

								// Change turns
								this.turn = getOtherColor(this.turn);

							}
						}

						// If new square is not a valid move, cancel move
						this.setSquareHighlight(false);
						this.inHand = null;

						break findNewSquare;
					}
				}
			}
		}
	}

	getPiece(a, b) {
		if(a instanceof Square) {
			for(let piece of this.pieces) {
				if(piece.square == a) {
					return piece;
				}
			}
		}
		else if(typeof a == "number" && typeof b == "number") {
			for(let piece of this.pieces) {
				if(piece.square == this.squares[a][b]) {
					return piece;
				}
			}
		}

		return null;
	}

	setSquareHighlight(highlight) {
		for(let i = 0; i < 8; i++) {
			for(let j = 0; j < 8; j++) {
				this.squares[i][j].highlighted = highlight;
			}
		}
	}

	draw() {
		// Draw squares
		for(let i = 0; i < 8; i++) {
			for(let j = 0; j < 8; j++) {
				this.squares[i][j].draw();
			}
		}

		// Draw pieces
		for(let piece of this.pieces) {
			piece.draw();
		}
		
		// Draw valid squares
		if(this.inHand != null) {
			fill(77, 125, 66, 128);
			for(let validSquare of this.inHand.getValidSquares()) {
				ellipse(
					validSquare.x * SQUARE_SIZE + SQUARE_SIZE / 2.0,
					validSquare.y * SQUARE_SIZE +  SQUARE_SIZE / 2.0,
					20
				);
			}
		}
	}
}
