import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Boxes, 
  ArrowRight, 
  TrendingUp, 
  CheckCircle2, 
  Layers, 
  Truck, 
  IndianRupee, 
  MapPin, 
  Sparkles, 
  Sliders 
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { AGGREGATION_STREAMS } from '../data/mockData';

export default function Aggregation() {
  const { t } = useLanguage();
  const [activeStreams, setActiveStreams] = useState(AGGREGATION_STREAMS);

  const totalRawKg = activeStreams.reduce((acc, s) => acc + s.quantityKg, 0);
  const totalTonnes = (totalRawKg / 1000).toFixed(1);

  // Economic comparison calculations:
  // Individual sub-scale transport: ~₹18/kg freight + dumping fee
  // Aggregated bulk freight: ~₹4.20/kg
  // Raw scrap value: ~₹8/kg
  // Standardized secondary flake value: ~₹38/kg
  const unaggregatedCost = Math.round(totalRawKg * 18);
  const aggregatedCost = Math.round(totalRawKg * 4.2);
  const secondaryMarketValue = Math.round(totalRawKg * 0.86 * 38);

  const toggleStream = (id) => {
    setActiveStreams(prev => {
      const exists = prev.some(s => s.id === id);
      if (exists) {
        if (prev.length <= 1) return prev; // Keep at least one
        return prev.filter(s => s.id !== id);
      } else {
        const item = AGGREGATION_STREAMS.find(s => s.id === id);
        return [...prev, item];
      }
    });
  };

  return (
    <div className="space-y-6 sm:space-y-10 pb-16">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-700">
          <Boxes className="w-4 h-4" />
          <span>Aggregation Engine &bull; MSME Economic Viability</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-slate-900 mt-1 tracking-tight">
          {t('aggHeading') || 'Small streams become viable when aggregated.'}
        </h1>
        <p className="text-slate-600 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
          {t('aggSubtext') || 'In fragmented industrial zones like Rabale and Taloja, individual factories generate only 200–500 kg/month. By synchronizing localized collection and preprocessing, sub-scale scrap transforms into bulk industrial lots.'}
        </p>
      </div>

      {/* Standout Philosophy Callout */}
      <div className="p-4 sm:p-6 rounded-2xl bg-purple-50/70 border border-purple-200 shadow-sm">
        <p className="text-base sm:text-lg font-black text-slate-900 leading-snug">
          {t('aggQuote') || '« Small waste streams become a viable industrial input when aggregated. »'}
        </p>
        <p className="text-xs text-slate-600 mt-1.5">
          Instead of four separate inefficient truck journeys carrying half-empty loads of mixed scrap, we coordinate shared pre-processing and single bulk delivery.
        </p>
      </div>

      {/* Interactive Aggregator Builder */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
        {/* Left: Input MSME Facilities (6 cols) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-2 border-b border-slate-200">
            <span className="text-xs font-bold uppercase text-slate-600">
              {t('nearbyGenerators') || 'Nearby Fragmented MSME Generators:'}
            </span>
            <span className="text-xs text-emerald-700 font-bold">
              {activeStreams.length} of {AGGREGATION_STREAMS.length} Active in Cluster
            </span>
          </div>

          <div className="space-y-2.5 sm:space-y-3">
            {AGGREGATION_STREAMS.map(st => {
              const isIncluded = activeStreams.some(s => s.id === st.id);
              return (
                <div
                  key={st.id}
                  onClick={() => toggleStream(st.id)}
                  className={`p-3.5 sm:p-4 rounded-2xl cursor-pointer transition-all border flex items-center justify-between gap-3 shadow-xs ${
                    isIncluded
                      ? 'bg-white border-2 border-purple-600 shadow-sm'
                      : 'bg-slate-50 border-slate-200 opacity-60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${
                      isIncluded ? 'bg-purple-600 text-white' : 'bg-slate-200 text-slate-500'
                    }`}>
                      {st.id}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{st.name}</h4>
                      <p className="text-xs text-slate-500">{st.location} &bull; {st.distance} to hub</p>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-sm font-black text-slate-900 block">
                      {st.quantityKg} kg
                    </span>
                    <span className={`text-[10px] uppercase font-bold ${isIncluded ? 'text-purple-700' : 'text-slate-400'}`}>
                      {isIncluded ? 'Synced' : 'Excluded'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <p className="text-xs text-slate-500 italic">
            * Click any MSME generator to toggle inclusion in the regional aggregation batch.
          </p>
        </div>

        {/* Right: Aggregated Output & Economics (6 cols) */}
        <div className="lg:col-span-6 space-y-6">
          <div className="p-5 sm:p-7 rounded-3xl bg-white border border-slate-200 space-y-6 shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-xs uppercase font-extrabold text-emerald-800">
                {t('consolidatedBatch') || 'Consolidated Batch Result'}
              </span>
              <span className="text-xs text-slate-500 font-bold">
                Rabale Aggregation Hub
              </span>
            </div>

            {/* Big Aggregate Number */}
            <div className="text-center p-5 sm:p-6 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-1">
              <p className="text-xs uppercase text-emerald-800 font-bold">{t('totalSynchronizedVolume') || 'Total Synchronized Volume'}</p>
              <p className="text-3xl sm:text-5xl font-black text-emerald-800 tracking-tight">
                {totalRawKg.toLocaleString()} <span className="text-base sm:text-lg font-normal text-slate-600">kg/month</span>
              </p>
              <p className="text-xs sm:text-sm font-bold text-slate-800 mt-1">
                = {totalTonnes} tonnes/month standardized secondary lot
              </p>
            </div>

            {/* Economic Impact Comparison */}
            <div className="space-y-3 pt-1">
              <h4 className="text-xs uppercase font-bold text-slate-600">
                Logistics & Economic Transformation:
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-xl bg-red-50/80 border border-red-200 space-y-1">
                  <span className="text-[10px] text-red-700 uppercase font-bold">4 Unaggregated Trips</span>
                  <p className="text-base font-bold text-slate-900">₹{unaggregatedCost.toLocaleString()}</p>
                  <p className="text-[10px] text-slate-600">₹18/kg fragmented transport</p>
                </div>

                <div className="p-3.5 rounded-xl bg-emerald-50/80 border border-emerald-200 space-y-1">
                  <span className="text-[10px] text-emerald-800 uppercase font-bold">1 Shared Bulk Haul</span>
                  <p className="text-base font-bold text-emerald-800">₹{aggregatedCost.toLocaleString()}</p>
                  <p className="text-[10px] text-slate-600">₹4.20/kg consolidated freight</p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-purple-50/80 border border-purple-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                <div>
                  <span className="text-purple-900 font-bold block">Secondary Flake Market Realization:</span>
                  <span className="text-slate-600 text-[11px]">Upgraded from ₹8/kg raw scrap to ₹38/kg clean flakes</span>
                </div>
                <span className="text-base font-black text-purple-900 shrink-0">
                  ₹{secondaryMarketValue.toLocaleString()}
                </span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-end">
              <Link
                to="/passport"
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-sm flex items-center justify-center gap-1.5"
              >
                <span>{t('passportHeading') || 'View Secondary Material Passport'}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
