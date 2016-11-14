
buildLandscape();

function buildLandscape(){

	var preCanvas = document.getElementById("prerenderCanvas");
	var preContext = preCanvas.getContext("2d");

	var width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
	var height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

	var scale = 1/3;

	/*
	/Night
	var sunBrightness = 0.3;
	var lightColor = [120, 130, 140];
	var hazeColor = "100, 110, 120";
	var cirrusColor = "#FFFFFF";*/

	
	// Morning
	var sunBrightness = 0.5;
	var lightColor = [240, 200, 180];
	var hazeColor = "255, 230, 200";
	var cirrusColor = "#FF7722";
	
	/*
	// Day
	var sunBrightness = 1;
	var lightColor = [255, 255, 255];
	var hazeColor = "230, 240, 255";
	var cirrusColor = "#FFFFFF";
	*/

	var hazeIntensity = 1;

	var cloudiness = 2;
	var cloudHeight = 50;

	var layers = 6;
	var layer = 0;

	preCanvas.width = width*scale;
	preCanvas.height = height*scale;

	generateSkyGradient(preCanvas, preContext, {
		 scale: scale
		,intensity: 1
		,cirrusColor: cirrusColor
	});

	generateHaze(preCanvas, preContext, {intensity: 0.8 * hazeIntensity, scale: scale, hazeColor: hazeColor});
	render8bit();
	
	addClouds(layer);

	/*generateHouse(preCanvas, preContext, {scale: scale});
	render8bit();*/

	//return;

	layer++;

	generateTerrain(preCanvas, preContext, {
		 haze: 0.7
		,terrainPoints: [preCanvas.height/4 - Math.random()*30, Math.random() * preCanvas.height/4 + preCanvas.height/4, preCanvas.height/4 - Math.random()*30]
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

	addClouds(layer);

	layer++;

	generateTerrain(preCanvas, preContext, {
		 haze: 0.7
		,terrainPoints: [preCanvas.height/4, Math.random() * preCanvas.height/4 + preCanvas.height/4, preCanvas.height/4]
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

	addClouds(layer);


	layer++;
	generateTerrain(preCanvas, preContext, {
		 haze: 0.7
		,terrainPoints: [preCanvas.height/4 + Math.random()*50, Math.random() * preCanvas.height/4 + preCanvas.height/4, preCanvas.height/4 + Math.random()*50]
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

	addClouds(layer);

	//return;

	layer++;
	generateTerrain(preCanvas, preContext, {
		 haze: 0.5
		,terrainPoints: [preCanvas.height/2, 2*preCanvas.height/3, preCanvas.height/2]
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

	addClouds(layer);

	layer++;
	generateTerrain(preCanvas, preContext, {
		 haze: 0.25
		,terrainPoints: [2*preCanvas.height/3, 4*preCanvas.height/5, 2*preCanvas.height/3]
		,smoothness: 250
		,c0: [120, 140, 60]
		,ruggedness: 0.4
		,scale: scale
		,snow: false
		,snowness: -0.7
		,hillshadeIntensity: 1 * sunBrightness
	});
	generateHaze(preCanvas, preContext, {intensity: 0.2 * hazeIntensity, scale: scale, hazeColor: hazeColor});
	render8bit();

	addClouds(layer);

	layer++;
	var terrain = generateTerrain(preCanvas, preContext, {
		 haze: 0
		,terrainPoints: [4*preCanvas.height/5, 5*preCanvas.height/6, 4*preCanvas.height/5]
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

	function addClouds(layer){
		for(var i = 0; i < ~~(Math.random()*cloudiness); i++){
			generateCloud(preCanvas, preContext, {
				 cx: Math.random() * preCanvas.width
				,cy: preCanvas.height/2 - (layer/layers) * preCanvas.height/2 + (Math.random()-0.5) * preCanvas.height/6 - cloudHeight
				,count: 3 + ~~(Math.random()*5)
				,initialRadius: 60*scale
			});
		}
		generateHaze(preCanvas, preContext, {intensity: 0.1 * ((layers+1) / (layer+1)) * hazeIntensity, scale: scale, hazeColor: hazeColor});
		var cloud = render8bit();
		var left = 0;
		//setInterval(function(){cloud.style.left = left+"px"; left += 1/scale; }, 800 + 800 * Math.random());
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

		var canvas = document.createElement("canvas");
		canvas.height = height*scale;
		canvas.width = width*scale;
		document.getElementById("canvasDiv").appendChild(canvas);
		var context = canvas.getContext("2d");

		preContext.putImageData(image, 0, 0);
		context.drawImage(preCanvas, 0, 0);

		preContext.clearRect(0, 0, preCanvas.width, preCanvas.height);

		return canvas;
		
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
