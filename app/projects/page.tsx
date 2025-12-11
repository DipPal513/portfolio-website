"use client";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import React, { useCallback, useEffect, useRef } from "react";
import {projectData} from "@/public/projectdata";
// --- YOUR DATA ---


// --- COMPONENT: PROJECT CARD ---
const ProjectCard = ({
  project,
  index,
}: {
  project: any;
  index: number;
}) => {
  // Format the index (0 -> 01, 1 -> 02)
  const displayId = (index + 1).toString().padStart(2, "0");

  return (
    <div
      className="relative flex-shrink-0 w-[85vw] md:w-[600px] h-[60vh] md:h-[70vh] group cursor-pointer"
    >
      {/* Number Background */}
      <div className="absolute -top-16 -left-8 text-[120px] md:text-[200px] font-black text-white/5 font-anton z-0 transition-transform duration-500 group-hover:translate-x-4 select-none">
        {displayId}
      </div>

      {/* Main Card Container */}
      <Link href={`projects/${project.id}`}  className="relative block w-full h-full bg-[#111] overflow-hidden border border-white/10 transition-all duration-500 ease-out group-hover:scale-[1.02] group-hover:border-white/30">
        {/* Media Layer */}
        <div className="absolute inset-0 w-full h-full bg-[#1a1a1a]">
          {project.thumbnail ? (
             <img
             src={project.thumbnail}
             alt={project.name}
             className="w-full h-full object-cover opacity-60 group-hover:opacity-0 transition-opacity duration-500"
           />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-white/10 text-4xl font-anton uppercase opacity-60 group-hover:opacity-0 transition-opacity duration-500">
               No Image
            </div>
          )}
         
          {/* Gradient Overlay for Hover State */}
          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-cyan-900/40 to-purple-900/40" />
        </div>

        {/* Content Overlay */}
        <div className="absolute inset-0 p-8 flex flex-col justify-end z-20 pointer-events-none">
          <div className="transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500 ease-out">
            <div className="flex justify-between items-end mb-4">
              <div className="max-w-[80%]">
                <div className="text-cyan-400 text-xs font-bold uppercase tracking-[0.2em] mb-2">
                  {project.category}
                </div>
                <h2 className="text-4xl md:text-5xl font-anton text-white uppercase leading-none tracking-wide line-clamp-2">
                  {project.name}
                </h2>
              </div>
              <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center bg-white/10 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 pointer-events-auto hover:bg-white/20">
                <Link href={project.liveLink || "#"} target="_blank">
                  <ArrowUpRight className="text-white" />
                </Link>
              </div>
            </div>
            
            <div className="h-[1px] w-full bg-white/20 mb-4 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 delay-75" />
            
            <div className="flex flex-wrap gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-150">
              {project.technologies?.slice(0, 4).map((tech: string) => (
                <span
                  key={tech}
                  className="text-xs text-white/60 uppercase tracking-widest border border-white/10 px-2 py-1 rounded"
                >
                  {tech}
                </span>
              ))}
              {project.technologies?.length > 4 && (
                 <span className="text-xs text-white/60 uppercase tracking-widest border border-white/10 px-2 py-1 rounded">
                 +{project.technologies.length - 4}
               </span>
              )}
            </div>
          </div>
        </div>
      </Link>
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

  // Touch/Drag Handlers
  const handlePointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    startX.current = e.clientX + scrollPos.current; 
    // Ensure text doesn't get selected while dragging
    if(scrollContainerRef.current) {
        scrollContainerRef.current.style.cursor = 'grabbing';
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    e.preventDefault();
    targetScrollPos.current = startX.current - e.clientX;
    targetScrollPos.current = Math.max(
      0,
      Math.min(targetScrollPos.current, maxScroll.current)
    );
  };

  const handlePointerUp = () => {
    isDragging.current = false;
    if(scrollContainerRef.current) {
        scrollContainerRef.current.style.cursor = 'grab';
    }
  };

  return (
    <div
      className="fixed inset-0 bg-[#050505] text-white overflow-hidden font-sans selection:bg-cyan-500/30"
      onWheel={handleWheel}
    >
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@300;400;600&display=swap");
        .font-anton {
          font-family: "Anton", sans-serif;
        }
        .font-inter {
          font-family: "Inter", sans-serif;
        }
      `}</style>

      {/* Background Grain */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

      {/* Header */}
      <div className="absolute top-0 left-0 w-full p-8 md:p-12 flex justify-between items-start z-40 pointer-events-none">
        <div>
          <h1 className="font-anton text-4xl uppercase leading-none">
            Dip
            <br />
            Pal
          </h1>
          <div className="text-xs uppercase tracking-widest mt-2 text-white/50">
            Full Stack Developer
          </div>
        </div>
        <div className="text-right hidden md:block">
          <div className="text-xs uppercase tracking-widest text-white/50">
            Projects
          </div>
          <div className="font-bold">{projectData.length} Selected Works</div>
        </div>
      </div>

      {/* Scroll Container */}
      <div
        className="absolute top-0 left-0 h-full flex items-center pl-[15vw] pr-[15vw] gap-12 md:gap-24 cursor-grab will-change-transform"
        ref={scrollContainerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
      >
        {/* Intro Text Card */}
        <div className="flex-shrink-0 w-[300px] flex flex-col justify-center select-none">
          <div className="h-[1px] w-12 bg-cyan-500 mb-6"></div>
          <p className="text-xl md:text-3xl font-light leading-relaxed text-white/80">
            Building digital <br />
            <span className="text-white font-bold">solutions</span> with{" "}
            <br />
            Next.js & MERN.
          </p>
          <div className="mt-8 flex items-center gap-2 text-xs uppercase tracking-widest text-white/40">
            <ArrowUpRight size={14} /> Drag to explore
          </div>
        </div>

        {projectData.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={index}
          />
        ))}

        {/* End Spacer */}
        <div className="flex-shrink-0 w-[20vw]"></div>
      </div>

      {/* Progress Bar (Bottom) */}
      <div className="absolute bottom-8 left-8 right-8 h-[1px] bg-white/10 z-40">
        <div className="h-full bg-cyan-500 w-[25%]"></div>
      </div>
    </div>
  );
};

export default HorizontalGallery;