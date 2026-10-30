import express from 'express';
import Match from '../models/Match.js';
import Resource from '../models/Resource.js';
import Requirement from '../models/Requirement.js';
import { recomputeMatches } from '../services/matchingEngine.js';

const router = express.Router();

// GET matches with filtering and ranking
router.get('/', async (req, res) => {
  try {
    const { companyId, sector, minScore, maxDistance, isCrossSector, limit } = req.query;

    const query = {};

    if (minScore) {
      query.score = { $gte: Number(minScore) };
    }

    if (maxDistance) {
      query.distanceKm = { $lte: Number(maxDistance) };
    }

    if (isCrossSector !== undefined && isCrossSector !== '') {
      query.isCrossSector = isCrossSector === 'true';
    }

    // Populate resource & requirement with company and materials
    let matchesQuery = Match.find(query)
      .populate({
        path: 'resource',
        populate: [
          { path: 'company', populate: { path: 'industry' } },
          { path: 'material' }
        ]
      })
      .populate({
        path: 'requirement',
        populate: [
          { path: 'company', populate: { path: 'industry' } },
          { path: 'acceptableMaterials' }
        ]
      })
      .sort({ score: -1 });

    let matches = await matchesQuery.exec();

    // Filter by companyId if specified (either as provider or consumer)
    if (companyId) {
      matches = matches.filter(m => {
        const resCompId = m.resource?.company?._id?.toString();
        const reqCompId = m.requirement?.company?._id?.toString();
        return resCompId === companyId || reqCompId === companyId;
      });
    }

    // Filter by sector if specified (counterpart sector)
    if (sector && companyId) {
      matches = matches.filter(m => {
        const isProvider = m.resource?.company?._id?.toString() === companyId;
        const counterpartSector = isProvider
          ? m.requirement?.company?.industry?.sector
          : m.resource?.company?.industry?.sector;
        return counterpartSector?.toLowerCase() === sector.toLowerCase();
      });
    } else if (sector && !companyId) {
      matches = matches.filter(m => {
        const sec1 = m.resource?.company?.industry?.sector;
        const sec2 = m.requirement?.company?.industry?.sector;
        return sec1?.toLowerCase() === sector.toLowerCase() || sec2?.toLowerCase() === sector.toLowerCase();
      });
    }

    if (limit) {
      matches = matches.slice(0, Number(limit));
    }

    res.json(matches);
  } catch (err) {
    console.error('Error fetching matches:', err);
    res.status(500).json({ error: err.message });
  }
});

// GET single match
router.get('/:id', async (req, res) => {
  try {
    const match = await Match.findById(req.params.id)
      .populate({
        path: 'resource',
        populate: [
          { path: 'company', populate: { path: 'industry' } },
          { path: 'material' }
        ]
      })
      .populate({
        path: 'requirement',
        populate: [
          { path: 'company', populate: { path: 'industry' } },
          { path: 'acceptableMaterials' }
        ]
      });

    if (!match) return res.status(404).json({ error: 'Match not found' });
    res.json(match);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PATCH update match status (e.g. connected, reviewing, declined)
router.patch('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const match = await Match.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.json(match);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// POST manually trigger recompute
router.post('/recompute', async (req, res) => {
  try {
    const result = await recomputeMatches();
    res.json({ message: 'Matches recomputed successfully', ...result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
