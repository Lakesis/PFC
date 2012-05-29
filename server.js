var http = require('http'),
fs = require('fs'),
html
;

fs.readFile('index.html', function (err, data) {
  if (err) throw err;
  html = data;
});

http.createServer(function (request, response) {

	console.log("Request for received.");
	response.writeHead(200, {'Content-Type': 'text/html'});
	response.write(html);
  	response.end();

}).listen(8888);

console.log("Listening at http://localhost:8888/")