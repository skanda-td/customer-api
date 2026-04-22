# Customer Management API

A REST API built with Node.js, Express, and PostgreSQL (via Docker) to create, read, update, and delete customers.

---

## Prerequisites

Make sure you have these installed before running the project:

- [Node.js](https://nodejs.org/) (v18 or higher)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)

---

## Running the Project

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd customer-api
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root of the project:

```env
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=customer_db
DB_USER=postgres
DB_PASSWORD=yourpassword
```

### 4. Start the database

Make sure Docker Desktop is running, then:

```bash
docker compose up -d
```

This starts a PostgreSQL container and automatically runs `db/schema.sql` to create the `customers` table.

To verify the container is running:

```bash
docker ps
```

### 5. Start the server

```bash
# Development (auto-restarts on file changes)
npm run dev

# Production
npm start
```

The API will be running at `http://localhost:3000`.

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/customers` | Get all customers |
| GET | `/api/customers/:id` | Get a single customer |
| POST | `/api/customers` | Create a new customer |
| PUT | `/api/customers/:id` | Update a customer |
| DELETE | `/api/customers/:id` | Delete a customer |

---

## Postman Collection

The `postman/` folder contains a ready-to-use Postman collection with all 5 endpoints pre-configured.

---

## Stopping the Project

```bash
# Stop the database container
docker compose down

# Stop and delete all data (fresh start)
docker compose down -v
```