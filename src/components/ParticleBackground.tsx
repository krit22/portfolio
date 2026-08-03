'use client'

import React, { useEffect, useRef } from 'react'
import { useTheme } from 'next-themes'

interface Particle {
  x: number
  y: number
  originX: number
  originY: number
  vx: number
  vy: number
  size: number
  color: string
  angle: number
  speed: number
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const { theme } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    let dpr = Math.min(window.devicePixelRatio || 1, 2)

    let width = window.innerWidth
    let height = window.innerHeight

    const setupCanvas = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = window.innerWidth
      height = window.innerHeight

      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`

      ctx.scale(dpr, dpr)
    }

    const mouse = {
      x: -1000,
      y: -1000,
      vx: 0,
      vy: 0,
      lastX: -1000,
      lastY: -1000,
      radius: 130, // Gentle interaction radius
      isHovered: false,
    }

    const particles: Particle[] = []

    const createParticles = () => {
      particles.length = 0
      const count = Math.max(140, Math.floor((width * height) / 5000))

      for (let i = 0; i < count; i++) {
        const x = Math.random() * width
        const y = Math.random() * height
        // Slightly bigger particle size: 1.2px to 2.4px
        const size = Math.random() * 1.2 + 1.2

        // Bright & visible opacity: 0.45 to 0.75
        const opacity = (Math.random() * 0.3 + 0.45).toFixed(2)
        const isCyan = Math.random() > 0.7
        let color = ''
        if (theme === 'light') {
          color = isCyan 
            ? `rgba(14, 165, 233, ${opacity})`
            : `rgba(40, 40, 40, ${opacity})`
        } else {
          color = isCyan
            ? `rgba(186, 230, 253, ${opacity})`
            : `rgba(245, 245, 255, ${opacity})`
        }

        particles.push({
          x,
          y,
          originX: x,
          originY: y,
          vx: (Math.random() - 0.5) * 0.2,
          vy: (Math.random() - 0.5) * 0.2,
          size,
          color,
          angle: Math.random() * Math.PI * 2,
          speed: Math.random() * 0.015 + 0.005,
        })
      }
    }

    setupCanvas()
    createParticles()

    const handleResize = () => {
      setupCanvas()
      createParticles()
    }

    const handleMouseMove = (e: MouseEvent) => {
      const currentX = e.clientX
      const currentY = e.clientY

      if (mouse.lastX !== -1000) {
        mouse.vx = (currentX - mouse.lastX) * 0.2
        mouse.vy = (currentY - mouse.lastY) * 0.2
      }

      mouse.x = currentX
      mouse.y = currentY
      mouse.lastX = currentX
      mouse.lastY = currentY
      mouse.isHovered = true
    }

    const handleMouseLeave = () => {
      mouse.x = -1000
      mouse.y = -1000
      mouse.lastX = -1000
      mouse.lastY = -1000
      mouse.vx = 0
      mouse.vy = 0
      mouse.isHovered = false
    }

    window.addEventListener('resize', handleResize)
    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)

    const render = () => {
      ctx.clearRect(0, 0, width, height)

      // Decay mouse movement momentum
      mouse.vx *= 0.85
      mouse.vy *= 0.85

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        // Ambient fluid drift
        p.angle += p.speed
        p.originX += Math.cos(p.angle) * 0.2
        p.originY += Math.sin(p.angle * 0.8) * 0.2

        // Boundary wrap
        if (p.originX < -20) p.originX = width + 20
        if (p.originX > width + 20) p.originX = -20
        if (p.originY < -20) p.originY = height + 20
        if (p.originY > height + 20) p.originY = -20

        // Gentle mouse displacement interaction
        const dx = mouse.x - p.x
        const dy = mouse.y - p.y
        const dist = Math.hypot(dx, dy)

        if (dist < mouse.radius && mouse.isHovered && dist > 0) {
          const nx = dx / dist
          const ny = dy / dist
          const force = (mouse.radius - dist) / mouse.radius

          // Gentle push force
          const push = force * 1.6
          p.vx -= nx * push * 0.18
          p.vy -= ny * push * 0.18

          // Subtle momentum drag
          p.vx += mouse.vx * force * 0.1
          p.vy += mouse.vy * force * 0.1
        }

        // Viscosity Damping
        p.vx *= 0.92
        p.vy *= 0.92

        // Return force towards origin
        p.vx += (p.originX - p.x) * 0.02
        p.vy += (p.originY - p.y) * 0.02

        // Position update
        p.x += p.vx
        p.y += p.vy

        // Draw visible particle dot with subtle soft glow
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.shadowBlur = 4
        ctx.shadowColor = p.color
        ctx.fill()
        ctx.shadowBlur = 0
      }

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
      cancelAnimationFrame(animationFrameId)
    }
  }, [theme])

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  )
}
