import React, { useState, useEffect } from 'react';
import { 
  X, 
  ArrowRight, 
  ArrowLeft, 
  Play, 
  Pause, 
  CheckCircle2, 
  AlertTriangle, 
  Sparkles, 
  Factory, 
  RotateCw, 
  Truck, 
  ShieldCheck, 
  Boxes, 
  Layers, 
  Sliders, 
  QrCode,
  Flame,
  Droplets,
  Scissors,
  Check
} from 'lucide-react';
import { DEFAULT_WASTE_SCENARIO, PREPROCESSING_RECIPE, CAPACITY_NODES, AGGREGATION_STREAMS } from '../data/mockData';

export default function LiveDemoModal({ isOpen, onClose }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);

  const steps = [
    {
      id: "raw-waste",
      title: "① Here's 500 kg of messy waste",
      subtitle: "The reality of Indian MSME waste generation",
      badge: "INPUT"
    },
    {
      id: "bottleneck",
      title: "② The problem isn't the truck: Why it can't enter recycling",
      subtitle: "Mixed, contaminated, and physically unsuitable for secondary feedstocks",
      badge: "DIAGNOSIS"
    },
    {
      id: "recipe",
      title: "③ Our system generates the Preprocessing Recipe",
      subtitle: "Before it can move, it needs to change",
      badge: "TRANSFORMATION"
    },
    {
      id: "capacity",
      title: "④ Coordinate existing distributed capacity around it",
      subtitle: "We don't build new factories; we network underused local infrastructure",
      badge: "NETWORK"
    },
    {
      id: "aggregation",
      title: "⑤ Aggregate fragmented streams into the Material Journey",
      subtitle: "Combining small MSME batches into bulk standardized lots",
      badge: "OPTIMIZATION"
    },
    {
      id: "result",
      title: "⑥ 500 kg waste → 430 kg Resource-Ready Material",
      subtitle: "“That's re'source: Don't just move waste. Prepare it for its next life.”",
      badge: "SECONDARY RESOURCE"
    }
  ];

  // Auto-play timer
  useEffect(() => {
    let timer;
    if (isAutoPlaying && isOpen) {
      timer = setInterval(() => {
        setCurrentStep(prev => {
          if (prev < steps.length - 1) return prev + 1;
          setIsAutoPlaying(false);
          return prev;
        });
      }, 7000);
    }
    return () => clearInterval(timer);
  }, [isAutoPlaying, isOpen]);

  // Reset when opened
  useEffect(() => {
    if (isOpen) {
      setCurrentStep(0);
      setIsAutoPlaying(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white border border-slate-200 rounded-3xl w-full max-w-5xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Top Bar */}
        <div className="p-3.5 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse"></span>
            <span className="font-mono text-xs uppercase font-extrabold tracking-widest text-emerald-800">
              60-Second Judge Walkthrough Mode
            </span>
            <span className="hidden sm:inline text-xs text-slate-500 font-mono">
              Step {currentStep + 1} of {steps.length}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="px-3 py-1.5 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700 transition-colors flex items-center gap-1.5 shadow-xs"
            >
              {isAutoPlaying ? <Pause className="w-3.5 h-3.5 text-amber-600" /> : <Play className="w-3.5 h-3.5 text-emerald-700" />}
              <span>{isAutoPlaying ? 'Pause' : 'Auto-Play'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Stepper Dots */}
        <div className="px-6 pt-3 pb-2 bg-slate-50/50 border-b border-slate-100">
          <div className="grid grid-cols-6 gap-2">
            {steps.map((st, idx) => (
              <button
                key={st.id}
                onClick={() => setCurrentStep(idx)}
                className={`h-1.5 rounded-full transition-all ${
                  idx === currentStep
                    ? 'bg-emerald-600 shadow-xs'
                    : idx < currentStep
                    ? 'bg-emerald-300'
                    : 'bg-slate-200'
                }`}
                title={st.title}
              />
            ))}
          </div>
        </div>

        {/* Step Content Body */}
        <div className="p-5 sm:p-8 overflow-y-auto flex-1 space-y-6">
          {/* Header of Step */}
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-[11px] font-bold font-mono tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200 uppercase mb-2">
              {steps[currentStep].badge}
            </div>
            <h2 className="text-xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {steps[currentStep].title}
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm mt-1">
              {steps[currentStep].subtitle}
            </p>
          </div>

          {/* STEP 1: RAW WASTE */}
          {currentStep === 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 items-center">
              <div className="p-5 sm:p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                  <span className="font-mono text-xs text-slate-500 uppercase">DEMO INGESTION</span>
                  <span className="text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                    500 kg / month
                  </span>
                </div>
                <div className="space-y-2 text-xs sm:text-sm text-slate-700">
                  <p><strong className="text-slate-900">Facility:</strong> Demo Industrial Unit — Navi Mumbai</p>
                  <p><strong className="text-slate-900">Material:</strong> Mixed Industrial Post-Industrial Plastic</p>
                  <p><strong className="text-slate-900">Condition:</strong> Rigid bottles, scraps, adhesive labels, dirt</p>
                  <p><strong className="text-slate-900">Moisture:</strong> 6.2% (Moderate wetness)</p>
                  <p><strong className="text-slate-900">Current Status:</strong> Destined for low-value downcycling or landfill tipping</p>
                </div>
                <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs">
                  ⚠️ <strong>Conventional reaction:</strong> “Call a truck and transport it to a recycler.”
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-center items-center text-center space-y-4">
                <div className="w-20 h-20 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-3xl font-black text-amber-700 shadow-sm">
                  500<span className="text-xs text-slate-500 ml-0.5">kg</span>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-base">Unprocessed Mixed Material</h4>
                  <p className="text-xs text-slate-600 mt-1 max-w-sm">
                    In its current physical state, this material cannot be fed into industrial secondary extruders. The recycling chain rejects it upon arrival.
                  </p>
                </div>
                <div className="font-mono text-xs text-red-700 font-bold bg-red-50 px-3 py-1 rounded-full border border-red-200">
                  Direct Recycler Acceptance Rate: 0%
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: BOTTLENECK ANALYSIS */}
          {currentStep === 1 && (
            <div className="space-y-5 sm:space-y-6">
              <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-xs sm:text-sm font-semibold flex items-center gap-3">
                <AlertTriangle className="w-5 h-5 shrink-0 text-red-600" />
                <span>«The truck isn't always the problem. The material is.»</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600">
                    Estimated Composition Breakdown
                  </h4>
                  {DEFAULT_WASTE_SCENARIO.composition.map((item, i) => (
                    <div key={i} className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-700">{item.label}</span>
                        <span className="font-mono font-bold text-slate-900">{item.percentage}%</span>
                      </div>
                      <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                        <div className="h-full rounded-full transition-all" style={{ width: `${item.percentage}%`, backgroundColor: item.color }}></div>
                      </div>
                    </div>
                  ))}
                  <p className="text-[11px] text-slate-500 italic pt-2">
                    *Illustrative prototype estimate — never implies laboratory certification.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-amber-800">
                    Why Recyclers Reject This Stream:
                  </h4>
                  <ul className="space-y-2.5 text-xs text-slate-700">
                    <li className="flex items-start gap-2">
                      <span className="text-red-600 font-bold shrink-0">✕</span>
                      <span><strong>Different Melt Temperatures:</strong> PET melts at 260°C while HDPE melts at 130°C. Melting together ruins the structural integrity of secondary plastics.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-600 font-bold shrink-0">✕</span>
                      <span><strong>Surface Adhesive Degassing:</strong> Glue from product labels chars inside extrusion barrels, creating black specks and pinholes.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-600 font-bold shrink-0">✕</span>
                      <span><strong>Trapped Moisture:</strong> Un-dried flakes boil during melting, causing gas pockets and brittle final pellets.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: PRE-PROCESSING RECIPE */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <div className="p-3.5 rounded-xl bg-purple-50 border border-purple-200 text-purple-900 text-xs font-bold uppercase tracking-wider">
                System Directive: Before it can move, it needs to change.
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
                {PREPROCESSING_RECIPE.map(rc => (
                  <div key={rc.step} className="p-3 rounded-xl bg-slate-50 border border-slate-200 hover:border-emerald-500 transition-colors space-y-1.5 flex flex-col justify-between">
                    <div>
                      <span className="font-mono text-emerald-800 font-extrabold text-xs">{rc.step}</span>
                      <h5 className="font-bold text-slate-900 text-xs leading-snug mt-0.5">{rc.name}</h5>
                    </div>
                    <p className="text-[10px] text-slate-500 leading-tight">{rc.subtitle}</p>
                    <div className="pt-2 border-t border-slate-200 text-[10px] text-slate-500 font-mono">
                      Loss: {rc.estimatedLoss}
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span className="font-bold text-slate-900">Physical Transformation Result:</span>
                  <span className="ml-2 text-slate-600">Converts messy bulky plastic into uniform 10 mm clean secondary flakes.</span>
                </div>
                <span className="font-mono text-emerald-800 font-bold shrink-0">Estimated Cost: ₹7.10 / kg</span>
              </div>
            </div>
          )}

          {/* STEP 4: DISTRIBUTED CAPACITY */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-sky-50 border border-sky-200 text-sky-900 text-xs font-semibold">
                «We don't necessarily need to build new infrastructure. We can coordinate underused infrastructure that already exists.»
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {CAPACITY_NODES.slice(0, 3).map(nd => (
                  <div key={nd.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold px-2 py-0.5 rounded font-mono" style={{ backgroundColor: `${nd.typeColor}18`, color: nd.typeColor }}>
                        {nd.typeLabel}
                      </span>
                      <span className="text-xs text-slate-500 font-mono">{nd.distanceKm} km away</span>
                    </div>
                    <h4 className="font-bold text-slate-900 text-sm">{nd.name}</h4>
                    <p className="text-xs text-slate-500">{nd.equipment}</p>
                    <div className="pt-2 border-t border-slate-200 flex justify-between text-xs">
                      <span className="text-slate-500">Available:</span>
                      <span className="text-emerald-700 font-bold">{nd.availabilityPercent}% idle</span>
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-center text-xs text-slate-500">
                Mapped 6 distributed processing capabilities within a 9 km radius of Rabale MIDC.
              </p>
            </div>
          )}

          {/* STEP 5: AGGREGATION & ROUTE */}
          {currentStep === 4 && (
            <div className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Aggregation */}
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-purple-800">MSME Stream Aggregation</span>
                  <div className="space-y-1.5">
                    {AGGREGATION_STREAMS.map(st => (
                      <div key={st.id} className="flex justify-between text-xs p-2 rounded-lg bg-white border border-slate-200">
                        <span className="text-slate-800 font-medium truncate max-w-[200px]">{st.name}</span>
                        <span className="font-mono font-bold text-slate-900">{st.quantityKg} kg</span>
                      </div>
                    ))}
                  </div>
                  <div className="pt-2 border-t border-slate-200 flex justify-between font-mono font-bold text-xs sm:text-sm text-emerald-800">
                    <span>Combined Secondary Lot:</span>
                    <span>1,700 kg (1.7 tonnes/mo)</span>
                  </div>
                </div>

                {/* Material Route */}
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-sky-800">Constructed Material Journey</span>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center gap-2 text-slate-700">
                      <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center font-mono text-[10px]">1</span>
                      <span>Demo Unit &rarr; Sorting Facility (2.4 km)</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-700">
                      <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center font-mono text-[10px]">2</span>
                      <span>Sorting Facility &rarr; Wash Plant (5.1 km)</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-700">
                      <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center font-mono text-[10px]">3</span>
                      <span>Wash Plant &rarr; Shredding Facility (3.7 km)</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-700">
                      <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center font-mono text-[10px]">4</span>
                      <span>Warehouse &rarr; Bulk Recycler (18.0 km)</span>
                    </div>
                  </div>
                  <div className="pt-2 border-t border-slate-200 flex justify-between font-mono text-xs text-slate-500">
                    <span>Total Material Path:</span>
                    <span className="font-bold text-slate-900">29.2 km (Multi-Stage)</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 6: RESULT */}
          {currentStep === 5 && (
            <div className="space-y-6 text-center">
              <div className="py-6 px-4 bg-emerald-50/70 border border-emerald-200 rounded-3xl space-y-4">
                <span className="text-xs font-mono uppercase tracking-widest text-emerald-800 font-extrabold">
                  The Transformation
                </span>

                <div className="flex items-center justify-center gap-4 sm:gap-8 flex-wrap">
                  <div className="text-center">
                    <p className="text-xs text-slate-500 uppercase font-semibold">Raw Input Waste</p>
                    <p className="text-3xl sm:text-5xl font-black text-slate-400 mt-1 line-through decoration-red-500">
                      500<span className="text-sm font-normal ml-1">kg</span>
                    </p>
                    <span className="text-[10px] text-red-600 font-mono">Mixed & contaminated</span>
                  </div>

                  <div className="text-2xl text-emerald-700 font-bold">&rarr;</div>

                  <div className="text-center">
                    <p className="text-xs text-emerald-800 uppercase font-bold">Secondary Raw Flakes</p>
                    <p className="text-3xl sm:text-5xl font-black text-emerald-800 mt-1">
                      430<span className="text-sm font-normal ml-1">kg</span>
                    </p>
                    <span className="text-[10px] text-emerald-700 font-mono font-bold">Resource-Ready Specification</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-emerald-200 max-w-lg mx-auto">
                  <p className="text-xl sm:text-2xl font-black text-slate-900 italic">
                    “That's re'source.”
                  </p>
                  <p className="text-xs text-slate-600 mt-1">
                    We didn't just move waste. We prepared it for its next life.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-lg mx-auto text-xs">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <p className="text-slate-500 text-[10px] uppercase font-semibold">Virgin Substituted</p>
                  <p className="text-sm font-bold text-slate-900 mt-0.5">430 kg</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <p className="text-slate-500 text-[10px] uppercase font-semibold">Conversion Rate</p>
                  <p className="text-sm font-bold text-emerald-700 mt-0.5">86%</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <p className="text-slate-500 text-[10px] uppercase font-semibold">Disposal Residue</p>
                  <p className="text-sm font-bold text-slate-700 mt-0.5">70 kg (inert)</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Navigation */}
        <div className="p-3.5 sm:p-5 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <button
            onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
            disabled={currentStep === 0}
            className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-900 disabled:opacity-30 disabled:pointer-events-none transition-colors flex items-center gap-1.5"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          <span className="text-xs text-slate-500 font-mono hidden sm:inline">
            Use Arrow Keys or Click Next to advance
          </span>

          {currentStep < steps.length - 1 ? (
            <button
              onClick={() => setCurrentStep(prev => Math.min(steps.length - 1, prev + 1))}
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <span>Next Step</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors shadow-sm flex items-center gap-1.5"
            >
              <span>Finish Demo & Explore Platform</span>
              <Check className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
