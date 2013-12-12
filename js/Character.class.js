/**
 * For that file :
 * @licence all rights reserved
 */

/**
 * @constructor
 * @param {int} x position
 * @param {int} y position
 * @param {int} width
 * @param {int} height
 */
function Character(x, y, width, height)
{
	if(width == undefined || isNaN(width))
		this.width = 28;
	else
		this.width = width;
	
	if(height == undefined || isNaN(height))
		this.height = 53;
	else
		this.height = height;
	
	this.setX(50);
	this.setY(canvas.height - Ground.HEIGHT - this.height);
	
	this.image = new Image();
	this.image.src = 'images/character/default.png';
	
	this._animation = 1;
	this._heightMax = 64;
	this._heightAtt = false;
	this._impulsion = 0;
	this._jumpTime = 0.5;
	
	// variables d'"évenements"
	this.isJumping  = false;	
	this.isFalling  = false;
	this.goingLeft  = false;
	this.goingRight = false;
}

Character.prototype.setX = function(x)
{
	if(isNaN(x))
		throw 'x is NaN';
	else if( (x + this.width) < (canvas.width -10) && (x > 10 || this.isFalling) )
		this.x = parseInt(x);
}

Character.prototype.setY = function(y)
{
	if(isNaN(y))
		throw 'y is NaN';
	else if( y > (canvas.height /2) ) // todo really
		this.y = parseInt(y);
}

Character.prototype.isGrounded = function()
{
	return (this.y + this.height) == ground.y;
}

Character.prototype.isDead = function()
{
	return this.y >= canvas.height;
}

Character.prototype.draw = function()
{
	canvas2DContext.drawImage(this.image, this._animation*28, 0, this.width, this.height, this.x, this.y, this.width, this.height);
};

Character.prototype.move = function(direction)
{
	if(isNaN(direction))
	{
		if(direction == 'left')
			direction = -1;
		else if(direction == 'right')
			direction = 1;
		else
			throw 'incorrect direction';
	}
	
	if(!this.isFalling)
	{
		this._animation = (this._animation+1) % 3;
		
		if(direction < 0)
			this.setX(this.x - Ground.MOVE_BY_FRAME * 1.5 * Main.frameDeltaTimeFactor);
		else if(direction > 0)
			this.setX(this.x + Ground.MOVE_BY_FRAME * 1.5 * Main.frameDeltaTimeFactor);
	}
}

Character.prototype.update = function() 
{
	// on a hole or not ?
	if(!this.isFalling)
	{
		for (var squareNumber in ground.squares)
		{
			if(ground.squares[squareNumber] != undefined)
			{
				if(ground.squares[squareNumber].x > (this.x + this.width))
				{
					break;
				}
				else if (
					ground.squares[squareNumber].isEmpty &&
					ground.squares[squareNumber].x <= this.x &&
					(ground.squares[squareNumber].x + ground.squares[squareNumber].width) >= (this.x + this.width) &&
					this.isGrounded() )
				{
					this.isFalling = true;
				}
			}	
		}
	}
	
	if(this.isFalling)
	{
		this.setY(this.y + 10 * Main.frameDeltaTimeFactor);
	}
	else
	{
		if(this.goingLeft)
			this.move(-1);
		else if(this.goingRight)
			this.move(1);
		
		if(this.isJumping && !this.isFalling)
		{
			// jump	
			if (!this._heightAtt)
			{
				this._impulsion -= Main.timeInMillisecondsBetweenEachFrame * this._heightMax / (500 * this._jumpTime);
				this._animation = 2;
			
				if(this._impulsion <= -this._heightMax)
					this._heightAtt = true;
			}
			else if( this.y < (ground.y - this.height) )
			{
				this._impulsion += Main.timeInMillisecondsBetweenEachFrame * this._heightMax / (500 * this._jumpTime);
				this._animation = 2;
			}
			else
			{
				this._heightAtt = false;
				this.isJumping = false;
			}
			
			this.setY(ground.y - this.height + this._impulsion * Main.frameDeltaTimeFactor);
		}
	}
	
	// terrain fait reculer personnage
	var xAfterPotentialMoving = this.x - Ground.MOVE_BY_FRAME *  Main.frameDeltaTimeFactor;
	if (this.isFalling || xAfterPotentialMoving > 0)
		this.setX(xAfterPotentialMoving);
}