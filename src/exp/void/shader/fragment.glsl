uniform float u_time;
varying vec2 vUv;

float ring(vec2 st, vec2 pos, float radius, float thickness, float smoothness) {
    return smoothstep(radius - thickness, radius - thickness + smoothness, distance(st, pos)) - smoothstep(radius + thickness - smoothness, radius + thickness, distance(st, pos));
}

float frame(vec2 st) {
    float margin = 0.001;
    float center = 0.5;
    float size = 0.96;
    vec2 st_new = st;
    for(int i = 0; i <= 100; i ++) {
        float dist = distance(st_new, vec2(center));
        if (dist < size - margin) {
            // Fake recursion
            st_new = st_new * (1.0 / size);
            center = center * (1.0 / size);
        } else {
            float x = 1.0 + sin(u_time) / 5.0;
            float y = 1.0 + cos(u_time) / 5.0;
            return ring(st_new, vec2(x, y), 1.0, 0.004, 0.001);
        }
    }
}

void main(void) {
    gl_FragColor = vec4(clamp(vec3(frame(vUv.xy)), vec3(0.15), vec3(0.98)), 1.0);
}

