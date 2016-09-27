function generateTerrain(canvas, context){

	var terrainPoints = [canvas.height/4, 3*canvas.height/4, canvas.height/4];
	var terrainBorders = [0, canvas.width];
	var ruggedness = 1; // lower for smoother terrain, higher for more extreme
	var terrainWidth = Math.abs(terrainBorders[0] - terrainBorders[1]);

	generateStep();
	smooth(200);
	render();

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

		var gradient = context.createLinearGradient(0, 0, 0, canvas.height);
		gradient.addColorStop(0, "#819e3b");
		gradient.addColorStop(1, "#62782d");
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



















