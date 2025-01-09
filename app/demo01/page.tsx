"use client"

import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

export const Demo01 = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current
    if(!canvas) return

    /**
     * Setup
     */
    const width = window.innerWidth
    const height = window.innerHeight
    const scene = new THREE.Scene()
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true
    })
    renderer.setPixelRatio(window.devicePixelRatio)
    // renderer.setClearColor(new THREE.Color(0x000000));
    renderer.setSize(width, height)
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 2.5;

    const fov = 60;
    const fovRad = (fov / 2) * (Math.PI / 180);
    const dist = height / 2 / Math.tan(fovRad);
    const camera = new THREE.PerspectiveCamera(
      fov,
      width / height,
      0.1,
      2000
    );
    camera.position.z = dist;

    const orbitcontrols = new OrbitControls(
			camera,
			renderer.domElement,
		);
    orbitcontrols.enableDamping = true;
    scene.add(new THREE.GridHelper(5000, 100));
		scene.add(new THREE.AxesHelper(500));

    const ambientLight = new THREE.AmbientLight(0xffffff, 5.0);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 2.5);
    scene.add(directionalLight);

    const resize = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      const fov = 60;
      const fovRad = (fov / 2) * (Math.PI / 180);
      const dist = height / 2 / Math.tan(fovRad);
      camera.position.z = dist;
      renderer.setSize(width, height)
      renderer.setPixelRatio(window.devicePixelRatio)
    }
    window.addEventListener('resize', resize)

    /**
     * Model
     */
    const loader = new GLTFLoader();
    const url = "../koil.gltf";

    loader.load(
      url,
      (gltf) => {
        gltf.scene.scale.set(60, 60, 60);
        scene.add(gltf.scene);
      },
      (error) => {
        // オブジェクトの読み込みが失敗したタイミングで実行
        console.log(error);
      }
    );

    /**
     * Raf
     */
    const raf = () => {
      console.log('raf')
      orbitcontrols.update();
      renderer.render(scene, camera)
      window.requestAnimationFrame(raf)
    }
    raf()

    return () => {
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas ref={canvasRef}></canvas>
  )
}

export default Demo01;