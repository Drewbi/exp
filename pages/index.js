import React, { useRef, useState, useMemo } from 'react'
import { Canvas, useFrame } from 'react-three-fiber'
import { BoxBufferGeometry } from 'three'
import dynamic from 'next/dynamic';


const OrbitControls = dynamic(async () => await (await import('drei')).OrbitControls, {
  ssr: false
});

const Box = (props) => {
  // This reference will give us direct access to the mesh
  const mesh = useRef()
  const geom = useMemo(() => new BoxBufferGeometry(100, 100, 100))
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)

  // Rotate mesh every frame, this is outside of React without overhead
  useFrame(() => {
    mesh.current.rotation.x = mesh.current.rotation.y += 0.005
  })

  return (
    <group ref={mesh} {...props} scale={[1, 1, 1]} position={[0, 0, 0]}>
      <lineSegments>
        <edgesGeometry attach="geometry" args={[geom]} />
        <lineBasicMaterial color="#63B4D1" attach="material" />
      </lineSegments>
      <mesh>
        <boxBufferGeometry args={[100, 100, 100]} />
        <meshStandardMaterial color="#222" />
      </mesh>
    </group>
  )
}

export default function Home() {
  return (
    <Canvas orthographic={true} camera={{ position: [0, 0, -100] }}>
      <ambientLight />
      <Box position={[0, 0, 0]} />
      <OrbitControls />
    </Canvas>
  )
}
