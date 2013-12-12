/**
 * This class has been made by hemanth
 * Some modifications have been made by Spanti Nicola
 * @licence public domain
 * The original source code is avaible at this adress : http://h3manth.com/content/simple-cookie-management-javascript
 */

var cookiesManager = {};
// DOES NOT WORK

/**
 * Set a cookie's value
 * @param {String} name
 * @param {String} value
 * @param {String} domain
 * @param {String} path
 * @param {boolean} secure cookie
 * @param {int} number of seconds
 */
cookiesManager.set = function (name, value, seconds, domain, path, secure)
{
	if(isNaN(seconds))
		var expires = "";
	else
	{
		var date = new Date();
		date.setTime(date.getTime() + (seconds * 1000));
		var expires = "; expires=" + date.toGMTString();
	}
	
	if(domain == undefined)
		domain = "";
	
	if(path == undefined)
		path = "";
	
	secure = (secure == true); // like that secure is a boolean and can not be a string (like "true")
	
	document.cookie = name + "=" + value + expires + (domain != "" ? "; domain=" + domain : "") + (path != "" ? "; path=" + path : "") + (secure ? "; secure" : "");
}

/**
 * Get a cookie's value
 * @param {String} name
 * @return {String} value
 */
cookiesManager.get = function (name)
{
	var splits = document.cookie.split(";");
	
	for (var i = 0; i < splits.length; i++)
	{
		var split = splits[i].split("=");
		
		if(split[0] == name)
			return split[1];
	}
	
	return undefined;
}

/**
 * Removes a cookie
 * @param {String} name.
 */
cookiesManager.remove = function (name)
{
	this.set(name, "", -1);
}

/**
 * Returns an object with all the cookies
 */
cookiesManager.getAll = function ()
{
	var splits = document.cookie.split(";");
	var cookies = {};
	
	for (var i = 0; i < splits.length; i++)
	{
		var split = splits[i].split("=");
		cookies[split[0]] = unescape(split[1]);
	}
	
	return cookies;
}

/**
 * Removes all the cookies
 */
cookiesManager.removeAll = function ()
{
	var cookies = manageCookie.getAll();
	
	for (var key in cookies)
	{
		if (obj.hasOwnProperty(key))
			this.remove();
	}
}