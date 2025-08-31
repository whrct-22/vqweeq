"use client"

import { useEffect, useState } from "react"
import { useSettings } from "./use-settings"

type Theme = "light" | "dark" | "system"

export function useTheme() {
  const { settings, updatePreferences } = useSettings()
  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">("light")

  // Apply theme to document
  useEffect(() => {
    const root = window.document.documentElement
    const theme = settings?.preferences?.theme as Theme || "light"

    let effectiveTheme: "light" | "dark" = "light"

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
      effectiveTheme = systemTheme
    } else {
      effectiveTheme = theme as "light" | "dark"
    }

    root.classList.remove("light", "dark")
    root.classList.add(effectiveTheme)
    setResolvedTheme(effectiveTheme)

    // Update meta theme-color
    const metaThemeColor = document.querySelector('meta[name="theme-color"]')
    if (metaThemeColor) {
      metaThemeColor.setAttribute("content", effectiveTheme === "dark" ? "#0a0a0a" : "#ffffff")
    }
  }, [settings?.preferences?.theme])

  // Apply default theme immediately on mount
  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove("light", "dark")
    root.classList.add("light")
    setResolvedTheme("light")

    const metaThemeColor = document.querySelector('meta[name="theme-color"]')
    if (metaThemeColor) {
      metaThemeColor.setAttribute("content", "#ffffff")
    }
  }, [])

  // Listen for system theme changes
  useEffect(() => {
    if (settings.preferences.theme !== "system") return

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    const handleChange = () => {
      const root = window.document.documentElement
      const systemTheme = mediaQuery.matches ? "dark" : "light"

      root.classList.remove("light", "dark")
      root.classList.add(systemTheme)
      setResolvedTheme(systemTheme)
    }

    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [settings.preferences.theme])

  const setTheme = (theme: Theme) => {
    updatePreferences({ theme })
  }

  return {
    theme: settings.preferences.theme as Theme,
    resolvedTheme,
    setTheme,
  }
}
