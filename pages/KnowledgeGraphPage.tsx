import React, { useState, useRef, useMemo } from 'react';
import { Header } from '../components/Header';

// --- Types ---
type NodeType = 'concept' | 'document' | 'person' | 'other';

interface GraphNode {
  id: string;
  type: NodeType;
  label: string;
  x: number;
  y: number;
  radius: number;
  color: string;
  icon?: string; // Material symbol icon name
  metadata: {
    confidence: number;
    relatedCount: number;
    description: string;
    tags?: string[];
  };
}

interface GraphLink {
  id: string;
  source: string;
  target: string;
  weight: number;
  type: 'citation' | 'related' | 'author' | 'contain';
}

// --- Mock Data ---
const INITIAL_NODES: GraphNode[] = [
  { id: 'n1', type: 'concept', label: '人工智能', x: 300, y: 300, radius: 18, color: '#ef4444', icon: 'psychology', metadata: { confidence: 0.99, relatedCount: 45, description: '计算机科学的一个分支，致力于创造像人类一样工作和反应的智能机器。' } },
  { id: 'n2', type: 'document', label: 'Q3 财报.pdf', x: 700, y: 300, radius: 14, color: '#3b82f6', icon: 'description', metadata: { confidence: 1.0, relatedCount: 5, description: '2023年第三季度财务报告，包含收入、支出和净利润分析。' } },
  { id: 'n3', type: 'concept', label: '机器学习', x: 500, y: 200, radius: 16, color: '#ef4444', icon: 'memory', metadata: { confidence: 0.95, relatedCount: 32, description: '人工智能的一个子集，专注于利用数据和算法来模仿人类的学习方式。' } },
  { id: 'n4', type: 'person', label: 'Sam Altman', x: 650, y: 550, radius: 14, color: '#22c55e', icon: 'person', metadata: { confidence: 1.0, relatedCount: 12, description: 'OpenAI 的首席执行官。' } },
  { id: 'n5', type: 'concept', label: 'RAG 检索增强', x: 550, y: 450, radius: 28, color: '#f59e0b', icon: 'lightbulb', metadata: { confidence: 0.98, relatedCount: 24, description: '检索增强生成（Retrieval-Augmented Generation），一种结合检索和生成技术以提高 LLM 输出准确性的架构。' } },
  { id: 'n6', type: 'document', label: '技术白皮书_v2', x: 800, y: 500, radius: 14, color: '#3b82f6', icon: 'article', metadata: { confidence: 1.0, relatedCount: 8, description: '详细阐述系统架构和技术路线的文档。' } },
  { id: 'n7', type: 'document', label: '神经网络导论', x: 200, y: 500, radius: 14, color: '#3b82f6', icon: 'book', metadata: { confidence: 0.90, relatedCount: 3, description: '深度学习基础教材。' } },
  { id: 'n8', type: 'other', label: '2023-10-24', x: 750, y: 200, radius: 10, color: '#a855f7', icon: 'event', metadata: { confidence: 1.0, relatedCount: 2, description: '重要发布日期节点。' } },
  { id: 'n9', type: 'concept', label: '向量数据库', x: 400, y: 550, radius: 16, color: '#ef4444', icon: 'storage', metadata: { confidence: 0.92, relatedCount: 15, description: '专门用于存储和查询高维向量数据的数据库系统。' } },
];

const INITIAL_LINKS: GraphLink[] = [
  { id: 'l1', source: 'n3', target: 'n1', weight: 2, type: 'contain' },
  { id: 'l2', source: 'n5', target: 'n1', weight: 1.5, type: 'related' },
  { id: 'l3', source: 'n5', target: 'n3', weight: 1.5, type: 'related' },
  { id: 'l4', source: 'n5', target: 'n2', weight: 1, type: 'citation' },
  { id: 'l5', source: 'n5', target: 'n6', weight: 2, type: 'citation' },
  { id: 'l6', source: 'n6', target: 'n4', weight: 1, type: 'author' },
  { id: 'l7', source: 'n2', target: 'n8', weight: 1, type: 'related' },
  { id: 'l8', source: 'n7', target: 'n3', weight: 1.5, type: 'related' },
  { id: 'l9', source: 'n9', target: 'n5', weight: 2, type: 'related' },
];

export const KnowledgeGraphPage: React.FC = () => {
  // --- State ---
  const [nodes, setNodes] = useState<GraphNode[]>(INITIAL_NODES);
  const [links, setLinks] = useState<GraphLink[]>(INITIAL_LINKS);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>('n5');
  const [viewState, setViewState] = useState({ x: 0, y: 0, zoom: 1 });
  const [filters, setFilters] = useState({
    concept: true,
    document: true,
    person: true,
    other: true
  });
  
  // Interaction State
  const [isDragging, setIsDragging] = useState(false);
  const [dragNodeId, setDragNodeId] = useState<string | null>(null);
  const [lastMousePos, setLastMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // --- Computed ---
  const visibleNodes = useMemo(() => nodes.filter(n => filters[n.type]), [nodes, filters]);
  
  const visibleLinks = useMemo(() => links.filter(l => {
    const sourceNode = visibleNodes.find(n => n.id === l.source);
    const targetNode = visibleNodes.find(n => n.id === l.target);
    return sourceNode && targetNode;
  }), [links, visibleNodes]);

  const selectedNode = useMemo(() => nodes.find(n => n.id === selectedNodeId), [nodes, selectedNodeId]);

  const relatedNeighbors = useMemo(() => {
    if (!selectedNodeId) return [];
    const neighbors: { node: GraphNode, link: GraphLink }[] = [];
    links.forEach(l => {
      if (l.source === selectedNodeId) {
        const target = nodes.find(n => n.id === l.target);
        if (target) neighbors.push({ node: target, link: l });
      } else if (l.target === selectedNodeId) {
        const source = nodes.find(n => n.id === l.source);
        if (source) neighbors.push({ node: source, link: l });
      }
    });
    return neighbors;
  }, [selectedNodeId, links, nodes]);

  // --- Handlers ---
  const handleWheel = (e: React.WheelEvent) => {
    // Only zoom if dragging isn't active to prevent conflict
    if (isDragging && !dragNodeId) return;
    
    // e.preventDefault(); // Note: React synthetic events can't always prevent default passive listeners
    const scaleFactor = 1.05;
    const direction = e.deltaY > 0 ? -1 : 1;
    let newZoom = viewState.zoom * (direction > 0 ? scaleFactor : 1 / scaleFactor);
    newZoom = Math.max(0.2, Math.min(newZoom, 4));
    setViewState(prev => ({ ...prev, zoom: newZoom }));
  };

  const handleZoom = (direction: 'in' | 'out' | 'reset') => {
    if (direction === 'reset') {
      setViewState({ x: 0, y: 0, zoom: 1 });
    } else {
      const scaleFactor = 1.2;
      let newZoom = viewState.zoom * (direction === 'in' ? scaleFactor : 1 / scaleFactor);
      newZoom = Math.max(0.2, Math.min(newZoom, 4));
      setViewState(prev => ({ ...prev, zoom: newZoom }));
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    // Start Panning
    setIsDragging(true);
    setLastMousePos({ x: e.clientX, y: e.clientY });
  };

  const handleNodeMouseDown = (e: React.MouseEvent, id: string) => {
    e.stopPropagation(); // Prevent panning when clicking node
    setSelectedNodeId(id);
    setIsDragging(true);
    setDragNodeId(id);
    setLastMousePos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;

    const dx = e.clientX - lastMousePos.x;
    const dy = e.clientY - lastMousePos.y;
    setLastMousePos({ x: e.clientX, y: e.clientY });

    if (dragNodeId) {
      // Dragging Node
      setNodes(prev => prev.map(n => {
        if (n.id === dragNodeId) {
          return { ...n, x: n.x + dx / viewState.zoom, y: n.y + dy / viewState.zoom };
        }
        return n;
      }));
    } else {
      // Panning Canvas
      setViewState(prev => ({ ...prev, x: prev.x + dx, y: prev.y + dy }));
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setDragNodeId(null);
  };

  // --- SVG Rendering Helpers ---
  const getNodeColor = (type: NodeType) => {
    switch(type) {
      case 'concept': return '#ef4444';
      case 'document': return '#3b82f6';
      case 'person': return '#22c55e';
      case 'other': return '#f59e0b';
      default: return '#9ca3af';
    }
  };

  const getNodeIcon = (type: NodeType) => {
    switch(type) {
        case 'concept': return 'lightbulb';
        case 'document': return 'description';
        case 'person': return 'person';
        case 'other': return 'hub';
        default: return 'circle';
    }
  }

  const getLinkColor = (type: string) => {
    switch(type) {
      case 'citation': return '#3b82f6';
      case 'author': return '#22c55e';
      default: return '#94a3b8';
    }
  };

  const getLinkDash = (type: string) => {
    return type === 'citation' ? "4" : "0";
  };

  return (
    <div className="flex flex-col h-full bg-background-light dark:bg-background-dark overflow-hidden">
      <style>{`
        .bg-graph-pattern {
            background-image: radial-gradient(#cbd5e1 1px, transparent 1px);
            background-size: 20px 20px;
        }
        .dark .bg-graph-pattern {
            background-image: radial-gradient(#334155 1px, transparent 1px);
        }
        .graph-text-shadow {
            text-shadow: 0 1px 2px rgba(0,0,0,0.1);
        }
      `}</style>
      <Header 
        breadcrumbs={['知识库', '知识图谱']} 
        showSearch={true}
      />
      
      <div className="flex flex-1 overflow-hidden relative">
        {/* Floating Controls (Left) */}
        <div className="absolute left-4 top-4 z-20 w-64 flex flex-col gap-3 pointer-events-none">
          {/* Filters */}
          <div className="flex flex-col gap-3 rounded-xl border border-border-light bg-surface-light/95 p-4 shadow-lg backdrop-blur dark:border-border-dark dark:bg-surface-dark/95 pointer-events-auto">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-text-main dark:text-white text-sm">显示筛选</h3>
              <button onClick={() => setFilters({concept: true, document: true, person: true, other: true})} className="text-xs text-primary hover:text-primary-dark">重置</button>
            </div>
            <div className="flex flex-col gap-2 select-none">
              <label className="flex items-center gap-2 text-sm text-text-secondary dark:text-gray-300 cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 rounded px-1 py-0.5 transition-colors">
                <input 
                  checked={filters.document} 
                  onChange={(e) => setFilters({...filters, document: e.target.checked})}
                  className="rounded border-gray-300 text-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700" 
                  type="checkbox"
                />
                <span className="size-2 rounded-full bg-blue-500"></span>
                <span>文档 (Documents)</span>
              </label>
              <label className="flex items-center gap-2 text-sm text-text-secondary dark:text-gray-300 cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 rounded px-1 py-0.5 transition-colors">
                <input 
                  checked={filters.concept} 
                  onChange={(e) => setFilters({...filters, concept: e.target.checked})}
                  className="rounded border-gray-300 text-red-500 focus:ring-red-500 dark:border-gray-600 dark:bg-gray-700" 
                  type="checkbox"
                />
                <span className="size-2 rounded-full bg-red-500"></span>
                <span>概念 (Concepts)</span>
              </label>
              <label className="flex items-center gap-2 text-sm text-text-secondary dark:text-gray-300 cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 rounded px-1 py-0.5 transition-colors">
                <input 
                  checked={filters.person} 
                  onChange={(e) => setFilters({...filters, person: e.target.checked})}
                  className="rounded border-gray-300 text-green-500 focus:ring-green-500 dark:border-gray-600 dark:bg-gray-700" 
                  type="checkbox"
                />
                <span className="size-2 rounded-full bg-green-500"></span>
                <span>人物 (People)</span>
              </label>
              <label className="flex items-center gap-2 text-sm text-text-secondary dark:text-gray-300 cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 rounded px-1 py-0.5 transition-colors">
                <input 
                  checked={filters.other} 
                  onChange={(e) => setFilters({...filters, other: e.target.checked})}
                  className="rounded border-gray-300 text-purple-500 focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-700" 
                  type="checkbox"
                />
                <span className="size-2 rounded-full bg-purple-500"></span>
                <span>其他实体</span>
              </label>
            </div>
          </div>
          
          {/* Zoom Controls */}
          <div className="flex items-center justify-between rounded-xl border border-border-light bg-surface-light/95 p-2 shadow-lg backdrop-blur dark:border-border-dark dark:bg-surface-dark/95 pointer-events-auto">
            <button onClick={() => handleZoom('in')} className="p-2 rounded-lg hover:bg-background-light dark:hover:bg-white/5 text-text-secondary dark:text-gray-400" title="放大">
              <span className="material-symbols-outlined text-[20px]">add</span>
            </button>
            <button onClick={() => handleZoom('out')} className="p-2 rounded-lg hover:bg-background-light dark:hover:bg-white/5 text-text-secondary dark:text-gray-400" title="缩小">
              <span className="material-symbols-outlined text-[20px]">remove</span>
            </button>
            <button onClick={() => handleZoom('reset')} className="p-2 rounded-lg hover:bg-background-light dark:hover:bg-white/5 text-text-secondary dark:text-gray-400" title="重置视图">
              <span className="material-symbols-outlined text-[20px]">center_focus_strong</span>
            </button>
            <div className="h-4 w-px bg-border-light dark:bg-border-dark"></div>
            <button onClick={() => setNodes(INITIAL_NODES)} className="p-2 rounded-lg hover:bg-background-light dark:hover:bg-white/5 text-text-secondary dark:text-gray-400" title="重置布局">
              <span className="material-symbols-outlined text-[20px]">refresh</span>
            </button>
          </div>
        </div>

        {/* Main Graph Area */}
        <div 
          ref={containerRef}
          className="flex-1 bg-background-light dark:bg-[#0d1218] relative overflow-hidden bg-graph-pattern"
          style={{ cursor: isDragging ? (dragNodeId ? 'grabbing' : 'move') : 'default' }}
          onWheel={handleWheel}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {/* Status Badge */}
          <div className="absolute bottom-6 left-6 z-10 pointer-events-none select-none">
            <div className="flex items-center gap-2 rounded-full bg-surface-light/90 px-3 py-1.5 shadow border border-border-light dark:bg-surface-dark/90 dark:border-border-dark">
              <span className="material-symbols-outlined text-[16px] text-green-500 animate-pulse">sync</span>
              <span className="text-xs font-medium text-text-secondary dark:text-gray-300">实时更新中 ({visibleNodes.length} 节点)</span>
            </div>
          </div>

          <svg className="w-full h-full absolute inset-0 pointer-events-none">
            <defs>
              <marker id="arrowhead" markerHeight="7" markerWidth="10" orient="auto" refX="22" refY="3.5">
                <polygon fill="#94a3b8" points="0 0, 10 3.5, 0 7"></polygon>
              </marker>
              <marker id="arrowhead-selected" markerHeight="7" markerWidth="10" orient="auto" refX="22" refY="3.5">
                <polygon fill="#3b82f6" points="0 0, 10 3.5, 0 7"></polygon>
              </marker>
            </defs>

            <g transform={`translate(${viewState.x}, ${viewState.y}) scale(${viewState.zoom})`}>
              {/* Links */}
              {visibleLinks.map(link => {
                const source = visibleNodes.find(n => n.id === link.source);
                const target = visibleNodes.find(n => n.id === link.target);
                if (!source || !target) return null;
                
                const isSelected = selectedNodeId === source.id || selectedNodeId === target.id;

                return (
                  <line 
                    key={link.id}
                    x1={source.x} y1={source.y}
                    x2={target.x} y2={target.y}
                    stroke={isSelected ? '#60a5fa' : getLinkColor(link.type)}
                    strokeWidth={isSelected ? 2 : 1}
                    strokeOpacity={isSelected ? 1 : 0.6}
                    strokeDasharray={getLinkDash(link.type)}
                    markerEnd={isSelected ? "url(#arrowhead-selected)" : "url(#arrowhead)"}
                  />
                );
              })}

              {/* Nodes */}
              {visibleNodes.map(node => {
                const isSelected = selectedNodeId === node.id;
                
                return (
                  <g 
                    key={node.id} 
                    transform={`translate(${node.x}, ${node.y})`}
                    className="pointer-events-auto transition-transform duration-75"
                    onMouseDown={(e) => handleNodeMouseDown(e, node.id)}
                  >
                    {/* Ripple Effect for selected node */}
                    {isSelected && (
                       <circle r={node.radius + 10} fill={node.color} opacity="0.2">
                         <animate attributeName="r" from={node.radius} to={node.radius + 20} dur="1.5s" repeatCount="indefinite" />
                         <animate attributeName="opacity" from="0.4" to="0" dur="1.5s" repeatCount="indefinite" />
                       </circle>
                    )}
                    
                    {/* Main Node Circle */}
                    <circle 
                      r={node.radius} 
                      fill={isSelected ? node.color : node.color}
                      fillOpacity={isSelected ? 1 : 0.8}
                      stroke={isSelected ? 'white' : 'transparent'}
                      strokeWidth={isSelected ? 3 : 0}
                      className="cursor-pointer hover:stroke-2 hover:stroke-white/50 transition-all shadow-xl"
                    />
                    
                    {/* Icon */}
                    {viewState.zoom > 0.6 && (
                      <foreignObject x={-node.radius} y={-node.radius} width={node.radius * 2} height={node.radius * 2} className="pointer-events-none">
                        <div className="flex items-center justify-center w-full h-full text-white">
                           <span className="material-symbols-outlined" style={{ fontSize: `${node.radius * 1.2}px` }}>{node.icon || getNodeIcon(node.type)}</span>
                        </div>
                      </foreignObject>
                    )}

                    {/* Label */}
                    {viewState.zoom > 0.4 && (
                      <text 
                        y={node.radius + 12} 
                        textAnchor="middle" 
                        fill={isSelected ? node.color : '#64748b'} 
                        fontSize={10 / Math.sqrt(viewState.zoom) + 6}
                        fontWeight={isSelected ? 'bold' : 'normal'}
                        className="pointer-events-none select-none graph-text-shadow dark:fill-gray-300"
                        style={{ textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}
                      >
                        {node.label}
                      </text>
                    )}
                  </g>
                );
              })}
            </g>
          </svg>
        </div>

        {/* Details Sidebar (Right) */}
        <aside className={`w-80 border-l border-border-light bg-surface-light shadow-xl z-20 flex flex-col dark:bg-surface-dark dark:border-border-dark transition-all duration-300 ${selectedNode ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex items-center justify-between border-b border-border-light px-5 py-4 dark:border-border-dark">
            <h2 className="font-bold text-text-main dark:text-white">节点详情</h2>
            <button 
              onClick={() => setSelectedNodeId(null)}
              className="text-text-secondary hover:text-text-main dark:text-gray-400 dark:hover:text-white"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
          
          {selectedNode ? (
            <div className="flex-1 overflow-y-auto p-5 custom-scrollbar">
              <div className="flex flex-col items-center mb-6">
                <div className="relative mb-3">
                  <div 
                    className="flex size-16 items-center justify-center rounded-full ring-4 ring-opacity-20 shadow-lg text-white"
                    style={{ backgroundColor: selectedNode.color, '--tw-ring-color': selectedNode.color } as React.CSSProperties}
                  >
                    <span className="material-symbols-outlined text-[32px]">{selectedNode.icon || getNodeIcon(selectedNode.type)}</span>
                  </div>
                  {selectedNode.metadata.confidence > 0.9 && (
                    <span className="absolute bottom-0 right-0 rounded-full bg-white p-1 text-green-500 shadow-sm dark:bg-surface-dark border border-gray-100 dark:border-gray-700">
                      <span className="material-symbols-outlined text-[16px]">verified</span>
                    </span>
                  )}
                </div>
                <h3 className="text-xl font-bold text-text-main dark:text-white text-center break-words w-full">{selectedNode.label}</h3>
                <span 
                  className="mt-1 rounded-full px-2.5 py-0.5 text-xs font-medium bg-opacity-10"
                  style={{ backgroundColor: `${selectedNode.color}20`, color: selectedNode.color }}
                >
                  {selectedNode.type.toUpperCase()}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="rounded-lg bg-background-light p-3 text-center dark:bg-white/5">
                  <span className="block text-xl font-bold text-text-main dark:text-white">{selectedNode.metadata.relatedCount}</span>
                  <span className="text-xs text-text-secondary dark:text-gray-400">关联节点</span>
                </div>
                <div className="rounded-lg bg-background-light p-3 text-center dark:bg-white/5">
                  <span className="block text-xl font-bold text-text-main dark:text-white">{(selectedNode.metadata.confidence * 100).toFixed(0)}%</span>
                  <span className="text-xs text-text-secondary dark:text-gray-400">置信度</span>
                </div>
              </div>

              <div className="flex flex-col gap-2 mb-6">
                <button className="flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-white transition-all hover:bg-primary-dark hover:shadow-lg hover:shadow-primary/20">
                  <span className="material-symbols-outlined text-[18px]">forum</span>
                  语义检索此概念
                </button>
                <button className="flex items-center justify-center gap-2 rounded-lg border border-border-light bg-white px-4 py-2.5 text-sm font-medium text-text-main hover:bg-gray-5 dark:border-border-dark dark:bg-white/5 dark:text-white dark:hover:bg-white/10">
                  <span className="material-symbols-outlined text-[18px]">travel_explore</span>
                  探索关联关系
                </button>
              </div>

              <div className="mb-4">
                <h4 className="mb-3 text-sm font-bold text-text-main dark:text-white">直接关联 ({relatedNeighbors.length})</h4>
                <div className="flex flex-col gap-2 max-h-[240px] overflow-y-auto custom-scrollbar pr-1">
                  {relatedNeighbors.length > 0 ? relatedNeighbors.map((item, idx) => (
                    <div 
                      key={idx} 
                      onClick={() => setSelectedNodeId(item.node.id)}
                      className="group flex items-center gap-3 rounded-lg border border-border-light p-2 hover:border-primary/50 cursor-pointer transition-colors dark:border-border-dark dark:hover:border-primary/50 bg-white dark:bg-white/5"
                    >
                      <div 
                        className="flex size-8 shrink-0 items-center justify-center rounded bg-opacity-10"
                        style={{ backgroundColor: `${item.node.color}20`, color: item.node.color }}
                      >
                        <span className="material-symbols-outlined text-[16px]">{item.node.icon || getNodeIcon(item.node.type)}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="truncate text-sm font-medium text-text-main dark:text-white group-hover:text-primary">{item.node.label}</p>
                        <p className="text-xs text-text-secondary dark:text-gray-400 capitalize">{item.link.type} • 权重 {item.link.weight}</p>
                      </div>
                    </div>
                  )) : (
                    <p className="text-xs text-text-secondary dark:text-gray-500 py-2 text-center">无直接关联节点</p>
                  )}
                </div>
              </div>

              <div>
                <h4 className="mb-2 text-sm font-bold text-text-main dark:text-white">AI 摘要</h4>
                <div className="rounded-lg bg-blue-50 p-3 text-xs leading-relaxed text-text-secondary dark:bg-blue-900/20 dark:text-blue-100 border border-blue-100 dark:border-blue-900/30">
                  {selectedNode.metadata.description}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center text-text-secondary dark:text-gray-500">
               <p>请选择一个节点以查看详情</p>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
};