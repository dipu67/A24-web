'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { trackPageView, trackSessionEnd } from '@/lib/analytics'

export function AnalyticsProvider({ children }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Track initial page load
    trackPageView()

    // Track session end when component unmounts
    return () => {
      trackSessionEnd()
    }
  }, []) // Run only once on mount

  useEffect(() => {
    // Track page views when route changes
    trackPageView()
  }, [pathname, searchParams]) // Run when route changes

  return children
} 