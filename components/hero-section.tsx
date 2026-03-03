"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Sparkles, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const floatingLetters = ["A", "B", "C", "D", "E"]
const letterColors = ["bg-primary", "bg-accent", "bg-secondary", "bg-destructive", "bg-success"]

export function HeroSection() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section className="relative overflow-hidden bg-background pb-16 pt-8 md:pt-12 md:pb-24">
      {/* Floating letters decoration */}
      {mounted && floatingLetters.map((letter, i) => (
        <div
          key={letter}
          className={`absolute ${letterColors[i]} text-primary-foreground w-12 h-12 md:w-16 md:h-16 rounded-2xl flex items-center justify-center font-bold text-2xl md:text-3xl font-[var(--font-display)] opacity-20 animate-bounce`}
          style={{
            top: `${15 + i * 15}%`,
            left: i % 2 === 0 ? `${5 + i * 3}%` : undefined,
            right: i % 2 !== 0 ? `${5 + i * 3}%` : undefined,
            animationDelay: `${i * 0.3}s`,
            animationDuration: `${2 + i * 0.5}s`,
          }}
        >
          {letter}
        </div>
      ))}

      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <Sparkles className="w-4 h-4" />
              <span>Class 1 English Adventure</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight text-balance font-[var(--font-display)]">
              Learn English the{" "}
              <span className="text-primary">Fun</span> Way!
            </h1>

            <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-lg mx-auto lg:mx-0 leading-relaxed">
              Explore words, play games, and discover letters in the real world with AR magic. Your English adventure starts here!
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 mt-8 justify-center lg:justify-start">
              <Link href="/vocabulary">
                <Button size="lg" className="rounded-full text-lg px-8 py-6 font-bold bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/30">
                  Start Learning
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link href="/games">
                <Button variant="outline" size="lg" className="rounded-full text-lg px-8 py-6 font-bold border-2 border-accent text-accent hover:bg-accent hover:text-accent-foreground">
                  Play Games
                </Button>
              </Link>
            </div>

            <div className="flex items-center gap-6 mt-8 justify-center lg:justify-start">
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground font-[var(--font-display)]">100+</div>
                <div className="text-sm text-muted-foreground">Words</div>
              </div>
              <div className="w-px h-8 bg-border" />
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground font-[var(--font-display)]">5</div>
                <div className="text-sm text-muted-foreground">Games</div>
              </div>
              <div className="w-px h-8 bg-border" />
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground font-[var(--font-display)]">AR</div>
                <div className="text-sm text-muted-foreground">Experience</div>
              </div>
            </div>
          </div>

          <div className="flex-1 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-primary/20 border-4 border-card">
              <Image
                src="/images/hero-kids.jpg"
                alt="Happy children learning English with colorful letters"
                width={600}
                height={450}
                className="w-full h-auto object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
