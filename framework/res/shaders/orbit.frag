#version 440


// Outgoing colour
layout(location = 0) out vec4 colour;

void main() {
  // Colour is just white
  colour = vec4(1.0f);
  // Make slightly transparent
  //	colour.a = 0.8;
}