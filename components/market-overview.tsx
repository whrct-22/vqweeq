"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Globe, Zap } from "lucide-react"

export function MarketOverview() {
  const marketIndices = [
    { name: "S&P 500", value: "4,567.89", change: "+23.45", changePercent: "+0.52%", trend: "up" },
    { name: "NASDAQ", value: "14,234.56", change: "-45.67", changePercent: "-0.32%", trend: "down" },
    { name: "DOW JONES", value: "34,567.12", change: "+123.45", changePercent: "+0.36%", trend: "up" },
    { name: "上证指数", value: "3,234.56", change: "+12.34", changePercent: "+0.38%", trend: "up" },
  ]

  const topMovers = [
    { symbol: "NVDA", name: "NVIDIA", change: "+5.67%", trend: "up" },
    { symbol: "TSLA", name: "Tesla", change: "-3.45%", trend: "down" },
    { symbol: "AAPL", name: "Apple", change: "+2.34%", trend: "up" },
    { symbol: "GOOGL", name: "Alphabet", change: "+1.23%", trend: "up" },
  ]

  return (
    <div className="space-y-6">
      <Card className="p-6 bg-card border-border">
        <div className="flex items-center gap-2 mb-4">
          <Globe className="h-5 w-5 text-primary" />
          <h3 className="text-xl font-semibold">全球市场指数</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {marketIndices.map((index) => (
            <div key={index.name} className="p-4 bg-background rounded-lg border border-border">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">{index.name}</span>
                {index.trend === "up" ? (
                  <TrendingUp className="h-4 w-4 text-chart-5" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-chart-4" />
                )}
              </div>
              <div className="text-lg font-bold">{index.value}</div>
              <div className={`text-sm ${index.trend === "up" ? "text-chart-5" : "text-chart-4"}`}>
                {index.change} ({index.changePercent})
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6 bg-card border-border">
        <div className="flex items-center gap-2 mb-4">
          <Zap className="h-5 w-5 text-chart-3" />
          <h3 className="text-xl font-semibold">今日热门</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {topMovers.map((stock) => (
            <div key={stock.symbol} className="p-4 bg-background rounded-lg border border-border">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold">{stock.symbol}</div>
                  <div className="text-sm text-muted-foreground">{stock.name}</div>
                </div>
                <div className="text-right">
                  <Badge
                    variant={stock.trend === "up" ? "default" : "destructive"}
                    className={stock.trend === "up" ? "bg-chart-5 text-white" : "bg-chart-4 text-white"}
                  >
                    {stock.change}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
