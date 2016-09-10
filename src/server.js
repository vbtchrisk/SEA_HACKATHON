var express = require('express');
var app = express();
var ncaaFbGames = require('./api'); 

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.use('/api/ncaa/fb/games', ncaaFbGames);

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
