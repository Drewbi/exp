import { Euler, MathUtils, Mesh, Plane, Raycaster, Vector3 } from 'three'
import { Boundary, BOUNDING_PLANES, BOUNDS, BOUNDS_MARGIN } from '../../utils/map'
import Boid from './boid'

function getCentre(points: Vector3[]) {
    return points.reduce(
        (acc, curr) => acc.add(curr)
    ).divideScalar(points.length)
}

function getBoundingPlane(thing: Mesh): Plane {
    const forward = new Vector3(0, 1, 0).applyAxisAngle(
        new Vector3(0, 0, 1), thing.rotation.z)
    const raycaster = new Raycaster(thing.position, forward)
    return BOUNDING_PLANES.filter(
        plane => raycaster.ray.intersectsPlane(plane)
    ).reduce((prev, curr) => {
        const intersect = new Vector3()
        const currHit = raycaster.ray.intersectPlane(curr, intersect)
        if(!currHit) return prev
        const prevHit = raycaster.ray.intersectPlane(prev, intersect)
        if(!prevHit) return curr
        return thing.position.distanceTo(currHit) 
        < thing.position.distanceTo(prevHit) 
            ? curr : prev
    })
}

function getBoundingHit(thing: Mesh): Vector3 {
    const forward = new Vector3(0, 1, 0).applyAxisAngle(
        new Vector3(0, 0, 1), thing.rotation.z)
    const raycaster = new Raycaster(thing.position, forward)
    return BOUNDING_PLANES.filter(
        plane => raycaster.ray.intersectsPlane(plane)
    ).map(plane => {
        const intersect = new Vector3()
        raycaster.ray.intersectPlane(plane, intersect)
        return intersect
    }).reduce((prev, curr) => 
        thing.position.distanceTo(curr) 
        < thing.position.distanceTo(prev) 
            ? curr : prev)
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

            return calcTurnDirection(curr, rotation)
                * MathUtils.lerp(prev, turnToNormal, distanceFactor)
                + prev
        }
        return prev
    }, 0)
}

function calcTurnDirection(bound: Boundary, rotation: Euler): 1 | -1 {
    const normalisedRotation = ((rotation.z % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI)
    if (bound.axis === 'x') {
        if (normalisedRotation < Math.PI / 2 || normalisedRotation > (Math.PI / 2) * 3) {
            return bound.normal[bound.axis] < 0 ? 1 : -1
        }
        return bound.normal[bound.axis] < 0 ? -1 : 1
    }
    if (bound.axis === 'y') {
        if (normalisedRotation < Math.PI) {
            return bound.normal[bound.axis] < 0 ? 1 : -1
        }
        return bound.normal[bound.axis] < 0 ? -1 : 1
    }
    return 1
}

function getVisibleBoids(boid: Boid, allBoids: Boid[], visibility: number): Boid[] {
    return allBoids.filter(testBoid => testBoid !== boid && 
        boid.mesh.position.distanceTo(testBoid.mesh.position) < visibility)
}

function getForwardVector(angle: number): Vector3 {
    return new Vector3(0, 1, 0).applyAxisAngle(
        new Vector3(0, 0, 1), angle)
}

function closestAngleTo(origin: Vector3, vector: Vector3) {
    return new Vector3(0, 1, 0).angleTo(vector)
}
export { getCentre, getBoundingHit, getBoundingPlane, calcTurnFactor, getVisibleBoids, getForwardVector }