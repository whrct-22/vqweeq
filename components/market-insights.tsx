"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { TrendingUp, TrendingDown, Activity, Globe, Zap } from "lucide-react"

const marketTrends = [
  { name: "1月", sp500: 4200, nasdaq: 13000, dow: 34000 },
  { name: "2月", sp500: 4350, nasdaq: 13500, dow: 34500 },
  { name: "3月", sp500: 4180, nasdaq: 12800, dow: 33800 },
  { name: "4月", sp500: 4420, nasdaq: 14200, dow: 35200 },
  { name: "5月", sp500: 4380, nasdaq: 13900, dow: 34900 },
  { name: "6月", sp500: 4520, nasdaq: 14800, dow: 36000 },
]

const sectorPerformance = [
  { name: "科技", value: 28.5, change: 2.3, color: "hsl(var(--chart-1))" },
  { name: "金融", value: 18.2, change: 1.8, color: "hsl(var(--chart-2))" },
  { name: "医疗", value: 15.7, change: -0.5, color: "hsl(var(--chart-3))" },
  { name: "消费", value: 12.4, change: -1.2, color: "hsl(var(--chart-4))" },
  { name: "能源", value: 8.9, change: 3.1, color: "hsl(var(--chart-5))" },
  { name: "其他", value: 16.3, change: 0.2, color: "hsl(var(--muted-foreground))" },
]

const marketInsights = [
  {
    id: "1",
    title: "科技股估值回归合理区间",
    type: "sector",
    impact: "positive",
    confidence: 78,
    summary: "经过近期调整，科技股估值已回归历史合理区间，为长期投资者提供了良好的入场机会。",
    keyMetrics: ["P/E比率: 24.5", "PEG比率: 1.2", "市净率: 3.8"],
  },
  {
    id: "2",
    title: "通胀压力缓解，货币政策转向宽松",
    type: "macro",
    impact: "positive",
    confidence: 85,
    summary: "最新通胀数据显示价格压力持续缓解，为央行采取更宽松的货币政策创造了条件。",
    keyMetrics: ["CPI: 3.2%", "核心CPI: 2.8%", "PPI: 1.9%"],
  },
  {
    id: "3",
    title: "新兴市场资金流入加速",
    type: "global",
    impact: "neutral",
    confidence: 72,
    summary: "随着美元走弱和风险偏好回升，新兴市场股票和债券基金出现显著资金流入。",
    keyMetrics: ["资金流入: $12.5B", "汇率变化: +3.2%", "债券收益率: 4.8%"],
  },
]

export function MarketInsights() {
  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "positive":
        return "text-chart-5"
      case "negative":
        return "text-chart-4"
      default:
        return "text-muted-foreground"
    }
  }

  const getImpactIcon = (impact: string) => {
    switch (impact) {
      case "positive":
        return <TrendingUp className="h-4 w-4" />
      case "negative":
        return <TrendingDown className="h-4 w-4" />
      default:
        return <Activity className="h-4 w-4" />
    }
  }

  const getTypeColor = (type: string) => {
    const colors = {
      sector: "bg-chart-1 text-white",
      macro: "bg-chart-2 text-white",
      global: "bg-chart-3 text-white",
      technical: "bg-chart-4 text-white",
    }
    return colors[type as keyof typeof colors] || "bg-muted text-muted-foreground"
  }

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm text-muted-foreground">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm font-semibold" style={{ color: entry.color }}>
              {entry.name}: {entry.value.toLocaleString()}
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Globe className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold">市场洞察</h3>
      </div>

      {/* 市场趋势图表 */}
      <Card className="p-6 bg-card border-border">
        <h4 className="text-lg font-semibold mb-4">主要指数走势</h4>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={marketTrends}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="sp500"
                stroke="hsl(var(--chart-1))"
                strokeWidth={2}
                name="S&P 500"
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="nasdaq"
                stroke="hsl(var(--chart-2))"
                strokeWidth={2}
                name="NASDAQ"
                dot={false}
              />
              <Line type="monotone" dataKey="dow" stroke="hsl(var(--chart-3))" strokeWidth={2} name="DOW" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 行业表现 */}
        <Card className="p-6 bg-card border-border">
          <h4 className="text-lg font-semibold mb-4">行业表现分布</h4>
          <div className="h-48 mb-4">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sectorPerformance}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {sectorPerformance.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload
                      return (
                        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
                          <p className="font-semibold">{data.name}</p>
                          <p className="text-sm">占比: {data.value}%</p>
                          <p className={`text-sm ${data.change >= 0 ? "text-chart-5" : "text-chart-4"}`}>
                            变化: {data.change >= 0 ? "+" : ""}
                            {data.change}%
                          </p>
                        </div>
                      )
                    }
                    return null
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2">
            {sectorPerformance.map((sector) => (
              <div key={sector.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded" style={{ backgroundColor: sector.color }}></div>
                  <span>{sector.name}</span>
                </div>
                <div className={`font-medium ${sector.change >= 0 ? "text-chart-5" : "text-chart-4"}`}>
                  {sector.change >= 0 ? "+" : ""}
                  {sector.change}%
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* 市场情绪指标 */}
        <Card className="p-6 bg-card border-border">
          <div className="flex items-center gap-2 mb-4">
            <Zap className="h-5 w-5 text-chart-3" />
            <h4 className="text-lg font-semibold">市场情绪指标</h4>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>VIX恐慌指数</span>
                <span className="font-medium">18.5</span>
              </div>
              <Progress value={37} className="h-2" />
              <div className="text-xs text-muted-foreground mt-1">低恐慌水平</div>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>看涨/看跌比率</span>
                <span className="font-medium">1.35</span>
              </div>
              <Progress value={67} className="h-2" />
              <div className="text-xs text-muted-foreground mt-1">适度乐观</div>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>资金流向指数</span>
                <span className="font-medium text-chart-5">+2.8B</span>
              </div>
              <Progress value={78} className="h-2" />
              <div className="text-xs text-muted-foreground mt-1">资金净流入</div>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>机构持仓比例</span>
                <span className="font-medium">84.2%</span>
              </div>
              <Progress value={84} className="h-2" />
              <div className="text-xs text-muted-foreground mt-1">机构高度参与</div>
            </div>
          </div>
        </Card>
      </div>

      {/* 深度洞察 */}
      <div className="space-y-4">
        <h4 className="text-lg font-semibold">深度分析</h4>
        {marketInsights.map((insight) => (
          <Card key={insight.id} className="p-6 bg-card border-border">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Badge className={getTypeColor(insight.type)}>
                    {insight.type === "sector" && "行业"}
                    {insight.type === "macro" && "宏观"}
                    {insight.type === "global" && "全球"}
                    {insight.type === "technical" && "技术"}
                  </Badge>
                  <div className={`flex items-center gap-1 ${getImpactColor(insight.impact)}`}>
                    {getImpactIcon(insight.impact)}
                  </div>
                </div>
                <h5 className="text-lg font-semibold mb-2">{insight.title}</h5>
                <p className="text-muted-foreground">{insight.summary}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h6 className="font-medium mb-2">关键指标</h6>
                <ul className="space-y-1">
                  {insight.keyMetrics.map((metric, index) => (
                    <li key={index} className="text-sm text-muted-foreground flex items-center gap-2">
                      <div className="w-1 h-1 bg-primary rounded-full"></div>
                      {metric}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">分析可信度</span>
                  <span className="font-medium">{insight.confidence}%</span>
                </div>
                <Progress value={insight.confidence} className="h-2" />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
