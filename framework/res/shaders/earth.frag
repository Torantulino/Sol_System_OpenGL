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
// Earth and City light Textures
uniform sampler2D tex;
uniform sampler2D tex2;

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

vec4 calculateCityLights(in vec3 view_dir, in vec4 tex_colour, in material mat, in point_light light, in vec3 position, in vec3 normal);

void main(){ 
  // View Direction
  vec3 view_dir = normalize(eye_pos - position); 
  
  // Sample textures
  vec4 earth_tex_colour = texture(tex, tex_coord); 
  vec4 city_tex_colour = texture(tex2, tex_coord);
  
  // Earth and CityLight Colours
  vec4 earth_col;
  vec4 city_light_col;
  
  // Calculate Point
  earth_col = calculatePoint(light, position, normal, mat, view_dir, earth_tex_colour);
  
  // Calculate city light colour
  city_light_col = calculateCityLights(view_dir, city_tex_colour, mat, light, position, normal);
  
  // Blend colours, with city light's obscuring earth if on.
  colour = mix(earth_col, city_light_col, city_light_col.a);
  
  colour.a = 1.0f;
}