"use client"

import { Card } from "@/components/ui/card"
import { TrendingUp, TrendingDown } from "lucide-react"

const heatmapData = [
  { symbol: "AAPL", name: "Apple", change: 1.35, size: "large", sector: "tech" },
  { symbol: "MSFT", name: "Microsoft", change: 1.1, size: "large", sector: "tech" },
  { symbol: "GOOGL", name: "Alphabet", change: -0.53, size: "large", sector: "tech" },
  { symbol: "AMZN", name: "Amazon", change: 0.39, size: "large", sector: "tech" },
  { symbol: "TSLA", name: "Tesla", change: -3.4, size: "medium", sector: "consumer" },
  { symbol: "NVDA", name: "NVIDIA", change: 2.75, size: "medium", sector: "tech" },
  { symbol: "META", name: "Meta", change: -1.15, size: "medium", sector: "tech" },
  { symbol: "JPM", name: "JPMorgan", change: 0.84, size: "medium", sector: "finance" },
  { symbol: "JNJ", name: "J&J", change: -0.53, size: "small", sector: "healthcare" },
  { symbol: "V", name: "Visa", change: 1.23, size: "small", sector: "finance" },
  { symbol: "PG", name: "P&G", change: 0.67, size: "small", sector: "consumer" },
  { symbol: "UNH", name: "UnitedHealth", change: 1.45, size: "small", sector: "healthcare" },
  { symbol: "HD", name: "Home Depot", change: -0.89, size: "small", sector: "consumer" },
  { symbol: "MA", name: "Mastercard", change: 0.92, size: "small", sector: "finance" },
  { symbol: "PFE", name: "Pfizer", change: -1.67, size: "small", sector: "healthcare" },
  { symbol: "BAC", name: "Bank of America", change: 1.12, size: "small", sector: "finance" },
]

export function MarketHeatmap() {
  const getChangeColor = (change: number) => {
    if (change > 2) return "bg-chart-5 text-white"
    if (change > 0) return "bg-chart-5/70 text-white"
    if (change > -2) return "bg-chart-4/70 text-white"
    return "bg-chart-4 text-white"
  }

  const getSizeClass = (size: string) => {
    switch (size) {
      case "large":
        return "col-span-2 row-span-2 text-lg"
      case "medium":
        return "col-span-2 text-base"
      case "small":
        return "col-span-1 text-sm"
      default:
        return "col-span-1 text-sm"
    }
  }

  const getSectorColor = (sector: string) => {
    const colors = {
      tech: "border-l-chart-1",
      finance: "border-l-chart-2",
      healthcare: "border-l-chart-3",
      consumer: "border-l-chart-4",
      energy: "border-l-chart-5",
    }
    return colors[sector as keyof typeof colors] || "border-l-muted"
  }

  return (
    <div className="space-y-6">
      <Card className="p-6 bg-card border-border">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-semibold">市场热力图</h3>
            <p className="text-sm text-muted-foreground">按市值大小和涨跌幅显示</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-chart-5 rounded"></div>
              <span className="text-sm">上涨</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-chart-4 rounded"></div>
              <span className="text-sm">下跌</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-8 gap-2 h-96">
          {heatmapData.map((stock) => (
            <div
              key={stock.symbol}
              className={`
                ${getSizeClass(stock.size)}
                ${getChangeColor(stock.change)}
                ${getSectorColor(stock.sector)}
                border-l-4 rounded-lg p-3 flex flex-col justify-between
                hover:scale-105 transition-transform cursor-pointer
              `}
            >
              <div>
                <div className="font-bold">{stock.symbol}</div>
                <div className="text-xs opacity-90 truncate">{stock.name}</div>
              </div>
              <div className="flex items-center gap-1 mt-2">
                {stock.change >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                <span className="font-semibold">
                  {stock.change >= 0 ? "+" : ""}
                  {stock.change.toFixed(2)}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card className="p-4 bg-card border-border">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-3 h-3 bg-chart-1 rounded"></div>
            <span className="font-medium">科技</span>
          </div>
          <div className="text-2xl font-bold text-chart-5">+0.8%</div>
          <div className="text-sm text-muted-foreground">15只股票</div>
        </Card>

        <Card className="p-4 bg-card border-border">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-3 h-3 bg-chart-2 rounded"></div>
            <span className="font-medium">金融</span>
          </div>
          <div className="text-2xl font-bold text-chart-5">+1.2%</div>
          <div className="text-sm text-muted-foreground">8只股票</div>
        </Card>

        <Card className="p-4 bg-card border-border">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-3 h-3 bg-chart-3 rounded"></div>
            <span className="font-medium">医疗</span>
          </div>
          <div className="text-2xl font-bold text-chart-4">-0.3%</div>
          <div className="text-sm text-muted-foreground">6只股票</div>
        </Card>

        <Card className="p-4 bg-card border-border">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-3 h-3 bg-chart-4 rounded"></div>
            <span className="font-medium">消费</span>
          </div>
          <div className="text-2xl font-bold text-chart-4">-0.7%</div>
          <div className="text-sm text-muted-foreground">4只股票</div>
        </Card>

        <Card className="p-4 bg-card border-border">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-3 h-3 bg-chart-5 rounded"></div>
            <span className="font-medium">能源</span>
          </div>
          <div className="text-2xl font-bold text-chart-5">+2.1%</div>
          <div className="text-sm text-muted-foreground">3只股票</div>
        </Card>
      </div>
    </div>
  )
}
