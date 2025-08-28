import Link from "next/link"
import { Rocket, Twitter, Github, Linkedin } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border bg-gradient-to-b from-card to-background mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent shadow-lg">
                <Rocket className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  SpaceTrader
                </span>
                <p className="text-xs text-muted-foreground">专业交易平台</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-md">
              现代化的航天主题交易平台，为您提供专业的投资工具和市场分析。
            </p>

            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">关注我们:</span>
              <div className="flex gap-3">
                <Link
                  href="#"
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary hover:bg-primary transition-colors group"
                >
                  <Twitter className="h-4 w-4 text-muted-foreground group-hover:text-primary-foreground" />
                </Link>
                <Link
                  href="#"
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary hover:bg-primary transition-colors group"
                >
                  <Github className="h-4 w-4 text-muted-foreground group-hover:text-primary-foreground" />
                </Link>
                <Link
                  href="#"
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary hover:bg-primary transition-colors group"
                >
                  <Linkedin className="h-4 w-4 text-muted-foreground group-hover:text-primary-foreground" />
                </Link>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-foreground">交易工具</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/trading" className="text-muted-foreground hover:text-primary transition-colors">
                  实时交易
                </Link>
              </li>
              <li>
                <Link href="/charts" className="text-muted-foreground hover:text-primary transition-colors">
                  技术分析
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="text-muted-foreground hover:text-primary transition-colors">
                  投资组合
                </Link>
              </li>
              <li>
                <Link href="/watchlist" className="text-muted-foreground hover:text-primary transition-colors">
                  关注列表
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-foreground">市场资讯</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/news" className="text-muted-foreground hover:text-primary transition-colors">
                  市场新闻
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-foreground">支持服务</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/help" className="text-muted-foreground hover:text-primary transition-colors">
                  帮助中心
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  联系我们
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  关于我们
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/50 mt-12 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <p>&copy; 2024 SpaceTrader. 保留所有权利。</p>
              <div className="hidden md:flex items-center gap-4">
                <Link href="/privacy" className="hover:text-primary transition-colors">
                  隐私政策
                </Link>
                <span className="text-border">|</span>
                <Link href="/terms" className="hover:text-primary transition-colors">
                  服务条款
                </Link>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span>服务正常运行</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
