

function generateSkyGradient(canvas, context){

	var gradient = context.createLinearGradient(0, 0, 0, 2*canvas.height/3);
	gradient.addColorStop(0, "#7699c1");
	gradient.addColorStop(0.25, "#8ab0d7");
	gradient.addColorStop(0.75, "#a9c9f0");
	gradient.addColorStop(1, "#e6f5fc");
	context.fillStyle = gradient;

	context.fillRect(0, 0, canvas.width, canvas.height);

}