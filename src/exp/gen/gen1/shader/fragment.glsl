// Random, circle and tiling code referenced from @patriciogv - https://thebookofshaders.com/09/
uniform float u_time;
varying vec2 vUv;

float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

float circle(in vec2 st, in float radius){
    vec2 l = st - vec2(0.5);
    return 1.0 - (smoothstep(radius - (radius * 0.01),
                         radius + (radius * 0.01),
                         dot(l, l) * 4.0) * 0.9);
}

vec2 offsetTile(vec2 st, float zoom){
    st *= zoom + (random(st) * sin((u_time / 4.0) - 1.0) * 3.0) + sin(u_time * 0.5) * 2.0;
    st.x += step(1.0, mod(st.y, 2.0)) * 0.5;
    return fract(st);
}

void main(void) {
    vec3 colour = vec3(
        0.0,
        0.0,
        0.0
    );

    vec2 st = vUv - 0.5;
    
    st = offsetTile(st, 30.0);

    colour = vec3(circle(st, 0.1));

    gl_FragColor = vec4(colour, 1.0);
}


