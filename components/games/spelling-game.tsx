"use client"

import { useState, useEffect, useCallback } from "react"
import { Star, RotateCcw, ArrowRight, Volume2, Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getAllWords, type VocabWord } from "@/lib/vocabulary-data"

function shuffleArray<T>(arr: T[]): T[] {
  const shuffled = [...arr]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

function generateExtraLetters(word: string): string[] {
  const letters = word.toUpperCase().split("")
  const extraChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  const extras: string[] = []

  while (extras.length < Math.min(4, 8 - letters.length)) {
    const char = extraChars[Math.floor(Math.random() * extraChars.length)]
    if (!letters.includes(char) && !extras.includes(char)) {
      extras.push(char)
    }
  }

  return shuffleArray([...letters, ...extras])
}

function speak(text: string) {
  if (typeof window !== "undefined" && "speechSynthesis" in window) {
    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.rate = 0.7
    utterance.pitch = 1.2
    window.speechSynthesis.speak(utterance)
  }
}

export function SpellingGame() {
  const [words, setWords] = useState<VocabWord[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [availableLetters, setAvailableLetters] = useState<string[]>([])
  const [selectedLetters, setSelectedLetters] = useState<string[]>([])
  const [usedIndices, setUsedIndices] = useState<number[]>([])
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState<"correct" | "wrong" | null>(null)
  const [gameOver, setGameOver] = useState(false)

  const setupWord = useCallback((word: VocabWord) => {
    setAvailableLetters(generateExtraLetters(word.word))
    setSelectedLetters([])
    setUsedIndices([])
    setShowResult(null)
  }, [])

  const resetGame = useCallback(() => {
    const allWords = getAllWords()
    const selected = shuffleArray(allWords).slice(0, 5)
    setWords(selected)
    setCurrentIndex(0)
    setScore(0)
    setGameOver(false)
    if (selected.length > 0) {
      setupWord(selected[0])
    }
  }, [setupWord])

  useEffect(() => {
    resetGame()
  }, [resetGame])

  const currentWord = words[currentIndex]

  function handleLetterClick(letter: string, index: number) {
    if (showResult || usedIndices.includes(index)) return
    setSelectedLetters((prev) => [...prev, letter])
    setUsedIndices((prev) => [...prev, index])
  }

  function handleRemoveLetter(index: number) {
    if (showResult) return
    const removedLetter = selectedLetters[index]
    const letterIndex = usedIndices.find(
      (ui) => availableLetters[ui] === removedLetter && !usedIndices.slice(0, index).some((prev) => availableLetters[prev] === removedLetter && prev === ui)
    )

    setSelectedLetters((prev) => prev.filter((_, i) => i !== index))
    if (letterIndex !== undefined) {
      setUsedIndices((prev) => prev.filter((ui) => ui !== letterIndex))
    }
  }

  function checkAnswer() {
    const answer = selectedLetters.join("")
    const correct = currentWord.word.toUpperCase()

    if (answer === correct) {
      setShowResult("correct")
      setScore((prev) => prev + 1)
      speak("Correct! " + currentWord.word)
    } else {
      setShowResult("wrong")
      speak("Try again!")
    }
  }

  function nextWord() {
    if (currentIndex + 1 >= words.length) {
      setGameOver(true)
    } else {
      const next = currentIndex + 1
      setCurrentIndex(next)
      setupWord(words[next])
    }
  }

  if (!currentWord) return null

  if (gameOver) {
    return (
      <div className="text-center py-12">
        <div className="w-24 h-24 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6">
          <Star className="w-12 h-12 text-secondary-foreground fill-secondary-foreground" />
        </div>
        <h2 className="text-3xl font-bold text-foreground font-[var(--font-display)]">
          Great Spelling!
        </h2>
        <p className="mt-2 text-muted-foreground text-lg">
          You spelled {score} out of {words.length} words correctly!
        </p>
        <div className="flex items-center justify-center gap-1 mt-4">
          {Array.from({ length: score }).map((_, i) => (
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
    <div className="max-w-lg mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="bg-card rounded-2xl border-2 border-border px-4 py-2">
          <span className="text-sm text-muted-foreground">Word</span>
          <div className="text-xl font-bold text-foreground font-[var(--font-display)]">
            {currentIndex + 1}/{words.length}
          </div>
        </div>
        <div className="bg-card rounded-2xl border-2 border-border px-4 py-2">
          <span className="text-sm text-muted-foreground">Score</span>
          <div className="text-xl font-bold text-primary font-[var(--font-display)]">{score}</div>
        </div>
      </div>

      {/* Word to spell */}
      <div className="bg-card rounded-3xl border-2 border-border p-8 text-center mb-6">
        <div className="text-7xl mb-4">{currentWord.image}</div>
        <button
          onClick={() => speak(currentWord.word)}
          className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
        >
          <Volume2 className="w-5 h-5" />
          <span className="text-sm font-semibold">Listen</span>
        </button>
      </div>

      {/* Answer slots */}
      <div className="flex items-center justify-center gap-2 mb-6">
        {currentWord.word.split("").map((_, i) => (
          <button
            key={i}
            onClick={() => selectedLetters[i] && handleRemoveLetter(i)}
            className={`w-12 h-14 md:w-14 md:h-16 rounded-xl border-2 flex items-center justify-center text-xl font-bold font-[var(--font-display)] transition-all ${
              selectedLetters[i]
                ? showResult === "correct"
                  ? "bg-success/20 border-success text-success"
                  : showResult === "wrong"
                    ? "bg-destructive/20 border-destructive text-destructive"
                    : "bg-primary/10 border-primary text-primary"
                : "bg-muted border-border text-muted-foreground"
            }`}
          >
            {selectedLetters[i] || "_"}
          </button>
        ))}
      </div>

      {/* Result indicator */}
      {showResult && (
        <div
          className={`text-center mb-4 flex items-center justify-center gap-2 ${
            showResult === "correct" ? "text-success" : "text-destructive"
          }`}
        >
          {showResult === "correct" ? (
            <>
              <Check className="w-5 h-5" />
              <span className="font-bold">Correct!</span>
            </>
          ) : (
            <>
              <X className="w-5 h-5" />
              <span className="font-bold">
                The word is: {currentWord.word}
              </span>
            </>
          )}
        </div>
      )}

      {/* Available letters */}
      {!showResult && (
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
          {availableLetters.map((letter, i) => (
            <button
              key={i}
              onClick={() => handleLetterClick(letter, i)}
              disabled={usedIndices.includes(i)}
              className={`w-12 h-12 md:w-14 md:h-14 rounded-xl border-2 font-bold text-lg font-[var(--font-display)] transition-all ${
                usedIndices.includes(i)
                  ? "bg-muted/50 border-border/50 text-muted-foreground/30"
                  : "bg-card border-border text-card-foreground hover:bg-primary/10 hover:border-primary cursor-pointer active:scale-95"
              }`}
            >
              {letter}
            </button>
          ))}
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-center gap-3">
        {!showResult ? (
          <>
            <Button
              variant="outline"
              onClick={() => { setSelectedLetters([]); setUsedIndices([]) }}
              className="rounded-full"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Clear
            </Button>
            <Button
              onClick={checkAnswer}
              disabled={selectedLetters.length !== currentWord.word.length}
              className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 px-8"
            >
              Check
            </Button>
          </>
        ) : (
          <Button
            onClick={nextWord}
            className="rounded-full bg-accent text-accent-foreground hover:bg-accent/90 px-8"
          >
            Next Word
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        )}
      </div>
    </div>
  )
}
