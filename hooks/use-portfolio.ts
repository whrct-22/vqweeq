"use client"

import { useLocalStorage } from "./use-local-storage"
import { useCallback } from "react"

export interface PortfolioHolding {
  symbol: string
  name: string
  shares: number
  avgPrice: number
  currentPrice: number
  marketValue: number
  gainLoss: number
  gainLossPercent: number
  allocation: number
  purchaseDate: string
}

export interface Transaction {
  id: string
  date: string
  type: "buy" | "sell"
  symbol: string
  name: string
  shares: number
  price: number
  total: number
  status: "completed" | "pending" | "failed"
}

const defaultHoldings: PortfolioHolding[] = [
  {
    symbol: "AAPL",
    name: "Apple Inc.",
    shares: 50,
    avgPrice: 165.2,
    currentPrice: 175.43,
    marketValue: 8771.5,
    gainLoss: 511.5,
    gainLossPercent: 6.2,
    allocation: 7.0,
    purchaseDate: "2024-01-15",
  },
  {
    symbol: "MSFT",
    name: "Microsoft Corp.",
    shares: 25,
    avgPrice: 350.8,
    currentPrice: 378.85,
    marketValue: 9471.25,
    gainLoss: 701.25,
    gainLossPercent: 8.0,
    allocation: 7.5,
    purchaseDate: "2024-01-10",
  },
]

const defaultTransactions: Transaction[] = [
  {
    id: "1",
    date: "2024-01-15",
    type: "buy",
    symbol: "AAPL",
    name: "Apple Inc.",
    shares: 25,
    price: 175.43,
    total: 4385.75,
    status: "completed",
  },
  {
    id: "2",
    date: "2024-01-14",
    type: "sell",
    symbol: "TSLA",
    name: "Tesla Inc.",
    shares: 10,
    price: 248.5,
    total: 2485.0,
    status: "completed",
  },
]

export function usePortfolio() {
  const [holdings, setHoldings, , holdingsLoading] = useLocalStorage<PortfolioHolding[]>(
    "user-portfolio-holdings",
    defaultHoldings,
  )
  const [transactions, setTransactions, , transactionsLoading] = useLocalStorage<Transaction[]>(
    "user-portfolio-transactions",
    defaultTransactions,
  )

  const addTransaction = useCallback(
    (transaction: Omit<Transaction, "id">) => {
      const newTransaction: Transaction = {
        ...transaction,
        id: Date.now().toString(),
      }
      setTransactions((prev) => [newTransaction, ...prev])
    },
    [setTransactions],
  )

  const updateHolding = useCallback(
    (symbol: string, updates: Partial<PortfolioHolding>) => {
      setHoldings((prev) => prev.map((holding) => (holding.symbol === symbol ? { ...holding, ...updates } : holding)))
    },
    [setHoldings],
  )

  const addHolding = useCallback(
    (holding: PortfolioHolding) => {
      setHoldings((prev) => {
        const existingIndex = prev.findIndex((h) => h.symbol === holding.symbol)
        if (existingIndex >= 0) {
          // Update existing holding
          const updated = [...prev]
          updated[existingIndex] = holding
          return updated
        }
        return [...prev, holding]
      })
    },
    [setHoldings],
  )

  const removeHolding = useCallback(
    (symbol: string) => {
      setHoldings((prev) => prev.filter((holding) => holding.symbol !== symbol))
    },
    [setHoldings],
  )

  const getTotalValue = useCallback(() => {
    return holdings.reduce((total, holding) => total + holding.marketValue, 0)
  }, [holdings])

  const getTotalGainLoss = useCallback(() => {
    return holdings.reduce((total, holding) => total + holding.gainLoss, 0)
  }, [holdings])

  const getTotalGainLossPercent = useCallback(() => {
    const totalValue = getTotalValue()
    const totalGainLoss = getTotalGainLoss()
    const totalCost = totalValue - totalGainLoss
    return totalCost > 0 ? (totalGainLoss / totalCost) * 100 : 0
  }, [getTotalValue, getTotalGainLoss])

  return {
    holdings,
    transactions,
    isLoading: holdingsLoading || transactionsLoading,
    addTransaction,
    updateHolding,
    addHolding,
    removeHolding,
    getTotalValue,
    getTotalGainLoss,
    getTotalGainLossPercent,
  }
}
