var http = require('http');
var url = require('url');
var path = require('path');
var fs = require('fs');

function staticRoot(staticpath,request,response){
    console.log(staticpath);
    var urlObj = url.parse(request.url,true);
    console.log(urlObj.pathname) 

    var fileFath = path.join(staticpath,urlObj.pathname);
    console.log(fileFath);

    fs.readFile(fileFath,'binary',function(err,fileContent){
        if(err){
            console.log('404')
            response.writeHead(404,'not found');
            response.end('<h1>404 Not Found</h1>')
        }else{
            console.log('ok');
            response.write(fileContent);
            response.end();
        }
    })
}
var server = http.createServer(function(request,response){
    staticRoot(path.join(__dirname,'sample'),request,response);
})
server.listen(8080);