import { Mesh, CylinderGeometry, MeshBasicMaterial } from 'three'
import { useRef, useState } from 'react'
import { extend, useFrame, Vector3 } from '@react-three/fiber'

import brain from './boidBrain'
import { getForwardVector } from './utils'

extend({ Mesh, CylinderGeometry, MeshBasicMaterial })

export function Boid({ position=[0, 0, 0], r = 0 }: { position: Vector3, r?: number}) {
    const ref = useRef<Mesh>(null!)

    const [speed, setSpeed] = useState(1)

    useFrame((state, delta) => {
        if(brain) {
            brain.wiggleALittle(ref.current)
            brain.flyTowardsCentre(ref.current)
            brain.avoidOthers(ref.current)
            brain.avoidWalls(ref.current)
            const forward = getForwardVector(ref.current.rotation.z).multiplyScalar(speed)
            ref.current.position.add(forward)
        }
    })

    return (
        <mesh
            position={position}
            ref={ref}
        >
            <cylinderGeometry args={[0, 10, 20, 3, 1]}/>
            <meshBasicMaterial color={'#fff'} />
        </mesh>
    )
}