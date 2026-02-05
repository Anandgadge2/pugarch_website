"use client";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import Link from "next/link";

// Import Spline with proper error handling
const Spline = dynamic(
  () => import("@splinetool/react-spline").catch(() => {
    // Return a dummy component if Spline fails to import
    return { default: () => null };
  }),
  {
    ssr: false,
    loading: () => null,
  }
) as any;

const Hero = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const [splineError, setSplineError] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    // Fallback timeout - show content after 5 seconds regardless
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 5000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <section className="relative h-screen w-screen flex flex-col justify-center items-center text-center px-4 overflow-hidden bg-black">
      {/* Spline Background - The exact scene from your second image */}
      {isMounted && !splineError && (
        <div className="absolute inset-0 z-0">
          <Spline
            scene="https://prod.spline.design/IKzNUZKoVFM7tr91/scene.splinecode"
            onLoad={() => {
              console.log('Spline loaded successfully');
              setIsLoading(false);
            }}
            onError={(error: any) => {
              console.error('Spline failed to load:', error);
              setSplineError(true);
              setIsLoading(false);
            }}
          />
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-black/40 z-10" />
        </div>
      )}

      {/* Fallback Background - Blue glowing lines (if Spline fails) */}
      {(splineError || !isMounted) && (
        <div className="absolute inset-0 bg-black z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-950/50 via-black to-purple-950/30"></div>
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 left-1/4 w-[800px] h-[800px] border-2 border-blue-500/30 rounded-full blur-sm animate-float-slow"></div>
            <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] border-2 border-blue-400/20 rounded-full blur-sm animate-float-slower"></div>
            <div className="absolute bottom-1/4 left-1/3 w-[700px] h-[700px] border-2 border-purple-500/20 rounded-full blur-sm animate-float"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border-2 border-blue-400/40 rounded-full blur-md animate-pulse"></div>
          </div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,black_70%)]"></div>
        </div>
      )}

      {/* Loading Spinner - Show while Spline is loading */}
      {isLoading && isMounted && !splineError && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black">
          <div className="flex flex-col items-center gap-4">
            <div className="relative w-24 h-24">
              <div className="absolute inset-0 border-4 border-blue-500/30 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-transparent border-t-blue-500 rounded-full animate-spin"></div>
            </div>
            <p className="text-blue-400 text-sm animate-pulse">Loading experience...</p>
          </div>
        </div>
      )}

      {/* Content - Always visible on top */}
      <motion.div 
        className="relative z-20 max-w-3xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <motion.h2 
          className="text-sm md:text-base text-white uppercase tracking-wider mb-2 drop-shadow-[0_0_8px_rgba(0,0,0,0.8)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          We Are
        </motion.h2>
        
        <motion.h1 
          className="text-5xl md:text-6xl font-extrabold mb-6 text-white drop-shadow-[0_0_15px_rgba(0,0,0,0.9)]"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          PUGARCH
        </motion.h1>
        
        <motion.h3 
          className="text-2xl md:text-3xl font-semibold mb-8 text-white drop-shadow-[0_0_12px_rgba(0,0,0,0.8)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          Turning Ideas into Intelligent Solutions
        </motion.h3>

        <motion.div 
          className="flex flex-wrap justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
        >
          <a
            href="#services"
            className="px-6 py-3 rounded-full bg-black text-white font-medium 
                       shadow-[0_0_10px_rgba(138,43,226,0.7)] border border-purple-500 
                       hover:bg-purple-600 hover:shadow-[0_0_20px_rgba(138,43,226,0.9)] 
                       transition duration-300"
          >
            Explore Our Services
          </a>

          <Link
            href="/contact"
            className="px-6 py-3 rounded-full bg-black text-white font-medium 
                       shadow-[0_0_10px_rgba(138,43,226,0.7)] border border-purple-500 
                       hover:bg-purple-600 hover:shadow-[0_0_20px_rgba(138,43,226,0.9)] 
                       transition duration-300"
          >
            Talk to Us
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
};

const WhyPugArch = () => {
  return (
    <section className="relative bg-black text-white py-20 px-6 md:px-12 text-center overflow-hidden">
      <motion.div
        className="relative z-10 max-w-4xl mx-auto"
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.3 }}
        variants={{
          hidden: { opacity: 0, y: 40 },
          show: {
            opacity: 1,
            y: 0,
            transition: {
              staggerChildren: 0.25,
              duration: 0.8,
              ease: "easeOut",
            },
          },
        }}
      >
        <motion.h2
          variants={{
            hidden: { opacity: 0, y: 40 },
            show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
          }}
          className="text-3xl md:text-4xl font-bold mb-6 drop-shadow-[0_0_10px_rgba(0,0,0,0.8)]"
        >
          Why PugArch?
        </motion.h2>

        <motion.p
          variants={{
            hidden: { opacity: 0, y: 40 },
            show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
          }}
          className="text-xl font-semibold text-purple-300 mb-6"
        >
          We are PugArch — transforming ideas into powerful digital solutions.
        </motion.p>

        <motion.p 
          variants={{
            hidden: { opacity: 0, y: 40 },
            show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
          }}
          className="text-lg text-gray-300 mb-10"
        >
          We don't just develop software — we engineer business-changing experiences.
        </motion.p>

        <motion.div
          className="space-y-6 text-left max-w-2xl mx-auto"
          variants={{
            hidden: { opacity: 0, y: 40 },
            show: {
              opacity: 1,
              y: 0,
              transition: {
                staggerChildren: 0.25,
                duration: 0.8,
                ease: "easeOut",
              },
            },
          }}
        >
          <motion.p 
            variants={{
              hidden: { opacity: 0, y: 40 },
              show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
            }}
            className="flex items-start gap-3"
          >
            <span className="text-gray-200">
              <strong>Custom Development –</strong> High-performance web & mobile applications.
            </span>
          </motion.p>

          <motion.p 
            variants={{
              hidden: { opacity: 0, y: 40 },
              show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
            }}
            className="flex items-start gap-3"
          >
            <span className="text-gray-200">
              <strong>SaaS Solutions –</strong> Agile, scalable, and cloud-ready.
            </span>
          </motion.p>

          <motion.p 
            variants={{
              hidden: { opacity: 0, y: 40 },
              show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
            }}
            className="flex items-start gap-3"
          >
            <span className="text-gray-200">
              <strong>Business Systems –</strong> Facility, field, and workforce management tools that deliver measurable impact.
            </span>
          </motion.p>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
export { WhyPugArch };
