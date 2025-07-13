import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import { useSpring, animated } from "@react-spring/three";
import { isMobile } from "react-device-detect";
import CatModel from "./CatModel";

const rotationAmount: number = 0.6;
const _getRot = (pointer: { x: number; y: number }) => [
  -pointer.y * rotationAmount,
  pointer.x * rotationAmount,
  0,
];

const themeColors = {
  primary: new THREE.Color("#00FFFF"),
  secondary: new THREE.Color("#FF04FF"),
  tertiary: new THREE.Color("#F6911D"),
  quaternary: new THREE.Color("#58FF69"),
};

const AnimatedCatModel: React.FC<{
  active: boolean;
  onCatClick: Function;
}> = ({ active, onCatClick }) => {
  const catRef = useRef<any>(null);
  const { pointer } = useThree();
  const [hover, setHover] = useState(false);
  const [visible, setVisible] = useState(false);

  const newPos = active ? [0, 0, 0] : [2, -2, 0];
  const scaleFactor = isMobile ? 0.66 : 1;
  const newScale = !active
    ? scaleFactor * 0.1
    : hover
    ? scaleFactor * 1.2
    : scaleFactor;

  const [{ position, rotation, scale }, api]: any = useSpring(() => ({
    rotation: _getRot(pointer),
    scale: newScale * 0.1,
    config: { mass: 1, tension: 170, friction: 26 },
  }));

  useFrame(() => {
    api.start({
      position: newPos,
      rotation: _getRot(pointer),
      scale: newScale,
    });
  });

  // Summon immediately, hide after 600ms so spring can complete
  useEffect(() => {
    if (active) {
      setVisible(true);
      return;
    }
    const timeout = setTimeout(() => {
      setVisible(false);
    }, 600);
    return () => clearTimeout(timeout);
  }, [active]);

  return (
    <animated.group position={position} rotation={rotation} scale={scale}>
      <CatModel
        ref={catRef}
        visible={visible}
        position={[0, -0.1, 0]}
        onClick={() => onCatClick()}
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
      />
    </animated.group>
  );
};

const CatScene: React.FC = () => {
  const [active, setActive] = useState(true);
  const cameraRef = useRef<any>(null);

  return (
    <Canvas gl={{ toneMapping: THREE.NoToneMapping }}>
      {/* Lights */}
      {/* <ambientLight intensity={1} /> */}
      {/* Top */}
      <pointLight
        position={[0, 4, 2]}
        decay={0}
        intensity={4}
        color={themeColors.primary}
      />
      {/* Back */}
      <pointLight
        position={[4, 0, -4]}
        decay={0}
        intensity={4}
        color={themeColors.secondary}
      />
      <pointLight
        position={[-4, 0, -4]}
        decay={0}
        intensity={4}
        color={themeColors.tertiary}
      />
      {/* Left */}
      <pointLight
        position={[-10, 0, 0]}
        decay={0}
        intensity={4}
        color={themeColors.secondary}
      />
      {/* Right */}
      <pointLight
        position={[10, 0, 0]}
        decay={0}
        intensity={4}
        color={themeColors.tertiary}
      />

      {/* Camera */}
      <PerspectiveCamera ref={cameraRef} makeDefault position={[0, 0, 3]} />
      {/* <CameraControls camera={cameraRef.current} enabled minDistance={0.1} /> */}

      {/* Action */}
      {/* Cat */}
      <AnimatedCatModel
        active={active}
        onCatClick={() => {
          console.log("Mmmmroooowwwww");
          setActive(!active);
        }}
      />
    </Canvas>
  );
};

export default CatScene;
