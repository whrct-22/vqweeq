"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { BarChart3, TrendingUp, TrendingDown, Target, Download } from "lucide-react"

const analystReports = [
  {
    id: "1",
    title: "苹果公司深度分析：服务业务驱动长期增长",
    analyst: "高盛研究",
    rating: "买入",
    targetPrice: 200.0,
    currentPrice: 175.43,
    upside: 14.0,
    publishedAt: "2024-01-15",
    summary: "我们维持对苹果的买入评级，目标价200美元。服务业务的强劲增长和iPhone的稳定需求支撑我们的乐观预期。",
    keyPoints: ["服务业务增长20%", "iPhone需求稳定", "新产品线扩张", "现金流强劲"],
    riskFactors: ["中国市场竞争", "供应链风险"],
    confidence: 85,
  },
  {
    id: "2",
    title: "特斯拉：电动车市场领导地位面临挑战",
    analyst: "摩根士丹利",
    rating: "持有",
    targetPrice: 280.0,
    currentPrice: 248.5,
    upside: 12.7,
    publishedAt: "2024-01-14",
    summary: "特斯拉在电动车市场的领导地位面临传统车企的挑战，但其技术优势和品牌价值仍然显著。",
    keyPoints: ["技术领先优势", "超级充电网络", "自动驾驶进展", "能源业务增长"],
    riskFactors: ["竞争加剧", "监管风险", "产能扩张挑战"],
    confidence: 72,
  },
  {
    id: "3",
    title: "英伟达：AI革命的最大受益者",
    analyst: "瑞银证券",
    rating: "买入",
    targetPrice: 1000.0,
    currentPrice: 875.28,
    upside: 14.2,
    publishedAt: "2024-01-13",
    summary: "英伟达在AI芯片市场的主导地位将持续，数据中心业务的强劲需求支撑高增长预期。",
    keyPoints: ["AI芯片需求爆发", "数据中心业务增长", "技术护城河深厚", "新产品发布"],
    riskFactors: ["地缘政治风险", "竞争对手追赶"],
    confidence: 90,
  },
]

export function AnalystReports() {
  const getRatingColor = (rating: string) => {
    switch (rating) {
      case "买入":
        return "bg-chart-5 text-white"
      case "持有":
        return "bg-chart-3 text-white"
      case "卖出":
        return "bg-chart-4 text-white"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const getUpsideColor = (upside: number) => {
    return upside > 0 ? "text-chart-5" : "text-chart-4"
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold">分析师报告</h3>
        </div>
        <Badge variant="outline">本周更新 {analystReports.length} 份</Badge>
      </div>

      <div className="space-y-4">
        {analystReports.map((report) => (
          <Card key={report.id} className="p-6 bg-card border-border">
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="text-lg font-semibold mb-2">{report.title}</h4>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                    <span>{report.analyst}</span>
                    <span>{report.publishedAt}</span>
                  </div>
                  <p className="text-muted-foreground">{report.summary}</p>
                </div>

                <div className="flex flex-col items-end gap-2 ml-4">
                  <Badge className={getRatingColor(report.rating)}>{report.rating}</Badge>
                  <Button variant="outline" size="sm">
                    <Download className="h-3 w-3 mr-2" />
                    下载
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-background rounded-lg">
                <div className="text-center">
                  <div className="text-sm text-muted-foreground">目标价</div>
                  <div className="text-xl font-bold">${report.targetPrice.toFixed(2)}</div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-muted-foreground">当前价</div>
                  <div className="text-xl font-bold">${report.currentPrice.toFixed(2)}</div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-muted-foreground">上涨空间</div>
                  <div
                    className={`text-xl font-bold flex items-center justify-center gap-1 ${getUpsideColor(report.upside)}`}
                  >
                    {report.upside > 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                    {report.upside.toFixed(1)}%
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-medium mb-2 flex items-center gap-2">
                    <Target className="h-4 w-4 text-chart-5" />
                    关键看点
                  </h5>
                  <ul className="space-y-1">
                    {report.keyPoints.map((point, index) => (
                      <li key={index} className="text-sm text-muted-foreground flex items-center gap-2">
                        <div className="w-1 h-1 bg-chart-5 rounded-full"></div>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h5 className="font-medium mb-2 flex items-center gap-2">
                    <TrendingDown className="h-4 w-4 text-chart-4" />
                    风险因素
                  </h5>
                  <ul className="space-y-1">
                    {report.riskFactors.map((risk, index) => (
                      <li key={index} className="text-sm text-muted-foreground flex items-center gap-2">
                        <div className="w-1 h-1 bg-chart-4 rounded-full"></div>
                        {risk}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">分析师信心度:</span>
                  <span className="font-medium">{report.confidence}%</span>
                </div>
                <Progress value={report.confidence} className="w-32 h-2" />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
