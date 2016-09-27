

function generateSkyGradient(canvas, context, settings){

	var {scale, intensity} = settings;

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
		
		cirrusContext.fillStyle = "#FFFFFF";
		cirrusContext.fillRect(0, 0, cirrusCanvas.width, cirrusCanvas.height);

		var image = cirrusContext.getImageData(0, 0, cirrusCanvas.width, cirrusCanvas.height);

		for(var i = 0; i < image.data.length; i+=4){
			var x = (i/4) % cirrusCanvas.width;
			var y = ~~((i/4) / cirrusCanvas.width);

			var dimX = 100*scale;
			var dimY = 70*scale;

			//noise.seed(Math.random());

			var lightness = (noise.simplex2((x+dimX/10)/dimX, (y*(1+y/(200*scale))+dimY/10)/dimY)/2+0.5)*30+230;

			image.data[i] = lightness;
			image.data[i+1] = lightness;
			image.data[i+2] = lightness;

			var opacity = (noise.simplex2(x/dimX, (y*(1+y/(200*scale)))/dimY)/2+0.5);

			dimX = 4*100*scale;
			dimY = 4*70*scale;
			opacity = opacity * (noise.simplex2(x/dimX, (y*(1+y/(200*scale)))/dimY)/2+0.5);
			image.data[i+3] = opacity * 255 - y/(2*scale);
		}

		cirrusContext.putImageData(image, 0, 0);

		context.drawImage(cirrusCanvas, 0, 0);
	}

}