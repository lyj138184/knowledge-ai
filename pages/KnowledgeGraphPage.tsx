import React from 'react';
import { Header } from '../components/Header';

export const KnowledgeGraphPage: React.FC = () => {
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
              <button className="text-xs text-primary hover:text-primary-dark">重置</button>
            </div>
            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-2 text-sm text-text-secondary dark:text-gray-300 cursor-pointer">
                <input defaultChecked className="rounded border-gray-300 text-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700" type="checkbox"/>
                <span className="size-2 rounded-full bg-blue-500"></span>
                <span>文档 (Documents)</span>
              </label>
              <label className="flex items-center gap-2 text-sm text-text-secondary dark:text-gray-300 cursor-pointer">
                <input defaultChecked className="rounded border-gray-300 text-red-500 focus:ring-red-500 dark:border-gray-600 dark:bg-gray-700" type="checkbox"/>
                <span className="size-2 rounded-full bg-red-500"></span>
                <span>概念 (Concepts)</span>
              </label>
              <label className="flex items-center gap-2 text-sm text-text-secondary dark:text-gray-300 cursor-pointer">
                <input defaultChecked className="rounded border-gray-300 text-green-500 focus:ring-green-500 dark:border-gray-600 dark:bg-gray-700" type="checkbox"/>
                <span className="size-2 rounded-full bg-green-500"></span>
                <span>人物 (People)</span>
              </label>
              <label className="flex items-center gap-2 text-sm text-text-secondary dark:text-gray-300 cursor-pointer">
                <input className="rounded border-gray-300 text-yellow-500 focus:ring-yellow-500 dark:border-gray-600 dark:bg-gray-700" type="checkbox"/>
                <span className="size-2 rounded-full bg-yellow-500"></span>
                <span>其他实体</span>
              </label>
            </div>
            <div className="border-t border-border-light dark:border-border-dark my-1"></div>
            <div className="flex flex-col gap-2">
              <span className="text-xs font-semibold text-text-secondary dark:text-gray-400">关联度阈值</span>
              <input className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-primary" max="100" min="0" type="range" defaultValue="30"/>
            </div>
          </div>
          
          {/* Zoom Controls */}
          <div className="flex items-center justify-between rounded-xl border border-border-light bg-surface-light/95 p-2 shadow-lg backdrop-blur dark:border-border-dark dark:bg-surface-dark/95 pointer-events-auto">
            <button className="p-2 rounded-lg hover:bg-background-light dark:hover:bg-white/5 text-text-secondary dark:text-gray-400" title="Zoom In">
              <span className="material-symbols-outlined text-[20px]">add</span>
            </button>
            <button className="p-2 rounded-lg hover:bg-background-light dark:hover:bg-white/5 text-text-secondary dark:text-gray-400" title="Zoom Out">
              <span className="material-symbols-outlined text-[20px]">remove</span>
            </button>
            <button className="p-2 rounded-lg hover:bg-background-light dark:hover:bg-white/5 text-text-secondary dark:text-gray-400" title="Fit to Screen">
              <span className="material-symbols-outlined text-[20px]">center_focus_strong</span>
            </button>
            <div className="h-4 w-px bg-border-light dark:bg-border-dark"></div>
            <button className="p-2 rounded-lg hover:bg-background-light dark:hover:bg-white/5 text-text-secondary dark:text-gray-400" title="Refresh Layout">
              <span className="material-symbols-outlined text-[20px]">refresh</span>
            </button>
          </div>
        </div>

        {/* Main Graph Area */}
        <div className="flex-1 bg-background-light dark:bg-[#0d1218] relative overflow-hidden bg-graph-pattern cursor-grab active:cursor-grabbing">
          {/* Status Badge */}
          <div className="absolute bottom-6 left-6 z-10 pointer-events-none">
            <div className="flex items-center gap-2 rounded-full bg-surface-light/90 px-3 py-1.5 shadow border border-border-light dark:bg-surface-dark/90 dark:border-border-dark">
              <span className="material-symbols-outlined text-[16px] text-green-500 animate-pulse">sync</span>
              <span className="text-xs font-medium text-text-secondary dark:text-gray-300">实时更新中</span>
            </div>
          </div>

          <svg className="w-full h-full absolute inset-0 pointer-events-auto" style={{ pointerEvents: 'all' }}>
            <defs>
              <marker id="arrowhead" markerHeight="7" markerWidth="10" orient="auto" refX="28" refY="3.5">
                <polygon fill="#94a3b8" points="0 0, 10 3.5, 0 7"></polygon>
              </marker>
              <marker id="arrowhead-active" markerHeight="7" markerWidth="10" orient="auto" refX="28" refY="3.5">
                <polygon fill="#3b82f6" points="0 0, 10 3.5, 0 7"></polygon>
              </marker>
            </defs>

            {/* Static Lines */}
            <line className="dark:stroke-slate-700" stroke="#cbd5e1" strokeWidth="1" x1="300" x2="500" y1="300" y2="200"></line>
            <line className="dark:stroke-slate-700" stroke="#cbd5e1" strokeWidth="1" x1="300" x2="200" y1="300" y2="500"></line>
            <line className="dark:stroke-slate-700" stroke="#cbd5e1" strokeWidth="1" x1="500" x2="700" y1="200" y2="300"></line>
            <line className="dark:stroke-slate-700" stroke="#cbd5e1" strokeWidth="1" x1="700" x2="650" y1="300" y2="550"></line>

            {/* Active/Dashed Lines */}
            <g opacity="0.8">
              <line markerEnd="url(#arrowhead)" stroke="#94a3b8" strokeDasharray="4" strokeWidth="1.5" x1="550" x2="300" y1="450" y2="300"></line>
              <line markerEnd="url(#arrowhead)" stroke="#94a3b8" strokeWidth="1.5" x1="550" x2="700" y1="450" y2="300"></line>
              <line markerEnd="url(#arrowhead)" stroke="#94a3b8" strokeWidth="1.5" x1="550" x2="500" y1="450" y2="200"></line>
              <line markerEnd="url(#arrowhead-active)" stroke="#60a5fa" strokeWidth="2" x1="550" x2="800" y1="450" y2="500"></line>
            </g>

            {/* Nodes */}
            <g transform="translate(300, 300)">
              <circle fill="#ef4444" fillOpacity="0.2" r="15"></circle>
              <circle className="cursor-pointer hover:stroke-2 hover:stroke-white" fill="#ef4444" r="8"></circle>
              <text className="font-sans" fill="#64748b" fontSize="10" textAnchor="middle" y="25">人工智能</text>
            </g>
            <g transform="translate(200, 500)">
              <circle className="cursor-pointer hover:stroke-2 hover:stroke-white" fill="#3b82f6" r="6"></circle>
            </g>
            <g transform="translate(500, 200)">
              <circle fill="#ef4444" fillOpacity="0.2" r="12"></circle>
              <circle className="cursor-pointer hover:stroke-2 hover:stroke-white" fill="#ef4444" r="6"></circle>
              <text className="font-sans" fill="#64748b" fontSize="10" textAnchor="middle" y="20">机器学习</text>
            </g>
            <g transform="translate(700, 300)">
              <circle className="cursor-pointer hover:stroke-2 hover:stroke-white" fill="#3b82f6" r="6"></circle>
              <text className="font-sans" fill="#64748b" fontSize="10" textAnchor="middle" y="20">Q3 财报.pdf</text>
            </g>
            <g transform="translate(650, 550)">
              <circle className="cursor-pointer hover:stroke-2 hover:stroke-white" fill="#22c55e" r="8"></circle>
              <text className="font-sans" fill="#64748b" fontSize="10" textAnchor="middle" y="22">Sam Altman</text>
            </g>
            <g className="cursor-pointer" transform="translate(550, 450)">
              <circle fill="#f59e0b" fillOpacity="0.1" r="40">
                <animate attributeName="r" dur="2s" from="20" repeatCount="indefinite" to="50"></animate>
                <animate attributeName="opacity" dur="2s" from="0.5" repeatCount="indefinite" to="0"></animate>
              </circle>
              <circle className="shadow-xl dark:stroke-gray-800" fill="#f59e0b" r="25" stroke="white" strokeWidth="3"></circle>
              <text fill="white" fontFamily="Material Symbols Outlined" fontSize="20" textAnchor="middle" x="0" y="5">lightbulb</text>
              <text className="font-sans drop-shadow-md" fill="#f59e0b" fontSize="12" fontWeight="bold" textAnchor="middle" y="45">RAG 检索增强</text>
            </g>
            <g transform="translate(800, 500)">
              <circle fill="#3b82f6" fillOpacity="0.1" r="20" stroke="#3b82f6" strokeDasharray="2" strokeWidth="1"></circle>
              <circle className="cursor-pointer hover:stroke-2 hover:stroke-white" fill="#3b82f6" r="8"></circle>
              <text className="font-sans" fill="#64748b" fontSize="10" textAnchor="middle" y="25">技术白皮书_v2</text>
            </g>
          </svg>
        </div>

        {/* Details Sidebar (Right) */}
        <aside className="w-80 border-l border-border-light bg-surface-light shadow-xl z-20 flex flex-col dark:bg-surface-dark dark:border-border-dark transition-all duration-300">
          <div className="flex items-center justify-between border-b border-border-light px-5 py-4 dark:border-border-dark">
            <h2 className="font-bold text-text-main dark:text-white">节点详情</h2>
            <button className="text-text-secondary hover:text-text-main dark:text-gray-400 dark:hover:text-white">
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-5">
            <div className="flex flex-col items-center mb-6">
              <div className="relative mb-3">
                <div className="flex size-16 items-center justify-center rounded-full bg-orange-100 text-orange-500 ring-4 ring-orange-50 dark:bg-orange-900/30 dark:text-orange-400 dark:ring-orange-900/10">
                  <span className="material-symbols-outlined text-[32px]">lightbulb</span>
                </div>
                <span className="absolute bottom-0 right-0 rounded-full bg-white p-1 text-green-500 shadow-sm dark:bg-surface-dark">
                  <span className="material-symbols-outlined text-[16px]">verified</span>
                </span>
              </div>
              <h3 className="text-xl font-bold text-text-main dark:text-white text-center">RAG 检索增强</h3>
              <span className="mt-1 rounded-full bg-orange-100 px-2.5 py-0.5 text-xs font-medium text-orange-700 dark:bg-orange-900/30 dark:text-orange-300">
                核心概念
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="rounded-lg bg-background-light p-3 text-center dark:bg-white/5">
                <span className="block text-xl font-bold text-text-main dark:text-white">24</span>
                <span className="text-xs text-text-secondary dark:text-gray-400">关联文档</span>
              </div>
              <div className="rounded-lg bg-background-light p-3 text-center dark:bg-white/5">
                <span className="block text-xl font-bold text-text-main dark:text-white">98%</span>
                <span className="text-xs text-text-secondary dark:text-gray-400">置信度</span>
              </div>
            </div>
            <div className="flex flex-col gap-2 mb-6">
              <button className="flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-white transition-all hover:bg-primary-dark hover:shadow-lg hover:shadow-primary/20">
                <span className="material-symbols-outlined text-[18px]">forum</span>
                语义检索此概念
              </button>
              <button className="flex items-center justify-center gap-2 rounded-lg border border-border-light bg-white px-4 py-2.5 text-sm font-medium text-text-main hover:bg-gray-50 dark:border-border-dark dark:bg-white/5 dark:text-white dark:hover:bg-white/10">
                <span className="material-symbols-outlined text-[18px]">travel_explore</span>
                探索关联关系
              </button>
            </div>
            <div className="mb-4">
              <h4 className="mb-3 text-sm font-bold text-text-main dark:text-white">直接关联</h4>
              <div className="flex flex-col gap-2">
                <div className="group flex items-center gap-3 rounded-lg border border-border-light p-2 hover:border-primary/50 cursor-pointer transition-colors dark:border-border-dark dark:hover:border-primary/50 bg-white dark:bg-white/5">
                  <div className="flex size-8 shrink-0 items-center justify-center rounded bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                    <span className="material-symbols-outlined text-[16px]">description</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="truncate text-sm font-medium text-text-main dark:text-white group-hover:text-primary">技术白皮书_v2.pdf</p>
                    <p className="text-xs text-text-secondary dark:text-gray-400">引用 • 权重 0.95</p>
                  </div>
                </div>
                <div className="group flex items-center gap-3 rounded-lg border border-border-light p-2 hover:border-primary/50 cursor-pointer transition-colors dark:border-border-dark dark:hover:border-primary/50 bg-white dark:bg-white/5">
                  <div className="flex size-8 shrink-0 items-center justify-center rounded bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400">
                    <span className="material-symbols-outlined text-[16px]">hub</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="truncate text-sm font-medium text-text-main dark:text-white group-hover:text-primary">向量数据库</p>
                    <p className="text-xs text-text-secondary dark:text-gray-400">包含于 • 权重 0.82</p>
                  </div>
                </div>
                <div className="group flex items-center gap-3 rounded-lg border border-border-light p-2 hover:border-primary/50 cursor-pointer transition-colors dark:border-border-dark dark:hover:border-primary/50 bg-white dark:bg-white/5">
                  <div className="flex size-8 shrink-0 items-center justify-center rounded bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400">
                    <span className="material-symbols-outlined text-[16px]">hub</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="truncate text-sm font-medium text-text-main dark:text-white group-hover:text-primary">LLM 大语言模型</p>
                    <p className="text-xs text-text-secondary dark:text-gray-400">相关 • 权重 0.76</p>
                  </div>
                </div>
              </div>
              <button className="mt-2 w-full text-center text-xs text-primary hover:underline">查看全部 24 个关联</button>
            </div>
            <div>
              <h4 className="mb-2 text-sm font-bold text-text-main dark:text-white">AI 摘要</h4>
              <div className="rounded-lg bg-blue-50 p-3 text-xs leading-relaxed text-text-secondary dark:bg-blue-900/20 dark:text-blue-100">
                检索增强生成（RAG）是一种技术，通过从外部知识库检索相关信息来优化大型语言模型的输出，从而提高回答的准确性和上下文相关性。
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};