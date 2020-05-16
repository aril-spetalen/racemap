var express = require('express');
var app = express();
var path = require('path')

app.get('/', function (req, res) {
    // res.send('Seilaser i Norge');
    res.sendFile(path.join(__dirname + '/index.html'));
});
app.listen(3000, function () {
    console.log('Seilaskart app listening on port 3000!');
});

