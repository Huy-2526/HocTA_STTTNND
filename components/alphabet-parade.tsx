"use client"

import { useState } from "react"
import { Volume2 } from "lucide-react"

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")

const letterWords: Record<string, { word: string; emoji: string }> = {
  A: { word: "Apple", emoji: "apple" },
  B: { word: "Ball", emoji: "ball" },
  C: { word: "Cat", emoji: "cat" },
  D: { word: "Dog", emoji: "dog" },
  E: { word: "Egg", emoji: "egg" },
  F: { word: "Fish", emoji: "fish" },
  G: { word: "Grapes", emoji: "grapes" },
  H: { word: "Hat", emoji: "hat" },
  I: { word: "Ice cream", emoji: "ice cream" },
  J: { word: "Jar", emoji: "jar" },
  K: { word: "Kite", emoji: "kite" },
  L: { word: "Lion", emoji: "lion" },
  M: { word: "Moon", emoji: "moon" },
  N: { word: "Nest", emoji: "nest" },
  O: { word: "Orange", emoji: "orange" },
  P: { word: "Pen", emoji: "pen" },
  Q: { word: "Queen", emoji: "queen" },
  R: { word: "Rain", emoji: "rain" },
  S: { word: "Sun", emoji: "sun" },
  T: { word: "Tree", emoji: "tree" },
  U: { word: "Umbrella", emoji: "umbrella" },
  V: { word: "Van", emoji: "van" },
  W: { word: "Water", emoji: "water" },
  X: { word: "Xylophone", emoji: "xylophone" },
  Y: { word: "Yarn", emoji: "yarn" },
  Z: { word: "Zebra", emoji: "zebra" },
}

const bgColors = [
  "bg-primary/10 hover:bg-primary/20 border-primary/30",
  "bg-accent/10 hover:bg-accent/20 border-accent/30",
  "bg-secondary/10 hover:bg-secondary/20 border-secondary/30",
  "bg-destructive/10 hover:bg-destructive/20 border-destructive/30",
  "bg-success/10 hover:bg-success/20 border-success/30",
]

const textColors = [
  "text-primary",
  "text-accent",
  "text-[#B8860B]",
  "text-destructive",
  "text-success",
]

export function AlphabetParade() {
  const [activeLetter, setActiveLetter] = useState<string | null>(null)

  function speak(text: string) {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.rate = 0.8
      utterance.pitch = 1.2
      window.speechSynthesis.speak(utterance)
    }
  }

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground font-[var(--font-display)] text-balance">
            The Alphabet Parade
          </h2>
          <p className="mt-3 text-muted-foreground text-lg">
            Tap any letter to hear it and learn a word!
          </p>
        </div>

        <div className="grid grid-cols-5 sm:grid-cols-7 md:grid-cols-9 lg:grid-cols-13 gap-3">
          {alphabet.map((letter, i) => {
            const colorIndex = i % 5
            return (
              <button
                key={letter}
                onClick={() => {
                  setActiveLetter(letter)
                  speak(`${letter}. ${letter} for ${letterWords[letter].word}`)
                }}
                className={`relative aspect-square rounded-2xl border-2 ${bgColors[colorIndex]} flex flex-col items-center justify-center cursor-pointer transition-all duration-200 hover:scale-105 active:scale-95 ${activeLetter === letter ? "ring-2 ring-ring scale-105 shadow-lg" : ""}`}
              >
                <span className={`text-2xl md:text-3xl font-bold ${textColors[colorIndex]} font-[var(--font-display)]`}>
                  {letter}
                </span>
              </button>
            )
          })}
        </div>

        {activeLetter && (
          <div className="mt-8 text-center bg-card rounded-3xl p-6 border-2 border-border max-w-sm mx-auto shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="text-6xl font-bold text-primary font-[var(--font-display)] mb-2">
              {activeLetter}
            </div>
            <div className="text-xl font-semibold text-card-foreground">
              {activeLetter} for {letterWords[activeLetter].word}
            </div>
            <button
              onClick={() => speak(`${activeLetter}. ${activeLetter} for ${letterWords[activeLetter].word}`)}
              className="mt-3 inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
              aria-label={`Listen to ${activeLetter}`}
            >
              <Volume2 className="w-5 h-5" />
              <span className="text-sm font-semibold">Listen Again</span>
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
