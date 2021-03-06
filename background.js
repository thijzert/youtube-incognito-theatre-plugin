/**
 * Copyright © 2016 Thijs van Dijk
 *
 * TODO: figure out how exactly you're supposed to mention that this file is
 * available under the terms of the BSD 3-clause license.
 **/


/**
 * Set 'disable autoplay' and 'theatre mode' cookies
 *
 * @param {string} store_id The cookie store the cookie should be stored in.
 */
function theatre(store_id)
{
	var to_set = [
		{domain: "vimeo.com", url: "https://vimeo.com", name: "continuous_play_v3", value: "0"},  // Disable autoplay

		{domain: "youtube.com", url: "https://www.youtube.com", name: "wide", value: "1"},  // Theatre (or 'Cinema') mode
		{domain: "youtube.com", url: "https://www.youtube.com", name: "PREF", value: "f1=50000000&f5=30030&gl=US"},  // Disable autoplay, global mode
		{domain: "youtube.com", url: "https://www.youtube.com", name: "HideTicker", value: "true"}  // Remind me later
	];

	for ( var i = 0; i < to_set.length; i++ )
	{
		(function()
		{
			var setthis = to_set[i];
			chrome.cookies.get({ url: setthis.url, name: setthis.name, storeId: store_id }, function( cookie )
			{
				if ( !cookie || cookie.value != setthis.value )
				{
					var s = true;
					if ( cookie )  s = !!cookie.secure;

					chrome.cookies.set({
						name: setthis.name,
						value: setthis.value,
						domain: setthis.domain,
						url: setthis.url,
						secure: s,
						expirationDate: 10*365*86400 + (new Date()).getTime() / 1000,
						storeId: store_id
					});
				}
			});
		})();
	}
}

chrome.cookies.onChanged.addListener(function(evt)
{
	var domains = {
		".vimeo.com": 1,
		".youtube.com": 1
	};

	if ( domains[evt.cookie.domain] )
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

