"use client"

import { useState } from "react"
import { Puzzle, Keyboard, HelpCircle, ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MatchingGame } from "@/components/games/matching-game"
import { SpellingGame } from "@/components/games/spelling-game"
import { QuizGame } from "@/components/games/quiz-game"

const games = [
  {
    id: "matching",
    name: "Word Match",
    icon: Puzzle,
    description: "Match the word with the correct picture. Find all the pairs!",
    color: "bg-primary/10 border-primary/30",
    iconColor: "bg-primary text-primary-foreground",
    textColor: "text-primary",
  },
  {
    id: "spelling",
    name: "Spell It Out",
    icon: Keyboard,
    description: "Look at the picture and spell the word by tapping the right letters!",
    color: "bg-accent/10 border-accent/30",
    iconColor: "bg-accent text-accent-foreground",
    textColor: "text-accent",
  },
  {
    id: "quiz",
    name: "Word Quiz",
    icon: HelpCircle,
    description: "Answer fun questions about words you have learned!",
    color: "bg-secondary/20 border-secondary/30",
    iconColor: "bg-secondary text-secondary-foreground",
    textColor: "text-[#B8860B]",
  },
]

export function GameHub() {
  const [activeGame, setActiveGame] = useState<string | null>(null)

  if (activeGame === "matching") {
    return (
      <div>
        <Button variant="ghost" onClick={() => setActiveGame(null)} className="mb-4 text-muted-foreground">
          <ChevronLeft className="w-4 h-4 mr-2" />
          All Games
        </Button>
        <MatchingGame />
      </div>
    )
  }

  if (activeGame === "spelling") {
    return (
      <div>
        <Button variant="ghost" onClick={() => setActiveGame(null)} className="mb-4 text-muted-foreground">
          <ChevronLeft className="w-4 h-4 mr-2" />
          All Games
        </Button>
        <SpellingGame />
      </div>
    )
  }

  if (activeGame === "quiz") {
    return (
      <div>
        <Button variant="ghost" onClick={() => setActiveGame(null)} className="mb-4 text-muted-foreground">
          <ChevronLeft className="w-4 h-4 mr-2" />
          All Games
        </Button>
        <QuizGame />
      </div>
    )
  }

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {games.map((game) => (
        <button
          key={game.id}
          onClick={() => setActiveGame(game.id)}
          className={`text-left p-6 rounded-3xl border-2 ${game.color} hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer`}
        >
          <div className={`w-14 h-14 rounded-2xl ${game.iconColor} flex items-center justify-center mb-4`}>
            <game.icon className="w-7 h-7" />
          </div>
          <h3 className={`text-xl font-bold ${game.textColor} font-[var(--font-display)]`}>
            {game.name}
          </h3>
          <p className="mt-2 text-muted-foreground text-sm leading-relaxed">
            {game.description}
          </p>
        </button>
      ))}
    </div>
  )
}
