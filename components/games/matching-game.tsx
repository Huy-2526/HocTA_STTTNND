"use client"

import { useState, useEffect, useCallback } from "react"
import { Star, RotateCcw, Trophy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getAllWords } from "@/lib/vocabulary-data"

interface MatchCard {
  id: string
  content: string
  type: "word" | "image"
  wordId: string
  matched: boolean
  flipped: boolean
}

function shuffleArray<T>(arr: T[]): T[] {
  const shuffled = [...arr]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

function generateCards(): MatchCard[] {
  const allWords = getAllWords()
  const selected = shuffleArray(allWords).slice(0, 6)

  const cards: MatchCard[] = []
  selected.forEach((word) => {
    cards.push({
      id: `word-${word.id}`,
      content: word.word,
      type: "word",
      wordId: word.id,
      matched: false,
      flipped: false,
    })
    cards.push({
      id: `image-${word.id}`,
      content: word.image,
      type: "image",
      wordId: word.id,
      matched: false,
      flipped: false,
    })
  })

  return shuffleArray(cards)
}

export function MatchingGame() {
  const [cards, setCards] = useState<MatchCard[]>([])
  const [selected, setSelected] = useState<string[]>([])
  const [moves, setMoves] = useState(0)
  const [matchedCount, setMatchedCount] = useState(0)
  const [gameWon, setGameWon] = useState(false)

  const resetGame = useCallback(() => {
    setCards(generateCards())
    setSelected([])
    setMoves(0)
    setMatchedCount(0)
    setGameWon(false)
  }, [])

  useEffect(() => {
    resetGame()
  }, [resetGame])

  function handleCardClick(cardId: string) {
    if (selected.length >= 2) return

    const card = cards.find((c) => c.id === cardId)
    if (!card || card.matched || card.flipped) return

    const newCards = cards.map((c) =>
      c.id === cardId ? { ...c, flipped: true } : c
    )
    setCards(newCards)

    const newSelected = [...selected, cardId]
    setSelected(newSelected)

    if (newSelected.length === 2) {
      setMoves((prev) => prev + 1)
      const first = newCards.find((c) => c.id === newSelected[0])!
      const second = newCards.find((c) => c.id === newSelected[1])!

      if (first.wordId === second.wordId) {
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) =>
              c.wordId === first.wordId ? { ...c, matched: true } : c
            )
          )
          setSelected([])
          const newMatched = matchedCount + 1
          setMatchedCount(newMatched)
          if (newMatched === 6) {
            setGameWon(true)
          }
        }, 400)
      } else {
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) =>
              newSelected.includes(c.id) ? { ...c, flipped: false } : c
            )
          )
          setSelected([])
        }, 800)
      }
    }
  }

  if (gameWon) {
    return (
      <div className="text-center py-12">
        <div className="w-24 h-24 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6">
          <Trophy className="w-12 h-12 text-secondary-foreground" />
        </div>
        <h2 className="text-3xl font-bold text-foreground font-[var(--font-display)]">
          Amazing Job!
        </h2>
        <p className="mt-2 text-muted-foreground text-lg">
          You found all matches in {moves} moves!
        </p>
        <div className="flex items-center justify-center gap-1 mt-4">
          {Array.from({ length: Math.max(1, 4 - Math.floor(moves / 4)) }).map((_, i) => (
            <Star key={i} className="w-8 h-8 text-secondary fill-secondary" />
          ))}
        </div>
        <Button
          onClick={resetGame}
          className="mt-8 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 px-8"
          size="lg"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Play Again
        </Button>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="bg-card rounded-2xl border-2 border-border px-4 py-2">
            <span className="text-sm text-muted-foreground">Moves</span>
            <div className="text-xl font-bold text-foreground font-[var(--font-display)]">{moves}</div>
          </div>
          <div className="bg-card rounded-2xl border-2 border-border px-4 py-2">
            <span className="text-sm text-muted-foreground">Matched</span>
            <div className="text-xl font-bold text-primary font-[var(--font-display)]">{matchedCount}/6</div>
          </div>
        </div>
        <Button variant="outline" onClick={resetGame} className="rounded-full" size="sm">
          <RotateCcw className="w-4 h-4 mr-2" />
          New Game
        </Button>
      </div>

      <div className="grid grid-cols-3 md:grid-cols-4 gap-3 md:gap-4">
        {cards.map((card) => (
          <button
            key={card.id}
            onClick={() => handleCardClick(card.id)}
            disabled={card.matched}
            className={`aspect-square rounded-2xl border-2 transition-all duration-300 flex items-center justify-center p-2 cursor-pointer ${
              card.matched
                ? "bg-success/10 border-success/30 scale-95"
                : card.flipped
                  ? "bg-primary/10 border-primary shadow-lg"
                  : "bg-card border-border hover:border-primary/40 hover:shadow-md"
            }`}
          >
            {card.flipped || card.matched ? (
              card.type === "image" ? (
                <span className="text-4xl md:text-5xl">{card.content}</span>
              ) : (
                <span className="text-sm md:text-lg font-bold text-card-foreground font-[var(--font-display)]">
                  {card.content}
                </span>
              )
            ) : (
              <span className="text-3xl md:text-4xl text-muted-foreground/30">?</span>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
