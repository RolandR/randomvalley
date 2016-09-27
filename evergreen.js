

function generateEvergreen(canvas, context){

	function r(factor){
		return (Math.random()-0.5) * h * factor;
	}

	context.clearRect(0, 0, canvas.width, canvas.height);

	context.save();

	var scale = 2;
	
	var segments = 5;
	var stem = [7*scale, 15*scale, 30*scale]; // base width, first branches, tip height

	var maxSway = Math.PI / 160;
	var swayFrequency = 1000;

	var cx = ~~(canvas.width/2);
	var cy = ~~(3*canvas.height/4);
	
	var x = cx;
	var y = cy - segments * 3*scale - 5*scale - stem[1];

	context.lineJoin = "bevel";

	context.translate(cx, cy);
	context.rotate(maxSway * Math.sin(window.performance.now() / swayFrequency));
	context.translate(-cx, -cy);

	var gradient = context.createLinearGradient(cx - stem[0]/2, 0 ,cx + stem[0]/2, 0);
	gradient.addColorStop(0, "#504422");
	gradient.addColorStop(0.3, "#706633");
	gradient.addColorStop(1, "#403311");
	context.fillStyle = gradient;

	context.beginPath();
	context.moveTo(cx - stem[0]/2, cy);
	context.lineTo(cx, cy - stem[2]);
	context.lineTo(cx + stem[0]/2, cy);
	context.quadraticCurveTo(cx, cy+stem[0]/3, cx - stem[0]/2, cy);
	context.fill()

	context.strokeStyle = "#111100";
	context.stroke();

	context.strokeStyle = "#001100";

	for(var i = segments; i > 0; i--){

		h = i * 3*scale + 5*scale;

		context.translate(x, y+h);
		context.rotate(maxSway * Math.sin(window.performance.now() / swayFrequency));
		context.translate(-x, -y-h);
		
		w = h;

		var points = [];

		context.beginPath();

		var top = [
			 x + r(0.1)
			,y + r(0.1)
		];
		
		context.moveTo(
			 top[0]
			,top[1]
		);
		context.quadraticCurveTo(
			 x-w/3 + r(0.2)
			,y+h + r(0.2)
			,x-w + r(0.2)
			,y+3*h/2 + r(0.2)
		);
		context.quadraticCurveTo(
			 x + r(0.2)
			,y+h + r(0.2)
			,x+w + r(0.2)
			,y+3*h/2 + r(0.2)
		);
		context.quadraticCurveTo(
			 x+w/3 + r(0.2)
			,y+h + r(0.2)
			,top[0]
			,top[1]
		);

		var gradient = context.createLinearGradient(cx,y,cx+3*scale,y+3*h/2);
		gradient.addColorStop(0.2, "#558833");
		gradient.addColorStop(1, "#223300");
		context.fillStyle = gradient;
		
		context.fill();
		context.stroke();

		y = y - h * 0.4;
	}

	context.restore();

}


