import { Vector3 } from "three";

export function getBoxPos(boxX: number, boxY: number, boxZ: number, boxSize: number, gap: number, boxPerSide: number) {
    const evenNumberOffset = ((boxPerSide % 2) - 1) / 2
    const boxAndGap = (boxSize + gap)
    const x = boxX * boxAndGap - (boxAndGap * evenNumberOffset)
    const y = boxY * boxAndGap - (boxAndGap * evenNumberOffset)
    const z = boxZ * boxAndGap - (boxAndGap * evenNumberOffset)
    return new Vector3(x, y, z);
}

export function getCameraPositionAtAngle(normAngle: number, distance: number) {
    const radianAngle = normAngle * (2 * Math.PI)
    return new Vector3(distance * Math.sin(radianAngle), 0, distance * Math.cos(radianAngle))
}
