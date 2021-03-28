import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Canvas, useFrame, extend, useThree } from 'react-three-fiber';
import { useSpring, a } from 'react-spring/three';

extend({ OrbitControls });

const Controls = () => {
  const orbitRef = useRef();
  const { camera, gl } = useThree();

  useFrame(() => {
    orbitRef.current.update();
  });

  return (
    <orbitControls
      autoRotate
      minPolarAngle={Math.PI / 3}
      maxPolarAngle={Math.PI / 3}
      args={[camera, gl.domElement]}
      ref={orbitRef}
    />
  );
};

const Plane = () => (
  <mesh rotation={[-Math.PI / 2, 0, 0]}>
    <planeBufferGeometry attach="geometry" args={[100, 100]} />
    <meshPhysicalMaterial attach="material" color="red" />
  </mesh>
);

const Cube = () => {
  const [hovered, setHovered] = useState(false);
  const [active, setActive] = useState(false);
  // const meshRef = useRef();

  const props = useSpring({
    scale: active ? [1.5, 1.5, 1.5] : [1, 1, 1],
    color: hovered ? 'hotpink' : 'gray',
  });

  // useFrame(() => {
  //   meshRef.current.rotation.y += 0.01;
  // });

  return (
    <a.mesh
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={() => setActive(!active)}
      scale={props.scale}
      rotation={[0, 0, 0]}
      // ref={meshRef}
    >
      <ambientLight intensity={0.2} />
      <spotLight position={[0, 5, 10]} penumbra={1} />
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
      <a.meshPhysicalMaterial attach="material" color={props.color} />
      {/* <a.meshBasicMaterial attach="material" color={props.color} /> */}
    </a.mesh>
  );
};

const Box = () => {
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
  }, []);
  return (
    <div>
      <h1>
        <div className="line-wrapper">
          <span className="line">Sześcian</span>
        </div>
        <div className="line-wrapper">
          <span className="line">na wypasie</span>
        </div>
      </h1>
      <Canvas>
        <Controls />
        <Cube />
        <Plane />
      </Canvas>
    </div>
  );
};

export default Box;
