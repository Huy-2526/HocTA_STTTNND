"use client"

import { useState } from "react"
import { categories, type VocabCategory, type VocabWord } from "@/lib/vocabulary-data"
import { Volume2, ArrowLeft, ArrowRight, RotateCcw, ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

function speak(text: string) {
  if (typeof window !== "undefined" && "speechSynthesis" in window) {
    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.rate = 0.7
    utterance.pitch = 1.2
    window.speechSynthesis.speak(utterance)
  }
}

function CategorySelector({
  onSelect,
}: {
  onSelect: (cat: VocabCategory) => void
}) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onSelect(cat)}
          className={`${cat.bgColor} rounded-3xl p-6 text-center border-2 border-transparent hover:border-border transition-all hover:shadow-lg hover:-translate-y-1 cursor-pointer`}
        >
          <div className="text-5xl mb-3">{cat.icon}</div>
          <h3 className={`text-lg font-bold ${cat.color} font-[var(--font-display)]`}>
            {cat.name}
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            {cat.words.length} words
          </p>
        </button>
      ))}
    </div>
  )
}

function Flashcard({ word, flipped, onFlip }: { word: VocabWord; flipped: boolean; onFlip: () => void }) {
  return (
    <div
      className="perspective-1000 cursor-pointer mx-auto"
      style={{ width: "100%", maxWidth: 400, height: 320 }}
      onClick={onFlip}
    >
      <div
        className="relative w-full h-full transition-transform duration-500"
        style={{
          transformStyle: "preserve-3d",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 bg-card rounded-3xl border-2 border-border shadow-xl flex flex-col items-center justify-center p-8"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="text-8xl mb-4">{word.image}</div>
          <div className="text-3xl font-bold text-card-foreground font-[var(--font-display)]">
            {word.word}
          </div>
          <div className="text-sm text-muted-foreground mt-2">
            Tap to see more
          </div>
        </div>
        {/* Back */}
        <div
          className="absolute inset-0 bg-primary rounded-3xl shadow-xl flex flex-col items-center justify-center p-8"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <div className="text-5xl mb-3 opacity-80">{word.image}</div>
          <div className="text-2xl font-bold text-primary-foreground font-[var(--font-display)]">
            {word.word}
          </div>
          <div className="text-primary-foreground/70 text-sm mt-1">
            {word.phonetic}
          </div>
          <div className="mt-4 bg-primary-foreground/20 rounded-2xl px-4 py-3 text-primary-foreground text-center">
            <span className="text-sm font-medium">{`"${word.sentence}"`}</span>
          </div>
          <div className="text-xs text-primary-foreground/60 mt-3">Tap to flip back</div>
        </div>
      </div>
    </div>
  )
}

function FlashcardViewer({
  category,
  onBack,
}: {
  category: VocabCategory
  onBack: () => void
}) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const word = category.words[currentIndex]

  function goNext() {
    setFlipped(false)
    setCurrentIndex((prev) => (prev + 1) % category.words.length)
  }

  function goPrev() {
    setFlipped(false)
    setCurrentIndex((prev) => (prev - 1 + category.words.length) % category.words.length)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <Button
          variant="ghost"
          onClick={onBack}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
        >
          <ChevronLeft className="w-4 h-4" />
          All Categories
        </Button>
        <div className="flex items-center gap-2">
          <span className="text-6xl">{category.icon}</span>
          <span className="font-bold text-foreground font-[var(--font-display)]">{category.name}</span>
        </div>
        <div className="text-sm text-muted-foreground font-medium">
          {currentIndex + 1} / {category.words.length}
        </div>
      </div>

      {/* Progress dots */}
      <div className="flex items-center justify-center gap-2 mb-6">
        {category.words.map((_, i) => (
          <button
            key={i}
            onClick={() => { setFlipped(false); setCurrentIndex(i) }}
            className={`w-3 h-3 rounded-full transition-all ${i === currentIndex ? "bg-primary scale-125" : "bg-border hover:bg-muted-foreground/40"}`}
            aria-label={`Go to word ${i + 1}`}
          />
        ))}
      </div>

      <Flashcard word={word} flipped={flipped} onFlip={() => setFlipped(!flipped)} />

      <div className="flex items-center justify-center gap-4 mt-8">
        <Button
          variant="outline"
          size="lg"
          onClick={goPrev}
          className="rounded-full w-12 h-12 p-0"
          aria-label="Previous word"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <Button
          size="lg"
          onClick={() => speak(`${word.word}. ${word.sentence}`)}
          className="rounded-full bg-accent text-accent-foreground hover:bg-accent/90 px-6"
          aria-label={`Listen to ${word.word}`}
        >
          <Volume2 className="w-5 h-5 mr-2" />
          Listen
        </Button>
        <Button
          variant="outline"
          size="lg"
          onClick={() => { setFlipped(false) }}
          className="rounded-full w-12 h-12 p-0"
          aria-label="Reset card"
        >
          <RotateCcw className="w-5 h-5" />
        </Button>
        <Button
          variant="outline"
          size="lg"
          onClick={goNext}
          className="rounded-full w-12 h-12 p-0"
          aria-label="Next word"
        >
          <ArrowRight className="w-5 h-5" />
        </Button>
      </div>

      {/* Word grid below */}
      <div className="mt-10">
        <h3 className="text-lg font-bold text-foreground font-[var(--font-display)] mb-4">
          All {category.name} Words
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {category.words.map((w, i) => (
            <button
              key={w.id}
              onClick={() => { setCurrentIndex(i); setFlipped(false); speak(w.word) }}
              className={`flex items-center gap-3 p-3 rounded-2xl border-2 transition-all cursor-pointer ${
                i === currentIndex
                  ? "bg-primary/10 border-primary"
                  : "bg-card border-border hover:border-primary/40"
              }`}
            >
              <span className="text-2xl">{w.image}</span>
              <span className="font-semibold text-card-foreground text-sm">{w.word}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export function VocabularyExplorer() {
  const [selectedCategory, setSelectedCategory] = useState<VocabCategory | null>(null)

  if (selectedCategory) {
    return (
      <FlashcardViewer
        category={selectedCategory}
        onBack={() => setSelectedCategory(null)}
      />
    )
  }

  return <CategorySelector onSelect={setSelectedCategory} />
}
