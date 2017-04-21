var fragmentShader = `

precision mediump float;

uniform sampler2D u_image;

uniform vec2 onePixel;
uniform vec2 offset;
uniform float parallax;

uniform vec3 ambientLight;
uniform vec3 sunLight;

uniform bool preserveAlpha;

varying vec2 texCoord;

vec2 getCoords(vec2 coord, vec2 offset){
	return mod(coord + onePixel * floor(offset), 1.0);
}

void main(void){

	vec4 color = texture2D(u_image, getCoords(texCoord, offset*parallax));
	color.rgb = color.rgb * (ambientLight+sunLight);

	float noise = fract(sin(dot(getCoords(texCoord, offset*parallax), vec2(12.9898,78.233))) * 43758.5453);
    
	if(!preserveAlpha){
		color.rgb += color.rgb * (noise-0.5)/32.0 + (noise-0.5)/32.0;
		color = floor((color)*16.0)/16.0;
	
		if(color.a > 0.9){
			color.a = 1.0;
		} else {
			color.a = 0.0;
		}
	} else {
		color.rgb += color.rgb * (noise-0.5)/32.0 + (noise-0.5)/32.0;
		color = floor((color)*64.0)/64.0;
		
		if(color.a > 0.0){
			color.a += color.a * (noise-0.5)/32.0 + (noise-0.5)/32.0;
		}
	}
	
	gl_FragColor = color;
	
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
uniform vec3 ambientLight;
uniform vec3 sunLight;

varying vec2 texCoord;

vec2 getCoords(vec2 coord, vec2 offset){
	return mod(coord + onePixel * floor(offset), 1.0);
}

void main(void){
	
	float grade =
		texture2D(u_image1, mod(texCoord + onePixel * (floor(offset*parallax)), 1.0)).r
	  - texture2D(u_image1, mod(texCoord + onePixel * (floor(offset*parallax) + sunPosition), 1.0)).r;
	
	//grade = grade * (hillshadeIntensity/(scale+1.0));

	grade = grade * 3.0;

	grade = (grade+5.0) * 30.0;

	grade = min(255.0, grade);
	grade = max(-255.0, grade);

	grade = 2.0*grade / 255.0 - 1.0;
	

	vec4 color = vec4(texture2D(u_image0, getCoords(texCoord, offset*parallax)));
	vec4 height = vec4(texture2D(u_image1, getCoords(texCoord, offset*parallax)).rgb, 1.0);
	//gl_FragColor = vec4(height.rgb/255.0, color.a);

	color.rgb = color.rgb * (ambientLight+grade*sunLight);

    float noise = fract(sin(dot(getCoords(texCoord, offset*parallax), vec2(12.9898,78.233))) * 43758.5453);
    color.rgb += color.rgb * (noise-0.5)/32.0 + (noise-0.5)/32.0;
	color = floor((color)*16.0)/16.0;

	//color = max(color, 0.0);
	//color = min(color, 1.0);

	if(color.a > 0.9){
		color.a = 1.0;
	} else {
		color.a = 0.0;
	}
	
	gl_FragColor = vec4(color.rgba);
	
}

`;








































