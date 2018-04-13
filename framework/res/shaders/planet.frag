#version 440

// Point light structure
#ifndef POINT_LIGHT
#define POINT_LIGHT
struct point_light {
  vec4 light_colour;
  vec3 position;
  float constant;
  float linear;
  float quadratic;
};
#endif

// A material structure
#ifndef MATERIAL
#define MATERIAL
struct material {
  vec4 emissive;
  vec4 diffuse_reflection;
  vec4 specular_reflection;
  float shininess;
};
#endif

// Point light for scene
uniform point_light light;
// Material of the object
uniform material mat;
// Position of the camera
uniform vec3 eye_pos;
// Texture
uniform sampler2D tex;
// Shadow map to sample from
uniform sampler2D shadow_map;

// Incoming position
layout(location = 0) in vec3 position;
// Incoming normal
layout(location = 1) in vec3 normal;
// Incoming texture coordinate
layout(location = 2) in vec2 tex_coord;
// Incoming light space position
layout(location = 3) in vec4 light_space_pos;
// Outgoing colour
layout(location = 0) out vec4 colour;


vec4 calculatePoint(in point_light point, in vec3 position, in vec3 normal, in material mat, in vec3 view_dir, in vec4 tex_colour);

float calculate_shadow(in sampler2D shadow_map, in vec4 light_space_pos);

void main(){ 
  // View Direction
  vec3 view_dir = normalize(eye_pos - position); 
  // Sample texture
  vec4 tex_colour = texture(tex, tex_coord);
  // Calculate shadow
  float shade = calculate_shadow(shadow_map, light_space_pos);
  
  
  // Calculate Point
  colour += calculatePoint(light, position, normal, mat, view_dir, tex_colour);
  

  
  colour *= shade;
  colour.a = 1.0f;
}