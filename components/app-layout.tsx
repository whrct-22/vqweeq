"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { Header } from "./header"
import { Sidebar } from "./sidebar"
import { Footer } from "./footer"
import { useSettings } from "@/hooks/use-settings"
import { cn } from "@/lib/utils"

interface AppLayoutProps {
  children: React.ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { settings } = useSettings()
  const [sidebarCollapsed, setSidebarCollapsed] = useState(settings.preferences.sidebarCollapsed)
  const [showFullLayout, setShowFullLayout] = useState(false)
  const pathname = usePathname()

  const isHomePage = pathname === "/"
  const showSearch = !isHomePage || showFullLayout
  const showMarket = !isHomePage || showFullLayout
  const showSidebar = !isHomePage || showFullLayout

  useEffect(() => {
    if (isHomePage) {
      const handleScroll = () => {
        setShowFullLayout(window.scrollY > 100)
      }
      
      window.addEventListener('scroll', handleScroll)
      return () => window.removeEventListener('scroll', handleScroll)
    } else {
      setShowFullLayout(true)
    }
  }, [isHomePage])

  useEffect(() => {
    setSidebarOpen(false)
  }, [pathname])

  useEffect(() => {
    setSidebarCollapsed(settings.preferences.sidebarCollapsed)
  }, [settings.preferences.sidebarCollapsed])

  const getMainMargin = () => {
    if (sidebarCollapsed) {
      return "lg:ml-16" // 收缩时的宽度
    }
    return "lg:ml-64" // 展开时的宽度
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header 
        onMenuClick={() => setSidebarOpen(!sidebarOpen)} 
        showSearch={showSearch} 
        showMarket={showMarket}
        showMinimal={isHomePage && !showFullLayout}
      />

      <div className="flex flex-1">
        {showSidebar && (
          <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        )}

        <main
          className={cn(
            "flex-1 transition-all duration-300 ease-in-out",
            showSidebar ? getMainMargin() : "",
            sidebarOpen && showSidebar ? "ml-64" : "ml-0",
            isHomePage && !showFullLayout ? "ml-0" : ""
          )}
        >
          <div className={isHomePage ? "" : "container mx-auto px-4 py-6"}>{children}</div>
        </main>
      </div>

      {showSidebar && (
        <div
          className={cn(
            "transition-all duration-300 ease-in-out",
            getMainMargin(),
            sidebarOpen ? "ml-64" : "ml-0",
          )}
        >
          <Footer />
        </div>
      )}
    </div>
  )
}
