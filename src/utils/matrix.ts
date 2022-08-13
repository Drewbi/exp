import { Matrix4 } from 'three'

export const setRotationMatrix = (matrix: Matrix4, angle: number) => {
    matrix.set(Math.cos(angle), -1 * Math.sin(angle), 0, 0,
        Math.sin(angle), Math.cos(angle), 0, 0,
        0, 0, 1, 0,
        0,0, 0, 1)
}
