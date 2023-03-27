import { Euler, MathUtils, Matrix4, Mesh, Vector3 } from 'three'
import { setInverseRotationMatrix } from '../../utils/matrix'

function getCentre(points: Vector3[]) {
    return points.reduce(
        (acc, curr) => acc.add(curr)
    ).divideScalar(points.length)
}

function calcTurnFactorV2(targets: Vector3[], position: Vector3, rotation: Euler, margin: number, harshness: number) {
    return targets.reduce((prev, curr) => {
        const distanceToTarget = position.distanceTo(curr)
        if (distanceToTarget < margin) {
            const awayFromTarget = position.clone().sub(curr)
            const forward = new Vector3(0, 1, 0).applyAxisAngle(
                new Vector3(0, 0, 1), rotation.z)

            const angleFromForward = forward.angleTo(awayFromTarget)

            const distanceFactor = 1 - MathUtils.smoothstep(distanceToTarget, harshness, margin)

            return calcTurnDirectionV2(awayFromTarget.normalize(), rotation)
                * MathUtils.lerp(prev, angleFromForward, distanceFactor)
                + prev
        }
        return prev
    }, 0)
}

function calcTurnDirectionV2(targetVector: Vector3, currentRotation: Euler) {
    const unRotate = new Matrix4()
    setInverseRotationMatrix(unRotate, currentRotation.z)
    const unRotatedVector = targetVector.clone().applyMatrix4(unRotate)
    return unRotatedVector.x > 0 ? -1 : 1
}

function getVisibleBoids(boid: Mesh, allBoids: Mesh[], range: number, fov: number): Mesh[] {
    const forward = new Vector3(0, 1, 0).applyAxisAngle(
        new Vector3(0, 0, 1), boid.rotation.z)

    return allBoids.filter(testBoid => {
        const towardTarget = testBoid.position.clone().sub(boid.position)
        return testBoid !== boid
        && boid.position.distanceTo(testBoid.position) < range
        && forward.angleTo(towardTarget) < fov
    })
}

function getForwardVector(angle: number): Vector3 {
    return new Vector3(0, 1, 0).applyAxisAngle(
        new Vector3(0, 0, 1), angle)
}

export {
    getCentre,
    calcTurnFactorV2,
    getVisibleBoids,
    getForwardVector,
    calcTurnDirectionV2
}