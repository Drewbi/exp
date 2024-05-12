import * as THREE from 'three'
import * as React from 'react'
import { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame, useThree, Vector3 } from '@react-three/fiber'
import { getCameraPositionAtAngle, randomSnap, randomXZforY } from './utils'

function InstancedBoxes({ temp = new THREE.Object3D() }) {
    const boxSize = 10
    const numBoxes = 5000
    const maxXZ = 500
    const maxY = 500
    const alignment = 25
    const snapSpeed = 10
    const snapRotations = 30

    const { camera } = useThree()
    const [goalCameraAngle, setGoalCameraAngle] = useState(150)
    const [cameraAngle, setCameraAngle] = useState(75)

    const ref = useRef<THREE.InstancedMesh>(null!)

    useEffect(() => {
        for (let x = 0; x < numBoxes; x++) {
            const boxY = randomSnap(maxY, alignment)
            const boxX = randomXZforY(boxY, maxXZ, alignment)
            const boxZ = randomXZforY(boxY, maxXZ, alignment)
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
        }, 1000);
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
