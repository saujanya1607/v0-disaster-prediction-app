"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, AlertTriangle, Flame, Waves, Wind } from "lucide-react"

interface RiskZone {
  id: string
  name: string
  type: "earthquake" | "wildfire" | "flood" | "hurricane"
  riskLevel: "low" | "medium" | "high" | "critical"
  coordinates: { x: number; y: number }
  population: number
  lastUpdate: string
}

const riskZones: RiskZone[] = [
  {
    id: "sf-bay",
    name: "San Francisco Bay Area",
    type: "earthquake",
    riskLevel: "high",
    coordinates: { x: 15, y: 35 },
    population: 7800000,
    lastUpdate: "2 min ago",
  },
  {
    id: "socal-fire",
    name: "Southern California",
    type: "wildfire",
    riskLevel: "medium",
    coordinates: { x: 20, y: 65 },
    population: 2400000,
    lastUpdate: "5 min ago",
  },
  {
    id: "gulf-hurricane",
    name: "Gulf Coast",
    type: "hurricane",
    riskLevel: "low",
    coordinates: { x: 70, y: 75 },
    population: 1200000,
    lastUpdate: "12 min ago",
  },
  {
    id: "midwest-flood",
    name: "Mississippi Valley",
    type: "flood",
    riskLevel: "medium",
    coordinates: { x: 55, y: 45 },
    population: 890000,
    lastUpdate: "8 min ago",
  },
]

const getRiskColor = (level: string) => {
  switch (level) {
    case "critical":
      return "bg-red-600"
    case "high":
      return "bg-red-500"
    case "medium":
      return "bg-orange-500"
    case "low":
      return "bg-yellow-500"
    default:
      return "bg-gray-500"
  }
}

const getDisasterIcon = (type: string) => {
  switch (type) {
    case "earthquake":
      return <AlertTriangle className="h-4 w-4" />
    case "wildfire":
      return <Flame className="h-4 w-4" />
    case "flood":
      return <Waves className="h-4 w-4" />
    case "hurricane":
      return <Wind className="h-4 w-4" />
    default:
      return <MapPin className="h-4 w-4" />
  }
}

export function RiskMap() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>National Risk Assessment Map</CardTitle>
        <CardDescription>Real-time disaster risk zones across the United States</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative w-full h-96 bg-gradient-to-b from-blue-50 to-green-50 dark:from-slate-800 dark:to-slate-700 rounded-lg border overflow-hidden">
          {/* Simplified US Map Background */}
          <div className="absolute inset-0 opacity-20">
            <svg viewBox="0 0 100 60" className="w-full h-full">
              <path
                d="M10,20 Q15,15 25,18 L35,16 Q45,14 55,16 L70,18 Q80,20 85,25 L88,35 Q85,45 80,48 L70,50 Q60,52 50,50 L40,48 Q30,46 25,42 L15,38 Q10,30 10,20 Z"
                fill="currentColor"
                className="text-slate-300 dark:text-slate-600"
              />
            </svg>
          </div>

          {/* Risk Zone Markers */}
          {riskZones.map((zone) => (
            <div
              key={zone.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
              style={{ left: `${zone.coordinates.x}%`, top: `${zone.coordinates.y}%` }}
            >
              {/* Risk Circle */}
              <div className={`w-6 h-6 rounded-full ${getRiskColor(zone.riskLevel)} opacity-80 animate-pulse`} />

              {/* Tooltip */}
              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                <div className="bg-white dark:bg-slate-800 p-3 rounded-lg shadow-lg border min-w-48">
                  <div className="flex items-center gap-2 mb-2">
                    {getDisasterIcon(zone.type)}
                    <span className="font-semibold text-sm">{zone.name}</span>
                  </div>
                  <div className="space-y-1 text-xs text-slate-600 dark:text-slate-400">
                    <div className="flex justify-between">
                      <span>Risk Level:</span>
                      <Badge
                        variant="outline"
                        className={`text-xs ${getRiskColor(zone.riskLevel)} text-white border-none`}
                      >
                        {zone.riskLevel}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Population:</span>
                      <span>{(zone.population / 1000000).toFixed(1)}M</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Updated:</span>
                      <span>{zone.lastUpdate}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Legend */}
          <div className="absolute bottom-4 right-4 bg-white/90 dark:bg-slate-800/90 p-3 rounded-lg backdrop-blur-sm">
            <h4 className="text-sm font-semibold mb-2">Risk Levels</h4>
            <div className="space-y-1">
              {[
                { level: "critical", label: "Critical" },
                { level: "high", label: "High" },
                { level: "medium", label: "Medium" },
                { level: "low", label: "Low" },
              ].map(({ level, label }) => (
                <div key={level} className="flex items-center gap-2 text-xs">
                  <div className={`w-3 h-3 rounded-full ${getRiskColor(level)}`} />
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
