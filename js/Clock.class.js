/**
 * For that file :
 * @licence LGPL2.1+ (https://www.gnu.org/licenses/lgpl-2.1.html#SEC1)
 * @author Olivier Nocent (olivier.nocent@univ-reims.fr)
 * Some modifications have been, you can consider that this modifications are in public domain (but not the entire code) (so you don't need to quote anyone else)
 */

/**
 * Create an instance of Clock
 * @constructor
 * @attribute boolean isRunning
 * @attribute {float} time
 * @attribute {float} deltaTime
 * @attribute {int}   lastTimeStamp
 */
Clock = function()
{
	this.reset();
}

/**
 * Start the clock
 */
Clock.prototype.start = function()
{
  this.isRunning = true;
  var timer = new Date();
  this.lastTimeStamp = timer.getTime();
}

/**
 * Stop the clock
 */
Clock.prototype.stop = function()
{
	this.isRunning = false;
	this.deltaTime = 0;
}

/**
 * Reset the clock
 */
Clock.prototype.reset = function()
{
	this.stop();
	this.time = 0;
}

/**
 * Restart the clock
 */
Clock.prototype.restart = function()
{
	this.reset();
	this.start();
}

Clock.prototype.update = function()
{
	if (this.isRunning)
	{
		var timer = new Date();
		var currentTimeStamp = timer.getTime();
		this.deltaTime = currentTimeStamp - this.lastTimeStamp;
		
		this.lastTimeStamp = currentTimeStamp;
		
		this.time += this.deltaTime;
		//alert(this.time); // debug
	}
}

/**
 * @return {float} time (in milliseconds) elapsed since the clock starts
 */
Clock.prototype.getTime = function()
{
	return this.time;
}

/**
 * @return {float} time (in milliseconds) elapsed since the last call of update()
 */
Clock.prototype.getDeltaTime = function()
{
	return this.deltaTime;
}