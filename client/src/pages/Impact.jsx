import React, { useState } from 'react';
import { 
  BarChart3, 
  Leaf, 
  Trash2, 
  RotateCcw, 
  HelpCircle, 
  TrendingUp, 
  ArrowRight, 
  Info, 
  CheckCircle2, 
  X 
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend 
} from 'recharts';
import { useLanguage } from '../context/LanguageContext';

export default function Impact() {
  const { t, language } = useLanguage();
  const [methodologyOpen, setMethodologyOpen] = useState(false);

  const comparisonData = [
    { name: 'Usable Secondary Yield (kg)', conventional: 0, missingMiddle: 430 },
    { name: 'Discarded to Landfill (kg)', conventional: 500, missingMiddle: 70 },
    { name: 'Secondary Flake Value (₹/kg)', conventional: 8, missingMiddle: 38 }
  ];

  return (
    <div className="space-y-6 sm:space-y-10 pb-20">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-700">
            <BarChart3 className="w-4 h-4" />
            <span>Material Recovery Audit &bull; Conservative Accountability</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 mt-1 tracking-tight">
            {t('impactHeading') || 'Material Recovery Impact Audit'}
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
            {t('impactSubtext') || 'Transparent accounting of waste diverted into verified secondary raw material.'}
          </p>
        </div>

        <button
          onClick={() => setMethodologyOpen(true)}
          className="px-4 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 text-xs font-bold transition-colors flex items-center gap-1.5 shadow-xs self-start sm:self-auto hover:border-slate-400"
        >
          <Info className="w-4 h-4 text-emerald-700" />
          <span>{t('viewMethodology') || 'View Methodology'}</span>
        </button>
      </div>

      {/* Primary 6 Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        <div className="p-3.5 sm:p-4 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1">
          <span className="text-[10px] text-slate-500 uppercase font-bold">{t('wasteDiverted') || 'Waste Diverted'}</span>
          <p className="text-xl sm:text-2xl font-black text-slate-900">680 <span className="text-xs font-normal text-slate-500">kg</span></p>
          <p className="text-[10px] text-slate-500">Active regional pipeline</p>
        </div>

        <div className="p-3.5 sm:p-4 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1">
          <span className="text-[10px] text-slate-500 uppercase font-bold">{t('secondaryCreated') || 'Secondary Created'}</span>
          <p className="text-xl sm:text-2xl font-black text-emerald-700">430 <span className="text-xs font-normal text-slate-500">kg</span></p>
          <p className="text-[10px] text-slate-500">Clean 10mm flake batch</p>
        </div>

        <div className="p-3.5 sm:p-4 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1">
          <span className="text-[10px] text-slate-500 uppercase font-bold">{t('virginSubstituted') || 'Virgin Substituted'}</span>
          <p className="text-xl sm:text-2xl font-black text-teal-700">430 <span className="text-xs font-normal text-slate-500">kg</span></p>
          <p className="text-[10px] text-slate-500">Virgin resin displacement</p>
        </div>

        <div className="p-3.5 sm:p-4 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1">
          <span className="text-[10px] text-slate-500 uppercase font-bold">{t('disposalResidue') || 'Disposal Residue'}</span>
          <p className="text-xl sm:text-2xl font-black text-amber-700">70 <span className="text-xs font-normal text-slate-500">kg</span></p>
          <p className="text-[10px] text-slate-500">Inert labels / dirt fraction</p>
        </div>

        <div className="p-3.5 sm:p-4 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1">
          <span className="text-[10px] text-slate-500 uppercase font-bold">Prep Stages</span>
          <p className="text-xl sm:text-2xl font-black text-sky-700">3 <span className="text-xs font-normal text-slate-500">stages</span></p>
          <p className="text-[10px] text-slate-500">Sort &bull; Wash &bull; Shred</p>
        </div>

        <div className="p-3.5 sm:p-4 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1">
          <span className="text-[10px] text-slate-500 uppercase font-bold">Transport Optimized</span>
          <p className="text-xl sm:text-2xl font-black text-purple-700">29.2 <span className="text-xs font-normal text-slate-500">km</span></p>
          <p className="text-[10px] text-slate-500">Multi-stage local route</p>
        </div>
      </div>

      {/* Estimated Environmental Impact Panel */}
      <div className="p-5 sm:p-8 rounded-3xl bg-white border border-slate-200 space-y-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-2">
          <div>
            <h3 className="text-base sm:text-lg font-black text-slate-900">Estimated Environmental Impact</h3>
            <p className="text-xs text-slate-500">Conservative mass balance accounting (no unverified carbon claim speculation).</p>
          </div>
          <span className="text-xs font-mono text-emerald-800 font-bold bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full self-start sm:self-auto">
            Conservative Model
          </span>
        </div>

        {/* 3 Callouts */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-xs font-mono uppercase text-slate-500 font-bold">Avoided Virgin Polymer Extraction</span>
            <p className="text-2xl font-black text-emerald-700 font-mono mt-1">430 kg</p>
            <p className="text-xs text-slate-600 leading-relaxed pt-1">
              Displaces virgin naphtha-derived virgin polymers in secondary injection moulding.
            </p>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-xs font-mono uppercase text-slate-500 font-bold">Avoided Landfill Infilling</span>
            <p className="text-2xl font-black text-sky-700 font-mono mt-1">~1.85 m³</p>
            <p className="text-xs text-slate-600 leading-relaxed pt-1">
              Eliminates uncontrolled post-industrial polymer volume in municipal or industrial dump sites.
            </p>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-xs font-mono uppercase text-slate-500 font-bold">Net Economic Value Added</span>
            <p className="text-2xl font-black text-teal-700 font-mono mt-1">₹12,900</p>
            <p className="text-xs text-slate-600 leading-relaxed pt-1">
              Net value created by converting ₹8/kg raw scrap into ₹38/kg standard secondary flake.
            </p>
          </div>
        </div>
      </div>

      {/* Comparison Chart: Conventional Path vs re'source */}
      <div className="p-5 sm:p-8 rounded-3xl bg-white border border-slate-200 space-y-6 shadow-sm">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-base sm:text-lg font-black text-slate-900">Path Comparison: 500 kg Stream</h3>
            <p className="text-xs text-slate-500">Comparing conventional direct trucking against the re'source multi-stage protocol.</p>
          </div>
        </div>

        <div className="h-64 sm:h-72 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={comparisonData} margin={{ top: 10, right: 10, left: -10, bottom: 15 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="name" stroke="#64748b" fontSize={11} tickLine={false} />
              <YAxis stroke="#64748b" fontSize={11} tickLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                itemStyle={{ fontSize: '11px', fontFamily: 'monospace' }}
              />
              <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
              <Bar dataKey="conventional" name="Conventional Path (Direct Truck)" fill="#ef4444" radius={[4, 4, 0, 0]} />
              <Bar dataKey="missingMiddle" name="re'source Protocol (Preprocessed)" fill="#059669" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Methodology Modal */}
      {methodologyOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-lg w-full p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-black text-slate-900">Impact Calculation Methodology</h3>
              <button 
                onClick={() => setMethodologyOpen(false)}
                className="text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-700 leading-relaxed font-mono">
              <p>
                <strong>1. Virgin Material Substitution:</strong><br />
                Calculated on a conservative 1:1 mass basis only for the verified secondary flake output:
                <br />
                <span className="text-emerald-700 font-bold">Yield = Input (500 kg) &times; Separated Polymer Fraction (0.90) &times; Preprocessing Yield (0.955) = 430 kg</span>
              </p>
              <p>
                <strong>2. Carbon Disclaimers:</strong><br />
                We do NOT claim certified carbon offsets. Secondary material lifecycle emissions vary based on the Indian grid emission factor and specific extrusion equipment.
              </p>
              <p>
                <strong>3. Disposal Loss:</strong><br />
                Inert contaminants (paper labels, wash sediment, insoluble dirt) account for approximately 14% mass loss, safely routed to industrial disposal.
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setMethodologyOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs"
              >
                Close Methodology
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
