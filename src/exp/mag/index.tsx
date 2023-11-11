import { P5CanvasInstance, ReactP5Wrapper as P5, Sketch } from "@p5-wrapper/react";
import { EXP_SIZE } from '../utils/map'
import { Vector } from "p5";

const GRID_SIZE = 20
const NUM_DOTS = 500
const NOISE_RESOLUTION = 800
const SPAWN_OFFSET = 2

interface Colour {
    r: number,
    g: number,
    b: number
}

interface Dot {
    pos: Vector
    velocity: Vector
    colour: Colour,
    dead: boolean
}

let dots: Dot[] = []
let antiDots: Dot[] = []

function initDots(number: number) {
    for (let i = 0; i < number; i++) {
        const colour: Colour = { r: 255, g: 255, b: 255 }
        const dot: Dot = { pos: new Vector(0, 0), velocity: new Vector(1, 0), colour, dead: false }
        dot.pos = getInitStart()
        dots.push(dot)
    }
}

function initAntiDots(number: number) {
    for (let i = 0; i < number; i++) {
        const colour: Colour = { r: 0, g: 0, b: 0 }
        const dot: Dot = { pos: new Vector(0, 0), velocity: new Vector(1, 0), colour, dead: false }
        dot.pos = getInitStart()
        antiDots.push(dot)
    }
}

function getInitStart(): Vector {
    return new Vector(Math.random() * EXP_SIZE, Math.random() * EXP_SIZE)
}

function getRandomStart(): Vector {
    const quadrant = Math.floor(Math.random() * 4)
    switch(quadrant) {
        case 0:
            return new Vector((Math.random() * EXP_SIZE + SPAWN_OFFSET * 2) - SPAWN_OFFSET, (Math.random() * SPAWN_OFFSET) - SPAWN_OFFSET - 2)
        case 1:
            return new Vector((Math.random() * SPAWN_OFFSET) + EXP_SIZE + SPAWN_OFFSET + 2, (Math.random() * EXP_SIZE + SPAWN_OFFSET * 2) - SPAWN_OFFSET)
        case 2:
            return new Vector((Math.random() * EXP_SIZE + SPAWN_OFFSET * 2) - SPAWN_OFFSET, (Math.random() * SPAWN_OFFSET) + EXP_SIZE + SPAWN_OFFSET + 2)
        case 3:
            return new Vector((Math.random() * SPAWN_OFFSET) - SPAWN_OFFSET - 2, (Math.random() * EXP_SIZE + SPAWN_OFFSET * 2) - SPAWN_OFFSET)
        default:
            return new Vector(0, 0)
    }
}

function drawGrid(p5: P5CanvasInstance) {
    for (let i = 0; i < GRID_SIZE; i++) {
        const x = Math.floor(EXP_SIZE / GRID_SIZE) * i
        p5.line(x, 0, x, EXP_SIZE)
        for (let j = 0; j < GRID_SIZE; j++) {
            const y = Math.floor(EXP_SIZE / GRID_SIZE) * j
            p5.line(0, y, EXP_SIZE, y)
        }
    }
}

function drawGridVectors(p5: P5CanvasInstance, offset: number) {
    let vec = new Vector(1, 1)
    for (let i = 0; i < GRID_SIZE; i++) {
        for (let j = 0; j < GRID_SIZE; j++) {
            const x = Math.floor(EXP_SIZE / GRID_SIZE) * i
            const y = Math.floor(EXP_SIZE / GRID_SIZE) * j
            vec.rotate(p5.noise(vec.x / NOISE_RESOLUTION, vec.y / NOISE_RESOLUTION) * p5.TWO_PI)
            p5.line(x, y, x + vec.x * ((EXP_SIZE / 2) / GRID_SIZE), y + vec.y * ((EXP_SIZE / 2) / GRID_SIZE))
        }
    }
}

const setup = (p5: P5CanvasInstance) => () => {
    dots = []
    p5.createCanvas(EXP_SIZE, EXP_SIZE)
    p5.background(255)

    initDots(NUM_DOTS)
    initAntiDots(NUM_DOTS)
}

const draw = (p5: P5CanvasInstance) => () => {
    p5.blendMode(p5.HARD_LIGHT)
    p5.noStroke()
    let angle = 0

    dots.forEach(dot => {
        p5.push()
        p5.fill(dot.colour.r, dot.colour.g, dot.colour.b)
        p5.ellipse(dot.pos.x, dot.pos.y, 5, 5)
        // Moving vs static field
        angle = (p5.noise(dot.pos.x / NOISE_RESOLUTION, dot.pos.y / NOISE_RESOLUTION, p5.frameCount / NOISE_RESOLUTION) * p5.TWO_PI) * 2 - 1
        // angle = (p5.noise(dot.pos.x / NOISE_RESOLUTION, dot.pos.y / NOISE_RESOLUTION) * p5.TWO_PI) * 2 - 1
        dot.velocity.x = p5.cos(angle)
        dot.velocity.y = p5.sin(angle)
        const vec = dot.velocity.copy()
        dot.pos.add(vec)
        if (dot.pos.x > EXP_SIZE + SPAWN_OFFSET + 2 || dot.pos.x < -SPAWN_OFFSET - 2 || dot.pos.y > EXP_SIZE + SPAWN_OFFSET + 2 || dot.pos.y < -SPAWN_OFFSET - 2) {

            dot.pos = getRandomStart()
        }

        p5.pop()
    })
    antiDots.forEach(dot => {
        p5.push()
        p5.fill(dot.colour.r, dot.colour.g, dot.colour.b)
        p5.ellipse(dot.pos.x, dot.pos.y, 5, 5)
        // Moving vs static field
        angle = (p5.noise(dot.pos.x / NOISE_RESOLUTION, dot.pos.y / NOISE_RESOLUTION, p5.frameCount / NOISE_RESOLUTION) * p5.TWO_PI) * 2 - 1
        // angle = (p5.noise(dot.pos.x / NOISE_RESOLUTION, dot.pos.y / NOISE_RESOLUTION) * p5.TWO_PI) * 2 - 1
        dot.velocity.x = -1 * p5.sin(angle)
        dot.velocity.y = -1 * p5.cos(angle)
        const vec = dot.velocity.copy()
        dot.pos.add(vec)
        if (dot.pos.x > EXP_SIZE + SPAWN_OFFSET + 2 || dot.pos.x < -SPAWN_OFFSET - 2 || dot.pos.y > EXP_SIZE + SPAWN_OFFSET + 2 || dot.pos.y < -SPAWN_OFFSET - 2) {

            dot.pos = getRandomStart()
        }

        p5.pop()
    })
}

const sketch: Sketch = (p5) => {
    p5.setup = setup(p5)
    p5.draw = draw(p5)
}

export default function Mag() {
    return (
        <P5 sketch={sketch} />
    )
}
