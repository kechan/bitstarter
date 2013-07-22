var express = require('express');
var fs = require('fs');

var app = express.createServer(express.logger());

app.get('/', function(request, response) {
  var content = fs.readFileSync("index.html").toString();
  response.send(content);
  //response.send('Hello World 2!');
});

app.get('/image/:uid', function(req, res) {
   console.log("image handler called");
   var imgUid = req.params.uid;

   var imgStream = fs.createReadStream(imgUid).on('error', function(error) {
      var body = JSON.stringify(error);
      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Content-Length', body.length);
      res.end(body);
    });

    imgStream.pipe(res);

});

var port = process.env.PORT || 8080;
app.listen(port, function() {
  console.log("Listening on " + port);
});
