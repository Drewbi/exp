import {
    CylinderGeometry,
    MeshBasicMaterial,
    Mesh,
    Vector3,
    SphereGeometry,
    PointsMaterial,
    Quaternion
} from 'three'
import { BOUNDS, BOUNDS_MARGIN } from '../utils/map'
import {
    calcTurnDirectionV2,
    calcTurnFactorV2,
    getForwardVector,
    getVisibleBoids
} from './utils'


const groupingFactor = 0.05
const sightRange = 120
const avoidenceRange = 40
const fieldOfView = Math.PI / 1.4
const hatred = -50

function flyTowardsCentre(mesh: Mesh) {
    const visiBoids = getVisibleBoids(mesh, [], sightRange, fieldOfView)
    if (visiBoids && visiBoids.length > 0) {
        const centre = visiBoids.reduce((prev: Vector3, curr: Mesh) => {
            return prev.clone().add(curr.position)
        }, new Vector3(0, 0, 0)).divideScalar(visiBoids.length)
        // this.cenDot.position.set(centre.x, centre.y, centre.z)
        const forward = getForwardVector(mesh.rotation.z)
        const vectorToCentre = centre.sub(mesh.position).normalize()
        const angleOfTurn = vectorToCentre.angleTo(forward)
            * calcTurnDirectionV2(vectorToCentre, mesh.rotation)
        const endRotation = new Quaternion().setFromAxisAngle(
            new Vector3(0, 0, 1), angleOfTurn)
        const nextRotation = new Quaternion().rotateTowards(endRotation, groupingFactor)
        mesh.applyQuaternion(nextRotation)
    }
}

function avoidWalls(mesh: Mesh) {
    const wallPoints = BOUNDS.map(bound => {
        const targetPoint = new Vector3()
        if (bound.axis === 'x') {
            targetPoint.x = mesh.position.x
            targetPoint.y = bound.offset
        } else {
            targetPoint.y = mesh.position.y
            targetPoint.x = bound.offset
        }
        return targetPoint
    })
    const turnFactor = calcTurnFactorV2(wallPoints, mesh.position, mesh.rotation, BOUNDS_MARGIN, 0)
    mesh.rotation.z += turnFactor
}

function avoidOthers(mesh: Mesh) {
    const visiBoidsPos = getVisibleBoids(mesh, [], sightRange, fieldOfView).map(boid => boid.position)
    if (visiBoidsPos && visiBoidsPos.length > 0) {
        const turnFactor = calcTurnFactorV2(visiBoidsPos, mesh.position, mesh.rotation, avoidenceRange, hatred)
        mesh.rotation.z += turnFactor
    }
}

function wiggleALittle(mesh: Mesh) {
    const leftOrRight = Math.round(Math.random() * 2) - 1
    const turnFactor = leftOrRight * 0.05
    mesh.rotation.z += turnFactor
}

export default { flyTowardsCentre, avoidWalls, avoidOthers, wiggleALittle }
