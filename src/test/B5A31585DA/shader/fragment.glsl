uniform float u_time;
varying vec2 vUv;

float nSin(float n) {
    return (sin(n) + 1.0) / 2.0;
}

void main(void) {

    float frequency = 800.0;
    float amplitude = 400.0;
    float phase = nSin(u_time / 8.0) * 2.0;

    float radius = sin(vUv.x * frequency + phase) * amplitude;
    float stroke = (sin(u_time) + 1.0 * 5.0) + 5.0;

    float distonce = distance(vUv.xy, vec2(0.5, 0.5)) * 1000.0;
    
    if (distonce > radius - stroke && distonce < radius + stroke) {
        gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
    } else {
        gl_FragColor = vec4(
            (vUv.x) / 2.0 + 0.2,
            (vUv.x) / 2.0 + 0.2,
            1.0,
        1.0);
    }
}
