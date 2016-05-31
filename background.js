/**
 * Copyright © 2016 Thijs van Dijk
 *
 * TODO: figure out how exactly you're supposed to mention that this file is
 * available under the terms of the BSD 3-clause license.
 **/

var YOUTUBE_DOMAIN = 'youtube.com';
var YOUTUBE_URL = 'https://www.youtube.com';

/**
 * Set 'disable autoplay' and 'theatre mode' cookies
 *
 * @param {string} store_id The cookie store the cookie should be stored in.
 */
function theatre(store_id)
{
	var to_set = [
		{name: "wide", value: "1"},  // Theatre (or 'Cinema') mode
		{name: "PREF", value: "f1=50000000&f5=30030&gl=US"},  // Disable autoplay, global mode
		{name: "HideTicker", value: "true"}  // Remind me later
	];

	for ( var i = 0; i < to_set.length; i++ )
	{
		chrome.cookies.set({
			name: to_set[i].name,
			value: to_set[i].value,
			domain: '.' + YOUTUBE_DOMAIN,
			url: YOUTUBE_URL,
			secure: true,
			expirationDate: 10*365*86400 + (new Date()).getTime() / 1000,
			storeId: store_id
		});
	}
}

chrome.cookies.onChanged.addListener(function()
{
	if ( evt.cookie.domain == '.' + YOUTUBE_DOMAIN )
	{
		theatre( evt.cookie.storeId );
	}
});


function theatre_all()
{
	chrome.cookies.getAllCookieStores(function(cookie_stores)
	{
		for ( var i = 0; i < cookie_stores.length; i++ )
		{
			theatre( cookie_stores[i].id );
		}
	});
}
chrome.windows.onCreated.addListener(theatre_all);

theatre_all();

