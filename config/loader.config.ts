// Configuration for page transition loader
export const LOADER_CONFIG = {
  // Duration in milliseconds
  duration: 2000,
  
  // Minimum time to show loader (prevents flash)
  minDuration: 500,
  
  // Spline scene URL
  splineScene: 'https://prod.spline.design/dFaU5JOutgAR1-Hx/scene.splinecode',
  
  // Enable/disable loader
  enabled: true,
  
  // Show loader only on certain routes (empty array = all routes)
  includeRoutes: [],
  
  // Exclude specific routes from showing loader
  excludeRoutes: ['/model-demo'], // Don't show on 3D model demo page
  
  // Fallback spinner config
  fallback: {
    size: 'h-32 w-32',
    color: 'border-purple-500',
    showText: true,
    text: 'Loading...',
  },
};
