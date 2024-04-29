precision highp float;

uniform vec2 u_points[1000];
uniform float u_time;
uniform vec2 u_resolution;

varying vec2 vUv;

void main() {
    vec2 st = gl_FragCoord.xy / u_resolution; 
    float radius = 0.06; 
    float superRadius = radius * 0.02;
    bool inCircle = false;
    bool superCenter = false;

    for (int i = 0; i < 1000; i++) {
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

    vec2 boxpos = vec2(100.0, 100.0);
    vec2 boxsize = vec2(100.0, 100.0);

    float borderThickness = 5.0;

    bool inBorder = 
        (st.x > boxpos.x && st.x < boxpos.x + boxsize.x && // Within box width
        (abs(st.y - boxpos.y) < borderThickness || abs(st.y - (boxpos.y + boxsize.y)) < borderThickness)) // Top or bottom border
        ||
        (st.y > boxpos.y && st.y < boxpos.y + boxsize.y && // Within box height
        (abs(st.x - boxpos.x) < borderThickness || abs(st.x - (boxpos.x + boxsize.x)) < borderThickness)); // Left or right border


    if (inCircle || inBorder) {
        gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0); // White color for circles
    } else if (superCenter) {
        gl_FragColor = vec4(vUv.x, vUv.y, 1.0, 1.0);
    } else {
        gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0); // Black background
    }
}