/**
 * @constructor
 * @param {int} x position
 * @param {int} y position
 * @param {boolean} is the square empty
 * @param {int} width
 * @param {int} height
 * @param {Image[]} images
 */
function Square(x, y, isEmpty, width, height, images)
{
	if(x == undefined || isNaN(x))
		this.x = 0;
	else
		this.x = x;
	
	if(y == undefined || isNaN(y))
		this.y = ground.y;
	else
		this.y = y;
	
	if(isEmpty == undefined)
		this.isEmpty = false;
	else
		this.isEmpty = isEmpty;
	
	if(width == undefined || isNaN(width))
		this.width = Square.WIDTH;
	else
		this.width  = width;
	
	if(height == undefined || isNaN(height))
		this.height = Square.HEIGHT;
	else
		this.height = height;
	
	if(images == undefined)
	{
		this.images = {};
		for(var levelInt=0; levelInt <= Level.MAX; levelInt++)
		{
			this.images[levelInt] = {};
			this.images[levelInt]['default'] = new Image();
			this.images[levelInt]['empty']   = new Image();
			this.images[levelInt]['default'].src = 'images/square/default'+ levelInt +'.png';
			this.images[levelInt]['empty'].src   = 'images/square/empty'+ levelInt +'.png';
		}
	}
	else
	{
		this.images = images;
	}
}

// Some constants
Square.WIDTH  = 64;
Square.HEIGHT = 64;

Square.prototype.draw = function()
{
	canvas2DContext.drawImage(this.images[level.value][(this.isEmpty ? 'empty' : 'default')],
		this.x, this.y, this.width, this.height);
}