import React from 'react';

export default function StatCard({ title, value, unit = '', subtext, icon: Icon, color = 'emerald' }) {
  const colorMap = {
    emerald: 'from-emerald-500/10 to-teal-500/5 border-emerald-500/30 text-emerald-400',
    blue: 'from-blue-500/10 to-cyan-500/5 border-blue-500/30 text-blue-400',
    purple: 'from-purple-500/10 to-pink-500/5 border-purple-500/30 text-purple-400',
    amber: 'from-amber-500/10 to-orange-500/5 border-amber-500/30 text-amber-400',
  };

  const scheme = colorMap[color] || colorMap.emerald;

  return (
    <div className={`relative overflow-hidden bg-gradient-to-br ${scheme} border rounded-2xl p-5 shadow-lg`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{title}</p>
          <div className="mt-2 flex items-baseline gap-1.5">
            <span className="text-3xl font-extrabold text-white tracking-tight">{value}</span>
            {unit && <span className="text-sm font-semibold text-slate-400">{unit}</span>}
          </div>
          {subtext && <p className="mt-1 text-xs text-slate-400">{subtext}</p>}
        </div>
        {Icon && (
          <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 shrink-0">
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>
    </div>
  );
}
