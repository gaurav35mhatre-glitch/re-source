import React, { useState } from 'react';
import { 
  FileText, 
  QrCode, 
  CheckCircle2, 
  ShieldCheck, 
  Printer, 
  Download, 
  ExternalLink,
  Layers,
  ArrowRight,
  Copy,
  Check,
  Award,
  Sparkles,
  Building2,
  Calendar,
  Microscope,
  CheckCircle,
  FileCheck
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { MATERIAL_PASSPORT_DATA } from '../data/mockData';

export default function MaterialPassport() {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const data = MATERIAL_PASSPORT_DATA;

  const handleCopyBatch = () => {
    navigator.clipboard.writeText(data.batchId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      window.print();
    }, 600);
  };

  return (
    <div className="w-full space-y-8 pb-24">
      {/* Top Breadcrumb & Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100/80 border border-emerald-300 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <span>Verified Digital Product Passport (DPP) &bull; ISO 14021 Aligned</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            {t('passportHeading') || 'Secondary Material Passport'}
          </h1>
          <p className="text-base sm:text-lg text-slate-600 mt-2 max-w-3xl leading-relaxed">
            {t('passportSubtext') || 'Standardizing the physical specifications of post-industrial secondary materials so downstream compounders and extruders can procure with confidence.'}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => window.print()}
            className="px-5 py-3 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 border-2 border-slate-200 hover:border-slate-300 text-sm font-bold transition-all flex items-center gap-2 shadow-xs hover:shadow-sm"
          >
            <Printer className="w-4 h-4 text-slate-600" />
            <span>{t('printSpecSheet') || 'Print Spec Sheet'}</span>
          </button>

          <button
            onClick={handleDownload}
            disabled={downloading}
            className="px-5 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold transition-all flex items-center gap-2 shadow-sm hover:scale-[1.02] active:scale-[0.98]"
          >
            <Download className="w-4 h-4 text-white" />
            <span>{downloading ? 'Preparing PDF...' : 'Export Verified PDF'}</span>
          </button>
        </div>
      </div>

      {/* LUXURY ENTERPRISE CERTIFICATE CONTAINER */}
      <div className="bg-white border-2 border-slate-200/90 rounded-3xl shadow-xl overflow-hidden relative">
        {/* Top Accent Gradient Ribbon */}
        <div className="h-3 w-full bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600"></div>

        <div className="p-6 sm:p-12 space-y-8 sm:space-y-10">
          {/* Certificate Top Header Row */}
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 pb-8 border-b border-slate-200">
            <div className="space-y-3 max-w-2xl">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="text-xs font-black uppercase tracking-widest text-emerald-800 bg-emerald-50 px-3 py-1 rounded-xl border border-emerald-300">
                  {t('specTitle') || "RE'SOURCE CERTIFIED TECHNICAL SPECIFICATION"}
                </span>
                <span className="inline-flex items-center gap-1 text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1 rounded-xl border border-slate-200">
                  <Award className="w-3.5 h-3.5 text-emerald-600" />
                  Grade A-1 Industrial Pellet Feedstock
                </span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                {data.materialName}
              </h2>

              <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600 pt-1">
                <span className="flex items-center gap-1.5 font-medium">
                  <Building2 className="w-4 h-4 text-slate-400" />
                  Origin: <strong className="text-slate-900 font-bold">{data.sourceFacility}</strong>
                </span>
                <span className="text-slate-300">&bull;</span>
                <span className="text-slate-600 font-medium">
                  Cluster: <strong className="text-slate-800 font-semibold">{data.sourceLocation}</strong>
                </span>
              </div>
            </div>

            {/* Premium QR Code & Batch ID Box */}
            <div className="flex items-center gap-4 bg-slate-50/90 p-4 rounded-3xl border-2 border-slate-200 shrink-0 shadow-xs hover:border-emerald-300 transition-colors">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white p-2.5 rounded-2xl flex items-center justify-center border border-slate-200 shrink-0 shadow-sm">
                {/* Crisp SVG QR Code Vector */}
                <svg viewBox="0 0 24 24" className="w-full h-full text-slate-900" fill="currentColor">
                  <path d="M2 2h8v8H2V2zm2 2v4h4V4H4zm10-2h8v8h-8V2zm2 2v4h4V4h-4zM2 14h8v8H2v-8zm2 2v4h4v-4H4zm14-2h4v2h-4v-2zm-4 0h2v4h-2v-4zm2 4h2v2h-2v-2zm2 2h4v2h-4v-2zm-6-2h2v4h-2v-4zm6-4h4v2h-4v-2zm-4 2h2v2h-2v-2z"/>
                </svg>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-1 text-[11px] uppercase font-black text-slate-500 tracking-wider">
                  <FileCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{t('batchIdLabel') || 'Batch Identifier'}</span>
                </div>

                <button 
                  type="button"
                  onClick={handleCopyBatch}
                  className="font-mono text-emerald-800 hover:text-emerald-900 font-black text-base sm:text-lg tracking-wider flex items-center gap-2 transition-all bg-emerald-50 px-2.5 py-1 rounded-xl border border-emerald-200"
                  title="Click to copy Batch ID"
                >
                  <span>{data.batchId}</span>
                  {copied ? (
                    <Check className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <Copy className="w-3.5 h-3.5 text-slate-400 hover:text-emerald-600" />
                  )}
                </button>

                <p className="text-xs text-slate-500 font-medium">
                  {copied ? <strong className="text-emerald-700">✓ Copied to clipboard</strong> : `Generated: ${data.generationDate}`}
                </p>
              </div>
            </div>
          </div>

          {/* Mass Balance & Transformation Cards */}
          <div className="space-y-3">
            <h3 className="text-sm font-black uppercase tracking-wider text-slate-800 flex items-center gap-2">
              <Layers className="w-4 h-4 text-emerald-700" />
              <span>Mass Balance & Recovery Efficiency</span>
            </h3>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 rounded-3xl bg-slate-50 border-2 border-slate-200 space-y-1 hover:border-slate-300 transition-colors">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Input Waste Mass</span>
                <p className="text-3xl font-black text-slate-900">{data.originalQuantity}</p>
                <p className="text-xs text-slate-600 font-medium">Unsorted post-industrial scrap</p>
              </div>

              <div className="p-5 rounded-3xl bg-sky-50/80 border-2 border-sky-200 space-y-1 hover:border-sky-300 transition-colors">
                <span className="text-xs font-bold text-sky-800 uppercase tracking-wider">Recoverable Fraction</span>
                <p className="text-3xl font-black text-sky-900">{data.recoverableFraction}</p>
                <p className="text-xs text-sky-700 font-medium">Separable polymer fraction</p>
              </div>

              <div className="p-5 rounded-3xl bg-emerald-50/80 border-2 border-emerald-300 space-y-1 hover:border-emerald-400 transition-colors shadow-xs">
                <span className="text-xs font-bold text-emerald-900 uppercase tracking-wider">Resource-Ready Yield</span>
                <p className="text-3xl font-black text-emerald-800">{data.processedQuantity}</p>
                <p className="text-xs text-emerald-700 font-bold">Standardized secondary flakes</p>
              </div>

              <div className="p-5 rounded-3xl bg-amber-50/80 border-2 border-amber-200 space-y-1 hover:border-amber-300 transition-colors">
                <span className="text-xs font-bold text-amber-900 uppercase tracking-wider">Residual Separation Loss</span>
                <p className="text-3xl font-black text-amber-900">{data.disposalFraction.split(' ')[0]} kg</p>
                <p className="text-xs text-amber-700 font-medium">Inert label debris & dirt</p>
              </div>
            </div>
          </div>

          {/* Processing Sequence Chain of Custody */}
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <h3 className="text-sm font-black uppercase tracking-wider text-slate-800 flex items-center gap-2">
                <Microscope className="w-4 h-4 text-emerald-700" />
                <span>Verified Pre-Processing Chain of Custody</span>
              </h3>
              <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300 w-fit">
                ✓ 3 Distributed MIDC Nodes Verified
              </span>
            </div>

            <div className="p-5 sm:p-6 rounded-3xl bg-slate-50 border-2 border-slate-200">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 text-center">
                {[
                  { step: "01", name: "Manual Optical Sort", loc: "Rabale MIDC" },
                  { step: "02", name: "Decontamination", loc: "Turbhe Wash Hub" },
                  { step: "03", name: "Hot Caustic Wash", loc: "Turbhe Industrial" },
                  { step: "04", name: "Centrifugal Dry", loc: "Turbhe Spin Plant" },
                  { step: "05", name: "Rotary Granulation", loc: "Taloja Unit" },
                  { step: "06", name: "Aggregated Jumbo FIBC", loc: "Turbhe Hub" },
                ].map((st, i) => (
                  <div key={i} className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-black text-emerald-700 uppercase tracking-widest bg-emerald-50 px-2 py-0.5 rounded-md">
                        STAGE {st.step}
                      </span>
                      <h4 className="text-xs font-bold text-slate-900 mt-1.5 leading-snug">{st.name}</h4>
                    </div>
                    <p className="text-[10px] text-slate-500 font-medium mt-2 pt-1 border-t border-slate-100">{st.loc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Physical Technical Parameters Grid */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                  Certified Physical & Chemical Parameters
                </h3>
                <p className="text-xs sm:text-sm text-slate-600">
                  Calibrated to meet Indian Bureau of Standards & downstream compounder intake requirements.
                </p>
              </div>
              <span className="text-xs font-black text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-xl w-fit">
                Batch Testing: Passed (100%)
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl bg-white border-2 border-slate-200 hover:border-emerald-300 transition-all shadow-xs space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase font-extrabold text-slate-500 tracking-wider">Flake Size Dimension</span>
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md">Within Spec</span>
                </div>
                <p className="text-xl font-black text-slate-900">{data.parameters.flakeSize}</p>
                <p className="text-xs text-slate-500">Uniform screen granulator output</p>
              </div>

              <div className="p-5 rounded-2xl bg-white border-2 border-slate-200 hover:border-emerald-300 transition-all shadow-xs space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase font-extrabold text-slate-500 tracking-wider">Residual Moisture</span>
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md">Critical Pass</span>
                </div>
                <p className="text-xl font-black text-emerald-700">{data.parameters.residualMoisture}</p>
                <p className="text-xs text-slate-500">Pre-dried for bubble-free extrusion</p>
              </div>

              <div className="p-5 rounded-2xl bg-white border-2 border-slate-200 hover:border-emerald-300 transition-all shadow-xs space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase font-extrabold text-slate-500 tracking-wider">Bulk Density</span>
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md">High Density</span>
                </div>
                <p className="text-xl font-black text-slate-900">{data.parameters.bulkDensity}</p>
                <p className="text-xs text-slate-500">Optimized for gravimetric hoppers</p>
              </div>

              <div className="p-5 rounded-2xl bg-white border-2 border-slate-200 hover:border-emerald-300 transition-all shadow-xs space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase font-extrabold text-slate-500 tracking-wider">Non-Polymer Impurities</span>
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md">Ultra Pure</span>
                </div>
                <p className="text-xl font-black text-emerald-700">{data.parameters.nonPolymerImpurities}</p>
                <p className="text-xs text-slate-500">Labels, metals, and dirt eliminated</p>
              </div>

              <div className="p-5 rounded-2xl bg-white border-2 border-slate-200 hover:border-emerald-300 transition-all shadow-xs space-y-1.5 sm:col-span-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase font-extrabold text-slate-500 tracking-wider">Color & Melt Flow Compatibility</span>
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md">Verified</span>
                </div>
                <p className="text-xl font-black text-slate-900">{data.parameters.colorGrade}</p>
                <p className="text-xs text-slate-500">Compatible with masterbatch color blending & injection molding</p>
              </div>
            </div>
          </div>

          {/* Certificate Verification Footer */}
          <div className="pt-8 border-t-2 border-slate-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-700 font-black shrink-0">
                <CheckCircle2 className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm font-black text-slate-900">
                  Status: Ready for Downstream Compounding & Extrusion
                </p>
                <p className="text-xs text-slate-500">
                  Verified under Maharashtra Circular Economy Protocol &bull; Node ID: MH-NAV-04
                </p>
              </div>
            </div>

            <div className="text-left md:text-right">
              <p className="text-xs font-bold text-slate-700">
                Issued by <span className="text-emerald-700 font-extrabold"><span className="text-emerald-600">re'</span>source Quality Engine</span>
              </p>
              <p className="text-[11px] text-slate-500">
                Digital Passport Hash: <span className="font-mono text-slate-600 font-semibold">0x7F4B...99B2</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
