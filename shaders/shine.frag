#version 330

uniform	vec4 diffuse;
uniform vec4 specular;
uniform sampler2D texEarth;
uniform float shininess;
uniform vec4 outlineColor;
uniform float _LitOutlineThickness;
uniform float _UnlitOutlineThickness;

in Data {
	vec4 eye;
	vec2 texCoord;
	vec3 normal;
	vec3 l_dir;
} DataIn;

out vec4 colorOut;

void main() {

	// get texture color
	vec4 eColor = texture(texEarth, DataIn.texCoord);

	// set the specular term to black
	vec4 spec = vec4(0.0);

	// normalize both input vectors
	vec3 n = normalize(DataIn.normal);
	vec3 e = normalize(vec3(DataIn.eye));

	float intensity = max(dot(n,DataIn.l_dir), 0.0);


	// if the vertex is lit compute the specular color
	//if (intensity > 0.0) {
	//	// compute the half vector
	//	vec3 h = normalize(DataIn.l_dir + e);	
	//	// compute the specular intensity
	//	float intSpec = max(dot(h,n), 0.0);
	//	// compute the specular term into spec
	//	spec = vec4(1) * pow(intSpec,shininess);
	//}

	
	// compute the color based on the intensity
	if (intensity > 0.90)
	{
		// compute the half vector
		vec3 h = normalize(DataIn.l_dir + e);	
		// compute the specular intensity
		float intSpec = max(dot(h,n), 0.0);
		// compute the specular term into spec
		spec = vec4(1) * pow(intSpec,2*shininess);
	}
	else if (intensity > 0.75)
	{
		// compute the half vector
		vec3 h = normalize(DataIn.l_dir + e);	
		// compute the specular intensity
		float intSpec = max(dot(h,n), 0.0);
		// compute the specular term into spec
		spec = vec4(1) * pow(intSpec,4*shininess);
	}
	else if (intensity > 0.5)
	{
		// compute the half vector
		vec3 h = normalize(DataIn.l_dir + e);	
		// compute the specular intensity
		float intSpec = max(dot(h,n), 0.0);
		// compute the specular term into spec
		spec = vec4(1) * pow(intSpec,8.5*shininess);
	}
	else if (intensity > 0.25)
	{
		// compute the half vector
		vec3 h = normalize(DataIn.l_dir + e);	
		// compute the specular intensity
		float intSpec = max(dot(h,n), 0.0);
		// compute the specular term into spec
		spec = vec4(1) * pow(intSpec,15*shininess);
	}
	else
	{
		// compute the half vector
		vec3 h = normalize(DataIn.l_dir + e);	
		// compute the specular intensity
		float intSpec = max(dot(h,n), 0.0);
		// compute the specular term into spec
		spec = vec4(1) * pow(intSpec,20*shininess);
	}

	//Outlines
	if (dot(e, n)  < mix(_UnlitOutlineThickness, _LitOutlineThickness, intensity)) {
		//calculate the outlines color
        vec3 fragmentColor = vec3(diffuse) * vec3(outlineColor); 
		colorOut = vec4(fragmentColor, 1.0);
	} else {
		colorOut = max(intensity * eColor + spec, eColor * 0.25);
		//colorOut = max(intensity * eColor + spec + diffuse, eColor + diffuse * 0.25);
	}
}