CREATE TABLE IF NOT EXISTS customers (
  id         SERIAL PRIMARY KEY,
  name       VARCHAR(100)  NOT NULL,
  email      VARCHAR(150)  NOT NULL UNIQUE,
  phone      VARCHAR(20),
  city       VARCHAR(100),
  created_at TIMESTAMPTZ   DEFAULT NOW()
);