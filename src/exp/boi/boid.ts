import { CylinderGeometry, MeshBasicMaterial, Mesh, Vector3, MathUtils } from 'three'
import { Boundary, BOUNDS, BOUNDS_MARGIN } from '../../utils/map'
export class Boid {
    geometry: CylinderGeometry
    material: MeshBasicMaterial
    mesh: Mesh
    speed: number

    constructor(initialX: number, initialY: number, initialRotation: number) {
        this.geometry = new CylinderGeometry(0, 10, 20, 3, 1)
        this.material = new MeshBasicMaterial({ color: '#fff' })
        this.mesh = new Mesh(this.geometry, this.material)
        this.mesh.position.x = initialX
        this.mesh.position.y = initialY
        this.mesh.rotation.z = initialRotation
        this.speed = 5
    }

    updateBoid() {
        this.avoidWalls()
        const forward = new Vector3(0, this.speed, 0).applyAxisAngle(
            new Vector3(0, 0, 1), this.mesh.rotation.z)
        this.mesh.position.add(forward)
    }

    getClosestBoids() {
        return
    }

    avoidWalls() {
        const turnFactor = this.calcTurnFactor()
        this.mesh.rotation.z += turnFactor
    }

    calcTurnFactor() {
        return BOUNDS.reduce((prev, curr) => {
            const distanceToEdge = Math.abs(curr.offset - this.mesh.position[curr.axis])
            if (distanceToEdge < BOUNDS_MARGIN) {


                const forward = new Vector3(0, 1, 0).applyAxisAngle(
                    new Vector3(0, 0, 1), this.mesh.rotation.z)

                const normalisedAngle = forward.angleTo(curr.normal)
                // console.log('----')
                // console.log((normalisedAngle / (2 * Math.PI)) * 360)
                const turnToNormal = normalisedAngle 
                // console.log((turnToNormal / (2 * Math.PI)) * 360)

                // console.log('----')
                const distanceFactor = 1 - MathUtils.smoothstep(distanceToEdge, 0, BOUNDS_MARGIN)
                // console.log(this.calcTurnDirection(curr))
                return this.calcTurnDirection(curr) * MathUtils.lerp(prev, turnToNormal, distanceFactor) + prev
            }
            return prev
        }, 0)
    }

    calcTurnDirection(bound: Boundary): 1 | -1 {
        if (bound.axis === 'x') {
            if (this.mesh.rotation.z < Math.PI / 2 || this.mesh.rotation.z > (Math.PI / 2) * 3) {
                return bound.normal[bound.axis] < 0 ? 1 : -1
            }
            return bound.normal[bound.axis] < 0 ? -1 : 1
        }
        if (bound.axis === 'y') {
            if (this.mesh.rotation.z < Math.PI) {
                return bound.normal[bound.axis] < 0 ? 1 : -1
            }
            return bound.normal[bound.axis] < 0 ? -1 : 1
        }
        return 1
    }
}

export default Boid
