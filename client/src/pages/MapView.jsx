import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import { fetchNetworkGraph } from '../services/api';
import { useCompany } from '../context/CompanyContext';
import { SectorBadge, ClusterBadge, HiddenMatchBadge } from '../components/Badge';
import { 
  MapPin, 
  Layers, 
  Sparkles, 
  ArrowRight, 
  Navigation, 
  ShieldCheck, 
  Leaf, 
  IndianRupee 
} from 'lucide-react';

// Sub-component to pan map smoothly when a cluster is clicked
function MapPanController({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.setView(center, zoom, { animate: true });
    }
  }, [center, zoom, map]);
  return null;
}

// Factory for custom HTML div icons for leaflet markers
function createCustomIcon(node, isActive) {
  const color = node.color || '#10B981';
  const pulseRing = isActive
    ? `<span class="absolute -inset-2 rounded-full border-2 border-emerald-400 animate-ping opacity-75"></span>`
    : '';

  return L.divIcon({
    className: 'custom-leaflet-marker',
    html: `
      <div class="relative flex items-center justify-center">
        ${pulseRing}
        <div style="background-color: ${color};" class="w-8 h-8 rounded-full border-2 border-slate-950 flex items-center justify-center text-[10px] font-bold text-slate-950 shadow-lg font-mono">
          ${node.name?.charAt(0)}
        </div>
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -18]
  });
}

const CLUSTERS_NAV = [
  { name: 'Overview (MH)', coords: [19.3, 73.9], zoom: 8 },
  { name: 'Taloja MIDC', coords: [19.0820, 73.1410], zoom: 12 },
  { name: 'Patalganga MIDC', coords: [18.9810, 73.1020], zoom: 12 },
  { name: 'Chakan MIDC', coords: [18.7610, 73.8625], zoom: 12 },
  { name: 'Tarapur MIDC', coords: [19.8050, 72.7630], zoom: 12 },
  { name: 'Nashik MIDC', coords: [20.0040, 73.7810], zoom: 12 },
  { name: 'Aurangabad / Waluj', coords: [19.8650, 75.2850], zoom: 12 }
];

export default function MapView() {
  const { activeCompany, setActiveCompany } = useCompany();
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hiddenOnly, setHiddenOnly] = useState(false);
  const [mapTarget, setMapTarget] = useState({ center: [19.35, 73.95], zoom: 8 });

  useEffect(() => {
    fetchNetworkGraph()
      .then(data => {
        setNodes(data.nodes || []);
        setEdges(data.edges || []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching map data:', err);
        setLoading(false);
      });
  }, []);

  const nodeCoordinatesMap = new Map();
  nodes.forEach(n => {
    if (n.lat && n.lng) {
      nodeCoordinatesMap.set(n.id, [n.lat, n.lng]);
    }
  });

  const visibleEdges = edges.filter(e => {
    if (hiddenOnly && !e.isCrossSector) return false;
    return nodeCoordinatesMap.has(e.source) && nodeCoordinatesMap.has(e.target);
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Header & Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-400">
            <MapPin className="w-4 h-4" />
            <span>Spatial Industrial Symbiosis Map</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white mt-1">
            Maharashtra MIDC Symbiosis Geography
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Real GPS coordinates of Maharashtra industrial units and their verified circular supply transit corridors.
          </p>
        </div>

        {/* Filter Toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setHiddenOnly(!hiddenOnly)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs transition-all border shadow-md ${
              hiddenOnly
                ? 'bg-purple-600 text-white border-purple-400 shadow-purple-500/20'
                : 'bg-slate-900 text-slate-200 border-slate-700 hover:border-purple-500/50'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-300" />
            <span>Hidden Cross-Sector Transit Only</span>
          </button>
        </div>
      </div>

      {/* Cluster Quick Jumper Strip */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 shrink-0 flex items-center gap-1">
          <Navigation className="w-3.5 h-3.5" /> Jump to:
        </span>
        {CLUSTERS_NAV.map(cluster => (
          <button
            key={cluster.name}
            onClick={() => setMapTarget({ center: cluster.coords, zoom: cluster.zoom })}
            className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-xs font-medium shrink-0 transition-colors"
          >
            {cluster.name}
          </button>
        ))}
      </div>

      {/* Leaflet Map Container */}
      <div className="bg-slate-950 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl h-[650px] relative">
        {loading ? (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center space-y-3">
              <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
              <p className="text-slate-400 text-sm font-medium">Loading geospatial network...</p>
            </div>
          </div>
        ) : (
          <MapContainer
            center={mapTarget.center}
            zoom={mapTarget.zoom}
            scrollWheelZoom={true}
            className="w-full h-full"
          >
            <MapPanController center={mapTarget.center} zoom={mapTarget.zoom} />

            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* Matched Connection Polylines */}
            {visibleEdges.map(edge => {
              const srcCoord = nodeCoordinatesMap.get(edge.source);
              const tgtCoord = nodeCoordinatesMap.get(edge.target);
              if (!srcCoord || !tgtCoord) return null;

              const isCross = edge.isCrossSector;
              const lineColor = isCross ? '#C084FC' : '#10B981';
              const lineWeight = isCross ? 3.5 : 2;

              return (
                <Polyline
                  key={edge.id}
                  positions={[srcCoord, tgtCoord]}
                  pathOptions={{
                    color: lineColor,
                    weight: lineWeight,
                    opacity: isCross ? 0.9 : 0.45,
                    dashArray: isCross ? '8, 6' : undefined
                  }}
                >
                  <Popup>
                    <div className="space-y-2 text-xs">
                      <div className="flex items-center justify-between gap-2 border-b border-slate-700 pb-1">
                        <span className="font-bold text-white text-sm">{edge.materialName}</span>
                        <span className="font-mono text-emerald-400 font-bold">{edge.score}/100</span>
                      </div>
                      <div className="text-slate-300">
                        <p><strong className="text-slate-400">From:</strong> {edge.sourceName}</p>
                        <p><strong className="text-slate-400">To:</strong> {edge.targetName}</p>
                        <p><strong className="text-slate-400">Distance:</strong> {edge.distanceKm} km</p>
                      </div>
                      {isCross && <HiddenMatchBadge className="text-[10px]" />}
                    </div>
                  </Popup>
                </Polyline>
              );
            })}

            {/* Plant Markers */}
            {nodes.map(node => {
              if (!node.lat || !node.lng) return null;
              const isActive = activeCompany && activeCompany._id === node.id;

              return (
                <Marker
                  key={node.id}
                  position={[node.lat, node.lng]}
                  icon={createCustomIcon(node, isActive)}
                >
                  <Popup>
                    <div className="space-y-3 text-xs min-w-[220px]">
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h4 className="font-extrabold text-sm text-white">{node.name}</h4>
                          {node.verified && <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />}
                        </div>
                        <div className="flex items-center gap-1 mt-1 flex-wrap">
                          <SectorBadge sector={node.sector} />
                          <ClusterBadge cluster={node.cluster} />
                        </div>
                      </div>

                      <p className="text-slate-300 text-[11px] leading-relaxed">
                        {node.address}
                      </p>

                      <div className="pt-2 border-t border-slate-700 flex justify-between text-slate-300">
                        <span>Active Connections:</span>
                        <span className="font-mono font-bold text-emerald-400">{node.matchesCount}</span>
                      </div>

                      <button
                        onClick={() => setActiveCompany(node.id)}
                        className="w-full py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-[11px] transition-colors"
                      >
                        View As This Company
                      </button>
                    </div>
                  </Popup>
                </Marker>
              );
            })}
          </MapContainer>
        )}
      </div>
    </div>
  );
}
