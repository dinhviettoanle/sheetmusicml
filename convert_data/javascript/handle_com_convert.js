// --------------- CONVERT SECTION ---------------
function askFilesJSON() {
   $.ajax({
      url : "./getsets",
      type : "GET",
      dataType : "json",
      success : (json) => {
         // console.log("JSON SUCCESS");
         // console.log(json);
         createConvertSection(json);
      },
      error : (json, err) => {
         console.error(".json imports failed");
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
         $('<a>')
            .attr("href", "javascript:void(0);")
            .attr('onclick', `ask_convert("${item.set}")`)
            .html(`Convertir ${item.set} >> <br>`)
            .appendTo("#not_converted");
      }
   });

}


function ask_convert(set){
   $.ajax({
      url : "./convertimage",
      type : "POST",
      data: `{"set": "${set}"}`,
      contentType: 'application/json',
      success : (json) => {
         console.log("JSON SUCCESS");
         // console.log(json);
         location.reload();

      },
      error : (json, err) => {
         console.error("Conversion failed");
         console.log(json);
      }
   });
}


// --------------- DISPLAY SECTION ---------------

const MAPPING_ID_FR = {
   'alto_clef' : "Clé d'Ut",
   'bass_clef' : "Clé de Fa",
   'crotchet_inverted' : "Noire inversée",
   'crotchet_normal' : "Noire",
   'eighth_rest' : "Demi-soupir",
   'halfnote_inverted' : "Blanche inversée",
   'halfnote_normal' : "Blanche",
   'quaver_inverted' : "Croche inversée",
   'quaver_normal' : "Croche",
   'rest' : "Soupir",
   'semiquaver_inverted' : "Double croche inversée",
   'semiquaver_normal' : "Double croche",
   'sixteenth_rest' : "Quart de soupir",
   'treble_clef' : "Clé de Sol",
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
         console.error(".png imports failed");
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

            $('<hr/>').appendTo(`#display`);

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
