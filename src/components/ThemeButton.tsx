"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export function ThemeButton() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="w-9 h-9" />
  }

  const toggleTheme = (e: React.MouseEvent) => {
    const newTheme = theme === "dark" ? "light" : "dark"

    if (!document.startViewTransition) {
      setTheme(newTheme)
      return
    }

    const button = e.currentTarget as HTMLButtonElement
    const rect = button.getBoundingClientRect()
    const x = rect.left + rect.width / 2
    const y = rect.top + rect.height / 2
    
    const endRadius = Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y)
    )

    document.documentElement.style.setProperty("--theme-x", `${x}px`)
    document.documentElement.style.setProperty("--theme-y", `${y}px`)
    document.documentElement.style.setProperty("--theme-r", `${endRadius}px`)

    const transition = document.startViewTransition(() => {
      document.documentElement.classList.remove("light", "dark")
      document.documentElement.classList.add(newTheme)
      setTheme(newTheme)
    })
  }

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors cursor-pointer flex items-center justify-center text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </button>
  )
}
