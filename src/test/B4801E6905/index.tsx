import { P5CanvasInstance, ReactP5Wrapper as P5, Sketch } from "@p5-wrapper/react";

const canvas_size = 1000
const initialRadius = 10
const SegnumNum = 7
const speed = 0.2
const chaos = 5

interface Point {
    x: number,
    y: number
}

const centrePoint = { x: canvas_size / 2, y: canvas_size / 2 }

const findPointAtAngle = (centre: Point, angle: number, radius: number): Point => ({
    x: centre.x + Math.sin(angle) * radius,
    y: centre.y + Math.cos(angle) * radius
})

const initRadiusValue = (segments: number, initValue: number): number[] => {
    return Array.from({ length: segments }).map(() => initValue)
}

const initRadiusRandom = (segments: number, baseValue: number, maxValue: number): number[] => {
    return Array.from({ length: segments }).map(() => (Math.random() * maxValue) + baseValue)
}

const circleRadius = initRadiusRandom(SegnumNum, speed, chaos)

const setup = (p5: P5CanvasInstance) => () => {
    p5.createCanvas(1000, 1000)
    p5.background(255)
}

const drawCircle = (p5: P5CanvasInstance, startRadius: number, pattern: number[], iteration: number) => {
    p5.beginShape()
    for (let i = 0; i < pattern.length; i++) {
        const angle = ((2 * Math.PI) / pattern.length) * i
        const point = findPointAtAngle(centrePoint, angle, startRadius + pattern[i] * iteration)
        p5.curveVertex(point.x, point.y)
    }

    const angle1 = ((2 * Math.PI) / pattern.length) * 0
    const point1 = findPointAtAngle(centrePoint, angle1, startRadius + pattern[0] * iteration)
    p5.curveVertex(point1.x, point1.y)
    const angle2 = ((2 * Math.PI) / pattern.length) * 1
    const point2 = findPointAtAngle(centrePoint, angle2, startRadius + pattern[1] * iteration)
    p5.curveVertex(point2.x, point2.y)
    const angle3 = ((2 * Math.PI) / pattern.length) * 2
    const point3 = findPointAtAngle(centrePoint, angle3, startRadius + pattern[2] * iteration)
    p5.curveVertex(point3.x, point3.y)
    p5.endShape()
}

let tick = 0
const period = 20 // VERY PERFORMANCE INTENSIVE
const numCircs = Math.ceil(
    (((canvas_size / 2) - initialRadius) * Math.sqrt(2)) / period / speed
)

const draw = (p5: P5CanvasInstance) => () => {
    console.log(circleRadius)
    tick++
    p5.background(255)
    p5.stroke(10)
    p5.strokeWeight(1)
    p5.noFill()
    drawCircle(p5, initialRadius, circleRadius, 0)

    for (let i = 0; i < numCircs; i++) {
        drawCircle(p5, initialRadius, circleRadius, i * period + tick % period)
    }
}

const sketch: Sketch = (p5) => {
    p5.setup = setup(p5)
    p5.draw = draw(p5)
}

export default function App() {
    return (
        <P5 sketch={sketch} />
    )
}
