varying vec4 vColor;


void main(void)
{  
    gl_FragColor = vec4(
        abs(vColor.x - 0.5) + 0.1,
        abs(vColor.y - 0.5) + 0.3,
        abs(vColor.z - 0.5) + 0.3,
    1.0);
}