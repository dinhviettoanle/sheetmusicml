const Jimp = require('jimp');
const fs = require('fs');
const WIDTH = 100;
const HEIGHT = 150;

var min_indexes = {
   'alto_clef' : 0,
   'bass_clef' : 0,
   'crotchet_inverted' : 0,
   'crotchet_normal' : 0,
   'eighth_rest' : 0,
   'halfnote_inverted' : 0,
   'halfnote_normal' : 0,
   'quaver_inverted' : 0,
   'quaver_normal' : 0,
   'rest' : 0,
   'semiquaver_inverted' : 0,
   'semiquaver_normal' : 0,
   'sixteenth_rest' : 0,
   'treble_clef' : 0,
}


module.exports =  {
   getAllSets : getAllSets,
   getAllPictures : getAllPictures,
   convertOneSet : convertOneSet
};

// ---------------- COM WITH SERVER -------------------------

function getAllSets() {
   let files_json = fs.readdirSync('./data/json');

   let rawdone = fs.readFileSync(`./data/done.json`);
   let done = JSON.parse(rawdone)['done'];

   var sets = [];

   for(const set of files_json){
      if(!done.includes(set)){
         sets.push({'set' : set, 'converted' : false});
      }
      else {
         sets.push({'set' : set, 'converted' : true});
      }

   }

   return sets;
}


function getAllPictures() {
   let files_png = fs.readdirSync('./data/png');
   var pngs = [];

   files_png.forEach((item, i) => {
      pngs.push({'element' : item.split("-")[0], 'name' : item});
   });

   return pngs;
}

// {"done" : []}

function convertOneSet(name){
   setMinIndexes();

   let rawdone = fs.readFileSync(`./data/done.json`);
   let done = JSON.parse(rawdone)['done'];

   convert_one_set(name);
   done.push(name);

   fs.writeFileSync(`./data/done.json`, JSON.stringify({'done' : done}), (err) => {if (err) throw err;});

   console.log(JSON.stringify(min_indexes, null, 2));

}


// ------------------------ STANDALONE APP ------------------


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
   let rawdata = fs.readFileSync(`./data/json/${set}`);
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
         var color = Jimp.rgbaToInt(255-bw_byte, 255-bw_byte, 255-bw_byte, 255);
         line.push(color);
         index++;
      }
      image_data.push(line);
   }

   // Definition du nom du fichier
   min_index = min_indexes[element] + 1;
   var file_name = element + "-" +  min_index.toString();

   if(isNaN(min_index)){
      console.log(file_name);
   }

   min_indexes[element]++;



   let image = new Jimp(WIDTH, HEIGHT);

   image_data.forEach((row, y) => {
         row.forEach((color, x) => {
            image.setPixelColor(color, x, y);

         });
      });

   image.write(`./data/png/${file_name}.png`, (err) => {
      if (err) throw err;
   });



}

// main();
