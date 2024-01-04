import { Color } from 'p5'
import { EXP_SIZE } from '../../utils/map'
import { P5CanvasInstance, ReactP5Wrapper as P5, Sketch } from '@p5-wrapper/react'

interface colourCube {
    colour: Color,
    position: {
        x: number,
        y: number
    }
}

let viewLeft = 0
let viewRight = 0
let viewTop = 0
let viewBot = 0

let lastClickX: number | null = null
let lastClickY: number | null = null

const calcMaxScale = (left: number, right: number, top: number, bot: number) => {
    const width = (right - left) + 1
    const height = (bot - top) + 1
    return width > height ? width : height
}

const calcCubeSize = (left: number, right: number, top: number, bot: number): number => {
    const maxScale = calcMaxScale(left, right, top, bot)
    return EXP_SIZE / maxScale / 2
}

let cubeSize = calcCubeSize(viewLeft, viewRight, viewTop, viewBot)

const calcCubePosition = (left: number, right: number, top: number, bot: number, x: number, y: number): [number, number] => {
    const cubeSize = calcCubeSize(left, right, top, bot)
    const maxScale = calcMaxScale(left, right, top, bot)
    const gap = EXP_SIZE / 2 / (maxScale + 1)
    const width = (right - left) + 1
    const height = (bot - top) + 1
    const marginX = (EXP_SIZE - (width * cubeSize + ((width - 1) * gap))) / 2
    const marginY = (EXP_SIZE - (height * cubeSize + ((height - 1) * gap))) / 2
    const outX = (x - left) + marginX + ((x - left) * (cubeSize + gap))
    const outY = (y - top) + marginY + ((y - top) * (cubeSize + gap))
    return [outX, outY]
}

const cubes: colourCube[] = []

const addCube = (cube: colourCube) => {
    const cubeIndex = cubes.findIndex(oldcube => oldcube.position.x === cube.position.x && oldcube.position.y === cube.position.y)
    if(cubeIndex !== -1) {
        cubes[cubeIndex] = cube
        return
    }

    cubes.push(cube)
    if (cube.position.x < viewLeft) viewLeft = cube.position.x
    if (cube.position.x > viewRight) viewRight = cube.position.x
    if (cube.position.y < viewTop) viewTop = cube.position.y
    if (cube.position.y > viewBot) viewBot = cube.position.y
    cubeSize = calcCubeSize(viewLeft, viewRight, viewTop, viewBot)
}

const drawCube = (sketch: P5CanvasInstance, cube: colourCube) => {
    sketch.fill(cube.colour)
    const cubePos = calcCubePosition(viewLeft, viewRight, viewTop, viewBot, cube.position.x, cube.position.y)
    sketch.square(...cubePos, cubeSize)
    sketch.noStroke()
    sketch.fill(100, 0, 20)

    const circlePos = [
        { x: cubePos[0] + cubeSize / 2, y: cubePos[1] - cubeSize / 10, xchange: 0, ychange: -1 },
        { x: cubePos[0] + cubeSize / 2, y: cubePos[1] + cubeSize + cubeSize / 10, xchange: 0, ychange: 1 },
        { x: cubePos[0] - cubeSize / 10, y: cubePos[1] + cubeSize / 2, xchange: -1, ychange: 0 },
        { x: cubePos[0] + cubeSize + cubeSize / 10, y: cubePos[1] + cubeSize / 2, xchange: 1, ychange: 0 },
    ]

    const withinBound = (x: number, y: number, mouseX: number | null, mouseY: number | null, margin: number): boolean => {
        if(mouseX === null || mouseY === null) return false
        return mouseX > x - margin && mouseX < x + margin && mouseY > y - margin && mouseY < y + margin
    }

    circlePos.forEach(pos => {
        sketch.circle(pos.x, pos.y, withinBound(pos.x, pos.y, sketch.mouseX, sketch.mouseY, cubeSize / 16) ? cubeSize / 8 : cubeSize / 16)
        if(withinBound(pos.x, pos.y, lastClickX, lastClickY, sketch.max(cubeSize / 8, 10))) {
            const newColour = sketch.color(
                sketch.random(sketch.hue(cube.colour), sketch.hue(cube.colour) + 40 * pos.xchange), // Hue
                sketch.random(sketch.saturation(cube.colour), sketch.saturation(cube.colour) + 5 * sketch.random(-1, 1)), // Saturation
                sketch.random(sketch.lightness(cube.colour), sketch.lightness(cube.colour) + 15 * pos.ychange), // Lightness
            )

            addCube({
                colour: newColour,
                position: {
                    x: cube.position.x + pos.xchange, 
                    y: cube.position.y + pos.ychange
                }
            })

            lastClickX = null
            lastClickY = null
        }
    })
}

const setup = (sketch: P5CanvasInstance) => () => {
    sketch.createCanvas(EXP_SIZE, EXP_SIZE)
    sketch.colorMode(sketch.HSL, 100)
    sketch.background(0, 0, 10)
    addCube({
        colour: sketch.color(
            sketch.random(0, 100), // Hue
            sketch.random(40, 70), // Saturation
            sketch.random(60, 80), // Lightness
            ),
        position: {
            x: 0, 
            y: 0
        }
    })
}

const draw = (sketch: P5CanvasInstance) => () => {
    sketch.background(10, 10, 10)
    cubes.forEach(cube => drawCube(sketch, cube))
}

const mouseClicked = (sketch: P5CanvasInstance) => (e: object) => {
    lastClickX = sketch.mouseX
    lastClickY = sketch.mouseY
}

const sketch: Sketch = (p5) => {
    p5.setup = setup(p5)
    p5.draw = draw(p5)
    p5.mouseClicked = mouseClicked(p5)
}

export default function Gen2() {
    return (
        <P5 sketch={sketch} />
    )
}
