var canvas = document.getElementById("renderCanvas");
var context = canvas.getContext("2d");

context.imageSmoothingEnabled = false;

var width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
var height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

canvas.width = width/3;
canvas.height = height/3;

//generateTerrain(canvas, context);

//setInterval(function(){
	generateEvergreen(canvas, context);
	render8bit();
//}, 1/60);


function render8bit(){
	var image = context.getImageData(0, 0, canvas.width, canvas.height);

	var colorResolution = 16;

	for(var i = 0; i < image.data.length; i += 4){
		
		image.data[i  ] += (Math.random()-0.5)*10;
		image.data[i+1] += (Math.random()-0.5)*10;
		image.data[i+2] += (Math.random()-0.5)*10;
		
		image.data[i  ] = colorResolution * Math.round(image.data[i  ]/colorResolution);
		image.data[i+1] = colorResolution * Math.round(image.data[i+1]/colorResolution);
		image.data[i+2] = colorResolution * Math.round(image.data[i+2]/colorResolution);

		image.data[i+3] = image.data[i+3] > 150 ? 255 : 0;
	};

	context.putImageData(image, 0, 0);
}