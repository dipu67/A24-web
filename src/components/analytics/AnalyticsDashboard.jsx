'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { LineChart, BarChart } from "@/components/analytics/Charts"

export function AnalyticsDashboard({ data }) {
  const {
    totalVisits = 0,
    dailyVisits = [],
    pageViews = [],
    activeUsers = 0,
    averageSessionDuration = 0,
    bounceRate = 0,
    topPages = [],
    referrers = [],
    userFlow = []
  } = data || {}

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Visits</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalVisits.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">All time visits</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeUsers}</div>
            <p className="text-xs text-muted-foreground">Current online users</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Session</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageSessionDuration}m</div>
            <p className="text-xs text-muted-foreground">Time per session</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Bounce Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{bounceRate}%</div>
            <p className="text-xs text-muted-foreground">Single page visits</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Daily Visits</CardTitle>
          </CardHeader>
          <CardContent>
            <LineChart data={dailyVisits} />
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Page Views</CardTitle>
          </CardHeader>
          <CardContent>
            <BarChart data={pageViews} />
          </CardContent>
        </Card>
      </div>

      {/* User Flow */}
      <Card>
        <CardHeader>
          <CardTitle>User Activity by Hour</CardTitle>
        </CardHeader>
        <CardContent>
          <BarChart 
            data={userFlow.map(({ hour, visits }) => ({
              label: `${hour}:00`,
              value: visits
            }))} 
          />
        </CardContent>
      </Card>

      {/* All Pages and Referrers */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>All Pages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {topPages.map((page, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                    <p className="text-sm font-medium truncate max-w-[200px]" title={page.path}>
                      {page.path}
                    </p>
                    <p className="text-xs text-muted-foreground">{page.views.toLocaleString()} views</p>
                  </div>
                  <div className="text-sm font-medium text-muted-foreground">
                    {page.percentage}%
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Top Referrers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {referrers.map((referrer, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                    <p className="text-sm font-medium truncate max-w-[200px]" title={referrer.url}>
                      {referrer.url}
                    </p>
                    <p className="text-xs text-muted-foreground">{referrer.count.toLocaleString()} visits</p>
                  </div>
                  <div className="text-sm font-medium text-muted-foreground">
                    {referrer.percentage}%
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 