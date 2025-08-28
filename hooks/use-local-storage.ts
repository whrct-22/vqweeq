"use client"

import { useState, useEffect, useCallback } from "react"

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(initialValue)
  const [isLoading, setIsLoading] = useState(true)

  // Load value from localStorage on mount
  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key)
      if (item) {
        const parsed = JSON.parse(item)
        setStoredValue(parsed)
      }
    } catch (error) {
      console.error(`Error loading localStorage key "${key}":`, error)
    } finally {
      setIsLoading(false)
    }
  }, [key])

  // Save value to localStorage
  const setValue = useCallback(
    (value: T | ((val: T) => T)) => {
      try {
        const valueToStore = value instanceof Function ? value(storedValue) : value
        setStoredValue(valueToStore)
        window.localStorage.setItem(key, JSON.stringify(valueToStore))
      } catch (error) {
        console.error(`Error setting localStorage key "${key}":`, error)
      }
    },
    [key, storedValue],
  )

  // Remove value from localStorage
  const removeValue = useCallback(() => {
    try {
      window.localStorage.removeItem(key)
      setStoredValue(initialValue)
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error)
    }
  }, [key, initialValue])

  return [storedValue, setValue, removeValue, isLoading] as const
}
