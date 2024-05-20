uniform float u_time;
varying vec2 vUv;

float random (in vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

float xShape(vec2 st) {
    return random(st);
}

void main(void) {
    float contrast = 100.0;
    float col = xShape(vUv);
    gl_FragColor = vec4(vec3(col), 1.0);
}
