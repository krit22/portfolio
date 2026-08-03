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
      name: "Streamflow",
      description: "An Open-Source Video Infrastructure Platform for Devs.",
      href: "https://github.com/krit22/streamflow",
      image: "bg-gradient-to-br from-indigo-500/20 to-purple-500/20",
      hoverBg: "from-indigo-500/10 to-purple-500/10"
    },
    {
      name: "Agently",
      description: "Autonomous Customer Support Platform with Agentic Triage Loop.",
      href: "https://github.com/krit22/Agently",
      image: "bg-gradient-to-br from-blue-500/20 to-cyan-500/20",
      hoverBg: "from-blue-500/10 to-cyan-500/10"
    },
    {
      name: "CheatCode CLI",
      description: "Stealth CLI AI Assistant powered by OpenRouter.",
      href: "https://krit22.github.io/cheatcode",
      image: "bg-gradient-to-br from-emerald-500/20 to-teal-500/20",
      hoverBg: "from-emerald-500/10 to-teal-500/10"
    },
    {
      name: "GSSOC Scanner",
      description: "Finds you all the available issues that are not yet claimed on autopilot.",
      href: "https://github.com/krit22/GSSOC-issue-tracker",
      image: "bg-gradient-to-br from-orange-500/20 to-red-500/20",
      hoverBg: "from-orange-500/10 to-red-500/10"
    },
    {
      name: "CampusBytes",
      description: "A simple web app that simplifies order management for both vendors and customers for small foodshops.",
      href: "https://github.com/krit22/CampusBytes",
      image: "bg-gradient-to-br from-pink-500/20 to-rose-500/20",
      hoverBg: "from-pink-500/10 to-rose-500/10"
    },
    {
      name: "AgriSense",
      description: "A computer vision driven tool that lets farmers detect and diagnose Tomato Blight at an early stage.",
      href: "https://github.com/krit22/AgriSense",
      image: "bg-gradient-to-br from-green-500/20 to-lime-500/20",
      hoverBg: "from-green-500/10 to-lime-500/10"
    },
    {
      name: "nitmun-rag-chatbot",
      description: "AI-powered chatbot for NITMUN historical data using RAG.",
      href: "https://github.com/krit22/nitmun-rag-chatbot",
      image: "bg-gradient-to-br from-violet-500/20 to-purple-500/20",
      hoverBg: "from-violet-500/10 to-purple-500/10"
    }
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
                className="group relative block rounded-xl border dark:border-white/10 border-black/10 dark:bg-white/5 bg-black/5 p-4 overflow-hidden transition-colors duration-500 hover:dark:border-white/20 hover:border-black/20 cursor-pointer h-full"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${project.hoverBg} opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0`} />
                <div className={`relative z-10 w-full aspect-video rounded-lg mb-5 ${project.image} flex items-center justify-center overflow-hidden border dark:border-white/5 border-black/5`}>
                   <span className="font-pixel dark:text-white/20 text-black/20 text-2xl tracking-widest">IMAGE</span>
                </div>
                <div className="relative z-10 space-y-3 px-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold font-pixel dark:text-white text-black">{project.name}</h3>
                    <span className="dark:text-neutral-400 text-neutral-600 dark:group-hover:text-white group-hover:text-black transition-all duration-300 group-hover:rotate-45 group-hover:scale-110">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>
                    </span>
                  </div>
                  <p className="text-sm font-mono dark:text-neutral-300 text-neutral-700 leading-relaxed">
                    {project.description}
                  </p>
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
