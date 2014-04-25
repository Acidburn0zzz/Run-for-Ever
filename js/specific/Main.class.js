var canvas, canvas2DContext;
var clock, level;
var background, ground, character, score;
var buttons, showTouchButtonsManager;
var percentageOfImageGameOver, imageGameOver;
var Main = function() {};

Main.init = function()
{
	canvas = document.querySelector('canvas');
	canvas2DContext = canvas.getContext('2d');
	
	Main.initGame();
}

Main.addGameKeyboardEvents = function()
{
	window.onkeydown = function (event)
	{
		if(event.keyCode == KeyEvent.DOM_VK_LEFT || event.keyCode == KeyEvent.DOM_VK_H)	// left or h (like Vim)
		{	
			character.goingLeft = true;
			return false;
		}
		else if(event.keyCode == KeyEvent.DOM_VK_RIGHT || event.keyCode == KeyEvent.DOM_VK_L) // right or l (like Vim)
		{
			character.goingRight = true;
			return false;
		}
		else if(event.keyCode == KeyEvent.DOM_VK_SPACE || event.keyCode == KeyEvent.DOM_VK_UP || event.keyCode == KeyEvent.DOM_VK_K) // space or up or k (like Vim)
		{
			character.isJumping = true;				
			return false;
		}
		else
		{
			return true;
		}
	}
	
	window.onkeyup = function (event)
	{
		if(event.keyCode == KeyEvent.DOM_VK_LEFT || event.keyCode == KeyEvent.DOM_VK_H)
			character.goingLeft = false;
		else if(event.keyCode == KeyEvent.DOM_VK_RIGHT || event.keyCode == KeyEvent.DOM_VK_L)
			character.goingRight = false;
		
		character.animation = 1;
	}
}

Main.initGame = function()
{
	audio = new AudioManager(document.querySelector('audio'), false, false);
	if(cookiesManager.get('audio-muted') == 'true' || cookiesManager.get('audio-muted') == 'false')
		audio.setMuted(cookiesManager.get('audio-muted'));
	
	clock = new Clock();
	level = new Level(0);
	background = new Background();
	ground = new Ground();
	character = new Character();
	score = new Score();
	
	ButtonsManager.initGame();
	this.addGameKeyboardEvents();
	
	clock.start();
}

Main.drawGame = function()
{
	clock.update();
	Main.frameDeltaTimeFactor = clock.getDeltaTime() / Main.timeInMillisecondsBetweenEachFrame;
	// If the computer has enough power to make a frame each Main.timeInMillisecondsBetweenEachFrame, factor=1
	// But, if for example the computer needs more time to make a frame, this factor will permit to run the game as the normal speed even if there is less FPS
	
	level.update(clock);
	background.draw();
	score.draw();
	ground.draw();
	character.update();
	character.draw();
	
	ButtonsManager.draw();
	
	if(character.isDead())
	{
		Main.stopGame();
		Main.initDeath();
		Main.intervalForAFrame = setInterval(Main.drawDeath, Main.timeInMillisecondsBetweenEachFrame);
	}
}

Main.stopGame = function()
{
	clock.stop();
	clearInterval(Main.intervalForAFrame);
	//clock = undefined;
	ground = undefined;
	//character = undefined;
}

Main.initDeath = function()
{
	percentageOfImageGameOver = 0;
	imageGameOver = new Image();
	imageGameOver.src = 'images/gameover/default.png';
	
	score.x = 480;
	score.y = 260;
	
	ButtonsManager.initDeath();
}

Main.drawDeath = function()
{
	canvas2DContext.drawImage(
		imageGameOver, 0, 0,
		percentageOfImageGameOver*canvas.width, percentageOfImageGameOver*canvas.height );
	
	if(percentageOfImageGameOver < 1)
		percentageOfImageGameOver += Main.timeInMillisecondsBetweenEachFrame / 1000;
	else
	{
		score.draw();
		ButtonsManager.draw();
	}
}

Main.init();
Main.timeInMillisecondsBetweenEachFrame = 40;
Main.intervalForAFrame = window.setInterval(Main.drawGame, Main.timeInMillisecondsBetweenEachFrame);

/* canvas.addEventListener('mouseover', function(event)
{
	var posX = parseInt(event.clientX * canvas.width  / document.body.clientWidth);
	var posY = parseInt(event.clientY * canvas.height / document.body.clientHeight);
	
	if(!character.isDead())
	{
		if( posX < canvas.width * 0.2 && posY > canvas.height * 0.4 )
		{
			character.goingLeft = true;
		}
		else if( posX > canvas.width * 0.8 && posY > canvas.height * 0.4 )
		{
			character.goingRight = true;
		}
		else if( posX > canvas.width * 0.2 && posX < canvas.width * 0.8 && posY > canvas.height * 0.5 )
		{
			character.isJumping = true;
		}
	}
}, false);

canvas.addEventListener('mouseout', function(event)
{
	var posX = parseInt(event.clientX * canvas.width  / document.body.clientWidth);
	var posY = parseInt(event.clientY * canvas.height / document.body.clientHeight);
	
	if(!character.isDead())
	{
		if( posX < canvas.width * 0.2 && posY > canvas.height * 0.4 )
		{
			character.goingLeft = false;
		}
		else if( posX > canvas.width * 0.8 && posY > canvas.height * 0.4 )
		{
			character.goingRight = false;
		}
		else if( posX > canvas.width * 0.2 && posX < canvas.width * 0.8 && posY > canvas.height * 0.5 )
		{
			character.isJumping = false;
		}
	}
}, false); */