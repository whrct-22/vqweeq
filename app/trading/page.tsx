"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MarketDataTable } from "@/components/market-data-table"
import { MarketHeatmap } from "@/components/market-heatmap"
import { SectorAnalysis } from "@/components/sector-analysis"
import { Search, Filter, TrendingUp, BarChart3, PieChart, Globe } from "lucide-react"

export default function TradingPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedMarket, setSelectedMarket] = useState("all")
  const [selectedSector, setSelectedSector] = useState("all")
  const [sortBy, setSortBy] = useState("marketCap")

  return (
    <div className="space-y-6">
      {/* 页面标题和控制栏 */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <TrendingUp className="h-8 w-8 text-primary" />
            市场数据
          </h1>
          <p className="text-muted-foreground">实时股票数据、市场分析和投资机会</p>
        </div>

        <div className="flex flex-wrap gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="搜索股票、ETF..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-64 bg-background border-border"
            />
          </div>

          <Select value={selectedMarket} onValueChange={setSelectedMarket}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="市场" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">全部市场</SelectItem>
              <SelectItem value="us">美股</SelectItem>
              <SelectItem value="cn">A股</SelectItem>
              <SelectItem value="hk">港股</SelectItem>
              <SelectItem value="crypto">加密货币</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedSector} onValueChange={setSelectedSector}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="行业" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">全部行业</SelectItem>
              <SelectItem value="tech">科技</SelectItem>
              <SelectItem value="finance">金融</SelectItem>
              <SelectItem value="healthcare">医疗</SelectItem>
              <SelectItem value="energy">能源</SelectItem>
              <SelectItem value="consumer">消费</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            筛选
          </Button>
        </div>
      </div>

      {/* 市场概览指标 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 bg-card border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">总市值</p>
              <p className="text-2xl font-bold text-primary">$45.2T</p>
              <p className="text-xs text-chart-5">+2.3% 今日</p>
            </div>
            <Globe className="h-8 w-8 text-primary" />
          </div>
        </Card>

        <Card className="p-4 bg-card border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">交易量</p>
              <p className="text-2xl font-bold text-chart-2">$2.4B</p>
              <p className="text-xs text-chart-4">-1.2% 今日</p>
            </div>
            <BarChart3 className="h-8 w-8 text-chart-2" />
          </div>
        </Card>

        <Card className="p-4 bg-card border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">上涨股票</p>
              <p className="text-2xl font-bold text-chart-5">1,247</p>
              <p className="text-xs text-chart-5">+156 今日</p>
            </div>
            <TrendingUp className="h-8 w-8 text-chart-5" />
          </div>
        </Card>

        <Card className="p-4 bg-card border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">活跃股票</p>
              <p className="text-2xl font-bold text-chart-3">3,456</p>
              <p className="text-xs text-muted-foreground">实时更新</p>
            </div>
            <PieChart className="h-8 w-8 text-chart-3" />
          </div>
        </Card>
      </div>

      {/* 主要内容区域 */}
      <Tabs defaultValue="table" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3 lg:w-fit">
          <TabsTrigger value="table">股票列表</TabsTrigger>
          <TabsTrigger value="heatmap">热力图</TabsTrigger>
          <TabsTrigger value="sectors">行业分析</TabsTrigger>
        </TabsList>

        <TabsContent value="table" className="space-y-4">
          <MarketDataTable
            searchQuery={searchQuery}
            selectedMarket={selectedMarket}
            selectedSector={selectedSector}
            sortBy={sortBy}
            onSortChange={setSortBy}
          />
        </TabsContent>

        <TabsContent value="heatmap" className="space-y-4">
          <MarketHeatmap />
        </TabsContent>

        <TabsContent value="sectors" className="space-y-4">
          <SectorAnalysis />
        </TabsContent>
      </Tabs>
    </div>
  )
}
