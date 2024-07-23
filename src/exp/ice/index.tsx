import { P5CanvasInstance, ReactP5Wrapper as P5, Sketch } from "@p5-wrapper/react";

let nodesPerSide = 10
let lineWidth = 20
let palletIndex = 0
const pallet = [
    "#0e313f",
    "#1a576f",
    "#24789a",
    "#2daadb",
    "#a6e2fa",
    "#56c2ed",
]

const maxIndex = () => nodesPerSide - 1

const mapCoordToScreenSpace = (x: number, y: number): [number, number] => {
    const gridWidth = 1000 / nodesPerSide
    const offset = gridWidth / 2
    const trueX = x * gridWidth
    const trueY = y * gridWidth
    const offsetX = x === 0 ? 0 : x === maxIndex() ? offset * 2 : offset
    const offsetY = y === 0 ? 0 : y === maxIndex() ? offset * 2 : offset
    return [trueX + offsetX, trueY + offsetY]
}

interface node {
    lastX?: number
    lastY?: number
    x: number
    y: number
}

const getNodeStartingCoord = (index: number) => {
    const sum = Math.ceil(index / 2)
    const toggle = index % 2
    const firstCoord = Math.max(0, sum - maxIndex())
    const secondCoord = sum - firstCoord
    return [
        toggle ? firstCoord : secondCoord,
        toggle ? secondCoord : firstCoord,
    ]
}


const createNodes = (num: number) => {
    return Array.from({ length: num }).map((_, i): node => {
        const coord = getNodeStartingCoord(i)
        return {
            x: coord[0],
            y: coord[1],
        } as node
    })
}

let nodes = createNodes((nodesPerSide - 1) * 4);

const growNodes = () => {
    const maxDistance = 1
    for (let i = 0; i < maxDistance; i++) {
        nodes.forEach(node => {
            node.lastX = node.x
            node.lastY = node.y
            const moveX = Math.floor(Math.random() * 3) - 1
            const moveY = Math.floor(Math.random() * 3) - 1
            node.x = Math.max(0, Math.min(node.x + moveX, maxIndex()))
            node.y = Math.max(0, Math.min(node.y + moveY, maxIndex()))
        })
    }
}

const setup = (p5: P5CanvasInstance) => () => {
    p5.createCanvas(1000, 1000)
    p5.background(40)
    growNodes()
}

const draw = (p5: P5CanvasInstance) => () => {
    nodes.forEach(node => {
        p5.stroke(pallet[palletIndex])
        p5.strokeWeight(lineWidth)
        p5.strokeJoin(p5.ROUND)
        if (node.lastX && node.lastY) {
            p5.beginShape()
            p5.noFill()
            p5.vertex(...mapCoordToScreenSpace(node.lastX, node.lastY))
            p5.vertex(...mapCoordToScreenSpace(node.x, node.y))
            p5.endShape()
        }
    })
}

const mouseClicked = (sketch: P5CanvasInstance) => (e: any) => {
    nodesPerSide += 4
    nodes = createNodes((nodesPerSide - 1) * 4);
    palletIndex = (palletIndex + 1) % pallet.length
    lineWidth = Math.max(lineWidth - 2, 6)
}

const mouseMoved = (sketch: P5CanvasInstance) => (e: any) => {
    growNodes()
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
