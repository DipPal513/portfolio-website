"use client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown, ArrowLeft } from "lucide-react";
import Link from "next/link";
import React, { useLayoutEffect, useRef } from "react";
import {
  SiDocker,
  SiExpress,
  SiFigma,
  SiGit,
  SiGithub,
  SiJavascript,
  SiMongodb,
  SiMongoose,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiReact,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";

gsap.registerPlugin(ScrollTrigger);

// --- DATA ---
const SECTIONS = [
  {
    id: "frontend",
    title: "The Interface",
    subtitle: "Pixel-perfect interaction.",
    description:
      "I build reactive, accessible, and performant user interfaces that feel instantaneous.",
    color: "from-cyan-500 to-blue-600",
    bg: "bg-[#050505]",
    skills: [
      { icon: <SiReact />, size: 80, x: -10, y: -20, speed: 1.2 },
      { icon: <SiNextdotjs />, size: 100, x: 20, y: 10, speed: 0.8 },
      { icon: <SiTailwindcss />, size: 60, x: -30, y: 30, speed: 1.5 },
      { icon: <SiTypescript />, size: 70, x: 30, y: -30, speed: 1.1 },
      { icon: <SiJavascript />, size: 50, x: 0, y: 50, speed: 2 },
    ],
  },
  {
    id: "backend",
    title: "The Engine",
    subtitle: "Scalable logic layers.",
    description:
      "Designing robust APIs and data schemas that handle millions of requests without breaking a sweat.",
    color: "from-green-500 to-emerald-700",
    bg: "bg-[#080808]",
    skills: [
      { icon: <SiNodedotjs />, size: 90, x: -20, y: 0, speed: 1 },
      { icon: <SiPostgresql />, size: 80, x: 25, y: -20, speed: 1.3 },
      { icon: <SiMongoose />, size: 70, x: -10, y: 40, speed: 0.9 },
      { icon: <SiMongodb />, size: 60, x: 30, y: 30, speed: 1.6 },
      { icon: <SiExpress />, size: 50, x: -35, y: -35, speed: 2.2 },
    ],
  },
  {
    id: "infra",
    title: "The Architecture",
    subtitle: "Cloud native delivery.",
    description:
      "Orchestrating containerized environments and serverless functions for maximum uptime.",
    color: "from-orange-500 to-red-600",
    bg: "bg-[#0a0a0a]",
    skills: [
      { icon: <SiGit />, size: 90, x: 0, y: 0, speed: 1 },
      { icon: <SiDocker />, size: 80, x: -30, y: 20, speed: 1.4 },
      { icon: <SiGithub />, size: 60, x: 30, y: -20, speed: 1.2 },
      { icon: <SiFigma />, size: 70, x: -20, y: -40, speed: 0.8 },
    ],
  },
];

// --- COMPONENT: FLOATING ICONS (PARALLAX) ---
const FloatingIcons = ({ skills }: { skills: any[] }) => {
  const iconsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Mouse Parallax Effect
      const handleMouseMove = (e: MouseEvent) => {
        if (!iconsRef.current) return;
        const { clientX, clientY } = e;
        const xPos = (clientX / window.innerWidth - 0.5) * 2; // -1 to 1
        const yPos = (clientY / window.innerHeight - 0.5) * 2;

        skills.forEach((_, i) => {
          const icon = iconsRef.current?.children[i];
          const speed = skills[i].speed;
          if (icon) {
            gsap.to(icon, {
              x: xPos * 50 * speed,
              y: yPos * 50 * speed,
              duration: 1,
              ease: "power2.out",
            });
          }
        });
      };

      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }, iconsRef);
    return () => ctx.revert();
  }, [skills]);

  return (
    <div
      ref={iconsRef}
      className="absolute inset-0 pointer-events-none overflow-hidden"
    >
      {skills.map((skill, i) => (
        <div
          key={i}
          className="absolute flex items-center justify-center text-white/10"
          style={{
            left: `calc(50% + ${skill.x}%)`,
            top: `calc(50% + ${skill.y}%)`,
            fontSize: skill.size,
          }}
        >
          {skill.icon}
        </div>
      ))}
    </div>
  );
};

// --- COMPONENT: SINGLE CARD SECTION ---
const StackCard = ({
  data,
  index,
}: {
  data: (typeof SECTIONS)[0];
  index: number;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Animate Text on Scroll Entry
      gsap.from(".anim-text", {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top center",
        },
      });

      // Animate Gradient Orb
      gsap.to(".glow-orb", {
        scale: 1.2,
        opacity: 0.6,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, cardRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={cardRef}
      className={`sticky top-0 w-full h-screen flex items-center justify-center overflow-hidden border-t border-white/5 shadow-2xl ${data.bg}`}
    >
      {/* Background Noise */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

      {/* Glowing Orb */}
      <div
        className={`glow-orb absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r ${data.color} rounded-full blur-[120px] opacity-20 pointer-events-none`}
      ></div>

      {/* Floating Icons Background */}
      <FloatingIcons skills={data.skills} parentRef={cardRef} />

      {/* Content Container (Glass Card) */}
      <div className="relative z-10 w-full max-w-5xl px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left: Typography */}
        <div>
          <div className="anim-text flex items-center gap-4 mb-6">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/40">
              0{index + 1} — {data.id}
            </span>
            <div className="h-px w-12 bg-white/20"></div>
          </div>
          <h2 className="anim-text text-6xl md:text-8xl font-bold tracking-tighter text-white mb-6 leading-[0.9]">
            {data.title}
          </h2>
          <h3 className="anim-text text-2xl md:text-3xl text-white/60 font-medium mb-8">
            {data.subtitle}
          </h3>
          <p className="anim-text text-lg text-white/40 leading-relaxed max-w-md">
            {data.description}
          </p>
        </div>

        {/* Right: Visual Stack (The "Actual" Skills) */}
        <div className="anim-text relative">
          <div className="grid grid-cols-2 gap-4">
            {data.skills.map((skill, i) => (
              <div
                key={i}
                className="group p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 hover:scale-105 transition-all duration-300 flex flex-col items-center justify-center gap-4 aspect-square"
              >
                <div className="text-4xl text-white group-hover:text-white/80 transition-colors">
                  {skill.icon}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const StickyStackPage = () => {
  return (
    <div className="bg-black text-white selection:bg-white/20">
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500;600;800&display=swap");
        body {
          font-family: "Inter Tight", sans-serif;
        }
      `}</style>
      <nav className="fixed top-0 left-0 w-full z-[100] flex justify-between items-center px-8 md:px-12 py-6 mix-blend-difference text-white">
        <Link
          href="/"
          className="group flex items-center gap-3 text-sm font-inter uppercase tracking-widest hover:text-cyan-400 transition-colors"
        >
          <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
            <ArrowLeft size={14} />
          </div>
          <span className="hidden md:inline">Home</span>
        </Link>
        <div className="font-anton text-xl tracking-wide uppercase">
          About Me
        </div>
        <button className="group flex items-center gap-3 text-sm font-inter uppercase tracking-widest hover:text-cyan-400 transition-colors">
          <span className="hidden md:inline">SKIlls</span>
        </button>
      </nav>
      {/* --- HERO SECTION (Scroll Prompt) --- */}
      <div className="h-[70vh] flex flex-col items-center justify-center relative z-0">
        <div className="text-center">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent">
            Technical
            <br />
            Proficiency
          </h1>
          <p className="text-white/40 uppercase tracking-widest text-xs">
            Scroll to Explore
          </p>
        </div>
        <div className="absolute bottom-12 animate-bounce opacity-50">
          <ArrowDown />
        </div>
      </div>

      {/* --- STICKY SECTIONS --- */}
      <div className="relative z-10">
        {SECTIONS.map((section, idx) => (
          <StackCard key={section.id} data={section} index={idx} />
        ))}
      </div>

      {/* --- FOOTER --- */}
      <div className="h-[50vh] flex items-center justify-center bg-white text-black relative z-20">
        <div className="text-center">
          <h2 className="text-4xl font-bold tracking-tight mb-4">
            Ready to collaborate?
          </h2>
          <button className="px-8 py-4 bg-black text-white rounded-full font-bold text-lg hover:scale-105 transition-transform">
            Get in Touch
          </button>
        </div>
      </div>
    </div>
  );
};

export default StickyStackPage;