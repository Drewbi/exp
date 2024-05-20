import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Canvas, ThreeEvent, useFrame } from '@react-three/fiber';
import fragmentShader from "./shader/fragment.glsl"
import vertexShader from "../../utils/genericVertex.glsl"
import * as THREE from 'three';

interface ShaderMaterialProps {
    mouse: { x: number; y: number };
}

const ShaderMaterial: React.FC<ShaderMaterialProps> = ({ mouse }) => {

    useFrame((state) => {
        const { clock } = state;
        uniforms.u_mouse.value.set(mouse.x, 1 - mouse.y);
        uniforms.u_time.value = clock.getElapsedTime();
    });

    const uniforms = useMemo(
        () => ({
            u_time: { value: 0.0 },
            u_mouse: { value: new THREE.Vector2(mouse.x, 1 - mouse.y) },
        }),
        []
    );

    return (
        <shaderMaterial
            uniforms={uniforms}
            vertexShader={vertexShader}
            fragmentShader={fragmentShader}
        />
    );
};

const App: React.FC = () => {
    const [mouse, setMouse] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

    const canvasRef = useRef<HTMLCanvasElement>(null);

    const handleMouseMove = (event: ThreeEvent<PointerEvent>) => {
        const canvasNormalisedX = (event.pageX - canvasRef.current!.offsetLeft) / canvasRef.current!.clientWidth
        const canvasNormalisedY = (event.pageY - canvasRef.current!.offsetTop) / canvasRef.current!.clientHeight
        setMouse({ x: canvasNormalisedX, y: canvasNormalisedY });
    };

    return (
        <Canvas ref={canvasRef}>
            <mesh onPointerMove={(e) => handleMouseMove(e)}>
                <planeGeometry args={[8, 8]} />
                <ShaderMaterial mouse={mouse} />
            </mesh>
        </Canvas>
    );
};

export default App;
