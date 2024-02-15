varying vec2 vUv;

float square(vec2 st) {
    return (st[0] < 0.3 && st[0] > 0.7) ? 1.0 : 0.2;
}

void main(void) {
    gl_FragColor = vec4(vUv.x, vUv.y, 1.0, 1.0);
}
