var fragmentShader = `

precision mediump float;

uniform sampler2D u_image;

uniform vec2 onePixel;
uniform vec2 offset;
uniform float parallax;

varying vec2 texCoord;

vec2 getCoords(vec2 coord, vec2 offset){
	//return vec2(mod(coord.x + onePixel.x * offset.x, 1.0), mod(coord.y + onePixel.y * offset.y, 1.0));
	return mod(coord + onePixel * floor(offset), 1.0);
}

void main(void){

	gl_FragColor = texture2D(u_image, getCoords(texCoord, offset*parallax));
	
}

`;








































