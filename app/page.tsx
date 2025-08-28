"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight, TrendingUp, BarChart3, Zap, ChevronDown, Shield, Globe, Users } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const scrollToContent = () => {
    const element = document.getElementById("content-section")
    element?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="min-h-screen">
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        {/* 背景装饰效果 */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] opacity-20"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          <div className="absolute inset-0">
            {[...Array(50)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-white/30 rounded-full animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${2 + Math.random() * 2}s`,
                }}
              />
            ))}
          </div>
        </div>

        {/* 主要内容 */}
        <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-balance mb-8 leading-tight">
            <span className="text-white">Look first</span>
            <span className="text-gray-400"> / </span>
            <span className="text-white">Then leap.</span>
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-12 text-balance max-w-3xl mx-auto leading-relaxed">
            最好的交易需要深度研究，然后快速入场。专业的图表工具和实时数据，助您在市场中脱颖而出。
          </p>

          <div className="flex flex-col items-center gap-6 mb-16">
            <Button
              size="lg"
              className="text-lg px-12 py-6 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105"
              asChild
            >
              <Link href="/trading">免费开始使用</Link>
            </Button>
            <p className="text-sm text-gray-400">免费开始，无需信用卡</p>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-8 text-gray-400 text-sm">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span>银行级安全</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              <span>全球市场</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>100万+用户信赖</span>
            </div>
          </div>
        </div>

        {/* 向下滚动指示器 */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
          <button
            onClick={scrollToContent}
            className="animate-bounce text-white/60 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10"
            aria-label="向下滚动"
          >
            <ChevronDown className="h-8 w-8" />
          </button>
        </div>
      </section>

      <section id="content-section" className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-balance">为什么选择我们的平台？</h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto text-balance">
              专业的图表工具、实时市场数据和智能分析，助您做出更明智的投资决策
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            <Card className="p-8 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-border bg-card">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <BarChart3 className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">专业图表工具</h3>
              <p className="text-muted-foreground leading-relaxed">
                100+ 技术指标，多种图表类型，满足专业交易者的所有需求
              </p>
            </Card>

            <Card className="p-8 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-border bg-card">
              <div className="w-16 h-16 bg-chart-2/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="h-8 w-8 text-chart-2" />
              </div>
              <h3 className="text-xl font-semibold mb-4">实时市场数据</h3>
              <p className="text-muted-foreground leading-relaxed">全球股票、外汇、加密货币实时行情，毫秒级数据更新</p>
            </Card>

            <Card className="p-8 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-border bg-card md:col-span-2 lg:col-span-1">
              <div className="w-16 h-16 bg-chart-3/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Zap className="h-8 w-8 text-chart-3" />
              </div>
              <h3 className="text-xl font-semibold mb-4">智能分析</h3>
              <p className="text-muted-foreground leading-relaxed">AI驱动的市场分析和交易信号，帮助您发现投资机会</p>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 text-balance">立即开始您的交易之旅</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 mb-12">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white font-bold text-2xl mb-6 shadow-lg">
                  1
                </div>
                <h3 className="text-xl font-semibold mb-3">注册账户</h3>
                <p className="text-muted-foreground">快速注册，无需信用卡，30秒即可开始</p>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white font-bold text-2xl mb-6 shadow-lg">
                  2
                </div>
                <h3 className="text-xl font-semibold mb-3">探索市场</h3>
                <p className="text-muted-foreground">浏览全球金融市场数据，发现投资机会</p>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white font-bold text-2xl mb-6 shadow-lg">
                  3
                </div>
                <h3 className="text-xl font-semibold mb-3">开始交易</h3>
                <p className="text-muted-foreground">使用专业工具进行分析和交易决策</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8 py-4" asChild>
                <Link href="/trading">
                  开始交易
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-4 bg-transparent" asChild>
                <Link href="/charts">查看图表</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
