import { Canvas, useFrame, useThree } from "@react-three/fiber";
import fragmentShader from "./shader/fragment.glsl"
import vertexShader from "../../utils/genericVertex.glsl"
import { useMemo } from "react";
import { Vector2 } from "three";

const numPoints = 1000;

function Object() {
    const { size, viewport } = useThree()

    const uniforms = useMemo(
        () => ({
            u_time: {
                value: 0.0,
            },
            u_points: {
                value: Array.from({ length: numPoints }, () => new Vector2(0.5, 0.5)),
            },
            u_mouse: {
                value: 0.0,
            },
            u_resolution: { value: new Vector2(viewport.width, viewport.height) }
        }), [viewport.width, viewport.height]
    );

    useFrame((state) => {
        const { clock } = state;
        uniforms.u_time.value = clock.getElapsedTime();

        uniforms.u_points.value.forEach((vec, index, arr) => {
            vec.x = Math.sin(clock.getElapsedTime() - index * 0.008) * 0.2 + 0.5;
            vec.y = Math.cos(clock.getElapsedTime() - index * 1) * 0.4 + 0.5;
        });
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
