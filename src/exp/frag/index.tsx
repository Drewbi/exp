import { Scene, PerspectiveCamera, WebGLRenderer, BoxGeometry, Mesh, ShaderMaterial, PlaneGeometry } from 'three'
import vertexShader from './shaders/vertex.glsl'
import fragmentShader from './shaders/fragment.glsl'
import { EXP_SIZE } from '../utils/map'
import { replaceAllChildren, resizeRendererToDisplaySize } from '../../utils/canvas'
import { useEffect } from 'react'

let scene: Scene
let camera: PerspectiveCamera
let renderer: WebGLRenderer
let cube: Mesh

function init() {
    scene = new Scene()
    camera = new PerspectiveCamera(45, EXP_SIZE / EXP_SIZE, 1, 10000)

    const canvas = document.getElementsByTagName('canvas')[0]
    if (!canvas) return 
    renderer = new WebGLRenderer({ antialias: true, canvas })
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    const container = document.getElementById('container')

    if (container) {
        replaceAllChildren(container, renderer.domElement)
        const resizeObserver = new ResizeObserver(resizeRendererToDisplaySize(renderer, camera));
        resizeObserver.observe(container, { box: 'content-box' });
    }

    

    const planeGeo = new PlaneGeometry(100, 100)

    const geometry = new BoxGeometry(1, 1, 1)
    const material = new ShaderMaterial({
        vertexShader,
        fragmentShader
    });
    const plane = new Mesh(planeGeo, material)
    plane.position.z = -5
    // plane.rotation.z = Math.PI / 4
    cube = new Mesh(geometry, material)

    scene.add(plane)
    scene.add(cube)

    camera.position.z = 5
}

function animate() {
    requestAnimationFrame(animate)

    cube.rotation.x += 0.001
    cube.rotation.y += 0.001

    renderer.render(scene, camera)
}

export default function() {
    useEffect(() => {
        init();
        animate();
    }, [])

    return (
        <canvas></canvas>
    )
} 