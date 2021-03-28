import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Flex, Box } from '@react-three/flex';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Canvas, useFrame, extend } from 'react-three-fiber';
import { useSpring, a } from 'react-spring/three';

extend({ OrbitControls });

const Shape = ({ wireframe }) => {
  const [hovered, setHovered] = useState(false);
  const [active, setActive] = useState(false);
  const meshRef = useRef();

  const props = useSpring({
    scale: active ? [1.5, 1.5, 1.5] : [1, 1, 1],
    color: hovered ? '#3f61b7' : '#c1b833',
  });

  useFrame(() => {
    meshRef.current.rotation.x += 0.001;
    meshRef.current.rotation.y += 0.001;
    meshRef.current.rotation.z += 0.001;
  });

  return (
    <a.mesh
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={() => setActive(!active)}
      scale={props.scale}
      ref={meshRef}
      rotation={[0, 0, 0]}
      castShadow
    >
      <ambientLight intensity={1} />
      <spotLight castShadow position={[15, 20, 5]} penumbra={1} castShadow />
      <cylinderGeometry attach="geometry" args={[1, 1, 2, 20]} />
      <a.meshLambertMaterial
        attach="material"
        color={props.color}
        emissive="red"
        wireframe={wireframe}
      />
    </a.mesh>
  );
};

const Cylinder = () => {
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
          <span className="line">Cylinder</span>
        </div>
        <div className="line-wrapper">
          <span className="line">na rejonie</span>
        </div>
      </h1>
      <Canvas>
        <Flex flexDirection="row" justifyContent="center" alignItems="center">
          <Box centerAnchor>
            <Shape wireframe={true} />
          </Box>
          <Box centerAnchor>
            <Shape />
          </Box>
        </Flex>
      </Canvas>
    </div>
  );
};

export default Cylinder;
