import React, { useState } from 'react';
import { Header } from '../components/Header';

// --- Types ---
interface RagConfig {
  chunkingStrategy: string;
  chunkSize: number;
  overlap: number;
  embeddingModel: string;
  topK: number;
  rerank: boolean;
}

interface RetrievalResult {
  fragments: { id: string; text: string; score: number }[];
  answer: string;
  metrics: {
    contextPrecision: number; // 上下文精确度 (Ragas metric)
    answerRelevancy: number; // 回答相关性 (Ragas metric)
    latency: number;
  };
}

const DEFAULT_CONFIG: RagConfig = {
  chunkingStrategy: 'recursive',
  chunkSize: 256,
  overlap: 32,
  embeddingModel: 'OpenAI text-embedding-3-small',
  topK: 3,
  rerank: false,
};

const MOCK_SOURCE_TEXT = `RAG（Retrieval-Augmented Generation）是一种通过结合外部知识库检索来增强大型语言模型生成能力的技术。传统的 LLM 虽然拥有强大的语言生成能力，但其知识仅限于训练数据，且无法实时更新。
RAG 系统通过三个关键步骤工作：首先是索引（Indexing），将文档分割成块并转换为向量存储；其次是检索（Retrieval），根据用户查询在向量数据库中查找最相关的片段；最后是生成（Generation），将检索到的上下文与查询一起输入 LLM，生成准确、基于事实的回答。
这种方法有效解决了 LLM 的“幻觉”问题，特别适用于企业知识库问答、垂直领域助手等场景。`;

export const RagLabPage: React.FC = () => {
  const [viewMode, setViewMode] = useState<'single' | 'compare'>('single');
  
  // Configurations
  const [configA, setConfigA] = useState<RagConfig>({ ...DEFAULT_CONFIG });
  const [configB, setConfigB] = useState<RagConfig>({ ...DEFAULT_CONFIG, chunkSize: 512, embeddingModel: 'Cohere-embed-multilingual-v3.0' });

  // Shared State
  const [sourceText, setSourceText] = useState(MOCK_SOURCE_TEXT);
  const [query, setQuery] = useState('RAG 的三个步骤是什么？');
  
  // Results
  const [resultA, setResultA] = useState<RetrievalResult | null>(null);
  const [resultB, setResultB] = useState<RetrievalResult | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  // --- Simulation Logic ---
  const simulateRun = () => {
    setIsRunning(true);
    setResultA(null);
    setResultB(null);

    setTimeout(() => {
      // Simulate Result A (Based on Config A)
      const isSmallChunkA = configA.chunkSize < 300;
      setResultA({
        fragments: [
          { id: 'chk_a1', text: isSmallChunkA ? 'RAG 系统通过三个关键步骤工作：首先是索引（Indexing）...' : 'RAG 系统通过三个关键步骤工作：首先是索引（Indexing），将文档分割成块并转换为向量存储；其次是检索（Retrieval）...', score: 0.92 },
          { id: 'chk_a2', text: isSmallChunkA ? '其次是检索（Retrieval），根据用户查询在向量数据库中...' : '最后是生成（Generation），将检索到的上下文与查询一起输入 LLM，生成准确、基于事实的回答。', score: 0.88 },
        ],
        answer: 'RAG 的三个主要步骤是：1. 索引 (Indexing) 2. 检索 (Retrieval) 3. 生成 (Generation)。',
        metrics: {
          contextPrecision: isSmallChunkA ? 0.95 : 0.82, // Smaller chunks usually higher precision
          answerRelevancy: 0.98,
          latency: 120
        }
      });

      // Simulate Result B (Based on Config B)
      if (viewMode === 'compare') {
        const isSmallChunkB = configB.chunkSize < 300;
        setResultB({
          fragments: [
            { id: 'chk_b1', text: '...将文档分割成块并转换为向量存储；其次是检索（Retrieval），根据用户查询在向量数据库中查找最相关的片段...', score: 0.89 },
            { id: 'chk_b2', text: '...适用于企业知识库问答、垂直领域助手等场景。', score: 0.75 }, // Slightly less relevant chunk simulating noise
          ],
          answer: '根据上下文，RAG 包含索引、检索和生成三个步骤。',
          metrics: {
            contextPrecision: isSmallChunkB ? 0.94 : 0.78, 
            answerRelevancy: 0.95,
            latency: configB.rerank ? 250 : 110 // Rerank increases latency
          }
        });
      }

      setIsRunning(false);
    }, 800);
  };

  // --- Render Helpers ---

  const renderConfigPanel = (config: RagConfig, setConfig: React.Dispatch<React.SetStateAction<RagConfig>>, label: string, colorClass: string) => (
    <div className={`rounded-xl border border-border-light bg-surface-light p-5 shadow-sm dark:border-border-dark dark:bg-surface-dark flex flex-col gap-5 h-full ${viewMode === 'compare' ? 'border-t-4' : ''} ${colorClass}`}>
      <div className="flex items-center justify-between">
         <h2 className="flex items-center gap-2 font-display text-lg font-bold text-text-main dark:text-white">
          <span className="material-symbols-outlined">tune</span>
          {label} 配置
        </h2>
        {viewMode === 'compare' && <span className="text-xs font-mono bg-background-light px-2 py-1 rounded dark:bg-white/10">{label}</span>}
      </div>

      {/* Chunking */}
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-text-secondary dark:text-gray-400">块大小 (Tokens)</span>
            <span className="font-mono font-medium text-text-main dark:text-white">{config.chunkSize}</span>
          </div>
          <input 
            type="range" min="64" max="1024" step="64" 
            value={config.chunkSize} 
            onChange={(e) => setConfig({ ...config, chunkSize: Number(e.target.value) })}
            className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 accent-primary dark:bg-gray-700" 
          />
        </div>
        <div className="space-y-2">
           <div className="flex justify-between text-sm">
            <span className="text-text-secondary dark:text-gray-400">重叠窗口</span>
            <span className="font-mono font-medium text-text-main dark:text-white">{config.overlap}</span>
          </div>
          <input 
            type="range" min="0" max="128" step="8" 
            value={config.overlap} 
            onChange={(e) => setConfig({ ...config, overlap: Number(e.target.value) })}
            className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 accent-primary dark:bg-gray-700" 
          />
        </div>
      </div>

      {/* Embedding */}
      <div className="flex flex-col gap-3">
        <label className="text-sm font-medium text-text-main dark:text-white">嵌入模型</label>
        <select 
          className="w-full rounded-lg border-border-light bg-background-light px-3 py-2 text-sm text-text-main focus:border-primary focus:ring-primary dark:border-border-dark dark:bg-background-dark dark:text-white"
          value={config.embeddingModel}
          onChange={(e) => setConfig({ ...config, embeddingModel: e.target.value })}
        >
          <option>OpenAI text-embedding-3-small</option>
          <option>OpenAI text-embedding-3-large</option>
          <option>Cohere-embed-multilingual-v3.0</option>
        </select>
      </div>

      {/* Retrieval */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-text-secondary dark:text-gray-400">Top K (召回数)</span>
          <span className="font-mono font-medium text-text-main dark:text-white">{config.topK}</span>
        </div>
        <input 
          type="range" min="1" max="10" step="1" 
          value={config.topK}
          onChange={(e) => setConfig({ ...config, topK: Number(e.target.value) })}
          className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 accent-primary dark:bg-gray-700" 
        />
      </div>

      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-text-main dark:text-white">启用重排序 (Rerank)</span>
        <button 
          onClick={() => setConfig({...config, rerank: !config.rerank})}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${config.rerank ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-700'}`}
        >
          <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${config.rerank ? 'translate-x-6' : 'translate-x-1'}`}></span>
        </button>
      </div>
    </div>
  );

  const renderResultCard = (result: RetrievalResult | null, label: string) => (
    <div className="flex flex-col gap-4 h-full">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold uppercase tracking-wider text-text-secondary dark:text-gray-400">{label} 结果分析</h3>
        {result && (
          <span className="text-xs text-green-600 bg-green-100 px-2 py-0.5 rounded-full dark:bg-green-900/30 dark:text-green-400">
            耗时 {result.metrics.latency}ms
          </span>
        )}
      </div>

      {!result ? (
        <div className="flex-1 flex flex-col items-center justify-center rounded-xl border border-dashed border-border-light bg-background-light/50 p-8 text-text-secondary dark:border-border-dark dark:bg-white/5">
           <span className="material-symbols-outlined text-[32px] opacity-50 mb-2">science</span>
           <p className="text-sm">点击“运行模拟”查看结果</p>
        </div>
      ) : (
        <div className="flex-1 flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
          {/* Metrics Visualization (Ragas Style) */}
          <div className="grid grid-cols-2 gap-3">
             <div className="rounded-lg bg-white p-3 border border-border-light shadow-sm dark:bg-surface-dark dark:border-border-dark">
                <div className="flex items-center justify-between mb-2">
                   <span className="text-xs text-text-secondary dark:text-gray-400">Context Precision</span>
                   <span className="material-symbols-outlined text-[14px] text-primary" title="检索到的上下文与问题的相关程度">info</span>
                </div>
                <div className="flex items-end gap-2">
                   <span className="text-xl font-bold text-text-main dark:text-white">{result.metrics.contextPrecision.toFixed(2)}</span>
                   <div className="h-1.5 flex-1 bg-gray-100 rounded-full mb-1.5 overflow-hidden dark:bg-gray-700">
                      <div className={`h-full rounded-full ${result.metrics.contextPrecision > 0.8 ? 'bg-green-500' : 'bg-yellow-500'}`} style={{ width: `${result.metrics.contextPrecision * 100}%` }}></div>
                   </div>
                </div>
             </div>
             <div className="rounded-lg bg-white p-3 border border-border-light shadow-sm dark:bg-surface-dark dark:border-border-dark">
                <div className="flex items-center justify-between mb-2">
                   <span className="text-xs text-text-secondary dark:text-gray-400">Answer Relevancy</span>
                   <span className="material-symbols-outlined text-[14px] text-primary" title="生成回答与问题的相关程度">info</span>
                </div>
                <div className="flex items-end gap-2">
                   <span className="text-xl font-bold text-text-main dark:text-white">{result.metrics.answerRelevancy.toFixed(2)}</span>
                   <div className="h-1.5 flex-1 bg-gray-100 rounded-full mb-1.5 overflow-hidden dark:bg-gray-700">
                      <div className={`h-full rounded-full ${result.metrics.answerRelevancy > 0.9 ? 'bg-green-500' : 'bg-yellow-500'}`} style={{ width: `${result.metrics.answerRelevancy * 100}%` }}></div>
                   </div>
                </div>
             </div>
          </div>

          {/* Retrieved Chunks */}
          <div className="flex flex-col gap-2 rounded-xl bg-background-light/50 p-3 border border-border-light dark:bg-white/5 dark:border-border-dark flex-1">
             <span className="text-xs font-bold text-text-secondary uppercase">检索片段 (Top {result.fragments.length})</span>
             <div className="flex-1 overflow-y-auto custom-scrollbar max-h-[200px] space-y-2 pr-1">
                {result.fragments.map((frag, idx) => (
                  <div key={frag.id} className="rounded-lg bg-white p-2.5 text-xs shadow-sm border border-border-light dark:bg-surface-dark dark:border-border-dark dark:text-gray-300">
                     <div className="flex justify-between mb-1 text-[10px] text-text-secondary dark:text-gray-500">
                        <span className="font-mono">#{idx + 1} ID: {frag.id}</span>
                        <span className="font-bold text-primary">Score: {frag.score}</span>
                     </div>
                     {frag.text}
                  </div>
                ))}
             </div>
          </div>
          
          {/* Final Answer */}
          <div className="rounded-xl bg-blue-50/50 p-3 border border-blue-100 dark:bg-blue-900/10 dark:border-blue-900/30">
             <span className="text-xs font-bold text-blue-700 dark:text-blue-400 uppercase mb-1 block">生成回答</span>
             <p className="text-sm text-text-main dark:text-gray-200">{result.answer}</p>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="flex flex-col h-full bg-background-light overflow-hidden">
      <Header 
        breadcrumbs={['RAG 实验室']} 
        showSearch={false}
        extraContent={
           <div className="flex items-center gap-4">
             <div className="flex items-center bg-surface-light border border-border-light rounded-lg p-0.5 dark:bg-surface-dark dark:border-border-dark">
               <button 
                 onClick={() => setViewMode('single')}
                 className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${viewMode === 'single' ? 'bg-background-light text-text-main shadow-sm dark:bg-white/10 dark:text-white' : 'text-text-secondary hover:text-text-main dark:text-gray-400'}`}
               >
                 单视图
               </button>
               <button 
                 onClick={() => setViewMode('compare')}
                 className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all flex items-center gap-1 ${viewMode === 'compare' ? 'bg-primary/10 text-primary shadow-sm dark:bg-primary/20' : 'text-text-secondary hover:text-text-main dark:text-gray-400'}`}
               >
                 <span className="material-symbols-outlined text-[14px]">compare_arrows</span>
                 对比模式
               </button>
             </div>
             <span className="h-4 w-px bg-border-light dark:bg-border-dark"></span>
             <div className="flex items-center gap-2">
               <span className="text-xs font-medium text-text-secondary dark:text-gray-400">环境:</span>
               <span className="rounded bg-green-100 px-2 py-0.5 text-xs font-bold text-green-700 dark:bg-green-900/30 dark:text-green-400">Sandbox</span>
             </div>
          </div>
        }
      />
      
      <div className="flex-1 overflow-y-auto p-4 lg:p-6 bg-background-light dark:bg-background-dark">
        <div className="mx-auto flex max-w-[1600px] flex-col gap-6 h-full">
          
          {/* Top Section: Shared Data & Query */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
             <div className="lg:col-span-12 rounded-xl border border-border-light bg-surface-light p-5 shadow-sm dark:border-border-dark dark:bg-surface-dark flex flex-col md:flex-row gap-6">
                <div className="flex-1 flex flex-col gap-3">
                   <div className="flex items-center justify-between">
                     <h2 className="flex items-center gap-2 font-display text-sm font-bold text-text-main dark:text-white">
                       <span className="material-symbols-outlined text-primary text-[18px]">database</span>
                       测试数据源 (Context)
                     </h2>
                   </div>
                   <textarea 
                      className="flex-1 min-h-[100px] w-full resize-none rounded-lg border-border-light bg-background-light p-3 text-xs text-text-main focus:border-primary focus:ring-primary dark:border-border-dark dark:bg-background-dark dark:text-white" 
                      value={sourceText}
                      onChange={(e) => setSourceText(e.target.value)}
                   />
                </div>
                <div className="flex-1 flex flex-col gap-3">
                   <h2 className="flex items-center gap-2 font-display text-sm font-bold text-text-main dark:text-white">
                       <span className="material-symbols-outlined text-orange-500 text-[18px]">search</span>
                       测试提问 (Query)
                   </h2>
                   <div className="relative">
                      <input 
                        className="w-full rounded-lg border-border-light bg-background-light pl-10 pr-4 py-2.5 text-sm text-text-main focus:border-primary focus:ring-primary dark:border-border-dark dark:bg-background-dark dark:text-white"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                      />
                      <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary text-[18px]">search</span>
                   </div>
                   <button 
                     onClick={simulateRun}
                     disabled={isRunning}
                     className="mt-auto flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-bold text-white shadow-md hover:bg-primary-dark transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                   >
                     {isRunning ? (
                       <span className="material-symbols-outlined animate-spin text-[20px]">sync</span>
                     ) : (
                       <span className="material-symbols-outlined text-[20px]">play_arrow</span>
                     )}
                     {viewMode === 'compare' ? '运行对比测试' : '运行模拟'}
                   </button>
                </div>
             </div>
          </div>

          {/* Main Layout: Single vs Compare */}
          {viewMode === 'single' ? (
             <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full min-h-[500px]">
               {/* Left: Config A */}
               <div className="lg:col-span-4">
                  {renderConfigPanel(configA, setConfigA, 'RAG', '')}
               </div>
               
               {/* Right: Visualization & Result A */}
               <div className="lg:col-span-8 flex flex-col gap-6">
                 {/* Chunk Visualizer (Keep simple for now or reuse existing logic if complex) */}
                 <div className="rounded-xl border border-border-light bg-surface-light p-5 shadow-sm dark:border-border-dark dark:bg-surface-dark flex flex-col">
                    <h2 className="flex items-center gap-2 font-display text-lg font-bold text-text-main dark:text-white mb-4">
                      <span className="material-symbols-outlined text-blue-500">view_quilt</span>
                      分块可视化
                    </h2>
                    <div className="flex-1 bg-background-light dark:bg-[#111] rounded-lg p-4 grid gap-3 grid-cols-3 custom-scrollbar overflow-y-auto max-h-[200px]">
                        {[1,2,3].map(i => (
                          <div key={i} className="rounded border border-border-light bg-white p-3 shadow-sm dark:bg-surface-dark dark:border-white/10 opacity-80">
                            <div className="h-2 w-12 bg-gray-200 rounded mb-2 dark:bg-gray-700"></div>
                            <div className="space-y-1">
                              <div className="h-1.5 w-full bg-gray-100 rounded dark:bg-gray-800"></div>
                              <div className="h-1.5 w-3/4 bg-gray-100 rounded dark:bg-gray-800"></div>
                              <div className="h-1.5 w-5/6 bg-gray-100 rounded dark:bg-gray-800"></div>
                            </div>
                          </div>
                        ))}
                    </div>
                 </div>

                 {/* Result A */}
                 <div className="flex-1 rounded-xl border border-border-light bg-surface-light p-5 shadow-sm dark:border-border-dark dark:bg-surface-dark">
                    {renderResultCard(resultA, '模拟')}
                 </div>
               </div>
             </div>
          ) : (
            /* COMPARISON VIEW */
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full min-h-[600px]">
               {/* Column A */}
               <div className="flex flex-col gap-6">
                  <div className="flex-none">
                    {renderConfigPanel(configA, setConfigA, '配置 A', 'border-blue-500/50')}
                  </div>
                  <div className="flex-1 rounded-xl border border-border-light bg-surface-light p-5 shadow-sm dark:border-border-dark dark:bg-surface-dark relative overflow-hidden">
                     {/* Decorative bg for A */}
                     <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                        <span className="text-[100px] font-bold text-blue-500">A</span>
                     </div>
                     {renderResultCard(resultA, '配置 A')}
                  </div>
               </div>

               {/* Column B */}
               <div className="flex flex-col gap-6">
                  <div className="flex-none">
                     {renderConfigPanel(configB, setConfigB, '配置 B', 'border-purple-500/50')}
                  </div>
                  <div className="flex-1 rounded-xl border border-border-light bg-surface-light p-5 shadow-sm dark:border-border-dark dark:bg-surface-dark relative overflow-hidden">
                     {/* Decorative bg for B */}
                     <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                        <span className="text-[100px] font-bold text-purple-500">B</span>
                     </div>
                     {renderResultCard(resultB, '配置 B')}
                  </div>
               </div>
            </div>
          )}
          
        </div>
      </div>
    </div>
  );
};