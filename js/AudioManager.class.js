/**
 * For that file :
 * @licence LGPL 2 and 3 (https://www.gnu.org/licenses/lgpl.html)
 * @author Nicola Spanti
 */

/**
 * @constructor
 * @param {Audio} audio tag
 * @param {boolean} show controls
 * @param {boolean} no sound
 * @param {float} 0 <= volume <= 1
 */
function AudioManager(element, controls, muted, volume)
{
	if(element == undefined)
		this.element = document.querySelector('audio');
	else
		this.element = element;
	
	this.format = '';
	this.setMuted(muted);
	this.setVolume(volume);
	
	if(controls != undefined)
		this.element.controls = controls;
	
	if(muted == undefined)
		this.element.muted = 1;
	else
		this.element.muted = muted;
	
	if(volume == undefined)
		this.element.volume = 1;
	else
		this.element.volume = volume;
	
	if (this.element.canPlayType)
	{
		for (var mime_type in AudioManager.MIME_TYPES_WITH_MATCHING_EXTENSION)
		{
			if (this.element.canPlayType('audio/'+ mime_type))
			{
				this.format = AudioManager.MIME_TYPES_WITH_MATCHING_EXTENSION[mime_type];
				this.element.setAttribute('type', 'audio/'+ mime_type);
				break;
			}
		}
		
		if(this.format == '')
			alert('Votre navigateur web ne supporte pas un format audio compatible avec le jeu');
	}
	else
		alert('Impossible de vérifier le type de format audio supporté par votre navigateur web');
}

AudioManager.MIME_TYPES_WITH_MATCHING_EXTENSION = {
//	'flac'                  : 'flac',
//	'oga;  codecs="flac"'   : 'flac.oga',
//	'ogg;  codecs="flac"'   : 'flac.oga',
	'oga;  codecs="vorbis"' : 'vorbis.oga',
	'ogg;  codecs="vorbis"' : 'vorbis.oga',
	'oga;  codecs="opus"'   : 'opus.oga',
	'ogg;  codecs="opus"'   : 'opus.oga',
	'webm; codecs="vorbis"' : 'vorbis.webma',
	'webm; codecs="opus"'   : 'opus.webma',
	'wav;  codecs="PCM"'    : 'pcm.wav',
	'wave; codecs="PCM"'    : 'pcm.wav',
	'mp3'                   : 'mp3',
	'mpeg'                  : 'mp3'
	};
// Commented lines are for unsupported formats

AudioManager.prototype.getMuted = function()
{
	return this.element.muted;
}

/**
 * @param {boolean} no sound
 */
AudioManager.prototype.setMuted = function(muted)
{
	this.element.muted = muted;
}

AudioManager.prototype.inverseMuted = function()
{
	this.element.muted = !this.element.muted;
}

/**
 * @param {float} 0 <= volume <= 1
 */
AudioManager.prototype.setVolume = function(volume)
{
	if (typeof volume == 'number')
	{
		volume = parseFloat(volume);
	
		if (volume >= 0 && volume <= 1)
			this.element.volume = volume;
	}
}

/**
 * @param {String} file name
 * @param play in loop
 */
AudioManager.prototype.play = function(file, loop)
{
	if(loop ==  undefined)
		loop = false;
	
	if(this.format != '')
	{
		this.element.autoplay = true;
		this.element.loop = loop;
		this.element.setAttribute('src', 'audio/'+ file +'.'+ this.format);
	}
}