function generateTerrain(canvas, context, settings){

	var {
		haze,
		terrainPoints,
		smoothness,
		c0,
		ruggedness,
		scale,
		snow,
		snowness,
		hillshadeIntensity
		
	} = settings;

	smoothness = smoothness * scale;
	snowness = snowness / scale;
	
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
		
		var averagingWidth = ~~(radius * 2);

		if(averagingWidth > 0){

			var newTerrainPoints = [];
			
			var sum = 0;

			for(var i = terrainPoints.length - averagingWidth; i < terrainPoints.length; i++){
				sum += terrainPoints[i];
			}
			
			for(var i = 0; i < terrainPoints.length; i++){
				sum = sum - terrainPoints[(i - averagingWidth + terrainPoints.length) % terrainPoints.length] + terrainPoints[i];
				newTerrainPoints[i] = sum / averagingWidth;
			}

			terrainPoints = newTerrainPoints;
		}
		
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

		c0 = "rgb("+c0[0]+", "+c0[1]+", "+c0[2]+")";
		
		context.fillStyle = c0;
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

				var height = above + 1;

				height = height + (noise.simplex2(x/(200*scale), y/(200*scale))*0.4);

				heightmap[i] = height;
			} else {
				heightmap[i] = 0;
			}
		}

		// Smoothen it out
		
		var radius = ~~(smoothness/8);
		var averagingWidth = 2*radius+1;

		if(averagingWidth > 0){

			var smoothHeightmap = new Float32Array(canvas.width * canvas.height);
			var sum = 0;
			
			for(var y = 0; y < canvas.height; y++){

				sum = 0;
				var h = y * canvas.width;

				for(var x = 0 - radius; x <= radius; x++){
					sum += heightmap[h + (x + canvas.width) % canvas.width];
				}

				for(var x = 0; x < canvas.width; x++){
					
					sum = sum - heightmap[h + (x - radius + canvas.width) % canvas.width]
							  + heightmap[h + (x + radius + 1 + canvas.width) % canvas.width];
					smoothHeightmap[h+x] = sum / averagingWidth;
				}
				
			}

			heightmap.set(smoothHeightmap);
		}

		generateHillshade(heightmap);
	}

	function generateHillshade(heightmap){

		var hillshadeImage = context.getImageData(0, 0, canvas.width, canvas.height);

		var radius = ~~(2/scale);
		var averagingWidth = 2*radius+1;

		for(var y = 0; y < canvas.height; y++){

			var sum = 0;
			var h = y * canvas.width;

			for(var x = 0 - radius; x <= radius; x++){
				sum += heightmap[h + (x + canvas.width) % canvas.width];
			}

			for(var x = 0; x < canvas.width; x++){

				var i = h+x;

				var average = 0;

				if(averagingWidth > 0){
					average = sum / averagingWidth;
					sum = sum - heightmap[h + (x - radius + canvas.width) % canvas.width]
							  + heightmap[h + (x + radius + 1 + canvas.width) % canvas.width];
				} else {
					average = heightmap[i];
				}
			
				if(heightmap[h+x] != 0){
					
					if(snow){
						if(heightmap[i] < average*(1+snowness/100)){
							hillshadeImage.data[i*4  ] = 200;
							hillshadeImage.data[i*4+1] = 200;
							hillshadeImage.data[i*4+2] = 210;
						}
					} else {
						var n = noise.simplex2(x/(20*scale), y/(10*scale)) * 0.7;
						n = n * scale;
						
						if(heightmap[i] + n < average*(1+snowness/(100))){
							hillshadeImage.data[i*4  ] = 140 + n*50;
							hillshadeImage.data[i*4+1] = 140 + n*50;
							hillshadeImage.data[i*4+2] = 130 + n*50;
						}
					}

					var grade = 0;
					if(x != 0){
						grade = heightmap[i] - heightmap[h+(x-1+canvas.width)%canvas.width];
					}

					/*if(grade > 0){
						hillshadeImage.data[i*4  ] += 5;
						hillshadeImage.data[i*4+1] += 5;
						hillshadeImage.data[i*4+2] += 5;
					} else {
						hillshadeImage.data[i*4  ] -= 5;
						hillshadeImage.data[i*4+1] -= 5;
						hillshadeImage.data[i*4+2] -= 5;
					}*/
					
					grade = grade * (hillshadeIntensity/(scale+1));

					grade = (grade+5) * 30;

					grade = Math.min(255, grade);
					grade = Math.max(-255, grade);

					grade = 2*grade / 255 - 1;

					hillshadeImage.data[i*4  ] *= 1+grade;
					hillshadeImage.data[i*4+1] *= 1+grade;
					hillshadeImage.data[i*4+2] *= 1+grade;
					
				} else {
					hillshadeImage.data[i*4+3] = 0;
				}

			}
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



















