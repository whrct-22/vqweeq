import { Mail, Phone, MapPin, Clock } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-12">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-balance">联系我们</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
          我们很乐意听到您的声音。请通过以下方式与我们联系。
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Form */}
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-4">发送消息</h2>
            <p className="text-muted-foreground">填写下面的表单，我们会尽快回复您。</p>
          </div>

          <Card>
            <CardContent className="pt-6">
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">姓名</Label>
                    <Input id="firstName" placeholder="请输入您的姓名" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">邮箱</Label>
                    <Input id="email" type="email" placeholder="your@email.com" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">主题</Label>
                  <Input id="subject" placeholder="请输入消息主题" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">消息内容</Label>
                  <Textarea id="message" placeholder="请详细描述您的问题或建议..." className="min-h-[120px]" />
                </div>
                <Button className="w-full">发送消息</Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Contact Information */}
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-4">联系信息</h2>
            <p className="text-muted-foreground">您也可以通过以下方式直接联系我们。</p>
          </div>

          <div className="space-y-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">邮箱支持</h3>
                    <p className="text-muted-foreground">support@spacetrader.com</p>
                    <p className="text-sm text-muted-foreground">我们会在24小时内回复</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">电话支持</h3>
                    <p className="text-muted-foreground">+86 400-123-4567</p>
                    <p className="text-sm text-muted-foreground">工作日 9:00-18:00</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">办公地址</h3>
                    <p className="text-muted-foreground">
                      北京市朝阳区建国门外大街1号
                      <br />
                      国贸大厦A座2801室
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">工作时间</h3>
                    <p className="text-muted-foreground">
                      周一至周五: 9:00 - 18:00
                      <br />
                      周六至周日: 10:00 - 16:00
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
