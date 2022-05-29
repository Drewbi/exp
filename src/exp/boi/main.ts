import { Scene, OrthographicCamera, WebGLRenderer, PlaneGeometry, MeshBasicMaterial, Mesh } from 'three'
import './style.css'
import Boid from './boid'
const EXPSIZE = 1000

const scene = new Scene()

const plane = new PlaneGeometry(1000, 1000)
const material = new MeshBasicMaterial({ color: '#080808'})
const bg = new Mesh( plane, material )

scene.add( bg )

const camera = new OrthographicCamera( EXPSIZE / - 2, EXPSIZE / 2, EXPSIZE / 2, EXPSIZE / - 2, 0.0001, 10000 )
camera.position.z = 100

const renderer = new WebGLRenderer({ antialias: true })
renderer.setSize( EXPSIZE, EXPSIZE )
document.body.appendChild( renderer.domElement )

const createBoids = (numBoids: number) => {
    const boids: Boid[] = []
    for(let i = 0; i < numBoids; i++) {
        boids.push(new Boid((Math.random() * EXPSIZE) - EXPSIZE / 2, (Math.random() * EXPSIZE) - EXPSIZE / 2, 0))
    }
    return boids
}

const boids = createBoids(10)
boids.forEach(boid => scene.add( boid.mesh ))

function animate() {
    requestAnimationFrame( animate )

    boids.forEach(boid => boid.updateBoid(boids) )

    renderer.render( scene, camera )
}

animate()