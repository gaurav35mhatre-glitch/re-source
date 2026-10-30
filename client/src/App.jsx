import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Landing from './pages/Landing';
import Overview from './pages/Overview';
import AnalyzeWaste from './pages/AnalyzeWaste';
import ProcessingPlan from './pages/ProcessingPlan';
import CapacityNetwork from './pages/CapacityNetwork';
import MaterialFlow from './pages/MaterialFlow';
import Aggregation from './pages/Aggregation';
import Impact from './pages/Impact';
import MaterialPassport from './pages/MaterialPassport';
import Login from './pages/Login';

export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <HashRouter>
          <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-emerald-500 selection:text-white">
            <Navbar />
            <main className="flex-1 w-full mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 py-6">
              <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/overview" element={<Overview />} />
                <Route path="/analyze" element={<AnalyzeWaste />} />
                <Route path="/plan" element={<ProcessingPlan />} />
                <Route path="/network" element={<CapacityNetwork />} />
                <Route path="/flow" element={<MaterialFlow />} />
                <Route path="/aggregation" element={<Aggregation />} />
                <Route path="/impact" element={<Impact />} />
                <Route path="/passport" element={<MaterialPassport />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>

            {/* Clean Light Theme Industrial Footer */}
            <footer className="border-t border-slate-200 bg-white py-6 text-xs text-slate-500 mt-12">
              <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
                <p className="font-bold text-slate-800 text-sm">
                  <span className="text-emerald-600">re'</span>source &bull; Secondary Material Recovery Platform
                </p>
                <p className="text-slate-600 font-medium">
                  “Don't just move waste. Prepare it for its next life.”
                </p>
                <p className="text-slate-500 font-medium">
                  Maharashtra MSME Pilot &bull; English / हिन्दी / मराठी
                </p>
              </div>
            </footer>
          </div>
        </HashRouter>
      </AuthProvider>
    </LanguageProvider>
  );
}
