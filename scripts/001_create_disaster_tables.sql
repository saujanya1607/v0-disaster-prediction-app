-- Create database schema for disaster prediction system
-- This script sets up the core tables for storing predictions, alerts, and historical data

-- Disaster types lookup table
CREATE TABLE IF NOT EXISTS disaster_types (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert disaster types
INSERT INTO disaster_types (name, description) VALUES
('earthquake', 'Seismic activity and ground shaking events'),
('wildfire', 'Uncontrolled fires in natural areas'),
('hurricane', 'Tropical cyclones with high winds and storm surge'),
('flood', 'Water overflow in normally dry areas'),
('tornado', 'Rotating columns of air touching ground')
ON CONFLICT (name) DO NOTHING;

-- Predictions table - stores AI model predictions
CREATE TABLE IF NOT EXISTS predictions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    disaster_type_id INTEGER REFERENCES disaster_types(id),
    location VARCHAR(255) NOT NULL,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    severity VARCHAR(20) CHECK (severity IN ('low', 'medium', 'high', 'critical')),
    confidence_score DECIMAL(5, 2) CHECK (confidence_score >= 0 AND confidence_score <= 100),
    predicted_start_time TIMESTAMP,
    predicted_end_time TIMESTAMP,
    magnitude DECIMAL(4, 2), -- For earthquakes
    wind_speed INTEGER, -- For hurricanes/tornadoes
    affected_area_km2 DECIMAL(10, 2),
    population_at_risk INTEGER,
    model_version VARCHAR(50),
    raw_prediction_data JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Alerts table - stores active alerts based on predictions
CREATE TABLE IF NOT EXISTS alerts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    prediction_id UUID REFERENCES predictions(id),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'monitoring', 'resolved', 'cancelled')),
    priority INTEGER DEFAULT 3 CHECK (priority >= 1 AND priority <= 5), -- 1 = highest, 5 = lowest
    issued_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP,
    resolved_at TIMESTAMP,
    created_by VARCHAR(100),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Historical events table - stores actual disaster occurrences for model training
CREATE TABLE IF NOT EXISTS historical_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    disaster_type_id INTEGER REFERENCES disaster_types(id),
    location VARCHAR(255) NOT NULL,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    severity VARCHAR(20) CHECK (severity IN ('low', 'medium', 'high', 'critical')),
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP,
    magnitude DECIMAL(4, 2),
    wind_speed INTEGER,
    affected_area_km2 DECIMAL(10, 2),
    casualties INTEGER DEFAULT 0,
    economic_damage BIGINT, -- in USD
    description TEXT,
    data_sources TEXT[],
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Model performance table - tracks accuracy and performance metrics
CREATE TABLE IF NOT EXISTS model_performance (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    model_name VARCHAR(100) NOT NULL,
    disaster_type_id INTEGER REFERENCES disaster_types(id),
    accuracy_score DECIMAL(5, 2),
    precision_score DECIMAL(5, 2),
    recall_score DECIMAL(5, 2),
    f1_score DECIMAL(5, 2),
    evaluation_period_start TIMESTAMP,
    evaluation_period_end TIMESTAMP,
    total_predictions INTEGER,
    correct_predictions INTEGER,
    false_positives INTEGER,
    false_negatives INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Data sources table - tracks external data feeds
CREATE TABLE IF NOT EXISTS data_sources (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    type VARCHAR(50), -- 'seismic', 'weather', 'satellite', etc.
    url VARCHAR(500),
    api_key_required BOOLEAN DEFAULT FALSE,
    update_frequency_minutes INTEGER,
    last_updated TIMESTAMP,
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'error')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_predictions_location ON predictions(location);
CREATE INDEX IF NOT EXISTS idx_predictions_disaster_type ON predictions(disaster_type_id);
CREATE INDEX IF NOT EXISTS idx_predictions_severity ON predictions(severity);
CREATE INDEX IF NOT EXISTS idx_predictions_created_at ON predictions(created_at);
CREATE INDEX IF NOT EXISTS idx_alerts_status ON alerts(status);
CREATE INDEX IF NOT EXISTS idx_alerts_priority ON alerts(priority);
CREATE INDEX IF NOT EXISTS idx_alerts_issued_at ON alerts(issued_at);
CREATE INDEX IF NOT EXISTS idx_historical_events_disaster_type ON historical_events(disaster_type_id);
CREATE INDEX IF NOT EXISTS idx_historical_events_start_time ON historical_events(start_time);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at columns
CREATE TRIGGER update_predictions_updated_at BEFORE UPDATE ON predictions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_alerts_updated_at BEFORE UPDATE ON alerts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
