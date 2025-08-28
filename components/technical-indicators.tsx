"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, Activity, Target } from "lucide-react"

interface TechnicalIndicatorsProps {
  stock: {
    symbol: string
    name: string
    price: number
    change: number
    changePercent: number
  }
}

export function TechnicalIndicators({ stock }: TechnicalIndicatorsProps) {
  const indicators = [
    { name: "RSI (14)", value: 67.8, signal: "超买", color: "text-chart-4" },
    { name: "MACD", value: 1.23, signal: "看涨", color: "text-chart-5" },
    { name: "布林带", value: 0.85, signal: "中性", color: "text-muted-foreground" },
    { name: "KDJ", value: 72.4, signal: "超买", color: "text-chart-4" },
    { name: "威廉指标", value: -28.5, signal: "看涨", color: "text-chart-5" },
  ]

  const support_resistance = [
    { type: "阻力位", level: 185.5, distance: 5.7 },
    { type: "阻力位", level: 192.3, distance: 9.6 },
    { type: "支撑位", level: 168.2, distance: -4.1 },
    { type: "支撑位", level: 162.8, distance: -7.2 },
  ]

  return (
    <div className="space-y-4">
      <Card className="p-4 bg-card border-border">
        <div className="flex items-center gap-2 mb-4">
          <Activity className="h-5 w-5 text-primary" />
          <h3 className="font-semibold">技术指标</h3>
        </div>

        <div className="space-y-3">
          {indicators.map((indicator) => (
            <div key={indicator.name} className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium">{indicator.name}</div>
                <div className="text-xs text-muted-foreground">{indicator.value}</div>
              </div>
              <Badge variant="outline" className={`${indicator.color} border-current`}>
                {indicator.signal}
              </Badge>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-4 bg-card border-border">
        <div className="flex items-center gap-2 mb-4">
          <Target className="h-5 w-5 text-chart-2" />
          <h3 className="font-semibold">支撑阻力</h3>
        </div>

        <div className="space-y-3">
          {support_resistance.map((level, index) => (
            <div key={index} className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium">${level.level.toFixed(2)}</div>
                <div className="text-xs text-muted-foreground">{level.type}</div>
              </div>
              <div className={`text-sm font-medium ${level.distance > 0 ? "text-chart-4" : "text-chart-5"}`}>
                {level.distance > 0 ? "+" : ""}
                {level.distance.toFixed(1)}%
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-4 bg-card border-border">
        <h3 className="font-semibold mb-4">市场情绪</h3>

        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>恐惧贪婪指数</span>
              <span className="font-medium">72 (贪婪)</span>
            </div>
            <Progress value={72} className="h-2" />
          </div>

          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>看涨情绪</span>
              <span className="font-medium">68%</span>
            </div>
            <Progress value={68} className="h-2" />
          </div>

          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>机构持仓</span>
              <span className="font-medium">84%</span>
            </div>
            <Progress value={84} className="h-2" />
          </div>
        </div>
      </Card>

      <Card className="p-4 bg-card border-border">
        <h3 className="font-semibold mb-4">交易建议</h3>

        <div className="space-y-3">
          <div className="p-3 bg-chart-5/10 border border-chart-5/20 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp className="h-4 w-4 text-chart-5" />
              <span className="text-sm font-medium text-chart-5">买入信号</span>
            </div>
            <p className="text-xs text-muted-foreground">MACD金叉，RSI回调至合理区间</p>
          </div>

          <div className="p-3 bg-background border border-border rounded-lg">
            <div className="text-sm font-medium mb-2">目标价位</div>
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">止损:</span>
              <span className="text-chart-4">$165.00</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">目标:</span>
              <span className="text-chart-5">$190.00</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
