import React from 'react';

const SECTOR_CLASSES = {
  'Automotive': 'bg-blue-500/15 text-blue-400 border-blue-500/30',
  'Chemicals': 'bg-red-500/15 text-red-400 border-red-500/30',
  'Pharmaceuticals': 'bg-purple-500/15 text-purple-400 border-purple-500/30',
  'Textiles': 'bg-pink-500/15 text-pink-400 border-pink-500/30',
  'Food Processing': 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
  'Foundry & Metallurgy': 'bg-amber-500/15 text-amber-400 border-amber-500/30',
  'Petrochemicals': 'bg-indigo-500/15 text-indigo-400 border-indigo-500/30',
  'Agro-Processing': 'bg-lime-500/15 text-lime-400 border-lime-500/30',
  'FMCG & Packaging': 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30',
  'Cement & Building Materials': 'bg-stone-500/15 text-stone-300 border-stone-500/30',
  'Construction & Aggregates': 'bg-amber-600/15 text-amber-300 border-amber-600/30',
  'Power & Energy': 'bg-orange-500/15 text-orange-400 border-orange-500/30',
  'Solvent Recovery': 'bg-teal-500/15 text-teal-400 border-teal-500/30'
};

export function SectorBadge({ sector, className = '' }) {
  const colorClass = SECTOR_CLASSES[sector] || 'bg-slate-700/30 text-slate-300 border-slate-600/40';
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${colorClass} ${className}`}>
      {sector || 'Industry'}
    </span>
  );
}

export function ClusterBadge({ cluster, className = '' }) {
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-mono bg-slate-800/80 text-slate-300 border border-slate-700/60 ${className}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
      {cluster || 'MIDC Cluster'}
    </span>
  );
}

export function HiddenMatchBadge({ className = '' }) {
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-gradient-to-r from-violet-500/20 via-purple-500/20 to-pink-500/20 text-purple-300 border border-purple-500/40 shadow-sm shadow-purple-500/10 ${className}`}>
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
      </span>
      Hidden / Cross-Sector
    </span>
  );
}

export function RegulatoryBadge({ text = 'MPCB Authorization Required', className = '' }) {
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium bg-amber-500/15 text-amber-300 border border-amber-500/30 ${className}`}>
      ⚠️ {text}
    </span>
  );
}
