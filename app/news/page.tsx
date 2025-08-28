"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { NewsGrid } from "@/components/news-grid"
import { AnalystReports } from "@/components/analyst-reports"
import { MarketInsights } from "@/components/market-insights"
import { TrendingNews } from "@/components/trending-news"
import { Newspaper, Search, Filter, TrendingUp, BarChart3 } from "lucide-react"

export default function NewsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedSource, setSelectedSource] = useState("all")
  const [timeFilter, setTimeFilter] = useState("today")

  const categories = [
    { id: "all", name: "全部", count: 156 },
    { id: "market", name: "市场动态", count: 45 },
    { id: "stocks", name: "个股新闻", count: 38 },
    { id: "crypto", name: "加密货币", count: 23 },
    { id: "economy", name: "宏观经济", count: 28 },
    { id: "tech", name: "科技", count: 22 },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Newspaper className="h-8 w-8 text-primary" />
            新闻分析
          </h1>
          <p className="text-muted-foreground">获取最新的市场新闻、分析报告和投资洞察</p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            筛选
          </Button>
        </div>
      </div>

      {/* 分类标签 */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(category.id)}
            className="flex items-center gap-2"
          >
            {category.name}
            <Badge variant="secondary" className="ml-1">
              {category.count}
            </Badge>
          </Button>
        ))}
      </div>

      {/* 搜索和筛选栏 */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="搜索新闻、股票代码..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-background border-border"
          />
        </div>

        <div className="flex gap-2">
          <Select value={selectedSource} onValueChange={setSelectedSource}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="来源" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">全部来源</SelectItem>
              <SelectItem value="reuters">路透社</SelectItem>
              <SelectItem value="bloomberg">彭博社</SelectItem>
              <SelectItem value="wsj">华尔街日报</SelectItem>
              <SelectItem value="cnbc">CNBC</SelectItem>
            </SelectContent>
          </Select>

          <Select value={timeFilter} onValueChange={setTimeFilter}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="时间" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">今天</SelectItem>
              <SelectItem value="week">本周</SelectItem>
              <SelectItem value="month">本月</SelectItem>
              <SelectItem value="all">全部</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* 热门新闻侧边栏 */}
        <div className="lg:col-span-1">
          <TrendingNews />
        </div>

        {/* 主要内容区域 */}
        <div className="lg:col-span-3">
          <Tabs defaultValue="news" className="space-y-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="news" className="flex items-center gap-2">
                <Newspaper className="h-4 w-4" />
                新闻
              </TabsTrigger>
              <TabsTrigger value="reports" className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                分析报告
              </TabsTrigger>
              <TabsTrigger value="insights" className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                市场洞察
              </TabsTrigger>
            </TabsList>

            <TabsContent value="news">
              <NewsGrid
                searchQuery={searchQuery}
                category={selectedCategory}
                source={selectedSource}
                timeFilter={timeFilter}
              />
            </TabsContent>

            <TabsContent value="reports">
              <AnalystReports />
            </TabsContent>

            <TabsContent value="insights">
              <MarketInsights />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
