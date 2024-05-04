precision highp float;

uniform vec2 u_points[1000];
uniform float u_time;
uniform vec2 u_resolution;

varying vec2 vUv;

void main() {
    vec2 st = gl_FragCoord.xy / u_resolution; 
    float radius = 0.055; 
    float superRadius = radius * 0.02;
    bool inCircle = false;
    bool superCenter = false;

    for (int i = 0; i < 500; i++) {
        vec2 toPoint = st - u_points[i]; // Vector from current pixel to the center of a circle
        if (dot(toPoint, toPoint) < superRadius) {
            superCenter = true;
            break;
        }
        if (dot(toPoint, toPoint) < radius * radius) {
            inCircle = true;
            break;
        }
    }

    vec2 boxpos = vec2(170.0, 100.0) / u_resolution;
    vec2 boxsize = vec2(375.0, 520.0) / u_resolution;

    bool inBorder = st.x > boxpos.x && st.x < boxpos.x + boxsize.x && st.y > boxpos.y && st.y < boxpos.y + boxsize.y;


    if (inCircle) {
        gl_FragColor = vec4(0.98, 0.98, 0.98, 1.0);
    } else if (superCenter) {
        gl_FragColor = vec4(vUv.x, vUv.y, 1.0, 1.0);
    }else if (inBorder) {
        gl_FragColor = vec4(0.98, 0.98, 0.98, 1.0);
    } else {
        gl_FragColor = vec4(0.15, 0.15, 0.15, 1.0); // Black background
    }
}