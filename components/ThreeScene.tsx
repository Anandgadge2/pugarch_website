"use client";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import SpiralingModel from "./SpiralingModel";

type ThreeSceneProps = {
  onLoaded?: () => void;
};

export default function ThreeScene({ onLoaded }: ThreeSceneProps) {
  return (
    <Canvas
      style={{ background: 'transparent' }}
      gl={{ alpha: true, antialias: true }}
    >
      {/* Camera Setup */}
      <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={75} />
      
      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <directionalLight position={[-10, -10, -5]} intensity={0.5} />
      <pointLight position={[0, 5, 0]} intensity={0.5} />
      
      {/* Model */}
      <Suspense fallback={null}>
        <SpiralingModel onLoaded={onLoaded} />
      </Suspense>
      
      {/* Controls */}
      <OrbitControls 
        enableZoom={true}
        enablePan={true}
        enableRotate={true}
        autoRotate={true}
        autoRotateSpeed={2}
      />
    </Canvas>
  );
}
