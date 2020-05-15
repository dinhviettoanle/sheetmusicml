/**
 * TODO : code abc || Lilypond || teX
 * TODO : commenter le code...
 */
 

const xSize = 100;
const ySize = 150;

const NEW_MODEL = false;

const toString = ["TREBLE CLEF", "BASS CLEF", "ALTO CLEF", "C3", "D3", "E3", "F3", "G3", "A3", "B3"];

let features;
let knn;
let data_to_train = "";

function setup(){
	// GRAPHICS ----
	cnv = createCanvas(xSize, ySize);
	cnv.parent("conteneur");
	cnv.style("border", "solid");
	background(255);
	createMusic();

	// NEURAL NETWORK
	features = ml5.featureExtractor('MobileNet', modelReady);
	knn = ml5.KNNClassifier();
	console.log("Neural network initialized");
}


function draw() {
	data_to_train = document.getElementById("select_item").value;
	is_training = document.getElementById("to_train").checked;
	if (mouseIsPressed === true) {
		line(mouseX, mouseY, pmouseX, pmouseY);
    }
}

function createMusic() {
	stroke(0);
	strokeWeight(2);
	const gap = 20;
	const begin = 10
	for(var i = 0 ; i < 5 ; i++){
		line(10, begin + i*gap + gap, xSize - 10, begin + i*gap + gap);
	}
}


function modelReady() {
  if(!NEW_MODEL){
  		document.getElementById("to_train").checked = false;
		knn.load('model.json', function() {
			console.log('KNN loaded');
		});
	}

	else{
		document.getElementById("to_train").checked = true;
	}

	console.log("MODEL INITIALZED"); 
}

function gotResult(error, result){
	if(error){
		console.log(error);
		return;
	}
	if(NEW_MODEL){
		console.log(toString[result.classIndex]);
	}
	else{
		console.log(toString[parseInt(result.label)]);
	}
} 



function mouseReleased(){
	if(knn.getNumLabels() > 0 && !is_training){
		const logits = features.infer(cnv);
		knn.classify(logits, gotResult);
		background(255);
		createMusic();
	}
}




function keyPressed(){
	const logits = features.infer(cnv);

	if(key == 't'){
		knn.addExample(logits, data_to_train);
		console.log(data_to_train);
	}

	else if(key == 'z'){
		console.log("Cancel input");
	}

	else if(key == 's'){
		knn.save("model.json")
	}


	background(255);
	createMusic();


}
