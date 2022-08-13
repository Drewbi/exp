import { Mesh, Plane, Raycaster, Vector3 } from 'three'
import { BOUNDING_PLANES } from '../../utils/map'

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

export { getCentre, getBoundingHit, getBoundingPlane }