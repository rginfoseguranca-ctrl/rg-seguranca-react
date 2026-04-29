const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const clientRoutes = require('./routes/clients');
const serviceRoutes = require('./routes/services');
const scheduleRoutes = require('./routes/schedule');

app.use('/api/clients', clientRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/schedule', scheduleRoutes);

// Database connection (placeholder for PostgreSQL)
const { Pool } = require('pg');
const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
});

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'RG Segurança API is running!' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = pool;