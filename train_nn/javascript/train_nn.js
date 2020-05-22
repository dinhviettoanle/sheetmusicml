const fs = require('fs');

module.exports =  {
   getData : getData,
};


function getData(){
   let files = fs.readdirSync('./data/png');
   let data = [];

   files.forEach((item, i) => {
      data.push({
         url : `../data/png/${item}`,
         element : item.split("-")[0]
      });
   });

   return data;
}
