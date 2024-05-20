import * as THREE from 'three'
import * as React from 'react'
import { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame, useThree, Vector3 } from '@react-three/fiber'
import { getCameraPositionAtAngle, randomSnap, randomXZforY } from './utils'

function InstancedBoxes({ temp = new THREE.Object3D() }) {
    const boxSize = 10
    const numBoxes = 1000
    const maxXZ = 500
    const maxY = 500
    const xzAlignment = 1
    const yAlignment = 20
    const snapSpeed = 50
    const snapRotations = 10

    const { camera } = useThree()
    const [goalCameraAngle, setGoalCameraAngle] = useState(1 / snapRotations)
    const [cameraAngle, setCameraAngle] = useState(0)

    const ref = useRef<THREE.InstancedMesh>(null!)

    useEffect(() => {
        for (let x = 0; x < numBoxes; x++) {
            const boxY = randomSnap(maxY, yAlignment)
            const [boxX, boxZ] = randomXZforY(boxY, maxXZ, xzAlignment)
            temp.position.set(boxX, boxY, boxZ)
            temp.updateMatrix()
            ref.current.setMatrixAt(x, temp.matrix)
        }
    }, [])

    useFrame((state, delta) => {
        setCameraAngle((angle) => angle + (goalCameraAngle - angle) / snapSpeed)
        const newPos = getCameraPositionAtAngle(cameraAngle, 1000)
        camera.position.x = newPos.x
        camera.position.z = newPos.z
        camera.position.y = newPos.y
        camera.lookAt(new THREE.Vector3(0, 0, 0))
        // Update the instance
        ref.current.instanceMatrix.needsUpdate = true
    })

    useEffect(() => {
        const interval = setInterval(() => {
            setGoalCameraAngle((angle) => angle + 1 / snapRotations)
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <instancedMesh ref={ref} args={[undefined, undefined, numBoxes]}>
            <boxGeometry args={[boxSize, boxSize, boxSize]} />
            <meshBasicMaterial color={'white'} />
        </instancedMesh>
    )
}

export default function Tets() {
    return (
        <Canvas orthographic camera={{ position: [0, 0, 1000], far: 2000 }}>
            <InstancedBoxes />
        </Canvas >
    )
}
