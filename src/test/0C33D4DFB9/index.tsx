import { P5CanvasInstance, ReactP5Wrapper as P5, Sketch } from "@p5-wrapper/react";

const nodesPerSide = 60
const lineWidth = 10
const maxIndex = nodesPerSide - 1
let mouseX = null
let mouseY = null

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
    last?: node
}

const map = Array.from({ length: nodesPerSide }).map(() => Array.from)

const nodes = Array.from({ length: (nodesPerSide - 1) * 4 }).map((_, i): node => {
    const sum = Math.ceil(i / 2)
    const toggle = i % 2
    const firstCoord = Math.max(0, sum - maxIndex)
    const secondCoord = sum - firstCoord
    const node = {
        x: toggle ? firstCoord : secondCoord,
        y: toggle ? secondCoord : firstCoord,
    } as node
    node.last = node
    return node
})

const growNodes = () => {
    const maxDistance = 2
    for (let i = 0; i < maxDistance; i++) {
        nodes.forEach(node => {
            const moveX = Math.floor(Math.random() * 3) - 1
            const moveY = Math.floor(Math.random() * 3) - 1
            node.last!.next = { // trust me bro, its not undefined
                x: Math.max(0, Math.min(node.last!.x + moveX, maxIndex)),
                y: Math.max(0, Math.min(node.last!.y + moveY, maxIndex)),
                prev: node.last,
            }
            node.last = node.last!.next
        })
    }
}

const clearNodes = () => {
    nodes.forEach(node => {
        node.last = node
        node.next = undefined
    })
}

const setup = (p5: P5CanvasInstance) => () => {
    p5.createCanvas(1000, 1000)
    p5.background(22)
    growNodes()
}

const draw = (p5: P5CanvasInstance) => () => {
    nodes.forEach(node => {
        let curr = node
        p5.stroke(240)
        p5.strokeWeight(lineWidth)
        p5.strokeJoin(p5.ROUND)
        p5.beginShape()
        p5.noFill()
        p5.vertex(...mapCoordToScreenSpace(curr.x, curr.y))
        while (curr.next !== undefined) {
            curr = curr.next
            p5.vertex(...mapCoordToScreenSpace(curr.x, curr.y))
        }
        p5.endShape()
    })
}

const mouseClicked = (sketch: P5CanvasInstance) => (e: any) => {
    growNodes()
}

const mouseMoved = (sketch: P5CanvasInstance) => (e: any) => {
    if (e.target && e.target.nodeName === "CANVAS") {
        mouseX = (e.pageX - e.target.offsetLeft) / e.target.clientWidth
        mouseY = (e.pageY - e.target.offsetTop) / e.target.clientHeight
    } else {
        mouseX = null
        mouseY = null
    }
}

const sketch: Sketch = (p5) => {
    p5.setup = setup(p5)
    p5.draw = draw(p5)
    p5.mouseClicked = mouseClicked(p5)
    p5.mouseMoved = mouseMoved(p5)
}

export default function App() {
    return (
        <P5 sketch={sketch} />
    )
}
