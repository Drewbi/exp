import p5, { Vector } from "p5"
import { EXP_SIZE } from "../utils/map"
import Tile from "./tile"

interface Map {
    [key: string]: Tile
}

export default class HexGrid {
    map: Map
    number: number

    constructor(number: number) {
        this.number = number
        this.map = {}
        for (let q = 0; q <= number; q++) {
            const offset = Math.floor(q / 2)
            for (let r = 0 - offset; r <= number - offset; r++) {
                console.log({ q, r })
                this.map[`${q}${r}`] = new Tile(q, r, (-1 * q) - r, false)
            }
        }
    }

    getTile(q: number, r: number, s: number) {
        if (q + r + s === 0) return this.map[`${q}${r}`]
        else throw Error(`Invalid coordinates: q${q} r${r} s${s}`)
    }

    drawGrid(sketch: p5) {
        const hexSize = EXP_SIZE / this.number
        for (let q = 0; q <= this.number; q++) {
            const offset = Math.floor(q / 2)
            for (let r = 0 - offset; r <= this.number - offset; r++) {
                const tile = this.getTile(q, r, (-1 * q) - r)
                const x = hexSize * (3 / 2 * tile.q) + hexSize / 2
                const y = hexSize * (Math.sqrt(3) / 2 * tile.q + Math.sqrt(3) * tile.r) - hexSize
                const centre = new Vector(x, y)
                tile.drawTile(centre, hexSize, sketch)
            }
        }
    }
}