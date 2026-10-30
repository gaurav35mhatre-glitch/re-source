import express from 'express';
import Company from '../models/Company.js';
import Resource from '../models/Resource.js';
import Requirement from '../models/Requirement.js';
import Match from '../models/Match.js';

const router = express.Router();

// GET all companies
router.get('/', async (req, res) => {
  try {
    const companies = await Company.find({})
      .populate('industry')
      .sort({ name: 1 });
    res.json(companies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET single company details + summary counts
router.get('/:id', async (req, res) => {
  try {
    const company = await Company.findById(req.params.id).populate('industry');
    if (!company) {
      return res.status(404).json({ error: 'Company not found' });
    }

    const [resourcesCount, requirementsCount, matchesAsProducer, matchesAsConsumer] = await Promise.all([
      Resource.countDocuments({ company: company._id, status: 'active' }),
      Requirement.countDocuments({ company: company._id, status: 'active' }),
      Match.countDocuments({
        resource: { $in: await Resource.find({ company: company._id }).distinct('_id') }
      }),
      Match.countDocuments({
        requirement: { $in: await Requirement.find({ company: company._id }).distinct('_id') }
      })
    ]);

    res.json({
      company,
      stats: {
        activeResources: resourcesCount,
        activeRequirements: requirementsCount,
        totalMatches: matchesAsProducer + matchesAsConsumer
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
