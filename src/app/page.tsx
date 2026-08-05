'use client'

import { useState, useRef, useEffect } from 'react'
import dynamic from 'next/dynamic'
import gsap from 'gsap'
import { ThemeButton } from '@/components/ThemeButton'
import Link from 'next/link'
import GithubGraph from '@/components/GithubGraph'
import OpenSourcePRs from '@/components/OpenSourcePRs'
import Footer from '@/components/Footer'

const ParticleBackground = dynamic(
  () => import('@/components/ParticleBackground'),
  { ssr: false }
)

export default function Home() {
  const [isExpanded, setIsExpanded] = useState(true)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (contentRef.current) {
      if (isExpanded) {
        gsap.to(contentRef.current, {
          height: 'auto',
          opacity: 1,
          duration: 0.5,
          ease: 'power3.out'
        })
      } else {
        gsap.to(contentRef.current, {
          height: 0,
          opacity: 0,
          duration: 0.5,
          ease: 'power3.inOut'
        })
      }
    }
  }, [isExpanded])

  return (
    <main className="min-h-screen flex justify-center py-10 px-5 relative overflow-x-hidden">
      <ParticleBackground />
      <div className="w-full max-w-2xl flex flex-col z-10 space-y-12 md:space-y-16">
        <div className="space-y-6 text-left">
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <h1 className="text-5xl font-bold tracking-tight font-pixel">KRIT KUMAR</h1>
              <ThemeButton />
            </div>
            <p className="text-xs font-pixel uppercase tracking-[0.35em] dark:text-neutral-400 text-neutral-600">ENGINEERING & AI</p>
          </div>
            <div className="space-y-4 dark:text-neutral-300 text-neutral-700 text-sm md:text-base leading-relaxed w-full font-mono">
              <div className="flex items-center gap-3">
                <p className="dark:text-white text-black font-semibold text-base md:text-lg">Hey, I&apos;m Krit.</p>
                {!isExpanded && (
                  <button
                    onClick={() => setIsExpanded(true)}
                    className="underline underline-offset-4 dark:text-neutral-400 text-neutral-600 dark:hover:text-white hover:text-black transition-colors cursor-pointer text-xs md:text-sm font-semibold"
                  >
                    expand summary
                  </button>
                )}
              </div>

              <div ref={contentRef} className="overflow-hidden space-y-4">
                <p>
                  During COVID I spent time <span className="dark:text-white text-black font-medium">building mods to hack Minecraft</span>. At college, I made <span className="dark:text-white text-black font-medium">coding videos</span> for my subscribers on <span className="dark:text-white text-black font-medium">YouTube</span> and taught myself how to build <span className="dark:text-white text-black font-medium">websites and AI systems</span>.
                </p>
                <p>
                  I truly <span className="dark:text-white text-black font-medium">started building when I was 18</span>, and ever since I&apos;ve <span className="dark:text-white text-black font-medium">shipped things that many people use</span>, as well as a handful of <span className="dark:text-white text-black font-medium">AI tools</span> and <span className="dark:text-white text-black font-medium">hackathon projects</span>.
                </p>
                <p>
                  When people ask what I do for fun, I usually say <span className="dark:text-white text-black font-medium">running</span> or <span className="dark:text-white text-black font-medium">hanging out with friends</span>. The truth is, I <span className="dark:text-white text-black font-medium">just love building</span> — especially alongside other <span className="dark:text-white text-black font-medium">builder-obsessed people</span>.
                </p>
                <p>
                  Somewhere between <span className="dark:text-white text-black font-medium">making videos</span> and <span className="dark:text-white text-black font-medium">competitive gaming</span>, that same drive translated into building the things I&apos;m <span className="dark:text-white text-black font-medium">genuinely passionate about</span>.
                </p>
                <div className="flex items-center gap-3 pt-2">
                  <span className="dark:text-neutral-400 text-neutral-600 text-xs md:text-sm font-semibold">
                    — <span className="dark:text-white text-black">krit</span>
                  </span>
                  <button
                    onClick={() => setIsExpanded(false)}
                    className="underline underline-offset-4 dark:text-neutral-400 text-neutral-600 dark:hover:text-white hover:text-black transition-colors cursor-pointer text-xs md:text-sm font-semibold"
                  >
                    close summary
                  </button>
                </div>
              </div>
            </div>
          </div>

          <section id="projects" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold font-pixel tracking-wide dark:text-neutral-200 text-neutral-800 uppercase">
                PROJECTS
              </h2>
              <Link 
                href="/projects" 
                className="group flex items-center gap-1.5 text-xs font-mono font-medium dark:text-neutral-400 text-neutral-500 hover:text-black dark:hover:text-white transition-colors cursor-pointer"
              >
                <span>view all</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                </span>
              </Link>
            </div>
            <div className="space-y-4">
              {/* Rank 1: CheatCode CLI */}
              <a
                href="https://krit22.github.io/cheatcode"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center justify-between rounded-lg border dark:border-white/10 border-black/10 dark:bg-white/5 bg-black/5 py-3 px-4 overflow-hidden transition-all duration-500 dark:hover:bg-white/10 hover:bg-black/10 hover:dark:border-white/20 hover:border-black/20 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-purple-500/10 cursor-pointer block"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10 pr-4 flex-1">
                  <div className="text-sm font-mono dark:text-neutral-300 text-neutral-700 leading-relaxed">
                    <span className="text-base font-bold font-pixel dark:text-white text-black mr-2">CheatCode CLI</span>
                    <span className="text-neutral-500 mr-2">—</span>
                    <span>Stealth CLI AI Assistant powered by OpenRouter.</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {["OpenRouter API", "OpenAI API", "Node.js", "React / Ink", "esbuild"].map((tag, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded-full text-[10px] font-mono border dark:border-white/10 border-black/10 dark:bg-white/5 bg-black/5 dark:text-neutral-400 text-neutral-600">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="relative z-10 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      window.open('https://github.com/krit22/cheatcode', '_blank')
                    }}
                    title="GitHub Repository"
                    className="p-1 rounded-md dark:text-neutral-400 text-neutral-600 dark:hover:text-white hover:text-black transition-colors cursor-pointer z-20"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                    </svg>
                  </button>
                  <span className="p-1 rounded-md dark:text-neutral-400 text-neutral-600 dark:group-hover:text-white group-hover:text-black transition-all duration-300 group-hover:rotate-45 group-hover:scale-110">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>
                  </span>
                </div>
              </a>

              {/* Rank 2: Streamflow */}
              <a
                href="https://streamflow-ahic.onrender.com/feed"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center justify-between rounded-lg border dark:border-white/10 border-black/10 dark:bg-white/5 bg-black/5 py-3 px-4 overflow-hidden transition-all duration-500 dark:hover:bg-white/10 hover:bg-black/10 hover:dark:border-white/20 hover:border-black/20 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-purple-500/10 cursor-pointer block"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10 pr-4 flex-1">
                  <div className="text-sm font-mono dark:text-neutral-300 text-neutral-700 leading-relaxed">
                    <span className="text-base font-bold font-pixel dark:text-white text-black mr-2">Streamflow</span>
                    <span className="text-neutral-500 mr-2">—</span>
                    <span>An Open-Source Video Infrastructure Platform for Devs.</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {["Next.js", "Express", "Prisma", "PostgreSQL", "Supabase", "Turborepo"].map((tag, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded-full text-[10px] font-mono border dark:border-white/10 border-black/10 dark:bg-white/5 bg-black/5 dark:text-neutral-400 text-neutral-600">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="relative z-10 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      window.open('https://github.com/krit22/streamflow', '_blank')
                    }}
                    title="GitHub Repository"
                    className="p-1 rounded-md dark:text-neutral-400 text-neutral-600 dark:hover:text-white hover:text-black transition-colors cursor-pointer z-20"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                    </svg>
                  </button>
                  <span className="p-1 rounded-md dark:text-neutral-400 text-neutral-600 dark:group-hover:text-white group-hover:text-black transition-all duration-300 group-hover:rotate-45 group-hover:scale-110">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>
                  </span>
                </div>
              </a>

              <a
                href="https://github.com/krit22/Agently"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center justify-between rounded-lg border dark:border-white/10 border-black/10 dark:bg-white/5 bg-black/5 py-3 px-4 overflow-hidden transition-all duration-500 dark:hover:bg-white/10 hover:bg-black/10 hover:dark:border-white/20 hover:border-black/20 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-purple-500/10 cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10 pr-4 flex-1">
                  <div className="text-sm font-mono dark:text-neutral-300 text-neutral-700 leading-relaxed flex items-center flex-wrap gap-x-2 gap-y-1">
                    <span className="text-base font-bold font-pixel dark:text-white text-black">Agently</span>
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 text-[10px] font-mono rounded-full border border-amber-500/40 bg-amber-500/10 text-amber-600 dark:text-amber-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                      still building
                    </span>
                    <span className="text-neutral-500">—</span>
                    <span>Autonomous Customer Support Platform with Agentic Triage Loop.</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {["RAG", "AI Agent", "Hono", "Redis / BullMQ", "Supabase", "Clerk", "Next.js", "Stripe"].map((tag, idx) => {
                      const isHighlighted = ["RAG", "AI Agent"].includes(tag)
                      return (
                        <span
                          key={idx}
                          className={`px-2 py-0.5 rounded-full text-[10px] font-mono border transition-colors ${
                            isHighlighted
                              ? "border-purple-500/40 dark:border-purple-400/50 bg-purple-500/15 dark:bg-purple-500/25 text-purple-600 dark:text-purple-300 font-semibold shadow-sm shadow-purple-500/20"
                              : "dark:border-white/10 border-black/10 dark:bg-white/5 bg-black/5 dark:text-neutral-400 text-neutral-600"
                          }`}
                        >
                          {tag}
                        </span>
                      )
                    })}
                  </div>
                </div>
                <span className="relative z-10 dark:text-neutral-400 text-neutral-600 dark:group-hover:text-white group-hover:text-black transition-all duration-300 group-hover:rotate-45 group-hover:scale-110">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>
                </span>
              </a>

              <a
                href="https://gssoc-scanner.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center justify-between rounded-lg border dark:border-white/10 border-black/10 dark:bg-white/5 bg-black/5 py-3 px-4 overflow-hidden transition-all duration-500 dark:hover:bg-white/10 hover:bg-black/10 hover:dark:border-white/20 hover:border-black/20 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-purple-500/10 cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10 pr-4 flex-1">
                  <div className="text-sm font-mono dark:text-neutral-300 text-neutral-700 leading-relaxed">
                    <span className="text-base font-bold font-pixel dark:text-white text-black mr-2">GSSOC Scanner</span>
                    <span className="text-neutral-500 mr-2">—</span>
                    <span>Finds you all the available issues that are not yet claimed on autopilot.</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {["Python", "FastAPI", "React", "Vite", "Automation"].map((tag, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded-full text-[10px] font-mono border dark:border-white/10 border-black/10 dark:bg-white/5 bg-black/5 dark:text-neutral-400 text-neutral-600">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="relative z-10 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      window.open('https://github.com/krit22/GSSOC-issue-tracker', '_blank')
                    }}
                    title="GitHub Repository"
                    className="p-1 rounded-md dark:text-neutral-400 text-neutral-600 dark:hover:text-white hover:text-black transition-colors cursor-pointer z-20"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                    </svg>
                  </button>
                  <span className="p-1 rounded-md dark:text-neutral-400 text-neutral-600 dark:group-hover:text-white group-hover:text-black transition-all duration-300 group-hover:rotate-45 group-hover:scale-110">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>
                  </span>
                </div>
              </a>

              {/* Portfolio */}
              <a
                href="https://portfolio-xi-sage-wrvh3ugxrm.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center justify-between rounded-lg border dark:border-white/10 border-black/10 dark:bg-white/5 bg-black/5 py-3 px-4 overflow-hidden transition-all duration-500 dark:hover:bg-white/10 hover:bg-black/10 hover:dark:border-white/20 hover:border-black/20 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-purple-500/10 cursor-pointer block"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-rose-500/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10 pr-4 flex-1">
                  <div className="text-sm font-mono dark:text-neutral-300 text-neutral-700 leading-relaxed">
                    <span className="text-base font-bold font-pixel dark:text-white text-black mr-2">Portfolio</span>
                    <span className="text-neutral-500 mr-2">—</span>
                    <span>This website. Built with Next.js.</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {["Next.js", "React", "TypeScript", "TailwindCSS", "GSAP", "Three.js"].map((tag, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded-full text-[10px] font-mono border dark:border-white/10 border-black/10 dark:bg-white/5 bg-black/5 dark:text-neutral-400 text-neutral-600">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="relative z-10 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      window.open('https://github.com/krit22/portfolio', '_blank')
                    }}
                    title="GitHub Repository"
                    className="p-1 rounded-md dark:text-neutral-400 text-neutral-600 dark:hover:text-white hover:text-black transition-colors cursor-pointer z-20"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                    </svg>
                  </button>
                  <span className="p-1 rounded-md dark:text-neutral-400 text-neutral-600 dark:group-hover:text-white group-hover:text-black transition-all duration-300 group-hover:rotate-45 group-hover:scale-110">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>
                  </span>
                </div>
              </a>

            </div>
          </section>

          <div id="contributions" className="w-full mt-8">
            <GithubGraph />
            <OpenSourcePRs />
          </div>

          <Footer />
        </div>
      </main>
  )
}
