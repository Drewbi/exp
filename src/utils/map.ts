import { Plane, Vector3 } from 'three'

export const EXP_SIZE = 1000

export const BOUNDING_PLANES = [
    new Plane(new Vector3(1, 0, 0), 0),
    new Plane(new Vector3(1, 0, 0), -1 * EXP_SIZE),
    new Plane(new Vector3(0, 1, 0), 0),
    new Plane(new Vector3(0, 1, 0), -1 * EXP_SIZE),
]

export interface Boundary {
  axis: 'x' | 'y' | 'z',
  normal: Vector3,
  offset: number
} 

export const BOUNDS: Boundary[] = [
    { axis: 'x', normal: new Vector3(1, 0, 0), offset: 0 },
    { axis: 'x', normal: new Vector3(-1, 0, 0), offset: EXP_SIZE },
    { axis: 'y', normal: new Vector3(0, 1, 0), offset: 0 },
    { axis: 'y', normal: new Vector3(0, -1, 0), offset: EXP_SIZE },
]

export const BOUNDS_MARGIN = 100