const fs = require('fs');

function main(){
   let files = fs.readdirSync('../data/json');

   var final_data = [];

   files.forEach((file, i) => {
      var data_raw = fs.readFileSync(`../data/json/${file}`);
      var data = JSON.parse(data_raw)['data'];
      // console.log(data.length);
      data.forEach((sketch, i) => {
         // console.log(sketch['sketch'].length);
         // console.log(sketch['element']);
         final_data.push(sketch);
      });
   });

   fs.writeFileSync(`../train_nn/data/data.json`, JSON.stringify({'data' : final_data}), (err) => {if (err) throw err;});
   console.log(`${final_data.length} entries merged in data.json` );
}

main()
