import { Euler, MathUtils, Matrix4, Vector3 } from 'three'
import { Boundary, BOUNDS, BOUNDS_MARGIN } from '../../utils/map'
import { setInverseRotationMatrix } from '../../utils/matrix'
import Boid from './boid'

function getCentre(points: Vector3[]) {
    return points.reduce(
        (acc, curr) => acc.add(curr)
    ).divideScalar(points.length)
}

function calcTurnFactor(position: Vector3, rotation: Euler) {
    return BOUNDS.reduce((prev, curr) => {
        const distanceToEdge = Math.abs(curr.offset - position[curr.axis])
        if (distanceToEdge < BOUNDS_MARGIN) {

            const forward = new Vector3(0, 1, 0).applyAxisAngle(
                new Vector3(0, 0, 1), rotation.z)

            const normalisedAngle = forward.angleTo(curr.normal)

            const turnToNormal = normalisedAngle

            const distanceFactor = 1 - MathUtils.smoothstep(distanceToEdge, 0, BOUNDS_MARGIN)

            return calcTurnDirectionV2(curr.normal, rotation)
                * MathUtils.lerp(prev, turnToNormal, distanceFactor)
                + prev
        }
        return prev
    }, 0)
}

// function turnAwayFactor() {

// }

// function turnToFactor() {

// }

function calcTurnFactorV2(targets: Vector3[], position: Vector3, rotation: Euler, margin: number) {
    return targets.reduce((prev, curr) => {
        const distanceToTarget = position.distanceTo(curr)
        if (distanceToTarget < margin) {
            const awayFromTarget = position.clone().sub(curr)
            const forward = new Vector3(0, 1, 0).applyAxisAngle(
                new Vector3(0, 0, 1), rotation.z)

            const angleFromForward = forward.angleTo(awayFromTarget)

            const distanceFactor = 1 - MathUtils.smoothstep(distanceToTarget, 0, margin)

            return calcTurnDirectionV2(awayFromTarget.normalize(), rotation)
                * MathUtils.lerp(prev, angleFromForward, distanceFactor)
                + prev
        }
        return prev
    }, 0)
}

// function calcTurnDirection(bound: Boundary, rotation: Euler): 1 | -1 {
//     const normalisedRotation = ((rotation.z % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI)
//     if (bound.axis === 'x') {
//         if (normalisedRotation < Math.PI / 2 || normalisedRotation > (Math.PI / 2) * 3) {
//             return bound.normal[bound.axis] < 0 ? 1 : -1
//         }
//         return bound.normal[bound.axis] < 0 ? -1 : 1
//     }
//     if (bound.axis === 'y') {
//         if (normalisedRotation < Math.PI) {
//             return bound.normal[bound.axis] < 0 ? 1 : -1
//         }
//         return bound.normal[bound.axis] < 0 ? -1 : 1
//     }
//     return 1
// }

function calcTurnDirectionV2(targetVector: Vector3, currentRotation: Euler) {
    const unRotate = new Matrix4()
    setInverseRotationMatrix(unRotate, currentRotation.z)
    const unRotatedVector = targetVector.clone().applyMatrix4(unRotate)
    return unRotatedVector.x > 0 ? -1 : 1
}

function getVisibleBoids(boid: Boid, allBoids: Boid[], visibility: number): Boid[] {
    return allBoids.filter(testBoid => testBoid !== boid && 
        boid.mesh.position.distanceTo(testBoid.mesh.position) < visibility)
}

function getForwardVector(angle: number): Vector3 {
    return new Vector3(0, 1, 0).applyAxisAngle(
        new Vector3(0, 0, 1), angle)
}

export {
    getCentre,
    calcTurnFactor,
    calcTurnFactorV2,
    getVisibleBoids,
    getForwardVector,
    calcTurnDirectionV2
}