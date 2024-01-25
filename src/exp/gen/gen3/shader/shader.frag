uniform float u_time;
varying vec2 vUv;

float frame(vec2 st) {
    float margin = 0.01;
    float center = 0.5;
    float size = fract(u_time / 10.0);
    vec2 st_new = st;
    for(int i = 0; i <= 100; i ++) {
        float dist = distance(st_new, vec2(center));
        if (dist < size - margin) {
            // Fake recursion
            st_new = st_new * (1.0 / size);
            center = center * (1.0 / size);
        } else if(dist < size + margin && dist > size - margin) {
            // Ring
            return 1.0;
        } else {
            // Outside
            return 0.0;
        }
    }
}

void main(void) {
    if(frame(vUv.xy) == 1.0) {
        gl_FragColor = vec4(0.6, 0.8, 1.0, 1.0);
    } else {
        gl_FragColor = vec4(vec3(0.15), 1.0);
    }
}
