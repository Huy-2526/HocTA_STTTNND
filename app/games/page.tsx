import { Navigation } from "@/components/navigation"
import { GameHub } from "@/components/game-hub"

export const metadata = {
  title: "Fun Games - LinguaLand",
  description: "Play fun English learning games - matching, spelling, and quizzes!",
}

export default function GamesPage() {
  return (
    <div className="min-h-screen bg-background pb-16 md:pb-0">
      <Navigation />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground font-[var(--font-display)]">
            Game Zone
          </h1>
          <p className="mt-2 text-muted-foreground text-lg">
            Learn while you play! Pick a game and have fun.
          </p>
        </div>
        <GameHub />
      </main>
    </div>
  )
}
