import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from 'react-three-fiber'

const Box = (props) => {
  // This reference will give us direct access to the mesh
  const mesh = useRef()

  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)

  // Rotate mesh every frame, this is outside of React without overhead
  useFrame(() => {
    mesh.current.rotation.x = mesh.current.rotation.y += 0.005
  })

  return (
    <mesh
      {...props}
      ref={mesh}
      position={[0, 0, -200]}
      scale={[200, 200, 200]}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}>
      <boxBufferGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={'#3090a0'} />
    </mesh>
  )
}

export default function Home() {
  return (
    <Canvas orthographic={true}>
      <ambientLight />
      <pointLight position={[1, 1, 200]} />
      <Box />
    </Canvas>
  )
}
