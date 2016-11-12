
buildLandscape();

function buildLandscape(){

	var canvas = document.getElementById("renderCanvas");
	var context = canvas.getContext("2d");

	var preCanvas = document.getElementById("prerenderCanvas");
	var preContext = preCanvas.getContext("2d");

	context.imageSmoothingEnabled = false;

	var width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
	var height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

	var scale = 1/3;

	/*
	/Night
	var sunBrightness = 0.3;
	var lightColor = [120, 130, 140];
	var hazeColor = "100, 110, 120";*/

	/*
	// Morning
	var sunBrightness = 0.5;
	var lightColor = [240, 200, 180];
	var hazeColor = "255, 230, 200";*/
	
	
	// Day
	var sunBrightness = 1;
	var lightColor = [255, 255, 255];
	var hazeColor = "230, 240, 255";

	var hazeIntensity = 1;

	canvas.width = width*scale;
	canvas.height = height*scale;
	preCanvas.width = width*scale;
	preCanvas.height = height*scale;

	generateSkyGradient(preCanvas, preContext, {
		 scale: scale
		,intensity: 1
	});

	generateHaze(preCanvas, preContext, {intensity: 0.8 * hazeIntensity, scale: scale, hazeColor: hazeColor});
	render8bit();
	
	for(var i = 0; i < ~~(Math.random()*2); i++){
		generateCloud(preCanvas, preContext, {
			 cx: Math.random() * canvas.width
			,cy: Math.random() * canvas.height/2
			,count: 3 + ~~(Math.random()*5)
			,initialRadius: 60*scale
		});
	}
	generateHaze(preCanvas, preContext, {intensity: 1.2 * hazeIntensity, scale: scale, hazeColor: hazeColor});
	render8bit();

	/*generateHouse(preCanvas, preContext, {scale: scale});
	render8bit();*/

	//return;

	generateTerrain(preCanvas, preContext, {
		 haze: 0.7
		,terrainPoints: [canvas.height/4 - Math.random()*30, Math.random() * canvas.height/4 + canvas.height/4, canvas.height/4 - Math.random()*30]
		,smoothness: 0
		,c0: [100, 100, 100]
		,ruggedness: 0.5
		,scale: scale*2
		,snow: true
		,snowness: 0.6
		,hillshadeIntensity: 5 * sunBrightness
	});
	

	generateHaze(preCanvas, preContext, {intensity: 1.2 * hazeIntensity, scale: scale, hazeColor: hazeColor});
	render8bit();

	for(var i = 0; i < ~~(Math.random()*2); i++){
		generateCloud(preCanvas, preContext, {
			 cx: Math.random() * canvas.width
			,cy: Math.random() * canvas.height/2
			,count: 3 + ~~(Math.random()*5)
			,initialRadius: 60*scale
		});
	}
	generateHaze(preCanvas, preContext, {intensity: 0.8 * hazeIntensity, scale: scale, hazeColor: hazeColor});
	render8bit();

	generateTerrain(preCanvas, preContext, {
		 haze: 0.7
		,terrainPoints: [canvas.height/4, Math.random() * canvas.height/4 + canvas.height/4, canvas.height/4]
		,smoothness: 0
		,c0: [100, 100, 100]
		,ruggedness: 0.5
		,scale: scale*1.5
		,snow: true
		,snowness: 0.2
		,hillshadeIntensity: 4 * sunBrightness
	});
	

	generateHaze(preCanvas, preContext, {intensity: 0.8 * hazeIntensity, scale: scale, hazeColor: hazeColor});
	render8bit();

	for(var i = 0; i < ~~(Math.random()*2); i++){
		generateCloud(preCanvas, preContext, {
			 cx: Math.random() * canvas.width
			,cy: Math.random() * canvas.height/2
			,count: 3 + ~~(Math.random()*5)
			,initialRadius: 60*scale
		});
	}
	generateHaze(preCanvas, preContext, {intensity: 0.8 * hazeIntensity, scale: scale, hazeColor: hazeColor});
	render8bit();

	generateTerrain(preCanvas, preContext, {
		 haze: 0.7
		,terrainPoints: [canvas.height/4 + Math.random()*50, Math.random() * canvas.height/4 + canvas.height/4, canvas.height/4 + Math.random()*50]
		,smoothness: 0
		,c0: [100, 100, 100]
		,ruggedness: 0.5
		,scale: scale
		,snow: true
		,snowness: 0.1
		,hillshadeIntensity: 3 * sunBrightness
	});
	

	generateHaze(preCanvas, preContext, {intensity: 0.4 * hazeIntensity, scale: scale, hazeColor: hazeColor});
	render8bit();

	for(var i = 0; i < ~~(Math.random()*2); i++){
		generateCloud(preCanvas, preContext, {
			 cx: Math.random() * canvas.width
			,cy: Math.random() * canvas.height/2
			,count: 3 + ~~(Math.random()*5)
			,initialRadius: 60*scale
		});
	}
	generateHaze(preCanvas, preContext, {intensity: 0.3 * hazeIntensity, scale: scale, hazeColor: hazeColor});
	render8bit();

	//return;
	
	generateTerrain(preCanvas, preContext, {
		 haze: 0.5
		,terrainPoints: [canvas.height/2, 2*canvas.height/3, canvas.height/2]
		,smoothness: 100
		,c0: [115, 121, 80]
		,ruggedness: 0.5
		,scale: scale
		,snow: false
		,snowness: -0.2
		,hillshadeIntensity: 1 * sunBrightness
	});
	

	generateHaze(preCanvas, preContext, {intensity: 0.2 * hazeIntensity, scale: scale, hazeColor: hazeColor});
	render8bit();

	var terrain = generateTerrain(preCanvas, preContext, {
		 haze: 0
		,terrainPoints: [4*canvas.height/5, 5*canvas.height/6, 4*canvas.height/5]
		,smoothness: 300
		,c0: [126, 154, 70]
		,ruggedness: 0.3
		,scale: scale
		,snow: false
		,hillshadeIntensity: 1 * sunBrightness
	});
	generateHaze(preCanvas, preContext, {intensity: 0.1 * hazeIntensity, scale: scale, hazeColor: hazeColor});
	render8bit();

	return;

	var nextTree = 0;
	for(var i = ~~(terrain.length/5); i < terrain.length/2; i++){
		if(nextTree <= 0){
			generateEvergreen(preCanvas, preContext, {
				 cx: (i)/(terrain.length) * preCanvas.width
				,cy: terrain[i] + Math.random()*2
				,segments: ~~(Math.random()*3 + 2)
				,scale: Math.random()*1.2*scale + 1.6*scale
			});
			render8bit();

			nextTree = Math.random() * 100 * scale + 20 * scale;
		}
		nextTree--;
	}


	function render8bit(){
		
		var image = preContext.getImageData(0, 0, preCanvas.width, preCanvas.height);

		var colorResolution = 16;

		var lightColorR = lightColor[0]/255;
		var lightColorG = lightColor[1]/255;
		var lightColorB = lightColor[2]/255;

		for(var i = 0; i < image.data.length; i += 4){

			if(image.data[i+3] > 220){

				var variance = (Math.random()-0.5)*10;

				image.data[i  ] *= lightColorR;
				image.data[i+1] *= lightColorG;
				image.data[i+2] *= lightColorB;
				
				image.data[i  ] += variance;
				image.data[i+1] += variance;
				image.data[i+2] += variance;
				
				image.data[i  ] = colorResolution * Math.round(image.data[i  ]/colorResolution);
				image.data[i+1] = colorResolution * Math.round(image.data[i+1]/colorResolution);
				image.data[i+2] = colorResolution * Math.round(image.data[i+2]/colorResolution);

				image.data[i+3] = 255;

			} else {
				image.data[i+3] = 0;
			}
		};

		preContext.putImageData(image, 0, 0);
		context.drawImage(preCanvas, 0, 0);

		preContext.clearRect(0, 0, preCanvas.width, preCanvas.height);
		
	}

	/*function renderTransparent8bit(){
		var image = preContext.getImageData(0, 0, preCanvas.width, preCanvas.height);

		var colorResolution = 16;

		for(var i = 0; i < image.data.length; i += 4){

				var variance = (Math.random()-0.5)*10;
				
				image.data[i  ] += variance;
				image.data[i+1] += variance;
				image.data[i+2] += variance;
				
				image.data[i  ] = colorResolution * Math.round(image.data[i  ]/colorResolution);
				image.data[i+1] = colorResolution * Math.round(image.data[i+1]/colorResolution);
				image.data[i+2] = colorResolution * Math.round(image.data[i+2]/colorResolution);
				
		};

		preContext.putImageData(image, 0, 0);
		context.drawImage(preCanvas, 0, 0);

		preContext.clearRect(0, 0, preCanvas.width, preCanvas.height);
	}*/

}
