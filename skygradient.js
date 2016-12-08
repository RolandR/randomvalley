

function generateSkyGradient(canvas, context, settings){

	var {scale, skyBrightness} = settings;
	
	context.fillStyle = "#295a97";
	//context.fillStyle = "#7699c1";

	context.fillRect(0, 0, canvas.width, canvas.height);

	context.fillStyle = "rgba(0, 0, 0, "+(1-skyBrightness)+")";
	context.fillRect(0, 0, canvas.width, canvas.height);

}
