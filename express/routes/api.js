var request = require('request'),
	_ = require('lodash'),
	MD5 = require('MD5'),
	normalize = require('../lib/normalize.js'),
	express = require('express'),
	zlib = require("zlib"),
	router = express.Router(),
	privateKey = "f5f9bbc257560a1d85cf4e45495f2820756313ae",
	publicKey = "c033582eba8b5d14446841f4976055ba",
	hostUrl = "http://gateway.marvel.com/v1/public/";

var RequestDefaults = function(path, method, qsExt) {
	var qs,
		url = hostUrl,
		method = method || "GET";

	if (path) {
		url += path;
	}

	this.setDefaultTime();

	qs = {
		"apikey" : publicKey,
		"ts" : this.ts,
		"hash" : this.getMarvelHash(this.ts, publicKey, privateKey),
		"limit" : 3
	}

	// Extend qs if any supplied fields, which have precident if same.
	if (qsExt && _.isObject(qsExt)) {
		qs = _.defaults(qsExt, qs);
	}

	return {
		"uri":  url,
		"method": method,
		"timeout": 10000,
		"followRedirect": true,
		"maxRedirects" : 10,
		"qs" : qs,
		"headers": {
			"Content-Type": "application/json"
		}
	}
}

RequestDefaults.prototype.setDefaultTime = function() {
	var d = new Date;
	return this.ts = d.getTime() + '';
}

RequestDefaults.prototype.getMarvelHash = function(ts, pub, priv) {
	if (!ts || !pub || !priv || !MD5) throw new Error('Cannot complete getMarvelHash');
	var hash = ts + priv + pub
	return MD5(hash);
}

router.get('/api/v1/characters', function(req, res) {
	res.type('application/json');

	var marvelCharsGet,
		charGetOptions = new RequestDefaults('characters');

	marvelCharsGet = request(charGetOptions, function(error, response, body) {
		var result = {};
		if (!error && response.statusCode == 200) {
			body = JSON.parse(body);
			result.characters = body.data.results;

			// Top level normalizing
			normalize.normalizeRecords(result, 'thumbnail', 'thumbnails', 'characters');
			
			normalize.normalizeRecords(result, 'comics', 'comics', 'characters');
			normalize.normalizeRecords(result, 'items', 'items', 'comics');

			normalize.normalizeRecords(result, 'series', 'series', 'characters');
			normalize.normalizeRecords(result, 'items', 'items', 'series');

			// normalize.normalizeRecords(result, 'stories', 'stories', 'characters');
			// normalize.normalizeRecords(result, 'events', 'events', 'characters');
			// normalize.normalizeRecords(result, 'urls', 'urls', 'characters');

			// Second level item normalizing

			res.json(200, result);
		}
		else {
	        res.json({ "error": error });
		}
	});
});

module.exports = router;