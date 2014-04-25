/**
 * For that file :
 * @licence LGPL 2 and 3 (https://www.gnu.org/licenses/lgpl.html)
 * @author Nicola Spanti
 */

/**
 * @constructor
 */
function Background()
{
	this.plans = [];
	
	
	var images = [];
	
	for(var planInt=0; planInt < 3; ++planInt)
	{
		images.push(new Array());
		
		for(var levelInt=0; levelInt <= Level.MAX; ++levelInt)
		{
			images[planInt][levelInt] = new Image();
			images[planInt][levelInt].src = 'images/background/plan'+ ((planInt == 0) ? 0 : 1) +'-'+ levelInt +'.png';
		}
	}
	
	
	var plansSpecificProprieties = [
		{'y':0,   'xToAddPerFrame':1, 'width':canvas.width, 'height':canvas.height},
		{'y':450, 'xToAddPerFrame':3, 'width':canvas.width, 'height':150},
		{'y':500, 'xToAddPerFrame':5, 'width':canvas.width, 'height':220}
		];
	// Images can need time to be loaded, so for being sure to have a correct width and height, the width and height have been put in this variable.
	
	for(var planInt=0; planInt < 3; ++planInt)
	{
		var planSpecificProprieties = plansSpecificProprieties.shift();
		this.plans.push(new Plan(images[planInt], planSpecificProprieties['y'], planSpecificProprieties['xToAddPerFrame'], planSpecificProprieties['width'], planSpecificProprieties['height']));
	}
} 


Background.prototype.update = function() 
{
	for(var i=0; i < this.plans.length; ++i)
	{
		this.plans[i].update();
	}
}

Background.prototype.draw = function() 
{
	for(var i=0; i < this.plans.length; ++i)
	{
		this.plans[i].draw();
	}
}