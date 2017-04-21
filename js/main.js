

var renderer = new Renderer("glCanvas");
buildLandscape();
renderer.render();

function buildLandscape(){

	noise.seed(Math.random());

	var preCanvas = document.getElementById("prerenderCanvas");
	var preContext = preCanvas.getContext("2d");

	var width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
	var height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

	var scale = 1/3;

	var daytimeProbabilites = [
		 1 // Early Dawn
		,1 // Morning
		,1 // Night
		,2 // Day
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
	var dayTime; // -1 is night, 1 is day
	var hazeIntensity;
	var windSpeed;

	//var randTime = 0.5;

	if(randTime < daytimeProbabilites[0]){
		//Early Dawn
		console.log("Time: Early Dawn");
		sunBrightness = 0.3;
		lightColor = [120, 130, 140];
		hazeColor = "240, 250, 255";
		cirrusColor = "#FFFFFF";
		skyBrightness = 0.5;
		dayTime = -0.4;
		skyHazeColor = hazeColor;
		hazeIntensity = 0.6;

		var weatherProbabilities = [
			 0 // Clear
			,1 // Beautiful day
			,1 // Cloudy
			,1 // Heavy Cirrus
			,1 // Fog
			,2 // Light Rain
			,2 // Heavy Rain
		]
		
	} else if(randTime < daytimeProbabilites[1]){
		// Morning
		console.log("Time: Morning");
		sunBrightness = 0.5;
		lightColor = [240, 200, 180];
		hazeColor = "255, 230, 200";
		cirrusColor = "#FF9977";
		skyBrightness = 0.8;
		dayTime = -0.2;
		skyHazeColor = hazeColor;
		hazeIntensity = 0.6;

		var weatherProbabilities = [
			 1 // Clear
			,1 // Beautiful day
			,1 // Cloudy
			,1 // Heavy Cirrus
			,1 // Fog
			,0 // Light Rain
			,0 // Heavy Rain
		]
		
	} else if(randTime < daytimeProbabilites[2]){
		// Night
		console.log("Time: Night");
		sunBrightness = 0.5;
		lightColor = [100, 120, 180];
		hazeColor = "100, 120, 120";
		skyHazeColor = "100, 110, 100";
		cirrusColor = "#FFFFFF";
		skyBrightness = 0.3;
		dayTime = -1;
		hazeIntensity = 0.2;

		var weatherProbabilities = [
			 1 // Clear
			,1 // Beautiful day
			,0 // Cloudy
			,0 // Heavy Cirrus
			,0 // Fog
			,1 // Light Rain
			,1 // Heavy Rain
		]
		
	} else {
		// Day
		console.log("Time: Day");
		sunBrightness = 1;
		lightColor = [255, 255, 255];
		hazeColor = "220, 230, 255";
		cirrusColor = "#FFFFFF";
		skyBrightness = 1;
		dayTime = 1;
		skyHazeColor = [255, 255, 255];
		hazeIntensity = 0.4;

		var weatherProbabilities = [
			 1 // Clear
			,2 // Beautiful day
			,1 // Cloudy
			,1 // Heavy Cirrus
			,1 // Fog
			,0 // Light Rain
			,0 // Heavy Rain
		]
		
	}

	var weatherProbabilitiesSum = 0;
	for(var i in weatherProbabilities){
		weatherProbabilitiesSum += weatherProbabilities[i];
	}
	for(var i in weatherProbabilities){
		weatherProbabilities[i] = weatherProbabilities[i] / weatherProbabilitiesSum;

		if(i != 0){
			weatherProbabilities[i] += weatherProbabilities[i-1];
		}
	}

	var randWeather = Math.random();
	//randWeather = 1;

	//var sunBrightness;
	var cirrusDensity;
	//var hazeIntensity;
	var cloudiness;
	var skyHazeIntensity;
	var rain = false;
	var rainIntensity;

	if(randWeather < weatherProbabilities[0]){
		//Clear
		console.log("Weather: Clear");
		sunBrightness *= 1;
		cloudiness = 0;
		cirrusDensity = 0.3;
		hazeIntensity *= 0.3;
		skyHazeIntensity = 2.8*hazeIntensity;
		windSpeed = Math.pow(Math.random(), 2)*0.1;
	} else if(randWeather < weatherProbabilities[1]){
		//Beautiful day
		console.log("Weather: Beautiful day");
		sunBrightness *= 1;
		cloudiness = 0.3;
		cirrusDensity = 0.4+Math.random()*0.4;
		hazeIntensity *= 0.5;
		skyHazeIntensity = 3*hazeIntensity;
		windSpeed = Math.pow(Math.random(), 2)*0.6;
	} else if(randWeather < weatherProbabilities[2]){
		//Cloudy
		console.log("Weather: Cloudy");
		sunBrightness *= 0.8;
		cloudiness = 3+Math.random()*10;
		cirrusDensity = 0.8;
		hazeIntensity *= 0.8;
		skyHazeIntensity = 3*hazeIntensity;
		windSpeed = Math.random()*1.5;
	} else if(randWeather < weatherProbabilities[3]){
		//Heavy Cirrus
		console.log("Weather: Heavy Cirrus");
		sunBrightness *= 1;
		cloudiness = 0.2;
		cirrusDensity = 2;
		hazeIntensity *= 0.5;
		skyHazeIntensity = 1*hazeIntensity;
		windSpeed = Math.pow(Math.random(), 2)*0.4;
	} else if(randWeather < weatherProbabilities[4]){
		//Fog
		console.log("Weather: Fog");
		sunBrightness *= 0.2;
		cloudiness = 0;
		cirrusDensity = 0;
		hazeIntensity = 1;
		skyHazeIntensity = 3*hazeIntensity;
		windSpeed = Math.pow(Math.random(), 2)*0.2;
	} else if(randWeather < weatherProbabilities[5]){
		//Light Rain
		console.log("Weather: Light Rain");
		sunBrightness *= 1;
		cloudiness = 2;
		cirrusDensity = 0.2;
		hazeIntensity = 1;
		skyHazeIntensity = 3*hazeIntensity;
		rain = true;
		rainIntensity = 0.3;
		windSpeed = Math.random()*1;
	} else {
		//Heavy Rain
		console.log("Weather: Heavy Rain");
		sunBrightness *= 1;
		cloudiness = 2;
		cirrusDensity = 0.2;
		hazeIntensity = 1;
		skyHazeIntensity = 3*hazeIntensity;
		rain = true;
		rainIntensity = 1;
		windSpeed = Math.random()*2;
	}

	if(Math.random() < 0.5){
		windSpeed = 0 - windSpeed;
	}

	/*sunBrightness = 0.5;
	lightColor = [200, 200, 210];
	hazeColor = "180, 190, 200";
	cirrusColor = "#FFFFFF";
	hazeIntensity = 1.8;
	cloudiness = 10;
	cloudHeight = 0;*/

	/*
	var cirrusDensity = 0.3;*/

	preCanvas.width = width*scale;
	preCanvas.height = height*scale;

	var layers = 6;
	var layer = 0;

	var heightSpan = 0.1+Math.random()*0.6;
	var ruggednessSpan = 1;

	//heightSpan = 0.2;

	generateSkyGradient(preCanvas, preContext, {
		scale: scale
		,skyBrightness: skyBrightness
	});

	var starsIntensity = 0;
	if(dayTime < 0){
		starsIntensity = 0 - dayTime;
	}

	renderer.setSettings({
		windSpeed: windSpeed
	});

	console.log("Wind speed: "+windSpeed);

	generateStars(preCanvas, preContext, {intensity: starsIntensity, scale: scale});
	
	//generateAurora(preCanvas, preContext, {intensity: 1, scale: scale});
	
	//generateLightning(preCanvas, preContext, {intensity: 1, scale: scale});

	render8bit((layer+1)/(layers+1), true, "default");
	
	generateCirrus(preCanvas, preContext, {
		scale: scale
		,cirrusDensity: cirrusDensity
		,cirrusColor: cirrusColor
	});

	generateHaze(preCanvas, preContext, {
		intensity: skyHazeIntensity
		,scale: scale
		,hazeColor: skyHazeColor
		,hazeStart: -0.5
	});
	renderTransparent8bit((layer+1)/(layers+1));
	
	addClouds(layer);

	/*generateHouse(preCanvas, preContext, {scale: scale});
	render8bit((layer+1)/(layers+1), false);*/

	layer++;

	generateTerrain(preCanvas, preContext, {
		 haze: 0.7
		,terrainPoints: [
			 preCanvas.height - Math.sqrt((layers-layer+1)/(layers+1))*heightSpan*preCanvas.height
			,preCanvas.height - Math.sqrt((layers-layer+1)/(layers+1))*heightSpan*preCanvas.height
			,preCanvas.height - Math.sqrt((layers-layer+1)/(layers+1))*heightSpan*preCanvas.height
		]
		,smoothness: 0
		,c0: [100, 100, 100]
		,ruggedness: 0.5 * ruggednessSpan
		,scale: scale*2
		,snow: true
		,snowness: 0.6
		,hillshadeIntensity: 5 * sunBrightness
	});

	//render8bit((layer+1)/(layers+1), false);
	//return;
	

	render8bit((layer+1)/(layers+1), false, "default");

	//return;
	
	addHaze(layer);

	addClouds(layer);

	layer++;

	generateTerrain(preCanvas, preContext, {
		 haze: 0.7
		,terrainPoints: [
			 preCanvas.height - Math.sqrt((layers-layer+1)/(layers+1))*heightSpan*preCanvas.height
			,preCanvas.height - Math.sqrt((layers-layer+1)/(layers+1))*heightSpan*preCanvas.height
			,preCanvas.height - Math.sqrt((layers-layer+1)/(layers+1))*heightSpan*preCanvas.height
		]
		,smoothness: 0
		,c0: [100, 100, 100]
		,ruggedness: 0.5 * ruggednessSpan
		,scale: scale*1.5
		,snow: true
		,snowness: 0.2
		,hillshadeIntensity: 4 * sunBrightness
	});
	
	render8bit((layer+1)/(layers+1), false, "default");

	addHaze(layer);

	addClouds(layer);


	layer++;
	generateTerrain(preCanvas, preContext, {
		 haze: 0.7
		,terrainPoints: [
			 preCanvas.height - Math.sqrt((layers-layer+1)/(layers+1))*heightSpan*preCanvas.height
			,preCanvas.height - Math.sqrt((layers-layer+1)/(layers+1))*heightSpan*preCanvas.height
			,preCanvas.height - Math.sqrt((layers-layer+1)/(layers+1))*heightSpan*preCanvas.height
		]
		,smoothness: 0
		,c0: [100, 100, 100]
		,ruggedness: 0.5 * ruggednessSpan
		,scale: scale
		,snow: true
		,snowness: 0.1
		,hillshadeIntensity: 3 * sunBrightness
	});

	render8bit((layer+1)/(layers+1), false, "default");

	addHaze(layer);

	addClouds(layer);


	if(rain){
		generateRain(preCanvas, preContext, {intensity: rainIntensity, scale: scale/2, farAway: true, windSpeed: windSpeed});
		renderRain((layer+1)/(layers+1), 0.1);
	}


	layer++;
	generateTerrain(preCanvas, preContext, {
		 haze: 0.5
		,terrainPoints: [
			 preCanvas.height - Math.sqrt((layers-layer+1)/(layers+1))*heightSpan*preCanvas.height
			,preCanvas.height - Math.sqrt((layers-layer+1)/(layers+1))*heightSpan*preCanvas.height
			,preCanvas.height - Math.sqrt((layers-layer+1)/(layers+1))*heightSpan*preCanvas.height
		]
		,smoothness: 25
		,c0: [115, 121, 80]
		,ruggedness: 0.3 * ruggednessSpan
		,scale: scale
		,snow: false
		,snowness: -0.2
		,hillshadeIntensity: 1 * sunBrightness
	});

	render8bit((layer+1)/(layers+1), false, "default");
	
	addHaze(layer);

	addClouds(layer);

	if(rain){
		generateRain(preCanvas, preContext, {intensity: rainIntensity, scale: scale, farAway: true, windSpeed: windSpeed});
		renderRain((layer+1)/(layers+1), 0.2);
	}

	layer++;
	generateTerrain(preCanvas, preContext, {
		 haze: 0.25
		,terrainPoints: [
			 preCanvas.height - Math.sqrt((layers-layer+1)/(layers+1))*heightSpan*preCanvas.height
			,preCanvas.height - Math.sqrt((layers-layer+1)/(layers+1))*heightSpan*preCanvas.height
			,preCanvas.height - Math.sqrt((layers-layer+1)/(layers+1))*heightSpan*preCanvas.height
		]
		,smoothness: 100
		,c0: [120, 140, 60]
		,ruggedness: 0.2 * ruggednessSpan
		,scale: scale
		,snow: false
		,snowness: -0.7
		,hillshadeIntensity: 1 * sunBrightness
	});

	render8bit((layer+1)/(layers+1), false, "default");
	
	addHaze(layer);

	addClouds(layer);

	if(rain){
		generateRain(preCanvas, preContext, {intensity: rainIntensity, scale: scale, windSpeed: windSpeed});
		renderRain((layer+1)/(layers+1), 1.2);

		generateRain(preCanvas, preContext, {intensity: rainIntensity, scale: scale, windSpeed: windSpeed});
		renderRain((layer+1)/(layers+1)+0.05, 1.6);

		generateRain(preCanvas, preContext, {intensity: rainIntensity, scale: scale, windSpeed: windSpeed});
		renderRain((layer+1)/(layers+1)+0.1, 1.9);
	}

	layer++;
	var terrain = generateTerrain(preCanvas, preContext, {
		 haze: 0
		,terrainPoints: [
			 preCanvas.height - Math.sqrt((layers-layer+1)/(layers+1))*heightSpan*preCanvas.height
			,preCanvas.height - Math.sqrt((layers-layer+1)/(layers+1))*heightSpan*preCanvas.height
			,preCanvas.height - Math.sqrt((layers-layer+1)/(layers+1))*heightSpan*preCanvas.height
		]
		,smoothness: 300
		,c0: [126, 154, 70]
		,ruggedness: 0.1 * ruggednessSpan
		,scale: scale
		,snow: false
		,hillshadeIntensity: 1 * sunBrightness
	});

	render8bit((layer+1)/(layers+1), false, "default");
	
	addHaze(layer);

	if(rain){

		generateRain(preCanvas, preContext, {intensity: rainIntensity, scale: scale, windSpeed: windSpeed});
		renderRain((layer+1)/(layers+1), 1);

	}

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
			render8bit((layer+1)/(layers+1), false, "default");

			nextTree = Math.random() * 100 * scale + 20 * scale;
		}
		nextTree--;
	}

	function addClouds(layer){
		var distance = (layer/layers)*(layer/layers);
		var cloudsCount = ~~(Math.random()*cloudiness*(1-distance)*10);
		generateClouds(preCanvas, preContext, cloudsCount, distance, heightSpan, scale);
		
		generateHaze(preCanvas, preContext, {intensity: 0.1 * ((layers+1) / (layer+1)) * hazeIntensity, scale: scale, hazeColor: hazeColor, hazeStart: -1});
		var cloud = render8bit((layer+1)/(layers+1), false, "cloud");
		var left = 0;
		
	}

	function addHaze(layer){
		generateHaze(preCanvas, preContext, {
			intensity: Math.sqrt((layers-layer+1)/(layers+1)) * hazeIntensity
			,scale: scale
			,hazeColor: hazeColor
			,hazeStart: 1 - Math.sqrt((layers-layer+1)/(layers+1))*(heightSpan+ruggednessSpan)*2
		});
		renderTransparent8bit((layer+1)/(layers+1));
	}


	function render8bit(layer, ignoreLightColor, type){
		
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
		var context = canvas.getContext("2d");

		preContext.putImageData(image, 0, 0);
		context.drawImage(preCanvas, 0, 0);

		renderer.addLayer(canvas, layer, type);

		preContext.clearRect(0, 0, preCanvas.width, preCanvas.height);

		return canvas;
		
	}

	function renderTransparent8bit(layer){
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
		var context = canvas.getContext("2d");

		preContext.putImageData(image, 0, 0);
		context.drawImage(preCanvas, 0, 0);

		renderer.addLayer(canvas, layer, "default");

		preContext.clearRect(0, 0, preCanvas.width, preCanvas.height);

		return canvas;
	}

	function renderRain(layer, speed){
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

				image.data[i+3] = image.data[i+3]/2;
				
		};

		var canvas = document.createElement("canvas");
		canvas.height = height*scale;
		canvas.width = width*scale;
		var context = canvas.getContext("2d");

		preContext.putImageData(image, 0, 0);
		context.drawImage(preCanvas, 0, 0);

		preContext.clearRect(0, 0, preCanvas.width, preCanvas.height);

		renderer.addLayer(canvas, layer, "rain", {rainSpeed: speed});

		return canvas;
	}

}












