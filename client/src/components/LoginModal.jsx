import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  X, 
  UserCheck, 
  Check, 
  Sparkles, 
  LogOut, 
  ExternalLink,
  ShieldCheck,
  Building2
} from 'lucide-react';
import { useAuth, DEMO_PERSONAS } from '../context/AuthContext';

export default function LoginModal({ isOpen, onClose }) {
  const { user, loginAsPersona, logout } = useAuth();
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleSelect = (id) => {
    loginAsPersona(id);
    onClose();
  };

  const handleLogout = () => {
    logout();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white border border-slate-200 rounded-3xl max-w-md w-full p-6 space-y-5 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
              <UserCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900">
                {user ? 'Active Industrial Profile' : 'Select Workstation Role'}
              </h3>
              <p className="text-xs text-slate-500">
                Switch ecosystem persona in 1 click
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Current User Card if Logged In */}
        {user && (
          <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase text-emerald-800 tracking-wider">
                Currently Active
              </span>
              <span className="text-[10px] font-mono text-emerald-700 bg-white px-1.5 py-0.5 rounded border border-emerald-200">
                {user.gstin}
              </span>
            </div>
            <p className="font-bold text-sm text-slate-900">{user.name}</p>
            <p className="text-xs text-slate-600">{user.company} &bull; {user.location}</p>
          </div>
        )}

        {/* Persona Options */}
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase text-slate-500 tracking-wider block">
            Switch Industrial Persona:
          </span>

          <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
            {DEMO_PERSONAS.map(p => {
              const isCurrent = user?.id === p.id;
              return (
                <div
                  key={p.id}
                  onClick={() => handleSelect(p.id)}
                  className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between gap-3 ${
                    isCurrent
                      ? 'bg-emerald-50 border-emerald-400 font-bold'
                      : 'bg-slate-50 border-slate-200 hover:border-slate-300 hover:bg-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-slate-900 text-white font-extrabold text-xs flex items-center justify-center shrink-0">
                      {p.avatar}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900 leading-tight">{p.name}</p>
                      <p className="text-[10px] text-slate-500 truncate max-w-[210px]">{p.company}</p>
                    </div>
                  </div>

                  <span className="text-[10px] font-bold text-emerald-700 bg-white px-2 py-0.5 rounded border border-emerald-200 shrink-0">
                    {isCurrent ? 'Active' : 'Switch'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Modal Actions */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3 text-xs">
          {user ? (
            <button
              onClick={handleLogout}
              className="text-red-600 hover:text-red-700 font-bold flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          ) : (
            <span className="text-slate-400">Guest mode</span>
          )}

          <Link
            to="/login"
            onClick={onClose}
            className="text-emerald-700 hover:text-emerald-800 font-bold flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-emerald-50 transition-colors ml-auto"
          >
            <span>Full Sign In Page</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
