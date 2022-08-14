import { CylinderGeometry, MeshBasicMaterial, Mesh, Vector3, SphereGeometry } from 'three'
import { boids, scene } from './main'
import { calcTurnFactor, getVisibleBoids } from './utils'
export class Boid {
    geometry: CylinderGeometry
    material: MeshBasicMaterial
    mesh: Mesh
    speed: number
    cenDot: Mesh

    constructor(initialX: number, initialY: number, initialRotation: number) {
        this.geometry = new CylinderGeometry(0, 10, 20, 3, 1)
        this.material = new MeshBasicMaterial({ color: '#fff' })
        this.mesh = new Mesh(this.geometry, this.material)
        this.mesh.position.x = initialX
        this.mesh.position.y = initialY
        this.mesh.rotation.z = initialRotation
        this.speed = 3
        const dotGeo = new SphereGeometry(2)
        const dotMat = new MeshBasicMaterial(
            { color: '#0099ff' }
        )
        const dot = new Mesh(dotGeo, dotMat)
        this.cenDot = dot
        scene.add(dot)
    }

    updateBoid() {
        this.flyTowardsCentre()
        this.avoidWalls()
        const forward = new Vector3(0, this.speed, 0).applyAxisAngle(
            new Vector3(0, 0, 1), this.mesh.rotation.z)
        this.mesh.position.add(forward)
    }

    flyTowardsCentre() {
        const visiBoids = getVisibleBoids(this, boids, 300)
        const cen = visiBoids.reduce((prev: Vector3, curr: Boid) => {
            return prev.clone().add(curr.mesh.position)
        }, new Vector3(0, 0, 0)).divideScalar(visiBoids.length)
        this.cenDot.position.set(cen.x, cen.y, cen.z)
        this.mesh.rotation
    }

    avoidWalls() {
        const turnFactor = calcTurnFactor(this.mesh.position, this.mesh.rotation)
        this.mesh.rotation.z += turnFactor
    }
}

export default Boid
