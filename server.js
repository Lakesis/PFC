var http = require('http'), server,
fs = require('fs'),
url = require('url'),
path = require('path'),
io = require('socket.io'), socket, 
pathname, contentType, particleSystem
;

server = http.createServer(function (request, response) {
	pathname = '.' + url.parse(request.url).pathname; 
	if (pathname === './') pathname = 'index.html';
	
	switch (path.extname(pathname)) {
		case '.html':
            contentType = 'text/html';
            break;
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
		case '.less':
            contentType = 'stylesheet/less';
            break;
		case '.png':
            contentType = 'image/png';
            break;
    }	
	console.log("Request for "+pathname+" received.");	
	fs.readFile(pathname, function (err, data) {
		if (err){
			response.writeHead(500);
			response.end();
			console.log(err);
		} else {
			response.writeHead(200, {'Content-Type': contentType});
			response.write(data);
			response.end();
		}
	});	
}).listen(8888);

socket = io.listen(server);
socket.on('connection', function (client) {
	
	client.on('update', function (data) {
		client.broadcast('update',data);
	});
});


console.log("Listening at http://localhost:8888/");