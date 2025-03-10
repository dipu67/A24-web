'use client'

import { useState, useEffect } from 'react'
import { AnalyticsDashboard } from '@/components/analytics/AnalyticsDashboard'
import { getAnalyticsData } from '@/lib/analytics'

export default function AdminAnalytics() {
  const [analyticsData, setAnalyticsData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        // First verify authentication
        const response = await fetch('/api/admin/analytics')
        if (!response.ok) throw new Error('Authentication failed')
        
        // Get real-time analytics data from localStorage
        const data = getAnalyticsData()
        setAnalyticsData(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchAnalytics()

    // Update data every 30 seconds
    const interval = setInterval(fetchAnalytics, 30000)
    return () => clearInterval(interval)
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">Loading analytics data...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-4">
          <p className="text-red-500">Error: {error}</p>
          <p className="text-muted-foreground">Please try again later</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
        <p className="text-muted-foreground">
          Track your website's performance and user engagement
        </p>
      </div>

      <AnalyticsDashboard data={analyticsData} />
    </div>
  )
} 