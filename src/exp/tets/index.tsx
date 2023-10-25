import * as THREE from 'three'
import * as React from 'react'
import { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame, Vector3 } from '@react-three/fiber'
import { Link } from 'react-router-dom'

function InstancedBoxes({ temp = new THREE.Object3D() }) {
    const boxSize = 10
    const numBoxes = Math.pow(60, 2)
    const numSide = Math.floor(Math.sqrt(numBoxes))
    const distanceBetween = boxSize + 6
    const centreOffset = numSide / 2 - 0.5

    const ref = useRef<THREE.InstancedMesh>(null!)

    useFrame((state, delta) => {
        for (let i = 0; i < numBoxes; i++) {
            temp.position.set(
                distanceBetween * (i % numSide - centreOffset),
                distanceBetween * (Math.floor(i / numSide) - centreOffset),
                -1 * numSide * distanceBetween)
            temp.rotation.z += 0.1
            temp.updateMatrix()
            ref.current.setMatrixAt(i, temp.matrix)
        }
        // Update the instance
        ref.current.instanceMatrix.needsUpdate = true
    })
    return (
    <instancedMesh ref={ref} args={[undefined, undefined, numBoxes]}>
        <boxGeometry args={[boxSize, boxSize, boxSize]} />
        <meshBasicMaterial color={'white'} />
    </instancedMesh>
    )
  }

export default function Tets() {
    return (
        <>
            <Link to={'/'}>Back</Link>
            <div id="container">
                <Canvas orthographic>
                    <InstancedBoxes />
                </Canvas>
            </div>
        </>
    )
}
