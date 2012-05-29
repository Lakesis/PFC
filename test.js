var http = require('http'),
url = require('url') 
;


function start() {
	http.createServer(function (request, response) {

		var pathname = url.parse(request.url).pathname;
		console.log("Request for " + pathname + " received.");
		response.writeHead(200, {'Content-Type': 'text/plain'});
	  	response.end('Hello World\n');
	}).listen(8124);

	console.log('Server running at http://127.0.0.1:8124/');
}

exports.start = start;