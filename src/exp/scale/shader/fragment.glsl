precision highp float;

uniform vec2 u_points[1000];
uniform float u_time;

varying vec2 vUv;

void main() {
    float radius = 0.055; 
    float superRadius = radius * 0.02;
    bool inCircle = false;
    bool superCenter = false;

    for (int i = 0; i < 500; i++) {
        vec2 toPoint = vUv.xy - u_points[i];
        if (dot(toPoint, toPoint) < superRadius) {
            superCenter = true;
            break;
        }
        if (dot(toPoint, toPoint) < radius * radius) {
            inCircle = true;
            break;
        }
    }

    if (inCircle) {
        gl_FragColor = vec4(0.98, 0.98, 0.98, 1.0);
    } else if (superCenter) {
        gl_FragColor = vec4(vUv.x, vUv.y, 1.0, 1.0);
    } else {
        gl_FragColor = vec4(0.15, 0.15, 0.15, 1.0);
    }
}