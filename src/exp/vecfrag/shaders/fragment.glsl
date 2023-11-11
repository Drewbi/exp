varying vec4 vColor;


void main(void)
{  
    lowp vec2 st = normalize(vColor.xy);
    gl_FragColor = vec4(
        st.x,
        st.y,
        1.0,
    1.0);
}