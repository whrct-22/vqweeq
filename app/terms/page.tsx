import { FileText, Scale, AlertTriangle, CheckCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-12">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent">
            <Scale className="h-8 w-8 text-primary-foreground" />
          </div>
        </div>
        <h1 className="text-4xl font-bold text-balance">服务条款</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
          使用 SpaceTrader 服务前，请仔细阅读以下条款
        </p>
        <p className="text-sm text-muted-foreground">最后更新：2024年1月1日</p>
      </div>

      {/* Key Points */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mx-auto">
              <CheckCircle className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="text-lg">服务承诺</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground text-center">提供稳定、安全的交易平台服务</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mx-auto">
              <AlertTriangle className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="text-lg">风险提示</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground text-center">投资有风险，请谨慎决策</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mx-auto">
              <FileText className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="text-lg">用户责任</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground text-center">遵守法律法规和平台规则</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mx-auto">
              <Scale className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="text-lg">争议解决</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground text-center">通过协商或仲裁解决争议</p>
          </CardContent>
        </Card>
      </div>

      {/* Terms Content */}
      <div className="max-w-4xl mx-auto space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>1. 服务说明</CardTitle>
            <CardDescription>SpaceTrader 提供的服务内容</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground text-sm">
              SpaceTrader 是一个在线交易平台，为用户提供股票、ETF、期货、外汇等金融产品的交易服务。
              我们致力于为用户提供专业、安全、便捷的交易体验。
            </p>
            <div>
              <h4 className="font-semibold mb-2">服务内容包括：</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• 实时市场数据和图表分析工具</li>
                <li>• 在线交易执行服务</li>
                <li>• 投资组合管理工具</li>
                <li>• 市场新闻和分析报告</li>
                <li>• 客户支持服务</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>2. 用户注册与账户</CardTitle>
            <CardDescription>账户注册和管理相关规定</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">注册要求：</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• 年满18周岁的自然人或合法注册的法人实体</li>
                <li>• 提供真实、准确、完整的注册信息</li>
                <li>• 通过身份验证和风险评估</li>
                <li>• 同意遵守本服务条款</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">账户安全：</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• 妥善保管账户密码和安全信息</li>
                <li>• 及时更新个人信息变更</li>
                <li>• 发现异常情况立即联系客服</li>
                <li>• 不得将账户转让给他人使用</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>3. 交易规则</CardTitle>
            <CardDescription>平台交易相关规定</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">交易时间：</h4>
              <p className="text-muted-foreground text-sm">遵循各交易所的交易时间规定，具体时间以平台显示为准。</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">费用说明：</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• 交易佣金按照费率表收取</li>
                <li>• 可能产生的其他费用将事先告知</li>
                <li>• VIP用户享有优惠费率</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">风险提示：</h4>
              <p className="text-muted-foreground text-sm">
                金融投资存在市场风险，过往业绩不代表未来表现。用户应根据自身风险承受能力谨慎投资。
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>4. 禁止行为</CardTitle>
            <CardDescription>用户不得从事的行为</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• 利用平台进行洗钱、欺诈等违法活动</li>
              <li>• 操纵市场价格或进行内幕交易</li>
              <li>• 恶意攻击平台系统或传播病毒</li>
              <li>• 发布虚假信息或误导性内容</li>
              <li>• 侵犯他人知识产权或隐私权</li>
              <li>• 其他违反法律法规的行为</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>5. 免责声明</CardTitle>
            <CardDescription>平台责任限制说明</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground text-sm">在法律允许的最大范围内，SpaceTrader 对以下情况不承担责任：</p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• 因市场波动造成的投资损失</li>
              <li>• 因不可抗力导致的服务中断</li>
              <li>• 因用户操作失误造成的损失</li>
              <li>• 第三方服务提供商的问题</li>
              <li>• 超出我们合理控制范围的其他情况</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>6. 条款修改</CardTitle>
            <CardDescription>服务条款的变更说明</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm">
              我们保留随时修改本服务条款的权利。重要修改将通过平台公告、邮件等方式通知用户。
              继续使用服务即表示您接受修改后的条款。如不同意修改，请停止使用我们的服务。
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
