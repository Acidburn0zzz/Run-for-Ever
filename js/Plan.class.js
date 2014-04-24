/**
 * @constructor
 * @param {Image[]} images, with the index as the level number
 * @param {int} x to add per frame
 */
function Plan(images, y, xToAddPerFrame, width, height)
{
	if(images == undefined)
		throw new TypeError('images must be defined');
	else if(images == null)
		throw new TypeError('images must be not null');
	else if(images.length != Level.MAX +1)
		throw 'images must have the same length than the level max +1';
	else
		this.images = images;
	
	if(y == undefined)
		throw new TypeError('y must be defined');
	else if(isNaN(y))
		throw new TypeError('y must be a number');
	else
		this.y = y;
	
	if(xToAddPerFrame == undefined)
		this.xToAddPerFrame = 1;
	else if(isNaN(xToAddPerFrame))
		throw new TypeError('xToAddPerFrame must be a number');
	else
		this.xToAddPerFrame = parseInt(xToAddPerFrame);
	
	if(width == undefined)
		this.width = this.images[0].width;
	else
		this.width = width;
	
	if(height == undefined)
		this.height = this.images[0].height;
	else
		this.height = height;
	
	// x1 est l'image de "base" et x2 est le clone pour le scrolling
	this.x1 = 0;
	this.x2 = canvas.width;
} 


Plan.prototype.update = function() 
{
	this.x1 -= this.xToAddPerFrame * Main.frameDeltaTimeFactor;
	this.x2 -= this.xToAddPerFrame * Main.frameDeltaTimeFactor;
  
	if (this.x1 <= -canvas.width)
		this.x1 += 2*canvas.width;
	if (this.x2 <= -canvas.width)
		this.x2 += 2*canvas.width;
}

Plan.prototype.draw = function() 
{
	this.update();
	
	canvas2DContext.drawImage(this.images[level.value], 0, 0, this.width, this.height, this.x1, this.y, this.width, this.height);
	canvas2DContext.drawImage(this.images[level.value], 0, 0, this.width, this.height, this.x2, this.y, this.width, this.height);
}