'use client'

// Unique identifier for the session
const sessionId = Math.random().toString(36).substring(2)
let pageLoadTime = new Date()

// Initial data structure
const initialData = {
  totalVisits: 0,
  pageViews: {},
  sessions: [],
  bounces: 0,
  totalDuration: 0,
  deviceInfo: {},
  referrers: {},
  userPaths: []
}

// Store analytics data in localStorage for demo purposes
// In production, use a proper analytics database
const getStoredData = () => {
  try {
    const stored = localStorage.getItem('a24_analytics')
    if (!stored) return initialData

    const data = JSON.parse(stored)
    // Ensure all required properties exist
    return {
      ...initialData,
      ...data
    }
  } catch (error) {
    console.error('Error reading analytics data:', error)
    return initialData
  }
}

const saveData = (data) => {
  try {
    localStorage.setItem('a24_analytics', JSON.stringify(data))
  } catch (error) {
    console.error('Error saving analytics data:', error)
  }
}

// Get basic device and browser information
const getDeviceInfo = () => {
  try {
    return {
      userAgent: window.navigator.userAgent,
      language: window.navigator.language,
      screenSize: `${window.screen.width}x${window.screen.height}`,
      viewport: `${window.innerWidth}x${window.innerHeight}`,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
    }
  } catch (error) {
    console.error('Error getting device info:', error)
    return {
      userAgent: 'Unknown',
      language: 'Unknown',
      screenSize: 'Unknown',
      viewport: 'Unknown',
      timezone: 'Unknown'
    }
  }
}

// Track page view
export const trackPageView = () => {
  try {
    const path = window.location.pathname
    const data = getStoredData()
    const timestamp = new Date().toISOString()
    
    // Increment total visits
    data.totalVisits++
    
    // Track page views
    data.pageViews[path] = (data.pageViews[path] || 0) + 1
    
    // Get referrer if available
    const referrer = document.referrer
    if (referrer && !referrer.includes(window.location.host)) {
      data.referrers[referrer] = (data.referrers[referrer] || 0) + 1
    }

    // Ensure userPaths array exists
    if (!Array.isArray(data.userPaths)) {
      data.userPaths = []
    }

    // Track user path
    const lastPath = data.userPaths.length > 0 
      ? data.userPaths[data.userPaths.length - 1]
      : null

    if (!lastPath || lastPath.path !== path) {
      data.userPaths.push({
        path,
        timestamp,
        sessionId
      })
    }
    
    // Ensure sessions array exists
    if (!Array.isArray(data.sessions)) {
      data.sessions = []
    }

    // Add or update session
    const existingSession = data.sessions.find(s => s.id === sessionId)
    
    if (existingSession) {
      existingSession.pageViews = (existingSession.pageViews || 0) + 1
      existingSession.lastActive = timestamp
    } else {
      // Add device info only for new sessions
      data.sessions.push({
        id: sessionId,
        startTime: timestamp,
        path,
        active: true,
        pageViews: 1,
        deviceInfo: getDeviceInfo()
      })

      // Update device statistics
      const deviceInfo = getDeviceInfo()
      data.deviceInfo[deviceInfo.userAgent] = (data.deviceInfo[deviceInfo.userAgent] || 0) + 1
    }
    
    saveData(data)
  } catch (error) {
    console.error('Error tracking page view:', error)
  }
}

// Track session duration and bounce
export const trackSessionEnd = () => {
  try {
    const data = getStoredData()
    const session = data.sessions.find(s => s.id === sessionId)
    
    if (session) {
      const duration = (new Date() - new Date(session.startTime)) / 1000 / 60 // in minutes
      session.active = false
      session.duration = duration
      data.totalDuration += duration
      
      // Consider it a bounce if duration is less than 30 seconds and only 1 page view
      if (duration < 0.5 && session.pageViews === 1) {
        data.bounces++
      }
      
      saveData(data)
    }
  } catch (error) {
    console.error('Error tracking session end:', error)
  }
}

// Get real-time analytics data
export const getAnalyticsData = () => {
  try {
    const data = getStoredData()
    const now = new Date()
    
    // Ensure all arrays exist
    if (!Array.isArray(data.sessions)) data.sessions = []
    if (!Array.isArray(data.userPaths)) data.userPaths = []
    
    // Calculate active users (sessions in last 5 minutes)
    const activeUsers = data.sessions.filter(s => {
      const sessionTime = new Date(s.startTime)
      const timeDiff = (now - sessionTime) / 1000 / 60 // in minutes
      return s.active && timeDiff < 5
    }).length

    // Calculate average session duration
    const completedSessions = data.sessions.filter(s => !s.active && s.duration)
    const avgDuration = completedSessions.length > 0
      ? completedSessions.reduce((acc, s) => acc + s.duration, 0) / completedSessions.length
      : 0

    // Calculate bounce rate
    const bounceRate = data.totalVisits > 0
      ? Math.round((data.bounces / data.totalVisits) * 100)
      : 0

    // Get daily visits for the last 7 days
    const dailyVisits = Array.from({ length: 7 }, (_, i) => {
      const date = new Date()
      date.setDate(date.getDate() - i)
      const dateStr = date.toISOString().split('T')[0]
      const visits = data.sessions.filter(s => 
        s.startTime.startsWith(dateStr)
      ).length
      return { date: dateStr, value: visits }
    }).reverse()

    // Get page views
    const pageViews = Object.entries(data.pageViews || {})
      .map(([path, views]) => ({
        label: path || 'Home',
        value: views
      }))
      .sort((a, b) => b.value - a.value)

    // Calculate percentages for top pages
    const totalPageViews = pageViews.reduce((acc, page) => acc + page.value, 0)
    const topPages = pageViews.map(page => ({
      path: page.label,
      views: page.value,
      percentage: Math.round((page.value / totalPageViews) * 100) || 0
    }))

    // Get device statistics
    const devices = Object.entries(data.deviceInfo || {})
      .map(([device, count]) => ({
        name: device,
        count,
        percentage: Math.round((count / data.totalVisits) * 100) || 0
      }))
      .sort((a, b) => b.count - a.count)

    // Get top referrers
    const referrers = Object.entries(data.referrers || {})
      .map(([referrer, count]) => ({
        url: referrer,
        count,
        percentage: Math.round((count / data.totalVisits) * 100) || 0
      }))
      .sort((a, b) => b.count - a.count)

    // Get user flow data
    const userFlow = data.userPaths.reduce((acc, path) => {
      const hour = new Date(path.timestamp).getHours()
      acc[hour] = (acc[hour] || 0) + 1
      return acc
    }, {})

    return {
      totalVisits: data.totalVisits || 0,
      activeUsers,
      averageSessionDuration: Math.round(avgDuration * 10) / 10,
      bounceRate,
      dailyVisits,
      pageViews,
      topPages,
      devices: devices.slice(0, 5), // Top 5 devices
      referrers: referrers.slice(0, 5), // Top 5 referrers
      userFlow: Array.from({ length: 24 }, (_, i) => ({
        hour: i,
        visits: userFlow[i] || 0
      }))
    }
  } catch (error) {
    console.error('Error getting analytics data:', error)
    return {
      totalVisits: 0,
      activeUsers: 0,
      averageSessionDuration: 0,
      bounceRate: 0,
      dailyVisits: [],
      pageViews: [],
      topPages: [],
      devices: [],
      referrers: [],
      userFlow: Array.from({ length: 24 }, (_, i) => ({ hour: i, visits: 0 }))
    }
  }
} 