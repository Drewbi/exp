import { P5CanvasInstance } from "@p5-wrapper/react"
import { numCols, tileSize } from "./constants"

const colours = [
    '#FBFCFF',
    '#7F7EFF',
    '#A390E4',
    '#FE938C',
    '#373F51',
]

const convertIndexToXY = (i: number): [number, number] => {
    return [i % numCols, Math.floor(i / numCols)]
}

const convertXYToIndex = (x: number, y: number) => {
    return x + y * numCols
}

export const drawTiles = (p5: P5CanvasInstance, colorMap: number[]) => {
    colorMap.forEach((tileColour, i) => {
        p5.fill(p5.color(colours[tileColour]))
        p5.square(...tile(...convertIndexToXY(i), tileSize))
    })
}

const getRandomColour = (current?: number) => {
    let newColour = current
    while (newColour === current) {
        newColour = Math.floor(Math.random() * colours.length)
    }
    return newColour as number
}

export const randomiseColour = (colorMap: number[]) => {
    colorMap.forEach((_, i) => {
        colorMap[i] = getRandomColour()
    })
}

export const randomColourAtPostition = (colorMap: number[], xin: number, yin: number) => {
    const i = convertXYToIndex(xin, yin)
    colorMap[i] = getRandomColour(colorMap[i])
}

export const startSwitch = (switchMap: number[], x: number, y: number) => {
    switchMap[convertXYToIndex(x, y)] += 1
}

export const processSwitch = (switchMap: number[], colorMap: number[], startX?: number, startY?: number) => {
    switchMap.forEach((tile, i) => {
        getTouchingIndeces(...convertIndexToXY(i)).forEach(touchingi => { 
            if(touchingi !== null && switchMap[touchingi] !== tile) {
                switchMap[touchingi] = tile
                randomColourAtPostition(colorMap, ...convertIndexToXY(touchingi))
            }
        })
    })
}

const tile = (x: number, y: number, size: number): [number, number, number] => {
    return [x * size, y * size, size]
}

const getTouchingIndeces = (x: number, y: number): (number | null)[] => {
    const left = x - 1 >= 0 ? convertXYToIndex(x - 1, y) : null
    const top = y - 1 >= 0 ? convertXYToIndex(x, y - 1) : null
    const right = x + 1 < numCols - 1 ? convertXYToIndex(x + 1, y) : null
    const bottom = y + 1 < numCols - 1 ? convertXYToIndex(x, y + 1) : null
    return [left, top, right, bottom]
}

export const generateMap = (numTiles: number): number[] => Array(numTiles).fill(0)
