import React, { useState, useEffect, useRef } from 'react';
import { fetchNetworkGraph } from '../services/api';
import { useCompany } from '../context/CompanyContext';
import { SectorBadge, ClusterBadge, HiddenMatchBadge, RegulatoryBadge } from '../components/Badge';
import { 
  Network, 
  Sparkles, 
  Filter, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  X, 
  ArrowRight, 
  ShieldCheck, 
  MapPin, 
  Mail, 
  Leaf, 
  IndianRupee, 
  Trash2,
  Maximize2
} from 'lucide-react';
import * as d3 from 'd3-force';

export default function NetworkGraph() {
  const { activeCompany, setActiveCompany } = useCompany();
  const [graphData, setGraphData] = useState({ nodes: [], edges: [], sectorPalette: {} });
  const [loading, setLoading] = useState(true);
  const [hiddenOnly, setHiddenOnly] = useState(false);
  const [selectedNode, setSelectedNode] = useState(null);
  const [hoveredNode, setHoveredNode] = useState(null);
  const [selectedSector, setSelectedSector] = useState(null);

  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 900, height: 600 });
  const [transform, setTransform] = useState({ x: 0, y: 0, k: 1 });
  const [isDraggingCanvas, setIsDraggingCanvas] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0 });

  // Load graph data
  useEffect(() => {
    fetchNetworkGraph()
      .then(data => {
        setGraphData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading network graph:', err);
        setLoading(false);
      });
  }, []);

  // Update container dimensions on resize
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.clientWidth || 900,
          height: containerRef.current.clientHeight || 600
        });
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Run D3 force simulation when nodes/edges arrive
  const [simulationNodes, setSimulationNodes] = useState([]);
  const [simulationEdges, setSimulationEdges] = useState([]);

  useEffect(() => {
    if (!graphData.nodes.length) return;

    const width = dimensions.width || 900;
    const height = dimensions.height || 600;

    // Deep copy nodes & edges for D3 mutability
    const nodes = graphData.nodes.map(n => ({
      ...n,
      x: n.x || width / 2 + (Math.random() - 0.5) * 300,
      y: n.y || height / 2 + (Math.random() - 0.5) * 300
    }));

    const nodeMap = new Map(nodes.map(n => [n.id, n]));

    const edges = graphData.edges
      .filter(e => nodeMap.has(e.source) && nodeMap.has(e.target))
      .map(e => ({
        ...e,
        source: nodeMap.get(e.source),
        target: nodeMap.get(e.target)
      }));

    // Setup force simulation
    const simulation = d3.forceSimulation(nodes)
      .force('link', d3.forceLink(edges).id(d => d.id).distance(140).strength(0.45))
      .force('charge', d3.forceManyBody().strength(-380))
      .force('center', d3.forceCenter(width / 2, height / 2).strength(0.3))
      .force('collide', d3.forceCollide().radius(d => d.radius + 22).iterations(2));

    simulation.on('tick', () => {
      setSimulationNodes([...nodes]);
      setSimulationEdges([...edges]);
    });

    // Run 160 iterations and stop
    simulation.alpha(1).restart();
    for (let i = 0; i < 120; ++i) simulation.tick();

    setSimulationNodes([...nodes]);
    setSimulationEdges([...edges]);

    return () => simulation.stop();
  }, [graphData, dimensions]);

  // Canvas zoom/pan handlers
  const handleWheel = (e) => {
    e.preventDefault();
    const zoomFactor = e.deltaY < 0 ? 1.1 : 0.9;
    setTransform(prev => ({
      ...prev,
      k: Math.max(0.4, Math.min(3, prev.k * zoomFactor))
    }));
  };

  const handleMouseDown = (e) => {
    if (e.target.tagName === 'svg' || e.target.id === 'network-canvas-bg') {
      setIsDraggingCanvas(true);
      dragStartRef.current = { x: e.clientX - transform.x, y: e.clientY - transform.y };
    }
  };

  const handleMouseMove = (e) => {
    if (isDraggingCanvas) {
      setTransform(prev => ({
        ...prev,
        x: e.clientX - dragStartRef.current.x,
        y: e.clientY - dragStartRef.current.y
      }));
    }
  };

  const handleMouseUp = () => {
    setIsDraggingCanvas(false);
  };

  const resetView = () => {
    setTransform({ x: 0, y: 0, k: 1 });
  };

  // Node Dragging inside SVG
  const [draggedNode, setDraggedNode] = useState(null);

  const handleNodeMouseDown = (e, node) => {
    e.stopPropagation();
    setDraggedNode(node);
  };

  const handleSvgMouseMove = (e) => {
    if (draggedNode) {
      const rect = containerRef.current.getBoundingClientRect();
      const rawX = (e.clientX - rect.left - transform.x) / transform.k;
      const rawY = (e.clientY - rect.top - transform.y) / transform.k;

      setSimulationNodes(prev => prev.map(n => {
        if (n.id === draggedNode.id) {
          return { ...n, x: rawX, y: rawY, fx: rawX, fy: rawY };
        }
        return n;
      }));
    } else if (isDraggingCanvas) {
      handleMouseMove(e);
    }
  };

  const handleSvgMouseUp = () => {
    setDraggedNode(null);
    setIsDraggingCanvas(false);
  };

  // Filter edges based on hiddenOnly and sector
  const visibleEdges = simulationEdges.filter(e => {
    if (hiddenOnly && !e.isCrossSector) return false;
    if (selectedSector) {
      const srcSec = e.source?.sector || e.sourceSector;
      const tgtSec = e.target?.sector || e.targetSector;
      if (srcSec !== selectedSector && tgtSec !== selectedSector) return false;
    }
    return true;
  });

  // Calculate connected edges for selected or hovered node
  const activeDetailNode = selectedNode || (hoveredNode ? simulationNodes.find(n => n.id === hoveredNode) : null);
  const connectedEdges = activeDetailNode
    ? simulationEdges.filter(e => e.source?.id === activeDetailNode.id || e.target?.id === activeDetailNode.id)
    : [];

  const totalCrossSectorMatches = simulationEdges.filter(e => e.isCrossSector).length;

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner & Centerpiece Callout */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              Centerpiece Visual
            </span>
            <span className="text-xs font-mono text-slate-400">Force-Directed Maharashtra Symbiosis Topology</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white mt-1">
            Industrial Network Graph
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Nodes represent Maharashtra manufacturing plants sized by active matches. 
            Edges represent mutual resource-requirement pairings colored by sector compatibility.
          </p>
        </div>

        {/* Centerpiece Toggle */}
        <div className="flex items-center gap-3 flex-wrap">
          <button
            onClick={() => setHiddenOnly(!hiddenOnly)}
            className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all border shadow-lg ${
              hiddenOnly
                ? 'bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 text-white border-purple-300 shadow-purple-500/30 animate-pulse'
                : 'bg-slate-900 text-slate-200 border-slate-700 hover:border-purple-500/50 shadow-slate-950/50'
            }`}
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${hiddenOnly ? 'bg-white' : 'bg-purple-400'}`}></span>
              <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${hiddenOnly ? 'bg-white' : 'bg-purple-500'}`}></span>
            </span>
            <span>Show Hidden / Cross-Sector Matches Only</span>
            <span className={`px-2 py-0.5 rounded-full text-xs font-mono ${
              hiddenOnly ? 'bg-black/30 text-white' : 'bg-purple-500/20 text-purple-300'
            }`}>
              {totalCrossSectorMatches} active
            </span>
          </button>
        </div>
      </div>

      {/* Main Interactive Graph Canvas Area */}
      <div className="relative bg-slate-950 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl h-[650px] flex flex-col" ref={containerRef}>
        {/* Floating Controls Overlay (Top Right) */}
        <div className="absolute top-4 right-4 z-20 flex items-center gap-2 bg-slate-900/90 backdrop-blur-md p-1.5 rounded-2xl border border-slate-800 shadow-xl">
          <button
            onClick={() => setTransform(prev => ({ ...prev, k: Math.min(3, prev.k * 1.2) }))}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={() => setTransform(prev => ({ ...prev, k: Math.max(0.4, prev.k / 1.2) }))}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            onClick={resetView}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title="Reset Centering"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* Floating Sector Palette Legend (Bottom Left) */}
        <div className="absolute bottom-4 left-4 z-20 max-w-sm sm:max-w-md bg-slate-900/90 backdrop-blur-md p-3.5 rounded-2xl border border-slate-800 shadow-xl hidden sm:block">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Sector Color Legend</span>
            {selectedSector && (
              <button
                onClick={() => setSelectedSector(null)}
                className="text-[10px] text-emerald-400 hover:underline"
              >
                Clear Filter
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {Object.entries(graphData.sectorPalette || {}).map(([sec, color]) => {
              const isSelected = selectedSector === sec;
              return (
                <button
                  key={sec}
                  onClick={() => setSelectedSector(isSelected ? null : sec)}
                  className={`flex items-center gap-1.5 px-2 py-1 rounded-lg text-[11px] transition-all ${
                    isSelected
                      ? 'bg-slate-800 text-white ring-1 ring-emerald-400'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`}
                >
                  <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: color }}></span>
                  <span className="truncate max-w-[120px]">{sec}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* SVG Force Canvas */}
        <svg
          className="w-full h-full cursor-grab active:cursor-grabbing select-none"
          onWheel={handleWheel}
          onMouseDown={handleMouseDown}
          onMouseMove={handleSvgMouseMove}
          onMouseUp={handleSvgMouseUp}
        >
          <defs>
            {/* Cross-sector glowing gradient */}
            <linearGradient id="crossSectorGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#A855F7" />
              <stop offset="50%" stopColor="#EC4899" />
              <stop offset="100%" stopColor="#06B6D4" />
            </linearGradient>

            {/* Neon Filter glow */}
            <filter id="neonGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Interactive Transform Group */}
          <g transform={`translate(${transform.x}, ${transform.y}) scale(${transform.k})`}>
            {/* Edges / Links */}
            {visibleEdges.map(edge => {
              const x1 = edge.source?.x || 0;
              const y1 = edge.source?.y || 0;
              const x2 = edge.target?.x || 0;
              const y2 = edge.target?.y || 0;

              const isHighlighted = hoveredNode && (edge.source?.id === hoveredNode || edge.target?.id === hoveredNode);
              const isSelected = selectedNode && (edge.source?.id === selectedNode.id || edge.target?.id === selectedNode.id);

              const strokeWidth = Math.max(1.8, (edge.score / 100) * 4.5);
              const strokeColor = edge.isCrossSector
                ? 'url(#crossSectorGradient)'
                : '#334155';

              return (
                <g key={edge.id} className="transition-opacity">
                  <line
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke={strokeColor}
                    strokeWidth={isHighlighted || isSelected ? strokeWidth * 1.6 : strokeWidth}
                    strokeDasharray={edge.isCrossSector ? '6,3' : 'none'}
                    strokeOpacity={
                      edge.isCrossSector
                        ? 0.95
                        : hiddenOnly
                        ? 0.08
                        : isHighlighted || isSelected
                        ? 1.0
                        : 0.45
                    }
                    filter={edge.isCrossSector ? 'url(#neonGlow)' : undefined}
                  />

                  {/* Midpoint material label for cross-sector links */}
                  {edge.isCrossSector && (
                    <text
                      x={(x1 + x2) / 2}
                      y={(y1 + y2) / 2 - 4}
                      fill="#C084FC"
                      fontSize="9"
                      fontWeight="bold"
                      textAnchor="middle"
                      className="pointer-events-none drop-shadow"
                    >
                      {edge.materialName} ({edge.score})
                    </text>
                  )}
                </g>
              );
            })}

            {/* Nodes / Companies */}
            {simulationNodes.map(node => {
              const isCurrentActive = activeCompany && activeCompany._id === node.id;
              const isSelected = selectedNode && selectedNode.id === node.id;
              const isHovered = hoveredNode === node.id;
              const isSectorMatch = !selectedSector || node.sector === selectedSector;

              return (
                <g
                  key={node.id}
                  transform={`translate(${node.x || 0}, ${node.y || 0})`}
                  onMouseEnter={() => setHoveredNode(node.id)}
                  onMouseLeave={() => setHoveredNode(null)}
                  onMouseDown={(e) => handleNodeMouseDown(e, node)}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedNode(node);
                  }}
                  className="cursor-pointer"
                  opacity={isSectorMatch ? 1 : 0.25}
                >
                  {/* Outer active pulse ring */}
                  {(isCurrentActive || isSelected) && (
                    <circle
                      r={node.radius + 8}
                      fill="none"
                      stroke={isCurrentActive ? '#10B981' : '#A855F7'}
                      strokeWidth="2.5"
                      strokeDasharray="4,2"
                      className="animate-spin"
                      style={{ animationDuration: '8s' }}
                    />
                  )}

                  {/* Node Circle */}
                  <circle
                    r={node.radius}
                    fill={node.color}
                    stroke={isSelected ? '#FFFFFF' : '#0F172A'}
                    strokeWidth={isSelected ? '3' : '2'}
                    className="transition-transform hover:scale-110 drop-shadow-md"
                  />

                  {/* Match Count Badge inside node */}
                  <text
                    textAnchor="middle"
                    dy=".3em"
                    fill="#0F172A"
                    fontWeight="800"
                    fontSize={node.radius > 22 ? '12' : '10'}
                    className="pointer-events-none select-none font-mono"
                  >
                    {node.matchesCount}
                  </text>

                  {/* Company Name Label below node */}
                  <text
                    y={node.radius + 14}
                    textAnchor="middle"
                    fill={isSelected ? '#FFFFFF' : '#E2E8F0'}
                    fontSize="11"
                    fontWeight={isSelected ? 'bold' : '600'}
                    className="pointer-events-none select-none drop-shadow-lg"
                  >
                    {node.name}
                  </text>

                  {/* Sector Tag */}
                  <text
                    y={node.radius + 26}
                    textAnchor="middle"
                    fill="#94A3B8"
                    fontSize="9"
                    className="pointer-events-none select-none"
                  >
                    {node.cluster}
                  </text>
                </g>
              );
            })}
          </g>
        </svg>

        {/* Slide-Over Detail Panel when a Node is Clicked */}
        {selectedNode && (
          <div className="absolute top-0 right-0 w-full sm:w-[420px] h-full bg-slate-900/95 backdrop-blur-xl border-l border-slate-800 p-6 z-30 overflow-y-auto shadow-2xl flex flex-col justify-between">
            <div className="space-y-6">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="text-xl font-extrabold text-white">{selectedNode.name}</h2>
                    {selectedNode.verified && (
                      <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" title="MPCB Verified Plant" />
                    )}
                  </div>
                  <div className="flex items-center gap-2 mt-2 flex-wrap">
                    <SectorBadge sector={selectedNode.sector} />
                    <ClusterBadge cluster={selectedNode.cluster} />
                  </div>
                </div>

                <button
                  onClick={() => setSelectedNode(null)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Plant Meta Details */}
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-slate-500 shrink-0" />
                  <span className="text-slate-300">{selectedNode.address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-slate-500 shrink-0" />
                  <span className="text-slate-300 font-mono">{selectedNode.contactEmail}</span>
                </div>
                <div className="pt-2 border-t border-slate-900 flex justify-between font-semibold">
                  <span>Active Symbiosis Connections:</span>
                  <span className="text-emerald-400 font-mono text-sm">{selectedNode.matchesCount}</span>
                </div>
              </div>

              {/* Company's Output Resources */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Outputs Produced ({selectedNode.resources?.length || 0})
                </h4>
                {selectedNode.resources?.map((res, i) => (
                  <div key={i} className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs">
                    <div className="flex justify-between font-semibold text-white">
                      <span>{res.material}</span>
                      <span className="font-mono text-emerald-400">{res.quantity} {res.unit}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Direct Matches with Partner Plants */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-purple-300 flex items-center justify-between">
                  <span>Active Matches ({connectedEdges.length})</span>
                  <span className="text-[10px] text-slate-400">Score &bull; Partner</span>
                </h4>
                <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                  {connectedEdges.map(edge => {
                    const isSource = edge.source?.id === selectedNode.id;
                    const counterpart = isSource ? edge.target : edge.source;
                    return (
                      <div
                        key={edge.id}
                        className={`p-3 rounded-xl border text-xs space-y-1.5 ${
                          edge.isCrossSector
                            ? 'bg-purple-950/20 border-purple-500/30'
                            : 'bg-slate-950 border-slate-800'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-white">{counterpart?.name}</span>
                          <span className={`px-2 py-0.5 rounded-md font-bold font-mono ${
                            edge.score >= 80 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-300'
                          }`}>
                            {edge.score}/100
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-[11px] text-slate-400">
                          <span>{edge.materialName}</span>
                          <span>{edge.distanceKm} km</span>
                        </div>
                        {edge.isCrossSector && <HiddenMatchBadge className="text-[10px] py-0" />}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Bottom Action: Switch active company */}
            <div className="pt-6 border-t border-slate-800">
              <button
                onClick={() => {
                  setActiveCompany(selectedNode.id);
                  setSelectedNode(null);
                }}
                className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-colors flex items-center justify-center gap-2 shadow-md shadow-emerald-500/20"
              >
                <span>View As {selectedNode.name} in Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
