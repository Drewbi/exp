import * as THREE from 'three'
import { Canvas } from '@react-three/fiber'

import { Boid } from './boid'
import { Link } from 'react-router-dom'

export default function Boids() {
    const numBoids = 10
    return (
        <>
            <Link to={'/'}>Back</Link>
            <div id="container">
                <Canvas orthographic>
                    {Array.from({ length: numBoids }, (_, i) => (
                        <Boid key={i} position={[
                            (Math.random() * 1000) - 500,
                            (Math.random() * 1000) - 500,
                            -100
                        ]} />
                    ))}
                </Canvas>
            </div>
        </>
    )
}
