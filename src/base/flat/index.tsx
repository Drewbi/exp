import { P5CanvasInstance, ReactP5Wrapper as P5, Sketch } from "@p5-wrapper/react";

const size = 1000
const shapewidth = 100
const centerOffset = size / 2 - 100 / 2

const setup = (p5: P5CanvasInstance) => () => {
    p5.createCanvas(1000, 1000)
    p5.background(255)
}

const draw = (p5: P5CanvasInstance) => () => {
    p5.circle(centerOffset, centerOffset, shapewidth)
}

const sketch: Sketch = (p5) => {
    p5.setup = setup(p5)
    p5.draw = draw(p5)
}

export default function Mag() {
    return (
        <P5 sketch={sketch} />
    )
}
