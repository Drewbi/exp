import {
    Scene,
    OrthographicCamera,
    WebGLRenderer,
    PlaneGeometry,
    MeshBasicMaterial,
    Mesh,
    Vector3,
    Group,
    DoubleSide} from 'three'
import './style.css'
import Boid from './boid'
import { BOUNDS_MARGIN, EXP_SIZE } from '../../utils/map'

export const scene = new Scene()

// const bgplane = new PlaneGeometry(EXP_SIZE, EXP_SIZE)
// const bgmaterial = new MeshBasicMaterial({ color: '#080808'})
// const bg = new Mesh( bgplane, bgmaterial )
// scene.add( bg )

const wallplane = new PlaneGeometry(EXP_SIZE, 2)
const wallmaterial = new MeshBasicMaterial(
    { color: '#0099ff', side: DoubleSide}
)
const walls = new Group()
for(let i = 0; i < 4; i++) {
    const wall = new Mesh( wallplane, wallmaterial )
    const positions = [
        { rotationAxis: new Vector3(0, 0, 0), xpos: EXP_SIZE / 2, ypos: 0  + BOUNDS_MARGIN },
        { rotationAxis: new Vector3(0, 0, 1), xpos: EXP_SIZE - BOUNDS_MARGIN, ypos: EXP_SIZE / 2 },
        { rotationAxis: new Vector3(0, 0, 0), xpos: EXP_SIZE / 2, ypos: EXP_SIZE - BOUNDS_MARGIN },
        { rotationAxis: new Vector3(0, 0, 1), xpos: 0 + BOUNDS_MARGIN, ypos: EXP_SIZE / 2 },
    ]
    wall.position.z = 0
    wall.position.x = positions[i].xpos
    wall.position.y = positions[i].ypos
    wall.rotateOnAxis(positions[i].rotationAxis, Math.PI / 2 )
    walls.add(wall)
}
walls.name = 'walls'
scene.add( walls )

const camera = new OrthographicCamera(
    0, EXP_SIZE,
    0, EXP_SIZE,
    -100, 100
)
camera.zoom = 1

const renderer = new WebGLRenderer({ antialias: true })
renderer.setSize( EXP_SIZE, EXP_SIZE )
document.body.appendChild( renderer.domElement )

const createBoids = (numBoids: number) => {
    const boids: Boid[] = []
    for(let i = 0; i < numBoids; i++) {
        boids.push(new Boid(
            Math.random() * EXP_SIZE,
            Math.random() * EXP_SIZE, Math.random() * (2 * Math.PI))
        )
    }
    return boids
}
// export const boids = createBoids(10)
export const boids = [
    new Boid(500, 600, Math.PI + 0.1),
    new Boid(500, 400, -0.1)
]
boids.forEach(boid => scene.add( boid.mesh ))
boids.forEach(boid => boid.updateBoid() )

function animate() {
    requestAnimationFrame( animate )
    boids.forEach(boid => boid.updateBoid() )


    // intersects.forEach(i => i.object.material.color.set(0xff0000))
    // }
    // const { x, y, z } = getCentre(boids.map(boid => boid.mesh.position))
    // dot.position.set(20, 20, 0)
    // boids[0].mesh.rotation.z = 10
    renderer.render( scene, camera )
}

animate()