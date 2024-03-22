import { P5CanvasInstance, ReactP5Wrapper as P5, Sketch } from "@p5-wrapper/react";
import { generateMap, drawTiles, randomiseColour, processSwitch, startSwitch, randomColourAtPostition } from "./tile";
import { numCols, numTiles, size } from "./constants";

const colourMap = generateMap(numTiles)
const switchMap = generateMap(numTiles)

let lastClickX: number | null = null
let lastClickY: number | null = null

const mouseClick = (event: any) => {
    if(event.target.tagName === "CANVAS") {
        const canvasNormalisedX = (event.pageX - event.target.offsetLeft) / event.target.clientWidth
        const tileX = Math.floor(canvasNormalisedX * numCols)
        const canvasNormalisedY = (event.pageY - event.target.offsetTop) / event.target.clientHeight
        const tileY = Math.floor(canvasNormalisedY * numCols)
        lastClickX = tileX
        lastClickY = tileY
    }
}

const setup = (p5: P5CanvasInstance) => () => {
    p5.createCanvas(size, size)
    p5.background(0)
    p5.noStroke()
    randomiseColour(colourMap)
    // setInterval(() => processSwitch(switchMap, colourMap), 1000)
}

const draw = (p5: P5CanvasInstance) => () => {
    if (lastClickX !== null && lastClickY !== null) {
        // startSwitch(switchMap, lastClickX, lastClickY)
        randomColourAtPostition(colourMap, lastClickX, lastClickY)
        lastClickX = null
        lastClickY = null
    }
    drawTiles(p5, colourMap)
}

const sketch: Sketch = (p5) => {
    p5.setup = setup(p5)
    p5.draw = draw(p5)
    p5.mouseClicked = mouseClick
}

export default function Exp() {
    return (
        <P5 sketch={sketch} />
    )
}