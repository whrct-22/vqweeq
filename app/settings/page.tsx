"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import { useSettings } from "@/hooks/use-settings"
import { Settings, Bell, Shield, Palette, Globe, Smartphone, Save, RotateCcw, Loader2 } from "lucide-react"

export default function SettingsPage() {
  const { toast } = useToast()
  const {
    settings,
    isLoading,
    hasUnsavedChanges,
    saveSettings,
    updateNotifications,
    updatePreferences,
    updateSecurity,
    updateTrading,
    resetSettings,
  } = useSettings()

  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async () => {
    setIsSaving(true)
    const result = await saveSettings()

    if (result.success) {
      toast({
        title: "设置已保存",
        description: "您的设置已成功保存",
      })
    } else {
      toast({
        title: "保存失败",
        description: result.error || "保存设置时出现错误",
        variant: "destructive",
      })
    }
    setIsSaving(false)
  }

  const handleReset = () => {
    resetSettings()
    toast({
      title: "设置已重置",
      description: "所有设置已恢复为默认值",
    })
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Settings className="h-8 w-8 text-primary" />
            设置
          </h1>
          <p className="text-muted-foreground">管理您的账户设置和偏好</p>
        </div>
        {hasUnsavedChanges && (
          <div className="text-sm text-yellow-500 flex items-center gap-2">
            <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse" />
            有未保存的更改
          </div>
        )}
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 lg:w-fit">
          <TabsTrigger value="general">通用</TabsTrigger>
          <TabsTrigger value="notifications">通知</TabsTrigger>
          <TabsTrigger value="security">安全</TabsTrigger>
          <TabsTrigger value="trading">交易</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <Card className="p-6 bg-card border-border">
            <div className="flex items-center gap-2 mb-4">
              <Palette className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">外观设置</h3>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="theme">主题</Label>
                  <Select
                    value={settings.preferences.theme}
                    onValueChange={(value) => updatePreferences({ theme: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">浅色</SelectItem>
                      <SelectItem value="dark">深色</SelectItem>
                      <SelectItem value="system">跟随系统</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="language">语言</Label>
                  <Select
                    value={settings.preferences.language}
                    onValueChange={(value) => updatePreferences({ language: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="zh-CN">简体中文</SelectItem>
                      <SelectItem value="en-US">English</SelectItem>
                      <SelectItem value="ja-JP">日本語</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-card border-border">
            <div className="flex items-center gap-2 mb-4">
              <Globe className="h-5 w-5 text-chart-2" />
              <h3 className="text-lg font-semibold">区域设置</h3>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="currency">货币</Label>
                  <Select
                    value={settings.preferences.currency}
                    onValueChange={(value) => updatePreferences({ currency: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">美元 (USD)</SelectItem>
                      <SelectItem value="CNY">人民币 (CNY)</SelectItem>
                      <SelectItem value="EUR">欧元 (EUR)</SelectItem>
                      <SelectItem value="JPY">日元 (JPY)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="timezone">时区</Label>
                  <Select
                    value={settings.preferences.timezone}
                    onValueChange={(value) => updatePreferences({ timezone: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Asia/Shanghai">上海 (UTC+8)</SelectItem>
                      <SelectItem value="America/New_York">纽约 (UTC-5)</SelectItem>
                      <SelectItem value="Europe/London">伦敦 (UTC+0)</SelectItem>
                      <SelectItem value="Asia/Tokyo">东京 (UTC+9)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card className="p-6 bg-card border-border">
            <div className="flex items-center gap-2 mb-4">
              <Bell className="h-5 w-5 text-chart-3" />
              <h3 className="text-lg font-semibold">通知设置</h3>
            </div>

            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="price-alerts">价格提醒</Label>
                    <p className="text-sm text-muted-foreground">当股票价格达到设定值时通知您</p>
                  </div>
                  <Switch
                    id="price-alerts"
                    checked={settings.notifications.priceAlerts}
                    onCheckedChange={(checked) => updateNotifications({ priceAlerts: checked })}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="news-updates">新闻更新</Label>
                    <p className="text-sm text-muted-foreground">接收重要市场新闻和分析</p>
                  </div>
                  <Switch
                    id="news-updates"
                    checked={settings.notifications.newsUpdates}
                    onCheckedChange={(checked) => updateNotifications({ newsUpdates: checked })}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="market-open">开盘提醒</Label>
                    <p className="text-sm text-muted-foreground">市场开盘时发送通知</p>
                  </div>
                  <Switch
                    id="market-open"
                    checked={settings.notifications.marketOpen}
                    onCheckedChange={(checked) => updateNotifications({ marketOpen: checked })}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="portfolio-updates">投资组合更新</Label>
                    <p className="text-sm text-muted-foreground">投资组合重大变化时通知</p>
                  </div>
                  <Switch
                    id="portfolio-updates"
                    checked={settings.notifications.portfolioUpdates}
                    onCheckedChange={(checked) => updateNotifications({ portfolioUpdates: checked })}
                  />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium">通知方式</h4>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="email-notifications">邮件通知</Label>
                    <p className="text-sm text-muted-foreground">通过邮件接收通知</p>
                  </div>
                  <Switch
                    id="email-notifications"
                    checked={settings.notifications.emailNotifications}
                    onCheckedChange={(checked) => updateNotifications({ emailNotifications: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="push-notifications">推送通知</Label>
                    <p className="text-sm text-muted-foreground">通过浏览器推送通知</p>
                  </div>
                  <Switch
                    id="push-notifications"
                    checked={settings.notifications.pushNotifications}
                    onCheckedChange={(checked) => updateNotifications({ pushNotifications: checked })}
                  />
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card className="p-6 bg-card border-border">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="h-5 w-5 text-chart-4" />
              <h3 className="text-lg font-semibold">安全设置</h3>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="two-factor">双重认证</Label>
                  <p className="text-sm text-muted-foreground">为您的账户添加额外的安全保护</p>
                </div>
                <Switch
                  id="two-factor"
                  checked={settings.security.twoFactorAuth}
                  onCheckedChange={(checked) => updateSecurity({ twoFactorAuth: checked })}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="login-alerts">登录提醒</Label>
                  <p className="text-sm text-muted-foreground">新设备登录时发送通知</p>
                </div>
                <Switch
                  id="login-alerts"
                  checked={settings.security.loginAlerts}
                  onCheckedChange={(checked) => updateSecurity({ loginAlerts: checked })}
                />
              </div>

              <Separator />

              <div className="space-y-2">
                <Label htmlFor="session-timeout">会话超时</Label>
                <Select
                  value={settings.security.sessionTimeout}
                  onValueChange={(value) => updateSecurity({ sessionTimeout: value })}
                >
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">15分钟</SelectItem>
                    <SelectItem value="30">30分钟</SelectItem>
                    <SelectItem value="60">1小时</SelectItem>
                    <SelectItem value="240">4小时</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">无操作后自动退出登录的时间</p>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="biometric">生物识别登录</Label>
                  <p className="text-sm text-muted-foreground">使用指纹或面部识别登录</p>
                </div>
                <Switch
                  id="biometric"
                  checked={settings.security.biometricLogin}
                  onCheckedChange={(checked) => updateSecurity({ biometricLogin: checked })}
                />
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-card border-border">
            <h3 className="text-lg font-semibold mb-4">密码管理</h3>
            <div className="space-y-4">
              <Button variant="outline" className="w-full justify-start bg-transparent">
                更改密码
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                下载备份码
              </Button>
              <Button variant="outline" className="w-full justify-start text-chart-4 bg-transparent">
                注销所有设备
              </Button>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="trading" className="space-y-6">
          <Card className="p-6 bg-card border-border">
            <div className="flex items-center gap-2 mb-4">
              <Smartphone className="h-5 w-5 text-chart-5" />
              <h3 className="text-lg font-semibold">交易偏好</h3>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="chart-type">默认图表类型</Label>
                  <Select
                    value={settings.preferences.chartType}
                    onValueChange={(value) => updatePreferences({ chartType: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="candlestick">K线图</SelectItem>
                      <SelectItem value="line">线图</SelectItem>
                      <SelectItem value="area">面积图</SelectItem>
                      <SelectItem value="bar">柱状图</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="timeframe">默认时间周期</Label>
                  <Select
                    value={settings.preferences.defaultTimeframe}
                    onValueChange={(value) => updatePreferences({ defaultTimeframe: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1m">1分钟</SelectItem>
                      <SelectItem value="5m">5分钟</SelectItem>
                      <SelectItem value="15m">15分钟</SelectItem>
                      <SelectItem value="1H">1小时</SelectItem>
                      <SelectItem value="1D">1天</SelectItem>
                      <SelectItem value="1W">1周</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-card border-border">
            <h3 className="text-lg font-semibold mb-4">风险管理</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="max-position">单笔最大仓位 (%)</Label>
                <Input
                  id="max-position"
                  type="number"
                  value={settings.trading.maxPosition}
                  onChange={(e) => updateTrading({ maxPosition: e.target.value })}
                  className="w-32"
                />
                <p className="text-sm text-muted-foreground">单只股票最大持仓比例</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="stop-loss">默认止损 (%)</Label>
                <Input
                  id="stop-loss"
                  type="number"
                  value={settings.trading.stopLoss}
                  onChange={(e) => updateTrading({ stopLoss: e.target.value })}
                  className="w-32"
                />
                <p className="text-sm text-muted-foreground">新建仓位的默认止损比例</p>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={handleReset} disabled={isSaving}>
          <RotateCcw className="h-4 w-4 mr-2" />
          重置设置
        </Button>
        <Button onClick={handleSave} disabled={isSaving || !hasUnsavedChanges}>
          {isSaving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
          保存更改
        </Button>
      </div>
    </div>
  )
}
