import { Vector } from 'p5'
import { EXP_SIZE } from '../utils/map'
import { P5CanvasInstance, ReactP5Wrapper as P5, Sketch } from '@p5-wrapper/react'

const GRID_SIZE = 100
const NUM_DOTS = 2000
const NOISE_RESOLUTION = 1000

interface dot {
    pos: Vector
    velocity: Vector
    colour: number[]
}
const dots: dot[] = []

const radius = 300

function initDots(number: number) {
    for (let i = 0; i < number; i++) {
        // dots.push({ pos: new Vector(Math.random() * EXP_SIZE, Math.random() * EXP_SIZE), velocity: new Vector(1, 0)})
        dots.push({
            pos: new Vector((Math.random() * EXP_SIZE + 100) - 50, (Math.random() * EXP_SIZE + 100) - 50),
            velocity: new Vector(1, 0),
            colour: [80, 150 + Math.random() * (254 - 100), 255]
        })
    }
}

function drawGrid(sketch: P5CanvasInstance) {
    for (let i = 0; i < GRID_SIZE; i++) {
        const x = Math.floor(EXP_SIZE / GRID_SIZE) * i
        sketch.line(x, 0, x, EXP_SIZE)
        for (let j = 0; j < GRID_SIZE; j++) {
            const y = Math.floor(EXP_SIZE / GRID_SIZE) * j
            sketch.line(0, y, EXP_SIZE, y)
        }
    }
}

function drawGridVectors(sketch: P5CanvasInstance, offset: number) {
    let vec = new Vector(1, 1)
    for (let i = 0; i < GRID_SIZE; i++) {
        for (let j = 0; j < GRID_SIZE; j++) {
            const x = Math.floor(EXP_SIZE / GRID_SIZE) * i
            const y = Math.floor(EXP_SIZE / GRID_SIZE) * j
            vec.rotate(sketch.noise(vec.x / NOISE_RESOLUTION, vec.y / NOISE_RESOLUTION) * sketch.TWO_PI)
            sketch.line(x, y, x + vec.x * ((EXP_SIZE / 2) / GRID_SIZE), y + vec.y * ((EXP_SIZE / 2) / GRID_SIZE))
        }
    }
}

let count = 0
let increaseColor = true
const setup = (sketch: P5CanvasInstance) => () => {
        sketch.createCanvas(EXP_SIZE, EXP_SIZE)
        sketch.background(0, 10, 20)

        initDots(NUM_DOTS)
}

const draw = (sketch: P5CanvasInstance) => () => {
    if (count <= 0) increaseColor = true
    if (count >= 254 - 150) increaseColor = false
    count += increaseColor ? 1 : -1
    sketch.stroke(0, 0, 0)
    sketch.strokeWeight(1)
    // sketch.strokeWeight(1)
    // drawGrid(sketch)
    // drawGridVectors(sketch, 0)
    sketch.noStroke()
    sketch.fill(0, 10, 50, 5)
    sketch.rect(0, 0, EXP_SIZE, EXP_SIZE)

    let angle = 0
    dots.forEach(dot => {
        sketch.fill(dot.colour)
        sketch.ellipse(dot.pos.x, dot.pos.y, 5, 5)
        // angle = (sketch.noise(dot.pos.x / NOISE_RESOLUTION, dot.pos.y / NOISE_RESOLUTION, sketch.frameCount / NOISE_RESOLUTION) * sketch.TWO_PI) * 2 - 1
        angle = (sketch.noise(dot.pos.x / NOISE_RESOLUTION, dot.pos.y / NOISE_RESOLUTION) * sketch.TWO_PI) * 2 - 1
        dot.velocity.x = sketch.cos(angle)
        dot.velocity.y = sketch.sin(angle)
        const vec = dot.velocity.copy()
        dot.pos.add(vec)
        if (dot.pos.x > EXP_SIZE || dot.pos.x < 0 || dot.pos.y > EXP_SIZE || dot.pos.y < 0) {
            dot.pos.x = sketch.random(EXP_SIZE + 100) - 50
            dot.pos.y = sketch.random(EXP_SIZE + 100) - 50
        }
    })
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

// Following this sketch https://editor.p5js.org/ada10086/sketches/r1gmVaE07