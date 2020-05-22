

const XSIZE = 100;
const YSIZE = 150;


function add_log(string){
   $('#log').prepend(`${new Date(Date.now())} : ${string}<br>`);
}

function add_sub_log(string){
   $('#log').prepend(`&nbsp;&nbsp;&nbsp${string}<br>`);
}


function askTrainingData(){
   $.ajax({
      url : "./gettrainingdata",
      type : "GET",
      dataType : "json",
      success : (json) => {
         // console.log("JSON SUCCESS");
         // console.log(json);
         training_data = json;
         add_log(`Training data loaded`);
      },
      error : (json, err) => {
         console.error("data imports failed");
         // console.log(json);
         $("#alert").show();
      }
   });
}

let features;
let knn;
let training_data = [];

function setup(){
   cnv = createCanvas(XSIZE, YSIZE);
   cnv.parent("sketch");

   features = ml5.featureExtractor('MobileNet', modelReady);
	knn = ml5.KNNClassifier();

   askTrainingData();

}

function loadImageURL(url) {
  return new Promise(r => { let i = new Image(); i.onload = (() => r(i)); i.src = url; });
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function get_training_data(){
   var canvas = document.querySelector("canvas");
   var ctx = canvas.getContext('2d');

   add_log("Process training data");

   for(var i = 0 ; i < training_data.length ; i++) {
      data = training_data[i];
      url = data.url;
      element = data.element;

      add_sub_log(url);
      // var img = new Image();
      // img.src = url;

      let img = await loadImageURL(url);

      ctx.drawImage(img, 0, 0);
      addToModel(element);

      sleep(500);
   }
   add_log("Process training data finished !");
   knn.save("model.json");

}

function addToModel(element){
   const logits = features.infer(cnv);
   knn.addExample(logits, element);



}

function modelReady(){
   add_log("Model initialized");
   $("#train_button").prop('disabled', false);
}
