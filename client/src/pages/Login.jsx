import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { 
  Layers, 
  Lock, 
  Mail, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  Building2, 
  ShieldCheck, 
  Activity, 
  FileText, 
  Sliders, 
  Boxes, 
  MapPin, 
  Eye, 
  EyeOff,
  UserCheck,
  Check
} from 'lucide-react';
import { useAuth, DEMO_PERSONAS } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

export default function Login() {
  const { user, loginAsPersona, loginWithCredentials } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  const [activeTab, setActiveTab] = useState('demo'); // 'demo' | 'credentials' | 'gstin'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState('generator');
  const [gstin, setGstin] = useState('27AABCV1234F1Z8');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);

  const handlePersonaSelect = (personaId) => {
    setLoading(true);
    setTimeout(() => {
      loginAsPersona(personaId);
      setLoading(false);
      setLoginSuccess(true);
      setTimeout(() => {
        navigate('/overview');
      }, 500);
    }, 400);
  };

  const handleCredentialsSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      loginWithCredentials({ email, password, role: selectedRole });
      setLoading(false);
      setLoginSuccess(true);
      setTimeout(() => {
        navigate('/overview');
      }, 500);
    }, 400);
  };

  const handleGstinSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      loginAsPersona('generator');
      setLoading(false);
      setLoginSuccess(true);
      setTimeout(() => {
        navigate('/overview');
      }, 500);
    }, 400);
  };

  return (
    <div className="min-h-[82vh] flex items-center justify-center py-6 sm:py-10">
      <div className="w-full max-w-6xl bg-white border-2 border-slate-200/90 rounded-3xl shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
        {/* LEFT BRAND PANEL (5 cols on lg) */}
        <div className="lg:col-span-5 bg-gradient-to-br from-emerald-800 via-teal-900 to-slate-950 p-6 sm:p-10 text-white flex flex-col justify-between relative overflow-hidden">
          {/* Subtle glow circles */}
          <div className="absolute -top-16 -left-16 w-52 h-52 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-16 -right-16 w-52 h-52 bg-teal-400/20 rounded-full blur-3xl pointer-events-none"></div>

          <div className="space-y-6 relative z-10">
            <Link to="/" className="flex items-center gap-2.5 group w-fit">
              <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <span className="font-extrabold text-lg tracking-tight text-white block">
                  <span className="text-emerald-400">re'</span>source
                </span>
                <span className="text-[10px] text-emerald-300 font-semibold uppercase tracking-wider block">
                  Maharashtra Operations Portal
                </span>
              </div>
            </Link>

            <div className="space-y-2 pt-4">
              <h2 className="text-2xl sm:text-3xl font-black leading-tight tracking-tight">
                Physical Material Authentication Layer
              </h2>
              <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed font-normal">
                Connecting MSME factories, distributed pre-processors, and secondary extruders into a qualified circular raw material chain.
              </p>
            </div>

            {/* Feature Bullets */}
            <div className="space-y-3 pt-2 text-xs text-emerald-100/90">
              <div className="flex items-start gap-2.5">
                <span className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center shrink-0 mt-0.5 font-bold">✓</span>
                <span><strong>MSME Waste Diagnosis:</strong> Automated polymer split & impurity breakdown before transport.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center shrink-0 mt-0.5 font-bold">✓</span>
                <span><strong>Distributed Capacity Network:</strong> Coordinate local washing, shredding & baling nodes across MIDC.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center shrink-0 mt-0.5 font-bold">✓</span>
                <span><strong>Secondary Material Passport:</strong> Standardized digital spec sheets for downstream compounders.</span>
              </div>
            </div>
          </div>

          {/* Bottom Security Badge */}
          <div className="pt-8 border-t border-white/10 flex items-center justify-between text-[11px] text-emerald-300/80 relative z-10">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Verified Maharashtra Industrial Node</span>
            </div>
            <span className="font-mono text-[10px] text-emerald-400">v2.4 Live</span>
          </div>
        </div>

        {/* RIGHT LOGIN FORM (7 cols on lg) */}
        <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between space-y-6">
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  Industrial Portal Access
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Sign in or select a live demo persona to test the ecosystem.
                </p>
              </div>

              {user && (
                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Logged In As:</span>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    {user.name} ({user.company})
                  </span>
                </div>
              )}
            </div>

            {/* TAB SELECTOR */}
            <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl">
              <button
                type="button"
                onClick={() => setActiveTab('demo')}
                className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                  activeTab === 'demo'
                    ? 'bg-white text-slate-900 shadow-xs border border-slate-200'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <span>⚡ 1-Click Demo Login</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('credentials')}
                className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                  activeTab === 'credentials'
                    ? 'bg-white text-slate-900 shadow-xs border border-slate-200'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Lock className="w-3.5 h-3.5 text-slate-500" />
                <span>Email Sign In</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('gstin')}
                className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                  activeTab === 'gstin'
                    ? 'bg-white text-slate-900 shadow-xs border border-slate-200'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Building2 className="w-3.5 h-3.5 text-slate-500" />
                <span>GSTIN / OTP</span>
              </button>
            </div>

            {/* TAB 1: 1-CLICK DEMO PERSONAS (FOR JUDGES & EVALUATORS) */}
            {activeTab === 'demo' && (
              <div className="space-y-3">
                <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200 text-xs text-emerald-900 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>
                    <strong>Judge Quick-Access:</strong> Click any of the 4 operational ecosystem personas below to instantly switch roles without typing credentials.
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {DEMO_PERSONAS.map(persona => {
                    const isSelected = user?.id === persona.id;
                    return (
                      <div
                        key={persona.id}
                        onClick={() => handlePersonaSelect(persona.id)}
                        className={`p-3.5 rounded-2xl border transition-all cursor-pointer space-y-1.5 hover:border-emerald-500 hover:shadow-xs relative ${
                          isSelected
                            ? 'bg-emerald-50/70 border-2 border-emerald-600 ring-1 ring-emerald-500'
                            : 'bg-slate-50 border-slate-200'
                        }`}
                      >
                        {isSelected && (
                          <span className="absolute top-2 right-2 flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-white px-1.5 py-0.5 rounded-md border border-emerald-200">
                            <Check className="w-3 h-3 text-emerald-600" />
                            Active
                          </span>
                        )}

                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-lg bg-slate-900 text-white font-extrabold text-xs flex items-center justify-center">
                            {persona.avatar}
                          </div>
                          <div>
                            <h4 className="font-bold text-xs text-slate-900">{persona.name}</h4>
                            <span className="text-[10px] text-slate-500 block truncate max-w-[170px]">
                              {persona.company}
                            </span>
                          </div>
                        </div>

                        <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-700">
                          {persona.roleLabel}
                        </span>

                        <p className="text-[11px] text-slate-600 leading-snug line-clamp-2 pt-0.5">
                          {persona.description}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* TAB 2: CREDENTIALS LOGIN FORM */}
            {activeTab === 'credentials' && (
              <form onSubmit={handleCredentialsSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                    Select Industrial Workstation Role
                  </label>
                  <select
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-semibold focus:bg-white focus:outline-none focus:border-emerald-600"
                  >
                    <option value="generator">🏭 Industrial Generator (MSME - Rabale)</option>
                    <option value="preprocessor">⚙️ Preprocessing Node Operator (Turbhe)</option>
                    <option value="recycler">🔄 Secondary Recycler / Offtaker (Taloja)</option>
                    <option value="auditor">🏛️ Regulatory Auditor (MPCB / MoEFCC)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                    Corporate Email / Work ID
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      required
                      placeholder="e.g. vikram@demounit.in"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:bg-white focus:outline-none focus:border-emerald-600"
                    />
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-bold uppercase text-slate-700">
                      Password
                    </label>
                    <span className="text-[11px] text-emerald-700 hover:underline cursor-pointer">
                      Forgot Password?
                    </span>
                  </div>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      placeholder="Enter workstation password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-9 pr-10 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:bg-white focus:outline-none focus:border-emerald-600"
                    />
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="remember"
                    defaultChecked
                    className="w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500"
                  />
                  <label htmlFor="remember" className="text-xs text-slate-600 select-none">
                    Remember this MIDC facility terminal for 30 days
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-sm flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <span>Authenticating Workspace...</span>
                  ) : (
                    <>
                      <span>Sign In to Workstation</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}

            {/* TAB 3: GSTIN / OTP LOGIN */}
            {activeTab === 'gstin' && (
              <form onSubmit={handleGstinSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                    Maharashtra Factory GSTIN *
                  </label>
                  <input
                    type="text"
                    required
                    value={gstin}
                    onChange={(e) => setGstin(e.target.value.toUpperCase())}
                    placeholder="27AABCV1234F1Z8"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-mono font-bold focus:bg-white focus:outline-none focus:border-emerald-600"
                  />
                  <p className="text-[10px] text-slate-500 mt-1">
                    Pre-fills registered plant location, MPCB consent number, and primary stream history.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                    One-Time Authorization Code (OTP)
                  </label>
                  <input
                    type="text"
                    defaultValue="482910"
                    placeholder="Enter 6-digit SMS / Email OTP"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-mono font-bold tracking-widest text-center focus:bg-white focus:outline-none focus:border-emerald-600"
                  />
                  <p className="text-[10px] text-emerald-700 mt-1">
                    Demo OTP generated for testing: <strong>482910</strong>
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-sm flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <span>Verifying GSTIN Registration...</span>
                  ) : (
                    <>
                      <span>Verify & Open Control Center</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* FOOTER ACTION */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Don't have an onboarded MIDC facility?</span>
            <Link
              to="/analyze"
              className="font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
            >
              <span>Onboard & Diagnose Free &rarr;</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
