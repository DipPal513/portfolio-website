"use client"
import React, { useRef, useEffect } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ArrowLeft, Menu, Download } from 'lucide-react';

const AboutPage = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Reveal Image
      gsap.from(imgRef.current, { scale: 1.2, opacity: 0, duration: 1.5, ease: "power2.out" });
      // 2. Text Stagger
      gsap.from(".anim-text", { y: 30, opacity: 0, stagger: 0.1, duration: 1, delay: 0.3, ease: "power3.out" });
      // 3. Stats Pop
      gsap.from(".stat-item", { scale: 0.9, opacity: 0, stagger: 0.1, duration: 0.8, delay: 0.8, ease: "back.out(1.7)" });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full min-h-screen bg-[#050505] text-[#ededed] font-sans selection:bg-cyan-400 selection:text-black">
      
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
          <div className="font-anton text-xl tracking-wide uppercase">About Me</div>
          <button className="group flex items-center gap-3 text-sm font-inter uppercase tracking-widest hover:text-cyan-400 transition-colors">
              <span className="hidden md:inline">about</span>
            
          </button>
      </nav>

      {/* --- CONTENT --- */}
      <main className="pt-32 pb-20 px-6 md:px-12 w-full max-w-[1400px] mx-auto flex flex-col md:flex-row gap-16 relative z-10">
        
        {/* LEFT: IMAGE */}
        <div className="w-full md:w-1/2 h-[60vh] md:h-[80vh] relative overflow-hidden group">
            <div className="absolute inset-0 z-10 border border-white/10 group-hover:border-cyan-400/50 transition-colors duration-500"></div>
            <img ref={imgRef} src="/profile.jpg" alt="About Dip" className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 transition-all duration-700 ease-out" />
            
            {/* Overlay Info */}
            <div className="absolute bottom-6 left-6 z-20 bg-black/50 backdrop-blur-md px-4 py-2 border border-white/10">
                <p className="font-inter text-xs text-cyan-400 uppercase tracking-widest">Dip Pal • Full Stack Dev</p>
            </div>
        </div>

        {/* RIGHT: BIO & STATS */}
        <div className="w-full md:w-1/2 flex flex-col justify-center">
            <h1 className="anim-text font-anton text-7xl md:text-9xl leading-none uppercase mb-8 text-white">
                The <br/> <span className="text-zinc-700">Story.</span>
            </h1>
            
            <p className="anim-text font-inter text-zinc-300 text-lg leading-relaxed mb-6">
                I am a Full Stack Developer based in Dhaka, obsessed with the intersection of <span className="text-white font-bold">performance</span> and <span className="text-white font-bold">design</span>.
            </p>
            <p className="anim-text font-inter text-zinc-400 text-base leading-relaxed mb-12">
                My journey started with a curiosity for how things work on the web, which quickly turned into a career building scalable applications for Ancova Software. I don't just write code; I architect digital experiences that leave a lasting impression.
            </p>

            {/* STATS GRID */}
            <div className="grid grid-cols-2 gap-8 border-t border-white/10 pt-8 mb-12">
                <div className="stat-item">
                    <span className="block font-anton text-5xl text-white mb-1">02+</span>
                    <span className="font-inter text-xs text-cyan-400 uppercase tracking-widest">Years Experience</span>
                </div>
                <div className="stat-item">
                    <span className="block font-anton text-5xl text-white mb-1">12+</span>
                    <span className="font-inter text-xs text-cyan-400 uppercase tracking-widest">Projects Shipped</span>
                </div>
            </div>

            {/* BUTTON */}
            <button className="anim-text w-fit flex items-center gap-3 bg-white text-black px-8 py-4 font-anton uppercase tracking-wider hover:bg-cyan-400 transition-colors">
                Download Resume <Download size={18} />
            </button>
        </div>
      </main>
    </div>
  );
};

export default AboutPage;