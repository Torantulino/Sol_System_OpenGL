#version 440

// Texture of object
uniform sampler2D tex;

// Incoming texture coordinate
layout(location = 0) in vec2 tex_coord;

// Outgoing colour
layout(location = 0) out vec4 colour;

void main() {

  


  int noFlares = 8;
  float flareDist = 0.38;
  
  vec2 flippedTexCoord = -tex_coord + vec2(1.0); //(Change tex_coord bellow to use)
  vec2 texelSize = 1.0 / vec2(textureSize(tex, 0));
  
  // Vector to center of screen
  vec2 centerVect = (vec2(0.5) - flippedTexCoord) * flareDist;
  
  vec4 flare = vec4(0.0f);
  for (int i=0; i<noFlares; ++i) {
	vec2 offset = fract(flippedTexCoord + centerVect * vec2(i));
	
	flare += texture(tex, offset);
  }
  
  
  // Set outgoing colour to result with flare
  colour = flare;
}