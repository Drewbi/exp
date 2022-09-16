varying vec4 vColor;

void main(void)
{  
    gl_FragColor = vec4(0.3 + vColor.y, 0.3, 1.0 - vColor.z, 1.0);
}