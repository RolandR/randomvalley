
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

	canvas.width = width*scale;
	canvas.height = height*scale;
	preCanvas.width = width*scale;
	preCanvas.height = height*scale;

	generateSkyGradient(preCanvas, preContext, {
		 scale: scale
		,intensity: 1
	});
	render8bit();
	
	for(var i = 0; i < ~~(1+Math.random()*5); i++){
		generateCloud(preCanvas, preContext, {
			 cx: Math.random() * canvas.width
			,cy: 3*canvas.height/4 - Math.random() * 2*canvas.height/3
			,count: 3 + ~~(Math.random()*5)
			,initialRadius: 17
		});
		render8bit();
	}

	generateTerrain(preCanvas, preContext, {
		 haze: 0.7
		,terrainPoints: [canvas.height/4, canvas.height/2, canvas.height/4]
		,smoothness: 5
		,c0: [100, 100, 100]
		,ruggedness: 1
		,scale: scale
		,snow: true
		,snowness: 0.2
	});
	render8bit();

	return;

	

	generateTerrain(preCanvas, preContext, {
		 haze: 0.5
		,terrainPoints: [canvas.height/2, 2*canvas.height/3, canvas.height/2]
		,smoothness: 100
		,c0: [100, 120, 40]
		,ruggedness: 0.5
		,scale: scale
		,snow: false
	});
	render8bit();

	var terrain = generateTerrain(preCanvas, preContext, {
		 haze: 0
		,terrainPoints: [4*canvas.height/5, 5*canvas.height/6, 4*canvas.height/5]
		,smoothness: 200
		,c0: [129, 158, 62]
		,ruggedness: 0.3
		,scale: scale
		,snow: false
	});
	render8bit();

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

		for(var i = 0; i < image.data.length; i += 4){

			if(image.data[i+3] > 128){

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

		preContext.putImageData(image, 0, 0);
		context.drawImage(preCanvas, 0, 0);

		preContext.clearRect(0, 0, preCanvas.width, preCanvas.height);
		
	}

}