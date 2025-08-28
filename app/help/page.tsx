import { Search, MessageCircle, Book, Video, Mail, Phone } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function HelpPage() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-12">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-balance">帮助中心</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
          找到您需要的答案，或联系我们的专业支持团队
        </p>
      </div>

      {/* Search */}
      <div className="max-w-2xl mx-auto">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="搜索帮助文档..." className="pl-10 h-12" />
        </div>
      </div>

      {/* Quick Help Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader>
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <Book className="h-6 w-6 text-primary" />
            </div>
            <CardTitle>新手指南</CardTitle>
            <CardDescription>从零开始学习如何使用 SpaceTrader</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• 如何注册账户</li>
              <li>• 平台功能介绍</li>
              <li>• 首次交易指南</li>
              <li>• 安全设置教程</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader>
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <Video className="h-6 w-6 text-primary" />
            </div>
            <CardTitle>交易教程</CardTitle>
            <CardDescription>学习专业的交易技巧和策略</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• 技术分析基础</li>
              <li>• 图表工具使用</li>
              <li>• 风险管理策略</li>
              <li>• 高级交易功能</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader>
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <MessageCircle className="h-6 w-6 text-primary" />
            </div>
            <CardTitle>常见问题</CardTitle>
            <CardDescription>快速找到常见问题的解答</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• 账户相关问题</li>
              <li>• 交易手续费说明</li>
              <li>• 资金安全保障</li>
              <li>• 技术支持</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* FAQ Section */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-center">常见问题解答</h2>
        <div className="space-y-4 max-w-4xl mx-auto">
          {[
            {
              q: "如何开始使用 SpaceTrader？",
              a: "注册账户后，完成身份验证，即可开始使用我们的交易平台。我们建议新用户先浏览新手指南。",
            },
            {
              q: "平台的交易手续费是多少？",
              a: "我们提供竞争力的手续费结构，具体费率请查看费率说明页面，VIP用户享有更优惠的费率。",
            },
            {
              q: "如何保障资金安全？",
              a: "我们采用银行级加密技术，资金存放在受监管的第三方托管机构，并提供多重安全验证。",
            },
            {
              q: "支持哪些交易品种？",
              a: "平台支持股票、ETF、期货、外汇等多种交易品种，覆盖全球主要市场。",
            },
          ].map((faq, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="text-lg">{faq.q}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{faq.a}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Contact Support */}
      <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-lg p-8">
        <div className="text-center space-y-6">
          <h2 className="text-2xl font-bold">需要更多帮助？</h2>
          <p className="text-muted-foreground">我们的专业支持团队随时为您提供帮助</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-md mx-auto">
            <Button variant="outline" className="flex items-center gap-2 bg-transparent">
              <Mail className="h-4 w-4" />
              发送邮件
            </Button>
            <Button variant="outline" className="flex items-center gap-2 bg-transparent">
              <Phone className="h-4 w-4" />
              电话支持
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
