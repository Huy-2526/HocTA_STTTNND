import Image from "next/image"
import Link from "next/link"
import { BookOpen, Gamepad2, Camera, ArrowRight } from "lucide-react"

const features = [
  {
    href: "/vocabulary",
    icon: BookOpen,
    title: "Word Explorer",
    description: "Discover new words with colorful flashcards. Learn animals, colors, fruits, and more!",
    image: "/images/vocabulary.jpg",
    color: "bg-primary",
    borderColor: "border-primary/30",
  },
  {
    href: "/games",
    icon: Gamepad2,
    title: "Fun Games",
    description: "Match words, spell letters, and take quizzes. Every game is a new adventure!",
    image: "/images/games-fun.jpg",
    color: "bg-accent",
    borderColor: "border-accent/30",
  },
  {
    href: "/ar",
    icon: Camera,
    title: "AR Magic",
    description: "Point your camera and watch letters and words come alive in the real world!",
    image: "/images/ar-experience.jpg",
    color: "bg-secondary",
    borderColor: "border-secondary/30",
  },
]

export function FeatureCards() {
  return (
    <section className="py-16 md:py-24 bg-muted/50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground font-[var(--font-display)] text-balance">
            Choose Your Adventure
          </h2>
          <p className="mt-3 text-muted-foreground text-lg max-w-md mx-auto">
            Three amazing ways to learn English. Pick one and start exploring!
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature) => (
            <Link
              key={feature.href}
              href={feature.href}
              className={`group bg-card rounded-3xl overflow-hidden border-2 ${feature.borderColor} hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={feature.image}
                  alt={feature.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className={`absolute top-4 left-4 ${feature.color} text-primary-foreground w-10 h-10 rounded-xl flex items-center justify-center`}>
                  <feature.icon className="w-5 h-5" />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-card-foreground font-[var(--font-display)]">
                  {feature.title}
                </h3>
                <p className="mt-2 text-muted-foreground leading-relaxed text-sm">
                  {feature.description}
                </p>
                <div className="mt-4 flex items-center gap-2 text-primary font-semibold text-sm group-hover:gap-3 transition-all">
                  <span>{"Let's Go"}</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
