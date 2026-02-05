'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import dynamic from 'next/dynamic';
import { LOADER_CONFIG } from '@/config/loader.config';

// Dynamically import Spline with fallback
const Spline = dynamic(() => import('@splinetool/react-spline'), {
  ssr: false,
  loading: () => (
    <div className="fixed inset-0 z-[9999] bg-black flex items-center justify-center">
      <div className={`animate-spin rounded-full ${LOADER_CONFIG.fallback.size} border-t-2 border-b-2 ${LOADER_CONFIG.fallback.color}`}></div>
    </div>
  ),
}) as any;

export default function PageTransitionLoader() {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if loader is enabled
    if (!LOADER_CONFIG.enabled) return;

    // Check if current route should be excluded
    if (LOADER_CONFIG.excludeRoutes.some(route => pathname.startsWith(route))) {
      return;
    }

    // Check if route is in include list (if specified)
    if (LOADER_CONFIG.includeRoutes.length > 0) {
      if (!LOADER_CONFIG.includeRoutes.some(route => pathname.startsWith(route))) {
        return;
      }
    }

    // Show loader when route changes
    setIsLoading(true);
    setIsVisible(true);
    setHasError(false);

    // Ensure minimum display time
    const minTimer = setTimeout(() => {
      setIsLoading(false);
    }, LOADER_CONFIG.minDuration);

    // Hide loader after full duration
    const hideTimer = setTimeout(() => {
      setIsVisible(false);
    }, LOADER_CONFIG.duration);

    return () => {
      clearTimeout(minTimer);
      clearTimeout(hideTimer);
    };
  }, [pathname]);

  if (!isVisible) return null;

  return (
    <div 
      className={`fixed inset-0 z-[9999] bg-black flex items-center justify-center transition-opacity duration-500 ${
        isLoading ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {!hasError ? (
        <div className="w-full h-full">
          <Spline
            scene={LOADER_CONFIG.splineScene}
            onError={() => {
              console.warn('Spline page transition loader failed, using fallback');
              setHasError(true);
            }}
          />
        </div>
      ) : (
        // Fallback spinner if Spline fails
        <div className="flex flex-col items-center gap-4">
          <div className={`animate-spin rounded-full ${LOADER_CONFIG.fallback.size} border-t-2 border-b-2 ${LOADER_CONFIG.fallback.color}`}></div>
          {LOADER_CONFIG.fallback.showText && (
            <p className="text-purple-400 text-lg animate-pulse">
              {LOADER_CONFIG.fallback.text}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
