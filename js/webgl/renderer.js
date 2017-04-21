
function Renderer(canvasId){

	var canvas = document.getElementById(canvasId);
	var gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");


	var width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
	var height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

	var scale = 1/3;
	
	canvas.width = width*scale;
	canvas.height = height*scale;

	var shaderProgram;
	var size;

	var lastHeight = canvas.height;
	var lastWidth = canvas.width;

	var layers = [];


	/*=========================Shaders========================*/


	// Create a vertex shader object
	var vertShader = gl.createShader(gl.VERTEX_SHADER);

	// Attach vertex shader source code
	gl.shaderSource(vertShader, vertexShader);

	// Compile the vertex shader
	gl.compileShader(vertShader);

	// Create fragment shader object
	var fragShader = gl.createShader(gl.FRAGMENT_SHADER);

	// Attach fragment shader source code
	gl.shaderSource(fragShader, fragmentShader);

	// Compile the fragmentt shader
	gl.compileShader(fragShader);

	// Create a shader program object to store
	// the combined shader program
	shaderProgram = gl.createProgram();

	// Attach a vertex shader
	gl.attachShader(shaderProgram, vertShader); 

	// Attach a fragment shader
	gl.attachShader(shaderProgram, fragShader);

	// Link both programs
	gl.linkProgram(shaderProgram);

	// Use the combined shader program object
	gl.useProgram(shaderProgram);

	if(gl.getShaderInfoLog(vertShader)){
		console.warn(gl.getShaderInfoLog(vertShader));
	}
	if(gl.getShaderInfoLog(fragShader)){
		console.warn(gl.getShaderInfoLog(fragShader));
	}
	if(gl.getProgramInfoLog(shaderProgram)){
		console.warn(gl.getProgramInfoLog(shaderProgram));
	}


	vertexBuffer = gl.createBuffer();

	/*==========Defining and storing the geometry=======*/

	var vertices = [
		-1.0, -1.0,
		 1.0, -1.0,
		-1.0,  1.0,
		-1.0,  1.0,
		 1.0, -1.0,
		 1.0,  1.0
	];

	size = ~~(vertices.length/2);
	
	gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
	gl.bindBuffer(gl.ARRAY_BUFFER, null);

	gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);

	// Get the attribute location
	var coord = gl.getAttribLocation(shaderProgram, "coordinates");

	// Point an attribute to the currently bound VBO
	gl.vertexAttribPointer(coord, 2, gl.FLOAT, false, 0, 0);

	// Enable the attribute
	gl.enableVertexAttribArray(coord);
	
	var onePixelAttr = gl.getUniformLocation(shaderProgram, "onePixel");
	var offsetAttr = gl.getUniformLocation(shaderProgram, "offset");
	var parallaxAttr = gl.getUniformLocation(shaderProgram, "parallax");
	

	function addLayer(image, parallax, type, settings){
		var texture = gl.createTexture();
		gl.bindTexture(gl.TEXTURE_2D, texture);
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
		
		layers.push({
			 texture: texture
			,parallax: parallax*parallax*parallax*parallax
			,type: type
			,settings: settings
		});
	}

	var offsetX = 0;
	var rainOffset = [0, 0];
	var lastTime = Date.now();
	var cloudOffset = 0;
	var settings = {};

	function render(){

		var now = Date.now();
		var diff = now - lastTime;
		lastTime = now;
		rainOffset[0] -= (diff/(2))*settings.windSpeed;
		rainOffset[1] -= diff/(2);
		cloudOffset -= (diff/100)*settings.windSpeed;

		gl.viewport(0, 0, canvas.width, canvas.height);

		for(var i = 0; i < layers.length; i++){

			gl.bindTexture(gl.TEXTURE_2D, layers[i].texture);

			// Tell WebGL to use our shader program pair
			gl.useProgram(shaderProgram);

			gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
			
			gl.enableVertexAttribArray(coord);
			gl.vertexAttribPointer(coord, 2, gl.FLOAT, false, 0, 0);

			gl.uniform2f(onePixelAttr, 1/lastWidth, 1/lastHeight);
			if(layers[i].type == "rain"){
				gl.uniform2f(
					offsetAttr,
					rainOffset[0]*layers[i].settings.rainSpeed + offsetX,
					rainOffset[1]*layers[i].settings.rainSpeed
				);
			} else if(layers[i].type == "cloud"){
				gl.uniform2f(offsetAttr, offsetX+cloudOffset, 0);
			} else {
				gl.uniform2f(offsetAttr, offsetX, 0);
			}
			gl.uniform1f(parallaxAttr, layers[i].parallax);

			gl.disable(gl.DEPTH_TEST);
			gl.enable(gl.BLEND);
			gl.blendFunc( gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA );

			gl.drawArrays(gl.TRIANGLES, 0, size);

		}

		//offsetX += 1;

		window.requestAnimationFrame(render);
		
	}

	function setSettings(newSettings){
		settings = newSettings;
	}

	return{
		 render: render
		,addLayer: addLayer
		,setSettings: setSettings
	};

}



















