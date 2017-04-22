

function generateStars(canvas, context, imageWidth, imageHeight, settings){
	
	var {scale, density, intensity} = settings;

	context.clearRect(0, 0, imageWidth, imageHeight);

	for(var i = 0; i < 2000; i++){
		var brightness = Math.pow(Math.random(), 1) * intensity;
		if(brightness < 0.05){
			brightness = 0.05;
		}
		context.fillStyle = "rgba(255, 255, 255, "+brightness+")";
		var xPos = ~~(Math.random() * imageWidth);
		var yPos = ~~(Math.random() * imageHeight);
		context.fillRect(xPos, yPos, 1, 1);
	}
	
}
