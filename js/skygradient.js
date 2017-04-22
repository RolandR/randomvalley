

function generateSkyGradient(canvas, context, imageWidth, imageHeight, settings){

	var {scale, skyBrightness} = settings;
	
	context.fillStyle = "#295a97";
	//context.fillStyle = "#7699c1";

	context.fillRect(0, 0, imageWidth, imageHeight);

	context.fillStyle = "rgba(0, 0, 0, "+(1-skyBrightness)+")";
	context.fillRect(0, 0, imageWidth, imageHeight);

}
