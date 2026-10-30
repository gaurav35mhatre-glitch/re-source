import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import { connectDB } from './config/db.js';
import companiesRoutes from './routes/companies.js';
import resourcesRoutes from './routes/resources.js';
import requirementsRoutes from './routes/requirements.js';
import matchesRoutes from './routes/matches.js';
import materialsRoutes from './routes/materials.js';
import impactRoutes from './routes/impact.js';
import networkRoutes from './routes/network.js';
import aiRoutes from './routes/ai.js';
import Company from './models/Company.js';
import { seedDatabase } from './data/seed.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/companies', companiesRoutes);
app.use('/api/resources', resourcesRoutes);
app.use('/api/requirements', requirementsRoutes);
app.use('/api/matches', matchesRoutes);
app.use('/api/materials', materialsRoutes);
app.use('/api/impact', impactRoutes);
app.use('/api/network', networkRoutes);
app.use('/api/ai', aiRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'SYMBIO API', timestamp: new Date() });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled server error:', err);
  res.status(500).json({ error: err.message || 'Internal Server Error' });
});

// Connect to DB and auto-seed if empty
connectDB()
  .then(async () => {
    const count = await Company.countDocuments();
    if (count === 0) {
      console.log('Database is empty. Automatically running initial seed script...');
      await seedDatabase();
    } else {
      console.log(`Database already populated with ${count} companies.`);
    }

    app.listen(PORT, () => {
      console.log(`=========================================`);
      console.log(`  SYMBIO Server running on port ${PORT}`);
      console.log(`  API Health: http://localhost:${PORT}/api/health`);
      console.log(`=========================================`);
    });
  })
  .catch(err => {
    console.error('Failed to initialize server database:', err);
    process.exit(1);
  });
