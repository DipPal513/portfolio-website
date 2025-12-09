"use client"
import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ArrowUpRight, Calendar, ExternalLink } from 'lucide-react';

const EXPERIENCE_DATA = [
  {
    id: "01",
    company: "ANCOVA SOFTWARE",
    role: "Frontend Developer",
    date: "May 2023 - Sept 2024",
    description: "Spearheaded the frontend architecture for scalable web applications. Successfully shipped and contributed to over 12+ projects. Focused heavily on performance optimization, reducing load times and improving SEO scores.",
    tech: ["React", "Redux", "Optimization"],
    link: null
  },
  {
    id: "02",
    company: "ANCOVA SOFTWARE",
    role: "Intern Frontend Developer",
    date: "May 2023 - Aug 2023", // Adjusted end date to logical intern period
    description: "Kickstarted the journey by building the official website for the Department of Dance, University of Dhaka. Learned core Next.js patterns and responsive design principles.",
    tech: ["Next.js", "Tailwind", "UI/UX"],
    link: { label: "dance.du.ac.bd", url: "https://dance.du.ac.bd" }
  }
];

const Experience = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // --- 1. ENTRANCE ANIMATION ---
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title Reveal
      gsap.from(".exp-title", { 
        x: -50, 
        opacity: 0, 
        duration: 1, 
        ease: "power3.out",
        scrollTrigger: { trigger: containerRef.current, start: "top 80%" }
      });

      // List Stagger
      gsap.from(".exp-item", { 
        y: 100, 
        opacity: 0, 
        stagger: 0.2, 
        duration: 1, 
        ease: "power3.out",
        delay: 0.2
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  // --- 2. HOVER INTERACTION ---
  const handleEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const details = target.querySelector('.exp-details');
    const arrow = target.querySelector('.exp-arrow');

    // Expand Details
    gsap.to(details, { height: "auto", opacity: 1, marginTop: 24, duration: 0.5, ease: "power3.out" });
    // Rotate Arrow
    gsap.to(arrow, { rotate: 90, color: "#22d3ee", duration: 0.3 }); // Cyan color
    // Dim siblings logic could go here if using state, but direct DOM manip is faster for lists
    gsap.to(target, { backgroundColor: "rgba(255,255,255,0.03)", duration: 0.3 });
  };

  const handleLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const details = target.querySelector('.exp-details');
    const arrow = target.querySelector('.exp-arrow');

    // Collapse Details
    gsap.to(details, { height: 0, opacity: 0, marginTop: 0, duration: 0.4, ease: "power3.in" });
    // Reset Arrow
    gsap.to(arrow, { rotate: 0, color: "#52525b", duration: 0.3 });
    // Reset BG
    gsap.to(target, { backgroundColor: "transparent", duration: 0.3 });
  };

  return (
    <div ref={containerRef} className="relative w-full min-h-screen bg-[#050505] text-white flex flex-col md:flex-row font-sans selection:bg-cyan-400 selection:text-black py-20 md:py-32">
      
      {/* GLOBAL FONTS (Same as Hero) */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@300;400;500;600&display=swap');
        .font-anton { fontFamily: 'Anton', sans-serif; }
        .font-inter { fontFamily: 'Inter', sans-serif; }
      `}</style>

      {/* NOISE OVERLAY */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04] z-50 mix-blend-overlay" style={{backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`}}></div>

      {/* === LEFT: TITLE (Sticky) === */}
      <div className="w-full md:w-[30%] px-8 md:px-12 mb-12 md:mb-0">
        <div className="md:sticky md:top-32">
           <div className="flex items-center gap-4 mb-4 opacity-50">
                <span className="w-12 h-[1px] bg-cyan-400"></span>
                <span className="font-inter text-xs uppercase tracking-widest text-cyan-400">Career History</span>
           </div>
           <h2 className="exp-title font-anton text-6xl md:text-7xl uppercase text-zinc-800 leading-none">
             Expe<br/><span className="text-white">rience</span>
           </h2>
        </div>
      </div>

      {/* === RIGHT: TIMELINE LIST === */}
      <div className="w-full md:w-[70%] px-8 md:px-24 flex flex-col">
          {EXPERIENCE_DATA.map((item, index) => (
            <div 
                key={index}
                className="exp-item group w-full border-t border-white/10 py-12 cursor-pointer transition-colors"
                onMouseEnter={handleEnter}
                onMouseLeave={handleLeave}
            >
                {/* --- HEADER ROW --- */}
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 md:gap-0">
                    
                    {/* Role & Company */}
                    <div className="flex flex-col gap-2">
                        <h3 className="font-anton text-4xl md:text-5xl text-zinc-400 group-hover:text-white transition-colors duration-300 uppercase">
                            {item.company}
                        </h3>
                        <div className="flex items-center gap-3">
                            <span className="font-inter text-sm md:text-base text-cyan-400 font-medium tracking-wide">
                                {item.role}
                            </span>
                            {/* Mobile Date (Shows here on small screens) */}
                            <span className="md:hidden font-inter text-xs text-zinc-600 bg-white/5 px-2 py-1 rounded">
                                {item.date}
                            </span>
                        </div>
                    </div>

                    {/* Right Side: Date & Arrow */}
                    <div className="flex items-center gap-8">
                        <div className="hidden md:flex items-center gap-2 text-zinc-500 font-inter text-sm uppercase tracking-widest group-hover:text-zinc-300 transition-colors">
                            <Calendar size={14} />
                            {item.date}
                        </div>
                        <ArrowUpRight className="exp-arrow text-zinc-600 transition-all" size={32} />
                    </div>
                </div>

                {/* --- HIDDEN DETAILS (Reveals on Hover) --- */}
                <div className="exp-details h-0 opacity-0 overflow-hidden">
                    <div className="max-w-2xl">
                        <p className="font-inter text-zinc-400 leading-relaxed text-sm md:text-base mb-6">
                            {item.description}
                        </p>
                        
                        {/* Footer: Tech Stack & Link */}
                        <div className="flex flex-wrap items-center gap-6">
                            {/* Tech Tags */}
                            <div className="flex gap-2">
                                {item.tech.map((t, i) => (
                                    <span key={i} className="px-3 py-1 border border-white/10 rounded-full text-[10px] uppercase font-inter tracking-wider text-zinc-500">
                                        {t}
                                    </span>
                                ))}
                            </div>

                            {/* Optional Project Link */}
                            {item.link && (
                                <a 
                                    href={item.link.url} 
                                    target="_blank" 
                                    rel="noreferrer"
                                    className="flex items-center gap-2 text-sm font-inter text-white hover:text-cyan-400 transition-colors underline decoration-zinc-700 underline-offset-4"
                                >
                                    <ExternalLink size={14} />
                                    {item.link.label}
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>
          ))}
          {/* Bottom Border */}
          <div className="w-full h-[1px] bg-white/10"></div>
      </div>

    </div>
  );
};

export default Experience;