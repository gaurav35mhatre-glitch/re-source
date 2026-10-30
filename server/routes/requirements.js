import express from 'express';
import Requirement from '../models/Requirement.js';
import Material from '../models/Material.js';
import { recomputeMatches } from '../services/matchingEngine.js';

const router = express.Router();

// GET requirements with optional filter by company
router.get('/', async (req, res) => {
  try {
    const filter = {};
    if (req.query.companyId) {
      filter.company = req.query.companyId;
    }
    if (req.query.status) {
      filter.status = req.query.status;
    }

    const requirements = await Requirement.find(filter)
      .populate('company')
      .populate('acceptableMaterials')
      .sort({ createdAt: -1 });

    res.json(requirements);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST new requirement
router.post('/', async (req, res) => {
  try {
    const { company, acceptableMaterialIds, materialName, quantityNeeded, unit, frequency, toleranceSpec, maxDistanceKm } = req.body;

    let acceptableMaterials = acceptableMaterialIds || [];

    if (materialName && acceptableMaterials.length === 0) {
      let materialDoc = await Material.findOne({ name: new RegExp(`^${materialName}$`, 'i') });
      if (!materialDoc) {
        materialDoc = await Material.create({
          name: materialName,
          category: 'non_hazardous',
          defaultUnit: unit || 'tons',
          compatibleCategories: []
        });
      }
      acceptableMaterials.push(materialDoc._id);
    }

    const requirement = await Requirement.create({
      company,
      acceptableMaterials,
      quantityNeeded: Number(quantityNeeded),
      unit: unit || 'tons',
      frequency: frequency || 'monthly',
      toleranceSpec: toleranceSpec || '',
      maxDistanceKm: Number(maxDistanceKm) || 250,
      status: 'active'
    });

    // Recompute matches across network asynchronously
    recomputeMatches().catch(e => console.error('Error during auto-recomputation:', e));

    const populated = await Requirement.findById(requirement._id).populate('company').populate('acceptableMaterials');
    res.status(201).json(populated);
  } catch (err) {
    console.error('Error creating requirement:', err);
    res.status(400).json({ error: err.message });
  }
});

// DELETE requirement
router.delete('/:id', async (req, res) => {
  try {
    await Requirement.findByIdAndUpdate(req.params.id, { status: 'archived' });
    recomputeMatches().catch(e => console.error('Error during auto-recomputation:', e));
    res.json({ message: 'Requirement archived successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
