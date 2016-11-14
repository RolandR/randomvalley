

function generateSkyGradient(canvas, context, settings){

	var {scale, intensity, cirrusColor} = settings;

	var gradient = context.createLinearGradient(0, 0, 0, 2*canvas.height/3);
	gradient.addColorStop(0, "#7699c1");
	gradient.addColorStop(0.25, "#8ab0d7");
	gradient.addColorStop(0.75, "#a9c9f0");
	gradient.addColorStop(1, "#e6f5fc");
	context.fillStyle = gradient;

	context.fillRect(0, 0, canvas.width, canvas.height);

	generateCirrus();


	function generateCirrus(){
		var cirrusCanvas = document.createElement("canvas");
		cirrusCanvas.width = canvas.width;
		cirrusCanvas.height = canvas.height;
		var cirrusContext = cirrusCanvas.getContext("2d");
		
		cirrusContext.fillStyle = cirrusColor;
		cirrusContext.fillRect(0, 0, cirrusCanvas.width, cirrusCanvas.height);

		var image = cirrusContext.getImageData(0, 0, cirrusCanvas.width, cirrusCanvas.height);

		var dimXa = 100*scale;
		var dimYa = 70*scale;

		var dimXb = 4*100*scale;
		var dimYb = 4*70*scale;

		for(var i = 0; i < image.data.length; i+=4){
			var x = (i/4) % cirrusCanvas.width;
			var y = ~~((i/4) / cirrusCanvas.width);

			var lightness = (noise.simplex2((x+dimXa/10)/dimXa, (y*(1+y/(200*scale))+dimYa/10)/dimYa)/2+0.5)*30+230;

			image.data[i] *= 255/lightness;
			image.data[i+1] *= 255/lightness;
			image.data[i+2] *= 255/lightness;

			var opacity = (noise.simplex2(x/dimXa, (y*(1+y/(200*scale)))/dimYa)/2+0.5);
			
			opacity = opacity * (noise.simplex2(x/dimXb, (y*(1+y/(200*scale)))/dimYb)/2+0.5);
			image.data[i+3] = opacity * 255 - y/(2*scale);
		}

		cirrusContext.putImageData(image, 0, 0);

		context.drawImage(cirrusCanvas, 0, 0);
	}

}