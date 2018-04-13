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
vec4 calculatePoint(in point_light point, in vec3 position, in vec3 normal, in material mat, in vec3 view_dir, in vec4 tex_colour);

vec4 calculateCityLights(in vec3 view_dir, in vec4 tex_colour, in material mat, in point_light light, in vec3 position, in vec3 normal){ 
    
  // Calculate point
  vec4 litLights = calculatePoint(light, position, normal, mat, view_dir, tex_colour);
  
  // Set texture colour
  vec4 colour = tex_colour;
  // Set black to Transparent
  colour.a = tex_colour.x;
  litLights.a = tex_colour.x;

  // Ensure lights only show on dark side of earth
  colour.a -= litLights.x;
  
  return colour;
}