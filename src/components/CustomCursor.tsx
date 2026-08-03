'use client'

import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cursor = cursorRef.current
    const dot = dotRef.current
    if (!cursor || !dot) return

    // Hide custom cursor initially until mouse moves
    gsap.set([cursor, dot], { opacity: 0 })

    const xTo = gsap.quickTo(cursor, 'x', { duration: 0.18, ease: 'power3.out' })
    const yTo = gsap.quickTo(cursor, 'y', { duration: 0.18, ease: 'power3.out' })

    const dotXTo = gsap.quickTo(dot, 'x', { duration: 0.05, ease: 'power2.out' })
    const dotYTo = gsap.quickTo(dot, 'y', { duration: 0.05, ease: 'power2.out' })

    let hasMoved = false

    const onMouseMove = (e: MouseEvent) => {
      if (!hasMoved) {
        hasMoved = true
        gsap.to([cursor, dot], { opacity: 1, duration: 0.2 })
      }
      xTo(e.clientX)
      yTo(e.clientY)
      dotXTo(e.clientX)
      dotYTo(e.clientY)
    }

    const onMouseDown = () => {
      gsap.to(cursor, {
        scale: 0.45,
        duration: 0.18,
        ease: 'power2.out',
      })
      gsap.to(dot, {
        scale: 0.5,
        duration: 0.18,
        ease: 'power2.out',
      })
    }

    const onMouseUp = () => {
      gsap.to(cursor, {
        scale: 1,
        duration: 0.25,
        ease: 'back.out(1.7)',
      })
      gsap.to(dot, {
        scale: 1,
        duration: 0.25,
        ease: 'power2.out',
      })
    }

    const onMouseLeave = () => {
      gsap.to([cursor, dot], { opacity: 0, duration: 0.2 })
    }

    const onMouseEnter = () => {
      gsap.to([cursor, dot], { opacity: 1, duration: 0.2 })
    }

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a') || target.closest('button') || target.classList.contains('cursor-pointer')) {
        gsap.to(cursor, { scale: 1.8, backgroundColor: 'white', borderColor: 'transparent', duration: 0.2, ease: 'power2.out' });
        gsap.to(dot, { scale: 0, opacity: 0, duration: 0.2, ease: 'power2.out' });
      }
    };

    const onMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a') || target.closest('button') || target.classList.contains('cursor-pointer')) {
        gsap.to(cursor, { scale: 1, backgroundColor: 'transparent', borderColor: 'rgba(56,189,248,0.5)', duration: 0.2, ease: 'power2.out' });
        gsap.to(dot, { scale: 1, opacity: 1, duration: 0.2, ease: 'power2.out' });
      }
    };

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mouseup', onMouseUp)
    document.addEventListener('mouseleave', onMouseLeave)
    document.addEventListener('mouseenter', onMouseEnter)
    window.addEventListener('mouseover', onMouseOver)
    window.addEventListener('mouseout', onMouseOut)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mouseup', onMouseUp)
      document.removeEventListener('mouseleave', onMouseLeave)
      document.removeEventListener('mouseenter', onMouseEnter)
      window.removeEventListener('mouseover', onMouseOver)
      window.removeEventListener('mouseout', onMouseOut)
    }
  }, [])

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden mix-blend-difference">
      {/* Smooth trailing outer ring */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-7 h-7 rounded-full border border-sky-400/50 pointer-events-none"
      />
      {/* Sharp central dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white pointer-events-none"
      />
    </div>
  )
}
