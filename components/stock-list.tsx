"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Search, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useWatchlist } from "@/hooks/use-watchlist"

interface Stock {
  symbol: string
  name: string
  price: number
  change: number
  changePercent: number
  volume?: string
  marketCap?: string
}

interface StockListProps {
  selectedStock: Stock
  onStockSelect: (stock: Stock) => void
}

const mockStocks: Stock[] = [
  {
    symbol: "AAPL",
    name: "Apple Inc.",
    price: 175.43,
    change: 2.34,
    changePercent: 1.35,
    volume: "45.2M",
    marketCap: "2.8T",
  },
  {
    symbol: "GOOGL",
    name: "Alphabet Inc.",
    price: 2847.63,
    change: -15.23,
    changePercent: -0.53,
    volume: "28.1M",
    marketCap: "1.7T",
  },
  {
    symbol: "MSFT",
    name: "Microsoft Corp.",
    price: 378.85,
    change: 4.12,
    changePercent: 1.1,
    volume: "32.5M",
    marketCap: "2.9T",
  },
  {
    symbol: "TSLA",
    name: "Tesla Inc.",
    price: 248.5,
    change: -8.75,
    changePercent: -3.4,
    volume: "89.3M",
    marketCap: "789B",
  },
  {
    symbol: "AMZN",
    name: "Amazon.com Inc.",
    price: 3247.15,
    change: 12.45,
    changePercent: 0.39,
    volume: "41.7M",
    marketCap: "1.6T",
  },
  {
    symbol: "NVDA",
    name: "NVIDIA Corp.",
    price: 875.28,
    change: 23.45,
    changePercent: 2.75,
    volume: "67.8M",
    marketCap: "2.1T",
  },
  {
    symbol: "META",
    name: "Meta Platforms",
    price: 487.32,
    change: -5.67,
    changePercent: -1.15,
    volume: "25.4M",
    marketCap: "1.2T",
  },
  {
    symbol: "BTC-USD",
    name: "Bitcoin",
    price: 67845.32,
    change: 1234.56,
    changePercent: 1.85,
    volume: "2.1B",
    marketCap: "1.3T",
  },
]

export function StockList({ selectedStock, onStockSelect }: StockListProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const { getWatchlistSymbols, toggleWatchlist, isInWatchlist } = useWatchlist()

  const filteredStocks = mockStocks.filter(
    (stock) =>
      stock.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      stock.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleToggleWatchlist = (symbol: string, name: string) => {
    toggleWatchlist(symbol, name)
  }

  return (
    <Card className="p-4 bg-card border-border h-fit">
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="搜索股票..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-background border-border"
          />
        </div>

        <div className="flex gap-2 flex-wrap">
          <Badge variant="default" className="bg-primary text-primary-foreground">
            热门
          </Badge>
          <Badge variant="outline">科技</Badge>
          <Badge variant="outline">加密货币</Badge>
        </div>

        <div className="space-y-2 max-h-96 overflow-y-auto">
          {filteredStocks.map((stock) => (
            <div
              key={stock.symbol}
              className={`p-3 rounded-lg cursor-pointer transition-all border ${
                selectedStock.symbol === stock.symbol
                  ? "bg-primary/10 border-primary/30"
                  : "bg-background hover:bg-muted border-border"
              }`}
              onClick={() => onStockSelect(stock)}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{stock.symbol}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleToggleWatchlist(stock.symbol, stock.name)
                      }}
                    >
                      <Star
                        className={`h-3 w-3 ${
                          isInWatchlist(stock.symbol) ? "fill-chart-3 text-chart-3" : "text-muted-foreground"
                        }`}
                      />
                    </Button>
                  </div>
                  <div className="text-xs text-muted-foreground truncate">{stock.name}</div>
                  {stock.volume && <div className="text-xs text-muted-foreground">成交量: {stock.volume}</div>}
                </div>
                <div className="text-right">
                  <div className="font-semibold">${stock.price.toFixed(2)}</div>
                  <div
                    className={`text-xs flex items-center justify-end gap-1 ${
                      stock.change >= 0 ? "text-chart-5" : "text-chart-4"
                    }`}
                  >
                    {stock.change >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                    <span>
                      {stock.changePercent >= 0 ? "+" : ""}
                      {stock.changePercent.toFixed(2)}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
}
