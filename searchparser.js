var patterns = [];
patterns.push( { 'name': 'Google', 'pattern': 'google', 'var': 'q' } );
patterns.push( { 'name': 'Live', 'pattern': 'search.live', 'var': 'q' } );
patterns.push( { 'name': 'Bing', 'pattern': 'bing', 'var': 'q' } );
patterns.push( { 'name': 'MSN', 'pattern': 'msn', 'var': 'q' } );
patterns.push( { 'name': 'Yahoo!', 'pattern': 'local.yahoo', 'var': 'stx' } );
patterns.push( { 'name': 'Yahoo!', 'pattern': 'local.yahoo', 'var': 'p' } );
patterns.push( { 'name': 'Yahoo!', 'pattern': 'search.yahoo', 'var': 'p' } );
patterns.push( { 'name': 'Yahoo!', 'pattern': 'search.yahoo', 'var': 'q' } );
patterns.push( { 'name': 'Cuil', 'pattern': 'cuil.com', 'var': 'q' } );
patterns.push( { 'name': 'Lycos', 'pattern': 'lycos', 'var': 'query' } );
patterns.push( { 'name': 'DMOZ', 'pattern': 'dmoz.org', 'var': 'q' } );
patterns.push( { 'name': 'AOL', 'pattern': 'search.aol.com', 'var': 'q' } );
patterns.push( { 'name': 'Voila', 'pattern': 'voila', 'var': 'rdata' } );
patterns.push( { 'name': 'HotBot', 'pattern': 'hotbot', 'var': 'query' } );
patterns.push( { 'name': 'Kvasir', 'pattern': 'kvasir', 'var': 'q' } );
patterns.push( { 'name': 'Euroseek', 'pattern': 'euroseek', 'var': 'string' } );
patterns.push( { 'name': 'Ask', 'pattern': 'ask.com', 'var': 'q' } );
patterns.push( { 'name': 'Mamma', 'pattern': 'mamma', 'var': 'q' } );
patterns.push( { 'name': 'Opasia', 'pattern': 'find.tdc.dk', 'var': 'q' } );
patterns.push( { 'name': 'Splut', 'pattern': 'splut', 'var': 'pattern' } );
patterns.push( { 'name': 'UKIndex', 'pattern': 'ukindex.co.uk', 'var': 'q' } );
patterns.push( { 'name': 'UK Directory', 'pattern': 'ukdirectory', 'var': 'Search' } );
patterns.push( { 'name': 'Francite', 'pattern': 'francite', 'var': 'name' } );
patterns.push( { 'name': 'Fireball', 'pattern': 'fireball.de', 'var': 'q' } );
patterns.push( { 'name': 'Web.de', 'pattern': 'suche.web.de', 'var': 'su' } );
patterns.push( { 'name': 'Virgilio', 'pattern': 'virgilio.it', 'var': 'qs' } );
patterns.push( { 'name': 'Kvasir', 'pattern': 'kvasir.no', 'var': 'q' } );
patterns.push( { 'name': 'Atlas.cz', 'pattern': 'searchatlas.centrum.cz', 'var': 'q' } );
patterns.push( { 'name': 'Seznam.cz', 'pattern': 'seznam.cz', 'var': 'q' } );
patterns.push( { 'name': 'O2Active.cz', 'pattern': 'o2active.cz', 'var': 'q' } );
patterns.push( { 'name': 'Centrum.cz', 'pattern': 'centrum.cz', 'var': 'q' } );
patterns.push( { 'name': 'onet.pl', 'pattern': 'onet.pl', 'var': 'qt' } );
patterns.push( { 'name': 'wp.pl', 'pattern': 'wp.pl', 'var': 'szukaj' } );
patterns.push( { 'name': 'myway', 'pattern': 'myway.com', 'var': 'searchfor' } );
patterns.push( { 'name': 'mywebsearch', 'pattern': 'mywebsearch.com', 'var': 'searchfor' } );
patterns.push( { 'name': 'Gigablast', 'pattern': 'gigablast.com', 'var': 'q' } );
patterns.push( { 'name': 'Yandex', 'pattern': 'yandex', 'var': 'text' } );
patterns.push( { 'name': 'Baidu', 'pattern': 'baidu', 'var': 'wd' } );

exports.parse = function(url) {

	var parts = require('url').parse(url, true);

	var found = false;
	var info = [];

	for (var i = 0; i < patterns.length; i++) {
		var search = patterns[i];

		if (parts.hostname) {
		if (parts.hostname.search(search.pattern) != -1) {
			info['search_engine'] = search.name;
			info['search_keywords'] = parts.query[search.var];

			/* Special case for Google Image Search */
			if (typeof parts.query['prev'] != 'undefined' && parts.query['prev'].length > 0) {
				var dparts = require('url').parse(parts.query['prev'], true);
				info['search_keywords'] = dparts.query[search.var];
			}

			found = true;
			break;
		}
		}
	}

	if (found)
		return info;
	return false;

}
