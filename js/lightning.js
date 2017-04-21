

function generateLightning(canvas, context, settings){

	var {scale, density} = settings;

	var width = 4;

	var generalDirection = Math.PI;
	
	context.strokeStyle = "rgba(255, 255, 255, 1)";
	context.lineJoin = "bevel";
	context.lineCap = "round";
	
	var xPos = ~~(Math.random() * canvas.width);
	var yPos = 0;


	generateBranch(xPos, yPos, 4, Math.PI, 200, 0.1);
	

	function generateBranch(xPos, yPos, width, generalDirection, ttl, branchProbability){
		context.lineWidth = width;

		context.moveTo(xPos, yPos);

		var i = 0;

		while(yPos < canvas.height && i < ttl){

			if(Math.random() < branchProbability){
				context.save();
				generateBranch(xPos, yPos, width/2, generalDirection + (Math.random()-0.5)*(Math.PI/2), ttl/2, branchProbability/2);
				context.restore();
			}

			context.beginPath();

			context.moveTo(xPos, yPos);
			
			xPos += (Math.random()-0.5+Math.sin(generalDirection)/2)*3*width;
			yPos += (Math.random()-0.5-Math.cos(generalDirection)/2)*3*width;
			
			context.lineTo(xPos, yPos);

			context.lineWidth = width;
			context.stroke();

			i++;
		}
	}
	
}
