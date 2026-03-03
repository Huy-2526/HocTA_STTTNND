"use client"

import { useState } from "react"
import Link from "next/link"
import { BookOpen, Gamepad2, Camera, Trophy, Menu, X, Home } from "lucide-react"
import { Button } from "@/components/ui/button"

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/vocabulary", label: "Words", icon: BookOpen },
  { href: "/games", label: "Games", icon: Gamepad2 },
  { href: "/ar", label: "AR Fun", icon: Camera },
  { href: "/progress", label: "My Stars", icon: Trophy },
]

export function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <>
      <header className="sticky top-0 z-50 bg-card/90 backdrop-blur-md border-b border-border">
        <nav className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xl font-[var(--font-display)]">L</span>
            </div>
            <span className="text-xl font-bold text-foreground font-[var(--font-display)] hidden sm:block">
              LinguaLand
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-muted-foreground hover:bg-muted hover:text-foreground transition-colors font-semibold text-sm"
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </Link>
            ))}
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </nav>

        {mobileOpen && (
          <div className="md:hidden border-t border-border bg-card px-4 pb-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:bg-muted hover:text-foreground transition-colors font-semibold"
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </header>

      {/* Bottom nav for mobile */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border">
        <div className="flex items-center justify-around py-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-col items-center gap-1 px-3 py-1 text-muted-foreground hover:text-primary transition-colors"
            >
              <item.icon className="w-5 h-5" />
              <span className="text-[10px] font-semibold">{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}
