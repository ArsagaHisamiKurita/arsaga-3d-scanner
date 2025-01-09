"use client"

import { useEffect, useRef } from 'react'
import * as THREE from 'three'
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { parseImagePixel } from './utils'
import logo from '../public/logo.png'
import { gsap } from 'gsap'

export const Canvas = () => {
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

    // const orbitcontrols = new OrbitControls(
		// 	camera,
		// 	renderer.domElement,
		// );
    // orbitcontrols.enableDamping = true;
    // scene.add(new THREE.GridHelper(5000, 100));
		// scene.add(new THREE.AxesHelper(500));

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
     * Logo
     */
    const promiseList: Promise<void>[] = []
    const pathList = [
      logo.src,
    ]
    const imageList: { position: number[], color: number[], alpha: number[] }[] = [];
    const imageSize = {
      width: 400,
      height: 459
    }
    pathList.forEach((image) => {
      promiseList.push(
        new Promise((resolve) => {
					const img = new Image();
					img.src = image;
					img.crossOrigin = "anonymous";

					img.addEventListener('load', () => {
						imageList.push(parseImagePixel(img, imageSize.width, imageSize.height, 10.0) as { position: number[], color: number[], alpha: number[] });
            console.log(imageList)
						resolve();
					});
        })
      )
    })
    Promise.all(promiseList).then(() => {
      const geometry = new THREE.BufferGeometry();
      const position = new THREE.BufferAttribute(new Float32Array(imageList[0].position), 3);
      const color = new THREE.BufferAttribute(new Float32Array(imageList[0].color), 3);
      const alpha = new THREE.BufferAttribute(new Float32Array(imageList[0].alpha), 1);
      const randPosition = [];
      for (let i = 0; i < imageList[0].position.length; i++) {
        const x = Math.random() * window.innerWidth - window.innerWidth / 2;
        const y = Math.random() * window.innerHeight - window.innerHeight / 2;
        const z = 0;
        randPosition.push(x, y, z);
      }
      const randPositions = new THREE.BufferAttribute(new Float32Array(randPosition), 3);
      geometry.setAttribute('position', position);
      geometry.setAttribute('color', color);
      geometry.setAttribute('alpha', alpha);
      geometry.setAttribute('randPositions', randPositions);
  
      const material = new THREE.RawShaderMaterial({
        vertexShader: `
          attribute vec3 randPositions;
          attribute vec3 position;
          attribute vec3 color;
          attribute float alpha;
          uniform mat4 modelViewMatrix;
          uniform mat4 projectionMatrix;
          varying vec3 v_color;
          varying float v_alpla;
          uniform float u_nextPositionLevel;

          void main() {
              v_color = color;
              v_alpla = alpha;

              gl_Position = projectionMatrix * modelViewMatrix * vec4(position + randPositions * u_nextPositionLevel, 1.0 );
              gl_PointSize = 8.0;
          }
        `,
        fragmentShader: `
          precision mediump float;
          varying vec3 v_color;
          varying float v_alpla;
          uniform vec3 u_color;
          uniform float u_alpha;

          void main() {
              vec2 temp = gl_PointCoord - vec2(0.5);
              float f = dot(temp, temp);
              if (f > 0.25 ) {
                  discard;
              }

              gl_FragColor = vec4(u_color, v_alpla * u_alpha);
          }
        `,
        uniforms: {
          u_color: { value: new THREE.Color(0xe8374a) },
          u_nextPositionLevel: { value: 1.0 },
          u_alpha: { value: 0.0 },
        },
        transparent: true
      });
      const mesh = new THREE.Points(geometry, material);
      // メッシュを右端に移動
      const buffer = {
        x: 66,
        y: 60,
      }
      const x = (window.innerWidth / 2) - (imageSize.width / 2) - buffer.x;
      const y = (window.innerHeight / 2) - (imageSize.height / 2) - buffer.y;
      mesh.position.set(x, -y, 0);
      scene.add(mesh);

      // アニメーション
      gsap.to(material.uniforms.u_nextPositionLevel, {
        value: 0.0,
        ease: 'power2.inOut',
        duration: 1.8,
        delay: 0.2
      })
      gsap.to(material.uniforms.u_alpha, {
        value: 1.0,
        ease: 'power2.inOut',
        duration: 1.8,
        delay: 0.2
      })
    })

    /**
     * Background
     */


    /**
     * Raf
     */
    const raf = () => {
      console.log('raf')
      // orbitcontrols.update();
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