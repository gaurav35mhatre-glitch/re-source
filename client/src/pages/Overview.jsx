import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Layers, 
  ArrowRight, 
  Info, 
  AlertTriangle, 
  CheckCircle2, 
  Sparkles, 
  Boxes, 
  Activity, 
  HelpCircle,
  TrendingUp,
  Cpu,
  RefreshCw,
  Search,
  Check,
  Award,
  ArrowUpRight,
  ShieldCheck,
  Building2
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { DEMO_FACILITY, DEFAULT_WASTE_SCENARIO } from '../data/mockData';

export default function Overview() {
  const [showTooltip, setShowTooltip] = useState(false);
  const { t } = useLanguage();

  return (
    <div className="space-y-8 pb-20">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-emerald-700">
            <Activity className="w-4 h-4" />
            <span>Industrial Operations Control &bull; Live Cluster Intake</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 mt-1 tracking-tight">
            {t('controlCenterTitle') || 'Material Flow Control Center'}
          </h1>
          <p className="text-slate-600 text-sm sm:text-base mt-1.5 max-w-4xl leading-relaxed">
            {t('controlCenterSub') || 'Real-time physical preparation and preprocessing coordination layer for Maharashtra MSME clusters.'}
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Link
            to="/analyze"
            className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-sm shadow-emerald-600/25 hover:scale-[1.02] active:scale-[0.98]"
          >
            <Search className="w-4 h-4" />
            <span>{t('analyzeMyWaste') || 'New Waste Diagnosis'}</span>
          </Link>
        </div>
      </div>

      {/* 4 Major Metrics Strip — Full Screen Fluid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="p-6 rounded-3xl bg-white border-2 border-slate-200/90 shadow-sm space-y-2 hover:border-slate-300 transition-colors">
          <p className="text-xs font-black uppercase tracking-wider text-slate-500">{t('wasteReceived') || 'Waste Received'}</p>
          <p className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            1,240 <span className="text-base font-normal text-slate-500">kg</span>
          </p>
          <p className="text-xs sm:text-sm text-slate-600 font-medium pt-1">Across 3 Rabale MSME intake streams</p>
        </div>

        <div className="p-6 rounded-3xl bg-white border-2 border-slate-200/90 shadow-sm space-y-2 hover:border-emerald-300 transition-colors">
          <p className="text-xs font-black uppercase tracking-wider text-emerald-800">{t('recoverable') || 'Recoverable'}</p>
          <p className="text-3xl sm:text-5xl font-black text-emerald-700 tracking-tight">
            930 <span className="text-base font-normal text-slate-500">kg</span>
          </p>
          <p className="text-xs sm:text-sm text-emerald-800 font-semibold pt-1">75% theoretical recyclable fraction</p>
        </div>

        <div className="p-6 rounded-3xl bg-white border-2 border-slate-200/90 shadow-sm space-y-2 hover:border-sky-300 transition-colors">
          <p className="text-xs font-black uppercase tracking-wider text-sky-800">{t('processingRequired') || 'Processing Required'}</p>
          <p className="text-3xl sm:text-5xl font-black text-sky-700 tracking-tight">
            3 <span className="text-base font-normal text-slate-500">stages</span>
          </p>
          <p className="text-xs sm:text-sm text-sky-800 font-semibold pt-1">Segregation &bull; Wash &bull; Shred</p>
        </div>

        <div className="p-6 rounded-3xl bg-white border-2 border-slate-200/90 shadow-sm space-y-2 hover:border-teal-300 transition-colors">
          <p className="text-xs font-black uppercase tracking-wider text-teal-800">{t('resourceReady') || 'Resource Ready'}</p>
          <p className="text-3xl sm:text-5xl font-black text-teal-700 tracking-tight">
            680 <span className="text-base font-normal text-slate-500">kg</span>
          </p>
          <p className="text-xs sm:text-sm text-teal-800 font-semibold pt-1">Extrusion-grade secondary flakes</p>
        </div>
      </div>

      {/* Large Visual: Waste-to-Resource Conversion — Wide Fluid */}
      <div className="p-6 sm:p-10 rounded-3xl bg-white border-2 border-slate-200/90 shadow-sm space-y-8 relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">{t('wasteToResourceTitle') || 'Waste-to-Resource Conversion'}</h2>
            <div className="relative">
              <button 
                onMouseEnter={() => setShowTooltip(true)} 
                onMouseLeave={() => setShowTooltip(false)}
                onClick={() => setShowTooltip(!showTooltip)}
                className="text-slate-400 hover:text-slate-600 transition"
                aria-label="Info tooltip"
              >
                <HelpCircle className="w-5 h-5" />
              </button>
              {showTooltip && (
                <div className="absolute left-6 -top-2 w-72 p-3 rounded-2xl bg-slate-900 text-xs text-white shadow-2xl z-20 font-medium leading-relaxed">
                  Prototype mass balance calculation based on actual composition test in Rabale MIDC.
                </div>
              )}
            </div>
          </div>
          <span className="text-xs font-black text-emerald-800 bg-emerald-50 border border-emerald-200 px-3.5 py-1.5 rounded-full self-start sm:self-auto uppercase tracking-wider">
            Mass Balance Pipeline
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 text-center items-stretch">
          {/* Step 1 */}
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-50 border-2 border-slate-200 space-y-2 flex flex-col justify-between">
            <span className="text-xs font-black text-slate-500 uppercase tracking-widest">Stage 01</span>
            <p className="text-3xl sm:text-4xl font-black text-slate-900">1,240 <span className="text-sm font-normal text-slate-500">kg</span></p>
            <p className="text-sm font-semibold text-slate-700">{t('wasteEntering')}</p>
          </div>

          {/* Step 2 */}
          <div className="p-6 sm:p-8 rounded-3xl bg-sky-50/80 border-2 border-sky-200 space-y-2 flex flex-col justify-between">
            <span className="text-xs font-black text-sky-800 uppercase tracking-widest">Stage 02</span>
            <p className="text-3xl sm:text-4xl font-black text-sky-900">930 <span className="text-sm font-normal text-sky-700">kg</span></p>
            <p className="text-sm font-semibold text-sky-900">{t('recoverableFraction')}</p>
          </div>

          {/* Step 3 */}
          <div className="p-6 sm:p-8 rounded-3xl bg-teal-50/80 border-2 border-teal-200 space-y-2 flex flex-col justify-between">
            <span className="text-xs font-black text-teal-800 uppercase tracking-widest">Stage 03</span>
            <p className="text-3xl sm:text-4xl font-black text-teal-900">680 <span className="text-sm font-normal text-teal-700">kg</span></p>
            <p className="text-sm font-semibold text-teal-900">{t('processedSecondary')}</p>
          </div>

          {/* Conversion rate */}
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-emerald-50 via-emerald-100/70 to-teal-50 border-2 border-emerald-400 space-y-2 flex flex-col justify-between shadow-xs">
            <span className="text-xs font-black text-emerald-900 uppercase tracking-widest">Total Conversion</span>
            <p className="text-3xl sm:text-5xl font-black text-emerald-800">55%</p>
            <p className="text-sm font-bold text-emerald-900">{t('conversionRate')}</p>
          </div>
        </div>
      </div>

      {/* Two Columns: Recovery Barrier Analysis & Quick Pathway — Wide Fluid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        {/* Recovery Barrier Analysis Intelligence Panel */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border-2 border-slate-200/90 space-y-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-lg sm:text-xl font-black text-slate-900">{t('barrierAnalysisTitle')}</h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">{t('barrierAnalysisSub')}</p>
            </div>
            <span className="text-xs font-bold text-amber-900 bg-amber-100 border border-amber-300 px-3 py-1 rounded-full self-start sm:self-auto">
              Mixed Plastic Stream
            </span>
          </div>

          {/* Barrier breakdown */}
          <div className="space-y-4">
            {DEFAULT_WASTE_SCENARIO.barriers.map((b, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-800 font-bold">{b.name}</span>
                  <span className="font-black text-slate-900">{b.percentage}%</span>
                </div>
                <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all" style={{ width: `${b.percentage}%`, backgroundColor: b.color }}></div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottleneck Callout */}
          <div className="p-5 rounded-2xl bg-amber-50/90 border-2 border-amber-200 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-amber-900 uppercase font-black tracking-wider">{t('primaryBottleneck')}</span>
              <span className="text-amber-900 font-extrabold">{DEFAULT_WASTE_SCENARIO.bottleneck}</span>
            </div>
            <p className="text-sm text-amber-950 leading-relaxed font-medium">
              <strong>{t('recommendationLabel')}</strong> {DEFAULT_WASTE_SCENARIO.recommendation}
            </p>
          </div>
        </div>

        {/* Quick Material Journey Blueprint */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border-2 border-slate-200/90 space-y-6 shadow-sm flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="text-lg sm:text-xl font-black text-slate-900">Focus Batch: 500 kg Mixed Plastic</h3>
              <span className="text-xs font-black text-emerald-800 bg-emerald-50 border border-emerald-300 px-3 py-1 rounded-full">
                Rabale MIDC
              </span>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed font-normal">
              Standard post-industrial packaging discards generated at Demo Industrial Unit. Currently destined for downcycling because of label contamination and mixed PET/HDPE resin.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-2">
              <div className="p-4 rounded-2xl bg-slate-50 border-2 border-slate-200 space-y-1">
                <span className="text-xs text-slate-500 uppercase font-bold">Input Condition</span>
                <p className="text-slate-900 font-black text-sm">Partially contaminated rigid scrap</p>
              </div>
              <div className="p-4 rounded-2xl bg-emerald-50/80 border-2 border-emerald-200 space-y-1">
                <span className="text-xs text-emerald-800 uppercase font-bold">Target Form</span>
                <p className="text-emerald-800 font-black text-sm">Clean 10mm Standard Flakes</p>
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-6 border-t border-slate-100">
            <div className="flex items-center justify-between text-sm text-slate-600 font-medium">
              <span>Required Journey:</span>
              <span className="text-slate-900 font-black">3 Prep Nodes &bull; 29.2 km</span>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              <Link
                to="/plan"
                className="w-full sm:flex-1 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider text-center transition-all shadow-sm hover:scale-[1.02] active:scale-[0.98]"
              >
                {t('viewRecipeBtn') || "Inspect Preprocessing Recipe"}
              </Link>
              <Link
                to="/flow"
                className="w-full sm:flex-1 py-3.5 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs uppercase tracking-wider text-center border-2 border-slate-200 hover:border-slate-300 transition-all shadow-xs"
              >
                {t('flowHeading') || "View Material Path"}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
