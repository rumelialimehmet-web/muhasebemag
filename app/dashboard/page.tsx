"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingUp, DollarSign, MousePointer, ArrowUpRight, BarChart3, PieChart, Target } from "lucide-react"
import { AFFILIATE_PARTNERS } from "@/lib/affiliate-tracking"

// Mock data - in real app this would come from your database
const mockDashboardData = {
  totalRevenue: 12847.5,
  totalClicks: 8934,
  totalConversions: 267,
  conversionRate: 2.99,
  revenueGrowth: 23.5,
  clicksGrowth: 18.2,
  conversionsGrowth: 31.4,
  topDeals: [
    { id: 1, destination: "Istanbul", clicks: 1247, conversions: 34, revenue: 2890.5, conversionRate: 2.73 },
    { id: 2, destination: "Barcelona", clicks: 1089, conversions: 41, revenue: 2456.8, conversionRate: 3.77 },
    { id: 3, destination: "London", clicks: 967, conversions: 28, revenue: 1834.2, conversionRate: 2.89 },
    { id: 4, destination: "Rome", clicks: 834, conversions: 31, revenue: 2123.4, conversionRate: 3.72 },
    { id: 5, destination: "Prague", clicks: 723, conversions: 22, revenue: 1567.3, conversionRate: 3.04 },
  ],
  partnerPerformance: Object.entries(AFFILIATE_PARTNERS).map(([key, partner]) => ({
    name: partner.name,
    clicks: Math.floor(Math.random() * 2000) + 500,
    conversions: Math.floor(Math.random() * 50) + 10,
    revenue: Math.floor(Math.random() * 3000) + 1000,
    commission: partner.commission,
  })),
  recentActivity: [
    { type: "conversion", destination: "Barcelona", amount: 89.5, time: "2 min ago" },
    { type: "click", destination: "Istanbul", time: "5 min ago" },
    { type: "conversion", destination: "London", amount: 67.2, time: "12 min ago" },
    { type: "click", destination: "Rome", time: "18 min ago" },
    { type: "conversion", destination: "Prague", amount: 45.8, time: "23 min ago" },
  ],
}

export default function RevenueDashboard() {
  const [timeRange, setTimeRange] = useState("7d")
  const [data, setData] = useState(mockDashboardData)

  const formatCurrency = (amount: number) => `€${amount.toLocaleString("nl-NL", { minimumFractionDigits: 2 })}`
  const formatPercentage = (value: number) => `${value.toFixed(1)}%`

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Revenue Dashboard</h1>
          <p className="text-gray-600">Track your affiliate earnings and performance metrics</p>
        </div>

        {/* Time Range Selector */}
        <div className="mb-6">
          <div className="flex gap-2">
            {["24h", "7d", "30d", "90d"].map((range) => (
              <Button
                key={range}
                variant={timeRange === range ? "default" : "outline"}
                size="sm"
                onClick={() => setTimeRange(range)}
              >
                {range}
              </Button>
            ))}
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(data.totalRevenue)}</div>
              <div className="flex items-center text-xs text-green-600">
                <ArrowUpRight className="h-3 w-3 mr-1" />+{formatPercentage(data.revenueGrowth)} from last period
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Clicks</CardTitle>
              <MousePointer className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{data.totalClicks.toLocaleString()}</div>
              <div className="flex items-center text-xs text-green-600">
                <ArrowUpRight className="h-3 w-3 mr-1" />+{formatPercentage(data.clicksGrowth)} from last period
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Conversions</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{data.totalConversions}</div>
              <div className="flex items-center text-xs text-green-600">
                <ArrowUpRight className="h-3 w-3 mr-1" />+{formatPercentage(data.conversionsGrowth)} from last period
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatPercentage(data.conversionRate)}</div>
              <div className="flex items-center text-xs text-green-600">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                +0.4% from last period
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="deals">Top Deals</TabsTrigger>
            <TabsTrigger value="partners">Partners</TabsTrigger>
            <TabsTrigger value="activity">Recent Activity</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Revenue Chart Placeholder */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Revenue Trend
                  </CardTitle>
                  <CardDescription>Daily revenue over the selected period</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg flex items-center justify-center">
                    <div className="text-center text-gray-500">
                      <BarChart3 className="h-12 w-12 mx-auto mb-2 opacity-50" />
                      <p>Revenue chart would be rendered here</p>
                      <p className="text-sm">Integration with charting library needed</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Conversion Funnel */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="h-5 w-5" />
                    Conversion Funnel
                  </CardTitle>
                  <CardDescription>User journey from view to conversion</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Page Views</span>
                      <span className="text-sm text-gray-600">45,234</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: "100%" }}></div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Deal Clicks</span>
                      <span className="text-sm text-gray-600">8,934</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: "19.7%" }}></div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Conversions</span>
                      <span className="text-sm text-gray-600">267</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-purple-600 h-2 rounded-full" style={{ width: "2.99%" }}></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="deals" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Top Performing Deals</CardTitle>
                <CardDescription>Deals ranked by revenue generation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {data.topDeals.map((deal, index) => (
                    <div key={deal.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <Badge variant="secondary">#{index + 1}</Badge>
                        <div>
                          <h4 className="font-medium">{deal.destination}</h4>
                          <p className="text-sm text-gray-600">
                            {deal.clicks} clicks • {deal.conversions} conversions
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-green-600">{formatCurrency(deal.revenue)}</div>
                        <div className="text-sm text-gray-600">{formatPercentage(deal.conversionRate)} CR</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="partners" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Partner Performance</CardTitle>
                <CardDescription>Revenue breakdown by affiliate partner</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {data.partnerPerformance.map((partner, index) => (
                    <div key={partner.name} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-medium">{partner.name}</h4>
                        <p className="text-sm text-gray-600">
                          {partner.clicks} clicks • {partner.conversions} conversions
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-green-600">{formatCurrency(partner.revenue)}</div>
                        <div className="text-sm text-gray-600">
                          {formatPercentage(partner.commission * 100)} commission
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activity" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Live feed of clicks and conversions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {data.recentActivity.map((activity, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 border-l-4 border-l-blue-500 bg-blue-50 rounded-r-lg"
                    >
                      <div className="flex items-center gap-3">
                        {activity.type === "conversion" ? (
                          <Target className="h-4 w-4 text-green-600" />
                        ) : (
                          <MousePointer className="h-4 w-4 text-blue-600" />
                        )}
                        <div>
                          <span className="font-medium capitalize">{activity.type}</span>
                          <span className="text-gray-600"> on {activity.destination}</span>
                          {activity.amount && (
                            <span className="text-green-600 font-medium"> - {formatCurrency(activity.amount)}</span>
                          )}
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">{activity.time}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
