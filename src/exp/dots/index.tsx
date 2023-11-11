import {
    InstancedMesh,
    Object3D
} from 'three'
// import Stats from 'three/examples/jsm/libs/stats.module.js'
// import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { EXP_SIZE } from '../utils/map'
import { replaceAllChildren, resizeRendererToDisplaySize } from '../../utils/canvas'
import { useEffect, useRef } from 'react'
import { Canvas, extend, useFrame } from '@react-three/fiber'
import { Stats, OrbitControls, Effects } from '@react-three/drei'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'

extend({ UnrealBloomPass })

export default function() {
    return (
        <Canvas camera={{ fov: 45, position: [30, 50, 800], far: 10000 }}>
            <Scene />
        </Canvas>
    )
}

function Scene() {

    return (
        <>
            <Dots />
            <Stars />
            <mesh>
                <boxGeometry args={[ 1, 1, 1 ]}/>
                <meshBasicMaterial color={[ 0, 0, 0 ]}/>
            </mesh>
            <OrbitControls enableDamping={true} dampingFactor={0.2} autoRotate={true} autoRotateSpeed={0.1} />
            <PostProcessing />
        </>
    )
}

function Dots() {
    const dotsMeshRef = useRef<InstancedMesh>(null)
    const resolution = 19
    const MAX_DOTS = Math.pow(resolution, 3)
    const MAX_ANGLE = 2 * Math.PI

    const transform = new Object3D()
    useFrame(() => {
        if (dotsMeshRef.current) {
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
                        dotsMeshRef.current.setMatrixAt(index++, transform.matrix)
                    }
                }
            }
            dotsMeshRef.current.instanceMatrix.needsUpdate = true
        }
    })
    return (
        <instancedMesh ref={dotsMeshRef} args={[ undefined, undefined, MAX_DOTS ]}>
            <sphereGeometry args={[ 2, 5, 4 ]}></sphereGeometry>
            <pointsMaterial color='#3dbceb'></pointsMaterial>
        </instancedMesh>
    )
}

function Stars() {
    const starsMeshRef = useRef<InstancedMesh>(null)
    const NUM_STARS = 1000
    const STAR_RANGE = 5000

    const transform = new Object3D()
    useEffect(() => {
        if(!starsMeshRef.current) return
        for (let i = 0; i < NUM_STARS; i++) {
            transform.position.x = (Math.random() * STAR_RANGE) - STAR_RANGE / 2
            transform.position.y = (Math.random() * STAR_RANGE) - STAR_RANGE / 2
            transform.position.z = (Math.random() * STAR_RANGE) - STAR_RANGE / 2
            transform.updateMatrix()
            starsMeshRef.current.setMatrixAt(i, transform.matrix)
            
        }
        starsMeshRef.current.instanceMatrix.needsUpdate = true
    }, [])

    return (
        <instancedMesh ref={starsMeshRef} args={[ undefined, undefined, NUM_STARS ]}>
            <sphereGeometry args={[ 2, 4, 3 ]}></sphereGeometry>
            <pointsMaterial color='#fff'></pointsMaterial>
        </instancedMesh>
    )
}

function PostProcessing() {
    return (
        <Effects>
            <unrealBloomPass args={[ undefined, 1, 0.8, 0 ]} />
        </Effects>
    )
}

declare global {
    namespace JSX {
      interface IntrinsicElements {
        unrealBloomPass: any
      }
    }
  }