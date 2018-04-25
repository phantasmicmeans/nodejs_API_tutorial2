var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var app = express();
var user = require('./api/user');


if (process.env.NODE_ENV !== 'test')
{
    app.use(morgan('dev'));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(user);

module.exports = app;


