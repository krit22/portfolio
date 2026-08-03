'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'

interface PR {
  id: number
  title: string
  html_url: string
  repository_url: string
  repoName: string
  stars: number
}

export default function OpenSourcePRs() {
  const [prs, setPrs] = useState<PR[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPRs() {
      try {
        const res = await fetch('https://api.github.com/search/issues?q=type:pr+author:krit22+is:merged+-user:krit22&sort=updated&order=desc&per_page=15')
        const data = await res.json()
        if (data.items && data.items.length > 0) {
          const externalItems = data.items.filter((item: any) => {
            const name = item.repository_url.replace('https://api.github.com/repos/', '').toLowerCase();
            return !name.startsWith('krit22/');
          });

          const repoUrls = [...new Set(externalItems.map((item: any) => item.repository_url))] as string[];
          const repoDataMap = new Map<string, number>();
          
          await Promise.all(
            repoUrls.map(async (url) => {
              try {
                const repoRes = await fetch(url);
                const repoData = await repoRes.json();
                repoDataMap.set(url, repoData.stargazers_count || 0);
              } catch (e) {
                repoDataMap.set(url, 0);
              }
            })
          );

          const formattedPRs: PR[] = externalItems.map((item: any) => ({
            id: item.id,
            title: item.title,
            html_url: item.html_url,
            repository_url: item.repository_url,
            repoName: item.repository_url.replace('https://api.github.com/repos/', ''),
            stars: repoDataMap.get(item.repository_url) || 0
          }));

          formattedPRs.sort((a, b) => b.stars - a.stars);
          setPrs(formattedPRs.slice(0, 3));
        }
      } catch (err) {
        console.error("Failed to fetch PRs", err)
      } finally {
        setLoading(false)
      }
    }
    fetchPRs()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center py-6">
        <div className="w-5 h-5 border-2 border-black/20 dark:border-white/20 border-t-black/80 dark:border-t-white/80 rounded-full animate-spin"></div>
      </div>
    )
  }

  if (prs.length === 0) return null

  return (
    <div className="w-full mt-6 space-y-4">
      <div className="grid grid-cols-1 gap-4">
        {prs.map(pr => (
          <a
            key={pr.id}
            href={pr.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex items-center justify-between rounded-lg border dark:border-white/10 border-black/10 dark:bg-white/5 bg-black/5 py-3 px-4 overflow-hidden transition-all duration-500 dark:hover:bg-white/10 hover:bg-black/10 hover:dark:border-white/20 hover:border-black/20 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-purple-500/10 cursor-pointer"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10 pr-4 flex-1 min-w-0">
              <div className="text-sm font-mono dark:text-neutral-300 text-neutral-700 leading-relaxed flex items-center min-w-0">
                <span className="text-base font-bold font-pixel dark:text-white text-black mr-2 flex-shrink-0">{pr.repoName}</span>
                <span className="hidden md:inline text-neutral-500 mr-2 flex-shrink-0">—</span>
                <span className="truncate">{pr.title}</span>
              </div>
            </div>
            <div className="relative z-10 flex items-center flex-shrink-0">
              <div className="flex items-center text-xs font-mono dark:text-neutral-400 text-neutral-500 dark:group-hover:text-white group-hover:text-black transition-colors duration-300">
                {pr.stars > 1000 ? (pr.stars/1000).toFixed(1) + 'k' : pr.stars} stars
              </div>
            </div>
          </a>
        ))}
      </div>
      
      <div className="flex justify-end pt-2">
        <Link 
          href="/contributions" 
          className="group flex items-center gap-1.5 text-xs font-mono font-medium dark:text-neutral-400 text-neutral-500 hover:text-black dark:hover:text-white transition-colors cursor-pointer"
        >
          <span>view all contributions</span>
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </span>
        </Link>
      </div>
    </div>
  )
}
