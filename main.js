
buildLandscape();

function buildLandscape(){

	noise.seed(Math.random());

	var preCanvas = document.getElementById("prerenderCanvas");
	var preContext = preCanvas.getContext("2d");

	var width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
	var height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

	var scale = 1/3;

	var daytimeProbabilites = [
		 1 // Night
		,2 // Morning
		,3 // Day
	]

	var daytimeProbabilitiesSum = 0;
	for(var i in daytimeProbabilites){
		daytimeProbabilitiesSum += daytimeProbabilites[i];
	}
	for(var i in daytimeProbabilites){
		daytimeProbabilites[i] = daytimeProbabilites[i] / daytimeProbabilitiesSum;

		if(i != 0){
			daytimeProbabilites[i] += daytimeProbabilites[i-1];
		}
	}

	var randTime = Math.random();

	var sunBrightness;
	var lightColor;
	var hazeColor;
	var cirrusColor;
	var skyBrightness;
	var cirrusDensity;

	if(randTime < daytimeProbabilites[0]){
		//Night
		sunBrightness = 0.3;
		lightColor = [120, 130, 140];
		hazeColor = "100, 110, 120";
		cirrusColor = "#FFFFFF";
		skyBrightness = 0.5;
		cirrusDensity = 1;
	} else if(randTime < daytimeProbabilites[1]){
		// Morning
		sunBrightness = 0.5;
		lightColor = [240, 200, 180];
		hazeColor = "255, 230, 200";
		cirrusColor = "#FF9977";
		skyBrightness = 0.8;
		cirrusDensity = 1;
	} else {
		// Day
		sunBrightness = 1;
		lightColor = [255, 255, 255];
		hazeColor = "220, 230, 255";
		cirrusColor = "#FFFFFF";
		skyBrightness = 1;
		cirrusDensity = 1;
	}
	

	var hazeIntensity = 1;

	var cloudiness = 2;
	var cloudHeight = 50;

	var skyHazeColor = hazeColor;

	/*sunBrightness = 0.5;
	lightColor = [200, 200, 210];
	hazeColor = "180, 190, 200";
	cirrusColor = "#FFFFFF";
	hazeIntensity = 1.8;
	cloudiness = 10;
	cloudHeight = 0;*/

	sunBrightness = 0.5;
	lightColor = [100, 120, 180];
	hazeColor = "100, 120, 180";
	skyHazeColor = "100, 110, 100";
	cirrusColor = "#FFFFFF";
	hazeIntensity = 0.2;
	cloudiness = 0;
	cloudHeight = 0;

	var skyBrightness = 0.3;
	var cirrusDensity = 0.3;

	var layers = 6;
	var layer = 0;

	var heightSpan = 0.3;
	var ruggednessSpan = 0.8;

	preCanvas.width = width*scale;
	preCanvas.height = height*scale;

	generateSkyGradient(preCanvas, preContext, {
		scale: scale
		,skyBrightness: skyBrightness
	});

	generateStars(preCanvas, preContext, {intensity: 1, scale: scale});
	
	generateAurora(preCanvas, preContext, {intensity: 1, scale: scale});

	render8bit(true);

	generateCirrus(preCanvas, preContext, {
		scale: scale
		,cirrusDensity: cirrusDensity
		,cirrusColor: cirrusColor
	});

	generateHaze(preCanvas, preContext, {
		intensity: 5.8 * hazeIntensity
		,scale: scale
		,hazeColor: skyHazeColor
		,hazeStart: 0
	});
	renderTransparent8bit();
	
	addClouds(layer);

	/*generateHouse(preCanvas, preContext, {scale: scale});
	render8bit();*/

	//return;

	layer++;

	generateTerrain(preCanvas, preContext, {
		 haze: 0.7
		,terrainPoints: [
			 preCanvas.height - ((layers-layer+1)/(layers+1))*heightSpan*preCanvas.height
			,preCanvas.height - ((layers-layer+1)/(layers+1))*heightSpan*preCanvas.height
			,preCanvas.height - ((layers-layer+1)/(layers+1))*heightSpan*preCanvas.height
		]
		,smoothness: 0
		,c0: [100, 100, 100]
		,ruggedness: 0.5 * ruggednessSpan
		,scale: scale*2
		,snow: true
		,snowness: 0.6
		,hillshadeIntensity: 5 * sunBrightness
	});

	//render8bit();
	//return;
	

	addHaze(layer);
	render8bit();

	addClouds(layer);

	layer++;

	generateTerrain(preCanvas, preContext, {
		 haze: 0.7
		,terrainPoints: [
			 preCanvas.height - ((layers-layer+1)/(layers+1))*heightSpan*preCanvas.height
			,preCanvas.height - ((layers-layer+1)/(layers+1))*heightSpan*preCanvas.height
			,preCanvas.height - ((layers-layer+1)/(layers+1))*heightSpan*preCanvas.height
		]
		,smoothness: 0
		,c0: [100, 100, 100]
		,ruggedness: 0.5 * ruggednessSpan
		,scale: scale*1.5
		,snow: true
		,snowness: 0.2
		,hillshadeIntensity: 4 * sunBrightness
	});
	

	addHaze(layer);
	
	render8bit();

	addClouds(layer);


	layer++;
	generateTerrain(preCanvas, preContext, {
		 haze: 0.7
		,terrainPoints: [
			 preCanvas.height - ((layers-layer+1)/(layers+1))*heightSpan*preCanvas.height
			,preCanvas.height - ((layers-layer+1)/(layers+1))*heightSpan*preCanvas.height
			,preCanvas.height - ((layers-layer+1)/(layers+1))*heightSpan*preCanvas.height
		]
		,smoothness: 0
		,c0: [100, 100, 100]
		,ruggedness: 0.5 * ruggednessSpan
		,scale: scale
		,snow: true
		,snowness: 0.1
		,hillshadeIntensity: 3 * sunBrightness
	});
	

	addHaze(layer);
	render8bit();

	addClouds(layer);

	//return;

	/*generateRain(preCanvas, preContext, {intensity: 1, scale: scale/2, farAway: true});
	renderRain(0.05);*/

	//return;

	layer++;
	generateTerrain(preCanvas, preContext, {
		 haze: 0.5
		,terrainPoints: [
			 preCanvas.height - ((layers-layer+1)/(layers+1))*heightSpan*preCanvas.height
			,preCanvas.height - ((layers-layer+1)/(layers+1))*heightSpan*preCanvas.height
			,preCanvas.height - ((layers-layer+1)/(layers+1))*heightSpan*preCanvas.height
		]
		,smoothness: 25
		,c0: [115, 121, 80]
		,ruggedness: 0.3 * ruggednessSpan
		,scale: scale
		,snow: false
		,snowness: -0.2
		,hillshadeIntensity: 1 * sunBrightness
	});
	addHaze(layer);
	render8bit();

	addClouds(layer);

	/*generateRain(preCanvas, preContext, {intensity: 1, scale: scale, farAway: true});
	renderRain(0.08);*/

	layer++;
	generateTerrain(preCanvas, preContext, {
		 haze: 0.25
		,terrainPoints: [
			 preCanvas.height - ((layers-layer+1)/(layers+1))*heightSpan*preCanvas.height
			,preCanvas.height - ((layers-layer+1)/(layers+1))*heightSpan*preCanvas.height
			,preCanvas.height - ((layers-layer+1)/(layers+1))*heightSpan*preCanvas.height
		]
		,smoothness: 100
		,c0: [120, 140, 60]
		,ruggedness: 0.2 * ruggednessSpan
		,scale: scale
		,snow: false
		,snowness: -0.7
		,hillshadeIntensity: 1 * sunBrightness
	});
	addHaze(layer);
	render8bit();

	addClouds(layer);

	layer++;
	var terrain = generateTerrain(preCanvas, preContext, {
		 haze: 0
		,terrainPoints: [
			 preCanvas.height - ((layers-layer+1)/(layers+1))*heightSpan*preCanvas.height
			,preCanvas.height - ((layers-layer+1)/(layers+1))*heightSpan*preCanvas.height
			,preCanvas.height - ((layers-layer+1)/(layers+1))*heightSpan*preCanvas.height
		]
		,smoothness: 300
		,c0: [126, 154, 70]
		,ruggedness: 0.1 * ruggednessSpan
		,scale: scale
		,snow: false
		,hillshadeIntensity: 1 * sunBrightness
	});
	addHaze(layer);
	render8bit();

	//return;

	/*generateRain(preCanvas, preContext, {intensity: 1, scale: scale});
	renderRain(1);

	generateRain(preCanvas, preContext, {intensity: 1, scale: scale});
	renderRain(1.2);

	generateRain(preCanvas, preContext, {intensity: 1, scale: scale});
	renderRain(1.5);*/

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
		generateHaze(preCanvas, preContext, {intensity: 0.1 * ((layers+1) / (layer+1)) * hazeIntensity, scale: scale, hazeColor: hazeColor, hazeStart: -1});
		var cloud = render8bit();
		var left = 0;
		//setInterval(function(){cloud.style.left = left+"px"; left += 1/scale; }, 800 + 800 * Math.random());
	}

	function addHaze(layer){
		generateHaze(preCanvas, preContext, {
			intensity: ((layers-layer+1)/(layers+1)) * hazeIntensity
			,scale: scale
			,hazeColor: hazeColor
			,hazeStart: 1 - ((layers-layer+1)/(layers+1))*(heightSpan+ruggednessSpan/3)*2
		});
	}


	function render8bit(ignoreLightColor){
		
		var image = preContext.getImageData(0, 0, preCanvas.width, preCanvas.height);

		var colorResolution = 16;

		var lightColorR = lightColor[0]/255;
		var lightColorG = lightColor[1]/255;
		var lightColorB = lightColor[2]/255;

		for(var i = 0; i < image.data.length; i += 4){

			if(image.data[i+3] > 220){

				if(!ignoreLightColor){
					image.data[i  ] *= lightColorR;
					image.data[i+1] *= lightColorG;
					image.data[i+2] *= lightColorB;
				}

				var variance = (Math.random()-0.5)*10;
				
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

	function renderTransparent8bit(){
		var image = preContext.getImageData(0, 0, preCanvas.width, preCanvas.height);

		var colorResolution = 16;

		var lightColorR = lightColor[0]/255;
		var lightColorG = lightColor[1]/255;
		var lightColorB = lightColor[2]/255;

		for(var i = 0; i < image.data.length; i += 4){

				var variance = (Math.random()-0.5)*10;

				image.data[i  ] *= lightColorR;
				image.data[i+1] *= lightColorG;
				image.data[i+2] *= lightColorB;
				
				image.data[i  ] += variance;
				image.data[i+1] += variance;
				image.data[i+2] += variance;
				if(image.data[i+3] > 0){
					image.data[i+3] += variance;
				}
				
				image.data[i  ] = colorResolution * Math.round(image.data[i  ]/colorResolution);
				image.data[i+1] = colorResolution * Math.round(image.data[i+1]/colorResolution);
				image.data[i+2] = colorResolution * Math.round(image.data[i+2]/colorResolution);
				image.data[i+3] = colorResolution * Math.round(image.data[i+3]/colorResolution);
				
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

	function renderRain(speed){
		var image = preContext.getImageData(0, 0, preCanvas.width, preCanvas.height);

		var colorResolution = 16;

		var lightColorR = lightColor[0]/255;
		var lightColorG = lightColor[1]/255;
		var lightColorB = lightColor[2]/255;

		for(var i = 0; i < image.data.length; i += 4){

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
				
		};

		var canvas = document.createElement("canvas");
		canvas.height = height*scale;
		canvas.width = width*scale;
		var context = canvas.getContext("2d");

		preContext.putImageData(image, 0, 0);
		context.drawImage(preCanvas, 0, 0);

		var rainDiv = document.createElement("div");
		rainDiv.className = "animateDiv";
		rainDiv.style.background = "url("+canvas.toDataURL()+")";
		rainDiv.style.backgroundSize = canvas.width / scale + "px " + canvas.height / scale + "px";
		document.getElementById("canvasDiv").appendChild(rainDiv);

		preContext.clearRect(0, 0, preCanvas.width, preCanvas.height);

		var posX = 0;
		var posY = 0;

		var framerate = 60;

		setInterval(function(){
			posX += 2*speed * 60/framerate;
			posY += 5*speed * 60/framerate;

			rainDiv.style.backgroundPosition = ~~(posX)/scale + "px " + ~~(posY)/scale + "px";
			
		}, 1000/framerate);

		return canvas;
	}

}
