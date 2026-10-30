import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sliders, 
  ArrowRight, 
  CheckCircle2, 
  HelpCircle, 
  Layers, 
  Info, 
  Boxes, 
  Droplets, 
  Flame, 
  Scissors, 
  Check, 
  AlertCircle,
  MapPin,
  Clock,
  ShieldCheck
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { PREPROCESSING_RECIPE } from '../data/mockData';

export default function ProcessingPlan() {
  const { t } = useLanguage();
  const [selectedStage, setSelectedStage] = useState(PREPROCESSING_RECIPE[0]);

  return (
    <div className="space-y-6 sm:space-y-8 pb-16">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-700">
          <Sliders className="w-4 h-4" />
          <span>Core Differentiator &bull; Physical Transformation Protocol</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-slate-900 mt-1 tracking-tight">
          {t('recipeHeading') || 'BEFORE IT CAN MOVE, IT NEEDS TO CHANGE.'}
        </h1>
        <p className="text-slate-600 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
          {t('recipeSubtext') || 'Recyclers cannot ingest raw, mixed, contaminated waste. The 7-stage recipe below converts 500 kg of post-industrial plastic waste into uniform, high-density secondary flakes.'}
        </p>
      </div>

      {/* Top Banner Overview of Transformation */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs shadow-sm">
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="text-slate-500 font-medium">Raw Input:</span>
          <span className="text-slate-900 font-bold bg-slate-100 px-3 py-1 rounded-lg border border-slate-200">
            500 kg Mixed Scrap
          </span>
        </div>
        <div className="text-slate-400 font-bold hidden sm:block">&rarr; 7 Preprocessing Stages &rarr;</div>
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="text-slate-500 font-medium">Resource-Ready Output:</span>
          <span className="text-emerald-800 font-bold bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-200">
            430 kg Clean Flakes
          </span>
        </div>
      </div>

      {/* Interactive 7-Stage Horizontal Pipeline */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-sm">
          <span className="font-extrabold uppercase tracking-wider text-slate-500">
            Click any stage to inspect equipment, loss, and local capacity:
          </span>
          <span className="text-emerald-800 font-black">
            Selected: Stage {selectedStage.step} &bull; {selectedStage.name}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {PREPROCESSING_RECIPE.map(rc => {
            const isSelected = selectedStage.id === rc.id;
            return (
              <button
                key={rc.step}
                onClick={() => setSelectedStage(rc)}
                className={`p-4 rounded-2xl text-left transition-all border-2 relative flex flex-col justify-between min-h-[145px] shadow-xs ${
                  isSelected
                    ? 'bg-emerald-50 border-emerald-600 shadow-md ring-2 ring-emerald-500/20 scale-[1.02]'
                    : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className={`text-sm font-black ${isSelected ? 'text-emerald-800' : 'text-slate-400'}`}>
                      {rc.step}
                    </span>
                    {isSelected && <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse"></span>}
                  </div>
                  <h4 className="text-sm font-black text-slate-900 mt-2 leading-snug">{rc.name}</h4>
                  <p className="text-xs text-slate-600 mt-1 leading-snug font-medium">{rc.subtitle}</p>
                </div>

                <div className="pt-2 border-t border-slate-100 text-xs text-slate-500 flex justify-between font-medium">
                  <span>Loss:</span>
                  <span className="text-slate-900 font-extrabold">{rc.estimatedLoss}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Stage Detail Panel */}
      <div className="p-6 sm:p-10 rounded-3xl bg-white border-2 border-slate-200/90 space-y-6 sm:space-y-8 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start justify-between pb-6 border-b border-slate-100 gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-xl bg-emerald-100/90 text-emerald-900 text-xs font-black tracking-wider border border-emerald-300">
                STAGE {selectedStage.step}
              </span>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">PHYSICAL SPECIFICATION</span>
            </div>
            <h3 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              {selectedStage.name} — <span className="text-slate-600 font-bold text-xl sm:text-2xl">{selectedStage.subtitle}</span>
            </h3>
            <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed max-w-3xl">
              {selectedStage.desc}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border-2 border-slate-200 text-left sm:text-right space-y-1 shrink-0 self-stretch sm:self-auto">
            <p className="text-slate-500 text-xs uppercase font-extrabold tracking-wider">{t('unitCost') || 'Estimated Unit Cost'}</p>
            <p className="text-emerald-700 font-black text-lg sm:text-2xl">{selectedStage.estimatedCost}</p>
          </div>
        </div>

        {/* 4 Detail Grid Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-amber-50/80 border-2 border-amber-200 space-y-1.5">
            <span className="text-xs uppercase font-black text-amber-900 tracking-wider">{t('whyNeeded') || 'Why It Is Needed'}</span>
            <p className="text-sm text-slate-800 leading-relaxed font-medium">{selectedStage.whyNeeded}</p>
          </div>

          <div className="p-5 rounded-2xl bg-sky-50/80 border-2 border-sky-200 space-y-1.5">
            <span className="text-xs uppercase font-black text-sky-900 tracking-wider">{t('requiredEquipment') || 'Required Equipment'}</span>
            <p className="text-sm text-slate-800 leading-relaxed font-medium">{selectedStage.equipment}</p>
          </div>

          <div className="p-5 rounded-2xl bg-purple-50/80 border-2 border-purple-200 space-y-1.5">
            <span className="text-xs uppercase font-black text-purple-900 tracking-wider">{t('processingCapacity') || 'Processing Node Capacity'}</span>
            <p className="text-sm text-slate-900 font-bold">{selectedStage.capacity}</p>
            <p className="text-xs text-purple-800 font-semibold">Loss: {selectedStage.estimatedLoss} mass</p>
          </div>

          <div className="p-5 rounded-2xl bg-emerald-50/80 border-2 border-emerald-200 space-y-1.5">
            <span className="text-xs uppercase font-black text-emerald-900 tracking-wider">{t('assignedFacility') || 'Assigned Local Node'}</span>
            <p className="text-sm text-slate-900 font-bold">{selectedStage.nearbyFacility}</p>
            <p className="text-xs text-emerald-700 font-semibold">Within local MIDC radius</p>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-xs sm:text-sm text-slate-500 gap-3">
          <span>* Specifications calibrated for industrial secondary flake standard.</span>
          <Link
            to="/flow"
            className="text-emerald-700 hover:text-emerald-800 font-extrabold flex items-center gap-1.5 self-end sm:self-auto text-sm hover:underline"
          >
            <span>Proceed to Material Route &rarr;</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
