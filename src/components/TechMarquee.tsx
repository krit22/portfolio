import React from 'react';

export default function TechMarquee() {
  const techs = [
    "Next.js", "React", "TypeScript", "Node.js", "Express", 
    "Tailwind CSS", "PostgreSQL", "Prisma", "GSAP", "Python",
    "Docker", "AWS", "MongoDB"
  ];

  return (
    <div className="w-full overflow-hidden py-10 bg-black/5 dark:bg-white/5 border-y border-black/10 dark:border-white/10 relative flex items-center">
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#f0f0f0] dark:from-[#141414] to-transparent z-10 pointer-events-none"></div>
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#f0f0f0] dark:from-[#141414] to-transparent z-10 pointer-events-none"></div>
      
      <div className="flex animate-[marquee_30s_linear_infinite] whitespace-nowrap group hover:[animation-play-state:paused]">
        {/* Double the array for seamless looping */}
        {[...techs, ...techs].map((tech, idx) => (
          <div key={idx} className="mx-8 flex items-center justify-center">
            <span className="text-xl md:text-3xl font-pixel font-bold text-neutral-800 dark:text-neutral-200 tracking-wider">
              {tech}
            </span>
            <span className="mx-8 text-neutral-400 dark:text-neutral-600 font-pixel text-xl">•</span>
          </div>
        ))}
      </div>
    </div>
  )
}
