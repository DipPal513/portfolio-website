"use client";
import {
  AlertCircle,
  ArrowLeft,
  ArrowUpRight,
  Code2,
  Layers,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
// Ensure this path is correct
import { projectData } from "@/public/projectdata";

export default function ProjectDetails() {
  const params = useParams();
  const project = projectData.find((p) => p.id === Number(params.id));
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="bg-[#050505] min-h-screen w-full" />;

  if (!project) {
    return (
      <div className="h-screen w-full bg-[#050505] flex flex-col items-center justify-center text-white">
        <h1 className="text-6xl font-anton mb-4 text-white/10">404</h1>
        <p className="text-white/50 mb-8 font-inter uppercase tracking-widest text-xs">
          Project not found
        </p>
        <Link
          href="/"
          className="px-8 py-4 border border-white/20 hover:bg-white hover:text-black transition-all uppercase text-xs font-bold tracking-widest"
        >
          Return Home
        </Link>
      </div>
    );
  }

  const currentIndex = projectData.findIndex((p) => p.id === project.id);
  const nextProject = projectData[(currentIndex + 1) % projectData.length];

  return (
    <div className="bg-[#050505] min-h-screen text-white font-sans selection:bg-cyan-500/30 pb-20">
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@300;400;500;600&display=swap");
        .font-anton {
          fontfamily: "Anton", sans-serif;
        }
        .font-inter {
          fontfamily: "Inter", sans-serif;
        }

        .reveal {
          animation: reveal 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0;
          transform: translateY(20px);
        }
        @keyframes reveal {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      {/* Noise Texture */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] z-0"></div>

      {/* --- NAVIGATION --- */}
      <nav className="fixed top-0 w-full px-6 py-6 md:px-12 md:py-8 flex justify-between items-center z-50 mix-blend-difference">
        <Link href="/" className="flex items-center gap-4 group">
          <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-300">
            <ArrowLeft size={16} />
          </div>
          <div className="hidden md:block overflow-hidden h-4">
            <span className="block text-xs font-bold uppercase tracking-widest transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
              Back to Gallery
            </span>
          </div>
        </Link>
        <div className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-white/40 border border-white/10 px-4 py-2 rounded-full backdrop-blur-md">
          {project.category}
        </div>
      </nav>

      <main className="relative z-10 pt-32 md:pt-48 px-4 md:px-12 max-w-[1800px] mx-auto">
        {/* --- HEADER SECTION --- */}
        <header
          className="mb-20 md:mb-32 reveal"
          style={{ animationDelay: "0.1s" }}
        >
          <div className="border-b border-white/10 pb-8 md:pb-12 mb-8 md:mb-12">
            <h1 className="text-[12vw] md:text-[8vw] leading-[0.85] font-anton text-white uppercase tracking-tight">
              {project.name}
            </h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 font-inter">
            <div className="md:col-span-8">
              <p className="text-xl md:text-3xl font-light leading-relaxed text-white/80 max-w-4xl">
                {project.description}
              </p>
            </div>

            {/* Quick Actions (Mobile Only) */}
            <div className="md:hidden flex flex-wrap gap-4 mt-4">
              {project.liveLink && (
                <Link
                  href={project.liveLink}
                  target="_blank"
                  className="flex-1 bg-white text-black text-center py-3 text-xs font-bold uppercase tracking-widest"
                >
                  Live Site
                </Link>
              )}
            </div>
          </div>
        </header>

        {/* --- HERO IMAGE (Full Context) --- */}
        <section
          className="mb-24 md:mb-40 w-full reveal"
          style={{ animationDelay: "0.2s" }}
        >
          <div className="relative w-full border border-white/10 bg-[#111] overflow-hidden group">
            {project.thumbnail ? (
              <img
                src={project.thumbnail}
                alt="Hero View"
                className="w-full h-auto object-contain"
              />
            ) : (
              <div className="h-[50vh] flex items-center justify-center text-white/20 font-anton uppercase text-4xl">
                No Preview Available
              </div>
            )}
          </div>
        </section>

        {/* --- DETAILS GRID --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-24 mb-32 relative">
          {/* LEFT COLUMN: Narrative & Challenges */}
          <div
            className="lg:col-span-8 space-y-24 reveal"
            style={{ animationDelay: "0.3s" }}
          >
            {/* Challenges */}
            {project.challenges && (
              <section>
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-2 bg-white/5 rounded-full text-cyan-400">
                    <AlertCircle size={20} />
                  </div>
                  <h3 className="text-2xl font-anton uppercase tracking-wide">
                    The Challenge
                  </h3>
                </div>
                <div className="pl-4 border-l border-white/20 ml-5">
                  <p className="text-lg text-white/70 leading-relaxed font-inter whitespace-pre-line">
                    {project.challenges}
                  </p>
                </div>
              </section>
            )}

            {/* Gallery Loop (Full Height/Width Display) */}
            {project.images && project.images.length > 0 && (
              <section className="space-y-16">
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-2 bg-white/5 rounded-full text-purple-400">
                    <Layers size={20} />
                  </div>
                  <h3 className="text-2xl font-anton uppercase tracking-wide">
                    Visuals
                  </h3>
                </div>

                <div className="space-y-8">
                  {project.images.map((img: string, i: number) => {
                    if (!img) return null;
                    return (
                      <div key={i} className="group relative">
                        {/* Image Wrapper */}
                        <div className="relative w-full bg-[#0a0a0a] border border-white/5 overflow-hidden">
                          <img
                            src={img}
                            alt={`Screen ${i}`}
                            className="w-full h-auto block"
                          />
                        </div>
                        <div className="mt-2 text-[10px] text-white/30 uppercase tracking-widest text-right">
                          Fig. 0{i + 1}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            )}
          </div>

          {/* RIGHT COLUMN: Sticky Info (Sidebar) */}
          <aside className="lg:col-span-4 relative">
            <div
              className="sticky top-32 space-y-12 reveal"
              style={{ animationDelay: "0.4s" }}
            >
              {/* Project Info Table */}
              <div className="border border-white/10 bg-white/[0.02] backdrop-blur-sm p-8">
                <h3 className="text-xs font-bold uppercase tracking-widest text-white/50 mb-8 pb-4 border-b border-white/10">
                  Project Data
                </h3>

                <div className="space-y-6">
                  <div className="flex justify-between items-start">
                    <span className="text-sm text-white/40 font-inter">
                      Type
                    </span>
                    <span className="text-sm text-white font-medium capitalize text-right">
                      {project.category}
                    </span>
                  </div>
                  <div className="flex justify-between items-start">
                    <span className="text-sm text-white/40 font-inter">ID</span>
                    <span className="text-sm text-white font-medium">
                      #{project.id}
                    </span>
                  </div>
                </div>

                {/* Tech Stack */}
                <div className="mt-8 pt-8 border-t border-white/10">
                  <span className="text-sm text-white/40 font-inter block mb-4">
                    Technology
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies?.map((tech: string) => (
                      <span
                        key={tech}
                        className="px-3 py-1.5 border border-white/10 text-[10px] uppercase tracking-widest text-white/70 hover:bg-white/10 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4">
                {project.liveLink && (
                  <Link
                    href={project.liveLink}
                    target="_blank"
                    className="w-full group relative flex items-center justify-between bg-white text-black px-6 py-5 overflow-hidden transition-all hover:bg-cyan-400"
                  >
                    <span className="font-bold uppercase tracking-widest text-xs z-10">
                      Visit Live Site
                    </span>
                    <ArrowUpRight
                      className="z-10 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
                      size={20}
                    />
                  </Link>
                )}

                <div className="grid grid-cols-2 gap-4">
                  {project.sourceCode?.frontend ? (
                    <Link
                      href={project.sourceCode.frontend}
                      target="_blank"
                      className="flex flex-col items-center justify-center gap-2 border border-white/10 py-6 hover:bg-white/5 transition-colors group"
                    >
                      <Code2
                        className="text-white/50 group-hover:text-white transition-colors"
                        size={24}
                      />
                      <span className="text-[10px] uppercase tracking-widest text-white/50 group-hover:text-white">
                        Frontend
                      </span>
                    </Link>
                  ) : (
                    <div className="flex flex-col items-center justify-center gap-2 border border-white/5 py-6 opacity-50 cursor-not-allowed">
                      <Code2 className="text-white/20" size={24} />
                      <span className="text-[10px] uppercase tracking-widest text-white/20">
                        Private
                      </span>
                    </div>
                  )}

                  {project.sourceCode?.backend ? (
                    <Link
                      href={project.sourceCode.backend}
                      target="_blank"
                      className="flex flex-col items-center justify-center gap-2 border border-white/10 py-6 hover:bg-white/5 transition-colors group"
                    >
                      <Layers
                        className="text-white/50 group-hover:text-white transition-colors"
                        size={24}
                      />
                      <span className="text-[10px] uppercase tracking-widest text-white/50 group-hover:text-white">
                        Backend
                      </span>
                    </Link>
                  ) : (
                    <div className="flex flex-col items-center justify-center gap-2 border border-white/5 py-6 opacity-50 cursor-not-allowed">
                      <Layers className="text-white/20" size={24} />
                      <span className="text-[10px] uppercase tracking-widest text-white/20">
                        N/A
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* --- NEXT PROJECT FOOTER --- */}
      {nextProject && (
        <Link
          href={`/projects/${nextProject.id}`}
          className="block border-t border-white/10 group relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out z-0"></div>

          <div className="max-w-[1800px] mx-auto px-4 md:px-12 py-24 relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-white/40 group-hover:text-black/40 mb-4 block transition-colors">
                Next Case Study
              </span>
              <h2 className="text-[10vw] md:text-[6vw] leading-none font-anton uppercase text-white group-hover:text-black transition-colors">
                {nextProject.name}
              </h2>
            </div>
            <div className="mt-8 md:mt-0 w-16 h-16 rounded-full border border-white/20 group-hover:border-black/20 flex items-center justify-center transition-colors">
              <ArrowUpRight
                className="text-white group-hover:text-black transition-transform duration-300 group-hover:rotate-45"
                size={24}
              />
            </div>
          </div>
        </Link>
      )}
    </div>
  );
}
