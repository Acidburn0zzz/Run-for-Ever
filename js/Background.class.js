/**
 * @constructor
 * @author Allan Guilmin
 */
function Background()
{
	this.images = {};

	for(var levelInt=0; levelInt <= Level.MAX; levelInt++)
	{
		this.images[levelInt] = {};
   		
		for(var planInt=0; planInt <= 1; planInt++)
		{
			this.images[levelInt][planInt] = new Image();
			this.images[levelInt][planInt].src = 'images/background/plan'+ planInt +'-'+ levelInt +'.png';
		}
	}
	
	// X1 est l'image de "base" et X2 est le clone pour le scrolling
	this.plan1X1 = 0;
	this.plan2X1 = 0;
	this.plan3X1 = 0;
	this.plan1X2 = canvas.width;
	this.plan2X2 = canvas.width;
	this.plan3X2 = canvas.width;
} 


Background.prototype.update = function() 
{
	this.plan1X1 -= 1;
	this.plan1X2 -= 1;
	
	this.plan3X1 -= 3;
	this.plan3X2 -= 3;
	
	this.plan2X1 -= 5;
	this.plan2X2 -= 5;
	
	if (this.plan1X1 <= -canvas.width)
		this.plan1X1 += 2*canvas.width;
	if (this.plan1X2 <= -canvas.width)
		this.plan1X2 += 2*canvas.width;
  
	if (this.plan3X1 <= -canvas.width)
		this.plan3X1 += 2*canvas.width;
	if (this.plan3X2 <= -canvas.width)
		this.plan3X2 += 2*canvas.width;
	
	if (this.plan2X1 <= -canvas.width) 
		this.plan2X1 += 2*canvas.width;
	if (this.plan2X2 <= -canvas.width)
		this.plan2X2 += 2*canvas.width;
}

Background.prototype.draw = function() 
{
	this.update();
	
	canvas2DContext.clearRect(0, 0, canvas.width, canvas.height);
	canvas2DContext.drawImage(this.images[level.value][0], this.plan1X1, 0);
	canvas2DContext.drawImage(this.images[level.value][0], this.plan1X2, 0);
	canvas2DContext.drawImage(this.images[level.value][1], 0, 0, canvas.width, 220, this.plan3X1, 450, canvas.width, 150);
	canvas2DContext.drawImage(this.images[level.value][1], 0, 0, canvas.width, 220, this.plan3X2, 450, canvas.width, 150);
	canvas2DContext.drawImage(this.images[level.value][1], 0, 0, canvas.width, 220, this.plan2X1, 500, canvas.width, 220);
	canvas2DContext.drawImage(this.images[level.value][1], 0, 0, canvas.width, 220, this.plan2X2, 500, canvas.width, 220);
}