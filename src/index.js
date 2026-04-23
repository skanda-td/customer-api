const express = require('express');
const dotenv  = require('dotenv');

const logger          = require('./middleware/logger');
const customerRoutes  = require('./routes/customerRoutes');

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");

dotenv.config();

const app  = express();
const PORT = process.env.PORT || 3000;

// ─── Global Middleware ────────────────────────────────────────────
app.use(express.json());          // parse JSON request bodies
// app.use(express.urlencoded({ extended: true })); // parse form data
app.use(logger);                  // log every request

// ─── Routes ───────────────────────────────────────────────────────
app.use('/api/customers', customerRoutes);

// ─── Health Check ─────────────────────────────────────────────────
app.get('/', (req, res) => {
  res.json({ success: true, message: 'Customer API is running' });
});

// ─── Swagger UI ──────────────────────────────────────────────────
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ─── 404 Handler ──────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// ─── Global Error Handler ─────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err.message);
  res.status(500).json({ success: false, message: 'Internal server error' });
});


// ─── Start Server ─────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log("Swagger docs on http://localhost:3000/api-docs");
});

// TODO: Proper status codes. Swagger .yaml conversion.