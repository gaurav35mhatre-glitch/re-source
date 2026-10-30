import React, { useState } from 'react';
import { SectorBadge, ClusterBadge, HiddenMatchBadge, RegulatoryBadge } from './Badge';
import { 
  Sparkles, 
  ArrowRight, 
  MapPin, 
  CheckCircle2, 
  ShieldCheck, 
  Leaf, 
  IndianRupee, 
  Trash2,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { updateMatchStatus } from '../services/api';

export default function MatchCard({ match, activeCompanyId, onStatusUpdate }) {
  const [expanded, setExpanded] = useState(false);
  const [updating, setUpdating] = useState(false);

  const isProvider = match.resource?.company?._id === activeCompanyId;
  const counterpartCompany = isProvider ? match.requirement?.company : match.resource?.company;
  const materialName = match.resource?.material?.name || 'Industrial Material';
  const roleLabel = isProvider ? 'Offtaker / Consumer' : 'Source Supplier';

  const handleAction = async (newStatus) => {
    try {
      setUpdating(true);
      await updateMatchStatus(match._id, newStatus);
      if (onStatusUpdate) onStatusUpdate(match._id, newStatus);
    } catch (err) {
      alert(`Could not update status: ${err.message}`);
    } finally {
      setUpdating(false);
    }
  };

  // Score color formatting
  const getScoreColor = (score) => {
    if (score >= 85) return 'text-emerald-400 border-emerald-500/50 bg-emerald-500/10 shadow-emerald-500/20';
    if (score >= 70) return 'text-cyan-400 border-cyan-500/50 bg-cyan-500/10 shadow-cyan-500/20';
    return 'text-amber-400 border-amber-500/50 bg-amber-500/10 shadow-amber-500/20';
  };

  return (
    <div className={`relative rounded-2xl border transition-all duration-200 overflow-hidden ${
      match.isCrossSector
        ? 'bg-slate-900/90 border-purple-500/40 hover:border-purple-500/70 shadow-lg shadow-purple-950/20'
        : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 shadow-md'
    }`}>
      {/* Top Banner if Cross-Sector or Regulated */}
      <div className="px-5 pt-4 pb-2 flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2 flex-wrap">
          {match.isCrossSector && <HiddenMatchBadge />}
          {match.requiresRegulatoryCheck && (
            <RegulatoryBadge text="Regulated Hazardous Transfer" />
          )}
          {match.status === 'connected' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
              <CheckCircle2 className="w-3.5 h-3.5" /> Handshake Connected
            </span>
          )}
        </div>

        {/* Symbiosis Score Badge */}
        <div className={`flex items-center gap-1.5 px-3 py-1 rounded-xl border font-bold text-sm shadow-sm ${getScoreColor(match.score)}`}>
          <Sparkles className="w-3.5 h-3.5" />
          <span>{match.score}</span>
          <span className="text-xs opacity-75 font-normal">/ 100</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-5 pt-2">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Material & Trade Details */}
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
              <span>{roleLabel}:</span>
              <span className="text-emerald-400 font-bold">{counterpartCompany?.name}</span>
            </div>

            <h3 className="text-lg font-bold text-white mt-1 flex items-center gap-2">
              <span>{materialName}</span>
              <ArrowRight className="w-4 h-4 text-slate-500" />
              <span className="text-slate-300 text-sm font-medium">
                {isProvider ? 'Outbound valorization' : 'Inbound virgin substitute'}
              </span>
            </h3>

            <div className="flex items-center gap-2 mt-2 flex-wrap">
              <SectorBadge sector={counterpartCompany?.industry?.sector} />
              <ClusterBadge cluster={counterpartCompany?.location?.midcCluster} />
              <span className="inline-flex items-center gap-1 text-xs text-slate-400 font-mono">
                <MapPin className="w-3 h-3 text-slate-500" />
                {match.distanceKm} km transit
              </span>
            </div>
          </div>

          {/* Impact Quick Pills */}
          <div className="grid grid-cols-3 gap-2 bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80 text-center shrink-0">
            <div>
              <p className="text-[10px] uppercase font-semibold text-slate-400 flex items-center justify-center gap-0.5">
                <Trash2 className="w-3 h-3 text-amber-400" /> Diverted
              </p>
              <p className="text-xs font-bold text-white mt-0.5">
                {Math.round((match.impact?.wasteDivertedKg || 0) / 1000)} <span className="text-[10px] text-slate-400">tons</span>
              </p>
            </div>
            <div className="border-x border-slate-800 px-2">
              <p className="text-[10px] uppercase font-semibold text-slate-400 flex items-center justify-center gap-0.5">
                <Leaf className="w-3 h-3 text-emerald-400" /> CO₂eq
              </p>
              <p className="text-xs font-bold text-emerald-400 mt-0.5">
                {Math.round((match.impact?.co2SavedKg || 0) / 1000)} <span className="text-[10px] text-slate-400">t</span>
              </p>
            </div>
            <div>
              <p className="text-[10px] uppercase font-semibold text-slate-400 flex items-center justify-center gap-0.5">
                <IndianRupee className="w-3 h-3 text-teal-400" /> Savings
              </p>
              <p className="text-xs font-bold text-teal-300 mt-0.5">
                ₹{((match.impact?.costSavedINR || 0) / 1000).toFixed(0)}k
              </p>
            </div>
          </div>
        </div>

        {/* AI Plain-English Rationale */}
        <div className="mt-4 p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/80">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-purple-400 mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Symbiosis Rationale:</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {match.aiExplanation}
          </p>
        </div>

        {/* Expandable Factor Breakdown */}
        {expanded && (
          <div className="mt-4 pt-4 border-t border-slate-800 space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">5-Factor Algorithm Breakdown</p>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Compatibility</span>
                  <span className="font-mono text-emerald-400 font-bold">{Math.round((match.breakdown?.compatibility || 0) * 100)}%</span>
                </div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full mt-1.5 overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${(match.breakdown?.compatibility || 0) * 100}%` }}></div>
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Quantity</span>
                  <span className="font-mono text-blue-400 font-bold">{Math.round((match.breakdown?.quantity || 0) * 100)}%</span>
                </div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full mt-1.5 overflow-hidden">
                  <div className="bg-blue-500 h-full rounded-full" style={{ width: `${(match.breakdown?.quantity || 0) * 100}%` }}></div>
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Distance</span>
                  <span className="font-mono text-purple-400 font-bold">{Math.round((match.breakdown?.distance || 0) * 100)}%</span>
                </div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full mt-1.5 overflow-hidden">
                  <div className="bg-purple-500 h-full rounded-full" style={{ width: `${(match.breakdown?.distance || 0) * 100}%` }}></div>
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Frequency</span>
                  <span className="font-mono text-amber-400 font-bold">{Math.round((match.breakdown?.frequency || 0) * 100)}%</span>
                </div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full mt-1.5 overflow-hidden">
                  <div className="bg-amber-500 h-full rounded-full" style={{ width: `${(match.breakdown?.frequency || 0) * 100}%` }}></div>
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 col-span-2 sm:col-span-1">
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Compliance</span>
                  <span className="font-mono text-teal-400 font-bold">{Math.round((match.breakdown?.verification || 0) * 100)}%</span>
                </div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full mt-1.5 overflow-hidden">
                  <div className="bg-teal-500 h-full rounded-full" style={{ width: `${(match.breakdown?.verification || 0) * 100}%` }}></div>
                </div>
              </div>
            </div>

            <div className="text-xs text-slate-400 flex items-center justify-between">
              <span>Counterpart Contact: <span className="text-slate-200 font-mono">{counterpartCompany?.contactEmail || 'N/A'}</span></span>
              <span>Address: <span className="text-slate-300">{counterpartCompany?.location?.address}</span></span>
            </div>
          </div>
        )}

        {/* Footer Actions */}
        <div className="mt-4 flex items-center justify-between pt-3 border-t border-slate-800/80">
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-1 text-xs text-slate-400 hover:text-slate-200 font-medium transition-colors"
          >
            {expanded ? (
              <><span>Hide score factors</span><ChevronUp className="w-3.5 h-3.5" /></>
            ) : (
              <><span>View score factors & contact</span><ChevronDown className="w-3.5 h-3.5" /></>
            )}
          </button>

          <div className="flex items-center gap-2">
            {match.status !== 'connected' ? (
              <button
                disabled={updating}
                onClick={() => handleAction('connected')}
                className="px-3.5 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-colors flex items-center gap-1.5 shadow-sm shadow-emerald-500/20 disabled:opacity-50"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                Initiate Symbiotic Trade
              </button>
            ) : (
              <button
                disabled={updating}
                onClick={() => handleAction('suggested')}
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium text-xs transition-colors disabled:opacity-50"
              >
                Reset Status
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
