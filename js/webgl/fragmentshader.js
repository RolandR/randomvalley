var fragmentShader = `

precision mediump float;

uniform sampler2D u_image;

uniform vec2 onePixel;
uniform vec2 offset;
uniform float parallax;

varying vec2 texCoord;

vec2 getCoords(vec2 coord, vec2 offset){
	return mod(coord + onePixel * floor(offset), 1.0);
}

void main(void){

	gl_FragColor = texture2D(u_image, getCoords(texCoord, offset*parallax));
	
}

`;



/* == terrainShader == */



var terrainShader = `

precision mediump float;

uniform sampler2D u_image0;
uniform sampler2D u_image1;

uniform vec2 onePixel;
uniform vec2 offset;
uniform float parallax;
uniform float scale;
uniform vec2 sunPosition;
uniform float hillshadeIntensity;

varying vec2 texCoord;

vec2 getCoords(vec2 coord, vec2 offset){
	return mod(coord + onePixel * floor(offset), 1.0);
}

vec2 getExactCoords(vec2 coord, vec2 offset){
	return mod(coord + onePixel * offset, 1.0);
}

void main(void){
	
	float grade =
		texture2D(u_image1, getExactCoords(texCoord, offset*parallax)).r
	  - texture2D(u_image1, getExactCoords(texCoord, offset*parallax+sunPosition)).r;
	
	grade = grade * (hillshadeIntensity/(scale+1.0));

	grade = (grade+5.0) * 30.0;

	grade = min(255.0, grade);
	grade = max(-255.0, grade);

	grade = 2.0*grade / 255.0 - 1.0;
	

	vec4 color = vec4(texture2D(u_image0, getCoords(texCoord, offset*parallax)));
	vec4 height = vec4(texture2D(u_image1, getCoords(texCoord, offset*parallax)).rgb, 1.0);
	//gl_FragColor = vec4(height.rgb/255.0, color.a);

	color.rgb = color.rgb * (0.3+grade);
	
	gl_FragColor = vec4(color.rgba);
	
}

`;








































