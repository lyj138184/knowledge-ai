import React from 'react';
import { Header } from '../components/Header';

export const ChatPage: React.FC = () => {
  return (
    <div className="flex flex-col h-full bg-background-light overflow-hidden">
      <Header breadcrumbs={['仪表盘', '智能问答']} />
      
      <div className="flex flex-1 overflow-hidden">
        {/* Chat History Sidebar */}
        <div className="hidden lg:flex flex-col w-80 border-r border-border-light bg-surface-light dark:border-border-dark dark:bg-surface-dark">
          <div className="p-4 border-b border-border-light dark:border-border-dark">
            <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary-dark hover:shadow-primary/40">
              <span className="material-symbols-outlined text-[20px]">add</span>
              新建对话
            </button>
          </div>
          <div className="px-4 py-3">
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[18px] text-text-secondary dark:text-gray-400">filter_list</span>
              <input
                className="h-9 w-full rounded-lg border border-border-light bg-background-light pl-9 pr-3 text-xs text-text-main placeholder-text-secondary focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:border-border-dark dark:bg-background-dark dark:text-white dark:placeholder-gray-500"
                placeholder="筛选或搜索历史记录..."
                type="text"
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto px-2 custom-scrollbar">
            <div className="mb-4">
              <h3 className="px-3 py-2 text-xs font-semibold uppercase text-text-secondary dark:text-gray-500">今天</h3>
              <div className="flex flex-col gap-1">
                <button className="group flex w-full flex-col gap-1 rounded-lg bg-primary/5 px-3 py-3 text-left ring-1 ring-primary/20 dark:bg-primary/10">
                  <div className="flex w-full items-center justify-between">
                    <span className="line-clamp-1 text-sm font-medium text-text-main dark:text-white">Q3 季度财报分析总结</span>
                    <span className="shrink-0 text-[10px] text-text-secondary dark:text-gray-400">10:42</span>
                  </div>
                  <p className="line-clamp-1 text-xs text-text-secondary dark:text-gray-400">请总结一下 Q3 财报中的主要增长点...</p>
                </button>
                <button className="group flex w-full flex-col gap-1 rounded-lg px-3 py-3 text-left hover:bg-background-light dark:hover:bg-white/5 transition-colors">
                  <div className="flex w-full items-center justify-between">
                    <span className="line-clamp-1 text-sm font-medium text-text-main dark:text-white">营销策略文档润色</span>
                    <span className="shrink-0 text-[10px] text-text-secondary dark:text-gray-400">09:15</span>
                  </div>
                  <p className="line-clamp-1 text-xs text-text-secondary dark:text-gray-400">帮我检查一下这份文档的语气是否...</p>
                </button>
              </div>
            </div>
            
            <div className="mb-4">
              <h3 className="px-3 py-2 text-xs font-semibold uppercase text-text-secondary dark:text-gray-500">昨天</h3>
              <div className="flex flex-col gap-1">
                 <button className="group flex w-full flex-col gap-1 rounded-lg px-3 py-3 text-left hover:bg-background-light dark:hover:bg-white/5 transition-colors">
                  <div className="flex w-full items-center justify-between">
                    <span className="line-clamp-1 text-sm font-medium text-text-main dark:text-white">React 组件优化建议</span>
                    <span className="shrink-0 text-[10px] text-text-secondary dark:text-gray-400">16:30</span>
                  </div>
                  <p className="line-clamp-1 text-xs text-text-secondary dark:text-gray-400">如何减少不必要的重渲染？</p>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Chat Main Area */}
        <div className="flex flex-1 flex-col min-w-0 bg-background-light dark:bg-background-dark relative">
          <div className="flex h-14 shrink-0 items-center justify-between border-b border-border-light bg-surface-light px-6 dark:bg-surface-dark dark:border-border-dark">
             <div className="flex items-center gap-3">
                <button className="lg:hidden text-text-secondary dark:text-gray-400">
                  <span className="material-symbols-outlined">menu_open</span>
                </button>
                <div className="flex flex-col">
                  <h2 className="text-sm font-bold text-text-main dark:text-white">Q3 季度财报分析总结</h2>
                  <p className="text-[10px] text-text-secondary dark:text-gray-400">基于 3 个文档 • 知识库：财务文档</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="rounded-lg p-2 text-text-secondary hover:bg-background-light dark:text-gray-400 dark:hover:bg-white/5 transition-colors" title="导出对话">
                  <span className="material-symbols-outlined text-[20px]">ios_share</span>
                </button>
                 <button className="rounded-lg p-2 text-text-secondary hover:bg-background-light dark:text-gray-400 dark:hover:bg-white/5 transition-colors" title="对话设置">
                  <span className="material-symbols-outlined text-[20px]">tune</span>
                </button>
              </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 sm:p-6 custom-scrollbar">
            <div className="mx-auto flex max-w-3xl flex-col gap-6">
               <div className="flex items-center justify-center py-2">
                <span className="rounded-full bg-border-light px-3 py-1 text-xs font-medium text-text-secondary dark:bg-white/5 dark:text-gray-400">今天 10:42</span>
               </div>
               
               {/* User Message */}
               <div className="flex flex-row-reverse gap-4">
                 <div className="size-8 shrink-0 rounded-full bg-cover bg-center shadow-sm" style={{ backgroundImage: "url('https://picsum.photos/200/200')" }}></div>
                 <div className="flex max-w-[80%] flex-col items-end gap-1">
                   <div className="rounded-2xl rounded-tr-none bg-primary px-4 py-3 text-sm text-white shadow-sm">
                     <p>请总结一下 Q3 财报中的主要增长点。</p>
                   </div>
                 </div>
               </div>

               {/* AI Response */}
               <div className="flex gap-4">
                 <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 text-white shadow-sm">
                   <span className="material-symbols-outlined text-[18px]">smart_toy</span>
                 </div>
                 <div className="flex max-w-[90%] flex-col gap-2">
                   <div className="rounded-2xl rounded-tl-none border border-border-light bg-surface-light px-5 py-4 text-sm leading-relaxed text-text-main shadow-sm dark:border-border-dark dark:bg-surface-dark dark:text-gray-200">
                     <p className="mb-2">根据 <span className="font-medium text-primary">2023年度财务报告.pdf</span>，Q3 季度的主要增长点如下：</p>
                      <ol className="mb-3 list-decimal space-y-1 pl-4">
                        <li><strong>核心业务收入增长：</strong> 核心 SaaS 订阅收入同比增长 25%，主要得益于企业级客户的续费率提升。</li>
                        <li><strong>海外市场扩张：</strong> 亚太地区（APAC）市场营收环比增长 15%，新开设的新加坡办事处开始产生显著效益。</li>
                        <li><strong>运营效率优化：</strong> 通过引入 AI 自动化工具，运营成本降低了 8%，毛利率从上一季度的 65% 提升至 68%。</li>
                      </ol>
                      <p>此外，报告还提到虽然营销费用有所增加，但获客成本（CAC）保持稳定。</p>
                      <div className="mt-4 flex flex-wrap gap-2 border-t border-border-light pt-3 dark:border-border-dark">
                        <span className="text-xs font-semibold text-text-secondary dark:text-gray-500">引用来源:</span>
                        <button className="flex items-center gap-1.5 rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 hover:bg-red-100 dark:bg-red-900/20 dark:text-red-300 dark:hover:bg-red-900/30 transition-colors">
                           <span className="material-symbols-outlined text-[14px]">picture_as_pdf</span>
                           2023年度财务报告.pdf (P.14)
                        </button>
                         <button className="flex items-center gap-1.5 rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-300 dark:hover:bg-blue-900/30 transition-colors">
                           <span className="material-symbols-outlined text-[14px]">description</span>
                           Q3_KPI_Summary.docx
                        </button>
                      </div>
                   </div>
                   <div className="flex items-center gap-2 pl-1">
                      <button className="rounded p-1 text-text-secondary hover:bg-background-light dark:text-gray-500 dark:hover:bg-white/5 transition-colors" title="复制">
                        <span className="material-symbols-outlined text-[16px]">content_copy</span>
                      </button>
                      <button className="rounded p-1 text-text-secondary hover:bg-background-light dark:text-gray-500 dark:hover:bg-white/5 transition-colors" title="重新生成">
                        <span className="material-symbols-outlined text-[16px]">refresh</span>
                      </button>
                       <button className="rounded p-1 text-text-secondary hover:bg-background-light dark:text-gray-500 dark:hover:bg-white/5 transition-colors" title="赞">
                        <span className="material-symbols-outlined text-[16px]">thumb_up</span>
                      </button>
                      <button className="rounded p-1 text-text-secondary hover:bg-background-light dark:text-gray-500 dark:hover:bg-white/5 transition-colors" title="踩">
                        <span className="material-symbols-outlined text-[16px]">thumb_down</span>
                      </button>
                   </div>
                 </div>
               </div>
               
               {/* User Message 2 */}
               <div className="flex flex-row-reverse gap-4">
                 <div className="size-8 shrink-0 rounded-full bg-cover bg-center shadow-sm" style={{ backgroundImage: "url('https://picsum.photos/200/200')" }}></div>
                 <div className="flex max-w-[80%] flex-col items-end gap-1">
                   <div className="rounded-2xl rounded-tr-none bg-primary px-4 py-3 text-sm text-white shadow-sm">
                     <p>关于市场营销费用的具体数据呢？</p>
                   </div>
                 </div>
               </div>
               
               {/* AI Response 2 */}
                <div className="flex gap-4">
                 <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 text-white shadow-sm">
                   <span className="material-symbols-outlined text-[18px]">smart_toy</span>
                 </div>
                 <div className="flex max-w-[90%] flex-col gap-2">
                   <div className="rounded-2xl rounded-tl-none border border-border-light bg-surface-light px-5 py-4 text-sm leading-relaxed text-text-main shadow-sm dark:border-border-dark dark:bg-surface-dark dark:text-gray-200">
                     <p>根据 Q3 财务报表，市场营销总费用为 <strong>$3.2M</strong>，较上一季度增长了 12%。主要支出分布如下：</p>
                     <ul className="my-2 list-disc space-y-1 pl-4 marker:text-primary">
                        <li>数字广告投放：$1.5M (47%)</li>
                        <li>线下活动与会议：$0.8M (25%)</li>
                        <li>品牌合作与赞助：$0.5M (15%)</li>
                     </ul>
                      <p>管理层认为这笔投入是必要的，特别是在 Q4 旺季来临之前建立品牌知名度。</p>
                      <div className="mt-4 flex flex-wrap gap-2 border-t border-border-light pt-3 dark:border-border-dark">
                        <span className="text-xs font-semibold text-text-secondary dark:text-gray-500">引用来源:</span>
                        <button className="flex items-center gap-1.5 rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 hover:bg-green-100 dark:bg-green-900/20 dark:text-green-300 dark:hover:bg-green-900/30 transition-colors">
                           <span className="material-symbols-outlined text-[14px]">table_chart</span>
                           Q3_Expense_Breakdown.xlsx (Sheet2)
                        </button>
                      </div>
                   </div>
                    <div className="flex items-center gap-2 pl-1">
                      <button className="rounded p-1 text-text-secondary hover:bg-background-light dark:text-gray-500 dark:hover:bg-white/5 transition-colors">
                        <span className="material-symbols-outlined text-[16px]">content_copy</span>
                      </button>
                      <button className="rounded p-1 text-text-secondary hover:bg-background-light dark:text-gray-500 dark:hover:bg-white/5 transition-colors">
                        <span className="material-symbols-outlined text-[16px]">refresh</span>
                      </button>
                   </div>
                 </div>
               </div>

            </div>
          </div>
          
          <div className="shrink-0 p-4 sm:p-6 pb-6 pt-2">
            <div className="mx-auto max-w-3xl">
              <div className="mb-3 flex items-center justify-between">
                <div className="flex gap-2 overflow-x-auto scrollbar-hide">
                  <button className="flex items-center gap-1 whitespace-nowrap rounded-full border border-border-light bg-surface-light px-3 py-1.5 text-xs font-medium text-text-secondary hover:bg-background-light hover:text-primary dark:border-border-dark dark:bg-surface-dark dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-white transition-colors">
                     <span className="material-symbols-outlined text-[14px]">summarize</span>
                     生成会议纪要
                  </button>
                  <button className="flex items-center gap-1 whitespace-nowrap rounded-full border border-border-light bg-surface-light px-3 py-1.5 text-xs font-medium text-text-secondary hover:bg-background-light hover:text-primary dark:border-border-dark dark:bg-surface-dark dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-white transition-colors">
                     <span className="material-symbols-outlined text-[14px]">data_exploration</span>
                     对比去年数据
                  </button>
                   <button className="flex items-center gap-1 whitespace-nowrap rounded-full border border-border-light bg-surface-light px-3 py-1.5 text-xs font-medium text-text-secondary hover:bg-background-light hover:text-primary dark:border-border-dark dark:bg-surface-dark dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-white transition-colors">
                     <span className="material-symbols-outlined text-[14px]">translate</span>
                     翻译成英文
                  </button>
                </div>
                <button className="flex items-center gap-1 whitespace-nowrap rounded-md px-2 py-1 text-xs font-medium text-text-secondary hover:bg-background-light hover:text-red-500 dark:text-gray-500 dark:hover:bg-white/5 dark:hover:text-red-400 transition-colors">
                  <span className="material-symbols-outlined text-[16px]">delete_sweep</span>
                  清空对话
                </button>
              </div>
              <div className="relative flex items-end rounded-xl border border-border-light bg-surface-light shadow-sm ring-1 ring-black/5 focus-within:ring-2 focus-within:ring-primary dark:border-border-dark dark:bg-surface-dark dark:ring-white/5">
                <button className="mb-2 ml-2 rounded-lg p-2 text-text-secondary hover:bg-background-light hover:text-primary dark:text-gray-400 dark:hover:bg-white/10 transition-colors" title="上传文件">
                   <span className="material-symbols-outlined text-[20px]">add_circle</span>
                </button>
                <textarea
                  className="max-h-48 min-h-[56px] w-full resize-none border-none bg-transparent py-4 text-sm text-text-main placeholder-text-secondary focus:ring-0 dark:text-white dark:placeholder-gray-500"
                  placeholder="输入您的问题，例如：'分析这份文档的风险点'..."
                  rows={1}
                ></textarea>
                <button className="mb-2 mr-2 rounded-lg bg-primary p-2 text-white shadow-md transition-all hover:bg-primary-dark hover:shadow-lg disabled:cursor-not-allowed disabled:bg-gray-300 dark:disabled:bg-gray-700">
                   <span className="material-symbols-outlined text-[20px]">send</span>
                </button>
              </div>
              <p className="mt-2 text-center text-[10px] text-text-secondary dark:text-gray-500">AI 可能会生成错误信息，请核对重要事实。</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};