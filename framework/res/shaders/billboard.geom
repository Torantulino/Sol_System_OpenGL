#version 440

// The projection transformation
uniform mat4 P;

// Point size for the billboards
uniform float point_size;
// Camera location
uniform vec3 eye_pos;

// Incoming data
layout(points) in;
// Outgoing data
layout(triangle_strip, max_vertices = 4) out;

// Outgoing texture coordinate
layout(location = 0) out vec2 tex_coord;

void main() {

  // Incoming position
  vec4 position = gl_in[0].gl_Position;
  // Sun location
  //vec3 sun_location = vec3(0.0f, 0.0f, 450000.0f);
  
  //vec3 haloDirection = (vec3(vec2(0.5), 1.0f) - vec3(tex_coord, 1.0f) * 0.5); 
  vec3 haloDirection = normalize(eye_pos - vec3(position));
  position += vec4(haloDirection * 20000, 1);


  // Vertex 1, bottom left
  vec2 va = position.xy + vec2(-0.5, -0.5) * point_size;
  gl_Position = P * vec4(va, position.zw);
  tex_coord = vec2(0.0, 0.0);
  EmitVertex();

  // Vertex 2, bottom right
  vec2 vb = position.xy + vec2(0.5, -0.5) * point_size;
  gl_Position = P * vec4(vb, position.zw);
  tex_coord = vec2(1.0, 0.0);
  EmitVertex();

  // Vertex 3, top left
  vec2 vc = position.xy + vec2(-0.5, 0.5) * point_size;
  gl_Position = P * vec4(vc, position.zw);
  tex_coord = vec2(0.0, 1.0);
  EmitVertex();  

  // Vertex 4, top right
  vec2 vd = position.xy + vec2(0.5, 0.5) * point_size;
  gl_Position = P * vec4(vd, position.zw);
  tex_coord = vec2(1.0, 1.0);
  EmitVertex();

  // End Primitive
  EndPrimitive();
}