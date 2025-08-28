"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TradingChart } from "@/components/trading-chart"
import { TechnicalIndicators } from "@/components/technical-indicators"
import { ChartToolbar } from "@/components/chart-toolbar"
import { BarChart3, TrendingUp, Settings } from "lucide-react"

export default function ChartsPage() {
  const [selectedStock, setSelectedStock] = useState({
    symbol: "AAPL",
    name: "Apple Inc.",
    price: 175.43,
    change: 2.34,
    changePercent: 1.35,
  })

  const [timeframe, setTimeframe] = useState("1D")
  const [chartType, setChartType] = useState("candlestick")

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <BarChart3 className="h-8 w-8 text-primary" />
            高级图表
          </h1>
          <p className="text-muted-foreground">专业的技术分析工具和指标</p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            图表设置
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <Card className="p-6 bg-card border-border">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold">{selectedStock.symbol}</h2>
                <p className="text-muted-foreground">{selectedStock.name}</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold">${selectedStock.price.toFixed(2)}</div>
                <div
                  className={`flex items-center gap-1 ${selectedStock.change >= 0 ? "text-chart-5" : "text-chart-4"}`}
                >
                  <TrendingUp className="h-4 w-4" />
                  <span>
                    {selectedStock.change >= 0 ? "+" : ""}
                    {selectedStock.change.toFixed(2)} ({selectedStock.changePercent >= 0 ? "+" : ""}
                    {selectedStock.changePercent.toFixed(2)}%)
                  </span>
                </div>
              </div>
            </div>

            <ChartToolbar
              timeframe={timeframe}
              onTimeframeChange={setTimeframe}
              chartType={chartType}
              onChartTypeChange={setChartType}
            />

            <div className="h-96 mt-4">
              <TradingChart stock={selectedStock} />
            </div>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <TechnicalIndicators stock={selectedStock} />
        </div>
      </div>
    </div>
  )
}
