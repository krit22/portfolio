'use client'

import React, { useState } from 'react'
import { Mail, Copy, Check, ExternalLink } from 'lucide-react'

export default function Footer() {
  const [copied, setCopied] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const email = 'kritkumar2@gmail.com'

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    navigator.clipboard.writeText(email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <footer className="w-full mt-20 space-y-8 pb-12">
      <div className="h-px w-full bg-black/10 dark:bg-white/10" />
      <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-4 text-xs font-mono dark:text-neutral-400 text-neutral-600">
        <div className="flex items-center gap-5">
          {/* GitHub */}
          <a
            href="https://github.com/krit22"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="dark:text-neutral-400 text-neutral-600 dark:hover:text-white hover:text-black transition-colors cursor-pointer"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
          </a>

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/krit-kumar-9980a8319/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="dark:text-neutral-400 text-neutral-600 dark:hover:text-white hover:text-black transition-colors cursor-pointer"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.75a1.47 1.47 0 1 0 0 2.94 1.47 1.47 0 0 0 0-2.94z" />
            </svg>
          </a>

          {/* X (Twitter) */}
          <a
            href="https://x.com/Krit12007"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="X (Twitter)"
            className="dark:text-neutral-400 text-neutral-600 dark:hover:text-white hover:text-black transition-colors cursor-pointer"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>

          {/* Mail Interactive Popover */}
          <div
            className="relative group"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
          >
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Email"
              className="dark:text-neutral-400 text-neutral-600 dark:hover:text-white hover:text-black transition-colors cursor-pointer flex items-center gap-1"
            >
              <Mail className="w-4 h-4" />
            </button>

            {/* Glassy Popover Card */}
            <div
              className={`absolute bottom-full left-0 mb-3 p-3 bg-neutral-900/95 dark:bg-black/95 backdrop-blur-xl border border-white/15 rounded-2xl shadow-2xl text-white transition-all duration-300 z-50 min-w-[260px] ${
                isOpen
                  ? 'opacity-100 scale-100 pointer-events-auto translate-y-0'
                  : 'opacity-0 scale-95 pointer-events-none translate-y-2'
              }`}
            >
              <div className="flex items-center justify-between gap-2 pb-2 mb-2 border-b border-white/10">
                <span className="text-[11px] font-mono text-neutral-400 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-purple-400" />
                  Get in touch
                </span>
                {copied && (
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 animate-pulse">
                    Copied!
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between gap-2 bg-white/5 border border-white/10 rounded-xl p-2">
                <span className="text-xs font-mono text-neutral-200 select-all truncate">
                  {email}
                </span>

                <div className="flex items-center gap-1">
                  <button
                    onClick={handleCopy}
                    className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                    title="Copy Email"
                  >
                    {copied ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                  <a
                    href={`mailto:${email}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-lg bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 transition-colors cursor-pointer"
                    title="Open Email Client"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>© {new Date().getFullYear()} Krit Kumar.</div>
      </div>
    </footer>
  )
}
