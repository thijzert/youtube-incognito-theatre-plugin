/**
 * Copyright © 2016 Thijs van Dijk
 *
 * TODO: figure out how exactly you're supposed to mention that this file is
 * available under the terms of the BSD 3-clause license.
 **/

var YOUTUBE_DOMAIN = 'youtube.com';
var YOUTUBE_URL = 'http://' + YOUTUBE_DOMAIN;

/**
 * Set 'disable autoplay' and 'theatre mode' cookies
 *
 * @param {string} store_id The cookie store the cookie should be stored in.
 */
function theatre(store_id) {
	var to_set = [
		{key: "wide", value: "1"},  // Theatre (or 'Cinema') mode
		{key: "PREF", value: "f1=50000000&f5=30030&gl=US"},  // Disable autoplay, global mode
		{key: "HideTicker", value: "true"}  // Remind me later
	];

	for ( var i = 0; i < to_set.length; i++ )
	{
		chrome.cookies.get({
				name: to_set[i].key,
				url: YOUTUBE_URL,
				storeId: store_id
			},
			function(cookie)
			{
				if (!cookie || cookie.value != to_set[i].value) {
					chrome.cookies.set({
						name: to_set[i].key,
						value: to_set[i].value,
						domain: '.' + YOUTUBE_DOMAIN,
						url: YOUTUBE_URL,
						expirationDate: 10*365*86400*1000 + (new Date()).getTime(),
						storeId: store_id
					});
				}
			});
	}
}

chrome.cookies.getAllCookieStores(function(cookie_stores)
{
	for ( var i = 0; i < cookie_stores.length; i++ )
	{
		theatre( cookie_stores[i].id );
	}
});
