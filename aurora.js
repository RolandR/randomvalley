

function generateAurora(canvas, context, settings){

	var {scale, intensity} = settings;

	intensity = 0.3;

	var lineLength = 30;

	var z = Math.random();
	var x = Math.random() - 0.5;
	var y = 0.3;

	var xSpeed = 0;
	var zSpeed = 0;

	var zoom = 1;

	var vanishX = canvas.width/2;
	var vanishY = -canvas.height*3;

	var horizon = -0.25;

	context.save();

	for(var i = 0; i < 1000; i++){

		var renderX = x / (z*zoom);
		var renderY = y / (z*zoom);

		renderX = ~~((renderX/2+0.5) * canvas.width) + 0.5;
		renderY = canvas.height - ~~((renderY/2+0.5+horizon) * canvas.height) + 0.5;

		console.log(renderX, renderY);
		console.log(canvas.width, canvas.height);

		var len = lineLength / (z*zoom);

		var distToVanish = Math.sqrt(Math.pow(renderX-vanishX, 2) + Math.pow(renderY-vanishY, 2));
		var toX = renderX-(renderX-vanishX)*(len/distToVanish);
		var toY = renderY-(renderY-vanishY)*(len/distToVanish);

		var gradient = context.createLinearGradient(renderX, renderY, toX, toY);
		/*gradient.addColorStop(0, "rgba(255, 0, 230, 0)");
		gradient.addColorStop(0.2, "rgba(255, 0, 230, "+(0.1*intensity)+")");
		gradient.addColorStop(0.5, "rgba(0, 255, 100, "+(0.2*intensity)+")");
		gradient.addColorStop(0.75, "rgba(0, 255, 100, "+(0.4*intensity)+")");
		gradient.addColorStop(0.9, "rgba(0, 255, 100, "+(1*intensity)+")");
		gradient.addColorStop(1, "rgba(0, 255, 100, 0)");*/

		gradient.addColorStop(1, "rgba(255, 0, 230, 0)");
		gradient.addColorStop(0.9, "rgba(255, 0, 230, "+(0.05*intensity)+")");
		gradient.addColorStop(0.75, "rgba(0, 255, 100, "+(0.1*intensity)+")");
		gradient.addColorStop(0.5, "rgba(0, 255, 100, "+(0.4*intensity)+")");
		gradient.addColorStop(0.2, "rgba(0, 255, 100, "+(1*intensity)+")");
		gradient.addColorStop(0, "rgba(0, 255, 100, 0)");
		context.strokeStyle = gradient;
		
		//context.strokeStyle = "rgb("+~~(Math.random()*256)+", "+~~(Math.random()*256)+", "+~~(Math.random()*256)+")";
		
		context.beginPath();
		context.moveTo(renderX, renderY);
		context.lineTo(toX, toY);
		context.stroke();

		do{
			xSpeed += (Math.random()-0.5)*0.1;
		} while(Math.abs(xSpeed) > 0.5)

		do{
			zSpeed += (Math.random()-0.5)*0.1;
		} while(Math.abs(zSpeed) > 0.5)

		x += xSpeed/canvas.width;
		z += zSpeed/canvas.width;

		//x += 1/canvas.width;
	}

	context.restore();

}
