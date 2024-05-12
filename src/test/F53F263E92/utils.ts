import { Vector3 } from "three";

export function getCameraPositionAtAngle(normAngle: number, distance: number) {
    const radianAngle = normAngle * (2 * Math.PI)
    return new Vector3(distance * Math.sin(radianAngle), 0, distance * Math.cos(radianAngle))
}

export function randomXZforY(y: number, max: number, snap: number) {
    return (Math.floor((((Math.random() - 0.5) * 2) * (max / y)) * 100 / snap)) * snap
}

export function randomSnap(max: number, snap: number) {
    return (Math.floor((((Math.random() - 0.5) * 2) * max) / snap)) * snap
}
