"use client"

import { Bot } from "lucide-react"
import { ThemeToggle } from "./theme-toggle"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 glass backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary text-primary-foreground">
            <Bot className="h-5 w-5" />
          </div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            AI Playground
          </h1>
        </div>

        <div className="flex items-center gap-4">
          <nav className="hidden md:flex items-center gap-6">
            <a
              href="#models"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Models
            </a>
            <a
              href="#history"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              History
            </a>
            <a
              href="#templates"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Templates
            </a>
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
