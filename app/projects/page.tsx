"use client";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import React, { useCallback, useEffect, useRef, useState } from "react";

// --- DATA ---
const PROJECTS = [
  {
    id: "1",
    title: "DUITS",
    category: "Community Platform",
    image: "https://i.ibb.co.com/Q37cpG0G/duits.png",
    year: "2025",
    role: "Lead Developer",
    client: "Dhaka University",
    link: "https://duitsbd.org", // <--- ADD THIS
    stack: ["Next.js", "Express.js", "Tailwind CSS", "MongoDB"],
    desc: "A comprehensive digital ecosystem for Dhaka University's largest IT community. We re-engineered the platform to streamline event registration, member management, and tech blogging.",
    gallery: [
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2670&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2670&auto=format&fit=crop",
    ],
  },
  {
    id: "02",
    title: "SYNTH WAVE",
    category: "Audio Platform",
    video: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjEx.../giphy.mp4",
    image:
      "https://images.unsplash.com/photo-1614624532983-4ce03382d63d?q=80&w=2662&auto=format&fit=crop",
    year: "2023",
    stack: ["Next.js", "WebAudio API", "Supabase"],
    desc: "AI-powered music generation tool for creators.",
  },
  {
    id: "03",
    title: "NOCTURNE",
    category: "Fashion E-com",
    video: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjEx.../giphy.mp4",
    image:
      "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=2574&auto=format&fit=crop",
    year: "2023",
    stack: ["Shopify", "Liquid", "GSAP"],
    desc: "Dark-mode brutalist commerce experience.",
  },
  {
    id: "04",
    title: "QUANTUM",
    category: "Fintech Dashboard",
    video: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjEx.../giphy.mp4",
    image:
      "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2664&auto=format&fit=crop",
    year: "2022",
    stack: ["D3.js", "React", "Python"],
    desc: "Real-time algorithmic trading visualizer.",
  },
];

// --- COMPONENT: PROJECT CARD ---
const ProjectCard = ({
  project,
  onClick,
}: {
  project: any;
  onClick: () => void;
}) => {
  return (
    <div
      onClick={onClick}
      className="relative flex-shrink-0 w-[85vw] md:w-[600px] h-[60vh] md:h-[70vh] group cursor-pointer"
    >
      {/* Number Background */}
      <div className="absolute -top-16 -left-8 text-[120px] md:text-[200px] font-black text-white/5 font-anton z-0 transition-transform duration-500 group-hover:translate-x-4">
        {project.id}
      </div>

      {/* Main Card Container */}
      <div className="relative w-full h-full bg-[#111] overflow-hidden border border-white/10 transition-all duration-500 ease-out group-hover:scale-[1.02] group-hover:border-white/30">
        {/* Media Layer */}
        <div className="absolute inset-0 w-full h-full">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover opacity-60 group-hover:opacity-0 transition-opacity duration-500"
          />
          {/* Fake Video for Demo (In real app, use <video loop muted autoPlay>) */}
          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-cyan-900/40 to-purple-900/40" />
        </div>

        {/* Content Overlay */}
        <div className="absolute inset-0 p-8 flex flex-col justify-end z-20">
          <div className="transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500 ease-out">
            <div className="flex justify-between items-end mb-4">
              <div>
                <div className="text-cyan-400 text-xs font-bold uppercase tracking-[0.2em] mb-2">
                  {project.category}
                </div>
                <h2 className="text-5xl md:text-7xl font-anton text-white uppercase leading-none tracking-wide">
                  {project.title}
                </h2>
              </div>
              <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center bg-white/10 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                <Link href={`/projects/${project.id}`}><ArrowUpRight className="text-white" /></Link>
              </div>
            </div>
            <div className="h-[1px] w-full bg-white/20 mb-4 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 delay-75" />
            <div className="flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-150">
              {project.stack.map((tech: string) => (
                <span
                  key={tech}
                  className="text-xs text-white/60 uppercase tracking-widest"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- MAIN PAGE ---
const HorizontalGallery = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Physics State
  const scrollPos = useRef(0);
  const targetScrollPos = useRef(0);
  const maxScroll = useRef(0);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const skew = useRef(0);

  // Animation Loop
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const updateMaxScroll = () => {
      maxScroll.current = container.scrollWidth - window.innerWidth;
    };

    updateMaxScroll();
    window.addEventListener("resize", updateMaxScroll);

    const animate = () => {
      // Linear Interpolation (Lerp) for smooth scrolling
      scrollPos.current += (targetScrollPos.current - scrollPos.current) * 0.08;

      // Calculate Skew based on speed (velocity)
      const velocity = targetScrollPos.current - scrollPos.current;
      skew.current += (velocity * 0.05 - skew.current) * 0.1; // Smooth skew

      // Apply Transform
      if (container) {
        container.style.transform = `translateX(-${
          scrollPos.current
        }px) skewX(${Math.max(Math.min(skew.current, 10), -10)}deg)`;
      }

      requestAnimationFrame(animate);
    };
    const animId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", updateMaxScroll);
    };
  }, []);

  // Mouse Wheel Handler
  const handleWheel = useCallback((e: React.WheelEvent) => {
    targetScrollPos.current += e.deltaY;
    // Clamp
    targetScrollPos.current = Math.max(
      0,
      Math.min(targetScrollPos.current, maxScroll.current)
    );
  }, []);

  // Touch/Drag Handlers (Simplified)
  const handlePointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    startX.current = e.clientX + scrollPos.current; // Offset by current scroll
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    targetScrollPos.current = startX.current - e.clientX;
    targetScrollPos.current = Math.max(
      0,
      Math.min(targetScrollPos.current, maxScroll.current)
    );
  };

  const handlePointerUp = () => {
    isDragging.current = false;
  };

  return (
    <div
      className="fixed inset-0 bg-[#050505] text-white overflow-hidden font-sans selection:bg-cyan-500/30"
      onWheel={handleWheel}
    >
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@300;400;600&display=swap");
        .font-anton {
          fontfamily: "Anton", sans-serif;
        }
        .font-inter {
          fontfamily: "Inter", sans-serif;
        }
        .ease-expo {
          transition-timing-function: cubic-bezier(0.19, 1, 0.22, 1);
        }
      `}</style>

      {/* Background Grain */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

      {/* Header */}
      <div className="absolute top-0 left-0 w-full p-8 md:p-12 flex justify-between items-start z-40 pointer-events-none">
        <div>
          <h1 className="font-anton text-4xl uppercase leading-none">
            John
            <br />
            Doe
          </h1>
          <div className="text-xs uppercase tracking-widest mt-2 text-white/50">
            Full Stack Engineer
          </div>
        </div>
        <div className="text-right hidden md:block">
          <div className="text-xs uppercase tracking-widest text-white/50">
            Location
          </div>
          <div className="font-bold">San Francisco, CA</div>
        </div>
      </div>

      {/* Scroll Container */}
      <div
        className="absolute top-0 left-0 h-full flex items-center pl-[15vw] pr-[15vw] gap-12 md:gap-24 cursor-grab active:cursor-grabbing will-change-transform"
        ref={scrollContainerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
      >
        {/* Intro Text Card */}
        <div className="flex-shrink-0 w-[300px] flex flex-col justify-center">
          <div className="h-[1px] w-12 bg-cyan-500 mb-6"></div>
          <p className="text-xl md:text-3xl font-light leading-relaxed text-white/80">
            Crafting digital <br />
            <span className="text-white font-bold">experiences</span> that{" "}
            <br />
            defy expectations.
          </p>
          <div className="mt-8 flex items-center gap-2 text-xs uppercase tracking-widest text-white/40">
            <ArrowUpRight size={14} /> Drag to explore
          </div>
        </div>

        {PROJECTS.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
           
          />
        ))}

        {/* End Spacer */}
        <div className="flex-shrink-0 w-[20vw]"></div>
      </div>

      {/* Progress Bar (Bottom) */}
      <div className="absolute bottom-8 left-8 right-8 h-[1px] bg-white/10 z-40">
        {/* You can map scrollPos to width here for a real progress bar */}
        <div className="h-full bg-cyan-500 w-[25%]"></div>
      </div>
    </div>
  );
};

export default HorizontalGallery;
