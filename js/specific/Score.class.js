Score = function(value)
{
	if(value == undefined)
		this.value = 0;
	else
		this.value = value;
	
	this.x = 30;
	this.y = 10;
	this.height = 40;
}

Score.prototype.update = function()
{
	if(clock == undefined)
		throw new TypeError('clock is not defined');
	else if(clock instanceof Clock)
		this.value = parseInt( clock.getTime() * (3 + level.value) / 1000 );
	else
		throw new TypeError('clock must be an instance of Clock');
}

Score.prototype.draw = function()
{
	this.update();
	
	canvas2DContext.font = this.height +'px Georgia';
	canvas2DContext.fillText('Score :  '+ this.value, this.x, this.y + this.height);
}