/**
 * For that file :
 * @licence newBSD (https://en.wikipedia.org/wiki/BSD_licenses#3-clause_license_.28.22Revised_BSD_License.22.2C_.22New_BSD_License.22.2C_or_.22Modified_BSD_License.22.29)
 * @author Nicola Spanti
 */

/**
 * @constructor
 * @param {int} x position
 * @param {int} y position
 * @param {int} width
 * @param {int} height
 * @param {Image[]} images
 * @param {function} action when a click is performed on the button
 */
Button = function(x, y, width, height, images, action)
{
	if(x == undefined)
		this.x = 0;
	else
		this.setX(x);
	
	if(y == undefined)
		this.y = 0;
	else
		this.setY(y);
	
	if(width == undefined)
		this.width = 50;
	else
		this.setWidth(width);
	
	if(height == undefined)
		this.height = 50;
	else
		this.setHeight(height);
	
	if(images == undefined)
	{
		this.images = {};
		this.images['default'] = new Image();
	}
	else
	{
		this.images = images;
	}
	
	if(action == undefined)
		throw 'action must be defined';
	else
		this.action = action;
}

Button.prototype.setX = function(x)
{
	if(isNaN(x))
		throw new TypeError('x is NaN');
	else if(x < 0)
		throw new RangeError('x must be positive');
	else
		this.x = parseInt(x);
}

Button.prototype.setY = function(y)
{
	if(isNaN(y))
		throw new TypeError('y is NaN');
	else if(y < 0)
		throw new RangeError('y must be positive');
	else
		this.y = parseInt(y);
}

Button.prototype.setWidth = function(width)
{
	if(isNaN(width))
		throw new TypeError('width is NaN');
	else if(width < 1)
		throw new RangeError('width must be greater or equal than 1');
	else
		this.width = parseInt(width);
}

Button.prototype.setHeight = function(height)
{
	if(isNaN(height))
		throw new TypeError('height is NaN');
	else if(height < 1)
		throw new RangeError('height must be greater or equal than 1');
	else
		this.height = parseInt(height);
}

Button.prototype.draw = function() {}