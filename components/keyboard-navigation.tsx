"use client"

import { useEffect } from "react"

export function KeyboardNavigation() {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Global keyboard shortcuts
      if (event.ctrlKey || event.metaKey) {
        switch (event.key) {
          case "k":
            event.preventDefault()
            // Focus search input if available
            const searchInput = document.querySelector('input[placeholder*="Search"]') as HTMLInputElement
            if (searchInput) {
              searchInput.focus()
            }
            break
          case "Enter":
            // Submit form or run prompt
            if (event.target instanceof HTMLTextAreaElement) {
              event.preventDefault()
              const runButton = document.querySelector('button[aria-label*="Run"]') as HTMLButtonElement
              if (runButton && !runButton.disabled) {
                runButton.click()
              }
            }
            break
          case "/":
            event.preventDefault()
            // Focus prompt editor
            const promptEditor = document.querySelector('textarea[placeholder*="prompt"]') as HTMLTextAreaElement
            if (promptEditor) {
              promptEditor.focus()
            }
            break
        }
      }

      // Escape key handling
      if (event.key === "Escape") {
        // Close any open dropdowns or modals
        const openDropdown = document.querySelector('[data-state="open"]')
        if (openDropdown) {
          const closeButton = openDropdown.querySelector('[aria-label*="Close"]') as HTMLButtonElement
          if (closeButton) {
            closeButton.click()
          }
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [])

  return null
}
