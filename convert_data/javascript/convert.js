// --------------- CONVERT SECTION ---------------
function askFilesJSON() {
   $.ajax({
      url : "./convert",
      type : "GET",
      dataType : "json",
      success : (json) => {
         // console.log("JSON SUCCESS");
         // console.log(json);
         createConvertSection(json);
      },
      error : (json, err) => {
         console.log("JSON FAILED");
         // console.log(json);
         $("#alert").show();
      }
   });
}


function createConvertSection(data){
   data.forEach((item, i) => {
      if(item.converted){
         var new_set = `${item.set}<br>`;
         $('#converted').append(new_set);
      }
      else {
         var new_set = `${item.set}<br>`;
         $('#not_converted').append(new_set);
      }
   });

}


// --------------- DISPLAY SECTION ---------------

const MAPPING_ID_FR = {
   'treble_clef' : "Clé de Sol",
   'bass_clef' : "Clé de Fa",
   'alto_clef' : "Clé d'Ut"
}

function askFilesPNG() {
   $.ajax({
      url : "./display",
      type : "GET",
      dataType : "json",
      success : (json) => {
         // console.log("PNG SUCCESS");
         // console.log(json);
         createDisplaySection(json);
      },
      error : (json, err) => {
         console.log("PNG FAILED");
         // console.log(json);
         $("#alert").show();
      }
   });
}

function createDisplaySection(data) {

   var elements = [];

   data.forEach((item, i) => {
      if(!elements.includes(item.element)){
         elements.push(item.element);

         $('<h5/>')
            .text(MAPPING_ID_FR[item.element])
            .appendTo(`#display`)
            .addClass("m-3");

         $('<div/>')
            .attr('id', item.element)
            .appendTo("#display")
            .addClass("row");

      }
   });


   data.forEach((item, i) => {
      $('<div/>')
         .html(`<img src="../data/png/${item.name}" title=${item.name} >`)
         .appendTo(`#${item.element}`)
         .addClass("col-1");
   });

}
