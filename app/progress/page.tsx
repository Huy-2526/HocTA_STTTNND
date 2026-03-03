import { Navigation } from "@/components/navigation"
import { ProgressDashboard } from "@/components/progress-dashboard"

export const metadata = {
  title: "My Stars - LinguaLand",
  description: "Track your English learning progress and earn rewards!",
}

export default function ProgressPage() {
  return (
    <div className="min-h-screen bg-background pb-16 md:pb-0">
      <Navigation />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground font-[var(--font-display)]">
            My Stars
          </h1>
          <p className="mt-2 text-muted-foreground text-lg">
            See how much you have learned! Keep going!
          </p>
        </div>
        <ProgressDashboard />
      </main>
    </div>
  )
}
