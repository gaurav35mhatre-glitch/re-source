import Resource from '../models/Resource.js';
import Requirement from '../models/Requirement.js';
import Match from '../models/Match.js';
import Material from '../models/Material.js';
import Regulation from '../models/Regulation.js';
import { generateMatchExplanation } from './aiService.js';

// Haversine formula to compute great-circle distance between two points in km
export function calculateDistanceKm(lat1, lon1, lat2, lon2) {
  if (lat1 === undefined || lon1 === undefined || lat2 === undefined || lon2 === undefined) return 999;
  const R = 6371; // Earth radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round((R * c) * 10) / 10;
}

// Frequency adjacency definition
const FREQUENCY_ORDER = ['daily', 'weekly', 'monthly', 'batch'];

export function calculateFrequencyScore(f1, f2) {
  if (!f1 || !f2) return 0.3;
  if (f1.toLowerCase() === f2.toLowerCase()) return 1.0;
  
  const i1 = FREQUENCY_ORDER.indexOf(f1.toLowerCase());
  const i2 = FREQUENCY_ORDER.indexOf(f2.toLowerCase());
  
  if (i1 !== -1 && i2 !== -1 && Math.abs(i1 - i2) === 1) {
    return 0.7; // Adjacent frequencies (e.g. daily <-> weekly, weekly <-> monthly)
  }
  return 0.3;
}

// Material compatibility map for cross-sector industrial valorization
const COMPATIBILITY_LOOKUP = {
  // Key: Resource material keyword or category -> Target requirement keywords
  'solvent': ['alternative_fuel', 'cement_co_processing', 'solvent_recovery', 'fuel_blend'],
  'sludge': ['cement_raw_mix', 'ceramics', 'biogas_feedstock', 'compost', 'brick_manufacturing', 'tsdf'],
  'fly_ash': ['cement_additive', 'concrete_pozzolan', 'brick_manufacturing', 'road_base'],
  'boiler_ash': ['cement_additive', 'road_base', 'soil_stabilization'],
  'scrap': ['steel_re_rolling', 'secondary_smelting', 'foundry_charge', 'metal_recycling'],
  'sand': ['road_construction_aggregate', 'concrete_mix', 'asphalt_filler', 'foundry_core'],
  'husk': ['biomass_fuel', 'boiler_feedstock', 'biochar', 'thermal_power'],
  'bagasse': ['biomass_fuel', 'paper_pulp', 'cogeneration', 'particle_board'],
  'heat': ['process_steam_preheat', 'drying_chamber', 'boiler_feed_preheat', 'district_heating'],
  'offcuts': ['polymer_reprocessing', 'rubber_crumb', 'recycled_pellets', 'molding_feedstock'],
  'liquor': ['solvent_recovery', 'distillation_input', 'acid_recovery'],
  'cardboard': ['kraft_paper_pulp', 'packaging_board', 'corrugated_core'],
  'pulp': ['biogas_feedstock', 'animal_feed', 'pectin_extraction', 'compost'],
  'fish': ['fishmeal_fertilizer', 'biogas_feedstock', 'protein_concentrate']
};

export function calculateCompatibility(resourceMaterial, reqAcceptableMaterials, aiSuggestedUses = []) {
  if (!resourceMaterial) return 0.2;
  const resMatId = resourceMaterial._id ? resourceMaterial._id.toString() : resourceMaterial.toString();

  // 1. Direct material ID match
  const directMatch = reqAcceptableMaterials.some(m => {
    const acceptableId = m._id ? m._id.toString() : m.toString();
    return acceptableId === resMatId;
  });
  if (directMatch) return 1.0;

  // 2. Name & Category cross-matching
  const resName = (resourceMaterial.name || '').toLowerCase();
  const resCat = (resourceMaterial.category || '').toLowerCase();

  for (const acc of reqAcceptableMaterials) {
    const accName = (acc.name || '').toLowerCase();
    
    // Exact or partial name match
    if (resName && accName && (resName.includes(accName) || accName.includes(resName))) {
      return 0.95;
    }

    // Category match
    if (resourceMaterial.compatibleCategories && accName) {
      const catMatch = resourceMaterial.compatibleCategories.some(c => 
        accName.includes(c.toLowerCase()) || (c.toLowerCase().includes(accName))
      );
      if (catMatch) return 0.88;
    }

    // Cross-industry valorization lookup check
    for (const [key, targets] of Object.entries(COMPATIBILITY_LOOKUP)) {
      if (resName.includes(key)) {
        for (const target of targets) {
          if (accName.includes(target) || target.includes(accName.replace(/\s+/g, '_'))) {
            return 0.90;
          }
        }
      }
    }
  }

  // 3. AI suggested uses cross-referencing
  if (Array.isArray(aiSuggestedUses) && aiSuggestedUses.length > 0) {
    for (const acc of reqAcceptableMaterials) {
      const accName = (acc.name || '').toLowerCase();
      const aiMatch = aiSuggestedUses.some(use => use.toLowerCase().includes(accName) || accName.includes(use.toLowerCase()));
      if (aiMatch) return 0.82;
    }
  }

  // If both are non-hazardous byproducts of similar nature
  if (resCat === 'byproduct') return 0.45;

  return 0.25;
}

// Compute single pair match score and breakdown
export function scorePair(resource, requirement, regulationMap = {}) {
  const companyA = resource.company;
  const companyB = requirement.company;
  const material = resource.material;

  // Cannot match company with itself
  if (companyA._id.toString() === companyB._id.toString()) {
    return null;
  }

  // 1. Compatibility (0 - 1.0)
  const compatibility = calculateCompatibility(
    material,
    requirement.acceptableMaterials || [],
    resource.aiSuggestedUses || []
  );

  // 2. Quantity (0 - 1.0)
  const supply = resource.quantity || 1;
  const demand = requirement.quantityNeeded || 1;
  const quantity = Math.round((Math.min(supply, demand) / Math.max(supply, demand)) * 100) / 100;

  // 3. Distance (0 - 1.0)
  const distKm = calculateDistanceKm(
    companyA.location?.lat,
    companyA.location?.lng,
    companyB.location?.lat,
    companyB.location?.lng
  );
  const maxDist = requirement.maxDistanceKm || 250;
  let distScore = Math.max(0, 1 - (distKm / maxDist));
  
  // Bonus for same MIDC cluster
  if (companyA.location?.midcCluster && 
      companyA.location.midcCluster === companyB.location?.midcCluster) {
    distScore = Math.min(1.0, distScore + 0.15);
  }
  const distance = Math.round(distScore * 100) / 100;

  // 4. Frequency (0 - 1.0)
  const frequency = calculateFrequencyScore(resource.frequency, requirement.frequency);

  // 5. Verification & Regulation (0 or 1.0)
  let verification = (companyA.verified && companyB.verified) ? 1.0 : 0.0;
  let requiresRegulatoryCheck = false;

  if (material.category === 'hazardous') {
    requiresRegulatoryCheck = true;
    const isAuthorized = (companyA.authorizedForHazardous !== false) && 
                         (companyB.authorizedForHazardous !== false);
    if (!isAuthorized) {
      verification = 0.0;
    }
  }

  // Final score weighted formula:
  // score = 0.35*compatibility + 0.20*quantity + 0.20*distance + 0.15*frequency + 0.10*verification
  const weighted = (
    0.35 * compatibility +
    0.20 * quantity +
    0.20 * distance +
    0.15 * frequency +
    0.10 * verification
  );
  const finalScore = Math.round(weighted * 100);

  // Impact estimation
  const divertedTons = Math.min(supply, demand);
  const divertedKg = divertedTons * 1000;
  
  // Specific CO2 and Cost factors per material type
  let co2Factor = 1.2; // kg CO2 avoided per kg material
  let costFactor = 12000; // INR per ton saved

  const matName = (material.name || '').toLowerCase();
  if (matName.includes('solvent')) {
    co2Factor = 1.85;
    costFactor = 28000;
  } else if (matName.includes('heat')) {
    co2Factor = 2.4;
    costFactor = 18000;
  } else if (matName.includes('steel') || matName.includes('metal')) {
    co2Factor = 1.6;
    costFactor = 32000;
  } else if (matName.includes('ash') || matName.includes('sand')) {
    co2Factor = 0.65;
    costFactor = 4500;
  } else if (matName.includes('sludge')) {
    co2Factor = 1.1;
    costFactor = 9500;
  } else if (matName.includes('plastic') || matName.includes('rubber')) {
    co2Factor = 1.7;
    costFactor = 24000;
  } else if (matName.includes('bagasse') || matName.includes('husk')) {
    co2Factor = 1.35;
    costFactor = 6500;
  }

  const co2SavedKg = Math.round(divertedKg * co2Factor);
  const costSavedINR = Math.round(divertedTons * costFactor);

  const sectorA = companyA.industry?.sector || companyA.industry?.name;
  const sectorB = companyB.industry?.sector || companyB.industry?.name;
  const isCrossSector = Boolean(sectorA && sectorB && sectorA !== sectorB);

  return {
    score: finalScore,
    breakdown: {
      compatibility: Math.round(compatibility * 100) / 100,
      quantity,
      distance,
      frequency,
      verification
    },
    distanceKm: distKm,
    isCrossSector,
    requiresRegulatoryCheck,
    impact: {
      co2SavedKg,
      costSavedINR,
      wasteDivertedKg: Math.round(divertedKg)
    }
  };
}

// Recompute all matches across active resources and requirements
export async function recomputeMatches() {
  console.log('Starting full match recomputation...');

  const resources = await Resource.find({ status: 'active' })
    .populate('company')
    .populate('material')
    .populate({
      path: 'company',
      populate: { path: 'industry' }
    });

  const requirements = await Requirement.find({ status: 'active' })
    .populate('company')
    .populate('acceptableMaterials')
    .populate({
      path: 'company',
      populate: { path: 'industry' }
    });

  const regulations = await Regulation.find({});
  const regulationMap = {};
  regulations.forEach(r => { regulationMap[r.materialCategory] = r; });

  let createdCount = 0;
  let updatedCount = 0;

  for (const res of resources) {
    if (!res.company || !res.material) continue;

    for (const req of requirements) {
      if (!req.company) continue;
      if (res.company._id.toString() === req.company._id.toString()) continue;

      const scored = scorePair(res, req, regulationMap);
      if (!scored || scored.score < 48) {
        continue; // Filter pairings scoring below ~50
      }

      // Check if match already exists
      const existingMatch = await Match.findOne({
        resource: res._id,
        requirement: req._id
      });

      let aiExplanation = existingMatch?.aiExplanation;
      if (!aiExplanation) {
        aiExplanation = await generateMatchExplanation({
          resource: res,
          requirement: req,
          score: scored.score,
          breakdown: scored.breakdown,
          distanceKm: scored.distanceKm,
          isCrossSector: scored.isCrossSector,
          requiresRegulatoryCheck: scored.requiresRegulatoryCheck
        });
      }

      const matchData = {
        resource: res._id,
        requirement: req._id,
        score: scored.score,
        breakdown: scored.breakdown,
        distanceKm: scored.distanceKm,
        isCrossSector: scored.isCrossSector,
        requiresRegulatoryCheck: scored.requiresRegulatoryCheck,
        impact: scored.impact,
        aiExplanation
      };

      if (existingMatch) {
        await Match.findByIdAndUpdate(existingMatch._id, matchData);
        updatedCount++;
      } else {
        await Match.create(matchData);
        createdCount++;
      }
    }
  }

  console.log(`Matching engine finished: created ${createdCount}, updated ${updatedCount} matches.`);
  return { createdCount, updatedCount };
}

// Recompute matches for a single resource or requirement
export async function recomputeForResourceOrRequirement(targetType, docId) {
  return recomputeMatches();
}
