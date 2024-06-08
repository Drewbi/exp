import { P5CanvasInstance, ReactP5Wrapper as P5, Sketch } from "@p5-wrapper/react";

const nodesPerSide = 80
const maxIndex = nodesPerSide - 1
let isDark = false

setInterval(() => {
    growNodes()
}, 100)

setInterval(() => {
    clearNodes()
    isDark = !isDark
}, 3000)

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
    x: number
    y: number
    prev?: node
    next?: node
}

const nodes = Array.from({ length: (nodesPerSide - 1) * 4 }).map((_, i): node => {
    const sum = Math.ceil(i / 2)
    const toggle = i % 2
    const firstCoord = Math.max(0, sum - maxIndex)
    const secondCoord = sum - firstCoord
    return {
        x: toggle ? firstCoord : secondCoord,
        y: toggle ? secondCoord : firstCoord,
    }
})

const growNodes = () => {
    const maxDistance = 8
    for (let i = 0; i < maxDistance; i++) {
        nodes.forEach(node => {
            let lastNode = node
            while (lastNode.next !== undefined) {
                lastNode = lastNode.next
            }
            const moveX = Math.floor(Math.random() * 3) - 1
            const moveY = Math.floor(Math.random() * 3) - 1
            lastNode.next = {
                x: Math.max(0, Math.min(lastNode.x + moveX, maxIndex)),
                y: Math.max(0, Math.min(lastNode.y + moveY, maxIndex)),
                prev: lastNode,
            }
        })
    }
}

const clearNodes = () => {
    nodes.forEach(node => node.next = undefined)
}



const setup = (p5: P5CanvasInstance) => () => {
    p5.createCanvas(1000, 1000)
    p5.background(22)
    growNodes()
}

const draw = (p5: P5CanvasInstance) => () => {
    nodes.forEach(node => {
        let curr = node
        p5.stroke(isDark ? 22 : 240)
        p5.strokeWeight(8)
        p5.strokeJoin(p5.ROUND)
        p5.beginShape(p5.LINES)
        p5.vertex(...mapCoordToScreenSpace(curr.x, curr.y))
        while (curr.next !== undefined) {
            curr = curr.next
            p5.vertex(...mapCoordToScreenSpace(curr.x, curr.y))
        }
        p5.endShape()
    })
}

const mouseClicked = (sketch: P5CanvasInstance) => (e: object) => {
    growNodes()
}

const sketch: Sketch = (p5) => {
    p5.setup = setup(p5)
    p5.draw = draw(p5)
    p5.mouseClicked = mouseClicked(p5)
}

export default function App() {
    return (
        <P5 sketch={sketch} />
    )
}
