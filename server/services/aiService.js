/**
 * SYMBIO AI Service
 * Supports Gemini or Claude LLMs with robust fallback domain heuristics
 * ensuring zero failure rate during hackathon demos and offline runs.
 */

// Heuristic fallback for valorization pathways
const VALORIZATION_KNOWLEDGE_BASE = [
  {
    keywords: ['solvent', 'acetone', 'toluene', 'ipa', 'alcohol'],
    pathways: [
      { use: 'Alternative fuel co-processing in cement kilns (calorific value recovery)', industrySector: 'Cement & Building Materials', confidence: 0.94 },
      { use: 'Fractional distillation & solvent purification for re-use', industrySector: 'Chemicals', confidence: 0.88 },
      { use: 'Formulation blending for industrial cleaning agents', industrySector: 'Paints & Coatings', confidence: 0.76 }
    ],
    notes: 'Requires MPCB authorization under Hazardous and Other Wastes Rules (HWM Schedule I, Item 20). High calorific value makes it an ideal fossil-fuel alternative in cement manufacturing.'
  },
  {
    keywords: ['sludge', 'etp', 'biological', 'organic sludge'],
    pathways: [
      { use: 'Co-digestion feedstock in biomethanation & biogas plants', industrySector: 'Renewable Energy', confidence: 0.91 },
      { use: 'Co-processing as mineral substitute in Portland cement kiln clinker', industrySector: 'Cement & Building Materials', confidence: 0.85 },
      { use: 'Soil conditioner / organic compost after pathogen inactivation', industrySector: 'Agro-Processing', confidence: 0.72 }
    ],
    notes: 'Verify heavy metal and organochlorine limits before agricultural or compost utilization. Co-processing in nearby MIDC cement units offers immediate zero-landfill route.'
  },
  {
    keywords: ['dye', 'textile sludge', 'pigment'],
    pathways: [
      { use: 'Colorant and fluxing raw material in structural ceramics and terracotta tiles', industrySector: 'Ceramics & Construction', confidence: 0.89 },
      { use: 'Alumina-silica component in composite cement production', industrySector: 'Cement & Building Materials', confidence: 0.82 },
      { use: 'Inert filler for bitumen / asphalt paver blocks', industrySector: 'Infrastructure & Roadways', confidence: 0.74 }
    ],
    notes: 'Metal-bearing textile dyeing sludge can be safely encapsulated into fired ceramic matrix or vitrified in cement kilns per MPCB guidelines.'
  },
  {
    keywords: ['sand', 'foundry', 'silica'],
    pathways: [
      { use: 'Sub-base aggregate and embankment fill for highway construction', industrySector: 'Infrastructure & Roadways', confidence: 0.95 },
      { use: 'Fine aggregate replacement in ready-mix concrete (RMC) and mortar', industrySector: 'Construction & Aggregates', confidence: 0.89 },
      { use: 'High-durability interlocking concrete paver blocks', industrySector: 'Building Materials', confidence: 0.84 }
    ],
    notes: 'Spent foundry sand meets IRC standards for road sub-base when residual binder content is <1%. Tremendous demand along Maharashtra Samruddhi / industrial freight corridors.'
  },
  {
    keywords: ['ash', 'fly ash', 'boiler ash', 'bottom ash'],
    pathways: [
      { use: 'Pozzolanic additive in Portland Pozzolana Cement (PPC)', industrySector: 'Cement & Building Materials', confidence: 0.96 },
      { use: 'Autoclaved Aerated Concrete (AAC) blocks and fly ash bricks', industrySector: 'Construction & Aggregates', confidence: 0.92 },
      { use: 'Geo-polymer concrete structural precast elements', industrySector: 'Civil Engineering', confidence: 0.79 }
    ],
    notes: 'Mandatory 100% ash utilization policy under MoEFCC guidelines. Boisar and Tarapur clusters have strong logistics links to coastal cement terminals.'
  },
  {
    keywords: ['scrap', 'swarf', 'steel', 'metal', 'chips'],
    pathways: [
      { use: 'Induction furnace charge for secondary steel re-rolling', industrySector: 'Secondary Metallurgy', confidence: 0.97 },
      { use: 'Foundry charge for cast iron ductile casting components', industrySector: 'Foundry & Metallurgy', confidence: 0.91 },
      { use: 'Iron oxide raw material for pigment synthesis', industrySector: 'Chemicals', confidence: 0.68 }
    ],
    notes: 'Clean steel swarf from Chakan / Talegaon machining units has high yield (>92%) in induction re-melting. Segregation of cutting fluids recommended.'
  },
  {
    keywords: ['heat', 'steam', 'exhaust', 'flue gas'],
    pathways: [
      { use: 'Waste heat recovery for process steam pre-heating in adjacent chemical units', industrySector: 'Chemicals', confidence: 0.94 },
      { use: 'Thermal energy input for drying ovens and paint spray booths', industrySector: 'Automotive & Surface Coating', confidence: 0.86 },
      { use: 'Organic Rankine Cycle (ORC) captive low-temperature power generation', industrySector: 'Power & Energy', confidence: 0.80 }
    ],
    notes: 'Low-grade surplus thermal energy (<180°C) is ideal for cross-fence heat-pipe exchange between petrochemical units in Patalganga MIDC.'
  },
  {
    keywords: ['pulp', 'fruit', 'food', 'fish', 'seafood'],
    pathways: [
      { use: 'High-yield anaerobic biomethanation for compressed biogas (CBG)', industrySector: 'Renewable Energy', confidence: 0.94 },
      { use: 'High-protein aquatic feed and organic peptide fertilizers', industrySector: 'Animal Nutrition', confidence: 0.87 },
      { use: 'Pectin and natural antioxidant dietary fiber extraction', industrySector: 'Nutraceuticals', confidence: 0.78 }
    ],
    notes: 'Taloja and Konkan food processors generate high-BOD organic streams that displace commercial LPG/PNG when fed into local CBG units.'
  },
  {
    keywords: ['plastic', 'rubber', 'offcut', 'polymer', 'trimming'],
    pathways: [
      { use: 'Mechanical recycling into compounded engineering polymer pellets', industrySector: 'Plastics & Polymers', confidence: 0.93 },
      { use: 'Crumb rubber modifier for heavy-traffic asphalt bitumen', industrySector: 'Infrastructure & Roadways', confidence: 0.87 },
      { use: 'High-calorific alternative fuel RDF pellets for industrial boilers', industrySector: 'Power & Energy', confidence: 0.81 }
    ],
    notes: 'Clean production offcuts from Aurangabad-Waluj auto ancillary hub can enter closed-loop remanufacturing without secondary washing.'
  },
  {
    keywords: ['liquor', 'mother liquor', 'filtrate', 'pharma waste'],
    pathways: [
      { use: 'Specialized vacuum distillation and fractional solvent reclamation', industrySector: 'Solvent Recovery Services', confidence: 0.93 },
      { use: 'Catalytic recovery of precious metals and active pharmaceutical intermediates', industrySector: 'Speciality Chemicals', confidence: 0.85 },
      { use: 'Incineration with waste heat recovery in authorized common TSDF', industrySector: 'Environmental Infrastructure', confidence: 0.79 }
    ],
    notes: 'Regulated under CPCB Guidelines for Environmentally Sound Management of Spent Solvents. Authorized recyclers in Aurangabad/Taloja operate dedicated recovery columns.'
  },
  {
    keywords: ['bagasse', 'husk', 'agro', 'straw', 'biomass'],
    pathways: [
      { use: 'Direct combustion feedstock for industrial co-generation boilers', industrySector: 'Power & Energy', confidence: 0.95 },
      { use: 'Unbleached kraft paper pulp and molded biodegradable tableware', industrySector: 'Packaging & Pulp', confidence: 0.88 },
      { use: 'Torrefied biomass pellets for thermal power station co-firing', industrySector: 'Renewable Energy', confidence: 0.83 }
    ],
    notes: 'Nashik agricultural belt produces consistent seasonal biomass with high calorific value (~3,600 kcal/kg) and negligible sulfur content.'
  },
  {
    keywords: ['cardboard', 'packaging', 'corrugated', 'carton'],
    pathways: [
      { use: 'Repulping for recycled testliner and fluting medium packaging paper', industrySector: 'Paper & Packaging', confidence: 0.96 },
      { use: 'Molded fiber protective packaging for electronics and FMCG', industrySector: 'Packaging Manufacturing', confidence: 0.89 },
      { use: 'Cellulose insulation material and industrial absorbent', industrySector: 'Building Materials', confidence: 0.74 }
    ],
    notes: 'High recycling yield (>85%) with established collection corridors across Taloja and Thane industrial estates.'
  }
];

// Helper to query Gemini API if key is available
async function callGemini(promptText, isJson = false) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;

  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: promptText }] }],
        generationConfig: isJson ? { responseMimeType: 'application/json' } : {}
      })
    });

    if (!response.ok) {
      console.warn(`Gemini API returned status ${response.status}: ${await response.text()}`);
      return null;
    }

    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || null;
  } catch (err) {
    console.warn(`Gemini API call failed: ${err.message}`);
    return null;
  }
}

// Helper to query Claude API if key is available
async function callClaude(promptText, isJson = false) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return null;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        model: 'claude-3-haiku-20240307',
        max_tokens: 1000,
        messages: [{ role: 'user', content: promptText }]
      })
    });

    if (!response.ok) {
      console.warn(`Claude API returned status ${response.status}: ${await response.text()}`);
      return null;
    }

    const data = await response.json();
    return data.content?.[0]?.text || null;
  } catch (err) {
    console.warn(`Claude API call failed: ${err.message}`);
    return null;
  }
}

/**
 * 1. AI Valorization Endpoint Handler
 * Suggests industrial pathways and target sectors for an input material.
 */
export async function valorizeMaterial({ materialName = '', quantity = 0, unit = 'tons', qualityNotes = '' }) {
  const prompt = `You are an expert industrial symbiosis and circular economy engineer analyzing industrial byproducts and wastes in Maharashtra, India.
Given the following resource:
- Material: ${materialName}
- Quantity: ${quantity} ${unit}
- Quality Notes: ${qualityNotes}

Return a STRICT JSON object with the following schema:
{
  "possiblePathways": [
    { "use": "String description of valorized application", "industrySector": "Target industry sector", "confidence": 0.85 }
  ],
  "notes": "Technical and regulatory considerations (e.g. MPCB/CPCB compliance, pre-treatment)"
}
Provide exactly 2 to 4 high-value pathways, prioritizing cross-sector circular matches (e.g. spent solvent -> cement co-processing, foundry sand -> road aggregate, waste heat -> process drying).`;

  // Try LLM first
  const llmResponse = (await callGemini(prompt, true)) || (await callClaude(prompt, true));
  if (llmResponse) {
    try {
      const parsed = JSON.parse(llmResponse);
      if (parsed.possiblePathways && parsed.notes) {
        return parsed;
      }
    } catch (e) {
      console.warn('Failed to parse LLM JSON valorize response, falling back to heuristics');
    }
  }

  // Fallback domain heuristic
  const query = `${materialName} ${qualityNotes}`.toLowerCase();
  const matchedEntry = VALORIZATION_KNOWLEDGE_BASE.find(entry =>
    entry.keywords.some(kw => query.includes(kw))
  );

  if (matchedEntry) {
    return {
      possiblePathways: matchedEntry.pathways,
      notes: `${matchedEntry.notes} (Estimated for ${quantity} ${unit} production in Maharashtra MIDC cluster)`
    };
  }

  // Generic fallback
  return {
    possiblePathways: [
      { use: 'Secondary recycling and compounding raw material', industrySector: 'Recycling & Processing', confidence: 0.82 },
      { use: 'Co-processing or thermal substitution in regional heavy industry', industrySector: 'Cement & Energy', confidence: 0.74 },
      { use: 'Inert filler substitute in civil construction aggregates', industrySector: 'Construction Materials', confidence: 0.65 }
    ],
    notes: `Pre-treatment characterization and Maharashtra Pollution Control Board (MPCB) manifest tracking recommended for ${materialName}.`
  };
}

/**
 * 2. AI Match Explanation Handler
 * Explains why two industrial entities are a great symbiotic pairing.
 */
export async function generateMatchExplanation({
  resource,
  requirement,
  score,
  breakdown = {},
  distanceKm = 0,
  isCrossSector = false,
  requiresRegulatoryCheck = false
}) {
  const resName = resource.material?.name || 'Byproduct';
  const compA = resource.company?.name || 'Producer';
  const compB = requirement.company?.name || 'Consumer';
  const sectorA = resource.company?.industry?.sector || 'Manufacturing';
  const sectorB = requirement.company?.industry?.sector || 'Heavy Industry';
  const clusterA = resource.company?.location?.midcCluster || 'Maharashtra';
  const clusterB = requirement.company?.location?.midcCluster || 'Maharashtra';

  const prompt = `You are an industrial symbiosis analyst in Maharashtra, India.
Explain the symbiotic match between:
- Resource: ${resName} from ${compA} (${sectorA}, located in ${clusterA})
- Requirement: Raw material input for ${compB} (${sectorB}, located in ${clusterB})
- Distance: ${distanceKm} km
- Match Score: ${score}/100 (Compatibility: ${breakdown.compatibility || 0.8}, Distance: ${breakdown.distance || 0.8}, Quantity: ${breakdown.quantity || 0.8})
- Is Cross-Sector Match: ${isCrossSector ? 'YES (hidden connection)' : 'NO (direct trade)'}
- Regulatory Check Needed: ${requiresRegulatoryCheck ? 'YES (Hazardous waste under MPCB HWM rules)' : 'NO'}

Generate a crisp 2-3 sentence plain-English rationale highlighting why this symbiotic exchange is technically viable, economically advantageous, and environmentally impactful. Mention regulatory requirement if flagged.`;

  const llmResponse = (await callGemini(prompt, false)) || (await callClaude(prompt, false));
  if (llmResponse && llmResponse.trim().length > 30) {
    return llmResponse.trim();
  }

  // Deterministic high-quality explanations
  let explanation = '';
  if (isCrossSector) {
    explanation = `${compA} (${sectorA}) produces ${resName} that directly substitutes virgin fossil or mineral feedstock for ${compB} (${sectorB}), creating a high-impact circular loop across sectors. With only ${distanceKm} km transit between ${clusterA} and ${clusterB}, logistics costs remain well below raw material savings. `;
  } else {
    explanation = `Direct industrial pairing between ${compA} and ${compB} satisfies reciprocal supply-demand specifications for ${resName} with an exceptional ${score}/100 symbiosis score. Operating within ${distanceKm} km enables synchronized batch logistics and minimized carbon footprint. `;
  }

  if (requiresRegulatoryCheck) {
    explanation += `Regulatory note: As ${resName} is subject to MPCB Hazardous Waste Management Rules, inter-facility transfer requires Form 10 manifests and authorized vehicle tracking.`;
  } else {
    explanation += `This diversion eliminates landfill tipping fees and substantially reduces Scope 3 supply chain emissions.`;
  }

  return explanation;
}
