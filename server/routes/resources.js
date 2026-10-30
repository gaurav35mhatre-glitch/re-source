import express from 'express';
import Resource from '../models/Resource.js';
import Material from '../models/Material.js';
import { recomputeMatches } from '../services/matchingEngine.js';
import { valorizeMaterial } from '../services/aiService.js';

const router = express.Router();

// GET resources with optional filter by company
router.get('/', async (req, res) => {
  try {
    const filter = {};
    if (req.query.companyId) {
      filter.company = req.query.companyId;
    }
    if (req.query.status) {
      filter.status = req.query.status;
    }

    const resources = await Resource.find(filter)
      .populate('company')
      .populate('material')
      .sort({ createdAt: -1 });

    res.json(resources);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST new resource
router.post('/', async (req, res) => {
  try {
    let { company, materialId, materialName, category, type, quantity, unit, frequency, qualitySpec, aiSuggestedUses } = req.body;

    // Resolve material: find by id or name, or create on-the-fly
    let materialDoc = null;
    if (materialId) {
      materialDoc = await Material.findById(materialId);
    } else if (materialName) {
      materialDoc = await Material.findOne({ name: new RegExp(`^${materialName}$`, 'i') });
      if (!materialDoc) {
        materialDoc = await Material.create({
          name: materialName,
          category: category || 'byproduct',
          defaultUnit: unit || 'tons',
          compatibleCategories: []
        });
      }
    }

    if (!materialDoc) {
      return res.status(400).json({ error: 'Valid material must be specified' });
    }

    // If AI suggestions were not already generated on the frontend, generate them now
    if (!aiSuggestedUses || aiSuggestedUses.length === 0) {
      const aiValorization = await valorizeMaterial({
        materialName: materialDoc.name,
        quantity,
        unit: unit || 'tons',
        qualityNotes: qualitySpec
      });
      aiSuggestedUses = aiValorization.possiblePathways?.map(p => `${p.use} (${p.industrySector})`) || [];
    }

    const resource = await Resource.create({
      company,
      material: materialDoc._id,
      type: type || 'byproduct',
      quantity: Number(quantity),
      unit: unit || 'tons',
      frequency: frequency || 'monthly',
      qualitySpec: qualitySpec || '',
      aiSuggestedUses: aiSuggestedUses || [],
      status: 'active'
    });

    // Recompute matches across network asynchronously
    recomputeMatches().catch(e => console.error('Error during auto-recomputation:', e));

    const populated = await Resource.findById(resource._id).populate('company').populate('material');
    res.status(201).json(populated);
  } catch (err) {
    console.error('Error creating resource:', err);
    res.status(400).json({ error: err.message });
  }
});

// DELETE resource
router.delete('/:id', async (req, res) => {
  try {
    await Resource.findByIdAndUpdate(req.params.id, { status: 'archived' });
    recomputeMatches().catch(e => console.error('Error during auto-recomputation:', e));
    res.json({ message: 'Resource archived successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
