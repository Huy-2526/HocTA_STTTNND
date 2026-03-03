"use client"

import { useState, useEffect, useCallback } from "react"
import { Star, RotateCcw, ArrowRight, Check, X } from "lucide-react"
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

interface QuizQuestion {
  word: VocabWord
  options: VocabWord[]
  correctIndex: number
}

function generateQuiz(): QuizQuestion[] {
  const allWords = getAllWords()
  const selected = shuffleArray(allWords).slice(0, 8)

  return selected.map((word) => {
    const wrongOptions = shuffleArray(
      allWords.filter((w) => w.id !== word.id)
    ).slice(0, 3)
    const options = shuffleArray([word, ...wrongOptions])
    const correctIndex = options.findIndex((o) => o.id === word.id)
    return { word, options, correctIndex }
  })
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

export function QuizGame() {
  const [questions, setQuestions] = useState<QuizQuestion[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(false)

  const resetGame = useCallback(() => {
    setQuestions(generateQuiz())
    setCurrentIndex(0)
    setSelectedAnswer(null)
    setScore(0)
    setGameOver(false)
  }, [])

  useEffect(() => {
    resetGame()
  }, [resetGame])

  const question = questions[currentIndex]

  function handleAnswer(index: number) {
    if (selectedAnswer !== null) return
    setSelectedAnswer(index)

    if (index === question.correctIndex) {
      setScore((prev) => prev + 1)
      speak("Correct!")
    } else {
      speak("Oops! The answer is " + question.word.word)
    }
  }

  function nextQuestion() {
    if (currentIndex + 1 >= questions.length) {
      setGameOver(true)
    } else {
      setCurrentIndex((prev) => prev + 1)
      setSelectedAnswer(null)
    }
  }

  if (!question) return null

  if (gameOver) {
    const stars = Math.max(1, Math.round((score / questions.length) * 5))
    return (
      <div className="text-center py-12">
        <div className="w-24 h-24 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6">
          <Star className="w-12 h-12 text-secondary-foreground fill-secondary-foreground" />
        </div>
        <h2 className="text-3xl font-bold text-foreground font-[var(--font-display)]">
          Quiz Complete!
        </h2>
        <p className="mt-2 text-muted-foreground text-lg">
          You got {score} out of {questions.length} correct!
        </p>
        <div className="flex items-center justify-center gap-1 mt-4">
          {Array.from({ length: stars }).map((_, i) => (
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
      {/* Progress */}
      <div className="flex items-center justify-between mb-6">
        <div className="bg-card rounded-2xl border-2 border-border px-4 py-2">
          <span className="text-sm text-muted-foreground">Question</span>
          <div className="text-xl font-bold text-foreground font-[var(--font-display)]">
            {currentIndex + 1}/{questions.length}
          </div>
        </div>
        <div className="bg-card rounded-2xl border-2 border-border px-4 py-2">
          <span className="text-sm text-muted-foreground">Score</span>
          <div className="text-xl font-bold text-primary font-[var(--font-display)]">{score}</div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-muted rounded-full h-3 mb-8">
        <div
          className="bg-primary h-3 rounded-full transition-all duration-500"
          style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
        />
      </div>

      {/* Question */}
      <div className="bg-card rounded-3xl border-2 border-border p-8 text-center mb-6">
        <p className="text-muted-foreground text-sm mb-3">Which word matches this picture?</p>
        <div className="text-8xl mb-2">{question.word.image}</div>
      </div>

      {/* Options */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        {question.options.map((option, i) => {
          let style = "bg-card border-border hover:border-primary/40 hover:bg-primary/5 text-card-foreground"

          if (selectedAnswer !== null) {
            if (i === question.correctIndex) {
              style = "bg-success/10 border-success text-success"
            } else if (i === selectedAnswer) {
              style = "bg-destructive/10 border-destructive text-destructive"
            } else {
              style = "bg-muted/50 border-border/50 text-muted-foreground/50"
            }
          }

          return (
            <button
              key={i}
              onClick={() => handleAnswer(i)}
              disabled={selectedAnswer !== null}
              className={`p-4 rounded-2xl border-2 transition-all text-lg font-bold font-[var(--font-display)] cursor-pointer ${style}`}
            >
              <div className="flex items-center justify-between">
                <span>{option.word}</span>
                {selectedAnswer !== null && i === question.correctIndex && (
                  <Check className="w-5 h-5" />
                )}
                {selectedAnswer === i && i !== question.correctIndex && (
                  <X className="w-5 h-5" />
                )}
              </div>
            </button>
          )
        })}
      </div>

      {/* Next */}
      {selectedAnswer !== null && (
        <div className="text-center">
          <Button
            onClick={nextQuestion}
            className="rounded-full bg-accent text-accent-foreground hover:bg-accent/90 px-8"
          >
            {currentIndex + 1 >= questions.length ? "See Results" : "Next Question"}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      )}
    </div>
  )
}
