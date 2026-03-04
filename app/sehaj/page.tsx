"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Shield, MessageSquare, Info, Phone, Mail, ExternalLink } from "lucide-react"; // Using available icons or Lucide

// I'll define some local icons or use ones likely available in the project


export default function SehajLandingPage() {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(124,58,237,0.15),transparent_40%),radial-gradient(circle_at_20%_80%,rgba(124,58,237,0.1),transparent_40%)] pointer-events-none" />

      {/* Navigation */}
      <nav className="relative z-10 max-w-7xl mx-auto px-6 py-6 flex justify-between items-center border-b border-white/10">
        <div className="flex items-center gap-4">
          <img src="/images/logo.svg" alt="Sehaj Logo" className="h-12 w-auto rounded-lg shadow-lg" />
          <span className="text-2xl font-black tracking-tight bg-gradient-to-r from-white to-violet-400 bg-clip-text text-transparent">
            Sehaj Helpdesk
          </span>
        </div>
        <div className="hidden md:block text-right">
          <div className="text-xs uppercase tracking-widest text-violet-400 font-bold mb-1">
            District Administration
          </div>
          <div className="text-sm font-semibold opacity-80">Collectorate Jharsuguda</div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 pt-20 pb-16 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-block px-4 py-1.5 mb-8 text-[10px] font-black tracking-[0.3em] text-violet-400 uppercase border border-violet-500/30 rounded-full bg-violet-500/10 backdrop-blur-sm shadow-[0_0_15px_rgba(124,58,237,0.2)]"
        >
          Official Digital Citizen Portal
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-5xl md:text-8xl font-black mb-8 leading-[0.9] tracking-tighter"
        >
          Sehaj –{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-br from-white via-violet-300 to-purple-600">
            Collectorate Jharsuguda
          </span>
          <br /> WhatsApp Helpdesk
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-12 font-light leading-relaxed"
        >
          Sehaj is the official WhatsApp helpdesk system implemented for citizen services of <strong>Collectorate Jharsuguda</strong>. 
          The chatbot enables residents to access verified district information, submit grievances, and receive 24/7 assistance through WhatsApp.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex justify-center"
        >
          <a
            href="https://wa.me/918999470824"
            className="group relative px-10 py-5 rounded-2xl bg-[#25D366] text-white font-black text-xl 
                       overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_10px_30px_rgba(37,211,102,0.3)] flex items-center gap-4"
          >
            Launch Helpdesk
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>
        </motion.div>
      </section>

      {/* Feature Cards */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "District Services",
              desc: "Access verified information regarding district services, government schemes, and official department procedures directly.",
              icon: <Info className="text-violet-400" size={24} />,
            },
            {
              title: "Submit Grievances",
              desc: "A seamless way to submit and track grievances. The Sehaj system ensures your concerns reach the Collectorate officials promptly.",
              icon: <MessageSquare className="text-violet-400" size={24} />,
            },
            {
              title: "Verified Assistance",
              desc: "Receive assistance through an official, verified channel. This platform acts as a digital bridge for the residents of Jharsuguda.",
              icon: <Shield className="text-violet-400" size={24} />,
            },
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-violet-500/30 transition-all group backdrop-blur-md"
            >
              <div className="w-12 h-12 rounded-2xl bg-violet-600/10 flex items-center justify-center mb-6 border border-violet-500/20 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed text-sm">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Organization Details Container */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-12 rounded-[40px] bg-gradient-to-br from-white/5 to-transparent border border-white/10"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <div className="mb-8">
                <span className="text-[10px] font-black tracking-widest text-violet-400 uppercase">Organization Info</span>
                <h2 className="text-3xl font-bold mt-2 text-white">Collectorate Jharsuguda</h2>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-violet-500/10 rounded-lg"><Info size={20} className="text-violet-400" /></div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-300">Office Address</h4>
                    <p className="text-gray-400 text-sm">District Administration Office, Collectorate, Jharsuguda, Odisha, India – 768204</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-violet-500/10 rounded-lg"><ExternalLink size={20} className="text-violet-400" /></div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-300">Official Website</h4>
                    <p className="text-gray-400 text-sm"><a href="https://jharsuguda.odisha.gov.in" className="hover:text-white underline">jharsuguda.odisha.gov.in</a></p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="mb-8">
                <span className="text-[10px] font-black tracking-widest text-violet-400 uppercase">Contact Channels</span>
                <h2 className="text-3xl font-bold mt-2 text-white">Direct Assistance</h2>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-violet-500/10 rounded-lg"><Phone size={20} className="text-violet-400" /></div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-300">Phone Support</h4>
                    <p className="text-gray-400 text-sm">06645-270070</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-violet-500/10 rounded-lg"><Mail size={20} className="text-violet-400" /></div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-300">Email Enquiries</h4>
                    <p className="text-gray-400 text-sm">dm-jharsuguda@nic.in</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Footer Disclaimer */}
      <footer className="relative z-10 max-w-7xl mx-auto px-6 py-12 border-t border-white/10 text-center">
        <p className="text-violet-400/80 text-sm font-bold mb-4">
          This digital service platform is developed and maintained by <strong>PugArch Technology Pvt Ltd</strong>.
        </p>
        <p className="text-gray-500 text-[10px] uppercase tracking-widest mb-8">
          &copy; 2026 Collectorate Jharsuguda District Administration. All rights reserved.
        </p>
        <div className="flex justify-center gap-8 text-xs text-gray-400 font-bold">
          <Link href="/privacy-policy" className="hover:text-white hover:tracking-widest transition-all">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-white hover:tracking-widest transition-all">Terms of Service</Link>
          <Link href="https://jharsuguda.odisha.gov.in" className="hover:text-white hover:tracking-widest transition-all">Collectorate Website</Link>
        </div>
      </footer>
    </div>
  );
}
