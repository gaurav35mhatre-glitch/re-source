import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const DEMO_PERSONAS = [
  {
    id: 'generator',
    roleLabel: 'Industrial Generator (MSME)',
    name: 'Vikram Mehta',
    email: 'vikram@demounit.in',
    company: 'Demo Industrial Unit',
    location: 'Rabale MIDC, Navi Mumbai',
    cluster: 'Navi Mumbai MSME Zone',
    gstin: '27AABCV1234F1Z8',
    avatar: 'VM',
    badgeColor: 'emerald',
    description: 'Generates 500 kg/mo post-industrial packaging discards requiring de-labeling and granulating.'
  },
  {
    id: 'preprocessor',
    roleLabel: 'Preprocessing Node Operator',
    name: 'Rajesh Patil',
    email: 'rajesh@mahalaxmipolymers.in',
    company: 'Mahalaxmi Polymers & Flakers',
    location: 'Turbhe MIDC, Navi Mumbai',
    cluster: 'Turbhe Processing Hub',
    gstin: '27AABCM5678G2Z1',
    avatar: 'RP',
    badgeColor: 'sky',
    description: 'Operates 5 t/day washing, caustic decontamination and granulating lines with 45% idle capacity.'
  },
  {
    id: 'recycler',
    roleLabel: 'Secondary Recycler & Offtaker',
    name: 'Anita Deshmukh',
    email: 'anita@ecoplast.in',
    company: 'EcoPlast Extrusions India',
    location: 'Taloja Industrial Area',
    cluster: 'Taloja MIDC',
    gstin: '27AABCE9012H3Z4',
    avatar: 'AD',
    badgeColor: 'teal',
    description: 'Procures bulk extrusion-ready 10mm flakes verified with Secondary Material Passports.'
  },
  {
    id: 'auditor',
    roleLabel: 'Regulatory Auditor (MPCB)',
    name: 'Dr. Sneha Kulkarni',
    email: 'auditor@mpcb.gov.in',
    company: 'Maharashtra Pollution Control Board',
    location: 'BKC / Belapur Regional Office',
    cluster: 'State Environmental Authority',
    gstin: 'GOVT-MPCB-MAH-2026',
    avatar: 'SK',
    badgeColor: 'amber',
    description: 'Verifies mass balance recovery audits, non-hazardous diversion and secondary material standards.'
  }
];

export function AuthProvider({ children }) {
  // Try loading saved user or initialize with Demo Generator
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('missing_middle_auth');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed to parse auth from localStorage');
    }
    return DEMO_PERSONAS[0]; // Default logged-in as Demo Generator
  });

  const [authModalOpen, setAuthModalOpen] = useState(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem('missing_middle_auth', JSON.stringify(user));
    } else {
      localStorage.removeItem('missing_middle_auth');
    }
  }, [user]);

  const loginAsPersona = (personaId) => {
    const found = DEMO_PERSONAS.find(p => p.id === personaId) || DEMO_PERSONAS[0];
    setUser(found);
    return found;
  };

  const loginWithCredentials = ({ email, password, role = 'generator' }) => {
    // Demo credential authentication
    const persona = DEMO_PERSONAS.find(p => p.id === role) || DEMO_PERSONAS[0];
    const updatedUser = {
      ...persona,
      email: email || persona.email
    };
    setUser(updatedUser);
    return updatedUser;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      loginAsPersona,
      loginWithCredentials,
      logout,
      demoPersonas: DEMO_PERSONAS,
      authModalOpen,
      setAuthModalOpen
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
