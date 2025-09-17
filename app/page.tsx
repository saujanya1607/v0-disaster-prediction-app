import { AlertTriangle, MapPin, Activity, Shield, TrendingUp, Clock, BarChart3 } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"

export default function DisasterPredictionDashboard() {
  const currentAlerts = [
    {
      id: 1,
      type: "Earthquake",
      location: "San Francisco Bay Area",
      severity: "High",
      confidence: 87,
      timeframe: "24-48 hours",
      magnitude: "6.2-6.8",
    },
    {
      id: 2,
      type: "Wildfire",
      location: "Southern California",
      severity: "Medium",
      confidence: 73,
      timeframe: "3-5 days",
      riskArea: "2,400 sq km",
    },
    {
      id: 3,
      type: "Hurricane",
      location: "Gulf Coast",
      severity: "Low",
      confidence: 65,
      timeframe: "7-10 days",
      category: "Cat 2-3",
    },
  ]

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "High":
        return "bg-red-500"
      case "Medium":
        return "bg-orange-500"
      case "Low":
        return "bg-yellow-500"
      default:
        return "bg-gray-500"
    }
  }

  const getSeverityBadgeVariant = (severity: string) => {
    switch (severity) {
      case "High":
        return "destructive"
      case "Medium":
        return "secondary"
      case "Low":
        return "outline"
      default:
        return "outline"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm dark:bg-slate-900/80">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900 dark:text-white">DisasterWatch AI</h1>
                <p className="text-sm text-slate-600 dark:text-slate-400">Advanced Disaster Prediction System</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-green-600 border-green-600">
                <Activity className="h-3 w-3 mr-1" />
                System Active
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Critical Alerts */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Active Threat Assessments</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {currentAlerts.map((alert) => (
              <Card key={alert.id} className="border-l-4 border-l-red-500">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-red-500" />
                      {alert.type}
                    </CardTitle>
                    <Badge variant={getSeverityBadgeVariant(alert.severity)}>{alert.severity}</Badge>
                  </div>
                  <CardDescription className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {alert.location}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Confidence Level</span>
                      <span className="font-medium">{alert.confidence}%</span>
                    </div>
                    <Progress value={alert.confidence} className="h-2" />
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-slate-600 dark:text-slate-400">Timeframe</p>
                      <p className="font-medium flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {alert.timeframe}
                      </p>
                    </div>
                    <div>
                      <p className="text-slate-600 dark:text-slate-400">
                        {alert.type === "Earthquake"
                          ? "Magnitude"
                          : alert.type === "Hurricane"
                            ? "Category"
                            : "Risk Area"}
                      </p>
                      <p className="font-medium">
                        {alert.type === "Earthquake"
                          ? alert.magnitude
                          : alert.type === "Hurricane"
                            ? alert.category
                            : alert.riskArea}
                      </p>
                    </div>
                  </div>

                  <Button className="w-full" size="sm">
                    View Details
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* System Status */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">AI Models Active</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">12</div>
              <p className="text-xs text-muted-foreground">All systems operational</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Data Sources</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">847</div>
              <p className="text-xs text-muted-foreground">Real-time feeds active</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Predictions Today</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">23</div>
              <p className="text-xs text-muted-foreground">+12% from yesterday</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Accuracy Rate</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">94.2%</div>
              <p className="text-xs text-muted-foreground">Last 30 days average</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Access key features and emergency protocols</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Link href="/analytics">
                <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent w-full">
                  <BarChart3 className="h-6 w-6" />
                  Analytics
                </Button>
              </Link>
              <Link href="/alerts">
                <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent w-full">
                  <AlertTriangle className="h-6 w-6" />
                  Alert Center
                </Button>
              </Link>
              <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
                <Activity className="h-6 w-6" />
                Live Data
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
                <Shield className="h-6 w-6" />
                Emergency
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
