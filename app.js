var express = require('express');
var app = express();
var morgan = require('morgan');
var ejs = require('ejs');


app.set('view enginge', 'ejs');
app.use(morgan('dev'));
app.use(express.static(__dirname + ''));
