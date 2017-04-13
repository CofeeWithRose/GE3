var http = require("http");
var fs = require('fs');
exports.start = function(){
    http.createServer(function(request, response) {

    	var url=".."+request.url;
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
}
exports.start ();