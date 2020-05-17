var express = require('express');
var bodyParser = require('body-parser');
var app = express();
const port = 8000;

var cvtdisp = require('./convert_data/javascript/convert_display_fun');

app.use(express.static('.'));
app.use(bodyParser.json());



app.get('/convert_data/getsets', (req, res) => {
   var sets = cvtdisp.getAllSets();
   console.log("Send JSON files");
   res.send(sets);
});

app.post('/convert_data/convertimage', (req, res) => {
   cvtdisp.convertOneSet(req.body.set);
   res.send({"status" : 200});
});

app.get('/convert_data/display', (req, res) => {
   var imgs = cvtdisp.getAllPictures();
   console.log("Send PNG files");
   res.send(imgs);
});



var server = app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
