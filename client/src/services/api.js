const API_BASE = import.meta.env.VITE_API_URL || '/api';

export async function fetchCompanies() {
  const res = await fetch(`${API_BASE}/companies`);
  if (!res.ok) throw new Error('Failed to fetch companies');
  return res.json();
}

export async function fetchCompanyDetails(companyId) {
  const res = await fetch(`${API_BASE}/companies/${companyId}`);
  if (!res.ok) throw new Error('Failed to fetch company details');
  return res.json();
}

export async function fetchResources(companyId) {
  const url = companyId ? `${API_BASE}/resources?companyId=${companyId}` : `${API_BASE}/resources`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch resources');
  return res.json();
}

export async function createResource(data) {
  const res = await fetch(`${API_BASE}/resources`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || 'Failed to create resource');
  }
  return res.json();
}

export async function fetchRequirements(companyId) {
  const url = companyId ? `${API_BASE}/requirements?companyId=${companyId}` : `${API_BASE}/requirements`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch requirements');
  return res.json();
}

export async function createRequirement(data) {
  const res = await fetch(`${API_BASE}/requirements`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || 'Failed to create requirement');
  }
  return res.json();
}

export async function fetchMaterials() {
  const res = await fetch(`${API_BASE}/materials`);
  if (!res.ok) throw new Error('Failed to fetch materials');
  return res.json();
}

export async function fetchMatches(params = {}) {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, val]) => {
    if (val !== undefined && val !== null && val !== '') {
      query.append(key, val);
    }
  });
  const res = await fetch(`${API_BASE}/matches?${query.toString()}`);
  if (!res.ok) throw new Error('Failed to fetch matches');
  return res.json();
}

export async function updateMatchStatus(matchId, status) {
  const res = await fetch(`${API_BASE}/matches/${matchId}/status`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status })
  });
  if (!res.ok) throw new Error('Failed to update match status');
  return res.json();
}

export async function recomputeMatches() {
  const res = await fetch(`${API_BASE}/matches/recompute`, { method: 'POST' });
  if (!res.ok) throw new Error('Failed to recompute matches');
  return res.json();
}

export async function fetchNetworkGraph() {
  const res = await fetch(`${API_BASE}/network`);
  if (!res.ok) throw new Error('Failed to fetch network graph');
  return res.json();
}

export async function fetchImpactStats() {
  const res = await fetch(`${API_BASE}/impact`);
  if (!res.ok) throw new Error('Failed to fetch impact stats');
  return res.json();
}

export async function callAiValorize(payload) {
  const res = await fetch(`${API_BASE}/ai/valorize`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  if (!res.ok) throw new Error('Failed to call AI valorization endpoint');
  return res.json();
}

export async function callAiExplainMatch(payload) {
  const res = await fetch(`${API_BASE}/ai/explain-match`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  if (!res.ok) throw new Error('Failed to call AI explain match endpoint');
  return res.json();
}
