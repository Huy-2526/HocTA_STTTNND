"use client"

import { useState } from "react"
import { Star, Trophy, BookOpen, Gamepad2, Camera, Flame, Target, Award, Lock } from "lucide-react"
import { categories } from "@/lib/vocabulary-data"

const achievements = [
  {
    id: "first-word",
    name: "First Word",
    description: "Learn your first vocabulary word",
    icon: BookOpen,
    color: "bg-primary/10 text-primary border-primary/30",
    earned: true,
  },
  {
    id: "animal-lover",
    name: "Animal Lover",
    description: "Learn all animal words",
    icon: Star,
    color: "bg-accent/10 text-accent border-accent/30",
    earned: true,
  },
  {
    id: "game-starter",
    name: "Game Starter",
    description: "Play your first game",
    icon: Gamepad2,
    color: "bg-secondary/20 text-[#B8860B] border-secondary/30",
    earned: true,
  },
  {
    id: "ar-explorer",
    name: "AR Explorer",
    description: "Capture 5 words in AR mode",
    icon: Camera,
    color: "bg-success/10 text-success border-success/30",
    earned: false,
  },
  {
    id: "spelling-bee",
    name: "Spelling Bee",
    description: "Get 5 spelling words correct in a row",
    icon: Award,
    color: "bg-destructive/10 text-destructive border-destructive/30",
    earned: false,
  },
  {
    id: "quiz-master",
    name: "Quiz Master",
    description: "Score 100% on a quiz",
    icon: Trophy,
    color: "bg-primary/10 text-primary border-primary/30",
    earned: false,
  },
]

const weeklyActivity = [
  { day: "Mon", words: 5, games: 2 },
  { day: "Tue", words: 8, games: 1 },
  { day: "Wed", words: 3, games: 3 },
  { day: "Thu", words: 10, games: 2 },
  { day: "Fri", words: 6, games: 4 },
  { day: "Sat", words: 12, games: 3 },
  { day: "Sun", words: 4, games: 1 },
]

export function ProgressDashboard() {
  const [activeTab, setActiveTab] = useState<"overview" | "badges" | "words">("overview")

  return (
    <div>
      {/* Tabs */}
      <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2">
        {[
          { id: "overview" as const, label: "Overview" },
          { id: "badges" as const, label: "Badges" },
          { id: "words" as const, label: "My Words" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-2.5 rounded-full font-semibold text-sm transition-all whitespace-nowrap ${
              activeTab === tab.id
                ? "bg-primary text-primary-foreground shadow-md"
                : "bg-card border-2 border-border text-muted-foreground hover:bg-muted"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "overview" && <OverviewTab />}
      {activeTab === "badges" && <BadgesTab />}
      {activeTab === "words" && <WordsTab />}
    </div>
  )
}

function OverviewTab() {
  const totalWords = categories.reduce((acc, cat) => acc + cat.words.length, 0)

  return (
    <div className="space-y-6">
      {/* Stats cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          icon={<BookOpen className="w-6 h-6" />}
          label="Words Learned"
          value="24"
          total={`/${totalWords}`}
          color="bg-primary/10 text-primary"
        />
        <StatCard
          icon={<Gamepad2 className="w-6 h-6" />}
          label="Games Played"
          value="12"
          color="bg-accent/10 text-accent"
        />
        <StatCard
          icon={<Flame className="w-6 h-6" />}
          label="Day Streak"
          value="5"
          color="bg-destructive/10 text-destructive"
        />
        <StatCard
          icon={<Target className="w-6 h-6" />}
          label="Accuracy"
          value="82%"
          color="bg-success/10 text-success"
        />
      </div>

      {/* Weekly activity */}
      <div className="bg-card rounded-3xl border-2 border-border p-6">
        <h3 className="text-lg font-bold text-card-foreground font-[var(--font-display)] mb-4">
          This Week
        </h3>
        <div className="flex items-end justify-between gap-2 h-40">
          {weeklyActivity.map((day) => {
            const maxHeight = 120
            const wordsHeight = (day.words / 12) * maxHeight
            const gamesHeight = (day.games / 4) * maxHeight * 0.4

            return (
              <div key={day.day} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full flex flex-col items-center gap-0.5" style={{ height: maxHeight }}>
                  <div className="flex-1" />
                  <div
                    className="w-full max-w-8 bg-primary/20 rounded-t-lg"
                    style={{ height: wordsHeight }}
                  />
                  <div
                    className="w-full max-w-8 bg-accent/30 rounded-b-lg"
                    style={{ height: gamesHeight }}
                  />
                </div>
                <span className="text-xs text-muted-foreground font-semibold">{day.day}</span>
              </div>
            )
          })}
        </div>
        <div className="flex items-center justify-center gap-6 mt-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-primary/20" />
            <span className="text-xs text-muted-foreground">Words</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-accent/30" />
            <span className="text-xs text-muted-foreground">Games</span>
          </div>
        </div>
      </div>

      {/* Category progress */}
      <div className="bg-card rounded-3xl border-2 border-border p-6">
        <h3 className="text-lg font-bold text-card-foreground font-[var(--font-display)] mb-4">
          Category Progress
        </h3>
        <div className="space-y-4">
          {categories.map((cat, i) => {
            const learned = Math.min(cat.words.length, Math.floor(Math.random() * cat.words.length) + 1)
            const percentage = Math.round((learned / cat.words.length) * 100)

            return (
              <div key={cat.id} className="flex items-center gap-4">
                <span className="text-2xl w-8 text-center">{cat.icon}</span>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-semibold text-card-foreground">{cat.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {learned}/{cat.words.length}
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2.5">
                    <div
                      className={`h-2.5 rounded-full transition-all duration-1000 ${
                        i % 4 === 0
                          ? "bg-primary"
                          : i % 4 === 1
                            ? "bg-accent"
                            : i % 4 === 2
                              ? "bg-destructive"
                              : "bg-success"
                      }`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function StatCard({
  icon,
  label,
  value,
  total,
  color,
}: {
  icon: React.ReactNode
  label: string
  value: string
  total?: string
  color: string
}) {
  return (
    <div className="bg-card rounded-2xl border-2 border-border p-4">
      <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center mb-3`}>
        {icon}
      </div>
      <div className="flex items-baseline gap-0.5">
        <span className="text-2xl font-bold text-card-foreground font-[var(--font-display)]">{value}</span>
        {total && <span className="text-sm text-muted-foreground">{total}</span>}
      </div>
      <span className="text-xs text-muted-foreground">{label}</span>
    </div>
  )
}

function BadgesTab() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {achievements.map((achievement) => (
        <div
          key={achievement.id}
          className={`rounded-3xl border-2 p-6 text-center transition-all ${
            achievement.earned
              ? `${achievement.color} shadow-md`
              : "bg-muted/50 border-border opacity-60"
          }`}
        >
          <div
            className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-3 ${
              achievement.earned ? achievement.color : "bg-muted text-muted-foreground"
            }`}
          >
            {achievement.earned ? (
              <achievement.icon className="w-8 h-8" />
            ) : (
              <Lock className="w-8 h-8" />
            )}
          </div>
          <h3 className={`font-bold font-[var(--font-display)] ${achievement.earned ? "" : "text-muted-foreground"}`}>
            {achievement.name}
          </h3>
          <p className="text-xs text-muted-foreground mt-1">{achievement.description}</p>
          {achievement.earned && (
            <div className="mt-2 inline-flex items-center gap-1 bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-xs font-semibold">
              <Star className="w-3 h-3" />
              Earned
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

function WordsTab() {
  return (
    <div className="space-y-6">
      {categories.map((cat) => (
        <div key={cat.id} className="bg-card rounded-3xl border-2 border-border p-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl">{cat.icon}</span>
            <h3 className={`text-lg font-bold font-[var(--font-display)] ${cat.color}`}>
              {cat.name}
            </h3>
            <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
              {cat.words.length} words
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
            {cat.words.map((word) => (
              <div
                key={word.id}
                className="flex items-center gap-2 bg-muted/50 rounded-xl px-3 py-2"
              >
                <span className="text-xl">{word.image}</span>
                <span className="text-sm font-semibold text-card-foreground">{word.word}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
