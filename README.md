# THE MISSING MIDDLE

> **“Don't just move waste. Prepare it for its next life.”**  
> *“We don't optimize the truck's journey. We optimize the material's journey.”*

---

## 🧭 The Core Concept

India has collection systems, transport networks, and recycling facilities. But between a factory generating waste and a usable secondary raw material lies a neglected, fragmented gap: **The Missing Middle**.

Waste often cannot directly enter the secondary industrial supply chain because it is **mixed, contaminated, wet, insufficient in quantity, inconsistent, or not processed into the form that downstream extruders and compounders require**.

```
CURRENT PATH (Why recycling fails):
Factory ➔ Mixed Waste ➔ Direct Truck ➔ Recycler ➔ ❌ Rejected at gate / Low-value landfilling

OUR PATH (The Missing Middle Protocol):
Factory ➔ Diagnose ➔ Segregate ➔ Pre-process ➔ Aggregate ➔ Move ➔ ✅ Secondary Raw Material
```

---

## ⚡ The 60-Second Hackathon Judge Pitch Sequence

When presenting to judges, launch the **`LIVE DEMO (60s)`** button in the navigation header to guide them through the exact 6-step transformation story:

1. **“Here's 500 kg of messy waste.”**  
   *Post-industrial rigid & flexible polymer scrap from Rabale MIDC, Navi Mumbai.*
2. **“The problem isn't the truck: Here's why this material can't enter the recycling supply chain.”**  
   *Mixed PET (260°C melt) & HDPE (130°C melt), surface adhesive label contamination, 6.2% moisture.*
3. **“Our system generates the Preprocessing Recipe.”**  
   *7-stage physical protocol: Segregate ➔ Decontaminate ➔ Hot Wash ➔ Centrifugal Dry ➔ Granulate (10 mm) ➔ Bale ➔ Quality Check.*
4. **“It coordinates distributed processing capacity around it.”**  
   *Networks underused local infrastructure (local scrap balers, industrial wash plants, rotary shredders) within a 9 km radius.*
5. **“It aggregates fragmented MSME streams into the Material Journey.”**  
   *Combines four sub-scale generators (300 kg + 500 kg + 200 kg + 700 kg = 1,700 kg/month) into bulk lots.*
6. **“500 kg waste ➔ 430 kg resource-ready secondary material.”**  
   *Generates the Secondary Material Passport (Batch `MM-PL-001`).*

> **“That's our missing middle.”**

---

## 🖥️ Screen Architecture

1. **Landing (`/`)**:
   - Hero pitch communicating the concept within 10–20 seconds.
   - Comparative visual: Current Path vs. Our Path.
   - Core highlight: *«The truck isn't always the problem. The material is.»*
   - Differentiation matrix: Traditional waste platforms vs. The Missing Middle.
   - Operational technology suite: Material Intelligence, Processing Intelligence, Capacity Intelligence, Flow Optimizer, Aggregation Engine, Impact Engine.

2. **Material Flow Control Center (`/overview`)**:
   - Live industrial control room view.
   - 4 Major Metrics: Waste Received (1,240 kg), Recoverable (930 kg), Processing Required (3 stages), Resource Ready (680 kg).
   - Waste-to-Resource Conversion Visual (1,240 kg ➔ 930 kg ➔ 680 kg = 55% net conversion).
   - Recovery Barrier Analysis (Poor segregation 38%, Contamination 24%, Sub-scale volume 18%, No prep capacity 12%, Inconsistent cadence 8%).

3. **Analyze My Waste (`/analyze`) — Centerpiece Feature**:
   - "Try Demo: 500 kg Mixed Plastic" 1-click prefill.
   - Drag & drop waste photo upload interface or detailed physical stream entry.
   - Automated 6-step Material Diagnosis scanner.
   - Composition breakdown (PET 55%, HDPE 25%, Other polymers 10%, Contaminants 10%).
   - Clear distinction between *Estimated / Prototype values* vs *Certified testing*.

4. **Pre-Processing Recipe (`/plan`)**:
   - *“BEFORE IT CAN MOVE, IT NEEDS TO CHANGE.”*
   - Interactive 7-stage clickable pipeline:
     1. `01 — SEGREGATION`
     2. `02 — CONTAMINATION REMOVAL`
     3. `03 — WASHING`
     4. `04 — DRYING`
     5. `05 — SHREDDING`
     6. `06 — BALING / PACKAGING`
     7. `07 — QUALITY CHECK`
   - Detailed specification card per stage: equipment, loss %, capacity, and assigned local facility.

5. **Processing Capacity Network (`/network`)**:
   - *“We don't necessarily need to build new infrastructure. We can coordinate underused infrastructure that already exists.”*
   - Interactive Leaflet map of Maharashtra MIDC clusters with 6 color-coded node types:
     - 🟢 Sorting Capacity (Local Scrap Facility — 4.2 km)
     - 🔵 Washing Capacity (Turbhe Industrial Wash Plant — 6.5 km)
     - 🟠 Shredding Capacity (Small Recycling Unit — 8.7 km)
     - 🟣 Baling Capacity (Taloja Compaction Center — 5.3 km)
     - 🟡 Storage & Batching (Demo Aggregation Warehouse — 3.1 km)
     - ⚫ End-User Recycler (Demo Secondary Polymer Recycler — 18.0 km)

6. **Material Flow & Processing Router (`/flow`)**:
   - *“We optimize the MATERIAL, not just the TRUCK.”*
   - Split-screen comparison: Conventional Direct Haul vs. The Missing Middle Protocol.
   - Interactive multi-node physical pathway: Demo Unit (2.4 km) ➔ Sorting (5.1 km) ➔ Wash (3.7 km) ➔ Shredder (3.1 km) ➔ Aggregation (18 km) ➔ Recycler.
   - Total Material Journey: 29.2 km transit, 14% processing loss, 430 kg resource-ready yield.

7. **Aggregation Engine (`/aggregation`)**:
   - *“Small waste streams become a viable industrial input when aggregated.”*
   - Interactive MSME generator selector: Combines Facilities A, B, C, and D into 1,700 kg/month bulk lot.
   - Demonstrates freight drop from ₹18/kg to ₹4.20/kg and value jump from ₹8/kg raw scrap to ₹38/kg clean flakes.

8. **Secondary Material Passport (`/passport`)**:
   - Digital verification certificate for Batch `MM-PL-001`.
   - QR code visual, flake size (8–12 mm), residual moisture (< 1.2%), non-polymer impurities (< 0.4%).
   - Prominent disclaimer: *«Prototype material passport — illustrative prototype estimate, not a regulatory certificate.»*

9. **Material Recovery Impact (`/impact`)**:
   - Conservative mass conversion audit: 680 kg diverted, 430 kg secondary created, 430 kg virgin polymer substituted, 70 kg inert disposal.
   - Interactive methodology modal explaining equations without claiming speculative carbon offsets.

---

## 🛠️ Quick Local Setup

```bash
# 1. Backend Server
cd server
npm install
npm run seed      # Seeds initial demo databases
npm run dev       # Starts Express API on http://localhost:5000

# 2. Frontend Application
cd client
npm install
npm run dev       # Starts Vite React on http://localhost:3000
```

Open **`http://localhost:3000`** in your browser.
