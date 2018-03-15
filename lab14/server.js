var express = require('express');
var app = express();

var Twitter = require('twitter');
var client = new Twitter({
 consumer_key: 'IVGA53Mr8AgtM33v6YELEZerU',
 consumer_secret: 'GUufU9528sgLeCn6fqlY3AGBqCTy1z4U0uBNou9aNcSLCNMnuF',
 access_token_key: '1035271638-robbaEbGk89OoVbjr2famtde9L896eZNjKafZTE',
 access_token_secret: 'yG9auY4X4ScCxYfDaBuEmlPKr0fbAEpxsZHVfNwO3Zi17'
});

app.use(express.static('public'))
app.get('/', function(req, res){
  var params = {screen_name: 'nodejs'};
  client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
      console.log(tweets);
    }
  });
  res.send("Hello world! by express");
});
app.listen(8080);
