"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const portfolioData = [
  { date: "1月", value: 106700 },
  { date: "2月", value: 108900 },
  { date: "3月", value: 112300 },
  { date: "4月", value: 109800 },
  { date: "5月", value: 115600 },
  { date: "6月", value: 118900 },
  { date: "7月", value: 122400 },
  { date: "8月", value: 125450 },
]

export function PortfolioChart() {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="text-lg font-semibold text-foreground">${payload[0].value.toLocaleString()}</p>
        </div>
      )
    }
    return null
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={portfolioData}>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
        <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={12} />
        <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
        <Tooltip content={<CustomTooltip />} />
        <Line
          type="monotone"
          dataKey="value"
          stroke="#3b82f6"
          strokeWidth={3}
          dot={false}
          activeDot={{ r: 4, fill: "hsl(var(--primary))" }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
