import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Flex, Box as FlexBox } from '@react-three/flex';
import { Canvas, useFrame, extend } from 'react-three-fiber';
import { useSpring, a } from 'react-spring/three';

extend({ OrbitControls });

const Cube = () => {
  const [hovered, setHovered] = useState(false);
  const [active, setActive] = useState(false);
  const meshRef = useRef();

  const props = useSpring({
    scale: active ? [1.5, 1.5, 1.5] : [1, 1, 1],
    color: hovered ? '#3f61b7' : '#c1b833',
  });

  useFrame(() => {
    meshRef.current.rotation.y += 0.005;
  });

  return (
    <a.mesh
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={() => setActive(!active)}
      scale={props.scale}
      ref={meshRef}
      rotation={[0.3, 0, 0]}
    >
      <ambientLight intensity={1} />
      <octahedronGeometry attach="geometry" args={[2, 2]} />
      <a.meshLambertMaterial
        attach="material"
        color={props.color}
        emissive="red"
        wireframe={true}
      />
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
        <Flex flexDirection="row" justifyContent="center" alignItems="center">
          <FlexBox centerAnchor>
            <Cube />
          </FlexBox>
        </Flex>
      </Canvas>
    </div>
  );
};

export default Box;
