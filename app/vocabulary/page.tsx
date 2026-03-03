import { Navigation } from "@/components/navigation"
import { VocabularyExplorer } from "@/components/vocabulary-explorer"

export const metadata = {
  title: "Word Explorer - LinguaLand",
  description: "Learn new English words with interactive flashcards",
}

export default function VocabularyPage() {
  return (
    <div className="min-h-screen bg-background pb-16 md:pb-0">
      <Navigation />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground font-[var(--font-display)]">
            Word Explorer
          </h1>
          <p className="mt-2 text-muted-foreground text-lg">
            Pick a category and learn new words!
          </p>
        </div>
        <VocabularyExplorer />
      </main>
    </div>
  )
}
