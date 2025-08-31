"use client"

import { useState, useEffect, useCallback } from "react"

interface NotificationSettings {
  priceAlerts: boolean
  newsUpdates: boolean
  marketOpen: boolean
  portfolioUpdates: boolean
  emailNotifications: boolean
  pushNotifications: boolean
}

interface PreferenceSettings {
  theme: string
  language: string
  currency: string
  timezone: string
  chartType: string
  defaultTimeframe: string
  sidebarCollapsed: boolean
}

interface SecuritySettings {
  twoFactorAuth: boolean
  loginAlerts: boolean
  sessionTimeout: string
  biometricLogin: boolean
}

interface TradingSettings {
  maxPosition: string
  stopLoss: string
}

interface UserSettings {
  notifications: NotificationSettings
  preferences: PreferenceSettings
  security: SecuritySettings
  trading: TradingSettings
}

const defaultSettings: UserSettings = {
  notifications: {
    priceAlerts: true,
    newsUpdates: true,
    marketOpen: false,
    portfolioUpdates: true,
    emailNotifications: true,
    pushNotifications: false,
  },
  preferences: {
    theme: "light",
    language: "zh-CN",
    currency: "USD",
    timezone: "Asia/Shanghai",
    chartType: "candlestick",
    defaultTimeframe: "1D",
    sidebarCollapsed: true,
  },
  security: {
    twoFactorAuth: false,
    loginAlerts: true,
    sessionTimeout: "30",
    biometricLogin: false,
  },
  trading: {
    maxPosition: "10",
    stopLoss: "5",
  },
}

export function useSettings() {
  const [settings, setSettings] = useState<UserSettings>(defaultSettings)
  const [isLoading, setIsLoading] = useState(true)
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)

  // Load settings from localStorage on mount
  useEffect(() => {
    try {
      const savedSettings = localStorage.getItem("tradingview-settings")
      if (savedSettings) {
        const parsed = JSON.parse(savedSettings)
        setSettings({ ...defaultSettings, ...parsed })
      }
    } catch (error) {
      console.error("Failed to load settings:", error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Save settings to localStorage
  const saveSettings = useCallback(async () => {
    try {
      localStorage.setItem("tradingview-settings", JSON.stringify(settings))
      setHasUnsavedChanges(false)
      return { success: true }
    } catch (error) {
      console.error("Failed to save settings:", error)
      return { success: false, error: "保存设置失败" }
    }
  }, [settings])

  // Update specific setting category
  const updateNotifications = useCallback((updates: Partial<NotificationSettings>) => {
    setSettings((prev) => ({
      ...prev,
      notifications: { ...prev.notifications, ...updates },
    }))
    setHasUnsavedChanges(true)
  }, [])

  const updatePreferences = useCallback((updates: Partial<PreferenceSettings>) => {
    setSettings((prev) => ({
      ...prev,
      preferences: { ...prev.preferences, ...updates },
    }))
    setHasUnsavedChanges(true)
  }, [])

  const updateSecurity = useCallback((updates: Partial<SecuritySettings>) => {
    setSettings((prev) => ({
      ...prev,
      security: { ...prev.security, ...updates },
    }))
    setHasUnsavedChanges(true)
  }, [])

  const updateTrading = useCallback((updates: Partial<TradingSettings>) => {
    setSettings((prev) => ({
      ...prev,
      trading: { ...prev.trading, ...updates },
    }))
    setHasUnsavedChanges(true)
  }, [])

  // Reset settings to default
  const resetSettings = useCallback(() => {
    setSettings(defaultSettings)
    setHasUnsavedChanges(true)
  }, [])

  // Get specific setting value
  const getSetting = useCallback(
    (category: keyof UserSettings, key: string) => {
      return settings[category][key as keyof (typeof settings)[typeof category]]
    },
    [settings],
  )

  return {
    settings,
    isLoading,
    hasUnsavedChanges,
    saveSettings,
    updateNotifications,
    updatePreferences,
    updateSecurity,
    updateTrading,
    resetSettings,
    getSetting,
  }
}
