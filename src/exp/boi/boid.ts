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
import { boids, scene } from './main'
import {
    calcTurnDirectionV2,
    calcTurnFactorV2,
    getForwardVector,
    getVisibleBoids
} from './utils'
export class Boid {
    geometry: CylinderGeometry
    material: MeshBasicMaterial
    mesh: Mesh
    speed: number
    // cenDot: Mesh

    groupingFactor = 0.05
    sightRange = 120
    avoidenceRange = 60
    fieldOfView = Math.PI / 1.4
    hatred = -10

    constructor(initialX: number, initialY: number, initialRotation: number) {
        this.geometry = new CylinderGeometry(0, 10, 20, 3, 1)
        this.material = new MeshBasicMaterial({ color: '#fff' })
        this.mesh = new Mesh(this.geometry, this.material)
        this.mesh.position.x = initialX
        this.mesh.position.y = initialY
        this.mesh.rotation.z = initialRotation
        this.speed = 1

        // const dotGeo = new SphereGeometry(2)
        // const dotMat = new PointsMaterial( { color: '#333' } )
        // const dot = new Mesh(dotGeo, dotMat)
        // this.cenDot = dot
        // scene.add(dot)


    }

    updateBoid() {
        this.wiggleALittle()
        this.flyTowardsCentreV2()
        this.avoidOthers()
        this.avoidWalls()
        const forward = getForwardVector(this.mesh.rotation.z).multiplyScalar(this.speed)
        this.mesh.position.add(forward)
    }

    // flyTowardsCentre() {
    //     const visiBoids = getVisibleBoids(this, boids, this.sightRange)
    //     if (visiBoids && visiBoids.length > 0) {
    //         const centre = visiBoids.reduce((prev: Vector3, curr: Boid) => {
    //             return prev.clone().add(curr.mesh.position)
    //         }, new Vector3(0, 0, 0)).divideScalar(visiBoids.length)
    //         this.cenDot.position.set(centre.x, centre.y, centre.z)
    //         const forward = getForwardVector(this.mesh.rotation.z)
    //         const vectorToCentre = centre.sub(this.mesh.position).normalize()
    //         const angleOfTurn = vectorToCentre.angleTo(forward) * calcTurnDirectionV2(vectorToCentre, this.mesh.rotation)
    //         const endRotation = new Quaternion().setFromAxisAngle(
    //             new Vector3(0, 0, 1), angleOfTurn)
    //         const nextRotation = new Quaternion().rotateTowards(endRotation, this.groupingFactor)
    //         this.mesh.applyQuaternion(nextRotation) 
    //     }
    // }

    flyTowardsCentreV2() {
        const visiBoids = getVisibleBoids(this, boids, this.sightRange, this.fieldOfView)
        if (visiBoids && visiBoids.length > 0) {
            const centre = visiBoids.reduce((prev: Vector3, curr: Boid) => {
                return prev.clone().add(curr.mesh.position)
            }, new Vector3(0, 0, 0)).divideScalar(visiBoids.length)
            // this.cenDot.position.set(centre.x, centre.y, centre.z)
            const forward = getForwardVector(this.mesh.rotation.z)
            const vectorToCentre = centre.sub(this.mesh.position).normalize()
            const angleOfTurn = vectorToCentre.angleTo(forward)
                * calcTurnDirectionV2(vectorToCentre, this.mesh.rotation)
            const endRotation = new Quaternion().setFromAxisAngle(
                new Vector3(0, 0, 1), angleOfTurn)
            const nextRotation = new Quaternion().rotateTowards(endRotation, this.groupingFactor)
            this.mesh.applyQuaternion(nextRotation)
        }
    }

    avoidWalls() {
        const wallPoints = BOUNDS.map(bound => {
            const targetPoint = new Vector3()
            if (bound.axis === 'x') {
                targetPoint.x = this.mesh.position.x
                targetPoint.y = bound.offset
            } else {
                targetPoint.y = this.mesh.position.y
                targetPoint.x = bound.offset
            }
            return targetPoint
        })
        const turnFactor = calcTurnFactorV2(wallPoints, this.mesh.position, this.mesh.rotation, BOUNDS_MARGIN, 0)
        this.mesh.rotation.z += turnFactor
    }

    avoidOthers() {
        const visiBoidsPos = getVisibleBoids(this, boids, this.sightRange, this.fieldOfView).map(boid => boid.mesh.position)
        if (visiBoidsPos && visiBoidsPos.length > 0) {
            const turnFactor = calcTurnFactorV2(visiBoidsPos, this.mesh.position, this.mesh.rotation, this.avoidenceRange, this.hatred)
            this.mesh.rotation.z += turnFactor
        }
    }

    wiggleALittle() {
        const leftOrRight = Math.round(Math.random() * 2) - 1
        const turnFactor = leftOrRight * 0.05
        this.mesh.rotation.z += turnFactor
    }


}

export default Boid
