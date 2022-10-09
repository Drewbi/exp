import p5, { Vector } from 'p5'
import '../../utils/style.css'
import { EXP_SIZE } from '../../utils/map'
import HexGrid from './hex'
import Tile from './tile'

const container = document.getElementById( 'container' )!
export default new p5((sketch: p5) => {
  sketch.setup = () => {
    sketch.createCanvas(EXP_SIZE, EXP_SIZE)
    sketch.background(0)
    const hexMap = new HexGrid(30)
    hexMap.drawGrid(sketch)
  }

  sketch.draw = () => {
  }
}, container)

