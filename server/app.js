var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var path = require('path');
var url = require('url');

var app = express();

var reqhandlers = require('./request-handlers.js');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/../public')));
app.use('/scripts', express.static(path.join(__dirname, '/../bower_components')));

var ip = '127.0.0.1';
var port = 3000;

app.listen(port, ip, function() {
  console.log('server listening on port ' + port);
});

var router = {
  '/movies': reqhandlers.movieActions,
  '/favorites': reqhandlers.favoriteActions
};

app.get('/movies', router['/movies']['GET']);
app.post('/movies', router['/movies']['POST']);

app.get('/favorites', router['/favorites']['GET']);

