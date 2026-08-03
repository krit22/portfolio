'use client'

import React, { useState, useCallback, useRef, useEffect } from 'react';
import { GitHubCalendar, Activity } from 'react-github-calendar';
import { useTheme } from 'next-themes';

export default function GithubGraph() {
  const [total, setTotal] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleData = useCallback((data: Activity[]) => {
    const sum = data.reduce((acc, day) => acc + day.count, 0);
    if (sum !== total) {
      setTimeout(() => setTotal(sum), 0);
    }
    return data;
  }, [total]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const blocks = containerRef.current.querySelectorAll<SVGRectElement>('.github-block');
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    blocks.forEach((block) => {
      const blockRect = block.getBoundingClientRect();
      const blockCenterX = blockRect.left + blockRect.width / 2;
      const blockCenterY = blockRect.top + blockRect.height / 2;
      
      const distance = Math.hypot(mouseX - blockCenterX, mouseY - blockCenterY);
      const isZero = block.classList.contains('level-0');
      
      // distance threshold of 32px covers the block itself and the 8 surrounding blocks
      if (distance < 32) {
        const rawStrength = 1 - (distance / 32);
        const strength = Math.max(0, Math.min(1, rawStrength * 1.5)); 
        
        if (isZero) {
          const scale = 1 + 0.1 * strength;
          block.style.transform = `scale(${scale})`;
          block.style.fill = `rgba(139, 92, 246, ${0.3 * strength})`;
          block.style.filter = `drop-shadow(0 0 3px rgba(139, 92, 246, ${0.4 * strength}))`;
        } else {
          const scale = 1 + 0.25 * strength;
          block.style.transform = `scale(${scale})`;
          block.style.filter = `drop-shadow(0 0 ${8 * strength}px rgba(167, 139, 250, ${0.8 * strength})) brightness(${1 + 0.2 * strength})`;
        }
      } else {
        block.style.transform = 'scale(1)';
        block.style.fill = ''; 
        block.style.filter = 'none';
      }
    });
  };

  const handleMouseLeave = () => {
    if (!containerRef.current) return;
    const blocks = containerRef.current.querySelectorAll<SVGRectElement>('.github-block');
    blocks.forEach((block) => {
      block.style.transform = 'scale(1)';
      block.style.fill = ''; 
      block.style.filter = 'none';
    });
  };

  return (
    <section className="space-y-6" ref={containerRef} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold font-pixel tracking-wide dark:text-neutral-200 text-neutral-800 uppercase flex items-center gap-3">
          OPEN SOURCE CONTRIBUTIONS
          {total !== null && (
            <span className="text-sm font-mono dark:text-neutral-400 text-neutral-500 lowercase tracking-normal">
              ({total} in the last year)
            </span>
          )}
        </h2>
      </div>
      <div className="w-full overflow-hidden flex justify-end pt-4">
        <div className="min-w-fit">
          <GitHubCalendar 
            username="krit22" 
            colorScheme={mounted && resolvedTheme === 'light' ? 'light' : 'dark'}
            showTotalCount={false}
            showColorLegend={false}
            showMonthLabels={false}
            showWeekdayLabels={false}
            transformData={handleData}
            renderBlock={(block, activity) => 
              React.cloneElement(block, {
                className: `github-block level-${activity.level}`
              })
            }
            theme={{
              light: ['#e5e7eb', '#ddd6fe', '#c4b5fd', '#a78bfa', '#8b5cf6'],
              dark: ['#1a1a1a', '#2d1b4e', '#5a2d9c', '#8b5cf6', '#a78bfa'],
            }}
            blockMargin={4}
            blockSize={14}
            fontSize={0}
          />
        </div>
      </div>
    </section>
  )
}
