var express = require('express');
var app = express();
const port = 8000;

var cvtdisp = require('./convert_data/convert_display_fun');

app.use(express.static('.'));


app.get('/convert_data/convert', (req, res) => {
   var sets = cvtdisp.getAllSets();
   console.log("Send JSON files");
   res.send(sets);
});

app.get('/convert_data/display', (req, res) => {
   var imgs = cvtdisp.getAllPictures();
   console.log("Send PNG files");
   res.send(imgs);
});



var server = app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
