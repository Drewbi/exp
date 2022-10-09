import p5, { Vector } from "p5"

export default class Tile {
    q: number
    r: number
    s: number
    filled: boolean

    verifyCoordinates (q: number, r: number, s: number) {
        if(q + r + s !== 0) throw Error(`Invalid coordinates: q${q} r${r} s${s}`)
    }

    constructor(q: number, r: number, s: number, filled: boolean) {
        this.verifyCoordinates(q, r, s)
        this.q = q
        this.r = r
        this.s = s
        this.filled = filled
    }

    drawTile(centre: Vector, radius: number, sketch: p5) {
        this.filled ? sketch.fill(255) : sketch.noFill() 
        sketch.strokeWeight(3)
        sketch.stroke(255)
        sketch.beginShape()
        for (let i = 0; i < 6; i++) {
            const angle = sketch.radians(60 * i)
            sketch.vertex(centre.x + radius * Math.cos(angle), centre.y + radius * Math.sin(angle))
        }
        sketch.endShape(sketch.CLOSE);
    }
}