
import styles from "./page.module.css";
import * as THREE from 'three'
import React, { use, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame, ThreeElements, useThree } from '@react-three/fiber'
import { Color } from "three";

// @ts-ignore
import vertexShader from "!!raw-loader!../shaders/baseVertexShader.glsl";
// @ts-ignore
import fragmentShader from "!!raw-loader!../shaders/baseFragmentShader.glsl";


const { useGLTF, OrbitControls, Stage } = require("@react-three/drei");




function Sphere(props: ThreeElements['mesh']) {


    const mesh = useRef<THREE.Mesh>(null!)

    const hover = useRef(false)
    const [active, setActive] = useState(false)

    const uniforms = useMemo(
        () => ({
            u_intensity: {
                value: 0.3,
            },
            u_time: {
                value: 0.0,
            },
        }), []
    );

    useFrame((state) => {
        const { clock } = state;
        mesh.current.material.uniforms.u_time.value = 0.4 * clock.getElapsedTime();

        mesh.current.material.uniforms.u_intensity.value = THREE.MathUtils.lerp(
            mesh.current.material.uniforms.u_intensity.value,
            hover.current ? 0.85 : 0.15,
            0.02
        );
    });

    return (
        <>

            <mesh
                {...props}
                ref={mesh}
                scale={1.5}
                onClick={(event) => setActive(!active)}
                onPointerOver={() => (hover.current = true)}
                onPointerOut={() => (hover.current = false)}
            >
                <sphereGeometry args={[1, 250, 250]} />
                <shaderMaterial
                    fragmentShader={fragmentShader}
                    vertexShader={vertexShader}
                    uniforms={uniforms}
                />

            </mesh>

        </>
    )
}



function Spheres() {



    return (
        <>

            <Sphere position={[-5, 0, 0]} />
            <Sphere position={[5, 0, 0]} />

        </>
    )
}

const Scene = () => {

    return (
        <Canvas camera={{ fov: 70, position: [0, 0, 15] }} >
            <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} makeDefault />


            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />

            <ambientLight intensity={Math.PI / 2} />
            <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
            <Spheres />

        </Canvas>
    )

}

export default Scene
