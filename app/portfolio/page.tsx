"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { PortfolioChart } from "@/components/portfolio-chart"
import { HoldingsTable } from "@/components/holdings-table"
import { TransactionHistory } from "@/components/transaction-history"
import { Wallet, TrendingUp, TrendingDown, PieChart, BarChart3, DollarSign } from "lucide-react"

export default function PortfolioPage() {
  const [portfolioStats] = useState({
    totalValue: 125450.32,
    totalGain: 18750.45,
    totalGainPercent: 17.6,
    dayGain: 1234.56,
    dayGainPercent: 0.99,
    cashBalance: 12450.0,
    investedAmount: 113000.32,
  })

  const [allocation] = useState([
    { sector: "科技", percentage: 45.2, value: 56703.84, color: "hsl(var(--chart-1))" },
    { sector: "金融", percentage: 22.8, value: 28602.67, color: "hsl(var(--chart-2))" },
    { sector: "医疗", percentage: 15.5, value: 19444.8, color: "hsl(var(--chart-3))" },
    { sector: "消费", percentage: 12.3, value: 15430.39, color: "hsl(var(--chart-4))" },
    { sector: "现金", percentage: 4.2, value: 5268.62, color: "hsl(var(--muted-foreground))" },
  ])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Wallet className="h-8 w-8 text-primary" />
            投资组合
          </h1>
          <p className="text-muted-foreground">管理您的投资组合和资产配置</p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <BarChart3 className="h-4 w-4 mr-2" />
            分析报告
          </Button>
          <Button size="sm">
            <TrendingUp className="h-4 w-4 mr-2" />
            添加持仓
          </Button>
        </div>
      </div>

      {/* 投资组合概览 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 bg-card border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">总资产</p>
              <p className="text-2xl font-bold">${portfolioStats.totalValue.toLocaleString()}</p>
              <div
                className={`flex items-center gap-1 text-sm ${portfolioStats.totalGainPercent >= 0 ? "text-chart-5" : "text-chart-4"}`}
              >
                {portfolioStats.totalGainPercent >= 0 ? (
                  <TrendingUp className="h-3 w-3" />
                ) : (
                  <TrendingDown className="h-3 w-3" />
                )}
                +${portfolioStats.totalGain.toLocaleString()} ({portfolioStats.totalGainPercent.toFixed(2)}%)
              </div>
            </div>
            <DollarSign className="h-8 w-8 text-primary" />
          </div>
        </Card>

        <Card className="p-4 bg-card border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">今日盈亏</p>
              <p
                className={`text-2xl font-bold ${portfolioStats.dayGainPercent >= 0 ? "text-chart-5" : "text-chart-4"}`}
              >
                ${portfolioStats.dayGain.toLocaleString()}
              </p>
              <div
                className={`flex items-center gap-1 text-sm ${portfolioStats.dayGainPercent >= 0 ? "text-chart-5" : "text-chart-4"}`}
              >
                {portfolioStats.dayGainPercent >= 0 ? (
                  <TrendingUp className="h-3 w-3" />
                ) : (
                  <TrendingDown className="h-3 w-3" />
                )}
                {portfolioStats.dayGainPercent.toFixed(2)}%
              </div>
            </div>
            <TrendingUp className="h-8 w-8 text-chart-5" />
          </div>
        </Card>

        <Card className="p-4 bg-card border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">现金余额</p>
              <p className="text-2xl font-bold">${portfolioStats.cashBalance.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">可用于投资</p>
            </div>
            <Wallet className="h-8 w-8 text-chart-2" />
          </div>
        </Card>

        <Card className="p-4 bg-card border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">已投资金额</p>
              <p className="text-2xl font-bold">${portfolioStats.investedAmount.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">
                {((portfolioStats.investedAmount / portfolioStats.totalValue) * 100).toFixed(1)}% 已投资
              </p>
            </div>
            <PieChart className="h-8 w-8 text-chart-3" />
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 投资组合图表 */}
        <div className="lg:col-span-2">
          <Card className="p-6 bg-card border-border">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">投资组合表现</h3>
              <div className="flex gap-2">
                <Badge variant="outline">1个月</Badge>
                <Badge variant="default">3个月</Badge>
                <Badge variant="outline">1年</Badge>
              </div>
            </div>
            <div className="h-64">
              <PortfolioChart />
            </div>
          </Card>
        </div>

        {/* 资产配置 */}
        <Card className="p-6 bg-card border-border">
          <h3 className="text-lg font-semibold mb-4">资产配置</h3>
          <div className="space-y-4">
            {allocation.map((item) => (
              <div key={item.sector} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded" style={{ backgroundColor: item.color }}></div>
                    <span className="text-sm font-medium">{item.sector}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold">{item.percentage}%</div>
                    <div className="text-xs text-muted-foreground">${item.value.toLocaleString()}</div>
                  </div>
                </div>
                <Progress value={item.percentage} className="h-2" />
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* 详细数据 */}
      <Tabs defaultValue="holdings" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2 lg:w-fit">
          <TabsTrigger value="holdings">持仓明细</TabsTrigger>
          <TabsTrigger value="transactions">交易记录</TabsTrigger>
        </TabsList>

        <TabsContent value="holdings">
          <HoldingsTable />
        </TabsContent>

        <TabsContent value="transactions">
          <TransactionHistory />
        </TabsContent>
      </Tabs>
    </div>
  )
}
