import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Sparkles,
  Layers, 
  Search, 
  Sliders, 
  MapPin, 
  Route, 
  Boxes, 
  BarChart3, 
  FileText, 
  Play, 
  Menu, 
  X, 
  Globe, 
  Check, 
  ChevronDown,
  User,
  LogIn,
  UserCheck,
  RefreshCw
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import LiveDemoModal from './LiveDemoModal';
import LoginModal from './LoginModal';

export default function Navbar() {
  const location = useLocation();
  const { lang, setLanguage, t } = useLanguage();
  const { user } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [demoOpen, setDemoOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  const navLinks = [
    { name: t('overview') || 'Overview', path: '/overview', icon: Layers },
    { name: t('analyze') || 'Analyze Waste', path: '/analyze', icon: Search, badge: 'AI' },
    { name: t('plan') || 'Recipe', path: '/plan', icon: Sliders },
    { name: t('network') || 'Capacity Map', path: '/network', icon: MapPin },
    { name: t('flow') || 'Router', path: '/flow', icon: Route },
    { name: t('aggregation') || 'Aggregation', path: '/aggregation', icon: Boxes },
    { name: t('passport') || 'Passport', path: '/passport', icon: FileText },
    { name: t('impact') || 'Impact', path: '/impact', icon: BarChart3 }
  ];

  const languages = [
    { code: 'en', label: 'English', short: 'EN' },
    { code: 'hi', label: 'हिन्दी', short: 'HI' },
    { code: 'mr', label: 'मराठी', short: 'MR' }
  ];

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-sm">
        <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20">
          <div className="flex items-center justify-between h-16 gap-4">
            {/* Brand Logo: re'source */}
            <div className="flex items-center gap-5 shrink-0">
              <Link to="/" className="flex items-center gap-2.5 group">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform">
                  <RefreshCw className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5">
                    <span className="font-black text-lg sm:text-xl tracking-tight text-slate-900 leading-none">
                      <span className="text-emerald-600">re'</span>source
                    </span>
                    <span className="text-[9px] font-bold uppercase bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded-full border border-emerald-200 hidden sm:inline-block">
                      PILOT
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-500 font-medium tracking-tight hidden md:block pt-0.5">
                    Secondary Material Network
                  </span>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1.5">
              {navLinks.map(link => {
                const Icon = link.icon;
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`relative flex items-center gap-1.5 px-3 py-2 rounded-xl text-[13px] font-bold transition-all ${
                      isActive
                        ? 'bg-emerald-50 text-emerald-900 border border-emerald-300 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-700' : 'text-slate-400'}`} />
                    <span>{link.name}</span>
                    {link.badge && !isActive && (
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right Action Tools: User Auth, Language, Demo CTA */}
            <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
              {/* Active User Workstation Pill */}
              {user ? (
                <button
                  type="button"
                  onClick={() => setLoginModalOpen(true)}
                  className="flex items-center gap-2 pl-1.5 pr-2.5 py-1 rounded-xl bg-slate-100 hover:bg-slate-200/80 border border-slate-200 text-xs transition-colors"
                  title="Active Workstation Profile • Click to switch persona"
                >
                  <div className="w-6 h-6 rounded-lg bg-slate-900 text-white font-extrabold text-[10px] flex items-center justify-center shrink-0">
                    {user.avatar}
                  </div>
                  <div className="text-left hidden sm:block">
                    <span className="font-bold text-slate-800 block leading-tight truncate max-w-[110px]">
                      {user.name}
                    </span>
                    <span className="text-[9px] text-emerald-700 font-semibold block leading-none truncate max-w-[110px]">
                      {user.company.split(' ')[0]}
                    </span>
                  </div>
                </button>
              ) : (
                <Link
                  to="/login"
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-xs font-bold text-slate-700 transition-colors"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>Sign In</span>
                </Link>
              )}

              {/* Language Selector Dropdown */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setLangMenuOpen(!langMenuOpen)}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200/80 border border-slate-200 text-xs font-bold text-slate-700 transition-colors"
                  title="Switch Language"
                >
                  <Globe className="w-3.5 h-3.5 text-slate-500" />
                  <span>{languages.find(l => l.code === lang)?.short || 'EN'}</span>
                  <ChevronDown className="w-3 h-3 text-slate-400" />
                </button>

                {langMenuOpen && (
                  <div className="absolute right-0 mt-1.5 w-32 bg-white border border-slate-200 rounded-xl shadow-lg z-50 overflow-hidden py-1">
                    {languages.map(item => (
                      <button
                        key={item.code}
                        type="button"
                        onClick={() => {
                          setLanguage(item.code);
                          setLangMenuOpen(false);
                        }}
                        className={`w-full px-3 py-2 text-xs text-left flex items-center justify-between transition-colors ${
                          lang === item.code ? 'bg-emerald-50 text-emerald-800 font-bold' : 'text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <span>{item.label}</span>
                        {lang === item.code && <Check className="w-3.5 h-3.5 text-emerald-600" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* LIVE DEMO BUTTON (Key Hackathon CTA) */}
              <button
                onClick={() => setDemoOpen(true)}
                className="px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-all flex items-center gap-1.5 shadow-sm shadow-emerald-600/20 hover:scale-[1.02] active:scale-[0.98]"
                title="Launch 60-Second Judge Demo Pitch"
              >
                <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
                <span>{t('liveDemoBtn') || '60s Demo'}</span>
              </button>

              {/* Mobile menu toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                aria-label="Toggle Navigation"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-5 space-y-1 shadow-lg">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>{t('home') || 'Home'}</span>
            </Link>

            {navLinks.map(link => {
              const Icon = link.icon;
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold ${
                    isActive
                      ? 'bg-emerald-50 text-emerald-800 font-bold border border-emerald-200'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 text-emerald-600" />
                    <span>{link.name}</span>
                  </div>
                  {link.badge && (
                    <span className="text-[10px] font-bold uppercase bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}

            <div className="pt-3 border-t border-slate-100 space-y-2">
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800"
              >
                <div className="flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-emerald-600" />
                  <span>{user ? `Active: ${user.name}` : 'Sign In / Switch Persona'}</span>
                </div>
                <span className="text-[10px] text-emerald-700 font-bold uppercase">
                  {user?.roleLabel?.split(' ')[0] || 'Portal'}
                </span>
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Live Demo Modal */}
      <LiveDemoModal isOpen={demoOpen} onClose={() => setDemoOpen(false)} />

      {/* User Login / Profile Modal */}
      <LoginModal isOpen={loginModalOpen} onClose={() => setLoginModalOpen(false)} />
    </>
  );
}
