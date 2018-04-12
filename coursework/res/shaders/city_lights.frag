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

// The Sun
uniform point_light light;
// Material of the object
uniform material mat;
// Position of the camera
uniform vec3 eye_pos;
// Texture
uniform sampler2D tex;

// Incoming position
layout(location = 0) in vec3 position;
// Incoming normal
layout(location = 1) in vec3 normal;
// Incoming texture coordinate
layout(location = 2) in vec2 tex_coord;

// Outgoing colour
layout(location = 0) out vec4 colour;

vec4 calculatePoint(in point_light point, in vec3 position, in vec3 normal, in material mat, in vec3 view_dir, in vec4 tex_colour);


void main(){ 
  // View Direction
  vec3 view_dir = normalize(eye_pos - position); 
  // Sample texture
  vec4 tex_colour = texture(tex, tex_coord);
    
  // Calculate point
  vec4 litLights = calculatePoint(light, position, normal, mat, view_dir, tex_colour);
  
  colour = tex_colour;
  // Set black to Transparent
  colour.a = tex_colour.x;
  litLights.a = tex_colour.x;

  // Ensure lights only show on dark side of earth
  colour.a -= litLights.x;
}