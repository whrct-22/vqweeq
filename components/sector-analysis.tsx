"use client"

import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"
import { TrendingUp, TrendingDown } from "lucide-react"

const sectorData = [
  { name: "科技", value: 28.5, change: 0.8, color: "#3b82f6", stocks: 156 },
  { name: "金融", value: 18.2, change: 1.2, color: "#10b981", stocks: 89 },
  { name: "医疗", value: 15.7, change: -0.3, color: "#f59e0b", stocks: 67 },
  { name: "消费", value: 12.4, change: -0.7, color: "#ef4444", stocks: 78 },
  { name: "能源", value: 8.9, change: 2.1, color: "#8b5cf6", stocks: 34 },
  { name: "工业", value: 7.8, change: 0.4, color: "#06b6d4", stocks: 45 },
  { name: "其他", value: 8.5, change: -0.1, color: "#ec4899", stocks: 89 },
]

const performanceData = [
  { sector: "科技", today: 0.8, week: 2.3, month: 5.7, year: 18.4 },
  { sector: "金融", today: 1.2, week: 3.1, month: 4.2, year: 12.8 },
  { sector: "医疗", today: -0.3, week: 1.8, month: 3.9, year: 8.7 },
  { sector: "消费", today: -0.7, week: -1.2, month: 2.1, year: 15.3 },
  { sector: "能源", today: 2.1, week: 4.8, month: 8.9, year: 22.1 },
  { sector: "工业", today: 0.4, week: 1.9, month: 3.4, year: 11.2 },
]

export function SectorAnalysis() {
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="font-semibold">{payload[0].payload.sector}</p>
          <p className="text-sm text-muted-foreground">
            今日: {payload[0].value > 0 ? "+" : ""}
            {payload[0].value.toFixed(2)}%
          </p>
        </div>
      )
    }
    return null
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 行业分布饼图 */}
        <Card className="p-6 bg-card border-border">
          <h3 className="text-xl font-semibold mb-4">行业分布</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sectorData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {sectorData.map((entry, index) => (
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
                          <p className="text-sm">股票数: {data.stocks}</p>
                        </div>
                      )
                    }
                    return null
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* 行业表现柱状图 */}
        <Card className="p-6 bg-card border-border">
          <h3 className="text-xl font-semibold mb-4">今日行业表现</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis
                  dataKey="sector"
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  angle={-45}
                  textAnchor="end"
                  height={60}
                />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="today" fill="#3b82f6" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* 详细行业数据 */}
      <Card className="p-6 bg-card border-border">
        <h3 className="text-xl font-semibold mb-4">行业详细数据</h3>
        <div className="space-y-4">
          {sectorData.map((sector) => (
            <div
              key={sector.name}
              className="flex items-center justify-between p-4 bg-background rounded-lg border border-border"
            >
              <div className="flex items-center gap-4">
                <div className="w-4 h-4 rounded" style={{ backgroundColor: sector.color }}></div>
                <div>
                  <div className="font-semibold">{sector.name}</div>
                  <div className="text-sm text-muted-foreground">{sector.stocks} 只股票</div>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="text-right">
                  <div className="text-sm text-muted-foreground">市场占比</div>
                  <div className="font-semibold">{sector.value}%</div>
                </div>

                <div className="w-24">
                  <Progress value={sector.value} className="h-2" />
                </div>

                <div className="text-right">
                  <div className="text-sm text-muted-foreground">今日涨跌</div>
                  <div
                    className={`flex items-center gap-1 font-semibold ${
                      sector.change >= 0 ? "text-chart-5" : "text-chart-4"
                    }`}
                  >
                    {sector.change >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                    {sector.change >= 0 ? "+" : ""}
                    {sector.change.toFixed(2)}%
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* 行业表现对比表 */}
      <Card className="p-6 bg-card border-border">
        <h3 className="text-xl font-semibold mb-4">行业表现对比</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2">行业</th>
                <th className="text-right py-2">今日</th>
                <th className="text-right py-2">本周</th>
                <th className="text-right py-2">本月</th>
                <th className="text-right py-2">今年</th>
              </tr>
            </thead>
            <tbody>
              {performanceData.map((sector) => (
                <tr key={sector.sector} className="border-b border-border/50">
                  <td className="py-3 font-medium">{sector.sector}</td>
                  <td
                    className={`text-right py-3 font-semibold ${sector.today >= 0 ? "text-chart-5" : "text-chart-4"}`}
                  >
                    {sector.today >= 0 ? "+" : ""}
                    {sector.today.toFixed(2)}%
                  </td>
                  <td className={`text-right py-3 ${sector.week >= 0 ? "text-chart-5" : "text-chart-4"}`}>
                    {sector.week >= 0 ? "+" : ""}
                    {sector.week.toFixed(2)}%
                  </td>
                  <td className={`text-right py-3 ${sector.month >= 0 ? "text-chart-5" : "text-chart-4"}`}>
                    {sector.month >= 0 ? "+" : ""}
                    {sector.month.toFixed(2)}%
                  </td>
                  <td className={`text-right py-3 ${sector.year >= 0 ? "text-chart-5" : "text-chart-4"}`}>
                    {sector.year >= 0 ? "+" : ""}
                    {sector.year.toFixed(2)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
