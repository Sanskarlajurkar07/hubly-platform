require('dotenv').config();
const app = require('./src/app');
const connectDB = require('./src/config/database');

// Connect to MongoDB
connectDB();

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('================================');
  console.log('🚀 Hubly CRM Backend Started!');
  console.log(`📡 Server: http://localhost:${PORT}`);
  console.log(`🔗 API Base: http://localhost:${PORT}/api`);
  console.log(`🏥 Health: http://localhost:${PORT}/api/health`);
  console.log('================================');
});