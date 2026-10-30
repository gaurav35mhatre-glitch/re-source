import dotenv from 'dotenv';
dotenv.config();

import { connectDB, closeDB } from '../config/db.js';
import Industry from '../models/Industry.js';
import Material from '../models/Material.js';
import Company from '../models/Company.js';
import Resource from '../models/Resource.js';
import Requirement from '../models/Requirement.js';
import Match from '../models/Match.js';
import Regulation from '../models/Regulation.js';
import { recomputeMatches } from '../services/matchingEngine.js';

export async function seedDatabase() {
  console.log('--- Starting SYMBIO Database Seeding ---');

  // Clear existing collections
  await Match.deleteMany({});
  await Resource.deleteMany({});
  await Requirement.deleteMany({});
  await Company.deleteMany({});
  await Material.deleteMany({});
  await Industry.deleteMany({});
  await Regulation.deleteMany({});

  console.log('Cleared existing records.');

  // 1. Seed Regulations (MPCB / CPCB Maharashtra compliance frameworks)
  const regulations = await Regulation.create([
    {
      materialCategory: 'hazardous',
      hwmScheduleRef: 'HWM Schedule I, Item 20 (Spent Solvents & Organic Residues)',
      requiresAuthorization: true,
      applicableStates: ['Maharashtra'],
      notes: 'Requires Form 10 manifest and transit tracking through MPCB-registered tankers for cement co-processing or distillation.'
    },
    {
      materialCategory: 'hazardous_sludge',
      hwmScheduleRef: 'HWM Schedule I, Item 35.3 (ETP Sludge from chemical/pharma units)',
      requiresAuthorization: true,
      applicableStates: ['Maharashtra'],
      notes: 'Transfer restricted to authorized Common Hazardous Waste Treatment, Storage and Disposal Facility (CHWTSDF) or MPCB-certified co-processing plants.'
    },
    {
      materialCategory: 'dye_sludge',
      hwmScheduleRef: 'HWM Schedule I, Item 36.2 (Textile & Dyeing Effluent Sludge)',
      requiresAuthorization: true,
      applicableStates: ['Maharashtra'],
      notes: 'Metal-bearing dye sludge permissible in ceramic tile manufacturing and cement kilns with immobilization verification.'
    },
    {
      materialCategory: 'byproduct',
      hwmScheduleRef: 'CPCB Guidelines on Spent Foundry Sand and Ash Utilization',
      requiresAuthorization: false,
      applicableStates: ['Maharashtra', 'Gujarat', 'Goa'],
      notes: 'Permitted for highway sub-base and structural fill without toxic leaching per IRC:SP:121 standard.'
    }
  ]);
  console.log(`Seeded ${regulations.length} environmental regulations.`);

  // 2. Seed Industries
  const industriesData = [
    { name: 'Automotive & Ancillaries', sector: 'Automotive', nicCode: '2910', description: 'OEMs and Tier-1/Tier-2 automotive component casting and forging' },
    { name: 'Speciality Chemicals', sector: 'Chemicals', nicCode: '2011', description: 'Synthesis of fine chemicals, reagents, active compounds and resins' },
    { name: 'Pharmaceuticals & APIs', sector: 'Pharmaceuticals', nicCode: '2100', description: 'Formulations, bulk drug active pharmaceutical intermediates and biotech' },
    { name: 'Textile Processing & Dyeing', sector: 'Textiles', nicCode: '1313', description: 'Yarn dying, fabric printing, mercerizing and finishing' },
    { name: 'Food & Seafood Processing', sector: 'Food Processing', nicCode: '1020', description: 'Cold storage, fruit concentrates, marine export and seafood canning' },
    { name: 'Foundry & Heavy Metallurgy', sector: 'Foundry & Metallurgy', nicCode: '2431', description: 'Sand casting, ductile iron, steel forging and re-rolling' },
    { name: 'Petrochemicals & Gas Refineries', sector: 'Petrochemicals', nicCode: '1920', description: 'Cracking, hydrocarbon separation, synthetic gases and base oils' },
    { name: 'Agro-Processing & Milling', sector: 'Agro-Processing', nicCode: '1061', description: 'Grain milling, sugarcane bagasse, crop husk and bio-composites' },
    { name: 'FMCG Packaging & Corrugated', sector: 'FMCG & Packaging', nicCode: '1702', description: 'Carton printing, corrugated boxes, flexible plastic film laminates' },
    { name: 'Cement & Building Materials', sector: 'Cement & Building Materials', nicCode: '2394', description: 'Portland cement kilns, ready-mix concrete, clinker co-processing' },
    { name: 'Road Infrastructure & Civil Works', sector: 'Construction & Aggregates', nicCode: '4210', description: 'Highway construction, road embankments, asphalt batching' },
    { name: 'Renewable Power & Biomass Energy', sector: 'Power & Energy', nicCode: '3510', description: 'Biomass co-generation power plants, waste-to-energy and district heating' },
    { name: 'Solvent Recovery & Circular Distillation', sector: 'Solvent Recovery', nicCode: '3821', description: 'Fractional distillation, solvent purification and secondary refining' }
  ];

  const industryDocs = await Industry.create(industriesData);
  const indMap = {};
  industryDocs.forEach(ind => { 
    indMap[ind.sector] = ind; 
    indMap[ind.name] = ind; 
  });
  console.log(`Seeded ${industryDocs.length} industries.`);

  // 3. Seed Materials
  const materialsData = [
    {
      name: 'Steel Scrap / Swarf',
      category: 'non_hazardous',
      defaultUnit: 'tons/month',
      compatibleCategories: ['Secondary Metallurgy', 'Foundry Charge', 'Induction Melting'],
      hazardClass: 'None'
    },
    {
      name: 'Spent Industrial Solvent',
      category: 'hazardous',
      defaultUnit: 'tons/month',
      compatibleCategories: ['Alternative Fuel Cement', 'Solvent Recovery', 'Fuel Blend'],
      hazardClass: 'Class 3 Flammable Liquid'
    },
    {
      name: 'ETP Sludge (Organic)',
      category: 'hazardous',
      defaultUnit: 'tons/month',
      compatibleCategories: ['Biogas Feedstock', 'TSDF Co-Digestion', 'Compost'],
      hazardClass: 'Class 9 Miscellaneous Environmental'
    },
    {
      name: 'Dye-Bath Sludge (Metal-Bearing)',
      category: 'hazardous',
      defaultUnit: 'tons/month',
      compatibleCategories: ['Ceramics Raw Mix', 'Cement Clay Substitute', 'Paver Blocks'],
      hazardClass: 'Class 8 Corrosive & Heavy Metals'
    },
    {
      name: 'Fruit Pulp & Fish Organic Waste',
      category: 'byproduct',
      defaultUnit: 'tons/month',
      compatibleCategories: ['Biogas Feedstock', 'Animal Feed', 'Organic Fertilizer'],
      hazardClass: 'None'
    },
    {
      name: 'Spent Foundry Sand',
      category: 'byproduct',
      defaultUnit: 'tons/month',
      compatibleCategories: ['Road Construction Aggregate', 'Concrete Sand', 'Asphalt Filler'],
      hazardClass: 'None'
    },
    {
      name: 'Fly / Boiler Ash',
      category: 'byproduct',
      defaultUnit: 'tons/month',
      compatibleCategories: ['Cement Additive', 'Pozzolana Concrete', 'AAC Blocks'],
      hazardClass: 'None'
    },
    {
      name: 'Bagasse & Crop Husk Biomass',
      category: 'byproduct',
      defaultUnit: 'tons/month',
      compatibleCategories: ['Biomass Boiler Fuel', 'Thermal Power Fuel', 'Biochar'],
      hazardClass: 'None'
    },
    {
      name: 'Plastic & Rubber Offcuts',
      category: 'byproduct',
      defaultUnit: 'tons/month',
      compatibleCategories: ['Polymer Reprocessing', 'Recycled Pellets', 'Rubber Crumb'],
      hazardClass: 'None'
    },
    {
      name: 'Mother Liquor Waste',
      category: 'hazardous',
      defaultUnit: 'tons/month',
      compatibleCategories: ['Solvent Recovery Unit', 'Distillation Feedstock', 'Incineration Heat'],
      hazardClass: 'Class 3 / Class 6.1 Toxic'
    },
    {
      name: 'Cardboard & Polymer Packaging Waste',
      category: 'non_hazardous',
      defaultUnit: 'tons/month',
      compatibleCategories: ['Recycled Kraft Pulp', 'Paper Mill Input', 'Plastic Granules'],
      hazardClass: 'None'
    },
    {
      name: 'Surplus Low-Grade Waste Heat',
      category: 'byproduct',
      defaultUnit: 'MWth-equivalent',
      compatibleCategories: ['Process Steam Preheat', 'Industrial Drying Ovens', 'Boiler Feed'],
      hazardClass: 'None'
    }
  ];

  const materialDocs = await Material.create(materialsData);
  const matMap = {};
  materialDocs.forEach(m => { matMap[m.name] = m; });
  console.log(`Seeded ${materialDocs.length} materials.`);

  // 4. Seed 12 Core Maharashtra Companies (plus 4 complementary recycling/infra anchor plants for rich cross-sector matches)
  const companiesData = [
    {
      name: 'Chakan AutoForge',
      industry: indMap['Automotive']._id,
      location: {
        lat: 18.7610,
        lng: 73.8625,
        address: 'Plot A-14, Phase II, Chakan MIDC, Pune - 410501',
        midcCluster: 'Chakan MIDC'
      },
      verified: true,
      authorizedForHazardous: true,
      contactEmail: 'sustainability@chakanautoforge.in'
    },
    {
      name: 'Konkan Speciality Chemicals',
      industry: indMap['Chemicals']._id,
      location: {
        lat: 19.0820,
        lng: 73.1410,
        address: 'Chemical Zone, Sector 4, Taloja MIDC, Raigad - 410208',
        midcCluster: 'Taloja MIDC'
      },
      verified: true,
      authorizedForHazardous: true,
      contactEmail: 'circularity@konkanchem.co.in'
    },
    {
      name: 'Sahyadri Pharma Formulations',
      industry: indMap['Pharmaceuticals']._id,
      location: {
        lat: 19.0915,
        lng: 73.1380,
        address: 'Pharma Park, Plot 28, Taloja MIDC, Navi Mumbai - 410208',
        midcCluster: 'Taloja MIDC'
      },
      verified: true,
      authorizedForHazardous: true,
      contactEmail: 'env@sahyadripharma.com'
    },
    {
      name: 'Panvel Textile Dyeing Works',
      industry: indMap['Textiles']._id,
      location: {
        lat: 18.9835,
        lng: 73.1020,
        address: 'Textile Estate, Patalganga MIDC, Khalapur - 410220',
        midcCluster: 'Patalganga MIDC'
      },
      verified: true,
      authorizedForHazardous: true,
      contactEmail: 'operations@panveltextiles.com'
    },
    {
      name: 'Konkan Fresh Foods',
      industry: indMap['Food Processing']._id,
      location: {
        lat: 19.0760,
        lng: 73.1480,
        address: 'Food Mega Park, Taloja MIDC, Navi Mumbai - 410208',
        midcCluster: 'Taloja MIDC'
      },
      verified: true,
      authorizedForHazardous: false,
      contactEmail: 'sourcing@konkanfresh.in'
    },
    {
      name: 'Raigad Foundry Works',
      industry: indMap['Foundry & Metallurgy']._id,
      location: {
        lat: 18.9780,
        lng: 73.1110,
        address: 'Heavy Industrial Block, Patalganga MIDC - 410220',
        midcCluster: 'Patalganga MIDC'
      },
      verified: true,
      authorizedForHazardous: true,
      contactEmail: 'plant@raigadfoundry.in'
    },
    {
      name: 'Tarapur PetroChem',
      industry: indMap['Petrochemicals']._id,
      location: {
        lat: 19.8050,
        lng: 72.7630,
        address: 'Refinery Road, Boisar / Tarapur MIDC, Palghar - 401506',
        midcCluster: 'Tarapur MIDC'
      },
      verified: true,
      authorizedForHazardous: true,
      contactEmail: 'byproducts@tarapurpetro.com'
    },
    {
      name: 'Nashik AgroProcessors',
      industry: indMap['Agro-Processing']._id,
      location: {
        lat: 20.0040,
        lng: 73.7810,
        address: 'Ambad / Satpur MIDC Industrial Area, Nashik - 422007',
        midcCluster: 'Nashik MIDC'
      },
      verified: true,
      authorizedForHazardous: false,
      contactEmail: 'supply@nashikagro.in'
    },
    {
      name: 'Waluj Auto Components',
      industry: indMap['Automotive']._id,
      location: {
        lat: 19.8620,
        lng: 75.2830,
        address: 'Sector K, Waluj MIDC, Chhatrapati Sambhajinagar - 431136',
        midcCluster: 'Waluj MIDC'
      },
      verified: true,
      authorizedForHazardous: true,
      contactEmail: 'materials@walujauto.com'
    },
    {
      name: 'Shendra Bulk Drugs',
      industry: indMap['Pharmaceuticals']._id,
      location: {
        lat: 19.8710,
        lng: 75.2950,
        address: 'AURIC Smart City, Shendra MIDC, Chhatrapati Sambhajinagar - 431154',
        midcCluster: 'Shendra MIDC'
      },
      verified: true,
      authorizedForHazardous: true,
      contactEmail: 'safety@shendradrugs.com'
    },
    {
      name: 'Taloja Packaging FMCG',
      industry: indMap['FMCG & Packaging']._id,
      location: {
        lat: 19.0880,
        lng: 73.1350,
        address: 'Packaging Zone, Plot 52, Taloja MIDC - 410208',
        midcCluster: 'Taloja MIDC'
      },
      verified: true,
      authorizedForHazardous: false,
      contactEmail: 'circular@talojapackaging.com'
    },
    {
      name: 'Patalganga PetroGas',
      industry: indMap['Petrochemicals']._id,
      location: {
        lat: 18.9810,
        lng: 73.0980,
        address: 'Gas Cracker Complex, Patalganga MIDC - 410220',
        midcCluster: 'Patalganga MIDC'
      },
      verified: true,
      authorizedForHazardous: true,
      contactEmail: 'energy@patalgangagas.com'
    },

    // Complementary Reciprocal/Valorization Anchor Facilities across the same MIDC zones
    {
      name: 'MahaCement Co-Processing Works',
      industry: indMap['Cement & Building Materials']._id,
      location: {
        lat: 18.9910,
        lng: 73.1250,
        address: 'Clinker & Co-Processing Division, Patalganga - 410220',
        midcCluster: 'Patalganga MIDC'
      },
      verified: true,
      authorizedForHazardous: true,
      contactEmail: 'coprocessing@mahacement.com'
    },
    {
      name: 'Navi Mumbai Environmental TSDF & Biogas',
      industry: indMap['Renewable Power & Biomass Energy']._id,
      location: {
        lat: 19.0860,
        lng: 73.1490,
        address: 'Common Environmental Park, Taloja MIDC - 410208',
        midcCluster: 'Taloja MIDC'
      },
      verified: true,
      authorizedForHazardous: true,
      contactEmail: 'operations@nmtsdf.org'
    },
    {
      name: 'Maharashtra State Highway Infrastructure',
      industry: indMap['Road Infrastructure & Civil Works']._id,
      location: {
        lat: 18.9750,
        lng: 73.1080,
        address: 'Freight Corridor Project Base, Patalganga - 410220',
        midcCluster: 'Patalganga MIDC'
      },
      verified: true,
      authorizedForHazardous: false,
      contactEmail: 'procurement@mshighwayinfra.gov.in'
    },
    {
      name: 'Marathwada Polymer Recyclers',
      industry: indMap['Automotive']._id,
      location: {
        lat: 19.8650,
        lng: 75.2780,
        address: 'Plastics Park, Waluj MIDC, Aurangabad - 431136',
        midcCluster: 'Waluj MIDC'
      },
      verified: true,
      authorizedForHazardous: true,
      contactEmail: 'recycle@marathwadapolymer.in'
    },
    {
      name: 'Aurangabad Circular Solvents & Distillates',
      industry: indMap['Solvent Recovery']._id,
      location: {
        lat: 19.8690,
        lng: 75.2910,
        address: 'Chemical Reclamation Cell, Shendra MIDC - 431154',
        midcCluster: 'Shendra MIDC'
      },
      verified: true,
      authorizedForHazardous: true,
      contactEmail: 'recovery@shendrasolvents.in'
    },
    {
      name: 'Sahyadri Green BioPower Co-Gen',
      industry: indMap['Renewable Power & Biomass Energy']._id,
      location: {
        lat: 20.0090,
        lng: 73.7740,
        address: 'Renewable Energy Hub, Satpur MIDC, Nashik - 422007',
        midcCluster: 'Nashik MIDC'
      },
      verified: true,
      authorizedForHazardous: false,
      contactEmail: 'power@sahyadribiopower.com'
    }
  ];

  const companyDocs = await Company.create(companiesData);
  const compMap = {};
  companyDocs.forEach(c => { compMap[c.name] = c; });
  console.log(`Seeded ${companyDocs.length} companies across MIDC clusters.`);

  // 5. Seed Resources (Outputs / Byproducts from the 12 companies)
  const resourcesData = [
    // 1. Chakan AutoForge: steel scrap/swarf [obvious]
    {
      company: compMap['Chakan AutoForge']._id,
      material: matMap['Steel Scrap / Swarf']._id,
      type: 'byproduct',
      quantity: 95,
      unit: 'tons',
      frequency: 'weekly',
      qualitySpec: 'High-grade EN9/EN19 carbon steel swarf, low residual oil <1.5%, non-contaminated',
      aiSuggestedUses: ['Induction melting charge', 'Steel re-rolling billets', 'Cast iron foundry feed'],
      status: 'active'
    },
    // 2. Konkan Speciality Chemicals: spent solvent [hidden cross-sector -> cement kiln fuel]
    {
      company: compMap['Konkan Speciality Chemicals']._id,
      material: matMap['Spent Industrial Solvent']._id,
      type: 'waste',
      quantity: 48,
      unit: 'tons',
      frequency: 'monthly',
      qualitySpec: 'Mixed toluene, acetone and ethyl acetate, calorific value ~7,200 kcal/kg, moisture <3%',
      aiSuggestedUses: ['Alternative fuel co-processing in cement kilns', 'Fractional distillation recovery'],
      status: 'active'
    },
    // 3. Sahyadri Pharma Formulations: ETP sludge (organic) [regulated -> TSDF / biogas]
    {
      company: compMap['Sahyadri Pharma Formulations']._id,
      material: matMap['ETP Sludge (Organic)']._id,
      type: 'waste',
      quantity: 36,
      unit: 'tons',
      frequency: 'weekly',
      qualitySpec: 'Biological secondary activated sludge, volatile solids >65%, heavy metals below CPCB Schedule II',
      aiSuggestedUses: ['Biogas co-digestion', 'Common TSDF secured composting', 'Bio-methanation fuel'],
      status: 'active'
    },
    // 4. Panvel Textile Dyeing Works: dye-bath sludge [hidden cross-sector -> cement / ceramics]
    {
      company: compMap['Panvel Textile Dyeing Works']._id,
      material: matMap['Dye-Bath Sludge (Metal-Bearing)']._id,
      type: 'waste',
      quantity: 52,
      unit: 'tons',
      frequency: 'monthly',
      qualitySpec: 'Chemically coagulated iron/alum sludge, dry solids 42%, mineral oxide content 68%',
      aiSuggestedUses: ['Colorant raw material in structural ceramics', 'Portland cement clay substitute', 'Paver block filler'],
      status: 'active'
    },
    // 5. Konkan Fresh Foods: fruit pulp, fish waste [obvious -> biogas / animal feed]
    {
      company: compMap['Konkan Fresh Foods']._id,
      material: matMap['Fruit Pulp & Fish Organic Waste']._id,
      type: 'byproduct',
      quantity: 65,
      unit: 'tons',
      frequency: 'daily',
      qualitySpec: 'Mango/citrus pulp and marine processing discards, protein content 24%, biodegradable fraction >90%',
      aiSuggestedUses: ['Commercial anaerobic biogas generation', 'High-protein aquatic fishmeal feed', 'Organic bio-fertilizer'],
      status: 'active'
    },
    // 6. Raigad Foundry Works: spent foundry sand [hidden cross-sector -> road aggregate]
    {
      company: compMap['Raigad Foundry Works']._id,
      material: matMap['Spent Foundry Sand']._id,
      type: 'byproduct',
      quantity: 140,
      unit: 'tons',
      frequency: 'weekly',
      qualitySpec: 'Clean silica core sand, loss on ignition <1.2%, non-hazardous IRC:SP:121 certified',
      aiSuggestedUses: ['Road embankment sub-base aggregate', 'Ready-mix concrete fine aggregate substitute', 'Asphalt bituminous filler'],
      status: 'active'
    },
    // 7. Tarapur PetroChem: fly/boiler ash [obvious -> cement]
    {
      company: compMap['Tarapur PetroChem']._id,
      material: matMap['Fly / Boiler Ash']._id,
      type: 'byproduct',
      quantity: 180,
      unit: 'tons',
      frequency: 'monthly',
      qualitySpec: 'Class F fly ash, reactive silica >58%, carbon unburnt <2%, fine particle size <45 micron',
      aiSuggestedUses: ['Pozzolanic additive for PPC cement', 'AAC lightweight concrete blocks', 'Precast road pavers'],
      status: 'active'
    },
    // 8. Nashik AgroProcessors: bagasse/crop husk [obvious -> biomass power]
    {
      company: compMap['Nashik AgroProcessors']._id,
      material: matMap['Bagasse & Crop Husk Biomass']._id,
      type: 'byproduct',
      quantity: 160,
      unit: 'tons',
      frequency: 'monthly',
      qualitySpec: 'Dry bagasse & paddy husk shreds, gross calorific value 3,800 kcal/kg, ash content <8%',
      aiSuggestedUses: ['Industrial biomass boiler co-firing', 'Thermal power fuel briquettes', 'Unbleached kraft paper pulp'],
      status: 'active'
    },
    // 9. Waluj Auto Components: plastic/rubber offcuts [obvious -> recycled pellets]
    {
      company: compMap['Waluj Auto Components']._id,
      material: matMap['Plastic & Rubber Offcuts']._id,
      type: 'byproduct',
      quantity: 34,
      unit: 'tons',
      frequency: 'weekly',
      qualitySpec: 'Clean automotive polypropylene (PP) trims and EPDM rubber extrusions, zero metal inclusions',
      aiSuggestedUses: ['Engineering compounded polymer pellets', 'Crumb rubber modified bitumen for highways', 'Injection molding feed'],
      status: 'active'
    },
    // 10. Shendra Bulk Drugs: mother liquor waste [regulated -> solvent recovery]
    {
      company: compMap['Shendra Bulk Drugs']._id,
      material: matMap['Mother Liquor Waste']._id,
      type: 'waste',
      quantity: 42,
      unit: 'tons',
      frequency: 'monthly',
      qualitySpec: 'Concentrated IPA and methanol crystallization mother liquor, volatile content 78%',
      aiSuggestedUses: ['Fractional vacuum solvent distillation recovery', 'Authorized high-efficiency thermal incineration', 'Intermediate re-extraction'],
      status: 'active'
    },
    // 11. Taloja Packaging FMCG: cardboard/plastic waste [obvious -> recycler/paper mill]
    {
      company: compMap['Taloja Packaging FMCG']._id,
      material: matMap['Cardboard & Polymer Packaging Waste']._id,
      type: 'byproduct',
      quantity: 55,
      unit: 'tons',
      frequency: 'weekly',
      qualitySpec: 'Baled corrugated cardboard trims and clean LDPE stretch films, virgin kraft fiber base',
      aiSuggestedUses: ['Recycled kraft paper and testliner fluting', 'Molded fiber protective packaging', 'Reprocessed plastic granules'],
      status: 'active'
    },
    // 12. Patalganga PetroGas: surplus low-grade waste heat [hidden cross-sector -> adjacent process heat]
    {
      company: compMap['Patalganga PetroGas']._id,
      material: matMap['Surplus Low-Grade Waste Heat']._id,
      type: 'surplus_capacity',
      quantity: 90,
      unit: 'tons',
      frequency: 'daily',
      qualitySpec: 'Continuous waste heat flue gas exchange, 160°C to 190°C outlet, clean non-corrosive exchanger bundle',
      aiSuggestedUses: ['Textile dyeing bath process water preheating', 'Chemical dryer air preheat', 'Organic Rankine Cycle power'],
      status: 'active'
    }
  ];

  const resourceDocs = await Resource.create(resourcesData);
  console.log(`Seeded ${resourceDocs.length} output resources from the 12 companies.`);

  // 6. Seed Requirements (Input Needs creating symbiotic cross-matches)
  const requirementsData = [
    // MahaCement: Needs spent solvent for kiln co-processing [Hidden match for Konkan Speciality Chemicals!]
    {
      company: compMap['MahaCement Co-Processing Works']._id,
      acceptableMaterials: [matMap['Spent Industrial Solvent']._id],
      quantityNeeded: 50,
      unit: 'tons',
      frequency: 'monthly',
      toleranceSpec: 'Calorific value >5,000 kcal/kg, chlorine <0.5%, PCB non-detectable',
      maxDistanceKm: 120,
      status: 'active'
    },
    // MahaCement: Needs Fly Ash and Dye Sludge as pozzolanic / mineral additives [Obvious + Hidden matches!]
    {
      company: compMap['MahaCement Co-Processing Works']._id,
      acceptableMaterials: [matMap['Fly / Boiler Ash']._id, matMap['Dye-Bath Sludge (Metal-Bearing)']._id],
      quantityNeeded: 200,
      unit: 'tons',
      frequency: 'monthly',
      toleranceSpec: 'Moisture <15%, iron/alumina suitable for clinker chemistry',
      maxDistanceKm: 250,
      status: 'active'
    },
    // Raigad Foundry: Needs steel scrap swarf [Obvious match for Chakan AutoForge!]
    {
      company: compMap['Raigad Foundry Works']._id,
      acceptableMaterials: [matMap['Steel Scrap / Swarf']._id],
      quantityNeeded: 90,
      unit: 'tons',
      frequency: 'weekly',
      toleranceSpec: 'EN series carbon steel turnings, low tramp elements',
      maxDistanceKm: 180,
      status: 'active'
    },
    // Panvel Textile Dyeing: Needs Process Heat / Steam [Hidden match for Patalganga PetroGas right next door in Patalganga!]
    {
      company: compMap['Panvel Textile Dyeing Works']._id,
      acceptableMaterials: [matMap['Surplus Low-Grade Waste Heat']._id],
      quantityNeeded: 85,
      unit: 'tons',
      frequency: 'daily',
      toleranceSpec: 'Hot water or heat transfer >120°C for dye kettle preheating',
      maxDistanceKm: 40,
      status: 'active'
    },
    // Navi Mumbai TSDF & Biogas: Needs Organic Sludge and Food Waste [Obvious + Regulated match for Sahyadri Pharma & Konkan Fresh Foods!]
    {
      company: compMap['Navi Mumbai Environmental TSDF & Biogas']._id,
      acceptableMaterials: [matMap['ETP Sludge (Organic)']._id, matMap['Fruit Pulp & Fish Organic Waste']._id],
      quantityNeeded: 95,
      unit: 'tons',
      frequency: 'weekly',
      toleranceSpec: 'High organic fraction, toxic solvent free, suitable for anaerobic digesters',
      maxDistanceKm: 75,
      status: 'active'
    },
    // Maharashtra State Highway Infrastructure: Needs Foundry Sand [Hidden cross-sector match for Raigad Foundry Works!]
    {
      company: compMap['Maharashtra State Highway Infrastructure']._id,
      acceptableMaterials: [matMap['Spent Foundry Sand']._id],
      quantityNeeded: 150,
      unit: 'tons',
      frequency: 'weekly',
      toleranceSpec: 'IRC:SP:121 compliant, non-leachable, sand equivalent >65',
      maxDistanceKm: 90,
      status: 'active'
    },
    // Sahyadri Green BioPower: Needs Bagasse & Crop Husk [Obvious match for Nashik AgroProcessors!]
    {
      company: compMap['Sahyadri Green BioPower Co-Gen']._id,
      acceptableMaterials: [matMap['Bagasse & Crop Husk Biomass']._id],
      quantityNeeded: 150,
      unit: 'tons',
      frequency: 'monthly',
      toleranceSpec: 'Moisture <20%, calorific value >3,400 kcal/kg',
      maxDistanceKm: 100,
      status: 'active'
    },
    // Marathwada Polymer Recyclers: Needs Plastic/Rubber offcuts [Obvious match for Waluj Auto Components!]
    {
      company: compMap['Marathwada Polymer Recyclers']._id,
      acceptableMaterials: [matMap['Plastic & Rubber Offcuts']._id],
      quantityNeeded: 35,
      unit: 'tons',
      frequency: 'weekly',
      toleranceSpec: 'PP/EPDM clean trims, zero wire or metal contamination',
      maxDistanceKm: 80,
      status: 'active'
    },
    // Aurangabad Circular Solvents: Needs Mother Liquor [Regulated match for Shendra Bulk Drugs in same cluster!]
    {
      company: compMap['Aurangabad Circular Solvents & Distillates']._id,
      acceptableMaterials: [matMap['Mother Liquor Waste']._id],
      quantityNeeded: 40,
      unit: 'tons',
      frequency: 'monthly',
      toleranceSpec: 'IPA/Methanol recoverable concentration >65%, low non-volatile solids',
      maxDistanceKm: 60,
      status: 'active'
    },
    // Taloja Packaging FMCG: Needs secondary raw fiber & plastic inputs
    {
      company: compMap['Taloja Packaging FMCG']._id,
      acceptableMaterials: [matMap['Cardboard & Polymer Packaging Waste']._id],
      quantityNeeded: 50,
      unit: 'tons',
      frequency: 'weekly',
      toleranceSpec: 'Baled clean OCC / Kraft box cuttings',
      maxDistanceKm: 150,
      status: 'active'
    },
    // Chakan AutoForge: Input raw materials need for secondary packaging and foundry parts
    {
      company: compMap['Chakan AutoForge']._id,
      acceptableMaterials: [matMap['Cardboard & Polymer Packaging Waste']._id],
      quantityNeeded: 30,
      unit: 'tons',
      frequency: 'weekly',
      toleranceSpec: 'Recycled protective packaging for forged automotive crankshafts',
      maxDistanceKm: 160,
      status: 'active'
    },
    // Tarapur PetroChem: Thermal heat/fuel input need
    {
      company: compMap['Tarapur PetroChem']._id,
      acceptableMaterials: [matMap['Bagasse & Crop Husk Biomass']._id, matMap['Spent Industrial Solvent']._id],
      quantityNeeded: 120,
      unit: 'tons',
      frequency: 'monthly',
      toleranceSpec: 'High calorific solid/liquid fuel for captive steam plant',
      maxDistanceKm: 220,
      status: 'active'
    }
  ];

  const requirementDocs = await Requirement.create(requirementsData);
  console.log(`Seeded ${requirementDocs.length} industrial requirements.`);

  // 7. Run Matching Engine to automatically calculate all scores and create Match documents!
  console.log('Running matching engine on newly seeded resources & requirements...');
  const matchResult = await recomputeMatches();
  console.log(`Initial matching engine pass complete: ${matchResult.createdCount} new matches created.`);

  console.log('--- SYMBIO Database Seeding Completed Successfully ---');
}

// Allow direct CLI execution: `node data/seed.js`
if (process.argv[1]?.endsWith('seed.js')) {
  (async () => {
    try {
      await connectDB();
      await seedDatabase();
      await closeDB();
      process.exit(0);
    } catch (err) {
      console.error('Error during seeding:', err);
      process.exit(1);
    }
  })();
}
