"use client"

import { useState, useEffect } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts"

interface TradingChartProps {
  stock: {
    symbol: string
    name: string
    price: number
    change: number
    changePercent: number
  }
}

const generateChartData = (basePrice: number) => {
  const data = []
  let currentPrice = basePrice
  const now = new Date()

  for (let i = 30; i >= 0; i--) {
    const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000)
    const change = (Math.random() - 0.5) * basePrice * 0.05
    currentPrice = Math.max(currentPrice + change, basePrice * 0.8)

    data.push({
      date: date.toLocaleDateString(),
      price: Number(currentPrice.toFixed(2)),
      volume: Math.floor(Math.random() * 1000000) + 500000,
    })
  }

  return data
}

export function TradingChart({ stock }: TradingChartProps) {
  const [chartData, setChartData] = useState<any[]>([])
  const [chartType, setChartType] = useState<"line" | "area">("area")

  useEffect(() => {
    setChartData(generateChartData(stock.price))
  }, [stock.symbol, stock.price])

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="text-lg font-semibold text-foreground">${payload[0].value.toFixed(2)}</p>
        </div>
      )
    }
    return null
  }

  const lineColor = stock.change >= 0 ? "#10b981" : "#ef4444" // 绿色上涨，红色下跌
  const gridColor = "#374151" // 深灰色网格线
  const textColor = "#9ca3af" // 浅灰色文字

  return (
    <div className="h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
        {chartType === "area" ? (
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={lineColor} stopOpacity={0.3} />
                <stop offset="95%" stopColor={lineColor} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
            <XAxis dataKey="date" stroke={textColor} fontSize={12} />
            <YAxis stroke={textColor} fontSize={12} domain={["dataMin - 5", "dataMax + 5"]} />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="price"
              stroke={lineColor}
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorPrice)"
            />
          </AreaChart>
        ) : (
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
            <XAxis dataKey="date" stroke={textColor} fontSize={12} />
            <YAxis stroke={textColor} fontSize={12} domain={["dataMin - 5", "dataMax + 5"]} />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="price"
              stroke={lineColor}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, fill: lineColor }}
            />
          </LineChart>
        )}
      </ResponsiveContainer>
    </div>
  )
}
