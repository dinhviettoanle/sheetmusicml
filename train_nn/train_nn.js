const fs = require('fs');


function main(){
   // Recuperation des donnees
   var data_raw = fs.readFileSync(`./data/data.json`);
   var data = JSON.parse(data_raw)['data'];
   console.log(`${data.length} entries detected`);


}



main()
// nn();
