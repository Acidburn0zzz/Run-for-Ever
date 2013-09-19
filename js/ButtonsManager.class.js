/**
 * For that file :
 * @licence newBSD (https://en.wikipedia.org/wiki/BSD_licenses#3-clause_license_.28.22Revised_BSD_License.22.2C_.22New_BSD_License.22.2C_or_.22Modified_BSD_License.22.29)
 * @author Nicola Spanti
 */

var ButtonsManager = function() {};

ButtonsManager.init = function()
{
	this.elements = { 'always':[], 'touch':[] };
	
	if(cookiesManager.get('showTouchButtons') == 'true' || cookiesManager.get('showTouchButtons') == 'false')
		this.showTouchButtons = cookiesManager.get('showTouchButtons');
	else
		this.showTouchButtons = true;
}

ButtonsManager.eventsClickListener = function(event)
{
	var posX = parseInt(event.clientX * canvas.width  / document.body.clientWidth);
	var posY = parseInt(event.clientY * canvas.height / document.body.clientHeight);
	// canvas.Mmm / document.body.clientMmm pour s'adapter à la résolution
	delete event;
	
	for (var category in ButtonsManager.elements)
	{
		for(var i=0; i < ButtonsManager.elements[category].length; i++)
		{
			if( posX >= ButtonsManager.elements[category][i].x &&
				posX <= (ButtonsManager.elements[category][i].x + ButtonsManager.elements[category][i].width) &&
				posY >= ButtonsManager.elements[category][i].y &&
				posY <= (ButtonsManager.elements[category][i].y + ButtonsManager.elements[category][i].height) )
			{
				ButtonsManager.elements[category][i].action();
			}
		}
	}
}

ButtonsManager.addEvents = function()
{
	canvas.removeEventListener('click', ButtonsManager.eventsClickListener, false);
	canvas.addEventListener   ('click', ButtonsManager.eventsClickListener, false);
}

/**
 * @param {Button[]}
 */
ButtonsManager._draw = function(buttons)
{
	for(var i=0; i < buttons.length; i++)
	{
		buttons[i].draw();
	}
}

ButtonsManager.draw = function()
{
	for (var category in ButtonsManager.elements)
	{
		this._draw(ButtonsManager.elements[category]);
	}
}

ButtonsManager.addAudio = function()
{
	images = { true: new Image(), false: new Image() };
	images[true].src  = 'images/buttons/audio/0-100.png';
	images[false].src = 'images/buttons/audio/100-100.png';
	
	button = new Button (
		canvas.width*0.9, 0, canvas.width*0.1, canvas.width*0.1,
		images,
		( function() {
			audio.inverseMuted();
			cookiesManager.set('audio-muted', audio.getMuted(), 60 * 60 * 24);
		} )
		);
	delete images;
	button.draw = function ()
	{
		canvas2DContext.drawImage(this.images[audio.getMuted()], this.x, this.y, this.width, this.height);
	}
	
	this.elements['always'].push(button);
}

ButtonsManager.addEnableTouch = function()
{
	images = { true: new Image(), false: new Image() };
	images[false].src = 'images/buttons/input/touch.png';
	images[true].src  = 'images/buttons/input/keyboard.png';
	
	button = new Button (
		canvas.width*0.8, 0, canvas.width*0.1, canvas.width*0.1,
		images,
		( function() {
			ButtonsManager.showTouchButtons = !ButtonsManager.showTouchButtons;
			cookiesManager.set('showTouchButtons', ButtonsManager.showTouchButtons);
			
			if(ButtonsManager.showTouchButtons)
				ButtonsManager.addTouch();
			else
				ButtonsManager.clearTouch();
		} )
		);
	delete images;
	button.draw = function ()
	{
		canvas2DContext.drawImage(this.images[ButtonsManager.showTouchButtons], this.x, this.y, this.width, this.height);
	}
	
	this.elements['always'].push(button);
}

ButtonsManager.addTouch = function()
{
	if(ButtonsManager.showTouchButtons)
	{
		leftButtonImages = { 'default': new Image() };
		leftButtonImages['default'].src  = 'images/buttons/arrays/left.png';
		leftButton = new Button(
			10, character.y - character.height*4, 150, 100,
			leftButtonImages,
			( function() { character.goingLeft = true;; } )
			);
		delete leftButtonImages;
		leftButton.draw = function ()
		{
			canvas2DContext.drawImage(this.images['default'], this.x, this.y);
		}
		this.elements['touch'].push(leftButton);
		
		rightButtonImages = { 'default': new Image() };
		rightButtonImages['default'].src  = 'images/buttons/arrays/right.png';
		rightButton = new Button(
			leftButton.x + leftButton.width +10, leftButton.y, 150, 100,
			rightButtonImages,
			( function() { character.goingRight = true; } )
			);
		delete rightButtonImages;
		rightButton.draw = function ()
		{
			canvas2DContext.drawImage(this.images['default'], this.x, this.y);
		}
		this.elements['touch'].push(rightButton);
		
		upButtonImages = { 'default': new Image() };
		upButtonImages['default'].src  = 'images/buttons/arrays/up.png';
		upButton = new Button(
			(leftButton.x + leftButton.width + rightButton.x + rightButton.width)/4, leftButton.y - leftButton.height*1.5, 150, 100,
			upButtonImages,
			( function() { character.isJumping = true; } )
			);
		delete upButtonImages;
		upButton.draw = function ()
		{
			canvas2DContext.drawImage(this.images['default'], this.x, this.y);
		}
		this.elements['touch'].push(upButton);
		
		this.addEvents();
	}
}

ButtonsManager.clearTouch = function()
{
	if(!ButtonsManager.showTouchButtons)
	{
		this.elements['touch'] = [];
	}
}

ButtonsManager.initGame = function()
{
	this.init();
	this.addAudio();
	this.addEnableTouch();
	this.addTouch();
	this.addEvents();
}

ButtonsManager.initDeath = function()
{
	ButtonsManager.init();
	this.addAudio();
	
	restartButton = new Button(
		score.x, score.y +50, 350, 50,
		undefined,
		( function() { location.reload(true); } )
		);
	restartButton.draw = function ()
	{
		canvas2DContext.fillText('Recommencer', this.x, this.y + this.height);
	}
	ButtonsManager.elements['always'].push(restartButton);
	
	var form = document.querySelector('form#game-form');
	if(form != undefined && form.action != '') // check if the form can be send, todo: check if the file exists
	{
		sendButton = new Button(
			score.x, ButtonsManager.elements['always'][ButtonsManager.elements['always'].length-1].y +50, 350, 50,
			undefined,
			( function() {
				var form  = document.querySelector('form#game-form');
				
				var input = form.querySelector('input#game-score');
				input.value = score.value;
				form.submit();
			} )
			);
		sendButton.draw = function ()
		{
			canvas2DContext.fillText('Envoyer le score', this.x, this.y + this.height);
		}
		ButtonsManager.elements['always'].push(sendButton);
	}
	delete form;
	
	homeButton = new Button(
		score.x, ButtonsManager.elements['always'][ButtonsManager.elements['always'].length-1].y +50, 350, 50,
		undefined,
		( function() {
			document.location.href = '../';
		} )
		);
	homeButton.draw = function ()
	{
		canvas2DContext.fillText('Retourner à l\'accueil', this.x, this.y + this.height);
	}
	ButtonsManager.elements['always'].push(homeButton);
	
	this.addEvents();
}