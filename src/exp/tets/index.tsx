import * as THREE from 'three'
import * as React from 'react'
import { useEffect, useRef, useState } from 'react'
import { OrbitControls } from '@react-three/drei'
import { Canvas, useFrame, useThree, Vector3 } from '@react-three/fiber'
import { getBoxPos, getCameraPositionAtAngle } from './utils'

function InstancedBoxes({ temp = new THREE.Object3D() }) {
    const boxSize = 30
    const boxPerSide = 3
    const numBoxes = Math.pow(boxPerSide, 3)
    const gap = 100
    // const clickCenter = new THREE.Vector2(0, 0);

    const { camera } = useThree()
    const [goalCameraAngle, setGoalCameraAngle] = useState(0)
    const [cameraAngle, setCameraAngle] = useState(0)
    const [isElevated, setIsElevated] = useState(false)

    const ref = useRef<THREE.InstancedMesh>(null!)

    useFrame((state, delta) => {
        for (let x = 0; x < boxPerSide; x++) {
            for (let y = 0; y < boxPerSide; y++) {
                for (let z = 0; z < boxPerSide; z++) {
                    const centringOffset = Math.floor(boxPerSide / 2)

                    const boxX = x - centringOffset
                    const boxZ = y - centringOffset
                    const boxY = z - centringOffset

                    const position = getBoxPos(boxX, boxY, boxZ, boxSize, gap, boxPerSide)
                    temp.position.set(position.x, position.y, position.z)
                    temp.updateMatrix()
                    ref.current.setMatrixAt(x * Math.pow(boxPerSide, 2) + y * boxPerSide + z, temp.matrix)

                    setCameraAngle((angle) => angle + (goalCameraAngle - angle) / 100)
                    const newPos = getCameraPositionAtAngle(cameraAngle, 1000)
                    camera.position.x = newPos.x
                    camera.position.z = newPos.z
                    camera.position.y += ((isElevated ? 100 : 0) - camera.position.y) / 100
                    camera.lookAt(new THREE.Vector3(0, 0, 0))
                }
            }
        }
        // Update the instance
        ref.current.instanceMatrix.needsUpdate = true
    })

    useEffect(() => {
        const interval = setInterval(() => {
            setGoalCameraAngle((angle) => angle + (1 / Math.pow(2, 5)) * Math.random() * 3)
            if (Math.random() > 0.9) setIsElevated(true)
            else setIsElevated(false)
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
