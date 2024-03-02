import { P5CanvasInstance, ReactP5Wrapper as P5, Sketch } from '@p5-wrapper/react'
import { addSymbol } from './shapes'

const setup = (sketch: P5CanvasInstance) => () => {
    sketch.createCanvas(1000, 1000)
    sketch.background(10, 10, 10)
    addSymbol(sketch)
}

const draw = (sketch: P5CanvasInstance) => () => {
    
}

const sketch: Sketch = (p5) => {
    p5.setup = setup(p5)
    p5.draw = draw(p5)
}

export default function Anem() {
    return (
        <P5 sketch={sketch} />
    )
}
