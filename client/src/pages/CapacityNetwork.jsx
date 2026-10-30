import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { 
  MapPin, 
  Layers, 
  Sparkles, 
  Sliders, 
  Activity, 
  CheckCircle2, 
  ArrowRight,
  Filter,
  Check
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { CAPACITY_NODES } from '../data/mockData';

// Factory for custom HTML div icons with color-coded node types
function createNodeIcon(node, isSelected) {
  const color = node.typeColor;
  const pulse = isSelected ? `<span class="absolute -inset-2 rounded-full border-2 border-emerald-600 animate-ping"></span>` : '';
  
  return L.divIcon({
    className: 'custom-capacity-marker',
    html: `
      <div class="relative flex items-center justify-center">
        ${pulse}
        <div style="background-color: ${color};" class="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-xs font-bold text-white shadow-md font-sans">
          ${node.name.charAt(0)}
        </div>
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -16]
  });
}

export default function CapacityNetwork() {
  const { t } = useLanguage();
  const [selectedType, setSelectedType] = useState('all');
  const [activeNode, setActiveNode] = useState(CAPACITY_NODES[0]);

  const nodeTypes = [
    { id: 'all', label: t('allNodeTypes') || 'All Node Types', color: '#059669' },
    { id: 'sorting', label: '🟢 Sorting Capacity', color: '#059669' },
    { id: 'washing', label: '🔵 Washing Capacity', color: '#0284c7' },
    { id: 'shredding', label: '🟠 Shredding Capacity', color: '#ea580c' },
    { id: 'baling', label: '🟣 Baling Capacity', color: '#9333ea' },
    { id: 'storage', label: '🟡 Storage & Batching', color: '#d97706' },
    { id: 'recycler', label: '⚫ End-User Recycler', color: '#475569' }
  ];

  const filteredNodes = CAPACITY_NODES.filter(nd => {
    if (selectedType === 'all') return true;
    return nd.type === selectedType;
  });

  return (
    <div className="space-y-6 sm:space-y-8 pb-16">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-700">
          <MapPin className="w-4 h-4" />
          <span>Distributed Processing Network &bull; Core Differentiator</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-slate-900 mt-1 tracking-tight">
          {t('capacityHeading') || 'Processing Capacity Network'}
        </h1>
        <p className="text-slate-600 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
          {t('capacitySubtext') || 'This is not just a directory of final recyclers. It maps the fragmented local infrastructure needed to perform sorting, decontamination, washing, and shredding.'}
        </p>
      </div>

      {/* Standout Philosophy Banner */}
      <div className="p-4 sm:p-6 rounded-2xl bg-emerald-50/70 border border-emerald-200 shadow-sm">
        <p className="text-base sm:text-lg font-black text-slate-900 leading-snug">
          {t('capacityQuote') || '« We don\'t necessarily need to build new infrastructure. We can coordinate underused infrastructure that already exists. »'}
        </p>
        <p className="text-xs text-slate-600 mt-1.5 font-medium">
          Scrap dealers have balers; fabricators have granulators; industrial parks have wash bays. We network their idle capacity.
        </p>
      </div>

      {/* Filter by Capability Strip */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {nodeTypes.map(item => (
          <button
            key={item.id}
            onClick={() => setSelectedType(item.id)}
            className={`px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-xs font-bold shrink-0 transition-all border ${
              selectedType === item.id
                ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Two Column Layout: Map View & Capacity Node List */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
        {/* Leaflet Map (7 cols) */}
        <div className="lg:col-span-7 bg-slate-100 border border-slate-200 rounded-3xl overflow-hidden shadow-sm h-[380px] sm:h-[540px] relative">
          <MapContainer
            center={[19.0980, 73.0600]}
            zoom={11}
            scrollWheelZoom={false}
            className="w-full h-full"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {filteredNodes.map(node => (
              <Marker
                key={node.id}
                position={[node.lat, node.lng]}
                icon={createNodeIcon(node, activeNode?.id === node.id)}
                eventHandlers={{
                  click: () => setActiveNode(node)
                }}
              >
                <Popup>
                  <div className="p-1 space-y-1.5 text-xs min-w-[190px]">
                    <span className="text-[10px] font-bold uppercase" style={{ color: node.typeColor }}>
                      {node.typeLabel}
                    </span>
                    <h4 className="font-bold text-slate-900 text-sm">{node.name}</h4>
                    <p className="text-slate-600">{node.cluster} &bull; {node.distanceKm} km</p>
                    <div className="pt-1 border-t border-slate-200 flex justify-between text-[11px]">
                      <span className="text-slate-500">Availability:</span>
                      <strong className="text-emerald-700">{node.availabilityPercent}% idle</strong>
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        {/* Node Cards List (5 cols) */}
        <div className="lg:col-span-5 space-y-3 max-h-[540px] overflow-y-auto pr-1">
          {filteredNodes.map(node => {
            const isSelected = activeNode?.id === node.id;
            return (
              <div
                key={node.id}
                onClick={() => setActiveNode(node)}
                className={`p-4 rounded-2xl cursor-pointer transition-all border shadow-sm ${
                  isSelected
                    ? 'bg-emerald-50/70 border-2 border-emerald-600 shadow-md ring-1 ring-emerald-500'
                    : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span 
                    className="text-[10px] font-bold uppercase px-2 py-0.5 rounded"
                    style={{ backgroundColor: `${node.typeColor}18`, color: node.typeColor }}
                  >
                    {node.typeLabel}
                  </span>
                  <span className="text-xs font-semibold text-slate-500">
                    {node.distanceKm} km away
                  </span>
                </div>

                <h4 className="text-sm font-bold text-slate-900 mt-1.5">{node.name}</h4>
                <p className="text-xs text-slate-500 mt-0.5">{node.cluster}</p>

                <div className="grid grid-cols-2 gap-2 text-xs pt-2 mt-2 border-t border-slate-100">
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase font-semibold">Daily Capacity</span>
                    <p className="text-slate-800 font-bold">{node.capacityTonsPerDay} t/day</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase font-semibold">Idle Availability</span>
                    <p className="text-emerald-700 font-bold">{node.availabilityPercent}%</p>
                  </div>
                </div>

                <div className="pt-2 mt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                  <span>Equip: {node.equipment}</span>
                  <span className="text-slate-700 font-medium">{node.rate || ''}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
