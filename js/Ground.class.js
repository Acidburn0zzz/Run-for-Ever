/**
 * @constructor
 * @param {int} x position
 * @param {int} y position
 * @param {Square[]} squares
 */
function Ground(x, y, squares)
{
	if(x == undefined || isNaN(x))
		this.x = 0;
	else
		this.x = x;
	
	if(y == undefined || isNaN(y))
		this.y = canvas.height - Square.HEIGHT;
	else
		this.y = y;
	
	if(squares == undefined)
	{
		this.squares = Array();
		
		var nbOfSquaresToMake = Math.ceil(canvas.width / Square.WIDTH);
		
		this.squares.push(new Square(0, this.y, false));
		this.squares.push(new Square(Square.WIDTH, this.y, false));
		
		for(var i=2; i < 5; ++i)
		{
			this.addSquare(false);
			// first squares are not empty, it is needed for addSquares if isEmpty parameter is not given
		}
		
		for(var i=5; i <= nbOfSquaresToMake; ++i)
		{
			this.addSquare();
		}
	}
	else
		this.squares = squares;
	
	this.probabilityNotToHaveAnEmptySquare = Ground.PROBABILITY_NOT_TO_HAVE_AN_EMPTY_SQUARE_BEGINNING;
}

Ground.HEIGHT = Square.HEIGHT;
Ground.MOVE_BY_FRAME = 10;
Ground.PROBABILITY_NOT_TO_HAVE_AN_EMPTY_SQUARE_BEGINNING = 0.9;

/**
 * @param {boolean}
 */
Ground.prototype.addSquare = function(isEmpty)
{	
	if(isEmpty == undefined)
	{
		var isEmpty = false;
		var squareNumberBefore = this.squares.length;
		
		// If the 3 previous squares are not empty, the current square may be empty
		if( !(this.squares[--squareNumberBefore].isEmpty && this.squares[--squareNumberBefore].isEmpty && this.squares[--squareNumberBefore].isEmpty) )
			isEmpty = Math.random() > this.probabilityNotToHaveAnEmptySquare;
	}
	
	// On récupére la dernière case, uniquement pour sa position et sa taille
	var lastSquare = this.squares.pop();
	var positionX = lastSquare.x + lastSquare.width;
	
	var newSquare = new Square(positionX, this.y, isEmpty)
	this.squares.push(lastSquare);
	this.squares.push(newSquare);
}

Ground.prototype.update = function()
{
	for (var squareNumber in this.squares)
	{
		this.squares[squareNumber].x -= Ground.MOVE_BY_FRAME * Main.frameDeltaTimeFactor;
	}
	
	var firstSquare = this.squares.shift();
	
	if( (firstSquare.x + firstSquare.width) < 0 ) // if the square is outside the canvas
		this.addSquare();
	else
		this.squares.unshift(firstSquare);
}

Ground.prototype.draw = function()
{
	this.update();
	
	for (var squareNumber in this.squares)
	{
		if(this.squares[squareNumber] != undefined)
			this.squares[squareNumber].draw();
	}
}