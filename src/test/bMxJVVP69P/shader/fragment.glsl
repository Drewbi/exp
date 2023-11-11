uniform float u_time;

void main(void) {

    vec2 center = vec2(630.0, 630.0);
    float radius = sin(gl_FragCoord.x) * 400.0;
    float stroke = 10.0;
    // circle <= xx + yy = radius

    float distonce = distance(gl_FragCoord.xy, center);
    
    if (distonce > radius - stroke && distonce < radius + stroke) {
        gl_FragColor = vec4(
            sin(u_time),
            sin(u_time),
            sin(u_time),
        1.0);
        return;        
    }

    gl_FragColor = vec4(
        (gl_FragCoord.x / 1000.0) / 2.0 + 0.2,
        (gl_FragCoord.x / 1000.0) / 2.0 + 0.2,
        1.0,
    1.0);
}