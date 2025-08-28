"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, ExternalLink, TrendingUp, TrendingDown, Newspaper } from "lucide-react"

interface NewsGridProps {
  searchQuery: string
  category: string
  source: string
  timeFilter: string
}

const mockNews = [
  {
    id: "1",
    title: "苹果公司发布Q4财报，营收超预期增长15%",
    summary:
      "苹果公司公布了第四季度财报，营收达到1234亿美元，同比增长15%，超出分析师预期。iPhone销量强劲，服务业务持续增长。",
    source: "路透社",
    category: "stocks",
    publishedAt: "2小时前",
    image: "/placeholder.svg?height=200&width=300",
    relatedStocks: ["AAPL"],
    sentiment: "positive",
    readTime: "3分钟",
  },
  {
    id: "2",
    title: "美联储暗示可能在下次会议上降息",
    summary: "美联储主席在最新讲话中暗示，考虑到通胀压力缓解和经济增长放缓，央行可能在下次货币政策会议上考虑降息。",
    source: "彭博社",
    category: "economy",
    publishedAt: "4小时前",
    image: "/placeholder.svg?height=200&width=300",
    relatedStocks: ["SPY", "QQQ"],
    sentiment: "neutral",
    readTime: "5分钟",
  },
  {
    id: "3",
    title: "特斯拉在中国市场销量创新高",
    summary: "特斯拉在中国市场的月度销量达到历史新高，Model Y和Model 3的需求强劲。公司计划在上海工厂增加产能。",
    source: "华尔街日报",
    category: "stocks",
    publishedAt: "6小时前",
    image: "/placeholder.svg?height=200&width=300",
    relatedStocks: ["TSLA"],
    sentiment: "positive",
    readTime: "4分钟",
  },
  {
    id: "4",
    title: "比特币突破7万美元，创历史新高",
    summary: "比特币价格突破7万美元大关，创下历史新高。机构投资者持续买入，ETF资金流入创纪录。",
    source: "CNBC",
    category: "crypto",
    publishedAt: "8小时前",
    image: "/placeholder.svg?height=200&width=300",
    relatedStocks: ["BTC-USD"],
    sentiment: "positive",
    readTime: "2分钟",
  },
  {
    id: "5",
    title: "科技股集体下跌，投资者担忧估值过高",
    summary: "纳斯达克指数下跌2.5%，科技股普遍下跌。投资者对高估值科技股的担忧加剧，资金流向价值股。",
    source: "路透社",
    category: "market",
    publishedAt: "10小时前",
    image: "/placeholder.svg?height=200&width=300",
    relatedStocks: ["QQQ", "AAPL", "MSFT"],
    sentiment: "negative",
    readTime: "4分钟",
  },
  {
    id: "6",
    title: "英伟达发布新一代AI芯片，性能提升50%",
    summary: "英伟达发布了新一代AI芯片，性能比上一代提升50%。公司预计AI芯片需求将持续强劲增长。",
    source: "彭博社",
    category: "tech",
    publishedAt: "12小时前",
    image: "/placeholder.svg?height=200&width=300",
    relatedStocks: ["NVDA"],
    sentiment: "positive",
    readTime: "6分钟",
  },
]

export function NewsGrid({ searchQuery, category, source, timeFilter }: NewsGridProps) {
  const filteredNews = mockNews.filter((news) => {
    const matchesSearch =
      news.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      news.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      news.relatedStocks.some((stock) => stock.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesCategory = category === "all" || news.category === category
    const matchesSource = source === "all" || news.source.includes(source)

    return matchesSearch && matchesCategory && matchesSource
  })

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return "text-chart-5"
      case "negative":
        return "text-chart-4"
      default:
        return "text-muted-foreground"
    }
  }

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return <TrendingUp className="h-3 w-3" />
      case "negative":
        return <TrendingDown className="h-3 w-3" />
      default:
        return null
    }
  }

  const getCategoryColor = (category: string) => {
    const colors = {
      market: "bg-chart-1 text-white",
      stocks: "bg-chart-2 text-white",
      crypto: "bg-chart-3 text-white",
      economy: "bg-chart-4 text-white",
      tech: "bg-chart-5 text-white",
    }
    return colors[category as keyof typeof colors] || "bg-muted text-muted-foreground"
  }

  return (
    <div className="space-y-6">
      {/* 头条新闻 */}
      {filteredNews.length > 0 && (
        <Card className="p-6 bg-card border-border">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <img
                src={filteredNews[0].image || "/placeholder.svg"}
                alt={filteredNews[0].title}
                className="w-full h-48 object-cover rounded-lg"
              />
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Badge className={getCategoryColor(filteredNews[0].category)}>
                  {filteredNews[0].category === "market" && "市场动态"}
                  {filteredNews[0].category === "stocks" && "个股新闻"}
                  {filteredNews[0].category === "crypto" && "加密货币"}
                  {filteredNews[0].category === "economy" && "宏观经济"}
                  {filteredNews[0].category === "tech" && "科技"}
                </Badge>
                <div className={`flex items-center gap-1 ${getSentimentColor(filteredNews[0].sentiment)}`}>
                  {getSentimentIcon(filteredNews[0].sentiment)}
                </div>
              </div>
              <h2 className="text-2xl font-bold leading-tight">{filteredNews[0].title}</h2>
              <p className="text-muted-foreground">{filteredNews[0].summary}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>{filteredNews[0].source}</span>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {filteredNews[0].publishedAt}
                  </div>
                  <span>{filteredNews[0].readTime}</span>
                </div>
                <Button size="sm">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  阅读全文
                </Button>
              </div>
              {filteredNews[0].relatedStocks.length > 0 && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">相关股票:</span>
                  {filteredNews[0].relatedStocks.map((stock) => (
                    <Badge key={stock} variant="outline">
                      {stock}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>
        </Card>
      )}

      {/* 新闻网格 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNews.slice(1).map((news) => (
          <Card key={news.id} className="p-4 bg-card border-border hover:shadow-lg transition-shadow">
            <div className="space-y-4">
              <img
                src={news.image || "/placeholder.svg"}
                alt={news.title}
                className="w-full h-32 object-cover rounded-lg"
              />

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Badge className={getCategoryColor(news.category)}>
                    {news.category === "market" && "市场"}
                    {news.category === "stocks" && "个股"}
                    {news.category === "crypto" && "加密"}
                    {news.category === "economy" && "经济"}
                    {news.category === "tech" && "科技"}
                  </Badge>
                  <div className={`flex items-center gap-1 ${getSentimentColor(news.sentiment)}`}>
                    {getSentimentIcon(news.sentiment)}
                  </div>
                </div>

                <h3 className="font-semibold leading-tight line-clamp-2">{news.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-3">{news.summary}</p>
              </div>

              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{news.source}</span>
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {news.publishedAt}
                </div>
              </div>

              {news.relatedStocks.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {news.relatedStocks.map((stock) => (
                    <Badge key={stock} variant="outline" className="text-xs">
                      {stock}
                    </Badge>
                  ))}
                </div>
              )}

              <Button variant="outline" size="sm" className="w-full bg-transparent">
                <ExternalLink className="h-3 w-3 mr-2" />
                阅读更多
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {filteredNews.length === 0 && (
        <Card className="p-12 bg-card border-border text-center">
          <Newspaper className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">没有找到相关新闻</h3>
          <p className="text-muted-foreground">请尝试调整搜索条件或筛选器</p>
        </Card>
      )}
    </div>
  )
}
