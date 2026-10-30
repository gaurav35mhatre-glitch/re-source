import express from 'express';
import Company from '../models/Company.js';
import Match from '../models/Match.js';
import Resource from '../models/Resource.js';
import Requirement from '../models/Requirement.js';

const router = express.Router();

const SECTOR_COLORS = {
  'Automotive': '#3B82F6',               // Blue
  'Chemicals': '#EF4444',                // Red
  'Pharmaceuticals': '#8B5CF6',          // Purple
  'Textiles': '#EC4899',                 // Pink
  'Food Processing': '#10B981',          // Emerald
  'Foundry & Metallurgy': '#F59E0B',     // Amber
  'Petrochemicals': '#6366F1',          // Indigo
  'Agro-Processing': '#84CC16',          // Lime
  'FMCG & Packaging': '#06B6D4',         // Cyan
  'Cement & Building Materials': '#78716C', // Stone
  'Construction & Aggregates': '#D97706',  // Amber-600
  'Power & Energy': '#F97316',           // Orange
  'Solvent Recovery': '#14B8A6'          // Teal
};

router.get('/', async (req, res) => {
  try {
    const [companies, matches, resources, requirements] = await Promise.all([
      Company.find({}).populate('industry'),
      Match.find({})
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
        }),
      Resource.find({ status: 'active' }).populate('material'),
      Requirement.find({ status: 'active' }).populate('acceptableMaterials')
    ]);

    // Count matches per company to scale node radius
    const matchCountMap = {};
    matches.forEach(m => {
      const srcId = m.resource?.company?._id?.toString();
      const tgtId = m.requirement?.company?._id?.toString();
      if (srcId) matchCountMap[srcId] = (matchCountMap[srcId] || 0) + 1;
      if (tgtId) matchCountMap[tgtId] = (matchCountMap[tgtId] || 0) + 1;
    });

    // Group resources and requirements by company
    const resourcesByCompany = {};
    resources.forEach(r => {
      const cId = r.company.toString();
      if (!resourcesByCompany[cId]) resourcesByCompany[cId] = [];
      resourcesByCompany[cId].push({
        id: r._id,
        material: r.material?.name,
        quantity: r.quantity,
        unit: r.unit,
        type: r.type,
        frequency: r.frequency,
        aiSuggestedUses: r.aiSuggestedUses
      });
    });

    const requirementsByCompany = {};
    requirements.forEach(reqDoc => {
      const cId = reqDoc.company.toString();
      if (!requirementsByCompany[cId]) requirementsByCompany[cId] = [];
      requirementsByCompany[cId].push({
        id: reqDoc._id,
        materials: reqDoc.acceptableMaterials?.map(m => m.name) || [],
        quantityNeeded: reqDoc.quantityNeeded,
        unit: reqDoc.unit,
        frequency: reqDoc.frequency
      });
    });

    const nodes = companies.map(c => {
      const sector = c.industry?.sector || 'General';
      const cId = c._id.toString();
      const count = matchCountMap[cId] || 0;

      return {
        id: cId,
        name: c.name,
        sector,
        color: SECTOR_COLORS[sector] || '#64748B',
        cluster: c.location?.midcCluster || 'Maharashtra',
        address: c.location?.address,
        lat: c.location?.lat,
        lng: c.location?.lng,
        contactEmail: c.contactEmail,
        verified: c.verified,
        matchesCount: count,
        // Radius between 12 and 36 based on connection density
        radius: Math.min(36, 12 + count * 4.5),
        resources: resourcesByCompany[cId] || [],
        requirements: requirementsByCompany[cId] || []
      };
    });

    const edges = matches
      .filter(m => m.resource?.company && m.requirement?.company)
      .map(m => {
        const sourceComp = m.resource.company;
        const targetComp = m.requirement.company;

        return {
          id: m._id.toString(),
          source: sourceComp._id.toString(),
          target: targetComp._id.toString(),
          sourceName: sourceComp.name,
          targetName: targetComp.name,
          sourceSector: sourceComp.industry?.sector,
          targetSector: targetComp.industry?.sector,
          materialName: m.resource?.material?.name || 'Material',
          score: m.score,
          breakdown: m.breakdown,
          distanceKm: m.distanceKm,
          isCrossSector: m.isCrossSector,
          requiresRegulatoryCheck: m.requiresRegulatoryCheck,
          wasteDivertedKg: m.impact?.wasteDivertedKg || 0,
          co2SavedKg: m.impact?.co2SavedKg || 0,
          costSavedINR: m.impact?.costSavedINR || 0,
          aiExplanation: m.aiExplanation,
          status: m.status
        };
      });

    res.json({
      nodes,
      edges,
      sectorPalette: SECTOR_COLORS
    });
  } catch (err) {
    console.error('Error constructing network graph:', err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
