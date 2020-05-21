var express = require('express');
var app = express();
var path = require('path');
var router = express.Router;

/*
app.set('view engine', 'pug');
app.set('views', __dirname + '/public/views');

app.get('/', function (req, res) {
    // res.send('Seilaser i Norge');
    res.sendFile(path.join(__dirname + '/index.html'));
    res.sendFile(path.join(__dirname + '/query.js'));
});
app.listen(3000, function () {
    console.log('Seilaskart app listening on port 3000.');
});

*/

app.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/pub/doc/index.html'));
  //__dirname : It will resolve to your project folder.
});

//add the router
app.use(express.static(__dirname + '/pub/doc'));
app.use(express.static(__dirname + '/pub/js'));
app.use('pub', router);
app.listen(process.env.port || 3000);

console.log('Running at Port 3000');

