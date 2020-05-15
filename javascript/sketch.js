const XSIZE = 100;
const YSIZE = 150;

var is_learning = "";
var prec_is_learning = "";

var sketches = [];
var empty_sketch = []



function init_interaction(){

	// ENTER KEY
	window.addEventListener("keyup", function(event) {
		if (event.keyCode === 13) {
			save_sketch();
			}

		if (event.keyCode === 46) {
			background(255);
			image(img, 0, 0);
			}
	});

	// Submit button to create a sketch
	$('#submit_sketch').click(function(){
		save_sketch();
	});

	// Select element
	$('.example_buttons').on('click', function(event){
		if(is_learning != event.target.id) {
			prec_is_learning = is_learning;
			is_learning = event.target.id;
		}
		else{
			is_learning = "";
		}
		enhance(is_learning, prec_is_learning);
	});


	// Send data
	$('#send_button').click(function(){
		send_data();
	});

}

function enhance(id){
	if(prec_is_learning != ""){
		var parent_prec = $('#' + prec_is_learning).parent();
		parent_prec.css("background-color", "");
		parent_prec.css("width", "");
		parent_prec.css("height", "");
	}

	if(id == ""){return;}

	var parent = $('#' + id).parent();
	parent.css("background-color", "rgba(0,150,0,0.2)");
	parent.css("width", "110px");
	parent.css("height", "165px");

}


// ================= P5.js CODE ======================
function preload() {
  img = loadImage('../static/images/score.png');
}

function setup(){
	cnv = createCanvas(XSIZE, YSIZE);
	cnv.parent("sketch");
	background(255);
	// image(img, 0, 0);
	createMusic();

	loadPixels();
	for(y = 0 ; y < YSIZE ; y++){
		for(x = 0 ; x < XSIZE ; x++){
			var index = (x + y * XSIZE) * 4;
			empty_sketch.push(pixels[index + 1]);
		}
	}

}


function draw() {
	strokeWeight(2);
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
		line(10, begin + i*gap + gap, XSIZE - 10, begin + i*gap + gap);
	}
}
