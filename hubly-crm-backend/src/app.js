const express = require('express');
const cors = require('cors');
const errorHandler = require('./utils/errorHandler');

// Import routes
const authRoutes = require('./routes/auth');
const ticketRoutes = require('./routes/tickets');
const dashboardRoutes = require('./routes/dashboard');
const analyticsRoutes = require('./routes/analytics');
const settingsRoutes = require('./routes/settings');
const teamRoutes = require('./routes/team');

const app = express();

// ==================== MIDDLEWARE ====================
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ==================== ROUTES ====================
app.use('/api/auth', authRoutes);
app.use('/api/tickets', ticketRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/team', teamRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Hubly CRM Backend is running',
    timestamp: new Date().toISOString()
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Hubly CRM API',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      auth: '/api/auth',
      tickets: '/api/tickets',
      dashboard: '/api/dashboard',
      analytics: '/api/analytics',
      settings: '/api/settings',
      team: '/api/team'
    }
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Endpoint not found',
    path: req.path
  });
});

// ==================== ERROR HANDLER ====================
app.use(errorHandler);

module.exports = app;