import { Canvas, useFrame, useThree } from "@react-three/fiber";
import fragmentShader from "./shader/fragment.glsl"
import vertexShader from "../../utils/genericVertex.glsl"
import { useMemo } from "react";
import { Uniform, Vector2 } from "three";


function Object() {
    const { size } = useThree()

    const uniforms = useMemo(
        () => ({
            u_time: {
                value: 0.0,
            },
            u_size: new Uniform(
                new Vector2()
            )
        }),
        []
    );

    useFrame((state) => {
        const { clock, size } = state;
        uniforms.u_time.value = clock.getElapsedTime();
        uniforms.u_size.value.x = size.width;
        uniforms.u_size.value.y = size.height;
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
