-- ensure users table exists before seed
CREATE TABLE IF NOT EXISTS users (
    id BIGSERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);

INSERT INTO users (
    username,
    password,
    email,
    created_at,
    updated_at
) VALUES (
             'Sultanbek Kenzhakhimov',
             '$2a$12$DfqYImPNIqIIS5fG0dP9p.eN.9/bH3PIFHNbVlMwAKCSERR63rdKK',
             'skenzhahimov@gmail.com',
             NOW(),
             NOW()
)
ON CONFLICT (username) DO NOTHING;

-- Add test user for development
INSERT INTO users (
    username,
    password,
    email,
    created_at,
    updated_at
) VALUES (
             'testuser',
             '$2a$12$DfqYImPNIqIIS5fG0dP9p.eN.9/bH3PIFHNbVlMwAKCSERR63rdKK',
             'test@example.com',
             NOW(),
             NOW()
)
ON CONFLICT (username) DO NOTHING;
