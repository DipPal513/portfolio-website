"use client"
import React, { useRef, useEffect } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ArrowLeft, Menu, Mail, MapPin, Phone, Github, Linkedin, Twitter } from 'lucide-react';

const ContactPage = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".reveal", { y: 50, opacity: 0, stagger: 0.1, duration: 1, delay: 0.2, ease: "power3.out" });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-screen bg-[#050505] text-[#ededed] font-sans selection:bg-cyan-400 selection:text-black overflow-hidden flex flex-col">
      
      {/* --- STYLES & TEXTURE --- */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@300;400;500;600&display=swap');
        .font-anton { fontFamily: 'Anton', sans-serif; }
        .font-inter { fontFamily: 'Inter', sans-serif; }
      `}</style>
      <div className="absolute inset-0 pointer-events-none opacity-[0.04] z-50 fixed mix-blend-overlay" style={{backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`}}></div>

      {/* --- NAV BAR --- */}
      <nav className="fixed top-0 left-0 w-full z-[100] flex justify-between items-center px-8 md:px-12 py-6 mix-blend-difference text-white">
          <Link href="/" className="group flex items-center gap-3 text-sm font-inter uppercase tracking-widest hover:text-cyan-400 transition-colors">
              <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all"><ArrowLeft size={14} /></div>
              <span className="hidden md:inline">Home</span>
          </Link>
          <div className="font-anton text-xl tracking-wide uppercase">Get in Touch</div>
          <button className="group flex items-center gap-3 text-sm font-inter uppercase tracking-widest hover:text-cyan-400 transition-colors">
              <span className="hidden md:inline">Menu</span>
              <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all"><Menu size={14} /></div>
          </button>
      </nav>

      {/* --- CONTENT --- */}
      <main className="flex-1 flex flex-col justify-center items-center px-6 relative z-10 text-center">
          
          <p className="reveal font-inter text-cyan-400 uppercase tracking-widest text-sm mb-6 border border-white/10 px-4 py-1 rounded-full bg-white/5">
              Available for Freelance & Full-time
          </p>

          {/* MASSIVE EMAIL LINK */}
          <a href="mailto:contact@dippal.dev" className="reveal group relative inline-block">
              <h1 className="font-anton text-[8vw] md:text-[6vw] uppercase leading-none text-white group-hover:text-cyan-400 transition-colors duration-300">
                  Click to Mail
              </h1>
              <div className="h-[2px] w-0 bg-cyan-400 absolute bottom-0 left-0 group-hover:w-full transition-all duration-500"></div>
          </a>

          {/* DETAILS GRID */}
          <div className="reveal mt-16 grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-24 text-center">
              <div>
                  <h3 className="flex items-center justify-center gap-2 font-inter text-zinc-500 uppercase tracking-widest text-xs mb-2"><MapPin size={14}/> Location</h3>
                  <p className="font-anton text-xl text-white">Dhaka, Bangladesh</p>
              </div>
              <div>
                  <h3 className="flex items-center justify-center gap-2 font-inter text-zinc-500 uppercase tracking-widest text-xs mb-2"><Phone size={14}/> Phone</h3>
                  <p className="font-anton text-xl text-white">+880 162 5197575</p>
              </div>
              <div>
                  <h3 className="flex items-center justify-center gap-2 font-inter text-zinc-500 uppercase tracking-widest text-xs mb-2"><Mail size={14}/> Socials</h3>
                  <div className="flex gap-4 justify-center mt-1 text-white">
                   <Link href={"https://github.com/dippal513"}>
                      <Github className="hover:text-cyan-400 cursor-pointer transition-colors" size={20}/>
                   </Link>
                      <Linkedin className="hover:text-cyan-400 cursor-pointer transition-colors" size={20}/>
                  </div>
              </div>
          </div>

      </main>

      {/* FOOTER */}
      <div className="w-full p-8 text-center border-t border-white/5 text-zinc-600 font-inter text-xs uppercase tracking-widest">
          © 2025 Dip Pal. All Rights Reserved.
      </div>

    </div>
  );
};

export default ContactPage;