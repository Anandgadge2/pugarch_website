'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';

// Dynamically import ThreeScene to avoid SSR issues
const ThreeScene = dynamic(() => import('@/components/ThreeScene'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-screen flex items-center justify-center bg-black">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
    </div>
  ),
});

export default function ModelDemoPage() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white">
      {/* Header */}
      <div className="relative z-10 p-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
          3D Spiraling Model Demo
        </h1>
        <p className="text-gray-400 mb-2">
          Interactive 3D model viewer powered by Three.js
        </p>
        {!isLoaded && (
          <p className="text-purple-400 animate-pulse">Loading model...</p>
        )}
        {isLoaded && (
          <p className="text-green-400">✓ Model loaded successfully!</p>
        )}
      </div>

      {/* 3D Model Container */}
      <div className="relative w-full h-[600px] md:h-[800px]">
        <ThreeScene onLoaded={() => setIsLoaded(true)} />
      </div>

      {/* Instructions */}
      <div className="relative z-10 p-8 max-w-4xl mx-auto">
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
          <h2 className="text-2xl font-bold mb-4 text-purple-400">
            How to Interact
          </h2>
          <ul className="space-y-2 text-gray-300">
            <li className="flex items-center gap-2">
              <span className="text-purple-400">🖱️</span>
              <strong>Left Click + Drag:</strong> Rotate the model
            </li>
            <li className="flex items-center gap-2">
              <span className="text-purple-400">🔍</span>
              <strong>Scroll:</strong> Zoom in/out
            </li>
            <li className="flex items-center gap-2">
              <span className="text-purple-400">👆</span>
              <strong>Right Click + Drag:</strong> Pan the view
            </li>
            <li className="flex items-center gap-2">
              <span className="text-purple-400">🔄</span>
              <strong>Auto-Rotate:</strong> Model rotates automatically
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
