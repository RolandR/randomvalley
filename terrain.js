function generateTerrain(canvas, context, settings){

	var {haze, terrainPoints, smoothness, c0} = settings;
	
	var terrainBorders = [0, canvas.width];
	var ruggedness = 1; // lower for smoother terrain, higher for more extreme
	var terrainWidth = Math.abs(terrainBorders[0] - terrainBorders[1]);

	generateStep();
	smooth(smoothness);
	render();
	//erode(0, 0);

	function addTerrainPoints(){

		var oldPointCount = terrainPoints.length;
		var i = oldPointCount - 1;
		
		while(i--){
			var point = (terrainPoints[i+1] + terrainPoints[i])/2;
			point += ruggedness * ((Math.random()-0.5) * (terrainWidth / oldPointCount));
			terrainPoints.splice(i+1, 0, point);
		}
	}

	function smooth(radius){
		var newTerrainPoints = [];
		for(var i = 0; i < terrainPoints.length; i++){
			var sum = 0;
			for(var a = 0-radius; a <= radius; a++){
				if(typeof terrainPoints[i+a] == "undefined"){
					sum += terrainPoints[i];
				} else {
					sum += terrainPoints[i+a];
				}
			}

			newTerrainPoints[i] = sum / (radius*2+1);
		}

		terrainPoints = newTerrainPoints;

		//console.log(terrainPoints.length, newTerrainPoints.length);
	}

	function erode(value, iterations){

		var len = terrainPoints.length;

		var peaks = [];
		
		for(var i = 0; i < terrainPoints.length; i++){
			if(terrainPoints[i] <= terrainPoints[(len+i-1) % len] && terrainPoints[i] <= terrainPoints[(len+i+1) % len]){
				peaks.push(i);
			}
		}

		for(var i in peaks){
			context.beginPath();
			context.moveTo(
				(peaks[i]/(len)) * canvas.width,
				0
			);
			context.lineTo(
				(peaks[i]/(len)) * canvas.width,
				canvas.height
			);
			context.stroke();
		}
	}

	function render(){
		
		var i = terrainPoints.length;
		
		context.beginPath();
		context.moveTo(
			terrainBorders[0],
			terrainPoints[0]
		);
		
		context.lineTo(
			terrainBorders[0],
			canvas.height
		);
		
		context.lineTo(
			terrainWidth + terrainBorders[0],
			canvas.height
		);
		
		context.lineTo(
			terrainWidth + terrainBorders[0],
			terrainPoints[terrainPoints.length-1]
		);
		
		while(i--){
			context.lineTo(
				((i-1)/(terrainPoints.length-1)) * terrainWidth + terrainBorders[0],
				terrainPoints[i-1]
			);
		}
		context.closePath();
		
		var c1 = [];
		
		for(var i in c0){
			c1[i] = c0[i] - 20;
		}
		
		var cHaze = [230, 235, 255];

		for(var i in c0){
			c0[i] = (c0[i] + haze*cHaze[i]) / (1+haze);
			c0[i] = ~~Math.min(c0[i], 255);
		}
		for(var i in c1){
			c1[i] = (c1[i] + haze*cHaze[i]) / (1+haze);
			c1[i] = ~~Math.min(c1[i], 255);
		}

		c0 = "rgb("+c0[0]+", "+c0[1]+", "+c0[2]+")";
		c1 = "rgb("+c1[0]+", "+c1[1]+", "+c1[2]+")";

		var gradient = context.createLinearGradient(0, 0, 0, canvas.height);
		gradient.addColorStop(0, c0);
		gradient.addColorStop(1, c1);
		context.fillStyle = gradient;

		context.strokeStyle = "#113300";
		context.lineWidth = 2;
		//context.stroke();
		
		context.fill();
	}

	function generateStep(){
		while(terrainPoints.length < terrainWidth){
			addTerrainPoints();
		}
	}

	return terrainPoints;

}



















