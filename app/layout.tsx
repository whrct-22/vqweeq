import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { AppLayout } from "@/components/app-layout"
import { Toaster } from "@/components/ui/toaster"

export const metadata: Metadata = {
  title: "SpaceTrader - 航天主题交易平台",
  description: "现代化的交易平台，采用航天主题设计",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#0a0a0a" />
      </head>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <AppLayout>{children}</AppLayout>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
