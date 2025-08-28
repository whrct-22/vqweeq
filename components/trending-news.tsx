"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Clock, Eye } from "lucide-react"

const trendingNews = [
  {
    id: "1",
    title: "苹果股价创历史新高",
    category: "stocks",
    publishedAt: "1小时前",
    views: "12.5K",
    trend: "up",
  },
  {
    id: "2",
    title: "美联储降息预期升温",
    category: "economy",
    publishedAt: "2小时前",
    views: "8.9K",
    trend: "up",
  },
  {
    id: "3",
    title: "比特币突破新高点",
    category: "crypto",
    publishedAt: "3小时前",
    views: "15.2K",
    trend: "up",
  },
  {
    id: "4",
    title: "科技股集体回调",
    category: "market",
    publishedAt: "4小时前",
    views: "6.7K",
    trend: "down",
  },
  {
    id: "5",
    title: "特斯拉交付量超预期",
    category: "stocks",
    publishedAt: "5小时前",
    views: "9.3K",
    trend: "up",
  },
]

const marketSentiment = {
  bullish: 68,
  bearish: 32,
  fearGreedIndex: 72,
}

export function TrendingNews() {
  return (
    <div className="space-y-4">
      <Card className="p-4 bg-card border-border">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="h-5 w-5 text-chart-5" />
          <h3 className="font-semibold">热门新闻</h3>
        </div>

        <div className="space-y-3">
          {trendingNews.map((news, index) => (
            <div key={news.id} className="flex items-start gap-3 p-2 hover:bg-muted/50 rounded-lg cursor-pointer">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-semibold text-primary">
                {index + 1}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium line-clamp-2 mb-1">{news.title}</h4>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {news.publishedAt}
                  <Eye className="h-3 w-3" />
                  {news.views}
                </div>
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
              <span>看涨情绪</span>
              <span className="font-medium text-chart-5">{marketSentiment.bullish}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div className="bg-chart-5 h-2 rounded-full" style={{ width: `${marketSentiment.bullish}%` }}></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>看跌情绪</span>
              <span className="font-medium text-chart-4">{marketSentiment.bearish}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div className="bg-chart-4 h-2 rounded-full" style={{ width: `${marketSentiment.bearish}%` }}></div>
            </div>
          </div>

          <div className="pt-2 border-t border-border">
            <div className="flex justify-between items-center">
              <span className="text-sm">恐惧贪婪指数</span>
              <div className="text-right">
                <div className="font-semibold text-chart-3">{marketSentiment.fearGreedIndex}</div>
                <div className="text-xs text-muted-foreground">贪婪</div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-4 bg-card border-border">
        <h3 className="font-semibold mb-4">今日关键词</h3>
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline">#财报季</Badge>
          <Badge variant="outline">#降息预期</Badge>
          <Badge variant="outline">#AI芯片</Badge>
          <Badge variant="outline">#新能源</Badge>
          <Badge variant="outline">#加密货币</Badge>
        </div>
      </Card>
    </div>
  )
}
