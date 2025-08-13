"use client"

import { useEffect, useRef } from "react"

interface Vector2D {
  x: number
  y: number
}

class Particle {
  pos: Vector2D = { x: 0, y: 0 }
  vel: Vector2D = { x: 0, y: 0 }
  acc: Vector2D = { x: 0, y: 0 }
  target: Vector2D = { x: 0, y: 0 }

  closeEnoughTarget = 100
  maxSpeed = 1.0
  maxForce = 0.1
  particleSize = 10
  isKilled = false

  startColor = { r: 0, g: 0, b: 0 }
  targetColor = { r: 0, g: 0, b: 0 }
  colorWeight = 0
  colorBlendRate = 0.01

  move() {
    let proximityMult = 1
    const distance = Math.hypot(this.pos.x - this.target.x, this.pos.y - this.target.y)
    if (distance < this.closeEnoughTarget) {
      proximityMult = distance / this.closeEnoughTarget
    }

    const towardsTarget = {
      x: this.target.x - this.pos.x,
      y: this.target.y - this.pos.y,
    }

    const magnitude = Math.hypot(towardsTarget.x, towardsTarget.y)
    if (magnitude > 0) {
      towardsTarget.x = (towardsTarget.x / magnitude) * this.maxSpeed * proximityMult
      towardsTarget.y = (towardsTarget.y / magnitude) * this.maxSpeed * proximityMult
    }

    const steer = {
      x: towardsTarget.x - this.vel.x,
      y: towardsTarget.y - this.vel.y,
    }

    const steerMagnitude = Math.hypot(steer.x, steer.y)
    if (steerMagnitude > 0) {
      steer.x = (steer.x / steerMagnitude) * this.maxForce
      steer.y = (steer.y / steerMagnitude) * this.maxForce
    }

    this.acc.x += steer.x
    this.acc.y += steer.y

    this.vel.x += this.acc.x
    this.vel.y += this.acc.y
    this.pos.x += this.vel.x
    this.pos.y += this.vel.y
    this.acc.x = 0
    this.acc.y = 0
  }

  draw(ctx: CanvasRenderingContext2D, drawAsPoints: boolean) {
    if (this.colorWeight < 1.0) {
      this.colorWeight = Math.min(this.colorWeight + this.colorBlendRate, 1.0)
    }

    const currentColor = {
      r: Math.round(this.startColor.r + (this.targetColor.r - this.startColor.r) * this.colorWeight),
      g: Math.round(this.startColor.g + (this.targetColor.g - this.startColor.g) * this.colorWeight),
      b: Math.round(this.startColor.b + (this.targetColor.b - this.startColor.b) * this.colorWeight),
    }

    ctx.fillStyle = `rgb(${currentColor.r}, ${currentColor.g}, ${currentColor.b})`

    if (drawAsPoints) {
      ctx.fillRect(this.pos.x, this.pos.y, 2, 2)
    } else {
      ctx.beginPath()
      ctx.arc(this.pos.x, this.pos.y, this.particleSize / 2, 0, Math.PI * 2)
      ctx.fill()
    }
  }

  kill(width: number, height: number) {
    if (!this.isKilled) {
      const randomPos = this.generateRandomPos(width / 2, height / 2, (width + height) / 2)
      this.target.x = randomPos.x
      this.target.y = randomPos.y

      this.startColor = {
        r: this.startColor.r + (this.targetColor.r - this.startColor.r) * this.colorWeight,
        g: this.startColor.g + (this.targetColor.g - this.startColor.g) * this.colorWeight,
        b: this.startColor.b + (this.targetColor.b - this.startColor.b) * this.colorWeight,
      }
      this.targetColor = { r: 0, g: 0, b: 0 }
      this.colorWeight = 0
      this.isKilled = true
    }
  }

  public generateRandomPos(x: number, y: number, mag: number): Vector2D {
    const randomX = Math.random() * 1000
    const randomY = Math.random() * 500

    const direction = { x: randomX - x, y: randomY - y }
    const magnitude = Math.hypot(direction.x, direction.y)

    if (magnitude > 0) {
      direction.x = (direction.x / magnitude) * mag
      direction.y = (direction.y / magnitude) * mag
    }

    return { x: x + direction.x, y: y + direction.y }
  }
}

const DEFAULT_WORDS = [
  "WHERE LIMITS END",
  "OUR STRATEGY BEGINS",
    "WE DON'T FOLLOW ",
    "TRENDS",
  "WE BUILD LEGACIES",
  "WE ARE THE SYSTEM",
  "BEHIND SUCCESS",
    "YOUR BRAND'S ",
    "TURNING POINT",
  "BEGINS HERE",
  "NOT A COMPANY",
  "AN EMPIRE IN MOTION",
  "THIS IS",
  "THE AETHON GROUP"
]

export function ParticleTextEffect({ words = DEFAULT_WORDS }: { words?: string[] }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const animationRef = useRef<number>()
  const frameCountRef = useRef(0)
  const wordIndexRef = useRef(0)
  const mouseRef = useRef({ x: 0, y: 0, isPressed: false, isRightClick: false })

  const pixelSteps = 6
  const drawAsPoints = true

  const nextWord = (word: string, canvas: HTMLCanvasElement) => {
    const offscreen = document.createElement("canvas")
    offscreen.width = canvas.width
    offscreen.height = canvas.height
    const ctx = offscreen.getContext("2d")!

    // 🔁 Dynamically scale font
    const fontSize = Math.min(canvas.width / 10, 120)
    ctx.font = `bold ${fontSize}px Arial`
    ctx.fillStyle = "white"
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.fillText(word, canvas.width / 2, canvas.height / 2)

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    const pixels = imageData.data

    const newColor = {
      r: Math.random() * 255,
      g: Math.random() * 255,
      b: Math.random() * 255,
    }

    const particles = particlesRef.current
    let index = 0

    const coords: number[] = []
    for (let i = 0; i < pixels.length; i += pixelSteps * 4) coords.push(i)

    coords.sort(() => Math.random() - 0.5)

    for (const i of coords) {
      const alpha = pixels[i + 3]
      if (alpha > 0) {
        const x = (i / 4) % canvas.width
        const y = Math.floor(i / 4 / canvas.width)

        let p: Particle
        if (index < particles.length) {
          p = particles[index++]
          p.isKilled = false
        } else {
          p = new Particle()
          const r = p.generateRandomPos(canvas.width / 2, canvas.height / 2, (canvas.width + canvas.height) / 2)
          p.pos = { x: r.x, y: r.y }
          p.maxSpeed = Math.random() * 6 + 4
          p.maxForce = p.maxSpeed * 0.05
          p.particleSize = Math.random() * 6 + 6
          p.colorBlendRate = Math.random() * 0.0275 + 0.0025
          particles.push(p)
        }

        p.startColor = {
          r: p.startColor.r + (p.targetColor.r - p.startColor.r) * p.colorWeight,
          g: p.startColor.g + (p.targetColor.g - p.startColor.g) * p.colorWeight,
          b: p.startColor.b + (p.targetColor.b - p.startColor.b) * p.colorWeight,
        }
        p.targetColor = newColor
        p.colorWeight = 0
        p.target = { x, y }
      }
    }

    for (let i = index; i < particles.length; i++) {
      particles[i].kill(canvas.width, canvas.height)
    }
  }

  const animate = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")!
    ctx.fillStyle = "rgba(0, 0, 0, 0.1)"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    const particles = particlesRef.current
    particles.forEach((p) => {
      p.move()
      p.draw(ctx, drawAsPoints)
    })

    if (mouseRef.current.isPressed && mouseRef.current.isRightClick) {
      particles.forEach((p) => {
        const d = Math.hypot(p.pos.x - mouseRef.current.x, p.pos.y - mouseRef.current.y)
        if (d < 50) p.kill(canvas.width, canvas.height)
      })
    }

    frameCountRef.current++
    if (frameCountRef.current % 240 === 0) {
      wordIndexRef.current = (wordIndexRef.current + 1) % words.length
      nextWord(words[wordIndexRef.current], canvas)
    }

    animationRef.current = requestAnimationFrame(animate)
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = Math.floor(window.innerHeight * 0.9)
      nextWord(words[wordIndexRef.current], canvas)
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    animate()

    // Cleanup
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return (
    <div className="w-full bg-black px-4 py-8">
      <canvas
        ref={canvasRef}
        className="w-full h-auto max-w-full block"
        style={{ aspectRatio: '16/9' }}
      />
    </div>
  )
}
