uniform float u_time;

void main(void) {

    vec2 center = vec2(630.0, 630.0);
    float radius = sin(gl_FragCoord.y) * cos(gl_FragCoord.x) * 400.0;
    float stroke = 10.0;
    // circle <= xx + yy = radius

    float distonce = distance(gl_FragCoord.xy + vec2(sin(u_time / 2.0) * 100.0, cos(u_time / 2.0) * 100.0), center);
    
    if (distonce > radius - stroke && distonce < radius + stroke) {
        gl_FragColor = vec4(
            1.0,
            1.0,
            1.0,
        1.0);
        return;        
    }

    gl_FragColor = vec4(
        0.1,
        0.1,
        0.1,
    1.0);
}