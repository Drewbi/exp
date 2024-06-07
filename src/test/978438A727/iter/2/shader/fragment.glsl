uniform float u_time;
uniform vec2 u_mouse;
varying vec2 vUv;

vec3 colours[5] = vec3[5](
    vec3(0.984, 0.988, 1.0),      // #FBFCFF
    vec3(0.498, 0.494, 1.0),      // #7F7EFF
    vec3(0.639, 0.565, 0.894),    // #A390E4
    vec3(0.996, 0.576, 0.549),    // #FE938C
    vec3(0.216, 0.247, 0.318)     // #373F51
);

float numColours = 5.0;

float random (in vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

void main(void) {
    vec2 sizeValues = floor((1.0 - abs(vUv - u_mouse)) * 20.0);
    float combinedValue = sizeValues.x + sizeValues.y;
    float colSize = 1.0 / combinedValue;
    vec2 rootCoord = vec2(floor(vUv.x / colSize),
                          floor(vUv.y / colSize));

    int colIndex = int(floor(random(rootCoord) * numColours));

    gl_FragColor = vec4(colours[colIndex], 1.0);
}
