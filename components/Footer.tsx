import React from 'react';
import Link from 'next/link';
import { Linkedin, Twitter, Facebook, Instagram, Mail } from 'lucide-react';

const socialLinks = [
  { href: 'https://www.linkedin.com/company/pugarch-technology-pvt-ltd/', icon: <Linkedin size={18} />, label: 'LinkedIn' },
  { href: '#', icon: <Twitter size={18} />, label: 'Twitter' },
  { href: '#', icon: <Facebook size={18} />, label: 'Facebook' },
  { href: 'https://www.instagram.com/pugarchtechnology?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==', icon: <Instagram size={18} />, label: 'Instagram' },
  { href: '#', icon: <Mail size={18} />, label: 'Email' },
];

const quickLinks = [
  { name: 'Home', href: '/' },
  { name: 'Services', href: '#services' },
  { name: 'About Us', href: '#about' },
  { name: 'Blog', href: '/blog' }, // ✅ if you plan to add blog pages
  { name: 'Products', href: '#products' },
  { name: 'Contact Us', href: '#contact' },
];

export default function Footer() {
  return (
    <footer className="bg-black text-white px-6 py-8 relative border-t border-white/20">
      <div className="max-w-7xl mx-auto">
        {/* Join Our Team Button - Top Right */}
        <div className="absolute top-6 right-6">
          <Link
            href="/join-us"
            className="px-6 py-2 rounded-md bg-transparent border-2 border-purple-500 text-white font-semibold shadow-[0_0_15px_rgba(147,51,234,0.5)] hover:shadow-[0_0_25px_rgba(147,51,234,0.8)] transition-all duration-300 hover:bg-purple-500/10"
          >
            Join Our Team!
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pt-8">
          {/* Logo and Social Section */}
          <div className="space-y-6">
            <div>
              <img
                src="/images/3.png"
                alt="PugArch Logo"
                className="w-48 h-auto mb-3"
              />
              <p className="text-gray-400 text-sm">
                PugArch - Shaping Tomorrow&apos;s Tech Landscape
              </p>
            </div>

            {/* Social Icons */}
            <div>
              <p className="text-sm mb-3 font-medium">Follow Us On</p>
              <div className="flex space-x-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    className="w-9 h-9 rounded-sm bg-white/10 flex items-center justify-center text-white hover:bg-purple-500 transition-all duration-300 hover:scale-105"
                    aria-label={social.label}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Contact Us</h3>
            <div className="space-y-3 text-sm text-gray-300">
              <p>
                L-18 LIG Mahada Colony, Laxman Nagar, Manewada, Nagpur, Maharashtra
              </p>
              <p>
                <span className="font-medium text-white">Branch Office:</span> Mumbai Off No.128, 1st Floor Raghuleela Mega Mall,
                Boraspada Road, Behind Poisar Bus Depot, Kandivali(W), Mumbai-400067,
                Maharashtra
              </p>
              <div className="space-y-1">
                <p>• <span className="font-medium text-white">Mail:</span> info@pugarch.in</p>
                <p>• <span className="font-medium text-white">Contact No:</span> 7897858594</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
