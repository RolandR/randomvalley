

function generateRain(canvas, context, settings){

	var {intensity, scale, farAway} = settings;

	if(!farAway){

	var count = 1000 * intensity * scale * scale;

	context.beginPath();
	context.strokeStyle = "rgba(180, 180, 180, 0.8)";
	context.lineWidth = 0.5;

	for(var i = 0; i < count; i++){

		var posX = ~~(Math.random() * canvas.width)+0.5;
		var posY = ~~(Math.random() * canvas.height)+0.5;
		context.moveTo(posX, posY);
		context.lineTo(posX + 2, posY + 5);
		context.stroke();
	}

	} else {
		var cirrusCanvas = document.createElement("canvas");
		cirrusCanvas.width = canvas.width;
		cirrusCanvas.height = canvas.height;
		var cirrusContext = cirrusCanvas.getContext("2d");
		
		cirrusContext.fillStyle = "rgba(180, 180, 180, 0.2)";
		cirrusContext.fillRect(0, 0, cirrusCanvas.width, cirrusCanvas.height);

		var image = cirrusContext.getImageData(0, 0, cirrusCanvas.width, cirrusCanvas.height);

		var dimXa = 3*100*scale;
		var dimYa = 3*70*scale;

		var dimXb = 11*100*scale;
		var dimYb = 11*70*scale;

		for(var i = 0; i < image.data.length; i+=4){
			var x = (i/4) % cirrusCanvas.width;
			var y = ~~((i/4) / cirrusCanvas.width);

			if(x > cirrusCanvas.width/2){
				x = cirrusCanvas.width - x;
			}
			if(y > cirrusCanvas.height/2){
				y = cirrusCanvas.height - y;
			}

			var lightness = (noise.simplex2((x+dimXa/10)/dimXa, (y+dimYa/10)/dimYa)/2+0.5)*30+230;

			image.data[i] *= 255/lightness;
			image.data[i+1] *= 255/lightness;
			image.data[i+2] *= 255/lightness;

			var opacity = (noise.simplex2(x/dimXa, y/dimYa)/2+0.5);
			opacity = opacity * (noise.simplex2(x/dimXb, y/dimYb)/2+0.5);
			
			image.data[i+3] = opacity * 255;
		}

		cirrusContext.putImageData(image, 0, 0);

		context.drawImage(cirrusCanvas, 0, 0);
	}

}
