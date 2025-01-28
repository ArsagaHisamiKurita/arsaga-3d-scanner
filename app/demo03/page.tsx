"use client"

import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import Loading from '../loading';

const Demo03 = () => {
  const canvasRef = useRef(null);
  const loadingRef = useRef<HTMLDivElement>(null);

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
    renderer.setClearColor(new THREE.Color(0x000000));
    renderer.setSize(width, height)
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 2.5;

    // const clock = new THREE.Clock();
    let mixer: THREE.AnimationMixer | null = null;
    let animations: THREE.AnimationClip[] | null = null;
    let camera: THREE.PerspectiveCamera | null = null;
    // const fov = 60;
    // const fovRad = (fov / 2) * (Math.PI / 180);
    // const dist = height / 2 / Math.tan(fovRad);
    // const camera = new THREE.PerspectiveCamera(
    //   fov,
    //   width / height,
    //   0.01,
    //   10000
    // );
    // camera.position.x = 700;
    // camera.position.y = 400;
    // camera.position.z = dist;
    // camera.rotateX(-Math.PI / 4);

    // const orbitcontrols = new OrbitControls(
		// 	camera,
		// 	renderer.domElement,
		// );
    // orbitcontrols.enableDamping = true;
    // orbitcontrols.enableZoom = false;

    // scene.add(new THREE.GridHelper(5000, 100));
		// scene.add(new THREE.AxesHelper(500));

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.0);
    scene.add(ambientLight);

    // const directionalLight = new THREE.DirectionalLight(0xffffff, 2.5);
    // scene.add(directionalLight);

    const resize = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      if (camera) {
        camera.aspect = width / height
        camera.updateProjectionMatrix()
      }
      // const fov = 60;
      // const fovRad = (fov / 2) * (Math.PI / 180);
      // const dist = height / 2 / Math.tan(fovRad);
      // camera.position.z = dist;
      renderer.setSize(width, height)
      renderer.setPixelRatio(window.devicePixelRatio)
    }
    window.addEventListener('resize', resize)

    /**
     * Model
     */
    const loader = new GLTFLoader();
    const url = "../rounge-with-camera.glb";

    loader.load(
      url,
      (gltf) => {
        animations = gltf.animations;
        const model = gltf.scene;
        model.position.set(0, 0, 0);
        // gltf.scene.scale.set(55, 55, 55);
        camera = gltf.cameras[0] as THREE.PerspectiveCamera

        mixer = new THREE.AnimationMixer(model)
        for (let i = 0; i < animations.length; i++) {
          console.log(animations[i])
          const actions = mixer.clipAction(animations[i])
          actions.clampWhenFinished = true;
          actions.play();
        }

        scene.add(model);
        if(loadingRef.current) loadingRef.current.style.display = 'none';
      },
      // (error) => {
      //   オブジェクトの読み込みが失敗したタイミングで実行
      //   console.log(error);
      // }
    );

    /**
     * Raf
     */
    const raf = () => {
      // console.log('raf')
      // orbitcontrols.update();
      if(scene && camera) renderer.render(scene, camera)
      // if(mixer) mixer.update(clock.getDelta() / 2)
      window.requestAnimationFrame(raf)
    }
    raf()

    const onScroll = () => {
      // 実際のスクロール位置を取得
      const rawScrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const contentHeight = 10000;
      
      // スクロールが下端に達したら上端に戻す
      if (rawScrollY >= contentHeight - windowHeight) {
        window.scrollTo(0, 1); // 完全な0ではなく小さな値にすることで滑らかさを保つ
      }
      // スクロールが上端に達したら下端に移動
      else if (rawScrollY <= 0) {
        window.scrollTo(0, contentHeight - windowHeight - 1);
      }

      // scrollYを0-10000の範囲で循環させる
      const scrollY = ((rawScrollY % contentHeight) + contentHeight) % contentHeight;
      if (!animations) return;
        const cameraAnimation = animations.find((animation) => {
        return animation.name === "CameraAction";
      });
    
      if (cameraAnimation) {
        if (!mixer) return;

        const action = mixer.existingAction(cameraAnimation);
        if (action) action.reset();
        mixer.setTime(scrollY / 514);
      }
    }

    window.addEventListener('scroll', onScroll)

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <>
      <div className='fixed top-0 left-0 w-full h-full z-10' ref={loadingRef}>
        <Loading  />
      </div>
      <div className='relative h-[10000px]'>
        <canvas ref={canvasRef} className='fixed pointer-events-none'></canvas>
        <div className='relative px-12 py-16 w-[40%]'>
          <div className='bg-white p-3 font-bold md:text-xl text-base'>アルサーガオフィスのラウンジを3Dモデルにしてみました。</div>
          <div className='mt-[100vh] bg-white p-3 font-bold md:text-xl text-base'>広角の3Dスキャンは精度が落ちてかなりモデルが歪になってしまいました...😭</div>
          <div className='mt-[100vh] bg-white p-3 font-bold md:text-xl text-base'>オブジェクト単体であればかなり綺麗に3Dスキャンできるのですが...</div>
          <div className='mt-[100vh] bg-white p-3 font-bold md:text-xl text-base'>ラウンジ全てを3Dスキャンしようとするとかなり精度が落ちました。</div>
          <div className='mt-[100vh] bg-white p-3 font-bold md:text-xl text-base'>今回はiphone15proで試してみたので、今後の3Dスキャン精度の技術の向上に期待です。</div>
          <div className='mt-[100vh] bg-white p-3 font-bold md:text-xl text-base'>本当は綺麗な3Dモデルでオフィスを回遊するようにしたかったんですが...</div>
          <div className='mt-[100vh] bg-white p-3 font-bold md:text-xl text-base'>悔しいです...</div>
          <div className='mt-[100vh] bg-white p-3 font-bold md:text-xl text-base'>Blender頑張ります...</div>
          <div className='mt-[100vh] bg-white p-3 font-bold md:text-xl text-base'>ご覧いただきありがとうございました...</div>
        </div>
      </div>
    </>
  )
}

export default Demo03;