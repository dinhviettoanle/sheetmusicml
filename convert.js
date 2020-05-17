const Jimp = require('jimp');
const fs = require('fs');
const WIDTH = 100;
const HEIGHT = 150;

var min_indexes = {
   'treble_clef' : 0,
   'bass_clef' : 0,
   'alto_clef' : 0,
}

function getFilesJSON(){
   let files_json = fs.readdirSync('./data/json');



   let rawdone = fs.readFileSync(`data/json/done.json`);
   let done = JSON.parse(rawdone)['done'];

   files_json.forEach((set, i) => {
      if(!done.includes(set) && set != "done.json"){
         convert_one_set(set);
         done.push(set);
         console.log(`${set} is converted`)
      }

   });

   fs.writeFile(`data/json/done.json`, JSON.stringify({'done' : done}), (err) => {if (err) throw err;});

   console.log(JSON.stringify(min_indexes, null, 2));
   console.log("--- DONE ---");

}


function setMinIndexes(){
   var files_png = fs.readdirSync('./data/png');

   files_png.forEach((file, i) => {
      var elt = file.split("-")[0];
      var index = parseInt(file.split("-")[1].split(".")[0]);
      if(min_indexes[elt] < index) {
         min_indexes[elt] = index;
      }
   });
}



function convert_one_set(set){
   let rawdata = fs.readFileSync(`data/json/${set}`);
   let data_one_file = JSON.parse(rawdata)['data'];

   data_one_file.forEach((item, i) => {
      createImage(item);
   });
}


function createImage(data){
   var element = data.element;
   var sketch = data.sketch;
   var image_data = [];
   var index = 0;

   // Conversion BW image en return RGBA;
   for(var y = 0 ; y < HEIGHT ; y++){
      var line = [];
      for(var x = 0 ; x < WIDTH ; x++){
         var bw_byte = sketch[index];
         var color = Jimp.rgbaToInt(bw_byte, bw_byte, bw_byte, 255);
         line.push(color);
         index++;
      }
      image_data.push(line);
   }

   // Definition du nom du fichier
   min_index = min_indexes[element] + 1;
   var file_name = element + "-" +  min_index.toString();

   min_indexes[element]++;

   let image = new Jimp(WIDTH, HEIGHT, function (err, image) {
      if (err) throw err;

      image_data.forEach((row, y) => {
         row.forEach((color, x) => {
            image.setPixelColor(color, x, y);
         });
      });

      image.write(`./data/png/${file_name}.png`, (err) => {
         if (err) throw err;
      });
   });

}

function main(){
   setMinIndexes();
   getFilesJSON();
}

main();
