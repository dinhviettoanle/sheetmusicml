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
      }
   });
}


function createConvertSection(data){
   data.forEach((item, i) => {
      if(item.converted){
         var new_set = `${item.set}`;
         $('#converted').append(new_set);
      }
      else {
         var new_set = `${item.set}`;
         $('#not_converted').append(new_set);
      }
   });

}


// --------------- DISPLAY SECTION ---------------

function askFilesPNG() {
   $.ajax({
      url : "./display",
      type : "GET",
      dataType : "json",
      success : (json) => {
         // console.log("PNG SUCCESS");
         // console.log(json);
         createDisplaySection(data);
      },
      error : (json, err) => {
         console.log("PNG FAILED");
         // console.log(json);
      }
   });
}

function createDisplaySection(data) {
   console.log("Hello");
}
