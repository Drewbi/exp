import { CylinderGeometry, MeshBasicMaterial, Mesh } from 'three'

export class Boid {
    geometry: CylinderGeometry
    material: MeshBasicMaterial
    mesh: Mesh
  
    constructor(x: number, y: number, rotation: number) {
        this.geometry = new CylinderGeometry(0, 10, 20, 3, 1)
        this.material = new MeshBasicMaterial( {color: '#fff'} )
        this.mesh = new Mesh( this.geometry, this.material )
        this.mesh.position.x = x
        this.mesh.position.y = y
        this.mesh.rotation.z = rotation
    }

    updateBoid(otherBoids: Boid[]) {
        this.mesh.rotation.z += 0.01
    }
}

export default Boid
