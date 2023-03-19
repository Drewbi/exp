varying lowp vec4 vColor;

void main() {
    lowp vec2 st = normalize(gl_FragCoord.xy);
    gl_FragColor = vec4(st.x, st.y, 1.0, 1.0);
}