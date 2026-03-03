import { Navigation } from "@/components/navigation"
import { ARExperience } from "@/components/ar-experience"

export const metadata = {
  title: "AR Fun - LinguaLand",
  description: "Augmented reality English learning - see letters and words come alive!",
}

export default function ARPage() {
  return (
    <div className="min-h-screen bg-background pb-16 md:pb-0">
      <Navigation />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground font-[var(--font-display)]">
            AR Magic
          </h1>
          <p className="mt-2 text-muted-foreground text-lg">
            Use your camera to explore letters and words in the real world!
          </p>
        </div>
        <ARExperience />
      </main>
    </div>
  )
}
