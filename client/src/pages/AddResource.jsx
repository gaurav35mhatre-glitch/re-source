import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCompany } from '../context/CompanyContext';
import { fetchMaterials, createResource, createRequirement, callAiValorize } from '../services/api';
import { 
  PlusCircle, 
  Sparkles, 
  Package, 
  ShoppingCart, 
  ArrowRight, 
  ShieldAlert, 
  CheckCircle2, 
  Lightbulb, 
  AlertCircle 
} from 'lucide-react';
import { SectorBadge } from '../components/Badge';

export default function AddResource() {
  const navigate = useNavigate();
  const { activeCompany } = useCompany();

  // Mode: 'output' (Resource) or 'need' (Requirement)
  const [mode, setMode] = useState('output');

  // Form Fields
  const [materialName, setMaterialName] = useState('');
  const [materialId, setMaterialId] = useState('');
  const [category, setCategory] = useState('byproduct');
  const [type, setType] = useState('byproduct');
  const [quantity, setQuantity] = useState('50');
  const [unit, setUnit] = useState('tons');
  const [frequency, setFrequency] = useState('monthly');
  const [qualitySpec, setQualitySpec] = useState('');
  const [maxDistanceKm, setMaxDistanceKm] = useState('200');

  // Materials for Autocomplete
  const [availableMaterials, setAvailableMaterials] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // AI Valorization state
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResult, setAiResult] = useState(null);
  const [aiError, setAiError] = useState(null);

  // Submission state
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    fetchMaterials()
      .then(mats => setAvailableMaterials(mats))
      .catch(e => console.error('Could not load materials:', e));
  }, []);

  const handleMaterialInputChange = (text) => {
    setMaterialName(text);
    setMaterialId('');
    if (text.trim().length > 0) {
      const filtered = availableMaterials.filter(m =>
        m.name.toLowerCase().includes(text.toLowerCase())
      );
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const selectSuggestion = (mat) => {
    setMaterialName(mat.name);
    setMaterialId(mat._id);
    if (mat.category) setCategory(mat.category);
    setShowSuggestions(false);
  };

  // Trigger AI Valorization
  const handleAiValorize = async () => {
    if (!materialName.trim()) {
      alert('Please enter a material name first');
      return;
    }
    try {
      setAiLoading(true);
      setAiError(null);
      const res = await callAiValorize({
        materialName,
        quantity: Number(quantity),
        unit,
        qualityNotes: qualitySpec
      });
      setAiResult(res);
    } catch (err) {
      setAiError(err.message);
    } finally {
      setAiLoading(false);
    }
  };

  // Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!materialName.trim()) {
      alert('Please enter or select a material');
      return;
    }

    try {
      setSubmitting(true);
      if (mode === 'output') {
        const aiSuggestedUses = aiResult?.possiblePathways?.map(p => `${p.use} (${p.industrySector})`) || [];
        await createResource({
          company: activeCompany._id,
          materialId: materialId || undefined,
          materialName: !materialId ? materialName : undefined,
          category,
          type,
          quantity: Number(quantity),
          unit,
          frequency,
          qualitySpec,
          aiSuggestedUses
        });
      } else {
        await createRequirement({
          company: activeCompany._id,
          acceptableMaterialIds: materialId ? [materialId] : [],
          materialName: !materialId ? materialName : undefined,
          quantityNeeded: Number(quantity),
          unit,
          frequency,
          toleranceSpec: qualitySpec,
          maxDistanceKm: Number(maxDistanceKm)
        });
      }

      setSuccessMsg(`Successfully logged ${mode === 'output' ? 'output resource' : 'input requirement'}. Matching engine recomputed!`);
      setTimeout(() => {
        navigate('/opportunities');
      }, 1400);
    } catch (err) {
      alert(`Submission error: ${err.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-400">
          <PlusCircle className="w-4 h-4" />
          <span>Industrial Ledger Entry</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white mt-1">
          Log Resource or Inbound Need
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          Cataloging for <strong className="text-white">{activeCompany?.name}</strong>. 
          SYMBIO's AI engine instantly discovers circular pathways and compatible Maharashtra MIDC counterparts.
        </p>
      </div>

      {/* Mode Switcher */}
      <div className="grid grid-cols-2 p-1.5 bg-slate-900 border border-slate-800 rounded-2xl">
        <button
          type="button"
          onClick={() => { setMode('output'); setAiResult(null); }}
          className={`flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all ${
            mode === 'output'
              ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>Log Output Stream (Waste / Byproduct / Surplus)</span>
        </button>

        <button
          type="button"
          onClick={() => { setMode('need'); setAiResult(null); }}
          className={`flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all ${
            mode === 'need'
              ? 'bg-blue-500 text-slate-950 shadow-md shadow-blue-500/20'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <ShoppingCart className="w-4 h-4" />
          <span>Log Raw Material Need (Inbound Feedstock)</span>
        </button>
      </div>

      {successMsg && (
        <div className="p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-sm flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Material Name with Autocomplete */}
          <div className="relative">
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Material Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Spent Industrial Solvent, Steel Scrap, Fly Ash..."
              value={materialName}
              onChange={(e) => handleMaterialInputChange(e.target.value)}
              onFocus={() => { if (suggestions.length > 0) setShowSuggestions(true); }}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-emerald-500 transition-colors"
            />
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute z-20 w-full mt-1 bg-slate-900 border border-slate-700 rounded-xl shadow-xl overflow-hidden max-h-48 overflow-y-auto">
                {suggestions.map(mat => (
                  <button
                    key={mat._id}
                    type="button"
                    onClick={() => selectSuggestion(mat)}
                    className="w-full text-left px-4 py-2 text-xs hover:bg-slate-800 flex items-center justify-between text-slate-200 border-b border-slate-800/60 last:border-b-0"
                  >
                    <span className="font-semibold text-white">{mat.name}</span>
                    <span className="text-[10px] uppercase font-mono text-slate-400">{mat.category}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Type / Nature */}
          {mode === 'output' ? (
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Output Stream Classification
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-emerald-500"
              >
                <option value="byproduct">Industrial Byproduct (Clean secondary)</option>
                <option value="waste">Hazardous or Non-Hazardous Waste</option>
                <option value="surplus_capacity">Surplus Utility / Heat / Power</option>
              </select>
            </div>
          ) : (
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Max Sourcing Distance
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min="20"
                  max="400"
                  step="10"
                  value={maxDistanceKm}
                  onChange={(e) => setMaxDistanceKm(e.target.value)}
                  className="w-full accent-blue-500"
                />
                <span className="font-mono text-sm text-blue-400 font-bold shrink-0">{maxDistanceKm} km</span>
              </div>
            </div>
          )}

          {/* Quantity & Unit */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              {mode === 'output' ? 'Generation Quantity' : 'Quantity Needed'} *
            </label>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="number"
                required
                min="0.1"
                step="any"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-emerald-500"
              />
              <select
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                className="px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-emerald-500"
              >
                <option value="tons">tons</option>
                <option value="kg">kg</option>
                <option value="liters">liters / kL</option>
                <option value="MWth-equivalent">MWth (Thermal Heat)</option>
                <option value="m3">m³</option>
              </select>
            </div>
          </div>

          {/* Cadence Frequency */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Frequency of Stream
            </label>
            <select
              value={frequency}
              onChange={(e) => setFrequency(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-emerald-500"
            >
              <option value="daily">Daily Continuous (Steady pipeline)</option>
              <option value="weekly">Weekly Batches</option>
              <option value="monthly">Monthly Consolidated Run</option>
              <option value="batch">Intermittent / Batch Campaign</option>
            </select>
          </div>
        </div>

        {/* Quality Specifications */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
            {mode === 'output' ? 'Quality & Contamination Notes' : 'Tolerance Specifications'}
          </label>
          <textarea
            rows="3"
            placeholder={
              mode === 'output'
                ? 'e.g. Moisture content <5%, non-chlorinated, flash point 42°C, silica grain fineness 65 AFS...'
                : 'e.g. Acceptable impurity threshold <2%, minimum calorific value 5,000 kcal/kg, grain size <10mm...'
            }
            value={qualitySpec}
            onChange={(e) => setQualitySpec(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-emerald-500"
          ></textarea>
        </div>

        {/* AI Valorizer Live Trigger Banner (Centerpiece AI feature) */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-purple-950/40 via-slate-950 to-slate-950 border border-purple-500/30 space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">AI Valorization Engine</h4>
                <p className="text-xs text-slate-400">Discover what this material can become and which industries in Maharashtra demand it.</p>
              </div>
            </div>

            <button
              type="button"
              disabled={aiLoading}
              onClick={handleAiValorize}
              className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs transition-colors flex items-center gap-1.5 shadow-sm shadow-purple-600/20 disabled:opacity-50"
            >
              {aiLoading ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Analyzing circular pathways...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Analyze Circular Pathways</span>
                </>
              )}
            </button>
          </div>

          {/* AI Valorization Results Display */}
          {aiResult && (
            <div className="space-y-3 pt-3 border-t border-purple-500/20">
              <p className="text-xs font-semibold uppercase tracking-wider text-purple-300">
                Discovered High-Value Pathways:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {aiResult.possiblePathways?.map((path, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-900 border border-purple-500/30 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <SectorBadge sector={path.industrySector} />
                      <span className="text-[10px] font-mono text-purple-400 font-bold">
                        {Math.round(path.confidence * 100)}% match
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-white leading-snug">{path.use}</p>
                  </div>
                ))}
              </div>

              {aiResult.notes && (
                <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-slate-300 flex items-start gap-2">
                  <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>{aiResult.notes}</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Submit Actions */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
          <button
            type="button"
            onClick={() => navigate('/dashboard')}
            className="px-5 py-2.5 rounded-xl text-slate-400 hover:text-white font-medium text-sm transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={submitting}
            className={`px-6 py-2.5 rounded-xl font-bold text-sm text-slate-950 transition-all flex items-center gap-2 shadow-lg disabled:opacity-50 ${
              mode === 'output'
                ? 'bg-emerald-500 hover:bg-emerald-400 shadow-emerald-500/20'
                : 'bg-blue-500 hover:bg-blue-400 shadow-blue-500/20'
            }`}
          >
            {submitting ? (
              <>
                <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></div>
                <span>Cataloging & Matching...</span>
              </>
            ) : (
              <>
                <PlusCircle className="w-4 h-4" />
                <span>Submit & Compute Matches</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
