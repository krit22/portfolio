'use client'

import Link from "next/link";
import dynamic from 'next/dynamic'
import Footer from '@/components/Footer'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Tilt from 'react-parallax-tilt'

const ParticleBackground = dynamic(
  () => import('@/components/ParticleBackground'),
  { ssr: false }
)

const CustomCursor = dynamic(
  () => import('@/components/CustomCursor'),
  { ssr: false }
)

export default function ProjectsPage() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    
    if (containerRef.current) {
      const cards = containerRef.current.querySelectorAll('.project-card')
      gsap.fromTo(cards, 
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
          }
        }
      )
    }
  }, [])

  const projects = [
    {
      name: "CheatCode CLI",
      description: "Stealth CLI AI Assistant powered by OpenRouter.",
      href: "https://krit22.github.io/cheatcode",
      github: "https://github.com/krit22/cheatcode",
      image: "bg-gradient-to-br from-emerald-500/20 to-teal-500/20",
      hoverBg: "from-emerald-500/10 to-teal-500/10",
      imageUrl: "https://twguafnjywylqaeichdq.supabase.co/storage/v1/object/public/images/Screenshot%202026-08-05%20145937.png",
      tags: ["OpenRouter API", "OpenAI API", "Node.js", "React / Ink", "esbuild"]
    },
    {
      name: "Streamflow",
      description: "An Open-Source Video Infrastructure Platform for Devs.",
      href: "https://streamflow-ahic.onrender.com/feed",
      github: "https://github.com/krit22/streamflow",
      image: "bg-gradient-to-br from-indigo-500/20 to-purple-500/20",
      hoverBg: "from-indigo-500/10 to-purple-500/10",
      imageUrl: "https://twguafnjywylqaeichdq.supabase.co/storage/v1/object/public/images/Screenshot%202026-08-05%20150654.png",
      tags: ["Next.js", "Express", "Prisma", "PostgreSQL", "Supabase", "Turborepo"]
    },
    {
      name: "Agently",
      description: "Autonomous Customer Support Platform with Agentic Triage Loop.",
      href: "https://github.com/krit22/Agently",
      image: "bg-gradient-to-br from-blue-500/20 to-cyan-500/20",
      hoverBg: "from-blue-500/10 to-cyan-500/10",
      status: "still building",
      comingSoon: true,
      tags: ["RAG", "AI Agent", "Hono", "Redis / BullMQ", "Supabase", "Clerk", "Next.js", "Stripe"]
    },
    {
      name: "GSSOC Scanner",
      description: "Finds you all the available issues that are not yet claimed on autopilot.",
      href: "https://gssoc-scanner.vercel.app/",
      image: "bg-gradient-to-br from-orange-500/20 to-red-500/20",
      hoverBg: "from-orange-500/10 to-red-500/10",
      imageUrl: "https://twguafnjywylqaeichdq.supabase.co/storage/v1/object/public/images/Screenshot%202026-08-05%20151224.png",
      tags: ["Python", "FastAPI", "React", "Vite", "Automation"]
    },
    {
      name: "Portfolio",
      description: "This website. A personal portfolio built with Next.js.",
      href: "https://portfolio-xi-sage-wrvh3ugxrm.vercel.app/",
      github: "https://github.com/krit22/portfolio",
      image: "bg-gradient-to-br from-rose-500/20 to-orange-500/20",
      hoverBg: "from-rose-500/10 to-orange-500/10",
      imageUrl: "https://twguafnjywylqaeichdq.supabase.co/storage/v1/object/public/images/Screenshot%202026-08-05%20152415.png",
      tags: ["Next.js", "React", "TypeScript", "TailwindCSS", "GSAP", "Three.js"]
    },
  ];

  return (
    <>
      <CustomCursor />
      <ParticleBackground />
      <main className="min-h-screen max-w-5xl mx-auto py-20 px-5 relative z-10">
        <div className="mb-16">
          <Link 
            href="/" 
            className="group inline-flex items-center gap-2 text-sm font-mono dark:text-neutral-400 text-neutral-500 hover:text-black dark:hover:text-white transition-colors mb-6"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:-translate-x-1"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
            <span>back to home</span>
          </Link>
          <div className="flex flex-col items-center justify-center space-y-6 w-full">
            <div className="space-y-3 text-center">
              <h1 className="text-5xl md:text-6xl font-bold font-pixel tracking-widest dark:text-neutral-200 text-neutral-800 uppercase">
                PROJECTS
              </h1>
              <p className="text-sm font-mono dark:text-neutral-400 text-neutral-500">
                A selection of products and experiments I&apos;ve built.
              </p>
            </div>
            <div className="h-px w-full bg-black/10 dark:bg-white/10" />
          </div>
        </div>

        <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <Tilt key={i} tiltMaxAngleX={5} tiltMaxAngleY={5} scale={1.02} transitionSpeed={2500} className="project-card opacity-0">
              <a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex flex-col justify-between rounded-xl border dark:border-white/10 border-black/10 dark:bg-white/5 bg-black/5 p-4 overflow-hidden transition-colors duration-500 hover:dark:border-white/20 hover:border-black/20 cursor-pointer h-full"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${project.hoverBg} opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0`} />
                 <div className={`relative z-10 w-full aspect-video rounded-lg mb-5 ${project.image} flex items-center justify-center overflow-hidden border dark:border-white/5 border-black/5`}>
                    {project.imageUrl ? (
                      <img src={project.imageUrl} alt={project.name} className="w-full h-full object-cover" />
                    ) : (
                      <span className="font-pixel dark:text-white/40 text-black/40 text-lg md:text-xl tracking-widest uppercase">
                        {project.comingSoon ? "COMING SOON" : "IMAGE"}
                      </span>
                    )}
                 </div>
                <div className="relative z-10 space-y-3 px-1 flex-1 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5 flex-wrap">
                        <h3 className="text-xl font-bold font-pixel dark:text-white text-black">{project.name}</h3>
                        {project.status && (
                          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 text-[10px] font-mono rounded-full border border-amber-500/40 bg-amber-500/10 text-amber-600 dark:text-amber-300">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                            {project.status}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        {project.github && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault()
                              e.stopPropagation()
                              window.open(project.github, '_blank')
                            }}
                            title="GitHub Repository"
                            className="p-1 rounded-md dark:text-neutral-400 text-neutral-600 dark:hover:text-white hover:text-black transition-colors cursor-pointer z-20"
                          >
                            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                            </svg>
                          </button>
                        )}
                        <span className="dark:text-neutral-400 text-neutral-600 dark:group-hover:text-white group-hover:text-black transition-all duration-300 group-hover:rotate-45 group-hover:scale-110">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>
                        </span>
                      </div>
                    </div>
                    <p className="text-sm font-mono dark:text-neutral-300 text-neutral-700 leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                  {project.tags && project.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {project.tags.map((tag, tagIdx) => {
                        const isHighlighted = ["RAG", "AI Agent"].includes(tag)
                        return (
                          <span
                            key={tagIdx}
                            className={`px-2 py-0.5 rounded-full text-[11px] font-mono border transition-colors ${
                              isHighlighted
                                ? "border-purple-500/40 dark:border-purple-400/50 bg-purple-500/15 dark:bg-purple-500/25 text-purple-600 dark:text-purple-300 font-semibold shadow-sm shadow-purple-500/20"
                                : "dark:border-white/10 border-black/10 dark:bg-white/5 bg-black/5 dark:text-neutral-400 text-neutral-600 group-hover:dark:border-white/20 group-hover:border-black/20"
                            }`}
                          >
                            {tag}
                          </span>
                        )
                      })}
                    </div>
                  )}
                </div>
              </a>
            </Tilt>
          ))}
        </div>
        <Footer />
      </main>
    </>
  );
}
