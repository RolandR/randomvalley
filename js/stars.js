

function generateStars(canvas, context, settings){

	var {scale, density, intensity} = settings;

	for(var i = 0; i < 800; i++){
		context.beginPath();
		var brightness = Math.pow(Math.random(), 1) * intensity;
		if(brightness < 0.05){
			brightness = 0.05;
		}
		context.strokeStyle = "rgba(255, 255, 255, "+brightness+")";
		var xPos = ~~(Math.random() * canvas.width);
		var yPos = ~~(Math.random() * canvas.height);
		context.moveTo(xPos, yPos);
		context.lineTo(xPos+1, yPos+1);
		context.stroke();
	}
	
}
