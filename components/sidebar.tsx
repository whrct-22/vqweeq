"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  Home,
  TrendingUp,
  BarChart3,
  Newspaper,
  Settings,
  User,
  Wallet,
  Star,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { useState, useEffect } from "react"
import { useSettings } from "@/hooks/use-settings"

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

const navigation = [
  { name: "首页", href: "/", icon: Home },
  { name: "交易", href: "/trading", icon: TrendingUp },
  { name: "图表", href: "/charts", icon: BarChart3 },
  { name: "投资组合", href: "/portfolio", icon: Wallet },
  { name: "关注列表", href: "/watchlist", icon: Star },
  { name: "新闻", href: "/news", icon: Newspaper },
  { name: "个人资料", href: "/profile", icon: User },
  { name: "设置", href: "/settings", icon: Settings },
]

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname()
  const { settings, updatePreferences } = useSettings()
  const [isCollapsed, setIsCollapsed] = useState(settings.preferences.sidebarCollapsed)

  useEffect(() => {
    setIsCollapsed(settings.preferences.sidebarCollapsed)
  }, [settings.preferences.sidebarCollapsed])

  const toggleCollapsed = () => {
    const newState = !isCollapsed
    setIsCollapsed(newState)
    updatePreferences({ sidebarCollapsed: newState })
  }

  return (
    <>
      {isOpen && <div className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden" onClick={onClose} />}

      <aside
        className={cn(
          "fixed left-0 top-16 z-50 h-[calc(100vh-4rem)] transform border-r border-border bg-sidebar transition-all duration-300 ease-in-out",
          isCollapsed ? "w-16" : "w-64",
          isOpen ? "translate-x-0" : "-translate-x-full",
          "lg:translate-x-0",
        )}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between p-4 lg:hidden">
            {!isCollapsed && <span className="text-lg font-semibold">导航菜单</span>}
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="hidden lg:flex items-center justify-end p-2 border-b border-sidebar-border">
            <Button variant="ghost" size="sm" onClick={toggleCollapsed} className="h-8 w-8 p-0">
              {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            </Button>
          </div>

          <nav className="flex-1 space-y-1 p-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    isCollapsed ? "justify-center" : "",
                    isActive
                      ? "bg-sidebar-primary text-sidebar-primary-foreground"
                      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                  )}
                  onClick={() => onClose()}
                  title={isCollapsed ? item.name : undefined}
                >
                  <item.icon className="h-4 w-4 flex-shrink-0" />
                  {!isCollapsed && item.name}
                </Link>
              )
            })}
          </nav>

          <div className="border-t border-sidebar-border p-4">
            <div className={cn("flex items-center gap-3", isCollapsed ? "justify-center" : "")}>
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                <User className="h-4 w-4 text-primary-foreground" />
              </div>
              {!isCollapsed && (
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-sidebar-foreground truncate">太空交易员</p>
                  <p className="text-xs text-muted-foreground truncate">trader@space.com</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}
