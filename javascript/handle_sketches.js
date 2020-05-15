function save_sketch() {
	if(is_learning == ""){
		$('.toast').toast('show');
		return;
	}

	loadPixels();
	var this_sketch = [];
	for(y = 0 ; y < YSIZE ; y++){
		for(x = 0 ; x < XSIZE ; x++){
			var index = (x + y * XSIZE) * 4;
			this_sketch.push(pixels[index + 1]);
		}
	}

	sketches.push(this_sketch);
	background(255);
	image(img, 0, 0);

	console.log(sketches);
}
