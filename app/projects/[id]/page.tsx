"use client"
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft, ArrowUpRight, Minus } from 'lucide-react';

// --- DATA (Must match your Home Page IDs exactly) ---
const PROJECTS = [
    {
        id: "1",
        title: "VELOCITY",
        category: "Automotive",
        image: "https://i.ibb.co.com/Q37cpG0G/duits.png",
        year: "2024",
        role: "Lead Engineer",
        client: "Porsche Design",
        stack: ["React", "Three.js", "WebGL", "GSAP"],
        desc: "Velocity redefines the digital showroom experience. We utilized WebGL shaders to replicate automotive paint physics and ray-tracing effects directly in the browser. The goal was to build a configurator that feels less like a tool and more like a cinematic video game.",
        gallery: [
            "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2670&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=2583&auto=format&fit=crop"
        ]
    },
    {
        id: "02",
        title: "SYNTH WAVE",
        category: "Audio Platform",
        image: "https://images.unsplash.com/photo-1614624532983-4ce03382d63d?q=80&w=2662&auto=format&fit=crop",
        year: "2023",
        role: "Full Stack",
        client: "Sony Music",
        stack: ["Next.js", "WebAudio API", "Supabase"],
        desc: "Bridging the gap between complex music theory and intuitive interface design. Using the WebAudio API, we built a low-latency synthesizer that runs entirely client-side, syncing with a cloud-based neural network for melody generation.",
        gallery: [
            "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=2670&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=2670&auto=format&fit=crop"
        ]
    },
    {
        id: "03",
        title: "NOCTURNE",
        category: "Fashion E-com",
        image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=2574&auto=format&fit=crop",
        year: "2023",
        role: "Frontend",
        client: "Balenciaga",
        stack: ["Shopify", "Liquid", "GSAP"],
        desc: "Nocturne challenges standard e-commerce conventions with a navigation system based on fluid dynamics. The shopping experience feels like exploring an underground art gallery rather than a catalog.",
        gallery: [
             "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=2576&auto=format&fit=crop",
             "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2670&auto=format&fit=crop"
        ]
    },
    {
        id: "04",
        title: "QUANTUM",
        category: "Fintech Dashboard",
        image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2664&auto=format&fit=crop",
        year: "2022",
        role: "Data Viz",
        client: "Bloomberg",
        stack: ["D3.js", "React", "Python"],
        desc: "Processing over 50,000 data points per second, Quantum renders complex financial datasets into digestible, interactive heatmaps. The challenge was maintaining 60fps performance while handling live WebSocket streams.",
        gallery: [
            "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1611974765270-ca1258634369?q=80&w=2664&auto=format&fit=crop"
        ]
    }
];

export default function ProjectDetails() {
    const params = useParams();
    // Use simple lookup instead of useEffect to prevent "flash" redirects
    const project = PROJECTS.find(p => p.id === params.id);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // 1. Loading State (Prevents crashing if data isn't ready)
    if (!mounted) return <div className="bg-[#050505] min-h-screen w-full" />;

    // 2. Error State (If ID is wrong, show this instead of redirecting)
    if (!project) {
        return (
            <div className="h-screen w-full bg-[#050505] flex flex-col items-center justify-center text-white">
                <h1 className="text-4xl font-anton mb-4">404</h1>
                <p className="text-white/50 mb-8">Project not found</p>
                <Link href="/" className="px-6 py-3 border border-white/20 hover:bg-white hover:text-black transition-colors uppercase text-xs tracking-widest">
                    Back Home
                </Link>
            </div>
        );
    }

    const currentIndex = PROJECTS.findIndex(p => p.id === project.id);
    const nextProject = PROJECTS[(currentIndex + 1) % PROJECTS.length];

    return (
        <div className="bg-[#050505] min-h-screen text-white font-sans selection:bg-cyan-500/30">
            <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@300;400;600&display=swap');
                .font-anton { fontFamily: 'Anton', sans-serif; }
                .font-inter { fontFamily: 'Inter', sans-serif; }
                
                /* Smooth reveal animation */
                @keyframes reveal-up {
                    from { transform: translateY(100px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
                .animate-reveal { animation: reveal-up 1s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
                .delay-100 { animation-delay: 0.1s; }
                .delay-200 { animation-delay: 0.2s; }
                .delay-300 { animation-delay: 0.3s; }
            `}</style>

            {/* Background Texture */}
            <div className="fixed inset-0 opacity-[0.05] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] z-0"></div>

            {/* --- NAV --- */}
            <nav className="fixed top-0 w-full p-8 flex justify-between items-center z-50 mix-blend-difference">
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="p-3 rounded-full border border-white/20 group-hover:bg-white group-hover:text-black transition-all duration-300">
                        <ArrowLeft size={18} />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-widest opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">Back</span>
                </Link>
                <div className="text-xs font-bold uppercase tracking-widest text-white/50 border border-white/10 px-4 py-2 rounded-full backdrop-blur-md">
                    Case Study 0{project.id}
                </div>
            </nav>

            {/* --- HERO IMAGE --- */}
            <div className="relative w-full h-[70vh] md:h-[80vh] overflow-hidden">
                <img 
                    src={project.image} 
                    className="w-full h-full object-cover opacity-60 animate-reveal scale-110 origin-center transition-transform duration-[2s]"
                    alt="Hero"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050505]/20 to-[#050505]" />
            </div>

            {/* --- TITLE & METADATA --- */}
            <div className="relative z-10 px-4 md:px-12 -mt-32 md:-mt-48 mb-24">
                <h1 className="text-[18vw] leading-[0.8] font-anton text-white uppercase mix-blend-overlay opacity-90 animate-reveal">
                    {project.title}
                </h1>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mt-12 border-t border-white/20 pt-8 animate-reveal delay-100">
                    <div>
                        <h3 className="text-xs text-white/40 uppercase tracking-widest mb-2">Role</h3>
                        <p className="text-lg md:text-xl">{project.role}</p>
                    </div>
                    <div>
                        <h3 className="text-xs text-white/40 uppercase tracking-widest mb-2">Client</h3>
                        <p className="text-lg md:text-xl">{project.client}</p>
                    </div>
                    <div>
                        <h3 className="text-xs text-white/40 uppercase tracking-widest mb-2">Year</h3>
                        <p className="text-lg md:text-xl">{project.year}</p>
                    </div>
                    <div>
                         <h3 className="text-xs text-white/40 uppercase tracking-widest mb-2">Stack</h3>
                         <div className="flex flex-wrap gap-2">
                             {project.stack.map((t: string) => (
                                 <span key={t} className="px-2 py-1 bg-white/10 text-[10px] uppercase tracking-wider rounded-sm">{t}</span>
                             ))}
                         </div>
                    </div>
                </div>
            </div>

            {/* --- CONTENT (STICKY LAYOUT) --- */}
            <section className="relative z-10 px-4 md:px-12 max-w-[1600px] mx-auto mb-32">
                <div className="grid md:grid-cols-[1fr_2fr] gap-12 md:gap-24">
                    {/* Sticky Left Column */}
                    <div className="hidden md:block">
                        <div className="sticky top-32 animate-reveal delay-200">
                            <h2 className="text-6xl font-anton uppercase text-white/20 mb-6">The<br/>Mission</h2>
                            <ArrowUpRight size={48} className="text-cyan-500" />
                        </div>
                    </div>

                    {/* Scrollable Right Column */}
                    <div className="animate-reveal delay-300">
                        <h2 className="md:hidden text-4xl font-anton uppercase text-white/20 mb-6">The Mission</h2>
                        <p className="text-xl md:text-3xl font-light leading-relaxed text-white/80 mb-12">
                            {project.desc}
                        </p>
                        
                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <Minus className="mt-1 text-cyan-500" />
                                <p className="text-white/60 text-sm md:text-base leading-relaxed max-w-xl">
                                    Our primary challenge was optimizing the rendering pipeline to ensure 60fps on mobile devices while maintaining high-fidelity texture mapping.
                                </p>
                            </div>
                            <div className="flex items-start gap-4">
                                <Minus className="mt-1 text-cyan-500" />
                                <p className="text-white/60 text-sm md:text-base leading-relaxed max-w-xl">
                                    We implemented a custom shader approach to handle dynamic lighting, reducing the load on the GPU by 40%.
                                </p>
                            </div>
                        </div>

                        <div className="mt-16 flex gap-6">
                            <button className="px-8 py-4 bg-white text-black font-bold uppercase tracking-widest text-xs hover:bg-cyan-400 hover:scale-105 transition-all">
                                Launch Project
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- LARGE GALLERY --- */}
            <section className="relative z-10 px-4 md:px-12 mb-32 space-y-4 md:space-y-8">
                {project.gallery?.map((img: string, i: number) => (
                    <div key={i} className="w-full h-[50vh] md:h-[80vh] overflow-hidden group">
                        <img 
                            src={img} 
                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 scale-100 group-hover:scale-105 transition-all duration-700 ease-in-out" 
                        />
                    </div>
                ))}
            </section>

            {/* --- NEXT FOOTER --- */}
            <Link href={`/projects/${nextProject.id}`} className="block relative z-10 bg-white text-black py-24 md:py-32 px-4 md:px-12 hover:bg-cyan-400 transition-colors duration-500 group overflow-hidden">
                <div className="max-w-[1600px] mx-auto relative z-10">
                    <div className="text-xs font-bold uppercase tracking-widest mb-4 opacity-50">Next Case Study</div>
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end">
                        <h2 className="text-[12vw] leading-[0.8] font-anton uppercase translate-y-0 group-hover:-translate-y-2 transition-transform duration-500">
                            {nextProject.title}
                        </h2>
                        <ArrowUpRight className="w-12 h-12 md:w-24 md:h-24 mb-4 md:mb-8 group-hover:translate-x-4 group-hover:-translate-y-4 transition-transform duration-500" />
                    </div>
                </div>
            </Link>
        </div>
    );
}