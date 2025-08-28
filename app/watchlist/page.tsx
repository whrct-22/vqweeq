"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { WatchlistTable } from "@/components/watchlist-table"
import { PriceAlerts } from "@/components/price-alerts"
import { Star, Plus, Search, Bell, TrendingUp } from "lucide-react"

export default function WatchlistPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedList, setSelectedList] = useState("default")

  const watchlists = [
    { id: "default", name: "默认关注", count: 12 },
    { id: "tech", name: "科技股", count: 8 },
    { id: "crypto", name: "加密货币", count: 5 },
    { id: "dividend", name: "分红股", count: 6 },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Star className="h-8 w-8 text-primary" />
            关注列表
          </h1>
          <p className="text-muted-foreground">管理您关注的股票和价格提醒</p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Bell className="h-4 w-4 mr-2" />
            价格提醒
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            添加股票
          </Button>
        </div>
      </div>

      {/* 关注列表选择 */}
      <div className="flex flex-wrap gap-2">
        {watchlists.map((list) => (
          <Button
            key={list.id}
            variant={selectedList === list.id ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedList(list.id)}
            className="flex items-center gap-2"
          >
            <Star className="h-3 w-3" />
            {list.name}
            <Badge variant="secondary" className="ml-1">
              {list.count}
            </Badge>
          </Button>
        ))}
      </div>

      {/* 搜索栏 */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="搜索关注的股票..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-background border-border"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">排序:</span>
          <Button variant="outline" size="sm">
            涨跌幅
          </Button>
        </div>
      </div>

      {/* 主要内容 */}
      <Tabs defaultValue="watchlist" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2 lg:w-fit">
          <TabsTrigger value="watchlist">关注股票</TabsTrigger>
          <TabsTrigger value="alerts">价格提醒</TabsTrigger>
        </TabsList>

        <TabsContent value="watchlist">
          <WatchlistTable searchQuery={searchQuery} selectedList={selectedList} />
        </TabsContent>

        <TabsContent value="alerts">
          <PriceAlerts />
        </TabsContent>
      </Tabs>

      {/* 快速统计 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4 bg-card border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">关注股票总数</p>
              <p className="text-2xl font-bold">31</p>
            </div>
            <Star className="h-8 w-8 text-chart-3" />
          </div>
        </Card>

        <Card className="p-4 bg-card border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">今日上涨</p>
              <p className="text-2xl font-bold text-chart-5">18</p>
            </div>
            <TrendingUp className="h-8 w-8 text-chart-5" />
          </div>
        </Card>

        <Card className="p-4 bg-card border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">活跃提醒</p>
              <p className="text-2xl font-bold text-chart-2">7</p>
            </div>
            <Bell className="h-8 w-8 text-chart-2" />
          </div>
        </Card>
      </div>
    </div>
  )
}
