
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
import Scene from "./components/Scene";
import TitleArea from "./components/TitleArea";


const { useGLTF, OrbitControls, Stage } = require("@react-three/drei");



export default function Home() {



  return (
    <main className={styles.main}>
      <TitleArea />
      <Scene />

    </main>
  );
}
