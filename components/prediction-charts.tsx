"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts"

const riskTrendData = [
  { month: "Jan", earthquake: 65, wildfire: 28, hurricane: 12, flood: 45 },
  { month: "Feb", earthquake: 59, wildfire: 32, hurricane: 15, flood: 38 },
  { month: "Mar", earthquake: 72, wildfire: 45, hurricane: 8, flood: 52 },
  { month: "Apr", earthquake: 68, wildfire: 58, hurricane: 18, flood: 48 },
  { month: "May", earthquake: 71, wildfire: 72, hurricane: 25, flood: 42 },
  { month: "Jun", earthquake: 75, wildfire: 85, hurricane: 35, flood: 38 },
]

const accuracyData = [
  { model: "Earthquake", accuracy: 94.2 },
  { model: "Wildfire", accuracy: 87.8 },
  { model: "Hurricane", accuracy: 91.5 },
  { model: "Flood", accuracy: 89.3 },
  { model: "Tornado", accuracy: 85.7 },
]

const disasterDistribution = [
  { name: "Earthquake", value: 35, color: "#ef4444" },
  { name: "Wildfire", value: 28, color: "#f97316" },
  { name: "Hurricane", value: 20, color: "#3b82f6" },
  { name: "Flood", value: 17, color: "#06b6d4" },
]

export function PredictionCharts() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {/* Risk Trend Chart */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Risk Trend Analysis</CardTitle>
          <CardDescription>6-month prediction confidence trends by disaster type</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={riskTrendData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="month" className="text-muted-foreground" />
              <YAxis className="text-muted-foreground" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Line type="monotone" dataKey="earthquake" stroke="#ef4444" strokeWidth={2} dot={{ fill: "#ef4444" }} />
              <Line type="monotone" dataKey="wildfire" stroke="#f97316" strokeWidth={2} dot={{ fill: "#f97316" }} />
              <Line type="monotone" dataKey="hurricane" stroke="#3b82f6" strokeWidth={2} dot={{ fill: "#3b82f6" }} />
              <Line type="monotone" dataKey="flood" stroke="#06b6d4" strokeWidth={2} dot={{ fill: "#06b6d4" }} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Disaster Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Threat Distribution</CardTitle>
          <CardDescription>Current active predictions by type</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={disasterDistribution}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {disasterDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {disasterDistribution.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span>{item.name}</span>
                </div>
                <span className="font-medium">{item.value}%</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Model Accuracy */}
      <Card className="lg:col-span-3">
        <CardHeader>
          <CardTitle>AI Model Performance</CardTitle>
          <CardDescription>Prediction accuracy rates by disaster type (last 30 days)</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={accuracyData} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis type="number" domain={[80, 100]} className="text-muted-foreground" />
              <YAxis dataKey="model" type="category" className="text-muted-foreground" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
                formatter={(value) => [`${value}%`, "Accuracy"]}
              />
              <Bar dataKey="accuracy" fill="#22c55e" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
