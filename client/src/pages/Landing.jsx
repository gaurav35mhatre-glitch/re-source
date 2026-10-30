import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Sparkles, 
  Play, 
  CheckCircle2, 
  XCircle, 
  Layers, 
  Search, 
  Sliders, 
  Boxes, 
  Route, 
  ShieldCheck, 
  TrendingUp, 
  Activity, 
  AlertTriangle, 
  Cpu, 
  MapPin, 
  Check, 
  FileText, 
  RefreshCw, 
  Award,
  Zap,
  ArrowUpRight,
  ChevronRight
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import LiveDemoModal from '../components/LiveDemoModal';

export default function Landing() {
  const { t } = useLanguage();
  const [demoOpen, setDemoOpen] = useState(false);

  return (
    <div className="w-full space-y-16 sm:space-y-20 pb-20 pt-2">
      {/* 1. HERO SECTION — Full Screen Fluid Layout */}
      <section className="relative w-full">
        {/* Soft radial ambient glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-emerald-100/90 via-teal-100/70 to-sky-100/70 blur-[120px] -z-10 rounded-full pointer-events-none"></div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Core Value Proposition */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Top Hackathon Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-300 text-xs sm:text-sm font-bold text-emerald-900 shadow-xs">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse"></span>
              <span>{t('heroBadge') || "Maharashtra Circular Economy Hackathon • Secondary Material Recovery"}</span>
            </div>

            {/* Main Pitch Title: re'source */}
            <div>
              <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black text-slate-900 tracking-tight leading-[1.02]">
                <span className="text-emerald-600">re'</span>source
              </h1>
              <p className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-snug">
                “Don't just move waste. <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600">Prepare it for its next life.</span>”
              </p>
            </div>

            {/* Problem Statement */}
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal max-w-2xl">
              India has waste collectors, truck fleets, and recycling plants. But between a factory's scrap pile and a usable secondary raw material lies a 
              <strong className="text-slate-950 font-bold"> neglected preparation gap</strong>: segregation, washing, shredding, and lot aggregation.
            </p>

            {/* Value Proposition Pills */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              <div className="p-3 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center gap-2.5">
                <Search className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="text-xs font-bold text-slate-800">AI Material Diagnosis</span>
              </div>
              <div className="p-3 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center gap-2.5">
                <Sliders className="w-4 h-4 text-sky-600 shrink-0" />
                <span className="text-xs font-bold text-slate-800">7-Stage Prep Protocol</span>
              </div>
              <div className="p-3 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-purple-600 shrink-0" />
                <span className="text-xs font-bold text-slate-800">ISO 14021 DPP Passport</span>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <button
                onClick={() => setDemoOpen(true)}
                className="px-6 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm uppercase tracking-wider transition-all shadow-md shadow-emerald-600/30 flex items-center justify-center gap-2.5 hover:scale-[1.02] active:scale-[0.98]"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Launch 60s Live Pitch Demo</span>
              </button>

              <a
                href="#cheatsheet"
                className="px-5 py-4 rounded-2xl bg-amber-50 hover:bg-amber-100 text-amber-950 font-black text-sm border-2 border-amber-300 transition-all flex items-center justify-center gap-2 shadow-xs hover:scale-[1.02]"
              >
                <Award className="w-4 h-4 text-amber-700" />
                <span>🏆 Why Other Marketplaces Fail</span>
              </a>

              <Link
                to="/analyze"
                className="px-6 py-4 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm border-2 border-slate-200 transition-all flex items-center justify-center gap-2 shadow-xs hover:border-slate-300"
              >
                <Search className="w-4 h-4 text-emerald-600" />
                <span>Diagnose Stream</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Live Feedstock Terminal Visual Card */}
          <div className="lg:col-span-5">
            <div className="p-6 sm:p-8 rounded-3xl bg-white border-2 border-slate-200/90 shadow-xl space-y-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-36 h-36 bg-emerald-100/50 rounded-full blur-2xl pointer-events-none"></div>

              {/* Card Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-emerald-500 animate-ping"></span>
                  <span className="text-xs font-black uppercase tracking-wider text-slate-800">
                    Live Feedstock Transformation
                  </span>
                </div>
                <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300">
                  Rabale Pilot Stream
                </span>
              </div>

              {/* Before vs After Metric Comparison */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-red-50/70 border border-red-200 space-y-1">
                  <span className="text-[10px] font-black uppercase tracking-wider text-red-800">Raw Scrap Input</span>
                  <p className="text-2xl font-black text-red-950">500 <span className="text-xs font-semibold text-red-700">kg</span></p>
                  <p className="text-xs text-red-700 font-bold">Value: ₹8/kg (Dump-prone)</p>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-300 space-y-1">
                  <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800">Recovered Flakes</span>
                  <p className="text-2xl font-black text-emerald-950">430 <span className="text-xs font-semibold text-emerald-700">kg</span></p>
                  <p className="text-xs text-emerald-800 font-extrabold">Value: ₹38/kg (Extrusion)</p>
                </div>
              </div>

              {/* Physical Process Pipeline Preview */}
              <div className="space-y-2 text-xs">
                <span className="font-extrabold text-slate-500 uppercase tracking-wider block text-[11px]">
                  Physical Preprocessing Route (15 km MIDC Radius):
                </span>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="block font-black text-slate-900">01. Sort</span>
                    <span className="text-[10px] text-slate-500">PET / HDPE</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="block font-black text-slate-900">02. Wash</span>
                    <span className="text-[10px] text-slate-500">Caustic 65°C</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="block font-black text-slate-900">03. Granulate</span>
                    <span className="text-[10px] text-slate-500">10mm Flakes</span>
                  </div>
                </div>
              </div>

              {/* Value Highlight & Action */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-700 text-white flex items-center justify-between">
                <div>
                  <span className="text-[11px] uppercase font-bold text-emerald-100 block">Economic Uplift</span>
                  <span className="text-xl font-black">+375% Value Added</span>
                </div>
                <Link
                  to="/plan"
                  className="px-4 py-2 rounded-xl bg-white text-emerald-900 font-extrabold text-xs hover:bg-emerald-50 transition-colors flex items-center gap-1.5 shadow-xs"
                >
                  <span>View Recipe</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. LIVE OPERATIONAL METRICS STRIP — Full Screen Fluid Grid */}
      <section className="w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="p-6 rounded-3xl bg-white border-2 border-slate-200/90 shadow-sm space-y-2 hover:border-slate-300 transition-colors">
            <span className="text-xs font-black uppercase tracking-wider text-slate-500">Waste Ingested</span>
            <p className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
              1,240 <span className="text-base font-normal text-slate-500">kg</span>
            </p>
            <p className="text-xs sm:text-sm text-slate-600 pt-1 font-medium">Rabale MSME cluster intake across 3 streams</p>
          </div>

          <div className="p-6 rounded-3xl bg-white border-2 border-slate-200/90 shadow-sm space-y-2 hover:border-emerald-300 transition-colors">
            <span className="text-xs font-black uppercase tracking-wider text-emerald-800">Recoverable Yield</span>
            <p className="text-3xl sm:text-5xl font-black text-emerald-700 tracking-tight">
              75% <span className="text-base font-normal text-slate-500">fraction</span>
            </p>
            <p className="text-xs sm:text-sm text-emerald-800 pt-1 font-semibold">930 kg clean separable polymers</p>
          </div>

          <div className="p-6 rounded-3xl bg-white border-2 border-slate-200/90 shadow-sm space-y-2 hover:border-sky-300 transition-colors">
            <span className="text-xs font-black uppercase tracking-wider text-sky-800">Distributed Prep</span>
            <p className="text-3xl sm:text-5xl font-black text-sky-700 tracking-tight">
              3 <span className="text-base font-normal text-slate-500">local nodes</span>
            </p>
            <p className="text-xs sm:text-sm text-sky-800 pt-1 font-semibold">Sort &bull; Wash &bull; Granulate within 15 km</p>
          </div>

          <div className="p-6 rounded-3xl bg-white border-2 border-slate-200/90 shadow-sm space-y-2 hover:border-teal-300 transition-colors">
            <span className="text-xs font-black uppercase tracking-wider text-teal-800">Secondary Value</span>
            <p className="text-3xl sm:text-5xl font-black text-teal-700 tracking-tight">
              ₹38 <span className="text-base font-normal text-slate-500">/ kg</span>
            </p>
            <p className="text-xs sm:text-sm text-teal-800 pt-1 font-semibold">Up from ₹8/kg raw scrap (+375% margin)</p>
          </div>
        </div>
      </section>

      {/* 3. THE CORE DIFFERENTIATION — VISUAL PARADIGM SHIFT (Full Width) */}
      <section className="w-full space-y-8">
        {/* STANDOUT QUOTE CALLOUT */}
        <div className="text-center space-y-2">
          <div className="inline-block p-6 sm:p-8 rounded-3xl bg-white border-2 border-emerald-300 shadow-sm max-w-4xl">
            <p className="text-xl sm:text-3xl font-black text-slate-900 tracking-tight leading-snug">
              « The truck isn't always the problem. The material is. »
            </p>
            <p className="text-sm sm:text-base text-slate-600 mt-2 font-medium">
              We don't optimize the truck's journey. We optimize the material's physical journey.
            </p>
          </div>
        </div>

        {/* COMPARISON CARDS: CURRENT PATH vs RE'SOURCE PATH (Full Width 2 Columns) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-stretch">
          {/* CURRENT PATH (CONVENTIONAL FAILURE) */}
          <div className="p-6 sm:p-10 rounded-3xl bg-white border-2 border-red-200 shadow-sm space-y-6 flex flex-col justify-between">
            <div className="space-y-5">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <span className="text-sm uppercase font-black tracking-wider text-red-700">
                  Conventional Waste Flow
                </span>
                <span className="text-xs text-red-800 font-extrabold bg-red-100 px-3 py-1 rounded-full border border-red-300">
                  CURRENT PATH
                </span>
              </div>

              {/* Steps */}
              <div className="space-y-3.5 text-sm">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-slate-800 flex items-center justify-between">
                  <span className="font-bold text-slate-900">Factory Generator</span>
                  <span className="text-xs text-slate-600 font-semibold bg-slate-200/80 px-2.5 py-1 rounded-lg">500 kg Mixed Scrap</span>
                </div>
                <div className="text-center text-slate-400 font-bold text-lg">↓</div>
                <div className="p-4 rounded-2xl bg-red-50/70 border border-red-200 text-red-900 flex items-center justify-between">
                  <div>
                    <span className="font-bold block text-sm">Mixed & Contaminated Stream</span>
                    <span className="text-xs text-red-700">PET + HDPE mixed, labels, 6.2% moisture</span>
                  </div>
                  <span className="text-xs text-red-700 font-black uppercase bg-red-100 px-2.5 py-1 rounded-lg">Unsorted</span>
                </div>
                <div className="text-center text-slate-400 font-bold text-lg">↓</div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-slate-800 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-slate-900 text-sm block">Standard Freight Truck</span>
                    <span className="text-xs text-slate-500">Single haul directly to distant recycler (₹18/kg)</span>
                  </div>
                  <span className="text-xs text-slate-600 font-semibold bg-slate-200/80 px-2.5 py-1 rounded-lg">Burns Fuel</span>
                </div>
                <div className="text-center text-slate-400 font-bold text-lg">↓</div>
                <div className="p-5 rounded-2xl bg-red-100/90 border border-red-300 text-red-900 font-black text-center text-sm shadow-xs">
                  ❌ Rejected at Gate / Landfilled at Tipping Fee (Direct loss of ₹18/kg)
                </div>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-4 border-t border-slate-100 font-medium">
              Moving material before diagnosing and decontaminating it results in heavy freight wasted on water, dirt, and unprocessable polymer mixes.
            </p>
          </div>

          {/* RE'SOURCE PROTOCOL */}
          <div className="p-6 sm:p-10 rounded-3xl bg-white border-2 border-emerald-500 shadow-xl space-y-6 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-44 h-44 bg-emerald-100/40 rounded-full blur-3xl pointer-events-none"></div>

            <div className="space-y-5">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <span className="text-sm uppercase font-black tracking-wider text-emerald-800">
                  re'source Protocol
                </span>
                <span className="text-xs text-emerald-900 font-extrabold bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300">
                  RE'SOURCE PATH
                </span>
              </div>

              {/* Steps */}
              <div className="space-y-3 text-sm">
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-800 flex items-center justify-between">
                  <span className="font-bold text-slate-900">Factory Generator</span>
                  <span className="text-xs text-slate-600 font-semibold bg-slate-200/80 px-2.5 py-1 rounded-lg">Stream Ingestion</span>
                </div>
                <div className="text-center text-emerald-600 font-bold text-lg">↓</div>
                <div className="p-3.5 rounded-2xl bg-emerald-50/80 border border-emerald-200 text-emerald-950 flex items-center justify-between">
                  <div>
                    <span className="font-bold block text-sm">01 &bull; Stream Diagnosis</span>
                    <span className="text-xs text-emerald-700">Polymer separation & impurity audit</span>
                  </div>
                  <span className="text-xs text-emerald-800 font-bold bg-emerald-100 px-2.5 py-1 rounded-lg">AI Diagnosis</span>
                </div>
                <div className="text-center text-emerald-600 font-bold text-lg">↓</div>
                <div className="p-3.5 rounded-2xl bg-emerald-50/80 border border-emerald-200 text-emerald-950 flex items-center justify-between">
                  <div>
                    <span className="font-bold block text-sm">02 &bull; Pre-Processing Recipe</span>
                    <span className="text-xs text-emerald-700">Hot wash &bull; Centrifugal dry &bull; 10mm shred</span>
                  </div>
                  <span className="text-xs text-emerald-800 font-bold bg-emerald-100 px-2.5 py-1 rounded-lg">Decontamination</span>
                </div>
                <div className="text-center text-emerald-600 font-bold text-lg">↓</div>
                <div className="p-3.5 rounded-2xl bg-emerald-50/80 border border-emerald-200 text-emerald-950 flex items-center justify-between">
                  <div>
                    <span className="font-bold block text-sm">03 &bull; MSME Batch Aggregation</span>
                    <span className="text-xs text-emerald-700">Combine 4 factories into 1.7 tonnes</span>
                  </div>
                  <span className="text-xs text-emerald-800 font-bold bg-emerald-100 px-2.5 py-1 rounded-lg">Bulk Lot</span>
                </div>
                <div className="text-center text-emerald-600 font-bold text-lg">↓</div>
                <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-black text-center text-sm shadow-md">
                  ✅ 430 kg Resource-Ready Flakes (₹38/kg) with Verified Passport
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs sm:text-sm text-slate-600 font-medium">Physical transformation before transit</span>
              <Link
                to="/plan"
                className="text-sm font-extrabold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 hover:underline"
              >
                <span>Inspect 7-Stage Recipe</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. JUDGE CHEATSHEET: WHY 30 OTHER WASTE MARKETPLACES FAIL IN INDIA (Full Screen Fluid) */}
      <section id="cheatsheet" className="w-full scroll-mt-24">
        <div className="p-6 sm:p-12 rounded-3xl bg-gradient-to-b from-slate-900 to-slate-950 text-white border-2 border-amber-500/40 shadow-2xl space-y-8 relative overflow-hidden">
          {/* Subtle gold ambient glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-slate-800">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-black uppercase tracking-wider mb-2.5">
                <Award className="w-4 h-4 text-amber-400" />
                <span>Executive Evaluation Cheatsheet</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
                Why 30 Other Waste Marketplaces Fail in India
              </h2>
              <p className="text-sm sm:text-base text-slate-300 mt-2 max-w-3xl font-normal leading-relaxed">
                Generic marketplaces attempt to solve a physical chemical problem with a software listing. Here is why <strong className="text-emerald-400 font-bold">re'source</strong> is the only platform built for real-world secondary recovery.
              </p>
            </div>

            <div className="bg-slate-800/90 p-5 rounded-2xl border border-slate-700 text-left lg:text-right shrink-0">
              <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block">Our Unfair Advantage</span>
              <span className="text-lg sm:text-xl font-black text-emerald-400">Physical Preprocessing Moat</span>
            </div>
          </div>

          {/* 3 Pillar Comparison Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Pillar 1 */}
            <div className="p-6 rounded-2xl bg-slate-800/60 border border-slate-700/80 space-y-4 flex flex-col justify-between hover:border-amber-400/40 transition-colors">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-amber-400 uppercase tracking-wider">Flaw #1</span>
                  <span className="text-xs font-bold text-red-300 bg-red-950/70 px-2.5 py-0.5 rounded-md border border-red-800/40">Marketplace Myth</span>
                </div>
                <h3 className="text-lg font-black text-white leading-snug">
                  "Matching Without Diagnosis"
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  <strong className="text-red-300 font-bold">How other teams fail:</strong> They treat mixed plastic like consumer goods on an e-commerce catalog. But when PET and HDPE are mixed, melting them creates brittle, unusable secondary resin.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/30 text-xs sm:text-sm text-emerald-200 space-y-1">
                <span className="font-black text-emerald-400 block uppercase text-xs">re'source Moat:</span>
                <p className="font-medium">AI Material Diagnosis identifies moisture, label adhesives, and polymer separation BEFORE transactions occur.</p>
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="p-6 rounded-2xl bg-slate-800/60 border border-slate-700/80 space-y-4 flex flex-col justify-between hover:border-amber-400/40 transition-colors">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-amber-400 uppercase tracking-wider">Flaw #2</span>
                  <span className="text-xs font-bold text-red-300 bg-red-950/70 px-2.5 py-0.5 rounded-md border border-red-800/40">The Freight Trap</span>
                </div>
                <h3 className="text-lg font-black text-white leading-snug">
                  "Hauling Dirt & Water 50 km"
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  <strong className="text-red-300 font-bold">How other teams fail:</strong> Booking direct trucks for raw scrap costs ₹18/kg. MSMEs burn diesel transporting heavy unwashed scrap that gets rejected at the gate.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/30 text-xs sm:text-sm text-emerald-200 space-y-1">
                <span className="font-black text-emerald-400 block uppercase text-xs">re'source Moat:</span>
                <p className="font-medium">Local 15 km MIDC preprocessing (hot wash, spin dry, granulate) cuts freight to ₹4.20/kg and upgrades value to ₹38/kg.</p>
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="p-6 rounded-2xl bg-slate-800/60 border border-slate-700/80 space-y-4 flex flex-col justify-between hover:border-amber-400/40 transition-colors">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-amber-400 uppercase tracking-wider">Flaw #3</span>
                  <span className="text-xs font-bold text-red-300 bg-red-950/70 px-2.5 py-0.5 rounded-md border border-red-800/40">The Spec Void</span>
                </div>
                <h3 className="text-lg font-black text-white leading-snug">
                  "Listing Photos Instead of Specs"
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  <strong className="text-red-300 font-bold">How other teams fail:</strong> Formal manufacturers can't feed random scrap photos into injection-molding hoppers without certified bulk density and melt-flow index.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/30 text-xs sm:text-sm text-emerald-200 space-y-1">
                <span className="font-black text-emerald-400 block uppercase text-xs">re'source Moat:</span>
                <p className="font-medium">ISO-14021 Digital Product Passport (DPP) generates batch-traceable QR verification for guaranteed secondary procurement.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. PLATFORM ARCHITECTURE PILLARS (Full Width 4 Columns) */}
      <section className="w-full space-y-8">
        <div className="text-center space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">Platform Core Capabilities</span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
            How re'source Solves Physical Recovery
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link
            to="/analyze"
            className="p-6 rounded-3xl bg-white border-2 border-slate-200/90 shadow-sm hover:border-emerald-500 hover:shadow-md transition-all space-y-3 group"
          >
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="font-black text-slate-900 text-base">1. Waste Diagnosis</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Diagnoses why the material is failing: polymer mix, adhesive labels, moisture content, and loss estimates.
            </p>
            <span className="text-xs font-extrabold text-emerald-700 inline-flex items-center gap-1 pt-1 group-hover:underline">
              Try Diagnosis &rarr;
            </span>
          </Link>

          <Link
            to="/plan"
            className="p-6 rounded-3xl bg-white border-2 border-slate-200/90 shadow-sm hover:border-emerald-500 hover:shadow-md transition-all space-y-3 group"
          >
            <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-700 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Sliders className="w-6 h-6" />
            </div>
            <h3 className="font-black text-slate-900 text-base">2. 7-Stage Recipe</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Step-by-step physical transformation specifications: sorting, washing, caustic decontamination, and uniform granulating.
            </p>
            <span className="text-xs font-extrabold text-sky-700 inline-flex items-center gap-1 pt-1 group-hover:underline">
              View Recipe &rarr;
            </span>
          </Link>

          <Link
            to="/network"
            className="p-6 rounded-3xl bg-white border-2 border-slate-200/90 shadow-sm hover:border-emerald-500 hover:shadow-md transition-all space-y-3 group"
          >
            <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-700 flex items-center justify-center group-hover:scale-105 transition-transform">
              <MapPin className="w-6 h-6" />
            </div>
            <h3 className="font-black text-slate-900 text-base">3. Distributed Map</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Networks idle balers, granulators, and wash bays in Navi Mumbai, Rabale, and Taloja without building new factories.
            </p>
            <span className="text-xs font-extrabold text-purple-700 inline-flex items-center gap-1 pt-1 group-hover:underline">
              Open Network &rarr;
            </span>
          </Link>

          <Link
            to="/passport"
            className="p-6 rounded-3xl bg-white border-2 border-slate-200/90 shadow-sm hover:border-emerald-500 hover:shadow-md transition-all space-y-3 group"
          >
            <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center group-hover:scale-105 transition-transform">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="font-black text-slate-900 text-base">4. Material Passport</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              QR-coded technical specification certificate ensuring downstream compounders can procure with confidence.
            </p>
            <span className="text-xs font-extrabold text-teal-700 inline-flex items-center gap-1 pt-1 group-hover:underline">
              View Passport &rarr;
            </span>
          </Link>
        </div>
      </section>

      {/* 6. BOTTOM CTA BANNER (Full Width) */}
      <section className="w-full">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-emerald-700 via-teal-800 to-slate-900 text-white flex flex-col lg:flex-row items-center justify-between gap-8 shadow-xl">
          <div className="space-y-2 text-center lg:text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-200">
              Judges Walkthrough Ready
            </span>
            <h3 className="text-2xl sm:text-4xl font-black">
              See the full 60-second operational flow
            </h3>
            <p className="text-sm sm:text-base text-emerald-100 max-w-2xl">
              From a 500 kg raw packaging discard pile in Rabale MIDC to 430 kg of high-grade extrusion feedstock with verified passport specs.
            </p>
          </div>

          <button
            onClick={() => setDemoOpen(true)}
            className="px-8 py-4 rounded-2xl bg-white text-emerald-900 font-black text-sm uppercase tracking-wider hover:bg-emerald-50 transition-all shadow-md shrink-0 flex items-center gap-2.5 hover:scale-105"
          >
            <Play className="w-5 h-5 fill-emerald-900" />
            <span>Start 60s Demo</span>
          </button>
        </div>
      </section>

      {/* 60-Second Walkthrough Modal */}
      <LiveDemoModal isOpen={demoOpen} onClose={() => setDemoOpen(false)} />
    </div>
  );
}
