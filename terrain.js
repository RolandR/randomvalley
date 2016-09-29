function generateTerrain(canvas, context, settings){

	var {
		haze,
		terrainPoints,
		smoothness,
		c0,
		ruggedness,
		scale
		
	} = settings;

	smoothness = smoothness * scale;
	
	var terrainBorders = [0, canvas.width];
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

	/*function erode(value, iterations){

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
	}*/

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

		context.fillStyle = "#FFFFFF";
		
		context.fill();

		generateHeightmap();
	}

	function generateHeightmap(){
		var image = context.getImageData(0, 0, canvas.width, canvas.height);

		var heightmap = new Float32Array(canvas.width * canvas.height);
		heightmap.fill(0);

		for(var i = 0; i < heightmap.length; i++){
			var x = i % canvas.width;
			var y = ~~(i / canvas.width);

			if(image.data[i*4+3] > 0){
				var above = 0;
				
				if(typeof image.data[i*4-canvas.width*4] == "undefined"){
					above = 0;
				} else if(image.data[i*4-canvas.width*4] == 0){
					above = 0;
				} else {
					above = heightmap[i-canvas.width];

					if(Math.random() < 0.6){
						var directionNoise =
							  noise.simplex2(x/(60*scale), y/(60*scale))
							* noise.simplex2(x/(300*scale), y/(300*scale));
							
						directionNoise += (heightmap[i-canvas.width-1] - heightmap[i-canvas.width+1])*0.1;

						directionNoise = Math.min(directionNoise, 0.5);
						directionNoise = Math.max(directionNoise, -0.5);
						
						if(x != 0){
							above = (above*(1-directionNoise) + heightmap[i-canvas.width-1]*(1+directionNoise)) / 2;
						}
						if(x != canvas.width){
							above = (above*(1+directionNoise) + heightmap[i-canvas.width+1]*(1-directionNoise)) / 2;
						}
					}
				}

				var height = above + (1/(scale*3));

				height = height + (noise.simplex2(x/70, y/70)*0.4);

				heightmap[i] = height;
			} else {
				heightmap[i] = 0;
			}
		}

		// Smoothen it out
		
		var smoothHeightmap = new Float32Array(canvas.width * canvas.height);
		for(var i = 0; i < heightmap.length; i++){
			var sum = 0;
			var radius = ~~(smoothness/4);
			for(var a = 0-radius; a <= radius; a++){
				if(typeof heightmap[i+a] == "undefined"/* || heightmap[i+a] == 0*/){
					sum += heightmap[i];
				} else {
					sum += heightmap[i+a];
				}
			}

			smoothHeightmap[i] = sum / (radius*2+1);
		}

		heightmap.set(smoothHeightmap);

		generateHillshade(heightmap);
	}

	function generateHillshade(heightmap){
		var hillshadeCanvas = document.createElement("canvas");
		hillshadeCanvas.width = canvas.width;
		hillshadeCanvas.height = canvas.height;
		var hillshadeContext = hillshadeCanvas.getContext("2d");

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
		hillshadeContext.fillStyle = gradient;
		hillshadeContext.fillRect(0, 0, hillshadeCanvas.width, hillshadeCanvas.height);

		var hillshadeImage = hillshadeContext.getImageData(0, 0, canvas.width, canvas.height);

		for(var i = 0; i < heightmap.length; i++){

			if(heightmap[i] != 0){
				var x = i % canvas.width;
				var y = ~~(i / canvas.width);

				var grade = 0;
				if(x != 0){
					grade = heightmap[i] - heightmap[i-1];
				}

				grade = (grade+5) * 30;

				grade = Math.min(255, grade);
				grade = Math.max(-255, grade);

				grade = 2*grade / 255 - 0.5;

				hillshadeImage.data[i*4  ] *= grade;
				hillshadeImage.data[i*4+1] *= grade;
				hillshadeImage.data[i*4+2] *= grade;
				
			} else {
				hillshadeImage.data[i*4+3] = 0;
			}

			/*hillshadeImage.data[i*4  ] = heightmap[i];
			hillshadeImage.data[i*4+1] = heightmap[i];
			hillshadeImage.data[i*4+2] = heightmap[i];*/
		}

		context.putImageData(hillshadeImage, 0, 0);
	}

	function generateStep(){
		while(terrainPoints.length < terrainWidth){
			addTerrainPoints();
		}
	}

	return terrainPoints;

}



















