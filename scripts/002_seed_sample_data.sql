-- Seed sample data for disaster prediction system
-- This script populates the database with realistic sample data for testing and demonstration

-- Insert sample predictions
INSERT INTO predictions (
    disaster_type_id, location, latitude, longitude, severity, confidence_score,
    predicted_start_time, predicted_end_time, magnitude, affected_area_km2,
    population_at_risk, model_version, raw_prediction_data
) VALUES
-- Earthquake prediction for San Francisco
(
    (SELECT id FROM disaster_types WHERE name = 'earthquake'),
    'San Francisco Bay Area, CA',
    37.7749, -122.4194,
    'high',
    87.3,
    NOW() + INTERVAL '24 hours',
    NOW() + INTERVAL '48 hours',
    6.5,
    2500.0,
    7800000,
    'SeismicAI-v2.1',
    '{"tectonic_stress": 0.85, "recent_activity": 0.72, "geological_factors": 0.91}'::jsonb
),
-- Wildfire prediction for Southern California
(
    (SELECT id FROM disaster_types WHERE name = 'wildfire'),
    'Los Angeles County, CA',
    34.0522, -118.2437,
    'medium',
    73.8,
    NOW() + INTERVAL '3 days',
    NOW() + INTERVAL '10 days',
    NULL,
    2400.0,
    2400000,
    'FireRisk-v1.8',
    '{"wind_speed": 45, "humidity": 15, "temperature": 38, "vegetation_dryness": 0.89}'::jsonb
),
-- Hurricane prediction for Gulf Coast
(
    (SELECT id FROM disaster_types WHERE name = 'hurricane'),
    'Gulf Coast, TX/LA',
    29.7604, -95.3698,
    'medium',
    65.2,
    NOW() + INTERVAL '7 days',
    NOW() + INTERVAL '12 days',
    NULL,
    5000.0,
    1200000,
    'HurricaneTrack-v3.0',
    '{"sea_temperature": 29.5, "wind_shear": 0.3, "pressure_gradient": 0.78}'::jsonb
),
-- Flood prediction for Mississippi Valley
(
    (SELECT id FROM disaster_types WHERE name = 'flood'),
    'Mississippi River Valley',
    38.6270, -90.1994,
    'high',
    82.1,
    NOW() + INTERVAL '2 days',
    NOW() + INTERVAL '7 days',
    NULL,
    1800.0,
    890000,
    'FloodPredict-v2.3',
    '{"rainfall_forecast": 150, "river_level": 0.92, "soil_saturation": 0.88}'::jsonb
),
-- Tornado prediction for Oklahoma
(
    (SELECT id FROM disaster_types WHERE name = 'tornado'),
    'Central Oklahoma',
    35.4676, -97.5164,
    'medium',
    71.4,
    NOW() + INTERVAL '1 day',
    NOW() + INTERVAL '2 days',
    NULL,
    800.0,
    650000,
    'TornadoWatch-v1.5',
    '{"atmospheric_instability": 0.84, "wind_shear": 0.76, "temperature_gradient": 0.69}'::jsonb
);

-- Insert corresponding alerts
INSERT INTO alerts (
    prediction_id, title, description, status, priority, expires_at
) VALUES
-- Alert for earthquake prediction
(
    (SELECT id FROM predictions WHERE location = 'San Francisco Bay Area, CA' LIMIT 1),
    'Major Earthquake Risk - San Francisco Bay Area',
    'High probability seismic activity detected. Magnitude 6.2-6.8 expected within 24-48 hours. Residents should review emergency preparedness plans.',
    'active',
    1,
    NOW() + INTERVAL '48 hours'
),
-- Alert for wildfire prediction
(
    (SELECT id FROM predictions WHERE location = 'Los Angeles County, CA' LIMIT 1),
    'Wildfire Spread Risk - Southern California',
    'Extreme fire weather conditions with high winds and low humidity. Multiple ignition sources detected. Evacuation routes should be reviewed.',
    'monitoring',
    2,
    NOW() + INTERVAL '10 days'
),
-- Alert for hurricane prediction
(
    (SELECT id FROM predictions WHERE location = 'Gulf Coast, TX/LA' LIMIT 1),
    'Hurricane Formation - Gulf of Mexico',
    'Tropical disturbance showing signs of organization. Category 2-3 hurricane possible in 7-10 days. Coastal areas should monitor developments.',
    'monitoring',
    3,
    NOW() + INTERVAL '12 days'
),
-- Alert for flood prediction
(
    (SELECT id FROM predictions WHERE location = 'Mississippi River Valley' LIMIT 1),
    'Flash Flood Warning - Mississippi Valley',
    'Heavy rainfall and rapid snowmelt creating dangerous flood conditions along major waterways. Low-lying areas at immediate risk.',
    'active',
    1,
    NOW() + INTERVAL '7 days'
);

-- Insert historical events for model training
INSERT INTO historical_events (
    disaster_type_id, location, latitude, longitude, severity,
    start_time, end_time, magnitude, casualties, economic_damage, description
) VALUES
-- Historical earthquake
(
    (SELECT id FROM disaster_types WHERE name = 'earthquake'),
    'Northridge, CA',
    34.2081, -118.5370,
    'high',
    '1994-01-17 04:30:55',
    '1994-01-17 04:31:25',
    6.7,
    57,
    20000000000,
    'Northridge earthquake caused widespread damage in Los Angeles area'
),
-- Historical wildfire
(
    (SELECT id FROM disaster_types WHERE name = 'wildfire'),
    'Paradise, CA',
    39.7596, -121.6219,
    'critical',
    '2018-11-08 06:33:00',
    '2018-11-25 00:00:00',
    NULL,
    85,
    16500000000,
    'Camp Fire destroyed the town of Paradise and surrounding areas'
),
-- Historical hurricane
(
    (SELECT id FROM disaster_types WHERE name = 'hurricane'),
    'New Orleans, LA',
    29.9511, -90.0715,
    'critical',
    '2005-08-29 06:10:00',
    '2005-08-30 12:00:00',
    NULL,
    1833,
    125000000000,
    'Hurricane Katrina caused catastrophic flooding in New Orleans'
);

-- Insert model performance data
INSERT INTO model_performance (
    model_name, disaster_type_id, accuracy_score, precision_score,
    recall_score, f1_score, evaluation_period_start, evaluation_period_end,
    total_predictions, correct_predictions, false_positives, false_negatives
) VALUES
('SeismicAI-v2.1', (SELECT id FROM disaster_types WHERE name = 'earthquake'), 94.2, 91.8, 89.5, 90.6, NOW() - INTERVAL '30 days', NOW(), 150, 141, 12, 15),
('FireRisk-v1.8', (SELECT id FROM disaster_types WHERE name = 'wildfire'), 87.8, 85.3, 84.1, 84.7, NOW() - INTERVAL '30 days', NOW(), 200, 176, 18, 24),
('HurricaneTrack-v3.0', (SELECT id FROM disaster_types WHERE name = 'hurricane'), 91.5, 89.2, 88.7, 88.9, NOW() - INTERVAL '30 days', NOW(), 80, 73, 6, 7),
('FloodPredict-v2.3', (SELECT id FROM disaster_types WHERE name = 'flood'), 89.3, 87.1, 86.8, 86.9, NOW() - INTERVAL '30 days', NOW(), 120, 107, 11, 13),
('TornadoWatch-v1.5', (SELECT id FROM disaster_types WHERE name = 'tornado'), 85.7, 83.4, 82.9, 83.1, NOW() - INTERVAL '30 days', NOW(), 95, 81, 12, 14);

-- Insert data sources
INSERT INTO data_sources (name, type, url, update_frequency_minutes, status) VALUES
('USGS Earthquake Hazards Program', 'seismic', 'https://earthquake.usgs.gov/earthquakes/feed/', 5, 'active'),
('NOAA Weather Service', 'weather', 'https://api.weather.gov/', 15, 'active'),
('NASA MODIS Fire Detection', 'satellite', 'https://firms.modaps.eosdis.nasa.gov/', 60, 'active'),
('NOAA Hurricane Database', 'weather', 'https://www.nhc.noaa.gov/', 30, 'active'),
('USGS Water Resources', 'hydrological', 'https://waterdata.usgs.gov/', 15, 'active'),
('Storm Prediction Center', 'weather', 'https://www.spc.noaa.gov/', 10, 'active');
