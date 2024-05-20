import { Vector3 } from "three";

export function getCameraPositionAtAngle(normAngle: number, distance: number) {
    const radianAngle = normAngle * (2 * Math.PI)
    return new Vector3(distance * Math.sin(radianAngle), 0, distance * Math.cos(radianAngle))
}

export function randomXZforY(y: number, max: number, snap: number): number[] {
    const scaledRandomX = ((Math.random() - 0.5) * 2)
    const scaledRandomZ = ((Math.random() - 0.5) * 2)
    const x = (Math.floor((Math.sin(scaledRandomX) * (max / y) * 400) / snap)) * snap
    const z = (Math.floor((Math.cos(scaledRandomZ) * (max / y) * 40) / snap)) * snap
    return [x, z]
}

export function randomSnap(max: number, snap: number) {
    const scaledRandom = ((Math.random() - 0.5) * 2)
    return (Math.floor((scaledRandom * max) / snap)) * snap
}
