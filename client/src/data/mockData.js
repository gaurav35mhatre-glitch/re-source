/**
 * re'source — Core Prototype Dataset
 * Realistic Indian industrial context (Maharashtra MSME belt)
 * Clearly marked as illustrative prototype estimates.
 */

export const DEMO_FACILITY = {
  name: "Demo Industrial Unit — Navi Mumbai",
  location: "Plot W-42, Rabale MIDC, Navi Mumbai, Maharashtra",
  type: "Tier-2 Plastic Packaging & Moulding",
  contact: "operations@demounit-nm.in",
  coordinates: [19.1485, 73.0035]
};

export const DEFAULT_WASTE_SCENARIO = {
  wasteType: "Mixed Industrial Plastic",
  quantityKg: 500,
  frequency: "Monthly Campaign",
  condition: "Mixed + partially contaminated",
  moisture: "Medium (~6.2%)",
  contaminationLevel: "Moderate (Adhesive labels, dust, mixed polymers)",
  currentPathway: "General waste / low-value downcycling disposal",
  location: "Rabale MIDC, Navi Mumbai",
  composition: [
    { label: "PET (Polyethylene Terephthalate)", percentage: 55, color: "#10B981" },
    { label: "HDPE (High-Density Polyethylene)", percentage: 25, color: "#06B6D4" },
    { label: "Other Polymers (PP / LDPE)", percentage: 10, color: "#8B5CF6" },
    { label: "Contaminants & Foreign Residues", percentage: 10, color: "#EF4444" }
  ],
  difficulties: [
    {
      title: "Mixed Polymer Types",
      desc: "PET and HDPE have different melting temperatures (260°C vs 130°C); unseparated processing creates brittle, unusable secondary extrusions."
    },
    {
      title: "Surface Contamination",
      desc: "Residual oils and adhesive labels cause degassing and black specks during reprocessing, leading to 100% rejection at high-grade recyclers."
    },
    {
      title: "Insufficient Sorting",
      desc: "Waste is bagged indiscriminately at generation point, making manual sorting at destination cost-prohibitive for the recycler."
    },
    {
      title: "Inconsistent Physical Specification",
      desc: "Variable moisture, irregular cut sizes, and foreign matter prevent automated gravimetric feeding into extrusion equipment."
    }
  ],
  barriers: [
    { name: "Poor segregation at source", percentage: 38, color: "#EF4444" },
    { name: "Surface & adhesive contamination", percentage: 24, color: "#F97316" },
    { name: "Sub-scale quantity (too small for bulk freight)", percentage: 18, color: "#EAB308" },
    { name: "Preprocessing capacity unavailable on-site", percentage: 12, color: "#A855F7" },
    { name: "Inconsistent generation cadence", percentage: 8, color: "#3B82F6" }
  ],
  bottleneck: "SEGREGATION + PREPROCESSING",
  recommendation: "Route this material through local distributed sorting and shredding capacity before attempting long-distance transport to downstream recyclers."
};

export const PREPROCESSING_RECIPE = [
  {
    step: "01",
    id: "segregation",
    name: "SEGREGATION",
    subtitle: "Separate PET / HDPE / other plastics",
    desc: "Manual optical positive-picking alongside ballistic separation to isolate high-value rigid PET bottles and HDPE containers from flexible films.",
    equipment: "Optical positive sorting conveyor & density air-classifier",
    capacity: "2.5 tonnes/day",
    nearbyFacility: "Local Scrap Facility (Rabale — 4.2 km)",
    estimatedLoss: "4.2%",
    estimatedCost: "₹2.80 / kg",
    whyNeeded: "Melting incompatible polymers together degrades tensile strength by up to 80%."
  },
  {
    step: "02",
    id: "decontamination",
    name: "CONTAMINATION REMOVAL",
    subtitle: "Remove non-plastic material & labels",
    desc: "Mechanical rotary de-labeler strips adhesive labels, silicone tamper seals, metal staples, and sediment prior to wet processing.",
    equipment: "Dry rotary trommel screen & friction de-labeling drum",
    capacity: "3.0 tonnes/day",
    nearbyFacility: "Local Scrap Facility (Rabale — 4.2 km)",
    estimatedLoss: "3.8%",
    estimatedCost: "₹1.60 / kg",
    whyNeeded: "Glues and paper fibers char in downstream extruders, creating structural air pockets."
  },
  {
    step: "03",
    id: "washing",
    name: "WASHING",
    subtitle: "Hot wash & detergent degreasing",
    desc: "Caustic soda hot-wash (85°C) to eliminate organic residues, milk fats, and surface coatings followed by freshwater counter-current rinse.",
    equipment: "High-speed friction washer & heated caustic soak tank",
    capacity: "1.8 tonnes/day",
    nearbyFacility: "Turbhe Industrial Wash Plant (Turbhe — 6.5 km)",
    estimatedLoss: "1.5%",
    estimatedCost: "₹3.20 / kg",
    whyNeeded: "Organic residue causes microbial fermentation and foul odors in secondary materials."
  },
  {
    step: "04",
    id: "drying",
    name: "DRYING",
    subtitle: "Reduce moisture to < 1.5%",
    desc: "High-rpm centrifugal mechanical de-watering followed by multi-stage heated air pipeline drying to bring residual moisture below critical limit.",
    equipment: "Centrifugal spin dryer & thermal air cyclone",
    capacity: "2.0 tonnes/day",
    nearbyFacility: "Turbhe Industrial Wash Plant (Turbhe — 6.5 km)",
    estimatedLoss: "0.8%",
    estimatedCost: "₹1.40 / kg",
    whyNeeded: "Trapped moisture causes explosive steam bubbles and polymer chain hydrolysis during melting."
  },
  {
    step: "05",
    id: "shredding",
    name: "SHREDDING",
    subtitle: "Standardize into 8–12 mm flakes",
    desc: "Precision rotary knife granulator with replaceable screen mesh to produce uniform secondary polymer flakes ready for masterbatch blending.",
    equipment: "Water-cooled rotary knife granulator (12 mm screen)",
    capacity: "1.5 tonnes/day",
    nearbyFacility: "Small Recycling Unit (Taloja — 8.7 km)",
    estimatedLoss: "2.5%",
    estimatedCost: "₹2.20 / kg",
    whyNeeded: "Downstream compounders cannot handle irregular 3D rigid bottles in gravimetric hoppers."
  },
  {
    step: "06",
    id: "packaging",
    name: "BALING / PACKAGING",
    subtitle: "Prepare for aggregation & transport",
    desc: "Flakes are de-dusted and packaged into breathable 250 kg woven FIBC bulk bags (jumbo bags) labeled with moisture and polymer grade markers.",
    equipment: "Vertical bagging hopper & hydraulic compaction press",
    capacity: "5.0 tonnes/day",
    nearbyFacility: "Demo Aggregation Warehouse (Turbhe — 3.1 km)",
    estimatedLoss: "0.2%",
    estimatedCost: "₹0.90 / kg",
    whyNeeded: "Loose flakes cannot be transported economically in standard logistics vehicles."
  },
  {
    step: "07",
    id: "qc",
    name: "QUALITY CHECK",
    subtitle: "Record baseline physical parameters",
    desc: "Benchtop testing of bulk density (g/cm³), halogen moisture balance test, and float/sink test verification before issuing the Secondary Material Passport.",
    equipment: "Halogen moisture analyzer & digital density comparator",
    capacity: "Per batch testing (15 min)",
    nearbyFacility: "Demo Aggregation Warehouse (Turbhe — 3.1 km)",
    estimatedLoss: "0.0%",
    estimatedCost: "₹0.50 / kg",
    whyNeeded: "Industrial secondary buyers require documented specifications before accepting delivery."
  }
];

export const CAPACITY_NODES = [
  {
    id: "node-1",
    name: "Local Scrap Facility",
    cluster: "Rabale MIDC",
    distanceKm: 4.2,
    type: "sorting",
    typeColor: "#10B981", // green
    typeLabel: "Sorting Capacity",
    capabilities: ["Manual positive sorting", "Trommel de-labeling", "Baling"],
    capacityTonsPerDay: 2.0,
    availabilityPercent: 68,
    lat: 19.1620,
    lng: 73.0110,
    equipment: "Conveyor sort line, 2-stage hydraulic baler",
    rate: "₹2.80 / kg"
  },
  {
    id: "node-2",
    name: "Turbhe Industrial Wash Plant",
    cluster: "Turbhe MIDC",
    distanceKm: 6.5,
    type: "washing",
    typeColor: "#06B6D4", // blue
    typeLabel: "Washing Capacity",
    capabilities: ["Caustic hot-wash (85°C)", "Centrifugal spin drying", "Sludge dewatering"],
    capacityTonsPerDay: 1.8,
    availabilityPercent: 55,
    lat: 19.0790,
    lng: 73.0230,
    equipment: "Friction washer, continuous hot bath",
    rate: "₹3.20 / kg"
  },
  {
    id: "node-3",
    name: "Small Recycling Unit",
    cluster: "Taloja MIDC",
    distanceKm: 8.7,
    type: "shredding",
    typeColor: "#F97316", // orange
    typeLabel: "Shredding Capacity",
    capabilities: ["Knife granulation (8-12 mm)", "Rotary cutting", "Dust extraction"],
    capacityTonsPerDay: 1.5,
    availabilityPercent: 42,
    lat: 19.0850,
    lng: 73.1380,
    equipment: "High-torque twin-shaft shredder, 12mm granulator",
    rate: "₹2.20 / kg"
  },
  {
    id: "node-4",
    name: "Taloja Compaction Center",
    cluster: "Taloja MIDC",
    distanceKm: 5.3,
    type: "baling",
    typeColor: "#A855F7", // purple
    typeLabel: "Baling Capacity",
    capabilities: ["High-density vertical baling", "Wire tying", "Palletization"],
    capacityTonsPerDay: 3.5,
    availabilityPercent: 80,
    lat: 19.0910,
    lng: 73.1250,
    equipment: "60-tonne hydraulic vertical press",
    rate: "₹0.90 / kg"
  },
  {
    id: "node-5",
    name: "Demo Aggregation Warehouse",
    cluster: "Turbhe MIDC",
    distanceKm: 3.1,
    type: "storage",
    typeColor: "#EAB308", // yellow
    typeLabel: "Storage & Batching",
    capabilities: ["Dry segregated storage (12 tonnes)", "FIBC bulk loading", "Moisture testing"],
    capacityTonsPerDay: 12.0,
    availabilityPercent: 73,
    lat: 19.0980,
    lng: 73.0180,
    equipment: "Covered warehouse floor, platform scale, moisture balance",
    rate: "₹0.50 / kg / week"
  },
  {
    id: "node-6",
    name: "Demo Secondary Polymer Recycler",
    cluster: "Panvel Industrial Area",
    distanceKm: 18.0,
    type: "recycler",
    typeColor: "#64748B", // slate / dark
    typeLabel: "End-User Recycler",
    capabilities: ["Secondary compounding", "Pellet extrusion", "Auto parts moulding"],
    capacityTonsPerDay: 15.0,
    availabilityPercent: 90,
    lat: 18.9890,
    lng: 73.1180,
    equipment: "Twin-screw co-rotating extruder, underwater pelletizer",
    requirement: "Requires clean flakes, moisture <1.5%, non-chlorinated"
  }
];

export const AGGREGATION_STREAMS = [
  { id: "A", name: "Facility A — Navi Mumbai Small Packagers", quantityKg: 300, location: "Rabale MIDC", distance: "2.1 km" },
  { id: "B", name: "Facility B — Demo Industrial Unit (Our Focus)", quantityKg: 500, location: "Rabale MIDC", distance: "0 km" },
  { id: "C", name: "Facility C — Rabale Component Moulders", quantityKg: 200, location: "Ghansoli Industrial", distance: "3.8 km" },
  { id: "D", name: "Facility D — Turbhe Extrusions Pvt Ltd", quantityKg: 700, location: "Turbhe MIDC", distance: "4.5 km" }
];

export const PROCESSING_ROUTER_DATA = {
  stages: [
    {
      step: 1,
      from: "Demo Industrial Unit",
      to: "Local Scrap Facility",
      distanceKm: 2.4,
      capability: "Sorting & Contamination Removal",
      capacity: "2.0 t/day",
      timeEst: "3.5 hours",
      costEst: "₹1,400"
    },
    {
      step: 2,
      from: "Local Scrap Facility",
      to: "Turbhe Industrial Wash Plant",
      distanceKm: 5.1,
      capability: "Hot Caustic Wash & Centrifugal Dry",
      capacity: "1.8 t/day",
      timeEst: "4.0 hours",
      costEst: "₹2,300"
    },
    {
      step: 3,
      from: "Turbhe Industrial Wash Plant",
      to: "Small Recycling Unit",
      distanceKm: 3.7,
      capability: "Standardized Flake Shredding (10 mm)",
      capacity: "1.5 t/day",
      timeEst: "2.5 hours",
      costEst: "₹1,100"
    },
    {
      step: 4,
      from: "Small Recycling Unit",
      to: "Demo Aggregation Warehouse",
      distanceKm: 3.1,
      capability: "Batch Aggregation & Quality Verification",
      capacity: "12 tonnes storage",
      timeEst: "2.0 hours",
      costEst: "₹450"
    },
    {
      step: 5,
      from: "Demo Aggregation Warehouse",
      to: "Demo Secondary Polymer Recycler",
      distanceKm: 18.0,
      capability: "Bulk Freight & Secondary Compounding",
      capacity: "15 t/day industrial receiver",
      timeEst: "1.5 hours transit",
      costEst: "₹1,850"
    }
  ],
  totalJourney: {
    totalDistanceKm: 29.2,
    processingStagesCount: 3,
    estimatedProcessingLossPercent: 14,
    inputKg: 500,
    recoverableKg: 460,
    resourceReadyOutputKg: 430,
    disposalResidueKg: 70,
    conversionRatePercent: 86, // of recoverable
    overallConversionPercent: 55, // in system
    estimatedLogisticsProcessingCostINR: 7100,
    virginMaterialSubstitutedKg: 430
  }
};

export const MATERIAL_PASSPORT_DATA = {
  batchId: "RS-PL-2026-001",
  materialName: "Secondary HDPE / PET High-Purity Flakes",
  sourceFacility: "Demo Industrial Unit — Navi Mumbai",
  sourceLocation: "Rabale MIDC, Maharashtra",
  generationDate: "September 2026",
  originalQuantity: "500 kg",
  recoverableFraction: "460 kg",
  processedQuantity: "430 kg",
  disposalFraction: "70 kg (14% inert loss)",
  processingSequence: "Sorted → Decontaminated → Hot Washed → Dried → Shredded → Aggregated",
  parameters: {
    flakeSize: "8 – 12 mm nominal",
    residualMoisture: "< 1.2% (Halogen test)",
    bulkDensity: "0.38 g/cm³",
    nonPolymerImpurities: "< 0.4%",
    colorGrade: "Mixed Clean (Light Green / Clear / Natural)"
  },
  status: "Ready for downstream extrusion evaluation",
  disclaimer: "Prototype material passport — illustrative prototype estimate, not a regulatory certificate."
};
