import * as THREE from 'three';
import React, { Suspense, useState, useEffect } from 'react';
import { Canvas, useLoader } from 'react-three-fiber';
import { useTransition, a } from 'react-spring';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls, draco } from 'drei';
import { gsap } from 'gsap';

function Loading() {
  const [finished, set] = useState(false);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    THREE.DefaultLoadingManager.onLoad = () => set(true);
    THREE.DefaultLoadingManager.onProgress = (url, itemsLoaded, itemsTotal) =>
      setWidth((itemsLoaded / itemsTotal) * 200);
  }, []);

  const props = useTransition(finished, null, {
    from: { opacity: 1, width: 0 },
    leave: { opacity: 0 },
    update: { width },
  });

  return props.map(
    ({ item: finished, key, props: { opacity, width } }) =>
      !finished && (
        <a.div className="loading" key={key} style={{ opacity }}>
          <div className="loading-bar-container">
            <a.div className="loading-bar" style={{ width }} />
          </div>
        </a.div>
      ),
  );
}

function Model({ url }) {
  const { nodes, materials } = useLoader(GLTFLoader, url, draco());
  return (
    <group
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, -7, 0]}
      scale={[7, 7, 7]}
    >
      <group rotation={[Math.PI / 13.5, -Math.PI / 5.8, Math.PI / 5.6]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.planet001.geometry}
          material={materials.scene}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.planet002.geometry}
          material={materials.scene}
        />
      </group>
    </group>
  );
}

export default function Home() {
  useEffect(() => {
    gsap.from('.line', {
      y: 120,
      stagger: 0.2,
      skewY: 4,
      ease: 'power3.out',
      duration: 1,
      autoAlpha: 0,
      delay: 0.6,
    });
    gsap.to('.loading', {
      autoAlpha: 0,
    });
  }, []);
  return (
    <>
      <div className="bg" />
      <h1>
        <div className="line-wrapper">
          <span className="line">Learnt</span>
        </div>
        <div className="line-wrapper">
          <span className="line">
            from{' '}
            <a
              href="https://www.learnwithjason.dev/animation-and-3d-in-react-three-fiber"
              target="_blank"
              rel="noreferrer noopener"
            >
              Jason
            </a>
          </span>
        </div>
      </h1>
      <Canvas className="canvas" shadowMap camera={{ position: [0, 0, 15] }}>
        <ambientLight intensity={0.75} />
        <pointLight intensity={1} position={[-10, -25, -10]} />
        <spotLight
          castShadow
          intensity={2.25}
          angle={0.2}
          penumbra={1}
          position={[25, 25, 25]}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-bias={-0.0001}
        />
        <fog attach="fog" args={['#cc7b32', 16, 20]} />
        <Suspense fallback={null}>
          <Model url="/scene-draco.gltf" />
        </Suspense>
        <OrbitControls
          autoRotate
          enablePan={false}
          enableZoom={false}
          enableDamping
          dampingFactor={0.5}
          rotateSpeed={1}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
      </Canvas>
      <div className="layer" />
      <Loading />
    </>
  );
}
