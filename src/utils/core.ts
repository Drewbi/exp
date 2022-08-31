import {
    Scene,
    OrthographicCamera,
    WebGLRenderer,
} from 'three'
import './style.css'
import { EXP_SIZE } from './map'

export default class CoreScene {
    scene: Scene
    camera: OrthographicCamera
    renderer: WebGLRenderer
    update: () => void

    animate = () => {
        requestAnimationFrame(this.animate)
        this.renderer.render(this.scene, this.camera)
        this.update()
    }

    constructor(callback: () => void) {
        this.scene = new Scene()
        this.camera = new OrthographicCamera(
            0, EXP_SIZE,
            0, EXP_SIZE,
            -100, 100
        )
        this.camera.zoom = 1
        this.update = callback
        this.renderer = new WebGLRenderer({ antialias: true })
        this.renderer.setSize(EXP_SIZE, EXP_SIZE)
        document.body.appendChild(this.renderer.domElement)

        this.animate()
    }

    
}


