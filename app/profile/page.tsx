"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { User, Settings, Camera, Mail, Phone, MapPin, Calendar, Award, TrendingUp } from "lucide-react"

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [userInfo, setUserInfo] = useState({
    name: "太空交易员",
    email: "trader@space.com",
    phone: "+86 138 0013 8000",
    location: "上海, 中国",
    joinDate: "2023年1月",
    bio: "专注于科技股投资，擅长技术分析和长期价值投资。",
  })

  const achievements = [
    { title: "新手交易员", description: "完成首次交易", icon: "🚀", earned: true },
    { title: "稳定盈利", description: "连续3个月盈利", icon: "📈", earned: true },
    { title: "风险控制", description: "最大回撤控制在5%以内", icon: "🛡️", earned: false },
    { title: "长期投资者", description: "持有股票超过1年", icon: "⏰", earned: true },
  ]

  const tradingStats = [
    { label: "总收益率", value: "+18.5%", color: "text-chart-5" },
    { label: "总交易次数", value: "247", color: "text-foreground" },
    { label: "胜率", value: "68.4%", color: "text-chart-5" },
    { label: "最大回撤", value: "-3.2%", color: "text-chart-4" },
    { label: "夏普比率", value: "1.85", color: "text-chart-2" },
    { label: "交易经验", value: "2年", color: "text-foreground" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <User className="h-8 w-8 text-primary" />
            个人资料
          </h1>
          <p className="text-muted-foreground">管理您的账户信息和交易偏好</p>
        </div>

        <Button variant={isEditing ? "default" : "outline"} onClick={() => setIsEditing(!isEditing)}>
          <Settings className="h-4 w-4 mr-2" />
          {isEditing ? "保存更改" : "编辑资料"}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 用户信息卡片 */}
        <Card className="p-6 bg-card border-border">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="relative">
              <Avatar className="h-24 w-24">
                <AvatarImage src="/placeholder.svg?height=96&width=96" />
                <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
                  {userInfo.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              {isEditing && (
                <Button size="sm" className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0">
                  <Camera className="h-4 w-4" />
                </Button>
              )}
            </div>

            <div className="space-y-2">
              {isEditing ? (
                <Input
                  value={userInfo.name}
                  onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
                  className="text-center font-semibold"
                />
              ) : (
                <h2 className="text-xl font-semibold">{userInfo.name}</h2>
              )}
              <Badge variant="secondary" className="bg-primary/10 text-primary">
                高级会员
              </Badge>
            </div>

            <div className="w-full space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                {isEditing ? (
                  <Input
                    value={userInfo.email}
                    onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                    className="flex-1 h-8"
                  />
                ) : (
                  <span>{userInfo.email}</span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                {isEditing ? (
                  <Input
                    value={userInfo.phone}
                    onChange={(e) => setUserInfo({ ...userInfo, phone: e.target.value })}
                    className="flex-1 h-8"
                  />
                ) : (
                  <span>{userInfo.phone}</span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                {isEditing ? (
                  <Input
                    value={userInfo.location}
                    onChange={(e) => setUserInfo({ ...userInfo, location: e.target.value })}
                    className="flex-1 h-8"
                  />
                ) : (
                  <span>{userInfo.location}</span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>加入于 {userInfo.joinDate}</span>
              </div>
            </div>

            {isEditing ? (
              <div className="w-full">
                <Label htmlFor="bio" className="text-sm font-medium">
                  个人简介
                </Label>
                <textarea
                  id="bio"
                  value={userInfo.bio}
                  onChange={(e) => setUserInfo({ ...userInfo, bio: e.target.value })}
                  className="w-full mt-1 p-2 text-sm border border-border rounded-md bg-background resize-none"
                  rows={3}
                />
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">{userInfo.bio}</p>
            )}
          </div>
        </Card>

        {/* 交易统计 */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6 bg-card border-border">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="h-5 w-5 text-chart-5" />
              <h3 className="text-lg font-semibold">交易统计</h3>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {tradingStats.map((stat) => (
                <div key={stat.label} className="text-center p-4 bg-background rounded-lg border border-border">
                  <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6 bg-card border-border">
            <div className="flex items-center gap-2 mb-4">
              <Award className="h-5 w-5 text-chart-3" />
              <h3 className="text-lg font-semibold">成就徽章</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {achievements.map((achievement) => (
                <div
                  key={achievement.title}
                  className={`p-4 rounded-lg border ${
                    achievement.earned ? "bg-primary/5 border-primary/20" : "bg-muted/50 border-border opacity-60"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{achievement.icon}</div>
                    <div>
                      <div className="font-semibold">{achievement.title}</div>
                      <div className="text-sm text-muted-foreground">{achievement.description}</div>
                    </div>
                    {achievement.earned && (
                      <Badge variant="default" className="ml-auto bg-chart-5 text-white">
                        已获得
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
