import { Shield, Eye, Lock, Database } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-12">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent">
            <Shield className="h-8 w-8 text-primary-foreground" />
          </div>
        </div>
        <h1 className="text-4xl font-bold text-balance">隐私政策</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
          我们重视您的隐私，致力于保护您的个人信息安全
        </p>
        <p className="text-sm text-muted-foreground">最后更新：2024年1月1日</p>
      </div>

      {/* Privacy Principles */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mx-auto">
              <Eye className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="text-lg">透明度</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground text-center">我们清楚说明收集哪些信息以及如何使用</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mx-auto">
              <Lock className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="text-lg">安全性</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground text-center">采用先进的加密技术保护您的数据</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mx-auto">
              <Database className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="text-lg">控制权</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground text-center">您可以随时查看、修改或删除个人信息</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mx-auto">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="text-lg">合规性</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground text-center">严格遵守相关法律法规和行业标准</p>
          </CardContent>
        </Card>
      </div>

      {/* Privacy Policy Content */}
      <div className="max-w-4xl mx-auto space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>1. 信息收集</CardTitle>
            <CardDescription>我们收集的信息类型及收集方式</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">个人信息</h4>
              <p className="text-muted-foreground text-sm">
                包括但不限于：姓名、邮箱地址、电话号码、身份证明文件、银行账户信息等。
                这些信息用于账户注册、身份验证和交易处理。
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">使用数据</h4>
              <p className="text-muted-foreground text-sm">
                我们收集您在使用平台时的行为数据，包括交易记录、浏览历史、设备信息等， 用于改善服务质量和用户体验。
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>2. 信息使用</CardTitle>
            <CardDescription>我们如何使用您的个人信息</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• 提供和维护我们的交易服务</li>
              <li>• 处理交易和管理您的账户</li>
              <li>• 发送重要通知和服务更新</li>
              <li>• 改善我们的产品和服务</li>
              <li>• 遵守法律法规要求</li>
              <li>• 防范欺诈和保障安全</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>3. 信息共享</CardTitle>
            <CardDescription>在什么情况下我们会共享您的信息</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground text-sm">
              我们不会出售、租赁或以其他方式向第三方披露您的个人信息，除非：
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• 获得您的明确同意</li>
              <li>• 法律法规要求或政府部门要求</li>
              <li>• 与我们的服务提供商共享（仅限于提供服务所需）</li>
              <li>• 保护我们或他人的合法权益</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>4. 数据安全</CardTitle>
            <CardDescription>我们如何保护您的信息安全</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• 使用SSL加密技术保护数据传输</li>
              <li>• 采用多层防火墙和入侵检测系统</li>
              <li>• 定期进行安全审计和漏洞扫描</li>
              <li>• 限制员工访问权限，实行最小权限原则</li>
              <li>• 建立完善的数据备份和恢复机制</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>5. 您的权利</CardTitle>
            <CardDescription>您对个人信息享有的权利</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• 查看和获取您的个人信息副本</li>
              <li>• 更正不准确或不完整的信息</li>
              <li>• 删除您的个人信息（在法律允许的范围内）</li>
              <li>• 限制或反对某些信息处理活动</li>
              <li>• 数据可携带权</li>
              <li>• 撤回同意（不影响撤回前的合法处理）</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>6. 联系我们</CardTitle>
            <CardDescription>如有隐私相关问题，请联系我们</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm">
              如果您对本隐私政策有任何疑问或需要行使您的权利，请通过以下方式联系我们：
            </p>
            <div className="mt-4 space-y-2 text-sm">
              <p>
                <strong>邮箱：</strong> privacy@spacetrader.com
              </p>
              <p>
                <strong>电话：</strong> +86 400-123-4567
              </p>
              <p>
                <strong>地址：</strong> 北京市朝阳区建国门外大街1号国贸大厦A座2801室
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
