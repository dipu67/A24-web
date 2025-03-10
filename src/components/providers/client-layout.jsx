'use client'

import { ThemeProvider } from "@/components/providers/theme-provider"
import { AnalyticsProvider } from "@/components/providers/analytics-provider"

export function ClientLayout({ children }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <AnalyticsProvider>
        {children}
      </AnalyticsProvider>
    </ThemeProvider>
  )
} 