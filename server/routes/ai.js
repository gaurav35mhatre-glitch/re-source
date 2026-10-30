import express from 'express';
import { valorizeMaterial, generateMatchExplanation } from '../services/aiService.js';

const router = express.Router();

// 1. POST /api/ai/valorize
router.post('/valorize', async (req, res) => {
  try {
    const { materialName, quantity, unit, qualityNotes } = req.body;
    if (!materialName) {
      return res.status(400).json({ error: 'materialName is required' });
    }

    const result = await valorizeMaterial({
      materialName,
      quantity: Number(quantity) || 0,
      unit: unit || 'tons',
      qualityNotes: qualityNotes || ''
    });

    res.json(result);
  } catch (err) {
    console.error('AI Valorize error:', err);
    res.status(500).json({ error: err.message });
  }
});

// 2. POST /api/ai/explain-match
router.post('/explain-match', async (req, res) => {
  try {
    const { resource, requirement, score, breakdown, distanceKm, isCrossSector, requiresRegulatoryCheck } = req.body;
    
    if (!resource || !requirement) {
      return res.status(400).json({ error: 'resource and requirement objects are required' });
    }

    const explanation = await generateMatchExplanation({
      resource,
      requirement,
      score: score || 80,
      breakdown: breakdown || {},
      distanceKm: distanceKm || 25,
      isCrossSector: Boolean(isCrossSector),
      requiresRegulatoryCheck: Boolean(requiresRegulatoryCheck)
    });

    res.json({
      aiExplanation: explanation,
      requiresRegulatoryCheck: Boolean(requiresRegulatoryCheck)
    });
  } catch (err) {
    console.error('AI Explain error:', err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
