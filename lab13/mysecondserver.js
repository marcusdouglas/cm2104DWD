var http = require("http");
var currentdata = require("mymodule");

http.createServer(function (req, res) {
  res.writeHead(200, {"Content-Type": "text/html"});
  res.write("The date and time are currently: " + currentdata.myDataTime());
  res.end("Hello World!");
}).listen(8080);
