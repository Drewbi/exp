import { SphereGeometry, PointsMaterial, Mesh, PerspectiveCamera, Scene, WebGLRenderer, BoxGeometry, MeshBasicMaterial, OrthographicCamera, Group, BufferAttribute, BufferGeometry, Line, LineBasicMaterial } from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import { EXP_SIZE } from '../../utils/map'
import '../../utils/style.css'

export const scene = new Scene()

const dotGeo = new SphereGeometry(2)
const dotMat = new PointsMaterial( { color: '#3dbceb' } )
const resolution = 20
const MAX_ANGLE = 2 * Math.PI
let step = 0
const dots = new Group()
for(let i = 0; i <= resolution; i++) {
    for(let j = 0; j <= resolution; j++) {
        for(let k = 0; k <= resolution; k++) {
            const dot = new Mesh(dotGeo, dotMat)
            dot.position.x = Math.sin((MAX_ANGLE / resolution) * j + k) * 100 / i
            dot.position.y = Math.cos((MAX_ANGLE / resolution) * j + k) * 100 / i
            dot.position.z = Math.tan((MAX_ANGLE / resolution) * j + k) * 100 / i
            dots.add(dot)
        }
    }
}

scene.add(dots)

function updateDotPos() {
    step = (step + 1) % resolution
    for(let i = 0; i <= resolution; i++) {
        for(let j = 0; j <= resolution; j++) {
            for(let k = 0; k <= resolution; k++) {
                const dot = dots.children[i + j + k]
                // console.log(i + j + k)
                dot.position.x = 0
                dot.position.y = 0
                dot.position.z = 0
            }
        }
    }
}

const starGeo = new SphereGeometry(2)
const starMat = new PointsMaterial( { color: '#fff' } )

const NUM_STARS = 1000
const STAR_RANGE = 10000
for(let i = 0; i < NUM_STARS; i ++) {
    const star = new Mesh(starGeo, starMat)
    star.position.x = (Math.random() * STAR_RANGE) - STAR_RANGE / 2
    star.position.y = (Math.random() * STAR_RANGE) - STAR_RANGE / 2
    star.position.z = (Math.random() * STAR_RANGE) - STAR_RANGE / 2
    scene.add(star)
}

const camera = new PerspectiveCamera( 45, EXP_SIZE / EXP_SIZE, 1, 10000 )
camera.position.z = EXP_SIZE

const renderer = new WebGLRenderer({ antialias: true })
renderer.setSize( EXP_SIZE, EXP_SIZE )
document.body.appendChild( renderer.domElement )

const controls = new OrbitControls( camera, renderer.domElement )
controls.enableDamping = true
controls.dampingFactor = 0.2
controls.autoRotate = true
controls.autoRotateSpeed = 0.1

controls.update()

function animate() {

    requestAnimationFrame( animate )

    // required if controls.enableDamping or controls.autoRotate are set to true
    controls.update()

    renderer.render( scene, camera )

    // updateDotPos()
}

animate()
