import p5, { Color } from 'p5'
import { EXP_SIZE } from '../utils/map'

const container = document.getElementById('container')!

interface strip {
  height: number
  angle: number
  color: Color
}

const numPeaks = 1
const separation = 40
const angleVar = 1
let shapes: strip[]
let baseColor: Color

export default new p5((sketch: p5) => {
  sketch.setup = () => {
    sketch.createCanvas(EXP_SIZE, EXP_SIZE)
    baseColor = sketch.color(100, 20, 50)
    sketch.background(20)
    sketch.noStroke()
    let lastHeight = 0
    shapes = [...Array(numPeaks).keys()].map(i => {
      const color = sketch.color(100, 20, ((i / numPeaks) / 2 + 0.25) * 255)
      console.log(color)
      lastHeight = lastHeight - Math.random() * separation
      return {
        height: lastHeight,
        angle: 10 + ((Math.random() * (angleVar * 2)) - angleVar),
        color: color
      }
    })
    // shapes.reverse()
    console.log(shapes)
  }

  sketch.draw = () => {
    shapes.forEach((shape, i) => {
      sketch.fill(shape.color)
      sketch.beginShape()
      getQuad(shape.height, shape.angle, i % 2 === 0).forEach((vertex: [number, number]) => {
        sketch.vertex(...vertex)
      })
      sketch.endShape()
    })
  }
}, container)

function getQuad(height: number, angle: number, flipped: boolean): [number, number][] {
  console.log(angle)
  console.log(Math.tan(angle))
  const angleCalc = height + Math.tan(angle) * EXP_SIZE
  return [
    [flipped ? 0 : EXP_SIZE, 0],
    [flipped ? 0 : EXP_SIZE, height],
    [flipped ? EXP_SIZE : 0, angleCalc],
    [flipped ? EXP_SIZE : 0, 0]
  ]
}

// Following this sketch https://openprocessing.org/sketch/144336