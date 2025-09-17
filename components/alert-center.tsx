"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertTriangle, Bell, BellOff, Search, Filter, Clock, MapPin, Users, Siren } from "lucide-react"

interface Alert {
  id: string
  title: string
  type: "earthquake" | "wildfire" | "hurricane" | "flood" | "tornado"
  severity: "critical" | "high" | "medium" | "low"
  location: string
  population: number
  timestamp: string
  status: "active" | "monitoring" | "resolved"
  description: string
  confidence: number
}

const alerts: Alert[] = [
  {
    id: "alert-001",
    title: "Major Earthquake Risk - San Francisco Bay Area",
    type: "earthquake",
    severity: "critical",
    location: "San Francisco Bay Area, CA",
    population: 7800000,
    timestamp: "2024-01-15T14:30:00Z",
    status: "active",
    description: "High probability seismic activity detected. Magnitude 6.2-6.8 expected within 24-48 hours.",
    confidence: 87,
  },
  {
    id: "alert-002",
    title: "Wildfire Spread Risk - Southern California",
    type: "wildfire",
    severity: "high",
    location: "Los Angeles County, CA",
    population: 2400000,
    timestamp: "2024-01-15T12:15:00Z",
    status: "monitoring",
    description:
      "Extreme fire weather conditions with high winds and low humidity. Multiple ignition sources detected.",
    confidence: 73,
  },
  {
    id: "alert-003",
    title: "Hurricane Formation - Gulf of Mexico",
    type: "hurricane",
    severity: "medium",
    location: "Gulf Coast, TX/LA",
    population: 1200000,
    timestamp: "2024-01-15T10:45:00Z",
    status: "monitoring",
    description: "Tropical disturbance showing signs of organization. Category 2-3 hurricane possible in 7-10 days.",
    confidence: 65,
  },
  {
    id: "alert-004",
    title: "Flash Flood Warning - Mississippi Valley",
    type: "flood",
    severity: "high",
    location: "Mississippi River Valley",
    population: 890000,
    timestamp: "2024-01-15T08:20:00Z",
    status: "active",
    description: "Heavy rainfall and rapid snowmelt creating dangerous flood conditions along major waterways.",
    confidence: 82,
  },
  {
    id: "alert-005",
    title: "Tornado Outbreak Potential - Oklahoma",
    type: "tornado",
    severity: "medium",
    location: "Central Oklahoma",
    population: 650000,
    timestamp: "2024-01-15T06:10:00Z",
    status: "resolved",
    description: "Severe thunderstorm complex with rotating supercells. Multiple tornado touchdowns possible.",
    confidence: 71,
  },
]

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case "critical":
      return "bg-red-600 text-white"
    case "high":
      return "bg-red-500 text-white"
    case "medium":
      return "bg-orange-500 text-white"
    case "low":
      return "bg-yellow-500 text-black"
    default:
      return "bg-gray-500 text-white"
  }
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "active":
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
    case "monitoring":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
    case "resolved":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
  }
}

const getDisasterIcon = (type: string) => {
  switch (type) {
    case "earthquake":
      return <AlertTriangle className="h-5 w-5" />
    case "wildfire":
      return <Siren className="h-5 w-5" />
    case "hurricane":
      return <AlertTriangle className="h-5 w-5" />
    case "flood":
      return <AlertTriangle className="h-5 w-5" />
    case "tornado":
      return <AlertTriangle className="h-5 w-5" />
    default:
      return <AlertTriangle className="h-5 w-5" />
  }
}

export function AlertCenter() {
  const [searchTerm, setSearchTerm] = useState("")
  const [severityFilter, setSeverityFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)

  const filteredAlerts = alerts.filter((alert) => {
    const matchesSearch =
      alert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSeverity = severityFilter === "all" || alert.severity === severityFilter
    const matchesStatus = statusFilter === "all" || alert.status === statusFilter

    return matchesSearch && matchesSeverity && matchesStatus
  })

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleString()
  }

  const getTimeAgo = (timestamp: string) => {
    const now = new Date()
    const alertTime = new Date(timestamp)
    const diffInMinutes = Math.floor((now.getTime() - alertTime.getTime()) / (1000 * 60))

    if (diffInMinutes < 60) return `${diffInMinutes}m ago`
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`
    return `${Math.floor(diffInMinutes / 1440)}d ago`
  }

  return (
    <div className="space-y-6">
      {/* Alert Center Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Alert Center</h2>
          <p className="text-slate-600 dark:text-slate-400">Monitor and manage disaster predictions and warnings</p>
        </div>
        <Button
          variant={notificationsEnabled ? "default" : "outline"}
          onClick={() => setNotificationsEnabled(!notificationsEnabled)}
          className="flex items-center gap-2"
        >
          {notificationsEnabled ? <Bell className="h-4 w-4" /> : <BellOff className="h-4 w-4" />}
          {notificationsEnabled ? "Notifications On" : "Notifications Off"}
        </Button>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters & Search
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search alerts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={severityFilter} onValueChange={setSeverityFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by severity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Severities</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="monitoring">Monitoring</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Alert Statistics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Alerts</p>
                <p className="text-2xl font-bold text-red-600">{alerts.filter((a) => a.status === "active").length}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Monitoring</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {alerts.filter((a) => a.status === "monitoring").length}
                </p>
              </div>
              <Bell className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Resolved</p>
                <p className="text-2xl font-bold text-green-600">
                  {alerts.filter((a) => a.status === "resolved").length}
                </p>
              </div>
              <Badge className="h-8 w-8 bg-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">People at Risk</p>
                <p className="text-2xl font-bold text-blue-600">
                  {(
                    alerts.filter((a) => a.status === "active").reduce((sum, a) => sum + a.population, 0) / 1000000
                  ).toFixed(1)}
                  M
                </p>
              </div>
              <Users className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alert List */}
      <div className="space-y-4">
        {filteredAlerts.map((alert) => (
          <Card
            key={alert.id}
            className={`border-l-4 ${alert.severity === "critical" ? "border-l-red-600" : alert.severity === "high" ? "border-l-red-500" : alert.severity === "medium" ? "border-l-orange-500" : "border-l-yellow-500"}`}
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg ${getSeverityColor(alert.severity)}`}>
                    {getDisasterIcon(alert.type)}
                  </div>
                  <div>
                    <CardTitle className="text-lg">{alert.title}</CardTitle>
                    <CardDescription className="flex items-center gap-4 mt-1">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {alert.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {(alert.population / 1000000).toFixed(1)}M people
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {getTimeAgo(alert.timestamp)}
                      </span>
                    </CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={getSeverityColor(alert.severity)}>{alert.severity.toUpperCase()}</Badge>
                  <Badge variant="outline" className={getStatusColor(alert.status)}>
                    {alert.status.toUpperCase()}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-slate-700 dark:text-slate-300 mb-4">{alert.description}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>Confidence: {alert.confidence}%</span>
                  <span>Updated: {formatTimestamp(alert.timestamp)}</span>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                  {alert.status === "active" && (
                    <Button size="sm" className="bg-red-600 hover:bg-red-700">
                      Emergency Response
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredAlerts.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <AlertTriangle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No alerts found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filter criteria.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
