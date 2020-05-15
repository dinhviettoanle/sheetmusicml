const XSIZE = 100;
const YSIZE = 150;

var is_learning = "";

var sketches = [];



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

	// Submit button
	$('#submit_sketch').click(function(){
		save_sketch();
		background(255);
		image(img, 0, 0);
	});

	// Select element
	$('.example_buttons').on('click', function(event){
		if(is_learning != event.target.id) {
			is_learning = event.target.id;
		}
		else{
			is_learning = "";
		}
		enhance(is_learning);
	});

}

function enhance(id){
	$('.example_buttons').css("background-color", "rgba(0,0,0,0.1)");
	$('.example_buttons').css("width", "100");
	$('.example_buttons').css("height", "150");

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
	image(img, 0, 0);
	// createMusic();
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
		line(10, begin + i*gap + gap, xSize - 10, begin + i*gap + gap);
	}
}
