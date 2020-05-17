var express = require('express');
var app = express();
var sever = app.listen(8000);

app.use(express.static('.'));

console.log("Hello world");
