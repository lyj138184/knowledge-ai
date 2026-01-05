import React, { useState } from 'react';
import { Header } from '../components/Header';

export const RagLabPage: React.FC = () => {
  const [chunkSize, setChunkSize] = useState(256);
  const [overlap, setOverlap] = useState(32);
  const [topK, setTopK] = useState(3);

  return (
    <div className="flex flex-col h-full bg-background-light overflow-hidden">
      <Header 
        breadcrumbs={['RAG 实验室']} 
        showSearch={false}
        extraContent={
           <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-text-secondary dark:text-gray-400">环境:</span>
            <span className="rounded bg-green-100 px-2 py-0.5 text-xs font-bold text-green-700 dark:bg-green-900/30 dark:text-green-400">Sandbox</span>
          </div>
        }
      />
      
      <div className="flex-1 overflow-y-auto p-4 lg:p-6 bg-background-light dark:bg-background-dark">
        <div className="mx-auto flex max-w-[1600px] flex-col gap-6 h-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full">
            {/* Left Column Configuration */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              
              {/* Data Source */}
              <div className="rounded-xl border border-border-light bg-surface-light p-5 shadow-sm dark:border-border-dark dark:bg-surface-dark flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <h2 className="flex items-center gap-2 font-display text-lg font-bold text-text-main dark:text-white">
                    <span className="material-symbols-outlined text-primary">input</span>
                    测试数据源
                  </h2>
                  <button className="text-xs font-medium text-primary hover:text-primary-dark">清空</button>
                </div>
                <div className="relative">
                  <textarea 
                    className="h-48 w-full resize-none rounded-lg border-border-light bg-background-light p-3 text-sm text-text-main placeholder-text-secondary focus:border-primary focus:ring-primary dark:border-border-dark dark:bg-background-dark dark:text-white dark:placeholder-gray-500" 
                    placeholder="在此粘贴文本作为 RAG 测试源..." 
                    spellCheck={false}
                    defaultValue="RAG（Retrieval-Augmented Generation）是一种通过结合外部知识库检索来增强大型语言模型生成能力的技术。传统的 LLM 虽然拥有强大的语言生成能力，但其知识仅限于训练数据，且无法实时更新。
RAG 系统通过三个关键步骤工作：首先是索引（Indexing），将文档分割成块并转换为向量存储；其次是检索（Retrieval），根据用户查询在向量数据库中查找最相关的片段；最后是生成（Generation），将检索到的上下文与查询一起输入 LLM，生成准确、基于事实的回答。
这种方法有效解决了 LLM 的“幻觉”问题，特别适用于企业知识库问答、垂直领域助手等场景。"
                  ></textarea>
                  <div className="absolute bottom-2 right-2 flex gap-3 text-xs text-text-secondary bg-background-light/80 dark:bg-background-dark/80 px-2 py-1 rounded">
                    <span>246 字符</span>
                    <span className="font-medium text-primary">~180 Tokens</span>
                  </div>
                </div>
                <div className="flex items-center justify-between border-t border-border-light pt-4 dark:border-border-dark">
                  <span className="text-sm text-text-secondary dark:text-gray-400">或者上传文件</span>
                  <button className="flex items-center gap-1.5 rounded-lg border border-border-light bg-white px-3 py-1.5 text-xs font-medium text-text-main shadow-sm hover:bg-gray-50 dark:border-border-dark dark:bg-white/5 dark:text-white dark:hover:bg-white/10">
                    <span className="material-symbols-outlined text-[16px]">upload_file</span>
                    上传文档 (PDF/MD)
                  </button>
                </div>
              </div>

              {/* Chunking Strategy */}
              <div className="rounded-xl border border-border-light bg-surface-light p-5 shadow-sm dark:border-border-dark dark:bg-surface-dark flex flex-col gap-5">
                <h2 className="flex items-center gap-2 font-display text-lg font-bold text-text-main dark:text-white">
                  <span className="material-symbols-outlined text-purple-500">content_cut</span>
                  分块策略 (Chunking)
                </h2>
                <div className="flex flex-col gap-3">
                  <label className="text-sm font-medium text-text-main dark:text-white">切分方法</label>
                  <div className="grid grid-cols-3 gap-2">
                    <label className="cursor-pointer">
                      <input type="radio" name="chunking_strategy" className="peer sr-only" defaultChecked />
                      <div className="flex flex-col items-center justify-center rounded-lg border border-border-light bg-background-light p-2 text-center text-xs font-medium text-text-secondary hover:bg-gray-100 peer-checked:border-primary peer-checked:bg-primary/5 peer-checked:text-primary dark:border-border-dark dark:bg-white/5 dark:hover:bg-white/10">
                        <span>递归字符</span>
                      </div>
                    </label>
                    <label className="cursor-pointer">
                      <input type="radio" name="chunking_strategy" className="peer sr-only" />
                      <div className="flex flex-col items-center justify-center rounded-lg border border-border-light bg-background-light p-2 text-center text-xs font-medium text-text-secondary hover:bg-gray-100 peer-checked:border-primary peer-checked:bg-primary/5 peer-checked:text-primary dark:border-border-dark dark:bg-white/5 dark:hover:bg-white/10">
                        <span>固定长度</span>
                      </div>
                    </label>
                    <label className="cursor-pointer">
                      <input type="radio" name="chunking_strategy" className="peer sr-only" />
                      <div className="flex flex-col items-center justify-center rounded-lg border border-border-light bg-background-light p-2 text-center text-xs font-medium text-text-secondary hover:bg-gray-100 peer-checked:border-primary peer-checked:bg-primary/5 peer-checked:text-primary dark:border-border-dark dark:bg-white/5 dark:hover:bg-white/10">
                        <span>Markdown</span>
                      </div>
                    </label>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-text-secondary dark:text-gray-400">块大小 (Tokens)</span>
                      <span className="font-mono font-medium text-text-main dark:text-white">{chunkSize}</span>
                    </div>
                    <input 
                      type="range" 
                      min="64" 
                      max="1024" 
                      step="64" 
                      value={chunkSize} 
                      onChange={(e) => setChunkSize(Number(e.target.value))}
                      className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 accent-primary dark:bg-gray-700" 
                    />
                    <div className="flex justify-between text-xs text-text-secondary/50">
                      <span>64</span>
                      <span>1024</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-text-secondary dark:text-gray-400">重叠窗口 (Tokens)</span>
                      <span className="font-mono font-medium text-text-main dark:text-white">{overlap}</span>
                    </div>
                    <input 
                      type="range" 
                      min="0" 
                      max="128" 
                      step="8" 
                      value={overlap} 
                      onChange={(e) => setOverlap(Number(e.target.value))}
                      className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 accent-primary dark:bg-gray-700" 
                    />
                  </div>
                </div>
              </div>

              {/* Retrieval Config */}
              <div className="rounded-xl border border-border-light bg-surface-light p-5 shadow-sm dark:border-border-dark dark:bg-surface-dark flex flex-col gap-5">
                <h2 className="flex items-center gap-2 font-display text-lg font-bold text-text-main dark:text-white">
                  <span className="material-symbols-outlined text-orange-500">manage_search</span>
                  检索配置
                </h2>
                <div className="flex flex-col gap-3">
                  <label className="text-sm font-medium text-text-main dark:text-white">嵌入模型 (Embedding)</label>
                  <select className="w-full rounded-lg border-border-light bg-background-light px-3 py-2 text-sm text-text-main focus:border-primary focus:ring-primary dark:border-border-dark dark:bg-background-dark dark:text-white">
                    <option>OpenAI text-embedding-3-small</option>
                    <option>OpenAI text-embedding-3-large</option>
                    <option>Cohere-embed-multilingual-v3.0</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-text-secondary dark:text-gray-400">Top K (召回数量)</span>
                    <span className="font-mono font-medium text-text-main dark:text-white">{topK}</span>
                  </div>
                  <input 
                    type="range" 
                    min="1" 
                    max="10" 
                    step="1" 
                    value={topK}
                    onChange={(e) => setTopK(Number(e.target.value))}
                    className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 accent-primary dark:bg-gray-700" 
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-text-main dark:text-white">启用重排序 (Rerank)</span>
                  <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
                    <span className="translate-x-6 inline-block h-4 w-4 transform rounded-full bg-white transition-transform"></span>
                  </button>
                </div>
              </div>

            </div>

            {/* Right Column Visualization & Simulator */}
            <div className="lg:col-span-8 flex flex-col gap-6">
              
              {/* Chunk Visualization */}
              <div className="flex-1 min-h-[400px] flex flex-col rounded-xl border border-border-light bg-surface-light shadow-sm dark:border-border-dark dark:bg-surface-dark">
                <div className="border-b border-border-light p-4 dark:border-border-dark flex items-center justify-between">
                  <h2 className="flex items-center gap-2 font-display text-lg font-bold text-text-main dark:text-white">
                    <span className="material-symbols-outlined text-blue-500">view_quilt</span>
                    分块可视化
                  </h2>
                  <span className="text-xs text-text-secondary dark:text-gray-400">预览: 3 个片段</span>
                </div>
                <div className="flex-1 overflow-y-auto p-4 custom-scrollbar bg-slate-50 dark:bg-[#111]">
                  <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    
                    <div className="group relative flex flex-col gap-2 rounded-lg border-l-4 border-l-blue-500 bg-white p-4 shadow-sm ring-1 ring-black/5 hover:shadow-md transition-all dark:bg-surface-dark dark:ring-white/10">
                      <div className="flex items-center justify-between text-xs text-text-secondary dark:text-gray-400">
                        <span className="font-mono">ID: chunk_01</span>
                        <span className="bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded dark:bg-blue-900/30 dark:text-blue-400">~85 Tokens</span>
                      </div>
                      <p className="text-sm leading-relaxed text-text-main dark:text-gray-300 line-clamp-6">
                        RAG（Retrieval-Augmented Generation）是一种通过结合外部知识库检索来增强大型语言模型生成能力的技术。传统的 LLM 虽然拥有强大的语言生成能力，但其知识仅限于训练数据，且无法实时更新。
                      </p>
                      <div className="mt-auto pt-2 text-xs text-text-secondary dark:text-gray-500 flex justify-between">
                        <span>Chars: 114</span>
                      </div>
                    </div>

                    <div className="group relative flex flex-col gap-2 rounded-lg border-l-4 border-l-purple-500 bg-white p-4 shadow-sm ring-1 ring-black/5 hover:shadow-md transition-all dark:bg-surface-dark dark:ring-white/10">
                      <div className="flex items-center justify-between text-xs text-text-secondary dark:text-gray-400">
                        <span className="font-mono">ID: chunk_02</span>
                        <span className="bg-purple-50 text-purple-600 px-1.5 py-0.5 rounded dark:bg-purple-900/30 dark:text-purple-400">~92 Tokens</span>
                      </div>
                      <p className="text-sm leading-relaxed text-text-main dark:text-gray-300 line-clamp-6">
                        <span className="bg-yellow-100 dark:bg-yellow-900/40 text-yellow-800 dark:text-yellow-200 rounded px-0.5" title="Overlap">无法实时更新。</span> RAG 系统通过三个关键步骤工作：首先是索引（Indexing），将文档分割成块并转换为向量存储；其次是检索（Retrieval），根据用户查询在向量数据库中查找最相关的片段；
                      </p>
                      <div className="mt-auto pt-2 text-xs text-text-secondary dark:text-gray-500 flex justify-between">
                         <span>Chars: 128</span>
                      </div>
                    </div>

                    <div className="group relative flex flex-col gap-2 rounded-lg border-l-4 border-l-green-500 bg-white p-4 shadow-sm ring-1 ring-black/5 hover:shadow-md transition-all dark:bg-surface-dark dark:ring-white/10">
                      <div className="flex items-center justify-between text-xs text-text-secondary dark:text-gray-400">
                        <span className="font-mono">ID: chunk_03</span>
                        <span className="bg-green-50 text-green-600 px-1.5 py-0.5 rounded dark:bg-green-900/30 dark:text-green-400">~65 Tokens</span>
                      </div>
                      <p className="text-sm leading-relaxed text-text-main dark:text-gray-300 line-clamp-6">
                        <span className="bg-yellow-100 dark:bg-yellow-900/40 text-yellow-800 dark:text-yellow-200 rounded px-0.5" title="Overlap">最相关的片段；</span>最后是生成（Generation），将检索到的上下文与查询一起输入 LLM，生成准确、基于事实的回答。
                      </p>
                      <div className="mt-auto pt-2 text-xs text-text-secondary dark:text-gray-500 flex justify-between">
                         <span>Chars: 86</span>
                      </div>
                    </div>

                  </div>
                </div>
              </div>

              {/* Retrieval & Generation Simulator */}
              <div className="flex flex-col rounded-xl border border-border-light bg-surface-light shadow-sm dark:border-border-dark dark:bg-surface-dark overflow-hidden">
                <div className="bg-gradient-to-r from-primary/5 to-purple-500/5 p-4 border-b border-border-light dark:border-border-dark">
                  <h2 className="flex items-center gap-2 font-display text-lg font-bold text-text-main dark:text-white mb-4">
                    <span className="material-symbols-outlined text-green-600">play_circle</span>
                    检索与生成模拟场
                  </h2>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <input 
                        className="w-full rounded-lg border-border-light bg-white pl-10 pr-4 py-2.5 text-sm text-text-main shadow-sm focus:border-primary focus:ring-primary dark:border-border-dark dark:bg-surface-dark dark:text-white" 
                        placeholder="输入测试问题，例如：RAG 的三个步骤是什么？" 
                        type="text" 
                        defaultValue="RAG 的三个步骤是什么？"
                      />
                      <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary text-[20px]">search</span>
                    </div>
                    <button className="flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-bold text-white shadow-md hover:bg-primary-dark transition-colors">
                      <span>运行模拟</span>
                      <span className="material-symbols-outlined text-[18px]">bolt</span>
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border-light dark:divide-border-dark min-h-[300px]">
                  {/* Context Panel */}
                  <div className="flex flex-col p-4 bg-background-light/30 dark:bg-white/5">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-text-secondary dark:text-gray-400">检索到的片段 (Context)</h3>
                      <span className="text-xs text-green-600 bg-green-100 px-2 py-0.5 rounded-full dark:bg-green-900/30 dark:text-green-400">耗时 120ms</span>
                    </div>
                    <div className="space-y-3 overflow-y-auto max-h-[350px] pr-2 custom-scrollbar">
                      <div className="rounded-lg border border-border-light bg-white p-3 shadow-sm dark:border-border-dark dark:bg-surface-dark">
                        <div className="mb-2 flex items-center justify-between">
                          <span className="text-xs font-mono text-purple-600 dark:text-purple-400">chunk_02</span>
                          <div className="flex items-center gap-2">
                            <div className="h-1.5 w-16 rounded-full bg-gray-100 dark:bg-gray-700 overflow-hidden">
                              <div className="h-full bg-green-500 rounded-full" style={{ width: '92%' }}></div>
                            </div>
                            <span className="text-xs font-bold text-green-600 dark:text-green-400">0.92</span>
                          </div>
                        </div>
                        <p className="text-xs text-text-main dark:text-gray-300">...RAG 系统通过三个关键步骤工作：首先是索引（Indexing），将文档分割成块并转换为向量存储；其次是检索（Retrieval），根据用户查询在向量数据库中查找最相关的片段...</p>
                      </div>
                      <div className="rounded-lg border border-border-light bg-white p-3 shadow-sm dark:border-border-dark dark:bg-surface-dark opacity-80">
                        <div className="mb-2 flex items-center justify-between">
                          <span className="text-xs font-mono text-purple-600 dark:text-purple-400">chunk_03</span>
                          <div className="flex items-center gap-2">
                            <div className="h-1.5 w-16 rounded-full bg-gray-100 dark:bg-gray-700 overflow-hidden">
                              <div className="h-full bg-green-500 rounded-full" style={{ width: '85%' }}></div>
                            </div>
                            <span className="text-xs font-bold text-green-600 dark:text-green-400">0.85</span>
                          </div>
                        </div>
                        <p className="text-xs text-text-main dark:text-gray-300">...最后是生成（Generation），将检索到的上下文与查询一起输入 LLM，生成准确、基于事实的回答。</p>
                      </div>
                    </div>
                  </div>

                  {/* Generation Panel */}
                  <div className="flex flex-col p-4 bg-white dark:bg-surface-dark">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-text-secondary dark:text-gray-400">AI 生成回答 (Generation)</h3>
                      <span className="flex items-center gap-1 text-xs text-text-secondary">
                        <span className="material-symbols-outlined text-[14px]">smart_toy</span>
                        GPT-4o
                      </span>
                    </div>
                    <div className="flex-1 rounded-lg bg-gray-50 p-4 text-sm text-text-main dark:bg-black/20 dark:text-gray-200 leading-relaxed border border-transparent dark:border-white/5">
                      <p>根据检索到的上下文信息，RAG 的工作流程主要包含以下三个关键步骤：</p>
                      <ul className="list-disc pl-5 mt-2 space-y-1">
                        <li><strong>索引 (Indexing)</strong>：将文档进行分块处理，并将其转换为向量形式进行存储。</li>
                        <li><strong>检索 (Retrieval)</strong>：当用户提出查询时，在向量数据库中查找与查询最相关的文档片段。</li>
                        <li><strong>生成 (Generation)</strong>：将检索到的相关上下文片段连同用户的查询一起输入到 LLM 中，从而生成基于事实的准确回答。</li>
                      </ul>
                      <span className="inline-block w-1.5 h-4 ml-1 align-middle bg-primary animate-pulse"></span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};