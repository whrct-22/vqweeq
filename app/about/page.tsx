import { Rocket, Users, Shield, TrendingUp } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-12">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent">
            <Rocket className="h-8 w-8 text-primary-foreground" />
          </div>
        </div>
        <h1 className="text-4xl font-bold text-balance">关于 SpaceTrader</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
          我们致力于为投资者提供最先进的交易平台，结合航天科技的精密与金融市场的智慧。
        </p>
      </div>

      {/* Mission Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-4">
          <h2 className="text-3xl font-bold">我们的使命</h2>
          <p className="text-muted-foreground text-pretty">
            SpaceTrader 诞生于对创新交易体验的追求。我们相信，就像航天技术推动人类探索宇宙一样，
            先进的金融科技也能帮助投资者探索财富增长的无限可能。
          </p>
          <p className="text-muted-foreground text-pretty">
            我们的平台融合了最新的数据分析技术、直观的用户界面设计，以及专业级的交易工具，
            为每一位用户提供如宇航员般精确的投资决策支持。
          </p>
        </div>
        <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg p-8 text-center">
          <div className="text-6xl font-bold text-primary mb-2">2024</div>
          <div className="text-muted-foreground">成立年份</div>
          <div className="mt-4 grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-foreground">100K+</div>
              <div className="text-sm text-muted-foreground">活跃用户</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-foreground">99.9%</div>
              <div className="text-sm text-muted-foreground">系统稳定性</div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <TrendingUp className="h-6 w-6 text-primary" />
            </div>
            <CardTitle>专业分析</CardTitle>
            <CardDescription>提供实时市场数据和深度技术分析工具</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">集成多种技术指标和图表工具，帮助您做出明智的投资决策。</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <CardTitle>安全可靠</CardTitle>
            <CardDescription>银行级安全保护，保障您的资产安全</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">采用多重加密技术和严格的风控体系，确保交易安全。</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <CardTitle>社区驱动</CardTitle>
            <CardDescription>连接全球投资者，分享交易策略和见解</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">加入我们的投资者社区，与专业交易员交流学习。</p>
          </CardContent>
        </Card>
      </div>

      {/* Team Section */}
      <div className="text-center space-y-8">
        <div>
          <h2 className="text-3xl font-bold mb-4">我们的团队</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-pretty">
            我们的团队由来自金融科技、航天工程和用户体验设计领域的专家组成， 致力于为用户创造最佳的交易体验。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { name: "张航宇", role: "首席执行官", bg: "from-blue-500/20 to-purple-500/20" },
            { name: "李星辰", role: "技术总监", bg: "from-purple-500/20 to-pink-500/20" },
            { name: "王宇航", role: "产品总监", bg: "from-pink-500/20 to-orange-500/20" },
          ].map((member, index) => (
            <Card key={index}>
              <CardContent className="pt-6">
                <div
                  className={`w-20 h-20 rounded-full bg-gradient-to-br ${member.bg} mx-auto mb-4 flex items-center justify-center`}
                >
                  <span className="text-2xl font-bold">{member.name[0]}</span>
                </div>
                <h3 className="font-semibold text-lg">{member.name}</h3>
                <p className="text-muted-foreground">{member.role}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
