'use client'

import Link from "next/link";
import dynamic from 'next/dynamic'
import React, { useEffect, useState } from 'react'
import Footer from '@/components/Footer'

const ParticleBackground = dynamic(
  () => import('@/components/ParticleBackground'),
  { ssr: false }
)

const CustomCursor = dynamic(
  () => import('@/components/CustomCursor'),
  { ssr: false }
)

interface PR {
  id: number
  title: string
  html_url: string
  repository_url: string
  repoName: string
  stars: number
  created_at: string
}

export default function ContributionsPage() {
  const [prs, setPrs] = useState<PR[]>([
    {
      id: 1805,
      title: "docs(sdks): update callout tag to Warning in email SDK reference",
      html_url: "https://github.com/InsForge/InsForge/pull/1805",
      repository_url: "https://api.github.com/repos/InsForge/InsForge",
      repoName: "InsForge/InsForge",
      stars: 3500,
      created_at: "2026-07-26T07:42:23Z"
    },
    {
      id: 1804,
      title: "fix(test): pre-seed vector extension and report migration errors in integration harness",
      html_url: "https://github.com/InsForge/InsForge/pull/1804",
      repository_url: "https://api.github.com/repos/InsForge/InsForge",
      repoName: "InsForge/InsForge",
      stars: 3500,
      created_at: "2026-07-26T07:37:14Z"
    },
    {
      id: 1803,
      title: "fix(db): add IF NOT EXISTS guard to migration 012",
      html_url: "https://github.com/InsForge/InsForge/pull/1803",
      repository_url: "https://api.github.com/repos/InsForge/InsForge",
      repoName: "InsForge/InsForge",
      stars: 3500,
      created_at: "2026-07-26T07:15:44Z"
    }
  ])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function fetchPRs() {
      try {
        const res = await fetch('https://api.github.com/search/issues?q=type:pr+author:krit22+is:merged+org:InsForge&sort=updated&order=desc&per_page=50')
        const data = await res.json()
        
        if (data.items && data.items.length > 0) {
          const externalItems = data.items.filter((item: any) => {
            const name = item.repository_url.replace('https://api.github.com/repos/', '').toLowerCase();
            return name.includes('insforge');
          });

          const repoUrls = [...new Set(externalItems.map((item: any) => item.repository_url))] as string[];
          const repoDataMap = new Map<string, number>();
          
          await Promise.all(
            repoUrls.map(async (url) => {
              try {
                const repoRes = await fetch(url);
                const repoData = await repoRes.json();
                repoDataMap.set(url, repoData.stargazers_count || 3500);
              } catch (e) {
                repoDataMap.set(url, 3500);
              }
            })
          );

          const formattedPRs: PR[] = externalItems.map((item: any) => ({
            id: item.id,
            title: item.title,
            html_url: item.html_url,
            repository_url: item.repository_url,
            repoName: item.repository_url.replace('https://api.github.com/repos/', ''),
            stars: repoDataMap.get(item.repository_url) || 3500,
            created_at: item.created_at
          }));

          formattedPRs.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
          if (formattedPRs.length > 0) {
            setPrs(formattedPRs);
          }
        }
      } catch (err) {
        console.error("Failed to fetch PRs", err)
      } finally {
        setLoading(false)
      }
    }
    fetchPRs()
  }, [])

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
                CONTRIBUTIONS
              </h1>
              <p className="text-sm font-mono dark:text-neutral-400 text-neutral-500">
                A dashboard of my merged open-source pull requests (InsForge YC25).
              </p>
            </div>
            <div className="h-px w-full bg-black/10 dark:bg-white/10" />
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-8 h-8 border-2 border-black/20 dark:border-white/20 border-t-black/80 dark:border-t-white/80 rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {prs.map((pr) => (
              <a
                key={pr.id}
                href={pr.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block rounded-xl border dark:border-white/10 border-black/10 dark:bg-white/5 bg-black/5 p-6 overflow-hidden transition-colors duration-500 hover:dark:border-white/20 hover:border-black/20 cursor-pointer h-full"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" />
                <div className="relative z-10 space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-lg font-bold font-pixel dark:text-white text-black break-all">{pr.repoName}</h3>
                    <span className="dark:text-neutral-400 text-neutral-600 dark:group-hover:text-white group-hover:text-black transition-all duration-300 group-hover:rotate-45 group-hover:scale-110 flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>
                    </span>
                  </div>
                  
                  <p className="text-sm font-mono dark:text-neutral-300 text-neutral-700 leading-relaxed">
                    {pr.title}
                  </p>
                  
                  <div className="flex items-center gap-3 pt-2">
                    <div className="flex items-center gap-1.5 text-xs font-mono dark:text-neutral-400 text-neutral-500 bg-black/5 dark:bg-white/5 px-2.5 py-1 rounded-md border border-black/10 dark:border-white/10">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-yellow-500"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                      {pr.stars > 1000 ? (pr.stars/1000).toFixed(1) + 'k' : pr.stars}
                    </div>
                    <div className="text-xs font-mono dark:text-neutral-500 text-neutral-400">
                      Merged {new Date(pr.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
        <Footer />
      </main>
    </>
  );
}
