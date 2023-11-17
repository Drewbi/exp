import { Canvas, useFrame } from "@react-three/fiber";
import fragmentShader from "./shader/fragment.glsl"
import { useMemo } from "react";

function Object() {
    const uniforms = useMemo(
        () => ({
          u_time: {
            value: 0.0,
          },
        }),
        []
    );

    useFrame((state) => {
        const { clock } = state;
        uniforms.u_time.value = clock.getElapsedTime();
    });

    return (
            <mesh>
                <boxGeometry args={[ 1000, 1000, 1 ]} />
                <shaderMaterial
                    fragmentShader={fragmentShader}
                    uniforms={uniforms}
                />
            </mesh>
    )
}

export default function() {
    return (
        <Canvas orthographic>
            <Object></Object>
        </Canvas>
    )
    
}