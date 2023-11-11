/*
attribute vec3 position;
attribute vec3 normal;
attribute vec2 uv;

uniform mat4 modelViewMatrix;
uniform mat3 projectionMatrix;
*/
varying vec4 vColor;

void main(void) {
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    vColor = normalize(vec4(position, 1.0));
}
