uniform float u_time;
varying vec2 vUv;

float ring(vec2 st, vec2 pos, float radius, float thickness, float smoothness) {
    return smoothstep(radius - thickness, radius - thickness + smoothness, distance(st, pos)) - smoothstep(radius + thickness - smoothness, radius + thickness, distance(st, pos));
}

void main(void) {
    float scaleFactor = 1.0;
    vec2 center = vec2(0.5);
    float dist = distance(vUv.xy + u_time, vec2(0.5));
    vec2 st = vUv.xy * fract(dist) * 10.0;
    float col = ring(st, center, 0.4 * scaleFactor, 0.05, 0.002);
    gl_FragColor = vec4(vec3(col), 1.0);
}


