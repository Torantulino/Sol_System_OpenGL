#version 440

// Incoming tex_coord
layout(location = 0) in vec2 tex_coord;
// Outgoing colour
layout(location = 0) out vec4 colour;

uniform sampler2D tex;

void main() {
  // Sample texture
  colour = texture(tex, tex_coord);
}