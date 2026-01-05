import React from 'react';
import { Header } from '../components/Header';

export const AgentManagementPage: React.FC = () => {
  return (
    <div className="flex flex-col h-full bg-background-light dark:bg-background-dark overflow-hidden">
      <Header 
        breadcrumbs={['Agent 管理']} 
        showSearch={true}
      />
      
      <div className="flex flex-1 overflow-hidden relative">
        <div className="flex-1 flex flex-col min-w-0 overflow-y-auto p-6 lg:p-8">
          <div className="mx-auto w-full max-w-[1400px] flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-display text-2xl font-bold text-text-main dark:text-white">我的 Agents</h2>
                <p className="text-sm text-text-secondary dark:text-gray-400 mt-1">管理您的个性化 AI 助手，配置能力与数据源。</p>
              </div>
              <button className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-primary/30 transition-all hover:bg-primary-dark hover:shadow-primary/50">
                <span className="material-symbols-outlined text-[20px]">add</span>
                创建新 Agent
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-4">
              {/* Card 1 */}
              <div className="group relative flex flex-col justify-between rounded-xl border-2 border-primary bg-surface-light p-5 shadow-md dark:bg-surface-dark dark:border-primary transition-all">
                <div>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex size-12 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400">
                        <span className="material-symbols-outlined text-[28px]">science</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-text-main dark:text-white">科研助手 Pro</h3>
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-green-700 dark:bg-green-900/30 dark:text-green-400">
                          <span className="size-1.5 rounded-full bg-green-500"></span> 启用
                        </span>
                      </div>
                    </div>
                    <div className="relative">
                      <button className="rounded-lg p-1 text-text-secondary hover:bg-background-light dark:hover:bg-white/5">
                        <span className="material-symbols-outlined">more_vert</span>
                      </button>
                    </div>
                  </div>
                  <p className="mt-4 text-sm text-text-secondary dark:text-gray-400 line-clamp-2">
                    专注于分析学术论文 PDF，能够提取关键论点、实验数据并生成综述报告。已连接 Zotero 知识库。
                  </p>
                </div>
                <div className="mt-5 flex items-center justify-between border-t border-border-light pt-4 dark:border-border-dark">
                  <span className="text-xs text-text-secondary dark:text-gray-500">创建于 2023-10-15</span>
                  <div className="flex gap-1">
                    <button className="flex items-center gap-1 rounded px-2 py-1 text-xs font-medium text-text-secondary hover:bg-background-light hover:text-text-main dark:hover:bg-white/5 dark:text-gray-400" title="日志">
                      <span className="material-symbols-outlined text-[16px]">history</span>
                    </button>
                    <button className="flex items-center gap-1 rounded px-2 py-1 text-xs font-medium text-primary hover:bg-primary/5 transition-colors" title="编辑">
                      <span className="material-symbols-outlined text-[16px]">edit</span>
                      配置
                    </button>
                  </div>
                </div>
                <div className="absolute -right-0.5 top-1/2 h-8 w-1 -translate-y-1/2 rounded-l-full bg-primary"></div>
              </div>

              {/* Card 2 */}
              <div className="group flex flex-col justify-between rounded-xl border border-border-light bg-surface-light p-5 shadow-sm hover:shadow-md hover:border-primary/50 dark:bg-surface-dark dark:border-border-dark dark:hover:border-primary/50 transition-all">
                <div>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex size-12 items-center justify-center rounded-lg bg-orange-50 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400">
                        <span className="material-symbols-outlined text-[28px]">code</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-text-main dark:text-white">代码审查员</h3>
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-gray-500 dark:bg-gray-800 dark:text-gray-400">
                          <span className="size-1.5 rounded-full bg-gray-400"></span> 禁用
                        </span>
                      </div>
                    </div>
                    <button className="rounded-lg p-1 text-text-secondary hover:bg-background-light dark:hover:bg-white/5">
                      <span className="material-symbols-outlined">more_vert</span>
                    </button>
                  </div>
                  <p className="mt-4 text-sm text-text-secondary dark:text-gray-400 line-clamp-2">
                    辅助进行 Python 代码审查，检查 PEP8 规范并提供优化建议。
                  </p>
                </div>
                <div className="mt-5 flex items-center justify-between border-t border-border-light pt-4 dark:border-border-dark">
                  <span className="text-xs text-text-secondary dark:text-gray-500">创建于 2023-11-02</span>
                  <div className="flex gap-1">
                    <button className="flex items-center gap-1 rounded px-2 py-1 text-xs font-medium text-text-secondary hover:bg-background-light hover:text-text-main dark:hover:bg-white/5 dark:text-gray-400">
                      <span className="material-symbols-outlined text-[16px]">edit</span>
                      配置
                    </button>
                  </div>
                </div>
              </div>

              {/* Card 3 */}
              <div className="group flex flex-col justify-between rounded-xl border border-border-light bg-surface-light p-5 shadow-sm hover:shadow-md hover:border-primary/50 dark:bg-surface-dark dark:border-border-dark dark:hover:border-primary/50 transition-all">
                <div>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex size-12 items-center justify-center rounded-lg bg-teal-50 text-teal-600 dark:bg-teal-900/30 dark:text-teal-400">
                        <span className="material-symbols-outlined text-[28px]">translate</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-text-main dark:text-white">多语言翻译官</h3>
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-green-700 dark:bg-green-900/30 dark:text-green-400">
                          <span className="size-1.5 rounded-full bg-green-500"></span> 启用
                        </span>
                      </div>
                    </div>
                    <button className="rounded-lg p-1 text-text-secondary hover:bg-background-light dark:hover:bg-white/5">
                      <span className="material-symbols-outlined">more_vert</span>
                    </button>
                  </div>
                  <p className="mt-4 text-sm text-text-secondary dark:text-gray-400 line-clamp-2">
                    提供专业的中英互译服务，特别针对技术文档进行优化，保持术语一致性。
                  </p>
                </div>
                <div className="mt-5 flex items-center justify-between border-t border-border-light pt-4 dark:border-border-dark">
                  <span className="text-xs text-text-secondary dark:text-gray-500">创建于 2023-09-20</span>
                  <div className="flex gap-1">
                    <button className="flex items-center gap-1 rounded px-2 py-1 text-xs font-medium text-text-secondary hover:bg-background-light hover:text-text-main dark:hover:bg-white/5 dark:text-gray-400">
                      <span className="material-symbols-outlined text-[16px]">edit</span>
                      配置
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Configuration Panel */}
        <div className="hidden xl:flex w-[500px] shrink-0 flex-col border-l border-border-light bg-surface-light shadow-xl dark:bg-surface-dark dark:border-border-dark z-10">
          <div className="flex h-14 items-center justify-between border-b border-border-light px-6 dark:border-border-dark">
            <div className="flex items-center gap-2">
              <h3 className="font-display font-bold text-text-main dark:text-white">配置: 科研助手 Pro</h3>
            </div>
            <div className="flex gap-2">
              <button className="rounded p-1.5 text-text-secondary hover:bg-background-light dark:text-gray-400 dark:hover:bg-white/5" title="关闭面板">
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
          </div>
          <div className="flex border-b border-border-light px-6 dark:border-border-dark">
            <button className="border-b-2 border-primary py-3 text-sm font-medium text-primary">基本设置</button>
            <button className="border-b-2 border-transparent py-3 ml-6 text-sm font-medium text-text-secondary hover:text-text-main dark:text-gray-400 dark:hover:text-white transition-colors">运行日志</button>
          </div>
          <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
            <div className="flex flex-col gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-text-secondary dark:text-gray-400 mb-1">Agent 名称</label>
                  <input className="w-full rounded-lg border-border-light bg-background-light px-3 py-2 text-sm text-text-main focus:border-primary focus:ring-primary dark:border-border-dark dark:bg-background-dark dark:text-white" type="text" defaultValue="科研助手 Pro"/>
                </div>
                <div>
                  <label className="block text-xs font-medium text-text-secondary dark:text-gray-400 mb-1">功能描述</label>
                  <textarea className="w-full rounded-lg border-border-light bg-background-light px-3 py-2 text-sm text-text-main focus:border-primary focus:ring-primary dark:border-border-dark dark:bg-background-dark dark:text-white" rows={3} defaultValue="专注于分析学术论文 PDF，能够提取关键论点、实验数据并生成综述报告。"></textarea>
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-medium text-text-secondary dark:text-gray-400">关联数据源</label>
                  <button className="text-xs text-primary hover:underline">管理数据源</button>
                </div>
                <div className="grid grid-cols-1 gap-2">
                  <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-primary bg-primary/5 p-3 dark:border-primary/50 dark:bg-primary/10">
                    <input defaultChecked className="mt-1 rounded border-gray-300 text-primary focus:ring-primary dark:bg-background-dark" type="checkbox"/>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <img alt="Notion" className="size-4 opacity-80" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBFAP5XambKd5lQevWQFC_l7QGhRdXqnF50g9ws4IpVzhgbCHDUaZNneVyLBZWcVuUg4hUj-gXvi_abYv1M2PYYrxFukjhtClCIppmRxOK5DTyj9hDWpQC-Kmo7GK--JXJXqhmYdOHdQzVrWMvgj4ELzb3rq7CqMLZ-bsj9C_4ktPb2UbnKU9hUE8ch02J_0R7VgEA_ZV3i5uPCnhATQDWtJP1MJe17DA_L0pT-wf7wicEQPo0BPoQxNf9GpqKcEMVoH6cBWehg2Xo"/>
                        <span className="text-sm font-medium text-text-main dark:text-white">Notion: 论文库</span>
                      </div>
                      <p className="text-xs text-text-secondary dark:text-gray-400 mt-0.5">上次同步: 10分钟前</p>
                    </div>
                  </label>
                  <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-border-light bg-surface-light p-3 hover:bg-background-light dark:border-border-dark dark:bg-surface-dark dark:hover:bg-white/5 transition-colors">
                    <input className="mt-1 rounded border-gray-300 text-primary focus:ring-primary dark:bg-background-dark" type="checkbox"/>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <img alt="Drive" className="size-4 opacity-80" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBGyuP_aT7cABAylBShhzhHTe3g8VC2jhg8A-8MQO2ZRX9uzNtz8LQgNDPedUKLTDs1-LCP99kx2yjrqdhyDp4eiepjizjx7VSVpp1PhKG03mc9vsEozc4f5mV935k1sgxUj2xv0BgrrKr4_RSgEwlPFZt0UIn9mcedz-elkRy7K4cVUnLWAusKuE3jT6MydWEOr2oFdSv1F6LnQ1XcO4F8LjjJVIabVvhjLCAprYlYsjm-DakRIvgLgA_nFCumpTBCfpdkmp3HNBQ"/>
                        <span className="text-sm font-medium text-text-main dark:text-white">Google Drive</span>
                      </div>
                      <p className="text-xs text-text-secondary dark:text-gray-400 mt-0.5">未连接</p>
                    </div>
                  </label>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-medium text-text-secondary dark:text-gray-400">系统指令 (Prompt)</label>
                  <span className="text-xs text-text-secondary bg-background-light px-2 py-0.5 rounded dark:bg-white/10 dark:text-gray-400">Markdown 支持</span>
                </div>
                <div className="relative rounded-lg border border-border-light bg-background-light dark:border-border-dark dark:bg-background-dark overflow-hidden group focus-within:ring-1 focus-within:ring-primary focus-within:border-primary">
                  <div className="flex items-center gap-2 border-b border-border-light bg-surface-light px-2 py-1.5 dark:border-border-dark dark:bg-white/5">
                    <button className="p-1 text-text-secondary hover:text-primary"><span className="material-symbols-outlined text-[18px]">code</span></button>
                    <button className="p-1 text-text-secondary hover:text-primary"><span className="material-symbols-outlined text-[18px]">format_bold</span></button>
                    <button className="p-1 text-text-secondary hover:text-primary"><span className="material-symbols-outlined text-[18px]">link</span></button>
                  </div>
                  <textarea 
                    className="w-full resize-none border-none bg-transparent p-3 text-sm font-mono text-text-main focus:ring-0 dark:text-white placeholder-gray-400" 
                    placeholder="输入系统指令..." 
                    rows={6}
                    defaultValue={`You are a helpful research assistant. \n1. Always cite sources from the connected Knowledge Base.\n2. If the user asks for a summary, provide bullet points.\n3. Use a formal tone.`}
                  ></textarea>
                </div>
              </div>

              <div className="pt-4 border-t border-border-light dark:border-border-dark">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-bold text-text-main dark:text-white">最近运行日志</h4>
                  <div className="flex gap-2">
                    <input className="h-7 w-32 rounded border-border-light bg-background-light px-2 text-xs focus:border-primary focus:ring-primary dark:border-border-dark dark:bg-background-dark dark:text-white" placeholder="筛选日志..."/>
                    <button className="text-xs text-primary hover:underline">查看全部</button>
                  </div>
                </div>
                <div className="rounded-lg border border-border-light bg-background-light overflow-hidden dark:border-border-dark dark:bg-background-dark">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-surface-light text-text-secondary dark:bg-white/5 dark:text-gray-400">
                      <tr>
                        <th className="px-3 py-2 font-medium">时间</th>
                        <th className="px-3 py-2 font-medium">级别</th>
                        <th className="px-3 py-2 font-medium">内容</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border-light dark:divide-border-dark">
                      <tr>
                        <td className="px-3 py-2 text-text-secondary font-mono">10:42:05</td>
                        <td className="px-3 py-2"><span className="text-green-600 dark:text-green-400 font-medium">INFO</span></td>
                        <td className="px-3 py-2 text-text-main dark:text-white truncate max-w-[120px]">收到用户请求: "分析..."</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 text-text-secondary font-mono">10:42:08</td>
                        <td className="px-3 py-2"><span className="text-green-600 dark:text-green-400 font-medium">INFO</span></td>
                        <td className="px-3 py-2 text-text-main dark:text-white truncate max-w-[120px]">检索到 3 个相关片段</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 text-text-secondary font-mono">10:42:15</td>
                        <td className="px-3 py-2"><span className="text-orange-500 dark:text-orange-400 font-medium">WARN</span></td>
                        <td className="px-3 py-2 text-text-main dark:text-white truncate max-w-[120px]">响应时间超过阈值 (2s)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-border-light bg-surface-light p-4 dark:bg-surface-dark dark:border-border-dark flex justify-end gap-3">
            <button className="rounded-lg px-4 py-2 text-sm font-medium text-text-secondary hover:bg-background-light dark:text-gray-400 dark:hover:bg-white/5 transition-colors">取消</button>
            <button className="rounded-lg bg-primary px-4 py-2 text-sm font-bold text-white shadow-md shadow-primary/20 hover:bg-primary-dark transition-all">保存配置</button>
          </div>
        </div>
      </div>
    </div>
  );
};