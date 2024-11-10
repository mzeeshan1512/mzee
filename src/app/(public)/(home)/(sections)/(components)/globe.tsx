"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { TextureLoader, Mesh, DirectionalLight, PlaneGeometry } from "three";
import { Suspense, useRef } from "react";
import BG from "@/assets/7605.jpg";
import { OrbitControls } from "@react-three/drei";

const SpinningGlobe = () => {
  const texture = new TextureLoader().load(BG?.src);
  const meshRef = useRef<Mesh>(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
      meshRef.current.rotation.x += 0.01;
    }
  });

  return (
    <Suspense fallback={null}>
      <mesh ref={meshRef} castShadow>
        <sphereGeometry args={[30, 64, 64]} />
        <meshBasicMaterial map={texture} />
      </mesh>
    </Suspense>
  );
};

const Globe = () => {
  return (
    <div className="relative w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 50], fov: 75 }}
        className="absolute inset-0 block drop-shadow"
        shadows
      >
        <ambientLight intensity={0.3} />
        <directionalLight
          position={[5, 5, 5]}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-near={0.1}
          shadow-camera-far={500}
        />
        <SpinningGlobe />
        <OrbitControls />
      </Canvas>
    </div>
  );
};

export default Globe;
