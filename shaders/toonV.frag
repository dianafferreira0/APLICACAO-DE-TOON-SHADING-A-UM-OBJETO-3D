#version 330

in Data {
	vec4 color;
} DataIn;

out vec4 color; //colorOut

void main() {
	color = DataIn.color;
}