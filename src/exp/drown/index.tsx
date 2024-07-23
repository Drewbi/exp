import { P5CanvasInstance, ReactP5Wrapper as P5, Sketch } from "@p5-wrapper/react";

const nodesPerSide = 60
const lineWidth = 8
const maxIndex = nodesPerSide - 1
let isDark = false

setInterval(() => {
    growNodes()
}, 20)

setInterval(() => {
    nodes = initNodes()
    isDark = !isDark
}, 6000)

const mapCoordToScreenSpace = (x: number, y: number): [number, number] => {
    const gridWidth = 1000 / nodesPerSide
    const offset = gridWidth / 2
    const trueX = x * gridWidth
    const trueY = y * gridWidth
    const offsetX = x === 0 ? 0 : x === maxIndex ? offset * 2 : offset
    const offsetY = y === 0 ? 0 : y === maxIndex ? offset * 2 : offset
    return [trueX + offsetX, trueY + offsetY]
}

interface node {
    x1: number
    y1: number
    x2: number
    y2: number
}

const initNodes = () => {
    return Array.from({ length: (nodesPerSide - 1) * 4 }).map((_, i): node => {
        const sum = Math.ceil(i / 2)
        const toggle = i % 2
        const firstCoord = Math.max(0, sum - maxIndex)
        const secondCoord = sum - firstCoord
        const moveX = Math.floor(Math.random() * 3) - 1
        const moveY = Math.floor(Math.random() * 3) - 1
        const startX = toggle ? firstCoord : secondCoord
        const startY = toggle ? secondCoord : firstCoord

        return {
            x1: startX,
            y1: startY,
            x2: Math.max(0, Math.min(startX + moveX, maxIndex)),
            y2: Math.max(0, Math.min(startY + moveY, maxIndex)),
        }
    })
}

const limitRange = (min: number, max: number, num: number) => Math.max(min, Math.min(max, num))

const centeredRandomInt = (max: number) => Math.floor(Math.random() * (max * 2 + 1)) - max

let nodes: node[] = initNodes()

const growNodes = () => {
    const maxDistance = 4
    for (let i = 0; i < maxDistance; i++) {
        nodes.forEach(node => {
            node.x1 = limitRange(0, maxIndex, node.x1 + centeredRandomInt(1))
            node.y1 = limitRange(0, maxIndex, node.y1 + centeredRandomInt(1))
            node.x2 = limitRange(0, maxIndex, node.x1 + centeredRandomInt(1))
            node.y2 = limitRange(0, maxIndex, node.y1 + centeredRandomInt(1))
        })
    }
}

const setup = (p5: P5CanvasInstance) => () => {
    p5.createCanvas(1000, 1000)
    p5.background(40)
}

const draw = (p5: P5CanvasInstance) => () => {
    nodes.forEach(node => {
        let curr = node
        p5.stroke(isDark ? 40 : 240)
        p5.strokeWeight(lineWidth)
        p5.strokeJoin(p5.ROUND)
        p5.beginShape()
        p5.noFill()
        p5.vertex(...mapCoordToScreenSpace(curr.x1, curr.y1))
        p5.vertex(...mapCoordToScreenSpace(curr.x2, curr.y2))
        p5.endShape()
    })
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
