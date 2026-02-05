"use client";
import { useEffect } from "react";
import { useGLTF } from "@react-three/drei";

type SpiralingModelProps = {
  onLoaded?: () => void;
};

export default function SpiralingModel({ onLoaded }: SpiralingModelProps) {
  const { scene } = useGLTF("/models/spiraling.gltf"); // ✅ Correct path to GLTF file

  useEffect(() => {
    if (onLoaded) onLoaded();
  }, [onLoaded]);

  return <primitive object={scene} scale={1.5} />;
}
