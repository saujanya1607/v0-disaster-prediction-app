import { AlertCenter } from "@/components/alert-center"
import { Badge } from "@/components/ui/badge"
import { Activity } from "lucide-react"

export default function AlertsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm dark:bg-slate-900/80">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Alert Management</h1>
              <p className="text-slate-600 dark:text-slate-400">
                Monitor and respond to disaster predictions and warnings
              </p>
            </div>
            <Badge variant="outline" className="text-green-600 border-green-600">
              <Activity className="h-3 w-3 mr-1" />
              Real-time Monitoring
            </Badge>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <AlertCenter />
      </main>
    </div>
  )
}
