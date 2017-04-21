

function generateStars(canvas, context, settings){

	var {scale, density, intensity} = settings;

	for(var i = 0; i < 800; i++){
		var brightness = Math.pow(Math.random(), 1) * intensity;
		if(brightness < 0.05){
			brightness = 0.05;
		}
		context.fillStyle = "rgba(255, 255, 255, "+brightness+")";
		var xPos = ~~(Math.random() * canvas.width);
		var yPos = ~~(Math.random() * canvas.height);
		context.fillRect(xPos, yPos, 1, 1);
	}
	
}
