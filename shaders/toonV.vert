#version 330

uniform mat4 m_pvm;
uniform	mat4 m_view;
uniform	mat3 m_normal;

uniform	vec4 diffuse;
uniform	vec4 ambient;

uniform	vec4 l_dir;	   // camera space

in vec4 position;	// local space
in vec3 normal;		// local space

// the data to be sent to the fragment shader
out Data {
	vec4 color;
} DataOut;

void main () {
	
	vec3 n = normalize(m_normal*normal); //implicit conversion from vec4 to vec4
	vec3 ld = normalize(vec3(m_view * l_dir)); //calculate the ligth direction
	float intensity;
	intensity = max(0.0 , dot(n, ld)); //produto interno (dot) é comutativo;

	//calculate the color to be sent for fragment shaders
	DataOut.color = (intensity + 0.25) * diffuse;

	gl_Position = m_pvm * position;

}