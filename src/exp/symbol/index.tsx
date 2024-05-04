import { P5CanvasInstance, ReactP5Wrapper as P5, Sketch } from '@p5-wrapper/react'
import { Point, drawSymbol, getSymbolPoints } from './shapes'

function sketch(p5: P5CanvasInstance) {
    let points = getSymbolPoints(2, true, true);
    let nextPoints = getSymbolPoints(2, true, true);
    let tick = 0

    const calcProgression = (tick: number) => 1 - (p5.cos(tick) + 1) / 2

    const updateNextPoints = () => {
        points = points.map((point, i) =>
            point.map((pos, j) => {
                return p5.lerp(pos, nextPoints[i][j], calcProgression(tick))
            }
            ) as Point
        );
        const newPoints = getSymbolPoints(2, true, true);
        nextPoints = newPoints
        tick = 0
    }

    p5.mouseClicked = updateNextPoints;

    p5.setup = () => {
        p5.createCanvas(1000, 1000)
    }
    
    p5.draw = () => {
        p5.background(40, 40, 40);
        tick += p5.deltaTime / 1000;
        drawSymbol(p5, points.map((point, i) =>
            point.map((pos, j) =>
                p5.lerp(pos, nextPoints[i][j], calcProgression(tick))
            ) as Point
        ));
        if(calcProgression(tick) > 0.9999) updateNextPoints()
    }
}

export default function Symbol() {
    return (
        <P5 sketch={sketch} />
    )
}
