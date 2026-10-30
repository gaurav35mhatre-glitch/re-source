import React, { useState, useEffect } from 'react';
import { useCompany } from '../context/CompanyContext';
import { fetchMatches, recomputeMatches } from '../services/api';
import MatchCard from '../components/MatchCard';
import { 
  Sparkles, 
  Filter, 
  RotateCw, 
  SlidersHorizontal, 
  Search, 
  Layers, 
  CheckCircle2, 
  Compass,
  ArrowUpDown
} from 'lucide-react';
import { HiddenMatchBadge } from '../components/Badge';

export default function Opportunities() {
  const { activeCompany } = useCompany();
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [recomputing, setRecomputing] = useState(false);

  // Filters
  const [selectedSector, setSelectedSector] = useState('');
  const [maxDistance, setMaxDistance] = useState('');
  const [minScore, setMinScore] = useState('50');
  const [hiddenOnly, setHiddenOnly] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const loadOpportunities = async () => {
    if (!activeCompany) return;
    try {
      setLoading(true);
      const params = {
        companyId: activeCompany._id,
        sector: selectedSector || undefined,
        maxDistance: maxDistance || undefined,
        minScore: minScore || undefined,
        isCrossSector: hiddenOnly ? 'true' : undefined
      };
      const data = await fetchMatches(params);
      setMatches(data);
    } catch (err) {
      console.error('Error fetching opportunities:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOpportunities();
  }, [activeCompany, selectedSector, maxDistance, minScore, hiddenOnly]);

  const handleRecompute = async () => {
    try {
      setRecomputing(true);
      await recomputeMatches();
      await loadOpportunities();
    } catch (err) {
      alert(`Recompute error: ${err.message}`);
    } finally {
      setRecomputing(false);
    }
  };

  // Client-side text search filter
  const filteredMatches = matches.filter(m => {
    if (!searchTerm.trim()) return true;
    const term = searchTerm.toLowerCase();
    const matName = m.resource?.material?.name?.toLowerCase() || '';
    const srcComp = m.resource?.company?.name?.toLowerCase() || '';
    const reqComp = m.requirement?.company?.name?.toLowerCase() || '';
    return matName.includes(term) || srcComp.includes(term) || reqComp.includes(term);
  });

  const hiddenCount = matches.filter(m => m.isCrossSector).length;
  const sectorsList = [
    'Automotive',
    'Chemicals',
    'Pharmaceuticals',
    'Textiles',
    'Food Processing',
    'Foundry & Metallurgy',
    'Petrochemicals',
    'Agro-Processing',
    'FMCG & Packaging',
    'Cement & Building Materials',
    'Construction & Aggregates',
    'Power & Energy',
    'Solvent Recovery'
  ];

  return (
    <div className="space-y-8 pb-16">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-purple-400">
            <Sparkles className="w-4 h-4" />
            <span>Algorithmic Symbiosis Feed</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white mt-1">
            Opportunities for {activeCompany?.name}
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Ranked pairings where your output byproducts meet external demands, or external outputs fulfill your raw material needs.
          </p>
        </div>

        <button
          onClick={handleRecompute}
          disabled={recomputing}
          className="self-start sm:self-auto px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-semibold text-xs border border-slate-700 transition-colors flex items-center gap-2 disabled:opacity-50 shadow-sm"
        >
          <RotateCw className={`w-3.5 h-3.5 ${recomputing ? 'animate-spin text-emerald-400' : ''}`} />
          <span>{recomputing ? 'Recalculating...' : 'Re-Run Matching Engine'}</span>
        </button>
      </div>

      {/* Filter & Controls Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-lg">
        <div className="flex items-center justify-between flex-wrap gap-2 pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
            <SlidersHorizontal className="w-4 h-4 text-emerald-400" />
            <span>Filter & Refine Pairings</span>
          </div>

          {/* Quick hidden toggle */}
          <button
            onClick={() => setHiddenOnly(!hiddenOnly)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
              hiddenOnly
                ? 'bg-purple-600 text-white border-purple-400 shadow-md shadow-purple-500/20'
                : 'bg-slate-800 text-slate-300 border-slate-700 hover:border-purple-500/50'
            }`}
          >
            <span className="relative flex h-2 w-2">
              <span className={`inline-flex rounded-full h-2 w-2 ${hiddenOnly ? 'bg-white' : 'bg-purple-400'}`}></span>
            </span>
            <span>Show Hidden / Cross-Sector Matches Only</span>
            <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${hiddenOnly ? 'bg-purple-800 text-white' : 'bg-slate-700 text-purple-300'}`}>
              {hiddenCount}
            </span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Search box */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
            <input
              type="text"
              placeholder="Search material or company..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-emerald-500"
            />
          </div>

          {/* Sector filter */}
          <div>
            <select
              value={selectedSector}
              onChange={(e) => setSelectedSector(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:border-emerald-500"
            >
              <option value="">All Counterpart Sectors</option>
              {sectorsList.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          {/* Max Distance */}
          <div>
            <select
              value={maxDistance}
              onChange={(e) => setMaxDistance(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:border-emerald-500"
            >
              <option value="">Max Distance: Any (up to 300 km)</option>
              <option value="50">Within 50 km (Cluster Proximity)</option>
              <option value="100">Within 100 km</option>
              <option value="180">Within 180 km</option>
              <option value="250">Within 250 km</option>
            </select>
          </div>

          {/* Min Score */}
          <div>
            <select
              value={minScore}
              onChange={(e) => setMinScore(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:border-emerald-500"
            >
              <option value="50">Min Score: 50%+ (Viable Matches)</option>
              <option value="70">Min Score: 70%+ (Strong Synergy)</option>
              <option value="80">Min Score: 80%+ (Tier-1 Matches)</option>
            </select>
          </div>
        </div>

        {/* Filter Badges summary */}
        <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
          <span>Found <strong className="text-white">{filteredMatches.length}</strong> viable symbiosis opportunities</span>
          {(selectedSector || maxDistance || minScore !== '50' || hiddenOnly || searchTerm) && (
            <button
              onClick={() => {
                setSelectedSector('');
                setMaxDistance('');
                setMinScore('50');
                setHiddenOnly(false);
                setSearchTerm('');
              }}
              className="text-emerald-400 hover:text-emerald-300 font-semibold"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Matches Feed */}
      {loading ? (
        <div className="p-12 text-center bg-slate-900 border border-slate-800 rounded-3xl">
          <div className="inline-block w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-3 text-sm text-slate-300 font-medium">Filtering industrial opportunities...</p>
        </div>
      ) : filteredMatches.length > 0 ? (
        <div className="space-y-4">
          {filteredMatches.map(match => (
            <MatchCard
              key={match._id}
              match={match}
              activeCompanyId={activeCompany._id}
              onStatusUpdate={(id, status) => {
                setMatches(prev => prev.map(m => m._id === id ? { ...m, status } : m));
              }}
            />
          ))}
        </div>
      ) : (
        <div className="p-12 text-center bg-slate-900/60 border border-slate-800 rounded-3xl space-y-3">
          <Layers className="w-10 h-10 text-slate-600 mx-auto" />
          <h3 className="text-base font-bold text-white">No matching opportunities found</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Try lowering your minimum score threshold or broadening distance and sector criteria.
          </p>
          <button
            onClick={() => {
              setSelectedSector('');
              setMaxDistance('');
              setMinScore('50');
              setHiddenOnly(false);
              setSearchTerm('');
            }}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold"
          >
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
}
