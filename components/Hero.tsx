"use client";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion, Variants } from "framer-motion";
import Link from "next/link";

// ✅ Import ThreeScene dynamically for performance and SSR safety
const ThreeScene = dynamic(() => import("./ThreeScene"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-black" />,
}) as any;

const Hero = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section className="relative h-screen w-screen flex flex-col justify-center items-center text-center px-4 overflow-hidden bg-black">
      {/* ✅ Premium CSS Loader - Matches Website Theme */}
      {/* {isMounted && isLoading && (
        <div className="absolute inset-0 z-50 flex flex-col justify-center items-center bg-black">
          <div className="relative w-24 h-24">
            <div className="absolute inset-0 border-4 border-violet-500/20 rounded-full" />
            <div className="absolute inset-0 border-4 border-t-violet-500 rounded-full animate-spin" />
            <div className="absolute inset-4 border-4 border-purple-500/10 rounded-full" />
            <div className="absolute inset-4 border-b-4 border-purple-500 rounded-full animate-spin-slow" />
          </div>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
            className="mt-6 text-violet-300 font-medium tracking-widest text-sm uppercase"
          >
            Initializing Experience
          </motion.p>
        </div>
      )} */}

      {/* ✅ Three.js Background Model - Local GLTF for fast hosting */}
      {isMounted && (
        <div className="absolute inset-0">
          <ThreeScene onLoaded={() => setIsLoading(false)} />
          {/* Subtle vignette and color overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(0,0,0,0.4)_100%)] pointer-events-none" />
        </div>
      )}

      {/* ✅ Content - Integrated with the 3D Scene */}
      <motion.div 
        className="relative z-10 max-w-4xl px-4"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: isLoading ? 0 : 1, y: isLoading ? 30 : 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-[0.3em] text-violet-400 uppercase border border-violet-500/30 rounded-full bg-violet-500/10 backdrop-blur-sm">
            Innovation Redefined
          </span>
        </motion.div>
        
        <h1 className="text-5xl md:text-8xl font-black mb-6 text-white tracking-tighter">
          PUG<span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-purple-600">ARCH</span>
        </h1>
        
        <h3 className="text-xl md:text-3xl font-medium mb-8 text-gray-300 leading-relaxed max-w-2xl mx-auto">
          Turning Ideas into <span className="text-white font-semibold">Intelligent Solutions</span> through advanced engineering.
        </h3>

        <div className="flex flex-col sm:flex-row justify-center gap-6 mt-4">
          <Link
            href="#services"
            className="group relative px-8 py-4 rounded-full bg-white text-black font-bold 
                       overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.2)]"
          >
            <span className="relative z-10">Explore Our Services</span>
            <div className="absolute inset-0 bg-gradient-to-r from-violet-200 to-white opacity-0 group-hover:opacity-100 transition-opacity" />
          </Link>

          <Link
            href="/contact-us"
            className="group relative px-8 py-4 rounded-full bg-transparent text-white font-bold 
                       border-2 border-violet-500/50 backdrop-blur-sm
                       transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <span className="relative z-10">Talk to Us</span>
            <div className="absolute inset-0 bg-violet-600/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-full" />
          </Link>
        </div>
      </motion.div>
      
      {/* Scroll Indicator */}
      {/* {!isLoading && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
        >
          <div className="w-[1px] h-12 bg-gradient-to-b from-violet-500 to-transparent animate-pulse" />
          <span className="text-[10px] uppercase tracking-[0.4em] text-violet-400/80">Scroll</span>
        </motion.div>
      )} */}
    </section>
  );
};

// Keep WhyPugArch as requested
const WhyPugArch = () => {
  return (
    <section className="relative bg-black text-white py-32 px-6 md:px-12 text-center overflow-hidden border-t border-white/5">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,_rgba(124,58,237,0.05)_0%,_transparent_50%)]" />
      
      <motion.div
        className="relative z-10 max-w-5xl mx-auto"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <h2 className="text-4xl md:text-5xl font-black mb-8 tracking-tight">
          Why <span className="text-violet-500">PugArch</span>?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-left mt-16">
          <div className="space-y-4 p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-violet-500/30 transition-colors group">
            <div className="w-12 h-12 rounded-2xl bg-violet-600/20 flex items-center justify-center text-violet-400 font-bold group-hover:scale-110 transition-transform">01</div>
            <h4 className="text-xl font-bold">Custom Development</h4>
            <p className="text-gray-400 text-sm leading-relaxed">
              High-performance web & mobile applications tailored to your specific business needs.
            </p>
          </div>

          <div className="space-y-4 p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-violet-500/30 transition-colors group">
            <div className="w-12 h-12 rounded-2xl bg-violet-600/20 flex items-center justify-center text-violet-400 font-bold group-hover:scale-110 transition-transform">02</div>
            <h4 className="text-xl font-bold">SaaS Solutions</h4>
            <p className="text-gray-400 text-sm leading-relaxed">
              Agile, scalable, and cloud-ready architectures that grow with your user base.
            </p>
          </div>

          <div className="space-y-4 p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-violet-500/30 transition-colors group">
            <div className="w-12 h-12 rounded-2xl bg-violet-600/20 flex items-center justify-center text-violet-400 font-bold group-hover:scale-110 transition-transform">03</div>
            <h4 className="text-xl font-bold">Business Systems</h4>
            <p className="text-gray-400 text-sm leading-relaxed">
              Facility, field, and workforce management tools that deliver measurable impact.
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
export { WhyPugArch };
