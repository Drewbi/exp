import {
    SphereGeometry,
    PointsMaterial,
    PerspectiveCamera,
    Scene,
    WebGLRenderer,
    Vector2,
    InstancedMesh,
    Object3D
} from 'three'
import Stats from 'three/examples/jsm/libs/stats.module.js'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { EXP_SIZE } from '../utils/map'
import { replaceAllChildren, resizeRendererToDisplaySize } from '../../utils/canvas'

let scene: Scene
let controls: OrbitControls
let stats: Stats
let composer: EffectComposer
let dots: InstancedMesh

const transform = new Object3D()
const resolution = 19
const MAX_ANGLE = 2 * Math.PI
const MAX_DOTS = Math.pow(resolution, 3)
const showStats = true

init()
animate()

function init() {
    scene = new Scene()

    const dotGeo = new SphereGeometry(2, 4, 3)
    const dotMat = new PointsMaterial({ color: '#3dbceb' })
    dots = new InstancedMesh(dotGeo, dotMat, MAX_DOTS)

    scene.add(dots)

    updateDotPos()

    const starGeo = new SphereGeometry(2, 4, 3)
    const starMat = new PointsMaterial({ color: '#fff' })

    const NUM_STARS = 1000
    const starMesh = new InstancedMesh(starGeo, starMat, NUM_STARS)
    scene.add(starMesh)

    const STAR_RANGE = 5000
    for (let i = 0; i < NUM_STARS; i++) {
        transform.position.x = (Math.random() * STAR_RANGE) - STAR_RANGE / 2
        transform.position.y = (Math.random() * STAR_RANGE) - STAR_RANGE / 2
        transform.position.z = (Math.random() * STAR_RANGE) - STAR_RANGE / 2
        transform.updateMatrix()
        starMesh.setMatrixAt(i++, transform.matrix)
    }
    starMesh.instanceMatrix.needsUpdate = true

    const camera = new PerspectiveCamera(45, EXP_SIZE / EXP_SIZE, 1, 10000)
    camera.position.z = EXP_SIZE
    camera.position.y = 20

    const renderer = new WebGLRenderer({ antialias: true, })

    const container = document.getElementById('container')
    if (container) {
        replaceAllChildren(container, renderer.domElement)
        const resizeObserver = new ResizeObserver(resizeRendererToDisplaySize(renderer, camera));
        resizeObserver.observe(container, { box: 'content-box' });
    }
    const canvas = document.getElementsByTagName('canvas')[0]
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);

    if (showStats) {
        stats = new Stats()
        container?.appendChild(stats.dom)
    }

    controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.2
    controls.autoRotate = true
    controls.autoRotateSpeed = 0.1

    controls.update()

    const renderScene = new RenderPass(scene, camera)

    const bloomPass = new UnrealBloomPass(new Vector2(EXP_SIZE, EXP_SIZE), 1.5, 0.7, 0)

    composer = new EffectComposer(renderer)
    composer.addPass(renderScene)
    composer.addPass(bloomPass)
}

function animate() {
    requestAnimationFrame(animate)
    controls.update()
    composer.render()
    updateDotPos()
    if (showStats) stats.update()
}

function updateDotPos() {
    if (dots) {
        const time = Date.now() * 0.00001
        const step = time % (MAX_ANGLE / resolution)
        let index = 0
        for (let i = 0; i <= resolution; i++) {
            for (let j = 0; j <= resolution; j++) {
                for (let k = 0; k <= resolution; k++) {
                    transform.position.x = Math.sin((MAX_ANGLE / resolution) * j + k + step) * 100 / i
                    transform.position.y = Math.cos((MAX_ANGLE / resolution) * j + k + step) * 100 / i
                    transform.position.z = Math.tan((MAX_ANGLE / resolution) * j + k + step) * 100 / i
                    transform.updateMatrix()
                    dots.setMatrixAt(index++, transform.matrix)
                }
            }
        }
        dots.instanceMatrix.needsUpdate = true
    }
}
