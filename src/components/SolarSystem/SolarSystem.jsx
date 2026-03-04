import { useEffect, useRef } from 'react'
import './SolarSystem.css'

const ORBITS = [
  { radius: 0.12, speed: 0.08, width: 1, color: 'rgba(120, 140, 180, 0.12)' },
  { radius: 0.20, speed: 0.05, width: 1, color: 'rgba(100, 160, 220, 0.14)' },
  { radius: 0.30, speed: 0.032, width: 1.5, color: 'rgba(80, 140, 200, 0.1)' },
  { radius: 0.42, speed: 0.02, width: 1, color: 'rgba(140, 120, 200, 0.1)' },
  { radius: 0.56, speed: 0.014, width: 1, color: 'rgba(100, 180, 220, 0.08)' },
  { radius: 0.72, speed: 0.009, width: 1, color: 'rgba(120, 140, 200, 0.06)' }
]

const PLANETS = [
  { orbitIndex: 0, size: 2.5, color: '#8b9dc3', glow: 'rgba(139, 157, 195, 0.5)' },
  { orbitIndex: 1, size: 3.5, color: '#a8c4e0', glow: 'rgba(168, 196, 224, 0.4)' },
  { orbitIndex: 2, size: 4, color: '#7eb8da', glow: 'rgba(126, 184, 218, 0.35)' },
  { orbitIndex: 3, size: 3, color: '#b8a8d4', glow: 'rgba(184, 168, 212, 0.3)' },
  { orbitIndex: 4, size: 5, color: '#6eb5d4', glow: 'rgba(110, 181, 212, 0.25)' },
  { orbitIndex: 5, size: 3.5, color: '#8ba3c4', glow: 'rgba(139, 163, 196, 0.2)' }
]

function SolarSystem() {
  const canvasRef = useRef(null)
  const timeRef = useRef(0)
  const anglesRef = useRef(ORBITS.map(() => Math.random() * Math.PI * 2))

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    let animationFrameId

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const draw = () => {
      const W = window.innerWidth
      const H = window.innerHeight
      const cx = W * 0.52
      const cy = H * 0.48
      const scale = Math.min(W, H) * 0.38
      const rxBase = scale

      ctx.clearRect(0, 0, W, H)

      // Starfield (subtle dots)
      ctx.fillStyle = 'rgba(255, 255, 255, 0.03)'
      for (let i = 0; i < 80; i++) {
        const sx = (i * 137.5) % W
        const sy = (i * 89.2) % H
        const r = (i % 3) + 0.5
        ctx.beginPath()
        ctx.arc(sx, sy, r, 0, Math.PI * 2)
        ctx.fill()
      }

      // Orbits (ellipses, slightly tilted for depth)
      const tilt = 0.18
      const orbitRotation = 0.35
      ORBITS.forEach((orbit) => {
        const rx = orbit.radius * rxBase
        const ry = orbit.radius * rxBase * (1 - tilt)

        ctx.save()
        ctx.translate(cx, cy)
        ctx.rotate(orbitRotation)
        ctx.beginPath()
        ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2)
        ctx.strokeStyle = orbit.color
        ctx.lineWidth = orbit.width
        ctx.stroke()
        ctx.restore()
      })

      // Sun (center glow + core)
      const sunGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, scale * 0.22)
      sunGrad.addColorStop(0, 'rgba(255, 220, 180, 0.35)')
      sunGrad.addColorStop(0.35, 'rgba(255, 200, 140, 0.15)')
      sunGrad.addColorStop(0.7, 'rgba(200, 160, 120, 0.04)')
      sunGrad.addColorStop(1, 'transparent')
      ctx.fillStyle = sunGrad
      ctx.beginPath()
      ctx.arc(cx, cy, scale * 0.22, 0, Math.PI * 2)
      ctx.fill()

      ctx.beginPath()
      ctx.arc(cx, cy, scale * 0.045, 0, Math.PI * 2)
      const sunCore = ctx.createRadialGradient(cx - 5, cy - 5, 0, cx, cy, scale * 0.045)
      sunCore.addColorStop(0, 'rgba(255, 248, 230, 0.95)')
      sunCore.addColorStop(0.6, 'rgba(255, 230, 180, 0.9)')
      sunCore.addColorStop(1, 'rgba(255, 200, 140, 0.7)')
      ctx.fillStyle = sunCore
      ctx.fill()

      // Planets (same ellipse + rotation as orbits)
      PLANETS.forEach((planet) => {
        const orbit = ORBITS[planet.orbitIndex]
        const a = anglesRef.current[planet.orbitIndex]
        const rx = orbit.radius * rxBase
        const ry = orbit.radius * rxBase * (1 - tilt)
        const px = cx + Math.cos(a) * rx * Math.cos(orbitRotation) - Math.sin(a) * ry * Math.sin(orbitRotation)
        const py = cy + Math.cos(a) * rx * Math.sin(orbitRotation) + Math.sin(a) * ry * Math.cos(orbitRotation)

        ctx.save()
        ctx.translate(px, py)

        if (planet.glow) {
          const g = ctx.createRadialGradient(0, 0, 0, 0, 0, planet.size * 4)
          g.addColorStop(0, planet.glow)
          g.addColorStop(0.5, planet.glow.replace(/[\d.]+\)/, '0)'))
          g.addColorStop(1, 'transparent')
          ctx.fillStyle = g
          ctx.beginPath()
          ctx.arc(0, 0, planet.size * 4, 0, Math.PI * 2)
          ctx.fill()
        }

        ctx.fillStyle = planet.color
        ctx.beginPath()
        ctx.arc(0, 0, planet.size, 0, Math.PI * 2)
        ctx.fill()

        ctx.restore()
      })

      timeRef.current += 0.016
      ORBITS.forEach((orbit, i) => {
        anglesRef.current[i] += orbit.speed
      })

      animationFrameId = requestAnimationFrame(draw)
    }

    resize()
    draw()
    window.addEventListener('resize', resize)

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return <canvas ref={canvasRef} className="solar-system-canvas" aria-hidden />
}

export default SolarSystem
