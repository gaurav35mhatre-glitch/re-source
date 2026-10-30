import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Route, 
  ArrowRight, 
  CheckCircle2, 
  XCircle, 
  Sliders, 
  MapPin, 
  Clock, 
  IndianRupee, 
  Trash2, 
  Sparkles,
  Layers,
  TrendingUp,
  Cpu
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { PROCESSING_ROUTER_DATA } from '../data/mockData';

export default function MaterialFlow() {
  const { t } = useLanguage();
  const { stages, totalJourney } = PROCESSING_ROUTER_DATA;

  return (
    <div className="space-y-8 sm:space-y-12 pb-20">
      {/* Page Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-700">
          <Route className="w-4 h-4" />
          <span>Processing Router &bull; Physical Pathway Synthesis</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-slate-900 mt-1 tracking-tight">
          {t('flowHeading') || 'Build My Material Path'}
        </h1>
        <p className="text-slate-600 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
          {t('flowSubtext') || 'Instead of dispatching a single truck directly to a distant recycler, the system plans a multi-stage physical processing journey that upgrades the material at local hubs.'}
        </p>
      </div>

      {/* CORE DIFFERENTIATOR SCREEN: MATERIAL JOURNEY vs TRUCK JOURNEY (SPLIT SCREEN) */}
      <section className="space-y-4">
        <div className="text-center space-y-1 mb-6">
          <span className="text-xs uppercase font-extrabold tracking-widest text-emerald-700">
            The Fundamental Paradigm Shift
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {t('flowQuote') || 'We optimize the MATERIAL, not just the TRUCK.'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto italic font-medium">
            {t('flowQuoteSub') || '« The objective isn\'t simply to transport waste faster. It is to increase the value and usability of what is transported. »'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {/* Conventional Approach */}
          <div className="p-5 sm:p-8 rounded-3xl bg-slate-50 border border-slate-200 space-y-5 shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <span className="text-xs uppercase font-extrabold text-slate-600">{t('conventionalApproach') || 'Conventional Approach'}</span>
              <span className="text-xs font-bold text-slate-600 bg-slate-200 px-2.5 py-0.5 rounded-full">DIRECT TRUCK</span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-white border border-slate-200 text-slate-800 shadow-xs flex justify-between">
                <span className="font-semibold">500 kg raw mixed plastic</span>
                <span className="text-slate-400">Generation</span>
              </div>
              <div className="text-center text-slate-400">↓</div>
              <div className="p-3 rounded-xl bg-white border border-slate-200 text-slate-800 shadow-xs flex justify-between">
                <span className="font-semibold">Direct Logistics Truck</span>
                <span className="text-slate-400">Single Haul (45 km)</span>
              </div>
              <div className="text-center text-slate-400">↓</div>
              <div className="p-3 rounded-xl bg-white border border-slate-200 text-slate-800 shadow-xs flex justify-between">
                <span className="font-semibold">Distant Secondary Extruder</span>
                <span className="text-slate-400">Technical Gate Inspection</span>
              </div>
              <div className="text-center text-slate-400">↓</div>
              <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-800 font-bold text-center">
                ❌ {t('rejectedAtGate') || 'Rejected at gate / Low-value landfilling'}
              </div>
            </div>

            <div className="text-xs text-slate-500 leading-relaxed pt-2 border-t border-slate-200">
              Optimizing only the vehicle moves contaminated waste faster without changing its economic viability.
            </div>
          </div>

          {/* Our Approach */}
          <div className="p-5 sm:p-8 rounded-3xl bg-white border-2 border-emerald-500 space-y-5 shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-xs uppercase font-extrabold text-emerald-800">{t('missingMiddleApproach') || "re'source Protocol"}</span>
              <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                MATERIAL JOURNEY
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-semibold flex justify-between">
                <span>500 kg raw mixed plastic</span>
                <span className="text-slate-400 text-[10px]">Rabale MSME</span>
              </div>
              <div className="text-center text-emerald-700 text-[10px] font-bold">↓ 01 &bull; Local Sorting (Rabale)</div>
              <div className="p-2.5 rounded-xl bg-emerald-50/60 text-emerald-900 border border-emerald-200 flex justify-between">
                <span className="font-semibold">Polymer separation (PET / HDPE isolate)</span>
                <span className="text-emerald-700 text-[10px] font-bold">Optical Sort</span>
              </div>
              <div className="text-center text-emerald-700 text-[10px] font-bold">↓ 02 &bull; Hot Wash & Centrifugal Dry</div>
              <div className="p-2.5 rounded-xl bg-emerald-50/60 text-emerald-900 border border-emerald-200 flex justify-between">
                <span className="font-semibold">Caustic decontamination (&lt; 1.2% moisture)</span>
                <span className="text-emerald-700 text-[10px] font-bold">Decontamination</span>
              </div>
              <div className="text-center text-emerald-700 text-[10px] font-bold">↓ 03 &bull; Granulation (Turbhe)</div>
              <div className="p-2.5 rounded-xl bg-emerald-50/60 text-emerald-900 border border-emerald-200 flex justify-between">
                <span className="font-semibold">Uniform 10 mm standardized flakes</span>
                <span className="text-emerald-700 text-[10px] font-bold">Granulation</span>
              </div>
              <div className="text-center text-emerald-700 text-[10px] font-bold">↓ 04 &bull; MSME Aggregation & Bulk Transit</div>
              <div className="p-3.5 rounded-xl bg-emerald-600 border border-emerald-600 text-white font-bold text-center text-xs shadow-xs">
                ✅ {t('usableSecondaryMaterial') || 'Resource-Ready secondary extrusion feedstock (430 kg)'}
              </div>
            </div>

            <div className="text-xs text-slate-700 leading-relaxed pt-2 border-t border-slate-100 font-medium">
              We upgrade the material's physical density, cleanliness, and specifications across local nodes.
            </div>
          </div>
        </div>
      </section>

      {/* INTERACTIVE PROCESSING ROUTER FLOW DIAGRAM */}
      <section className="p-5 sm:p-8 rounded-3xl bg-white border border-slate-200 space-y-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-base sm:text-lg font-black text-slate-900">Physical Processing Route Breakdown</h3>
            <p className="text-xs text-slate-500">Step-by-step transfer, stage duration, equipment capability, and processing cost.</p>
          </div>
          <span className="text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full self-start sm:self-auto">
            5 Transit Segments
          </span>
        </div>

        {/* Route Steps */}
        <div className="space-y-4">
          {stages.map((st, i) => (
            <div key={st.step} className="p-5 rounded-2xl bg-white border-2 border-slate-200 hover:border-slate-300 transition-all space-y-3 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-900 flex items-center justify-center text-xs font-black">
                    {st.step}
                  </span>
                  <span className="font-extrabold text-slate-900 text-base">{st.from}</span>
                  <ArrowRight className="w-4 h-4 text-emerald-600" />
                  <span className="font-extrabold text-emerald-800 text-base">{st.to}</span>
                </div>
                <span className="text-slate-700 font-extrabold text-sm bg-slate-100 px-3 py-1 rounded-xl border border-slate-200">{st.distanceKm} km leg</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-slate-100 text-sm">
                <div>
                  <span className="text-slate-500 block uppercase font-bold text-xs">Capability</span>
                  <span className="text-slate-900 font-bold">{st.capability}</span>
                </div>
                <div>
                  <span className="text-slate-500 block uppercase font-bold text-xs">Processing Capacity</span>
                  <span className="text-slate-900 font-bold">{st.capacity}</span>
                </div>
                <div>
                  <span className="text-slate-500 block uppercase font-bold text-xs">Est. Duration</span>
                  <span className="text-slate-900 font-bold">{st.timeEst}</span>
                </div>
                <div>
                  <span className="text-slate-500 block uppercase font-bold text-xs">Processing Cost</span>
                  <span className="text-emerald-700 font-extrabold text-base">{st.costEst}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Total Material Journey Summary Box */}
        <div className="p-6 sm:p-8 rounded-3xl bg-emerald-50/90 border-2 border-emerald-300 space-y-5 shadow-sm">
          <div className="flex items-center justify-between pb-3 border-b border-emerald-200 flex-wrap gap-2">
            <span className="text-sm uppercase font-black tracking-wider text-emerald-900">
              {t('materialJourneySummary') || 'Total Material Journey Audit'}
            </span>
            <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-lg">
              ✓ Synchronized MIDC Route
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 text-center">
            <div className="p-4 bg-white rounded-2xl border border-emerald-200 shadow-xs">
              <p className="text-xs text-slate-500 uppercase font-bold">Cumulative Transit</p>
              <p className="text-xl sm:text-2xl font-black text-slate-900 mt-1">{totalJourney.totalDistanceKm} km</p>
              <p className="text-xs text-slate-500 mt-0.5">3 Local MIDC stops</p>
            </div>

            <div className="p-4 bg-white rounded-2xl border border-emerald-200 shadow-xs">
              <p className="text-xs text-slate-500 uppercase font-bold">Prep Stages</p>
              <p className="text-xl sm:text-2xl font-black text-sky-700 mt-1">{totalJourney.processingStagesCount}</p>
              <p className="text-xs text-slate-500 mt-0.5">Sort &bull; Wash &bull; Shred</p>
            </div>

            <div className="p-4 bg-white rounded-2xl border border-emerald-200 shadow-xs">
              <p className="text-xs text-slate-500 uppercase font-bold">Processing Loss</p>
              <p className="text-xl sm:text-2xl font-black text-amber-700 mt-1">{totalJourney.estimatedProcessingLossPercent}%</p>
              <p className="text-xs text-slate-500 mt-0.5">70 kg dirt & labels</p>
            </div>

            <div className="p-4 bg-white rounded-2xl border border-emerald-200 shadow-xs">
              <p className="text-xs text-slate-500 uppercase font-bold">Secondary Output</p>
              <p className="text-xl sm:text-2xl font-black text-emerald-700 mt-1">{totalJourney.resourceReadyOutputKg} kg</p>
              <p className="text-xs text-slate-500 mt-0.5">Clean flakes</p>
            </div>

            <div className="col-span-2 sm:col-span-1 p-4 bg-white rounded-2xl border border-emerald-200 shadow-xs">
              <p className="text-xs text-slate-500 uppercase font-bold">Logistics + Prep Cost</p>
              <p className="text-xl sm:text-2xl font-black text-teal-700 mt-1">₹{totalJourney.estimatedLogisticsProcessingCostINR?.toLocaleString()}</p>
              <p className="text-xs text-slate-500 mt-0.5">Total unit expenditure</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
