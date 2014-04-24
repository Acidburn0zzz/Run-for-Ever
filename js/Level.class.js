/**
 * @param {int} level (>=0)
 */
function Level(level)
{
	if(level == undefined)
		this.set(0);
	else
		this.set(level);
}

Level.MAX = 2;

Level.prototype.set = function(level)
{
	if(level == undefined)
		throw new TypeError('undefined level');
	else if(isNaN(level))
		throw new TypeError('level is not a number');
	else if(level < 0)
		throw new RangeError('level < 0');
	else if(level > Level.MAX)
		throw new RangeError('level is more than the max level ('+ Level.MAX +')');
	else if(this.value != level)
	{
		this.value = parseInt(level);
		audio.play('level'+ level, true);
		
		if(this.value > 0)
			ground.probabilityNotToHaveAnEmptySquare = Ground.PROBABILITY_NOT_TO_HAVE_AN_EMPTY_SQUARE_BEGINNING - this.value * 0.1;
	}
}

/**
 * Update the level if the time is enough big
 * @param {Clock}
 */
Level.prototype.update = function(clock)
{
	if(clock.getTime() < 40000)
		this.set(0);
	else if(clock.getTime() < 120000)
		this.set(1);
	else
		this.set(2);
}