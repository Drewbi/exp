uniform float u_time;
uniform vec2 u_size;

void main(void) {
    vec2 center = u_size;
    float radius = sin(gl_FragCoord.y) * cos(gl_FragCoord.x) * ((u_size.x / 1.2) + cos(u_time / 1.5) * 40.0);
    float stroke = 6.0 + (sin((u_time + 100.0) / 1.5) + 0.4) * 8.0;
    // circle <= xx + yy = radius

    float distonce = distance(gl_FragCoord.xy, center);
    
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
