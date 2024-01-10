import { useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import "../../p5wrapper.css"
import vertexShader from "../../../utils/genericVertex.glsl"
import fragmentShader from "./shader/shader.frag"

function Object() {
    const { size } = useThree()

    const uniforms = useMemo(
        () => ({
            u_time: {
                type: 'f',
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
