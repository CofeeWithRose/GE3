var http = require("http");
var fs = require('fs');
var c = require('child_process');
var uri=process.cwd();
exports.start = function(){
    http.createServer(function(request, response) {

    	var url=uri+request.url;
        fs.readFile(url, '',function (err, data) {

            if (err){
            	 response.writeHead(404, {"Content-Type": "text/html"});
            	 response.write("<h5>404 Not Found</h5>");
            	  response.end();
            	  return;
            }

            if (/(\.png)|(.jpg)/.test(url)) {
	        	 response.writeHead(200, {"Content-Type": "image/jpeg"});
	             response.write(data);
	             response.end();
	             return;
            }

            if (/\.css/.test(url)) {
            	response.writeHead(200, {"Content-Type": "text/css"});
	            response.write(data);
	            response.end();
	            return;
            }

            response.writeHead(200, {"Content-Type": "text/html"});
            response.write(data);
            response.end();
        });

    }).listen(8888);
    console.log("server start...");
    c.exec('start http://localhost:8888/main.html');
}
exports.start ();