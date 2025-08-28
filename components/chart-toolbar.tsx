"use client"

import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Activity, Zap } from "lucide-react"

interface ChartToolbarProps {
  timeframe: string
  onTimeframeChange: (timeframe: string) => void
  chartType: string
  onChartTypeChange: (type: string) => void
}

export function ChartToolbar({ timeframe, onTimeframeChange, chartType, onChartTypeChange }: ChartToolbarProps) {
  const timeframes = ["1m", "5m", "15m", "1H", "4H", "1D", "1W", "1M"]

  return (
    <div className="flex items-center justify-between border-b border-border pb-4">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">时间周期:</span>
        <div className="flex gap-1">
          {timeframes.map((tf) => (
            <Button
              key={tf}
              variant={timeframe === tf ? "default" : "outline"}
              size="sm"
              onClick={() => onTimeframeChange(tf)}
              className="h-8 px-3"
            >
              {tf}
            </Button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Select value={chartType} onValueChange={onChartTypeChange}>
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="candlestick">K线图</SelectItem>
            <SelectItem value="line">线图</SelectItem>
            <SelectItem value="area">面积图</SelectItem>
            <SelectItem value="bar">柱状图</SelectItem>
          </SelectContent>
        </Select>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Activity className="h-4 w-4 mr-1" />
            指标
          </Button>
          <Button variant="outline" size="sm">
            <Zap className="h-4 w-4 mr-1" />
            工具
          </Button>
        </div>
      </div>
    </div>
  )
}
