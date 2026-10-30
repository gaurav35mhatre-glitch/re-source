import React, { useState, useRef, useEffect } from 'react';
import { useCompany } from '../context/CompanyContext';
import { SectorBadge, ClusterBadge } from './Badge';
import { Building2, ChevronDown, Check, ShieldCheck } from 'lucide-react';

export default function CompanySelector() {
  const { companies, activeCompany, setActiveCompany, loading } = useCompany();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (loading || !activeCompany) {
    return (
      <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg text-sm text-slate-400">
        <Building2 className="w-4 h-4 animate-pulse text-emerald-400" />
        <span>Loading companies...</span>
      </div>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 bg-slate-900/90 hover:bg-slate-850 border border-slate-700/80 hover:border-emerald-500/50 px-3.5 py-2 rounded-xl text-left transition-all shadow-sm"
        title="Switch simulated company"
      >
        <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold shrink-0">
          {activeCompany.name?.charAt(0) || 'C'}
        </div>
        <div className="flex flex-col min-w-0 pr-1">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Viewing As:</span>
            {activeCompany.verified && (
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" title="Verified Maharashtra Industrial Unit" />
            )}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-white truncate max-w-[170px] sm:max-w-[210px]">
              {activeCompany.name}
            </span>
            <SectorBadge sector={activeCompany.industry?.sector} />
          </div>
        </div>
        <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180 text-emerald-400' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl z-50 overflow-hidden divide-y divide-slate-800">
          <div className="p-3 bg-slate-950/60">
            <p className="text-xs font-medium text-slate-400">
              Select any of the 12 seeded Maharashtra companies to view their custom dashboard, resources, requirements, and opportunities.
            </p>
          </div>
          <div className="max-h-96 overflow-y-auto p-1.5 space-y-1">
            {companies.map(company => {
              const isSelected = company._id === activeCompany._id;
              return (
                <button
                  key={company._id}
                  onClick={() => {
                    setActiveCompany(company);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-start gap-2.5 p-2.5 rounded-lg text-left transition-colors ${
                    isSelected
                      ? 'bg-emerald-500/15 border border-emerald-500/40'
                      : 'hover:bg-slate-800/80 border border-transparent'
                  }`}
                >
                  <div className={`w-7 h-7 rounded-md flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${
                    isSelected ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-300'
                  }`}>
                    {company.name?.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <span className={`text-sm font-semibold truncate ${isSelected ? 'text-emerald-300 font-bold' : 'text-slate-100'}`}>
                        {company.name}
                      </span>
                      {isSelected && <Check className="w-4 h-4 text-emerald-400 shrink-0" />}
                    </div>
                    <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                      <SectorBadge sector={company.industry?.sector} />
                      <ClusterBadge cluster={company.location?.midcCluster} />
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
