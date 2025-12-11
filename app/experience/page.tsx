"use client"
import React, { useRef, useEffect } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ArrowUpRight, Calendar, ExternalLink, ArrowLeft, Menu, Code2 } from 'lucide-react';

const EXPERIENCE_DATA = [
  {
    id: "01",
    company: "ANCOVA SOFTWARE",
    role: "Frontend Developer",
    date: "May 2023 - Sept 2024",
    type: "Full Time",
    description: "Spearheaded the frontend architecture for scalable web applications. Successfully shipped and contributed to over 12+ projects including SaaS platforms and E-commerce solutions. Focused heavily on performance optimization, reducing load times by 40% and improving SEO scores significantly.",
    tech: ["React.js", "Redux Toolkit", "Next.js", "Performance Optimization"],
    link: null
  },
  {
    id: "02",
    company: "ANCOVA SOFTWARE",
    role: "Intern Frontend Developer",
    date: "May 2023 - Aug 2023",
    type: "Internship",
    description: "Kickstarted the journey by building the official website for the Department of Dance, University of Dhaka. Learned core Next.js patterns, responsive design principles, and collaborative Git workflows.",
    tech: ["Next.js", "Tailwind CSS", "Framer Motion", "UI/UX"],
    link: { label: "dance.du.ac.bd", url: "https://dance.du.ac.bd" }
  }
];

const ExperiencePage = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // --- ENTRANCE ANIMATION ---
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Nav Fade In
      gsap.from(".nav-element", { y: -20, opacity: 0, duration: 1, ease: "power3.out" });

      // Title Slide
      gsap.from(".exp-title", { x: -50, opacity: 0, duration: 1, delay: 0.3, ease: "power3.out" });

      // Cards Stagger Up
      gsap.from(".exp-card", { 
        y: 50, 
        opacity: 0, 
        stagger: 0.2, 
        duration: 1, 
        delay: 0.5,
        ease: "power3.out"
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full min-h-screen bg-[#050505] text-[#ededed] font-sans selection:bg-cyan-400 selection:text-black">
      
      {/* FONTS */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@300;400;500;600&display=swap');
        .font-anton { fontFamily: 'Anton', sans-serif; }
        .font-inter { fontFamily: 'Inter', sans-serif; }
      `}</style>

      {/* NOISE OVERLAY */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04] z-50 fixed mix-blend-overlay" style={{backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`}}></div>

      {/* === TOP NAVIGATION BAR === */}
      <nav className="fixed top-0 left-0 w-full z-[100] flex justify-between items-center px-8 md:px-12 py-6 mix-blend-difference text-white">
          
          {/* Back Button */}
          <Link href="/" className="nav-element group flex items-center gap-3 text-sm font-inter uppercase tracking-widest hover:text-cyan-400 transition-colors">
              <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                  <ArrowLeft size={14} />
              </div>
              <span className="hidden md:inline">Back to Home</span>
          </Link>

          {/* Logo / Context */}
          <div className="nav-element font-anton text-xl tracking-wide uppercase">
              Career History
          </div>

          {/* Menu Trigger */}
          <button className="nav-element group flex items-center gap-3 text-sm font-inter uppercase tracking-widest hover:text-cyan-400 transition-colors">
              <span className="hidden md:inline">Menu</span>
              <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                  <Menu size={14} />
              </div>
          </button>
      </nav>


      {/* === MAIN CONTENT === */}
      <main className="pt-32 pb-20 px-8 md:px-12 w-full max-w-[1400px] mx-auto flex flex-col md:flex-row gap-12 md:gap-24 relative z-10">
        
        {/* LEFT COLUMN: TITLE (Sticky) */}
        <div className="w-full md:w-[30%]">
            <div className="md:sticky md:top-32">
                <h1 className="exp-title font-anton text-7xl md:text-8xl leading-[0.85] text-zinc-800 uppercase mb-6">
                    WORK <br/> <span className="text-white">SPACE</span>
                </h1>
                <p className="exp-title font-inter text-sm text-zinc-400 max-w-xs leading-relaxed">
                    A timeline of professional milestones, contributions, and technical growth.
                </p>
            </div>
        </div>

        {/* RIGHT COLUMN: LIST */}
        <div className="w-full md:w-[70%] flex flex-col gap-16 md:gap-20">
            {EXPERIENCE_DATA.map((item, index) => (
                <div key={index} className="exp-card group relative">
                    
                    {/* Decorative Left Border Line */}
                    <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-white/10 group-hover:bg-cyan-400 transition-colors duration-500"></div>

                    <div className="pl-8 md:pl-12 py-2">
                        {/* HEADER: DATE & TYPE */}
                        <div className="flex items-center gap-4 mb-4 font-inter text-xs uppercase tracking-widest text-cyan-400">
                            <span className="flex items-center gap-2"><Calendar size={12}/> {item.date}</span>
                            <span className="w-1 h-1 bg-zinc-600 rounded-full"></span>
                            <span>{item.type}</span>
                        </div>

                        {/* COMPANY & ROLE */}
                        <h2 className="font-anton text-5xl md:text-6xl text-white mb-2 group-hover:text-cyan-400 transition-colors duration-300">
                            {item.company}
                        </h2>
                        <h3 className="font-inter text-lg text-zinc-400 font-medium mb-6">
                            {item.role}
                        </h3>

                        {/* DESCRIPTION (Directly Visible) */}
                        <p className="font-inter text-zinc-300 leading-relaxed max-w-2xl mb-8">
                            {item.description}
                        </p>

                        {/* FOOTER: STACK & LINKS */}
                        <div className="flex flex-wrap items-center justify-between gap-6 border-t border-white/10 pt-6">
                            
                            {/* Tech Stack */}
                            <div className="flex flex-wrap gap-2">
                                {item.tech.map((t, i) => (
                                    <span key={i} className="px-3 py-1 bg-white/5 border border-white/10 rounded text-[11px] font-inter uppercase tracking-wide text-zinc-400 group-hover:text-white transition-colors">
                                        {t}
                                    </span>
                                ))}
                            </div>

                            {/* Link Button */}
                            {item.link && (
                                <a 
                                    href={item.link.url} 
                                    target="_blank" 
                                    className="flex items-center gap-2 font-inter text-sm font-bold uppercase tracking-wide text-white hover:text-cyan-400 transition-colors group/link"
                                >
                                    <span>Visit Site</span>
                                    <ArrowUpRight size={16} className="group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>

      </main>
    </div>
  );
};

export default ExperiencePage;