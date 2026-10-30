import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCompany } from '../context/CompanyContext';
import { fetchResources, fetchRequirements, fetchMatches } from '../services/api';
import StatCard from '../components/StatCard';
import MatchCard from '../components/MatchCard';
import { SectorBadge, ClusterBadge } from '../components/Badge';
import { 
  Building2, 
  PlusCircle, 
  ArrowRight, 
  Package, 
  ShoppingCart, 
  Sparkles, 
  ShieldCheck, 
  MapPin, 
  Mail,
  Recycle,
  CheckCircle2,
  Trash2,
  Leaf,
  IndianRupee
} from 'lucide-react';

export default function Dashboard() {
  const { activeCompany, loading: companyLoading } = useCompany();
  const [resources, setResources] = useState([]);
  const [requirements, setRequirements] = useState([]);
  const [topMatches, setTopMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadDashboardData = async () => {
    if (!activeCompany) return;
    try {
      setLoading(true);
      const [resData, reqData, matchData] = await Promise.all([
        fetchResources(activeCompany._id),
        fetchRequirements(activeCompany._id),
        fetchMatches({ companyId: activeCompany._id, limit: 3 })
      ]);
      setResources(resData);
      setRequirements(reqData);
      setTopMatches(matchData);
    } catch (err) {
      console.error('Error loading dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, [activeCompany]);

  if (companyLoading || !activeCompany) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-400 font-medium">Loading industrial dashboard...</p>
        </div>
      </div>
    );
  }

  // Calculate local company impact stats
  const totalDiverted = topMatches.reduce((acc, m) => acc + (m.impact?.wasteDivertedKg || 0), 0) / 1000;
  const totalCo2 = topMatches.reduce((acc, m) => acc + (m.impact?.co2SavedKg || 0), 0) / 1000;
  const totalSavings = topMatches.reduce((acc, m) => acc + (m.impact?.costSavedINR || 0), 0);

  return (
    <div className="space-y-8 pb-12">
      {/* Active Company Hero Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-400 p-0.5 shadow-lg shadow-emerald-500/20 shrink-0">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center font-extrabold text-2xl text-emerald-400">
                {activeCompany.name?.charAt(0)}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {activeCompany.name}
                </h1>
                {activeCompany.verified && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                    <ShieldCheck className="w-3.5 h-3.5" /> MPCB Verified
                  </span>
                )}
              </div>

              <div className="flex items-center gap-3 mt-2 flex-wrap text-sm text-slate-400">
                <SectorBadge sector={activeCompany.industry?.sector} />
                <ClusterBadge cluster={activeCompany.location?.midcCluster} />
                <span className="flex items-center gap-1 font-mono text-xs">
                  <MapPin className="w-3.5 h-3.5 text-slate-500" />
                  {activeCompany.location?.address}
                </span>
                <span className="flex items-center gap-1 font-mono text-xs">
                  <Mail className="w-3.5 h-3.5 text-slate-500" />
                  {activeCompany.contactEmail}
                </span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-3 w-full lg:w-auto">
            <Link
              to="/add-resource"
              className="flex-1 lg:flex-none px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm transition-colors flex items-center justify-center gap-2 shadow-md shadow-emerald-500/20"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Log Resource / Need</span>
            </Link>

            <Link
              to="/opportunities"
              className="flex-1 lg:flex-none px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm border border-slate-700 transition-colors flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span>All Opportunities</span>
            </Link>
          </div>
        </div>

        {/* Company Quick Impact Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-slate-800/80">
          <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
            <p className="text-xs font-semibold uppercase text-slate-400 flex items-center gap-1.5">
              <Package className="w-3.5 h-3.5 text-emerald-400" /> Output Streams
            </p>
            <p className="text-2xl font-bold text-white mt-1">{resources.length}</p>
          </div>

          <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
            <p className="text-xs font-semibold uppercase text-slate-400 flex items-center gap-1.5">
              <ShoppingCart className="w-3.5 h-3.5 text-blue-400" /> Inbound Needs
            </p>
            <p className="text-2xl font-bold text-white mt-1">{requirements.length}</p>
          </div>

          <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
            <p className="text-xs font-semibold uppercase text-slate-400 flex items-center gap-1.5">
              <Leaf className="w-3.5 h-3.5 text-emerald-400" /> Potential CO₂ Cut
            </p>
            <p className="text-2xl font-bold text-emerald-400 mt-1">{totalCo2.toFixed(1)} <span className="text-xs font-normal text-slate-400">t</span></p>
          </div>

          <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
            <p className="text-xs font-semibold uppercase text-slate-400 flex items-center gap-1.5">
              <IndianRupee className="w-3.5 h-3.5 text-teal-400" /> Potential Savings
            </p>
            <p className="text-2xl font-bold text-teal-300 mt-1">₹{(totalSavings / 1000).toFixed(0)}k</p>
          </div>
        </div>
      </div>

      {/* Top 3 Matches Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-400" />
              <span>Top 3 Symbiosis Matches</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Highest scoring partners calculated by compatibility, quantity, distance, cadence, and regulatory status.
            </p>
          </div>

          <Link
            to="/opportunities"
            className="text-xs sm:text-sm font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
          >
            <span>View all opportunities</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {loading ? (
          <div className="p-8 text-center bg-slate-900 border border-slate-800 rounded-2xl">
            <div className="inline-block w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-2 text-xs text-slate-400">Evaluating multi-sector matches...</p>
          </div>
        ) : topMatches.length > 0 ? (
          <div className="grid grid-cols-1 gap-4">
            {topMatches.map(match => (
              <MatchCard
                key={match._id}
                match={match}
                activeCompanyId={activeCompany._id}
                onStatusUpdate={(id, status) => {
                  setTopMatches(prev => prev.map(m => m._id === id ? { ...m, status } : m));
                }}
              />
            ))}
          </div>
        ) : (
          <div className="p-8 text-center bg-slate-900/60 border border-slate-800 rounded-2xl">
            <p className="text-slate-300 font-medium">No matches computed yet.</p>
            <p className="text-xs text-slate-500 mt-1">Add output resources or input needs to trigger the matching engine.</p>
          </div>
        )}
      </div>

      {/* Two Column Layout: Company Resources vs Requirements */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Output Resources */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Package className="w-5 h-5 text-emerald-400" />
              <h3 className="font-bold text-lg text-white">Active Resources (Outputs)</h3>
            </div>
            <Link
              to="/add-resource"
              className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Add Output</span>
            </Link>
          </div>

          {resources.length === 0 ? (
            <p className="text-xs text-slate-500 italic py-4">No active output resources logged yet.</p>
          ) : (
            <div className="space-y-3">
              {resources.map(res => (
                <div key={res._id} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white text-sm">{res.material?.name}</span>
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold">
                      {res.quantity} {res.unit} / {res.frequency}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">{res.qualitySpec || 'Standard grade industrial byproduct'}</p>
                  {res.aiSuggestedUses && res.aiSuggestedUses.length > 0 && (
                    <div className="pt-2 border-t border-slate-900 flex flex-wrap gap-1">
                      <span className="text-[10px] text-purple-400 font-semibold uppercase">AI Pathways:</span>
                      {res.aiSuggestedUses.slice(0, 2).map((use, i) => (
                        <span key={i} className="text-[11px] px-1.5 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/20">
                          {use}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Input Requirements */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <ShoppingCart className="w-5 h-5 text-blue-400" />
              <h3 className="font-bold text-lg text-white">Active Requirements (Needs)</h3>
            </div>
            <Link
              to="/add-resource"
              className="text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Add Need</span>
            </Link>
          </div>

          {requirements.length === 0 ? (
            <p className="text-xs text-slate-500 italic py-4">No active raw material requirements logged yet.</p>
          ) : (
            <div className="space-y-3">
              {requirements.map(req => (
                <div key={req._id} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white text-sm">
                      {req.acceptableMaterials?.map(m => m.name).join(', ') || 'Virgin Raw Material'}
                    </span>
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20 font-semibold">
                      {req.quantityNeeded} {req.unit} / {req.frequency}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">{req.toleranceSpec || 'Standard manufacturing tolerance'}</p>
                  <div className="pt-2 border-t border-slate-900 flex items-center justify-between text-[11px] text-slate-500">
                    <span>Max transit distance: {req.maxDistanceKm} km</span>
                    <span className="text-emerald-400 font-medium">Accepting secondary streams</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
