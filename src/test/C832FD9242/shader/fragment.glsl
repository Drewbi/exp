uniform float u_time;
varying vec2 vUv;

void main(void) {
    vec2 uv = vUv;
    float gridSize = 10.0;
    uv *= gridSize;
    uv = fract(uv);
    gl_FragColor = vec4(uv.x * uv.y, uv.x * uv.y, uv.x * uv.y , 1.0);
}
