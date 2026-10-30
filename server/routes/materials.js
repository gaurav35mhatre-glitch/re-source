import express from 'express';
import Material from '../models/Material.js';

const router = express.Router();

// GET all materials for autocomplete and selection
router.get('/', async (req, res) => {
  try {
    const materials = await Material.find({}).sort({ name: 1 });
    res.json(materials);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST new material if not in autocomplete list
router.post('/', async (req, res) => {
  try {
    const { name, category, defaultUnit, compatibleCategories, hazardClass } = req.body;
    const existing = await Material.findOne({ name: new RegExp(`^${name}$`, 'i') });
    if (existing) {
      return res.json(existing);
    }
    const material = await Material.create({
      name,
      category: category || 'byproduct',
      defaultUnit: defaultUnit || 'tons/month',
      compatibleCategories: compatibleCategories || [],
      hazardClass: hazardClass || 'None'
    });
    res.status(201).json(material);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
