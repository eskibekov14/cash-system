-- Create guest_tables table if it doesn't exist
CREATE TABLE IF NOT EXISTS guest_tables (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    capacity INTEGER NOT NULL,
    location VARCHAR(255) NOT NULL,
    status VARCHAR(50) NOT NULL
);

-- Insert sample tables for the restaurant
INSERT INTO guest_tables (name, capacity, location, status) VALUES
    ('Стол 1', 2, 'У окна', 'AVAILABLE'),
    ('Стол 2', 4, 'У окна', 'AVAILABLE'),
    ('Стол 3', 6, 'Центр зала', 'AVAILABLE'),
    ('Стол 4', 2, 'Центр зала', 'AVAILABLE'),
    ('Стол 5', 4, 'У стены', 'AVAILABLE'),
    ('Стол 6', 8, 'VIP зона', 'AVAILABLE'),
    ('Стол 7', 2, 'У окна', 'AVAILABLE'),
    ('Стол 8', 4, 'У стены', 'AVAILABLE')
ON CONFLICT (id) DO NOTHING;
