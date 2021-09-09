import * as THREE from 'three'
import React, { useEffect } from 'react'
import { Canvas } from 'react-three-fiber'
import dynamic from 'next/dynamic';

const OrbitControls = dynamic(async () => await (await import('drei')).OrbitControls, {
  ssr: false
});

const Box = (props) => {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial color="#45aa84" />
    </mesh>
  )
}

export default function ThreeOne() {
  return (
    <Canvas camera={{ position: [0, 0, -5] }}>
      <pointLight intensity={0.2} color="white" />
      <Box position={[0, 0, 0]} />
      <OrbitControls />
    </Canvas>
  )
}