import express from 'express';
import prisma from '../config/db.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    
    await prisma.$queryRaw`SELECT 1`;

    res.status(200).json({
      status: 'UP',
      database: 'CONNECTED',
      uptime: process.uptime(),
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(503).json({
      status: 'DOWN',
      database: 'DISCONNECTED',
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

export default router;
