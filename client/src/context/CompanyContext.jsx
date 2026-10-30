import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchCompanies } from '../services/api';

const CompanyContext = createContext(null);

export function CompanyProvider({ children }) {
  const [companies, setCompanies] = useState([]);
  const [activeCompany, setActiveCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadCompanies = async (preferId = null) => {
    try {
      setLoading(true);
      const data = await fetchCompanies();
      setCompanies(data);

      if (data && data.length > 0) {
        // If preferred ID or saved in localStorage
        const savedId = preferId || localStorage.getItem('symbio_active_company_id');
        const found = data.find(c => c._id === savedId);
        if (found) {
          setActiveCompany(found);
        } else {
          setActiveCompany(data[0]);
          localStorage.setItem('symbio_active_company_id', data[0]._id);
        }
      }
      setError(null);
    } catch (err) {
      console.error('Error loading companies context:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCompanies();
  }, []);

  const switchCompany = (companyOrId) => {
    if (typeof companyOrId === 'string') {
      const found = companies.find(c => c._id === companyOrId);
      if (found) {
        setActiveCompany(found);
        localStorage.setItem('symbio_active_company_id', found._id);
      }
    } else if (companyOrId && companyOrId._id) {
      setActiveCompany(companyOrId);
      localStorage.setItem('symbio_active_company_id', companyOrId._id);
    }
  };

  return (
    <CompanyContext.Provider value={{
      companies,
      activeCompany,
      setActiveCompany: switchCompany,
      refreshCompanies: loadCompanies,
      loading,
      error
    }}>
      {children}
    </CompanyContext.Provider>
  );
}

export function useCompany() {
  const context = useContext(CompanyContext);
  if (!context) {
    throw new Error('useCompany must be used within a CompanyProvider');
  }
  return context;
}
