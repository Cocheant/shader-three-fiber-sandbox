
'use client'

import styles from "./page.module.css";
import * as THREE from 'three'
import React, { use, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame, ThreeElements, useThree } from '@react-three/fiber'
import { Color } from "three";

// @ts-ignore
import vertexShader from "!!raw-loader!./shaders/baseVertexShader.glsl";
// @ts-ignore
import fragmentShader from "!!raw-loader!./shaders/baseFragmentShader.glsl";


const { useGLTF, OrbitControls, Stage } = require("@react-three/drei");






function Box(props: ThreeElements['mesh']) {




  const meshRef = useRef<THREE.Mesh>(null!)



  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)

  const uniforms = useMemo(
    () => ({
      u_time: {
        value: 0.0,
      },
      u_colorA: { value: new Color("#FFE486") },
      u_colorB: { value: new Color("#FEB3D9") },
    }), []
  );

  useFrame((state) => {
    const { clock } = state;
    // @ts-ignore
    meshRef.current.material.uniforms.u_time.value = clock.getElapsedTime();
  });

  return (
    <>

      <mesh
        {...props}
        ref={meshRef}
        scale={active ? 2 : 1}
        onClick={(event) => setActive(!active)}
        onPointerOver={(event) => setHover(true)}
        onPointerOut={(event) => setHover(false)}>
        <sphereGeometry args={[1]} />
        <meshStandardMaterial color={hovered ? 'hotpink' : '#2f74c0'} />
        <shaderMaterial
          fragmentShader={fragmentShader}
          vertexShader={vertexShader}
          uniforms={uniforms}
        />

      </mesh>

    </>
  )
}


function Scene() {



  return (
    <>

      <Box position={[-5, 0, 0]} />
      <Box position={[5, 0, 0]} />

    </>
  )
}

export default function Home() {



  return (
    <main className={styles.main}>
      <Canvas camera={{ fov: 70, position: [0, 0, 15] }} >
        <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} makeDefault />


        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />

        <ambientLight intensity={Math.PI / 2} />
        <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
        <Scene />

      </Canvas>
    </main>
  );
}
