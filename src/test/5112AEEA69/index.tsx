import { Canvas, useFrame, useThree } from "@react-three/fiber";
import fragmentShader from "./shader/fragment.glsl"
import vertexShader from "../../utils/genericVertex.glsl"
import { useMemo } from "react";

function Object() {
    const { size } = useThree()

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
            <boxGeometry args={[size.width, size.height, 1]} />
            <shaderMaterial
                fragmentShader={fragmentShader}
                vertexShader={vertexShader}
                uniforms={uniforms}
            />
        </mesh>
    )
}

export default function () {
    return (
        <Canvas orthographic>
            <Object></Object>
        </Canvas>
    )
}
