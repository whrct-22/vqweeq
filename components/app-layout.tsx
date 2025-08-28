"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { Header } from "./header"
import { Sidebar } from "./sidebar"
import { Footer } from "./footer"
import { cn } from "@/lib/utils"

interface AppLayoutProps {
  children: React.ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const pathname = usePathname()

  const isHomePage = pathname === "/"
  const showSearch = !isHomePage
  const showMarket = !isHomePage

  useEffect(() => {
    setSidebarOpen(false)
  }, [pathname])

  useEffect(() => {
    const saved = localStorage.getItem("sidebar-collapsed")
    if (saved !== null) {
      setSidebarCollapsed(JSON.parse(saved))
    }

    // 监听localStorage变化
    const handleStorageChange = () => {
      const saved = localStorage.getItem("sidebar-collapsed")
      if (saved !== null) {
        setSidebarCollapsed(JSON.parse(saved))
      }
    }

    window.addEventListener("storage", handleStorageChange)

    // 使用自定义事件监听同页面内的变化
    const handleSidebarToggle = () => {
      const saved = localStorage.getItem("sidebar-collapsed")
      if (saved !== null) {
        setSidebarCollapsed(JSON.parse(saved))
      }
    }

    window.addEventListener("sidebar-toggle", handleSidebarToggle)

    return () => {
      window.removeEventListener("storage", handleStorageChange)
      window.removeEventListener("sidebar-toggle", handleSidebarToggle)
    }
  }, [])

  const getMainMargin = () => {
    if (sidebarCollapsed) {
      return "lg:ml-16" // 收缩时的宽度
    }
    return "lg:ml-64" // 展开时的宽度
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} showSearch={showSearch} showMarket={showMarket} />

      <div className="flex flex-1">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <main
          className={cn(
            "flex-1 transition-all duration-300 ease-in-out",
            getMainMargin(), // 使用动态计算的margin
            sidebarOpen ? "ml-64" : "ml-0", // 移动端动态宽度
          )}
        >
          <div className={isHomePage ? "" : "container mx-auto px-4 py-6"}>{children}</div>
        </main>
      </div>

      <div
        className={cn(
          "transition-all duration-300 ease-in-out",
          getMainMargin(), // 页脚也使用动态margin
          sidebarOpen ? "ml-64" : "ml-0",
        )}
      >
        <Footer />
      </div>
    </div>
  )
}
