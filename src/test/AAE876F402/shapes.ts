import { P5CanvasInstance } from "@p5-wrapper/react"

function addSymbol(sketch: P5CanvasInstance, shape: number[][]) {
    sketch.push()
    sketch.noFill()
    sketch.stroke(255, 255, 255)
    sketch.strokeWeight(30)
    sketch.strokeCap(sketch.ROUND)
    sketch.strokeJoin(sketch.ROUND)
    
    sketch.beginShape()
    const start = Math.floor(Math.random() * (shape.length - 1))
    const end = Math.floor(Math.random() * (shape.length - start)) + start + 2

    shape.slice(start, end).forEach(point => sketch.vertex(point[0], point[1]))
    sketch.endShape()
    sketch.pop()
}

function addArc(sketch: P5CanvasInstance) {
    const middle = 500
    const side = 400
    sketch.push
    sketch.noFill()
    sketch.stroke(255, 255, 255)
    sketch.strokeWeight(30)
    sketch.strokeCap(sketch.ROUND)
    sketch.strokeJoin(sketch.ROUND)
    const start = Math.random() * 2 * Math.PI
    const stop = Math.random() * 2 * Math.PI
    sketch.arc(middle, middle, side, side, start, stop)
    sketch.pop()
}

function square() {
    const middle = 500
    const side = 400

    return [
        [middle - side / 2, middle - side / 2],
        [middle + side / 2, middle - side / 2],
        [middle + side / 2, middle + side / 2],
        [middle - side / 2, middle + side / 2],
        [middle - side / 2, middle - side / 2]
    ]
}

function triangle() {
    const middle = 500
    const side = 400
    const height = (1/2) * Math.sqrt(3) * side 

    return [
        [middle, middle - height / 2 + 26],
        [middle - side / 2, middle + height / 2 + 26],
        [middle + side / 2, middle + height / 2 + 26],
        [middle, middle - height / 2 + 26]
    ]
}

export { addSymbol, triangle, square, addArc }