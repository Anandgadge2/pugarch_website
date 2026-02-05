// components/Loader.tsx
'use client';

import dynamic from 'next/dynamic';
import React, { useState } from 'react';

// ✅ Dynamic import with error handling
const Spline = dynamic(() => import('@splinetool/react-spline'), {
  ssr: false,
  loading: () => (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
    </div>
  ),
}) as any;

const Loader = () => {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
      <Spline 
        scene="https://prod.spline.design/dFaU5JOutgAR1-Hx/scene.splinecode"
        onError={() => setHasError(true)}
      />
    </div>
  );
};

export default Loader;
