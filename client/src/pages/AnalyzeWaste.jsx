import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Upload, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  HelpCircle, 
  Camera, 
  FileText, 
  Sliders, 
  Layers, 
  RotateCw, 
  X, 
  Info,
  ShieldAlert,
  TrendingUp,
  Cpu,
  Boxes
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { DEFAULT_WASTE_SCENARIO } from '../data/mockData';

export default function AnalyzeWaste() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  // Mode: form or photo
  const [tab, setTab] = useState('details'); // 'details' | 'photo'

  // Input fields
  const [wasteType, setWasteType] = useState('Mixed Plastic Packaging');
  const [quantity, setQuantity] = useState('500');
  const [unit, setUnit] = useState('kg/month');
  const [frequency, setFrequency] = useState('Monthly batch');
  const [condition, setCondition] = useState('Mixed + partially contaminated (labels, dust)');
  const [moisture, setMoisture] = useState('Medium');
  const [contamination, setContamination] = useState('Moderate (labels, organic traces)');
  const [disposalMethod, setDisposalMethod] = useState('General waste / low-value disposal');
  const [location, setLocation] = useState('Rabale MIDC, Navi Mumbai');

  // Photo upload mock state
  const [uploadedImage, setUploadedImage] = useState('https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=600&auto=format&fit=crop&q=60');

  // Diagnosis execution state
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStepIndex, setAnalysisStepIndex] = useState(0);
  const [diagnosisResult, setDiagnosisResult] = useState(DEFAULT_WASTE_SCENARIO);

  const analysisChecks = [
    "Material composition & polymer classification",
    "Contamination risk & adhesive residues",
    "Moisture saturation & drying necessity",
    "Recoverable secondary fraction",
    "Distributed preprocessing requirements",
    "Potential downstream secondary raw material form"
  ];

  // Try Demo Button Handler
  const handleTryDemo = () => {
    setWasteType("Mixed Plastic Packaging");
    setQuantity("500");
    setUnit("kg/month");
    setFrequency("Monthly batch");
    setCondition("Mixed + partially contaminated (labels, dust)");
    setMoisture("Medium (~6.2%)");
    setContamination("Moderate (labels, organic traces)");
    setDisposalMethod("General waste / low-value disposal");
    setLocation("Rabale MIDC, Navi Mumbai");
    setUploadedImage("https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=600&auto=format&fit=crop&q=60");
  };

  // Submit & Diagnose Handler
  const handleAnalyze = (e) => {
    if (e) e.preventDefault();
    if (!wasteType && !uploadedImage) {
      handleTryDemo();
    }

    setIsAnalyzing(true);
    setAnalysisStepIndex(0);

    // Multi-step animated analysis
    const interval = setInterval(() => {
      setAnalysisStepIndex(prev => {
        if (prev < analysisChecks.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          setTimeout(() => {
            setIsAnalyzing(false);
            setDiagnosisResult(DEFAULT_WASTE_SCENARIO);
          }, 600);
          return prev;
        }
      });
    }, 400);
  };

  return (
    <div className="w-full space-y-6 sm:space-y-8 pb-16">
      {/* Header — Full Width */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-emerald-700">
            <Sparkles className="w-4 h-4" />
            <span>Material Diagnosis Engine &bull; Centerpiece Operational Feature</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 mt-1 tracking-tight">
            {t('analyzeHeading') || 'What are you trying to recover?'}
          </h1>
          <p className="text-slate-600 text-sm sm:text-base mt-1.5 max-w-3xl leading-relaxed">
            {t('analyzeSubtext') || 'The real bottleneck in Indian recycling happens before transportation. Ingest stream details to diagnose physical recovery barriers before moving a single truck.'}
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => {
              handleTryDemo();
              handleAnalyze();
            }}
            className="px-5 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs uppercase tracking-wider transition-all shadow-md shadow-emerald-600/20 hover:scale-[1.02]"
          >
            {t('tryDemoBtn') || '⚡ Re-Run Demo Diagnosis (500 kg)'}
          </button>
        </div>
      </div>

      {/* Prominent Demo Scenario Trigger Banner */}
      <div className="p-4 sm:p-5 rounded-3xl bg-emerald-50/90 border-2 border-emerald-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-ping"></span>
            <span className="text-xs uppercase font-black text-emerald-900 tracking-wider">
              Active Demonstration Stream
            </span>
          </div>
          <p className="text-base font-extrabold text-slate-900">
            500 kg Post-Industrial Mixed Plastic Packaging (Rabale MIDC Cluster)
          </p>
          <p className="text-xs text-slate-600 font-medium">
            Contains 68% PET rigid trays, 24% HDPE stretch film, and 8% adhesive labels & moisture.
          </p>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            type="button"
            onClick={() => {
              handleTryDemo();
              handleAnalyze();
            }}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-white border border-emerald-300 text-emerald-900 hover:bg-emerald-100/60 font-bold text-xs uppercase tracking-wider transition-all shadow-xs"
          >
            Reload Default Data
          </button>
        </div>
      </div>

      {/* 2-COLUMN WORKSTATION LAYOUT ACROSS FULL SCREEN */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
        {/* LEFT COLUMN: STREAM INGESTION CONSOLE (5 COLS) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Input Mode Tabs */}
          <div className="flex items-center gap-2 p-1.5 bg-slate-200/80 border border-slate-300/80 rounded-2xl w-full">
            <button
              type="button"
              onClick={() => setTab('details')}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black transition-all ${
                tab === 'details' ? 'bg-white text-slate-900 shadow-sm border border-slate-200' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>{t('enterWasteDetails') || 'Enter Stream Details'}</span>
            </button>
            <button
              type="button"
              onClick={() => setTab('photo')}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black transition-all ${
                tab === 'photo' ? 'bg-white text-slate-900 shadow-sm border border-slate-200' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Camera className="w-4 h-4" />
              <span>{t('uploadWastePhoto') || 'Upload Waste Photo'}</span>
            </button>
          </div>

          {/* Form / Photo Container */}
          <div className="bg-white border-2 border-slate-200/90 rounded-3xl p-5 sm:p-7 space-y-5 shadow-sm">
            {tab === 'photo' ? (
              /* Photo Upload Interface */
              <div className="space-y-4">
                <div 
                  onClick={handleTryDemo}
                  className="border-2 border-dashed border-slate-300 hover:border-emerald-500 rounded-2xl p-6 text-center cursor-pointer transition-colors bg-slate-50 space-y-3"
                >
                  {uploadedImage ? (
                    <div className="space-y-3">
                      <img 
                        src={uploadedImage} 
                        alt="Uploaded waste stream" 
                        className="w-full h-52 object-cover rounded-xl border border-slate-200 shadow-sm" 
                      />
                      <p className="text-xs text-emerald-800 font-extrabold">✓ Photo ingested: Mixed Rigid & Flexible Scrap (Rabale)</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-500 flex items-center justify-center mx-auto">
                        <Upload className="w-6 h-6" />
                      </div>
                      <p className="text-sm font-bold text-slate-800">
                        Drag and drop your factory waste pile photo
                      </p>
                      <p className="text-xs text-slate-500">
                        Supports JPG, PNG, WEBP &bull; Click to load demo industrial photo
                      </p>
                    </div>
                  )}
                </div>

                <button
                  type="button"
                  onClick={handleAnalyze}
                  disabled={isAnalyzing}
                  className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs uppercase tracking-wider transition-all shadow-md shadow-emerald-600/25 flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{t('runDiagnosisBtn') || 'Run Material Diagnosis'}</span>
                </button>
              </div>
            ) : (
              /* Form Input Interface */
              <form onSubmit={handleAnalyze} className="space-y-4">
                <div>
                  <label className="block text-xs font-black uppercase text-slate-700 mb-1">
                    {t('wasteTypeLabel') || 'Waste Type / Primary Material *'}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Mixed Industrial Plastic, Foundry Sand, Textile Sludge..."
                    value={wasteType}
                    onChange={(e) => setWasteType(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-sm font-semibold focus:bg-white focus:outline-none focus:border-emerald-600 transition-colors"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-black uppercase text-slate-700 mb-1">
                      {t('quantityLabel') || 'Quantity *'}
                    </label>
                    <input
                      type="number"
                      required
                      min="1"
                      placeholder="e.g. 500"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm font-semibold focus:bg-white focus:outline-none focus:border-emerald-600"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black uppercase text-slate-700 mb-1">
                      Unit
                    </label>
                    <select
                      value={unit}
                      onChange={(e) => setUnit(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-bold focus:bg-white focus:outline-none focus:border-emerald-600"
                    >
                      <option value="kg/month">kg / month</option>
                      <option value="tonnes/month">tonnes / month</option>
                      <option value="kg/batch">kg / batch</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-black uppercase text-slate-700 mb-1">
                      {t('moistureLabel') || 'Moisture Level'}
                    </label>
                    <select
                      value={moisture}
                      onChange={(e) => setMoisture(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-bold focus:bg-white focus:outline-none focus:border-emerald-600"
                    >
                      <option value="Low">Low (&lt; 2%)</option>
                      <option value="Medium">Medium (~6.2%)</option>
                      <option value="High">High (&gt; 10%)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-black uppercase text-slate-700 mb-1">
                      Contamination
                    </label>
                    <input
                      type="text"
                      value={contamination}
                      onChange={(e) => setContamination(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-medium focus:bg-white focus:outline-none focus:border-emerald-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-black uppercase text-slate-700 mb-1">
                    {t('locationLabel') || 'Generator Location'}
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-semibold focus:bg-white focus:outline-none focus:border-emerald-600"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isAnalyzing}
                    className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs uppercase tracking-wider transition-all shadow-md shadow-emerald-600/25 flex items-center justify-center gap-2 hover:scale-[1.01]"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>{t('runDiagnosisBtn') || 'Run Material Diagnosis'}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: DIAGNOSTIC INTELLIGENCE TERMINAL (7 COLS) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Real-time Loading State */}
          {isAnalyzing ? (
            <div className="p-8 sm:p-12 rounded-3xl bg-white border-2 border-emerald-400 space-y-6 shadow-lg min-h-[460px] flex flex-col justify-center">
              <div className="flex items-center gap-3">
                <RotateCw className="w-6 h-6 text-emerald-700 animate-spin" />
                <h3 className="text-base font-black uppercase tracking-wider text-emerald-900">
                  MATERIAL DIAGNOSIS IN PROGRESS...
                </h3>
              </div>

              <div className="space-y-3 text-sm">
                {analysisChecks.map((chk, i) => (
                  <div 
                    key={i} 
                    className={`flex items-center gap-3 transition-colors p-3 rounded-xl ${
                      i <= analysisStepIndex ? 'bg-emerald-50 text-emerald-950 font-bold border border-emerald-200' : 'text-slate-400'
                    }`}
                  >
                    <span className="font-mono text-base">{i <= analysisStepIndex ? '✓' : '○'}</span>
                    <span>{chk}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : diagnosisResult ? (
            /* COMPREHENSIVE DIAGNOSIS REPORT PANEL */
            <div className="p-6 sm:p-8 rounded-3xl bg-white border-2 border-slate-200/90 space-y-6 shadow-sm">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
                <div>
                  <span className="text-xs uppercase font-black text-emerald-700 tracking-wider">
                    {t('diagnosisReport') || 'DIAGNOSIS REPORT'} &bull; BATCH RS-PL-2026-001
                  </span>
                  <h3 className="text-xl sm:text-3xl font-black text-slate-900 mt-0.5 tracking-tight">
                    500 kg Mixed Packaging Scrap
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 font-medium">
                    Generator: Precision Polymers Ltd (Rabale MIDC) &bull; Verified Preprocessing Pipeline Required
                  </p>
                </div>

                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-left sm:text-right shrink-0">
                  <p className="text-slate-500 font-bold uppercase text-[10px]">Evaluation Status</p>
                  <p className="text-emerald-700 font-black text-sm">RECOVERABLE (75% YIELD)</p>
                </div>
              </div>

              {/* Composition Breakdown */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <h4 className="font-black uppercase tracking-wider text-slate-700">
                    {t('estComposition') || 'Material Split & Impurity Audit:'}
                  </h4>
                  <span className="text-slate-500 font-semibold">Total Sample: 500 kg</span>
                </div>
                
                <div className="space-y-3">
                  {diagnosisResult.composition.map((c, i) => (
                    <div key={i} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                      <div className="flex justify-between text-xs sm:text-sm">
                        <span className="text-slate-900 font-bold">{c.label}</span>
                        <span className="font-black text-slate-900">{c.percentage}% ({Math.round(500 * c.percentage / 100)} kg)</span>
                      </div>
                      <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                        <div className="h-full rounded-full transition-all" style={{ width: `${c.percentage}%`, backgroundColor: c.color }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Physical Barriers to Recovery */}
              <div className="space-y-3 pt-2">
                <h4 className="text-sm font-black text-slate-900 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  <span>Physical Barriers Diagnosed Before Transportation:</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {diagnosisResult.difficulties.map((diff, i) => (
                    <div key={i} className="p-4 rounded-2xl bg-amber-50/60 border-2 border-amber-200 space-y-1">
                      <h5 className="font-black text-slate-900 text-xs sm:text-sm">{diff.title}</h5>
                      <p className="text-xs text-slate-700 leading-relaxed font-medium">{diff.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Economic Uplift & CTA */}
              <div className="p-6 rounded-3xl bg-emerald-50/90 border-2 border-emerald-300 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-xs font-black uppercase tracking-wider text-emerald-800">
                    Prescribed Physical Transformation
                  </span>
                  <p className="text-base font-black text-slate-900">
                    Upgrade raw ₹8/kg scrap &rarr; ₹38/kg certified flakes
                  </p>
                  <p className="text-xs text-slate-600 font-medium">
                    Run the 7-stage recipe across 3 local Rabale MIDC processing nodes.
                  </p>
                </div>

                <button
                  onClick={() => navigate('/plan')}
                  className="px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs uppercase tracking-wider transition-all shadow-md shadow-emerald-600/25 flex items-center justify-center gap-2 shrink-0 hover:scale-[1.02]"
                >
                  <span>{t('viewRecipeBtn') || 'View 7-Stage Recipe'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
