const XSIZE = 100;
const YSIZE = 150;
var cnv = null;

let features;
let knn;

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

function init_interaction(){

	// Submit button to create a sketch
	$('#submit_sketch').click(function(){
		$("#element_detected").append("Recherche...");
		convert_alpha();
		detect();
	});

	window.addEventListener("keyup", function(event) {
		if (event.keyCode === 46) {
			$("#element_detected").text("");
			clear();
		}

		if (event.keyCode === 13) {
			$("#element_detected").append("Recherche...");
			convert_alpha();
			detect();
		}
	});
}


// ================= P5.js CODE ======================

function setup(){
	cnv = createCanvas(XSIZE, YSIZE);
	cnv.parent("sketch");
	background('rgba(255, 255, 255, 0)');

	knn = ml5.KNNClassifier();
	features = ml5.featureExtractor('MobileNet', modelReady);
}


function draw() {
	strokeWeight(2);
	if (mouseIsPressed === true) {
		line(mouseX, mouseY, pmouseX, pmouseY);
    }
}

function convert_alpha() {
	loadPixels();
	for(y = 0 ; y < YSIZE ; y++){
		for(x = 0 ; x < XSIZE ; x++){
			var px = get(x, y);
			if(px[3] == 0){
				set(x, y, color(255, 255,255));
			}
		}
	}

	updatePixels();
}

// ================= ML5.js CODE ======================
function modelReady(){
   knn.load("model.json", () => console.log("KNN loaded"));
	console.log("Model initialized");
	$("#submit_sketch").prop('disabled', false);
	$("#element_detected").text("Prêt");
}


function detect() {
	if(knn.getNumLabels() > 0) {
		const logits = features.infer(cnv);
		knn.classify(logits, gotResult);
	}

	else {
		console.log("model.json corrupted");
	}
}


function gotResult(error, result) {
	if(error) {
		console.log(error);
		return;
	}

	else{
		$("#element_detected").text("");
		getBestResult(result);
	}
}

function sort_dict(dict) {
	var items = Object.keys(dict).map(function(key) {
	  return [key, dict[key]];
	});

	// Sort the array based on the second element
	items.sort(function(first, second) {
	  return second[1] - first[1];
	});

	// Create a new array with only the first 5 items
	return items.slice(0, 5);
}

function getBestResult(result){
	final_sort = sort_dict(result.confidencesByLabel);

	final_sort.forEach((item, i) => {
		if(i == 0){
			$('#element_detected').append(`-> ${MAPPING_ID_FR[item[0]]} (${Math.round(item[1]*10000)/100} %)<br>`);
		}
		else {
			$('#element_detected').append(`${MAPPING_ID_FR[item[0]]} (${Math.round(item[1]*10000)/100} %)<br>`);
		}
	});



}
