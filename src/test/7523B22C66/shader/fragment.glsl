uniform float u_time;
varying vec2 vUv;

void main(void) {
    gl_FragColor = vec4(sin(u_time));
}
