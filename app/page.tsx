'use client'

import React, { useEffect, useState } from "react"
import dynamic from "next/dynamic"
import Navbar from "../components/Navbar"
import Hero from "../components/Hero"
import AboutSection from "../components/AboutSection"
import ServicesSection from "../components/ServicesSection"
import Footer from "../components/Footer"
import { ArrowUp } from "lucide-react"
import { motion, easeOut } from "framer-motion" // ✅ import easing function


// 🚀 Lazy load heavy sections
const ProductsSection = dynamic(() => import("../components/ProductsSection"), { ssr: false })
const ClientsSection = dynamic(() => import("../components/ClientsSection"), { ssr: false })
// const TestimonialsSection = dynamic(() => import("../components/TestimonialsSection"), { ssr: false })

/**
 * Temporary inline WhyPugArch component
 */
function WhyPugArch() {
  const reasons = [
    { title: "Expert Team", desc: "Experienced engineers, designers and PMs who deliver." },
    { title: "End-to-end", desc: "From discovery to deployment and support." },
    { title: "Trusted by clients", desc: "Proven results across industries." },
    { title: "Scalable Solutions", desc: "Built for growth, security and performance." },
  ]

  return (
    <section id="why" className="py-16 bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold">
            Why <span className="text-violet-400">PugArch</span>
          </h2>
          <p className="text-gray-400 mt-2 max-w-2xl mx-auto">
            We combine product thinking, technical excellence and client-first delivery to help organizations transform.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {reasons.map((r, idx) => (
            <div key={idx} className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800">
              <h3 className="text-lg font-semibold text-white mb-2">{r.title}</h3>
              <p className="text-gray-400 text-sm">{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  const [componentsLoaded, setComponentsLoaded] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)

  // useScrollToHash()

  useEffect(() => {
    // ✅ Mark components as loaded
    const timeout = setTimeout(() => {
      setComponentsLoaded(true)
    }, 100)
    return () => clearTimeout(timeout)
  }, [])


   useEffect(() => {
    if (componentsLoaded && window.location.hash) {
      const hash = window.location.hash;
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          const navbarHeight = 100;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 300);
    }
  }, [componentsLoaded]);


  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  // ✅ Fixed easing type
  const sectionVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: easeOut } },
  }

  return (
    <div className="min-h-screen bg-[#000000] text-white overflow-x-hidden">
      <div className="relative">
        <Navbar />

        {/* Hero */}
        <motion.section
          id="home"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: easeOut }} // ✅ fixed
        >
          <Hero />
        </motion.section>

        {/* Why Section */}
        {/* <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionVariants}
        >
          <WhyPugArch />
        </motion.div> */}

        {/* About */}
        <motion.section
          id="about"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionVariants}
        >
          <AboutSection />
        </motion.section>

        {/* Services */}
        <motion.section
          id="services"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionVariants}
        >
          <ServicesSection />
        </motion.section>

        {/* Products */}
        <motion.section
          id="products"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionVariants}
        >
          <ProductsSection />
        </motion.section>

        {/* Clients */}
        <motion.section
          id="clients"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionVariants}
        >
          <ClientsSection />
        </motion.section>

        {/* Testimonials */}
        {/* <motion.section
          id="testimonials"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionVariants}
        >
          <TestimonialsSection />
        </motion.section> */}

        <Footer />

        {/* Scroll to Top */}
        {showScrollTop && (
          <motion.button
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 p-3 rounded-full bg-violet-600 text-white shadow-lg hover:bg-violet-700 transition-all duration-300 z-50"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.5, ease: easeOut }} // ✅ fixed
          >
            <ArrowUp size={20} />
          </motion.button>
        )}
      </div>
    </div>
  )
}
