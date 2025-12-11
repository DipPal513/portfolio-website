"use client"
import React, { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ArrowUpRight, Github, Twitter, Linkedin, Terminal, MoveRight } from 'lucide-react';

// --- CONFIG ---
const PROFILE_IMG = "/profile.jpg"; // Ensure this image is in your public folder

const MENU_ITEMS = [
  { id: "01", label: "Experience", href: "/experience" },
  { id: "02", label: "About", href: "/about" },
  { id: "03", label: "Skills", href: "/skills" },
  { id: "04", label: "projects", href: "/projects" },
  { id: "04", label: "Contact", href: "/contact" }
];

const HeroFixed = () => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const infoGroupRef = useRef<HTMLDivElement>(null);

  // --- 1. SETUP GSAP ENTRANCE ---
  useEffect(() => {
    const ctx = gsap.context(() => {
        // Image Fade In
        gsap.from(imageRef.current, { scale: 1.2, opacity: 0, duration: 1.5, ease: "power2.out" });
        // Menu Stagger
        gsap.from(".menu-row", { x: 50, opacity: 0, stagger: 0.1, duration: 1, ease: "power3.out", delay: 0.5 });
        // Info Pop up
        gsap.from(".info-pop", { y: 20, opacity: 0, duration: 0.8, delay: 1 });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // --- 2. IMAGE SHAKE ANIMATION (GSAP) ---
  const handlePhotoEnter = () => {
    // 1. Colorize & Zoom
    gsap.to(imageRef.current, { 
        filter: "grayscale(0%) contrast(1.1)", 
        scale: 1.05,
        duration: 0.5 
    });

    // 2. The "Little Shake" (Jitter Effect)
    gsap.to(imageRef.current, {
        x: "random(-2, 2)", // Shake range X (subtle)
        y: "random(-2, 2)", // Shake range Y (subtle)
        duration: 0.1,      // Very fast
        repeat: -1,         // Infinite loop while hovering
        yoyo: true,         // Go back and forth
        ease: "sine.inOut"
    });
  };

  const handlePhotoLeave = () => {
    // Stop Shake & Reset
    gsap.to(imageRef.current, { 
        x: 0,
        y: 0,
        scale: 1, 
        filter: "grayscale(100%) contrast(1)", 
        duration: 0.5,
        overwrite: true // Important: stops the infinite shake immediately
    });
  };

  return (
    <div ref={containerRef} className="relative w-full h-screen bg-[#050505] text-white flex overflow-hidden font-sans selection:bg-cyan-400 selection:text-black">
      
      {/* FONTS */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@300;400;500;600&display=swap');
        .font-anton { fontFamily: 'Anton', sans-serif; }
        .font-inter { fontFamily: 'Inter', sans-serif; }
      `}</style>

      {/* NOISE OVERLAY */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04] z-50 mix-blend-overlay" style={{backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`}}></div>

      {/* === LEFT SIDE: PHOTO & IDENTITY (40%) === */}
      <div 
        className="hidden md:block w-[40%] h-full relative overflow-hidden border-r border-white/10 group cursor-pointer"
        onMouseEnter={handlePhotoEnter}
        onMouseLeave={handlePhotoLeave}
      >
         {/* DYNAMIC IMAGE */}
         <div className="absolute inset-[-5%] w-[110%] h-[110%]">
             <img 
                ref={imageRef}
                src={PROFILE_IMG} 
                alt="Profile" 
                className="w-full h-full object-cover grayscale brightness-90 transition-none will-change-transform"
             />
         </div>
         
         {/* GRADIENT OVERLAY (For text readability) */}
         <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none"></div>

         {/* INFO GROUP */}
         <div ref={infoGroupRef} className="absolute bottom-10 left-10 right-10 z-20 pointer-events-none">
             
             {/* DESIGNATION BADGE (Glassmorphism) */}
             <div className="info-pop inline-flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/10 px-4 py-2 rounded-lg mb-4 shadow-lg">
                <Terminal size={14} className="text-cyan-400" />
                <span className="font-inter font-bold text-xs uppercase tracking-widest text-white">Full Stack Web Developer</span>
             </div>

             {/* NAME */}
             <h1 className="info-pop font-anton text-8xl lg:text-9xl uppercase leading-none text-white drop-shadow-2xl">
                DIP <br/> <span className="text-transparent" style={{ WebkitTextStroke: '2px white' }}>PAL</span>
             </h1>
             
             {/* SUBTEXT */}
             <div className="info-pop mt-6 flex items-center gap-3 opacity-80">
                <div className="h-[1px] w-12 bg-cyan-400"></div>
                <p className="font-inter text-sm text-zinc-300">Based in Dhaka, Bangladesh</p>
             </div>
         </div>
      </div>


      {/* === RIGHT SIDE: MENU (60%) === */}
      <div className="w-full md:w-[60%] h-full flex flex-col justify-center relative p-8 md:p-24 z-10">
         
         {/* Top Icons */}
         <div className="absolute top-0 right-0 p-10 flex gap-6 text-zinc-500">
             {[Github, Twitter, Linkedin].map((Icon, i) => (
                 <Icon key={i} size={20} className="hover:text-white transition-colors cursor-pointer" />
             ))}
         </div>

         {/* MENU ITEMS */}
         <div className="flex flex-col gap-1">
            {MENU_ITEMS.map((item, index) => (
                <Link key={index} href={item.href} legacyBehavior>
                    <a 
                        className="menu-row group relative flex items-center justify-between py-6 md:py-9 border-b border-white/10 hover:border-white transition-colors duration-500"
                        onMouseEnter={() => setHoveredIdx(index)}
                        onMouseLeave={() => setHoveredIdx(null)}
                        style={{
                            opacity: hoveredIdx !== null && hoveredIdx !== index ? 0.25 : 1, // Dim others
                            transition: 'opacity 0.4s ease'
                        }}
                    >
                        <div className="flex items-center gap-8 md:gap-12">
                            <span className="font-inter text-xs font-medium text-zinc-600 group-hover:text-cyan-400 transition-colors">
                                /{item.id}
                            </span>

                            {/* --- FIXED ROLLING TEXT LOGIC --- */}
                            <div className="relative h-[60px] md:h-[80px] overflow-hidden">
                                
                                {/* 1. Normal Text (Slides UP on hover) */}
                                <span className="block font-anton text-6xl md:text-8xl uppercase text-zinc-500 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full">
                                    {item.label}
                                </span>

                                {/* 2. Hover Text (Starts below, slides to CENTER) */}
                                <span className="absolute top-0 left-0 block font-anton text-6xl md:text-8xl uppercase text-white transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] translate-y-full group-hover:translate-y-0">
                                    {item.label}
                                </span>
                            </div>
                        </div>

                        <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:border-white transition-all duration-300">
                             <MoveRight className="text-zinc-500 group-hover:text-black transition-colors" size={18} />
                        </div>
                    </a>
                </Link>
            ))}
         </div>

         {/* BOTTOM FOOTER */}
         <div className="absolute bottom-0 right-0 p-10 text-right">
             <p className="font-inter text-xs text-zinc-600 uppercase tracking-widest mb-1">Portfolio 2025</p>
             <p className="font-inter text-xs text-zinc-600 uppercase tracking-widest">Available for Freelance</p>
         </div>

      </div>
    </div>
  );
};

export default HeroFixed;