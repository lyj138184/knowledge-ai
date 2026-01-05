import React from 'react';
import { Header } from '../components/Header';

export const KnowledgeCapsulesPage: React.FC = () => {
  return (
    <div className="flex flex-col h-full bg-background-light dark:bg-background-dark overflow-hidden font-display">
      <Header breadcrumbs={['知识胶囊']} showSearch={false} />
      
      <div className="flex flex-1 overflow-hidden">
        {/* Inner Sidebar for Capsules List */}
        <div className="w-full md:w-80 lg:w-96 flex flex-col border-r border-border-light bg-surface-light dark:bg-surface-dark dark:border-border-dark z-0">
          <div className="p-4 border-b border-border-light dark:border-border-dark flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-lg font-bold text-text-main dark:text-white">我的胶囊</h2>
              <button className="flex items-center gap-1 rounded-md bg-primary px-3 py-1.5 text-xs font-bold text-white hover:bg-primary-dark transition-colors shadow-sm">
                <span className="material-symbols-outlined text-[16px]">add</span>
                新建胶囊
              </button>
            </div>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-2.5 top-1/2 -translate-y-1/2 text-text-secondary text-[18px]">search</span>
              <input 
                className="h-9 w-full rounded-lg border border-border-light bg-background-light pl-9 pr-3 text-sm text-text-main placeholder-text-secondary focus:border-primary focus:ring-1 focus:ring-primary dark:bg-background-dark dark:border-border-dark dark:text-white" 
                placeholder="搜索知识点..." 
                type="text"
              />
            </div>
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
              <button className="shrink-0 rounded-full border border-border-light bg-surface-light px-3 py-1 text-xs font-medium text-text-secondary hover:border-primary hover:text-primary dark:border-border-dark dark:bg-surface-dark dark:hover:border-primary">
                全部
              </button>
              <button className="shrink-0 rounded-full border border-border-light bg-surface-light px-3 py-1 text-xs font-medium text-text-secondary hover:border-primary hover:text-primary dark:border-border-dark dark:bg-surface-dark dark:hover:border-primary">
                待回顾
              </button>
              <button className="shrink-0 rounded-full border border-border-light bg-surface-light px-3 py-1 text-xs font-medium text-text-secondary hover:border-primary hover:text-primary dark:border-border-dark dark:bg-surface-dark dark:hover:border-primary">
                最近
              </button>
              <button className="shrink-0 rounded-full border border-border-light bg-surface-light px-3 py-1 text-xs font-medium text-text-secondary hover:border-primary hover:text-primary dark:border-border-dark dark:bg-surface-dark dark:hover:border-primary flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">filter_list</span> 筛选
              </button>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-3 space-y-2 custom-scrollbar">
            {/* Active Item */}
            <div className="group relative flex cursor-pointer flex-col gap-2 rounded-xl border border-primary/30 bg-primary/5 p-4 transition-all hover:bg-primary/10 dark:border-primary/20 dark:bg-primary/10">
              <div className="flex items-start justify-between">
                <h3 className="font-bold text-text-main dark:text-white text-sm line-clamp-1">React Hooks 最佳实践总结</h3>
                <span className="text-[10px] text-text-secondary dark:text-gray-400 whitespace-nowrap">2小时前</span>
              </div>
              <p className="text-xs text-text-secondary dark:text-gray-400 line-clamp-2">
                关于 useEffect 和 useMemo 的使用场景深度解析，以及自定义 Hooks 的封装原则...
              </p>
              <div className="flex items-center gap-2 mt-1">
                <span className="inline-flex items-center rounded bg-blue-100 px-1.5 py-0.5 text-[10px] font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">#前端开发</span>
                <span className="inline-flex items-center rounded bg-purple-100 px-1.5 py-0.5 text-[10px] font-medium text-purple-700 dark:bg-purple-900/30 dark:text-purple-300">#React</span>
              </div>
            </div>

            {/* Other Items */}
            <div className="group relative flex cursor-pointer flex-col gap-2 rounded-xl border border-transparent bg-background-light p-4 transition-all hover:border-border-light hover:shadow-sm dark:bg-background-dark dark:hover:border-border-dark">
              <div className="flex items-start justify-between">
                <h3 className="font-bold text-text-main dark:text-white text-sm line-clamp-1">Q4 产品发布会筹备清单</h3>
                <span className="text-[10px] text-text-secondary dark:text-gray-400 whitespace-nowrap">昨天</span>
              </div>
              <p className="text-xs text-text-secondary dark:text-gray-400 line-clamp-2">
                关键时间节点确认：场地预定、媒体邀请函发送时间、Keynote 初稿...
              </p>
              <div className="flex items-center gap-2 mt-1">
                <span className="inline-flex items-center rounded bg-orange-100 px-1.5 py-0.5 text-[10px] font-medium text-orange-700 dark:bg-orange-900/30 dark:text-orange-300">#项目管理</span>
                <span className="flex items-center gap-1 text-[10px] text-red-500 font-medium">
                  <span className="material-symbols-outlined text-[12px]">alarm</span> 明日提醒
                </span>
              </div>
            </div>

            <div className="group relative flex cursor-pointer flex-col gap-2 rounded-xl border border-transparent bg-background-light p-4 transition-all hover:border-border-light hover:shadow-sm dark:bg-background-dark dark:hover:border-border-dark">
              <div className="flex items-start justify-between">
                <h3 className="font-bold text-text-main dark:text-white text-sm line-clamp-1">SaaS 定价策略研究笔记</h3>
                <span className="text-[10px] text-text-secondary dark:text-gray-400 whitespace-nowrap">3天前</span>
              </div>
              <p className="text-xs text-text-secondary dark:text-gray-400 line-clamp-2">
                分析了竞品A和竞品B的定价模型，PLG模式下的分层策略优势...
              </p>
              <div className="flex items-center gap-2 mt-1">
                <span className="inline-flex items-center rounded bg-green-100 px-1.5 py-0.5 text-[10px] font-medium text-green-700 dark:bg-green-900/30 dark:text-green-300">#市场调研</span>
              </div>
            </div>

            <div className="group relative flex cursor-pointer flex-col gap-2 rounded-xl border border-transparent bg-background-light p-4 transition-all hover:border-border-light hover:shadow-sm dark:bg-background-dark dark:hover:border-border-dark opacity-75">
              <div className="flex items-start justify-between">
                <h3 className="font-bold text-text-main dark:text-white text-sm line-clamp-1">团队绩效考核标准 v2</h3>
                <span className="text-[10px] text-text-secondary dark:text-gray-400 whitespace-nowrap">1周前</span>
              </div>
              <p className="text-xs text-text-secondary dark:text-gray-400 line-clamp-2">
                更新了OKR对齐机制，增加了季度反馈环节...
              </p>
              <div className="flex items-center gap-2 mt-1">
                <span className="inline-flex items-center gap-1 text-[10px] text-green-600 font-medium">
                  <span className="material-symbols-outlined text-[12px] fill">check_circle</span> 已回顾
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Capsule Detail View */}
        <div className="flex-1 flex flex-col bg-background-light/50 dark:bg-background-dark overflow-hidden relative">
          <div className="h-14 flex items-center justify-between px-6 border-b border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark shrink-0">
            <div className="flex items-center gap-3 text-sm text-text-secondary dark:text-gray-400">
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[18px]">calendar_today</span>
                创建于 2023-10-24
              </span>
              <span className="h-4 w-px bg-border-light dark:bg-border-dark"></span>
              <span className="flex items-center gap-1 text-primary">
                <span className="material-symbols-outlined text-[18px]">update</span>
                回顾设置: 每周
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button className="flex items-center justify-center rounded-lg p-2 text-text-secondary hover:bg-background-light hover:text-text-main dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white transition-colors" title="Mark as Reviewed">
                <span className="material-symbols-outlined">check_circle</span>
              </button>
              <button className="flex items-center justify-center rounded-lg p-2 text-text-secondary hover:bg-background-light hover:text-text-main dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white transition-colors" title="Share">
                <span className="material-symbols-outlined">share</span>
              </button>
              <button className="flex items-center justify-center rounded-lg p-2 text-text-secondary hover:bg-background-light hover:text-text-main dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white transition-colors" title="Delete">
                <span className="material-symbols-outlined">delete</span>
              </button>
              <button className="ml-2 rounded-lg bg-primary/10 px-4 py-1.5 text-sm font-bold text-primary hover:bg-primary/20 transition-colors">
                编辑
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar">
            <div className="mx-auto max-w-4xl p-8 pb-32">
              <div className="mb-8">
                <h1 className="font-display text-3xl font-bold text-text-main dark:text-white mb-4">React Hooks 最佳实践总结</h1>
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700 dark:border-blue-800 dark:bg-blue-900/20 dark:text-blue-400">
                    #前端开发
                  </span>
                  <span className="inline-flex items-center rounded-full border border-purple-200 bg-purple-50 px-2.5 py-0.5 text-xs font-medium text-purple-700 dark:border-purple-800 dark:bg-purple-900/20 dark:text-purple-400">
                    #React
                  </span>
                  <span className="inline-flex items-center rounded-full border border-gray-200 bg-gray-50 px-2.5 py-0.5 text-xs font-medium text-gray-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 border-dashed cursor-pointer hover:bg-gray-100">
                    <span className="material-symbols-outlined text-[14px] mr-1">add</span> 添加标签
                  </span>
                </div>
              </div>

              <div className="prose prose-slate dark:prose-invert max-w-none">
                <div className="rounded-xl border border-blue-100 bg-blue-50/50 p-4 dark:border-blue-900/30 dark:bg-blue-900/10 mb-6">
                  <div className="flex gap-2">
                    <span className="material-symbols-outlined text-blue-600 dark:text-blue-400">auto_awesome</span>
                    <div>
                      <p className="text-sm font-bold text-blue-900 dark:text-blue-200 mb-1">AI 摘要</p>
                      <p className="text-sm text-blue-800 dark:text-blue-300">
                        本胶囊总结了 React 18 中 Hooks 的核心使用原则，重点强调了依赖项数组的正确配置、useMemo 在昂贵计算中的应用，以及何时应该提取自定义 Hook 来复用逻辑。
                      </p>
                    </div>
                  </div>
                </div>
                <p className="text-text-secondary dark:text-gray-300 leading-relaxed mb-4">
                  在现代 React 开发中，Hooks 已经成为逻辑复用的标准。以下是在项目实战中总结的一些关键点。
                </p>
                <h3 className="text-xl font-bold text-text-main dark:text-white mt-6 mb-3">1. useEffect 的依赖管理</h3>
                <p className="text-text-secondary dark:text-gray-300 leading-relaxed mb-4">
                  永远不要对 React 撒谎。如果你在 effect 中使用了一个变量，它必须在依赖数组中。如果这导致了无限循环，通常意味着你需要重构 effect 内部的逻辑，或者使用 <code className="rounded bg-gray-100 px-1 py-0.5 text-sm dark:bg-gray-800">useCallback</code> 包裹函数。
                </p>
                <ul className="list-disc list-inside space-y-2 text-text-secondary dark:text-gray-300 mb-4 pl-4 border-l-2 border-border-light dark:border-border-dark">
                  <li>移除不必要的对象依赖</li>
                  <li>使用 primitive 类型作为依赖</li>
                  <li>分离关注点，不要在一个 effect 做太多事</li>
                </ul>
                <h3 className="text-xl font-bold text-text-main dark:text-white mt-6 mb-3">2. useMemo 与 useCallback</h3>
                <p className="text-text-secondary dark:text-gray-300 leading-relaxed mb-4">
                  并不是所有计算都需要缓存。过度优化会带来代码复杂度的提升和微小的性能开销。
                </p>
              </div>

              <div className="mt-10 border-t border-border-light dark:border-border-dark pt-6">
                <h3 className="text-sm font-bold uppercase tracking-wider text-text-secondary dark:text-gray-400 mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">link</span> 关联来源
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <a className="flex items-center gap-3 rounded-lg border border-border-light bg-surface-light p-3 hover:border-primary hover:shadow-sm dark:border-border-dark dark:bg-surface-dark transition-all" href="#">
                    <div className="flex size-8 shrink-0 items-center justify-center rounded bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400">
                      <span className="material-symbols-outlined text-[20px]">picture_as_pdf</span>
                    </div>
                    <div className="overflow-hidden">
                      <p className="truncate text-sm font-medium text-text-main dark:text-white">React_Official_Docs_v18.pdf</p>
                      <p className="text-xs text-text-secondary dark:text-gray-400">Page 45-50</p>
                    </div>
                  </a>
                  <a className="flex items-center gap-3 rounded-lg border border-border-light bg-surface-light p-3 hover:border-primary hover:shadow-sm dark:border-border-dark dark:bg-surface-dark transition-all" href="#">
                    <div className="flex size-8 shrink-0 items-center justify-center rounded bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400">
                      <span className="material-symbols-outlined text-[20px]">public</span>
                    </div>
                    <div className="overflow-hidden">
                      <p className="truncate text-sm font-medium text-text-main dark:text-white">Overreacted Blog: A Complete Guide to useEffect</p>
                      <p className="text-xs text-text-secondary dark:text-gray-400">overreacted.io</p>
                    </div>
                  </a>
                </div>
              </div>

              <div className="mt-10 rounded-xl bg-gradient-to-br from-indigo-50 to-white border border-indigo-100 p-6 dark:from-indigo-900/20 dark:to-surface-dark dark:border-indigo-800/50">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-indigo-600 dark:text-indigo-400">psychology</span>
                    <h3 className="font-bold text-text-main dark:text-white">智能推荐</h3>
                  </div>
                  <span className="text-xs text-indigo-600 dark:text-indigo-400 bg-indigo-100 dark:bg-indigo-900/40 px-2 py-0.5 rounded-full">AI 生成</span>
                </div>
                <p className="text-sm text-text-secondary dark:text-gray-400 mb-4">根据当前内容，您可能对以下知识点感兴趣：</p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-white/60 dark:bg-white/5 border border-transparent hover:border-indigo-200 dark:hover:border-indigo-700 cursor-pointer transition-colors">
                    <div className="mt-1 size-2 rounded-full bg-indigo-500"></div>
                    <div>
                      <p className="text-sm font-bold text-text-main dark:text-white">Redux Toolkit 状态管理</p>
                      <p className="text-xs text-text-secondary dark:text-gray-400 mt-1">文档匹配度 85% • 建议作为下一阶段学习内容</p>
                    </div>
                    <button className="ml-auto text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/50 p-1 rounded">
                      <span className="material-symbols-outlined text-[18px]">add</span>
                    </button>
                  </div>
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-white/60 dark:bg-white/5 border border-transparent hover:border-indigo-200 dark:hover:border-indigo-700 cursor-pointer transition-colors">
                    <div className="mt-1 size-2 rounded-full bg-indigo-500"></div>
                    <div>
                      <p className="text-sm font-bold text-text-main dark:text-white">TypeScript 高级类型在 React 中的应用</p>
                      <p className="text-xs text-text-secondary dark:text-gray-400 mt-1">文档匹配度 72%</p>
                    </div>
                    <button className="ml-auto text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/50 p-1 rounded">
                      <span className="material-symbols-outlined text-[18px]">add</span>
                    </button>
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