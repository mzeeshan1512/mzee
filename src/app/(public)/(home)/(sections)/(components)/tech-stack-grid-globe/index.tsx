"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import TechGlobe from "./tech-globe";
import { Suspense } from "react";

const TechGridGlobeContainer = () => {
  return (
    <div className="w-full h-screen bg-black">
      <Canvas
        camera={{
          position: [0, 0, 6],
          fov: 75,
          near: 0.1,
          far: 1000
        }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <TechGlobe />
          <OrbitControls
            enableZoom={true}
            enablePan={false}
            minDistance={4}
            maxDistance={8}
            rotateSpeed={0.5}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default TechGridGlobeContainer;
