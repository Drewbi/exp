import { P5CanvasInstance } from "@p5-wrapper/react"
import { randomNumber } from "../../utils/random"

type Point = [number, number]
const MAX_BOUNDS = 1000

function addSymbol(sketch: P5CanvasInstance) {
    sketch.push()
    sketch.noFill()
    sketch.stroke(255, 255, 255)
    sketch.strokeWeight(30)
    sketch.strokeCap(sketch.ROUND)
    sketch.strokeJoin(sketch.ROUND)
    
    sketch.beginShape()
    const points = getSymbolPoints(2, true, true)
    points.forEach(point => sketch.vertex(...point))
    sketch.endShape()
    sketch.pop()
}

function getSymbolPoints(numberPoints: number, xSymm: boolean, ySymm: boolean): Point[] {
    const startingPoint = randPoint()
    const pointsList: Point[] = [startingPoint]
    for(let i = 0; i < numberPoints; i++) {
        let next = randPoint()
        while(pointsList.length > 1 && hasIntersects(next, pointsList)) {
            next = randPoint()
        }
        pointsList.push(next)
    }
    if(xSymm) {
        for(let i = pointsList.length - 1; i >= 0; i--) {
            const altPoint: Point = [MAX_BOUNDS - pointsList[i][0], pointsList[i][1]]
            pointsList.push([...altPoint])
        }
    }
    if(ySymm) {
        for(let i = pointsList.length - 1; i >= 0; i--) {
            const altPoint: Point = [pointsList[i][0], MAX_BOUNDS - pointsList[i][1]]
            pointsList.push([...altPoint])
        }
    }
    pointsList.push(pointsList[0])
    return pointsList;
}

function randPoint(): Point {
    return [randomNumber(MAX_BOUNDS), randomNumber(MAX_BOUNDS)]
}

function intersects(a: Point, b: Point, c: Point, d: Point) {
    var det, gamma, lambda;
    det = (b[0] - a[0]) * (d[1] - c[1]) - (d[0] - c[0]) * (b[1] - a[1]);
    if (det === 0) {
      return false;
    } else {
      lambda = ((d[1] - c[1]) * (d[0] - a[0]) + (c[0] - d[0]) * (d[1] - a[1])) / det;
      gamma = ((a[1] - b[1]) * (d[0] - a[0]) + (b[0] - a[0]) * (d[1] - a[1])) / det;
      return (0 < lambda && lambda < 1) && (0 < gamma && gamma < 1);
    }
};

function hasIntersects(nextPoint: Point, list: Point[]) {
    list.some(
        (point, i, arr) => {
            if (i === arr.length - 1) return false
            return intersects(nextPoint, arr[arr.length - 1], point, arr[i + 1])
        })
}

export { addSymbol }