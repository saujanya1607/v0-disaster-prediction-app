// Database utility functions for disaster prediction system
// This module provides type-safe database operations

export interface Prediction {
  id: string
  disaster_type: string
  location: string
  latitude?: number
  longitude?: number
  severity: "low" | "medium" | "high" | "critical"
  confidence_score: number
  predicted_start_time?: Date
  predicted_end_time?: Date
  magnitude?: number
  wind_speed?: number
  affected_area_km2?: number
  population_at_risk?: number
  model_version: string
  raw_prediction_data?: Record<string, any>
  created_at: Date
  updated_at: Date
}

export interface Alert {
  id: string
  prediction_id?: string
  title: string
  description?: string
  status: "active" | "monitoring" | "resolved" | "cancelled"
  priority: number
  issued_at: Date
  expires_at?: Date
  resolved_at?: Date
  created_by?: string
  updated_at: Date
}

export interface HistoricalEvent {
  id: string
  disaster_type: string
  location: string
  latitude?: number
  longitude?: number
  severity: "low" | "medium" | "high" | "critical"
  start_time: Date
  end_time?: Date
  magnitude?: number
  wind_speed?: number
  affected_area_km2?: number
  casualties: number
  economic_damage?: number
  description?: string
  data_sources?: string[]
  created_at: Date
}

export interface ModelPerformance {
  id: string
  model_name: string
  disaster_type: string
  accuracy_score?: number
  precision_score?: number
  recall_score?: number
  f1_score?: number
  evaluation_period_start?: Date
  evaluation_period_end?: Date
  total_predictions?: number
  correct_predictions?: number
  false_positives?: number
  false_negatives?: number
  created_at: Date
}

// Mock database functions - replace with actual database calls when integrating
export const mockDatabase = {
  predictions: {
    async getAll(): Promise<Prediction[]> {
      // This would be replaced with actual database query
      return [
        {
          id: "1",
          disaster_type: "earthquake",
          location: "San Francisco Bay Area, CA",
          latitude: 37.7749,
          longitude: -122.4194,
          severity: "high",
          confidence_score: 87.3,
          predicted_start_time: new Date(Date.now() + 24 * 60 * 60 * 1000),
          predicted_end_time: new Date(Date.now() + 48 * 60 * 60 * 1000),
          magnitude: 6.5,
          affected_area_km2: 2500.0,
          population_at_risk: 7800000,
          model_version: "SeismicAI-v2.1",
          created_at: new Date(),
          updated_at: new Date(),
        },
      ]
    },

    async getById(id: string): Promise<Prediction | null> {
      const predictions = await this.getAll()
      return predictions.find((p) => p.id === id) || null
    },

    async create(prediction: Omit<Prediction, "id" | "created_at" | "updated_at">): Promise<Prediction> {
      // This would be replaced with actual database insert
      return {
        ...prediction,
        id: Math.random().toString(36).substr(2, 9),
        created_at: new Date(),
        updated_at: new Date(),
      }
    },
  },

  alerts: {
    async getAll(): Promise<Alert[]> {
      return [
        {
          id: "1",
          prediction_id: "1",
          title: "Major Earthquake Risk - San Francisco Bay Area",
          description: "High probability seismic activity detected. Magnitude 6.2-6.8 expected within 24-48 hours.",
          status: "active",
          priority: 1,
          issued_at: new Date(),
          expires_at: new Date(Date.now() + 48 * 60 * 60 * 1000),
          updated_at: new Date(),
        },
      ]
    },

    async getActive(): Promise<Alert[]> {
      const alerts = await this.getAll()
      return alerts.filter((a) => a.status === "active")
    },
  },

  modelPerformance: {
    async getAll(): Promise<ModelPerformance[]> {
      return [
        {
          id: "1",
          model_name: "SeismicAI-v2.1",
          disaster_type: "earthquake",
          accuracy_score: 94.2,
          precision_score: 91.8,
          recall_score: 89.5,
          f1_score: 90.6,
          total_predictions: 150,
          correct_predictions: 141,
          false_positives: 12,
          false_negatives: 15,
          created_at: new Date(),
        },
      ]
    },
  },
}

// Database connection utility (placeholder for actual implementation)
export async function connectToDatabase() {
  // This would contain actual database connection logic
  console.log("Database connection established")
  return true
}

// Query builder utilities
export const queries = {
  predictions: {
    getByLocation: (location: string) =>
      `SELECT * FROM predictions WHERE location ILIKE '%${location}%' ORDER BY created_at DESC`,

    getBySeverity: (severity: string) =>
      `SELECT * FROM predictions WHERE severity = '${severity}' ORDER BY confidence_score DESC`,

    getRecent: (hours = 24) =>
      `SELECT * FROM predictions WHERE created_at >= NOW() - INTERVAL '${hours} hours' ORDER BY created_at DESC`,
  },

  alerts: {
    getActive: () =>
      `SELECT * FROM alerts WHERE status = 'active' AND (expires_at IS NULL OR expires_at > NOW()) ORDER BY priority ASC, issued_at DESC`,

    getByPriority: (priority: number) => `SELECT * FROM alerts WHERE priority = ${priority} ORDER BY issued_at DESC`,
  },
}
