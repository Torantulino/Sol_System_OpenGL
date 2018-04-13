#version 410

// Incoming position
layout (location = 0) in vec3 position;
//Incoming tex_coord
layout (location = 10) in vec2 tex_coord_in;
//Incoming instance Matrix
layout (location = 3) in mat4 instance_matrix;

// Outgoing 3D texture coordinate
layout (location = 0) out vec2 tex_coord_out;

//Projection matrix
uniform mat4 P;
//View matrix
uniform mat4 V;

void main()
{
	// Calculate screen space position
	gl_Position = P * V * instance_matrix * vec4(position, 1.0);

	// Set outgoing texture coordinate
	tex_coord_out = tex_coord_in;
}