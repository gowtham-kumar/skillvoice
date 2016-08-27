//Node js
var http = require("http");
var path = require("path");
var url = require("url");
var fs = require("fs");

var mimeTypes = {
    "html": "text/html",
    "jpeg": "images/jpeg",
    "jpg": "images/jpeg",
    "png": "images/png",
    "js": "text/javascript",
    "css": "text/css",
  
}
http.createServer(function (req,res) {
    var uri = url.parse(req.url).pathname;
    var fileName = path.join(process.cwd(),unescape(uri));
    console.log('Loading' + uri);
    var stats;
    try{
        stats = fs.lstatSync(fileName);
    }
    catch(e){
        res.writeHead(404,{'Content-type':'text/plain'});
        res.write('404 file not found');
        res.end();
        return;
        }
    if(stats.isFile()){
        var mimeType = mimeTypes[path.extname(fileName).split(".").reverse()[0]];
        res.writeHead(200,{'Content-type':mimeType});
        var fileStream = fs.createReadStream(fileName);
        fileStream.pipe(res);

    }
    else if(stats.isDirectory){
        res.writeHead(302,{
            'location': 'index.html'
        });
        res.end();

    }
    else{
        res.writeHead(500,{'Content-type':'text/plain'});
        res.write("500 internal error");
        res.end();

    }
}).listen(3000);

