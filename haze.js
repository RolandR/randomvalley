

function generateHaze(canvas, context, settings){

	var {intensity, scale, hazeColor} = settings;

	var gradient = context.createLinearGradient(0, 0, 0, canvas.height);

	// var hazeColor = "255, 230, 200"; // Evening red
	// var hazeColor = "0, 0, 0";
	//var hazeColor = "230, 240, 255";
	
	gradient.addColorStop(0, "rgba("+hazeColor+", "+intensity/2+")");
	gradient.addColorStop(1, "rgba("+hazeColor+", "+intensity+")");
	context.fillStyle = gradient;

	context.fillRect(0, 0, canvas.width, canvas.height);

}
