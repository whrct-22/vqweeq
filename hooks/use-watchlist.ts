"use client"

import { useLocalStorage } from "./use-local-storage"
import { useCallback } from "react"

export interface WatchlistItem {
  symbol: string
  name: string
  addedAt: string
}

export function useWatchlist() {
  const [watchlist, setWatchlist, , isLoading] = useLocalStorage<WatchlistItem[]>("user-watchlist", [
    { symbol: "AAPL", name: "Apple Inc.", addedAt: new Date().toISOString() },
    { symbol: "TSLA", name: "Tesla Inc.", addedAt: new Date().toISOString() },
  ])

  const addToWatchlist = useCallback(
    (symbol: string, name: string) => {
      setWatchlist((prev) => {
        if (prev.some((item) => item.symbol === symbol)) {
          return prev
        }
        return [...prev, { symbol, name, addedAt: new Date().toISOString() }]
      })
    },
    [setWatchlist],
  )

  const removeFromWatchlist = useCallback(
    (symbol: string) => {
      setWatchlist((prev) => prev.filter((item) => item.symbol !== symbol))
    },
    [setWatchlist],
  )

  const toggleWatchlist = useCallback(
    (symbol: string, name: string) => {
      const isInWatchlist = watchlist.some((item) => item.symbol === symbol)
      if (isInWatchlist) {
        removeFromWatchlist(symbol)
      } else {
        addToWatchlist(symbol, name)
      }
    },
    [watchlist, addToWatchlist, removeFromWatchlist],
  )

  const isInWatchlist = useCallback(
    (symbol: string) => {
      return watchlist.some((item) => item.symbol === symbol)
    },
    [watchlist],
  )

  const getWatchlistSymbols = useCallback(() => {
    return watchlist.map((item) => item.symbol)
  }, [watchlist])

  return {
    watchlist,
    isLoading,
    addToWatchlist,
    removeFromWatchlist,
    toggleWatchlist,
    isInWatchlist,
    getWatchlistSymbols,
  }
}
