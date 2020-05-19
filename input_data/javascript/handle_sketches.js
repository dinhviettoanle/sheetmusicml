var total_size = 0;

function save_sketch() {
	if(is_learning == ""){
		$('.toast').toast('show');
		return;
	}


	// TODO : Do something to minimize the length of all data

	loadPixels();
	var this_sketch = [];
	for(y = 0 ; y < YSIZE ; y++){
		for(x = 0 ; x < XSIZE ; x++){
			var index = (x + y * XSIZE) * 4;
			this_sketch.push(pixels[index + 3]);
		}
	}

	// saveCanvas(cnv, 'image', 'png');


	// Verify that the sketch is not empty
	is_empty = true;

	for(var i = 0 ; i < this_sketch.length ; i++){
		if (this_sketch[i] !== empty_sketch[i]){
			is_empty = false;
			break;
		}
	}


	if(is_empty){
		$('.toast').toast('show');
		return;
	}


	sketches.push({'sketch' : this_sketch, 'element' : is_learning});

	total_size += byteLength(JSON.stringify(this_sketch));

	$('#size_file').text(Math.round(total_size/1000).toString());
	clear();

}

function byteLength(str) {
  // returns the byte length of an utf8 string
  var s = str.length;
  for (var i=str.length-1; i>=0; i--) {
    var code = str.charCodeAt(i);
    if (code > 0x7f && code <= 0x7ff) s++;
    else if (code > 0x7ff && code <= 0xffff) s+=2;
    if (code >= 0xDC00 && code <= 0xDFFF) i--; //trail surrogate
  }
  return s;
}


function leading_zeros(n){
	return ('0' + n.toString()).slice(-2);
}

function send_data() {
	const json_file_content = JSON.stringify({'data' : sketches, 'total' : sketches.length});
	var now = new Date(Date.now());
	var date = leading_zeros(now.getDate());
	var month = leading_zeros(now.getMonth());
	var year = now.getFullYear();
	var hours = leading_zeros(now.getHours());
	var minutes = leading_zeros(now.getMinutes());
	var seconds = leading_zeros(now.getSeconds());

	var name_file = `${year}${month}${date}${hours}${minutes}${seconds}.json`;
	download(name_file, json_file_content);
	sketches = [];
}




function download(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}
