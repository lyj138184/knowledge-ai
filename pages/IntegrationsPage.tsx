import React, { useState } from 'react';
import { Header } from '../components/Header';

type ModalType = 'none' | 'add' | 'mcp' | 'slack' | 'manage_notion' | 'manage_drive' | 'manage_local';

export const IntegrationsPage: React.FC = () => {
  const [activeModal, setActiveModal] = useState<ModalType>('none');
  const [isConnecting, setIsConnecting] = useState(false);

  const closeModal = () => {
    setActiveModal('none');
    setIsConnecting(false);
  };

  const handleConnectSlack = () => {
    setIsConnecting(true);
    setTimeout(() => {
      setIsConnecting(false);
      closeModal();
      // In a real app, this would update the connected state
      alert("Slack 连接成功！(模拟)");
    }, 2000);
  };

  return (
    <div className="flex flex-col h-full bg-background-light dark:bg-background-dark overflow-hidden">
      <Header 
        breadcrumbs={['数据源集成']} 
        showSearch={true}
      />
      
      <div className="flex-1 overflow-y-auto p-6 lg:p-10 relative">
        <div className="mx-auto flex max-w-[1200px] flex-col gap-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex flex-col gap-1">
              <h2 className="font-display text-3xl font-bold text-text-main dark:text-white">数据源集成</h2>
              <p className="text-text-secondary dark:text-gray-400 max-w-2xl">
                管理您的外部知识源连接，AI 助手将自动同步并索引这些数据源中的内容，为您提供更全面的智能问答服务。
              </p>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={() => setActiveModal('mcp')}
                className="flex items-center gap-2 rounded-lg border border-border-light bg-surface-light px-4 py-2 text-sm font-medium text-text-main hover:bg-background-light dark:border-border-dark dark:bg-surface-dark dark:text-white dark:hover:bg-white/5 transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">settings_ethernet</span>
                配置 MCP 协议
              </button>
              <button 
                onClick={() => setActiveModal('add')}
                className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white shadow-lg shadow-primary/30 transition-all hover:bg-primary-dark hover:shadow-primary/50"
              >
                <span className="material-symbols-outlined text-[18px]">add</span>
                添加新数据源
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Notion */}
            <div className="flex flex-col justify-between rounded-xl border border-border-light bg-surface-light p-6 shadow-sm transition-all hover:shadow-md dark:border-border-dark dark:bg-surface-dark">
              <div>
                <div className="flex items-start justify-between">
                  <div className="flex size-12 items-center justify-center rounded-xl bg-gray-50 border border-gray-100 dark:bg-white/5 dark:border-white/10">
                    <img alt="Notion Logo" className="size-7" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBFAP5XambKd5lQevWQFC_l7QGhRdXqnF50g9ws4IpVzhgbCHDUaZNneVyLBZWcVuUg4hUj-gXvi_abYv1M2PYYrxFukjhtClCIppmRxOK5DTyj9hDWpQC-Kmo7GK--JXJXqhmYdOHdQzVrWMvgj4ELzb3rq7CqMLZ-bsj9C_4ktPb2UbnKU9hUE8ch02J_0R7VgEA_ZV3i5uPCnhATQDWtJP1MJe17DA_L0pT-wf7wicEQPo0BPoQxNf9GpqKcEMVoH6cBWehg2Xo"/>
                  </div>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-2.5 py-0.5 text-xs font-medium text-green-700 dark:bg-green-900/20 dark:text-green-400">
                    <span className="size-1.5 rounded-full bg-green-500"></span>
                    已连接
                  </span>
                </div>
                <div className="mt-4">
                  <h3 className="font-display text-lg font-bold text-text-main dark:text-white">Notion</h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-secondary dark:text-gray-400">
                    同步您的工作区页面、数据库和笔记。支持自动更新内容变更，保持知识库与团队文档实时一致。
                  </p>
                </div>
              </div>
              <div className="mt-6 flex items-center justify-between border-t border-border-light pt-4 dark:border-border-dark">
                <span className="flex items-center gap-1 text-xs text-text-secondary dark:text-gray-500">
                  <span className="material-symbols-outlined text-[14px]">sync</span>
                  10分钟前同步
                </span>
                <div className="flex gap-2">
                  <button onClick={() => setActiveModal('manage_notion')} className="rounded-lg px-3 py-1.5 text-xs font-medium text-text-main hover:bg-background-light dark:text-white dark:hover:bg-white/10 transition-colors border border-border-light dark:border-border-dark">管理连接</button>
                  <button className="rounded-lg p-1.5 text-text-secondary hover:bg-red-50 hover:text-red-600 dark:text-gray-400 dark:hover:bg-red-900/20 dark:hover:text-red-400 transition-colors">
                    <span className="material-symbols-outlined text-[18px]">link_off</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Google Drive */}
            <div className="flex flex-col justify-between rounded-xl border border-border-light bg-surface-light p-6 shadow-sm transition-all hover:shadow-md dark:border-border-dark dark:bg-surface-dark">
              <div>
                <div className="flex items-start justify-between">
                  <div className="flex size-12 items-center justify-center rounded-xl bg-gray-50 border border-gray-100 dark:bg-white/5 dark:border-white/10">
                    <img alt="Google Drive Logo" className="size-7" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBGyuP_aT7cABAylBShhzhHTe3g8VC2jhg8A-8MQO2ZRX9uzNtz8LQgNDPedUKLTDs1-LCP99kx2yjrqdhyDp4eiepjizjx7VSVpp1PhKG03mc9vsEozc4f5mV935k1sgxUj2xv0BgrrKr4_RSgEwlPFZt0UIn9mcedz-elkRy7K4cVUnLWAusKuE3jT6MydWEOr2oFdSv1F6LnQ1XcO4F8LjjJVIabVvhjLCAprYlYsjm-DakRIvgLgA_nFCumpTBCfpdkmp3HNBQ"/>
                  </div>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-2.5 py-0.5 text-xs font-medium text-green-700 dark:bg-green-900/20 dark:text-green-400">
                    <span className="size-1.5 rounded-full bg-green-500"></span>
                    已连接
                  </span>
                </div>
                <div className="mt-4">
                  <h3 className="font-display text-lg font-bold text-text-main dark:text-white">Google Drive</h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-secondary dark:text-gray-400">
                    索引云端硬盘中的文档、表格和演示文稿。支持全文检索和OCR识别，可自定义同步的文件夹范围。
                  </p>
                </div>
              </div>
              <div className="mt-6 flex items-center justify-between border-t border-border-light pt-4 dark:border-border-dark">
                <span className="flex items-center gap-1 text-xs text-text-secondary dark:text-gray-500">
                  <span className="material-symbols-outlined text-[14px]">sync</span>
                  1小时前同步
                </span>
                <div className="flex gap-2">
                  <button onClick={() => setActiveModal('manage_drive')} className="rounded-lg px-3 py-1.5 text-xs font-medium text-text-main hover:bg-background-light dark:text-white dark:hover:bg-white/10 transition-colors border border-border-light dark:border-border-dark">管理连接</button>
                  <button className="rounded-lg p-1.5 text-text-secondary hover:bg-red-50 hover:text-red-600 dark:text-gray-400 dark:hover:bg-red-900/20 dark:hover:text-red-400 transition-colors">
                    <span className="material-symbols-outlined text-[18px]">link_off</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Local Files */}
            <div className="flex flex-col justify-between rounded-xl border border-border-light bg-surface-light p-6 shadow-sm transition-all hover:shadow-md dark:border-border-dark dark:bg-surface-dark">
              <div>
                <div className="flex items-start justify-between">
                  <div className="flex size-12 items-center justify-center rounded-xl bg-orange-50 border border-orange-100 text-orange-600 dark:bg-orange-900/20 dark:border-orange-500/20 dark:text-orange-400">
                    <span className="material-symbols-outlined text-[28px]">folder_open</span>
                  </div>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-2.5 py-0.5 text-xs font-medium text-green-700 dark:bg-green-900/20 dark:text-green-400">
                    <span className="size-1.5 rounded-full bg-green-500"></span>
                    已连接
                  </span>
                </div>
                <div className="mt-4">
                  <h3 className="font-display text-lg font-bold text-text-main dark:text-white">本地文件系统</h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-secondary dark:text-gray-400">
                    直接监控本地文件夹变更，确保私密数据无需上传云端即可被索引。支持 Markdown, PDF, Office 等多种格式。
                  </p>
                </div>
              </div>
              <div className="mt-6 flex items-center justify-between border-t border-border-light pt-4 dark:border-border-dark">
                <span className="flex items-center gap-1 text-xs text-text-secondary dark:text-gray-500">
                  <span className="material-symbols-outlined text-[14px]">sync</span>
                  实时监控中
                </span>
                <div className="flex gap-2">
                  <button onClick={() => setActiveModal('manage_local')} className="rounded-lg px-3 py-1.5 text-xs font-medium text-text-main hover:bg-background-light dark:text-white dark:hover:bg-white/10 transition-colors border border-border-light dark:border-border-dark">管理连接</button>
                  <button className="rounded-lg p-1.5 text-text-secondary hover:bg-red-50 hover:text-red-600 dark:text-gray-400 dark:hover:bg-red-900/20 dark:hover:text-red-400 transition-colors">
                    <span className="material-symbols-outlined text-[18px]">link_off</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Slack */}
            <div className="flex flex-col justify-between rounded-xl border border-border-light bg-surface-light p-6 shadow-sm opacity-80 hover:opacity-100 transition-all hover:shadow-md dark:border-border-dark dark:bg-surface-dark">
              <div>
                <div className="flex items-start justify-between">
                  <div className="flex size-12 items-center justify-center rounded-xl bg-purple-50 border border-purple-100 text-purple-600 dark:bg-purple-900/20 dark:border-purple-500/20 dark:text-purple-400">
                    <span className="material-symbols-outlined text-[28px]">chat</span>
                  </div>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-500 dark:bg-gray-800 dark:text-gray-400">
                    <span className="size-1.5 rounded-full bg-gray-400"></span>
                    未连接
                  </span>
                </div>
                <div className="mt-4">
                  <h3 className="font-display text-lg font-bold text-text-main dark:text-white">Slack</h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-secondary dark:text-gray-400">
                    接入团队聊天记录，捕捉即时讨论中的知识碎片。可配置特定频道进行监控，支持提取链接和文件。
                  </p>
                </div>
              </div>
              <div className="mt-6 flex items-center justify-end border-t border-border-light pt-4 dark:border-border-dark">
                <button onClick={() => setActiveModal('slack')} className="flex w-full items-center justify-center gap-2 rounded-lg bg-text-main px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-gray-800 dark:bg-white dark:text-surface-dark dark:hover:bg-gray-200">
                  连接 Slack
                </button>
              </div>
            </div>

            {/* MCP Protocol */}
            <div className="flex flex-col justify-between rounded-xl border border-dashed border-primary/40 bg-primary/5 p-6 transition-all hover:border-primary/60 dark:border-primary/30 dark:bg-primary/10">
              <div>
                <div className="flex items-start justify-between">
                  <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <span className="material-symbols-outlined text-[28px]">extension</span>
                  </div>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                    通用协议
                  </span>
                </div>
                <div className="mt-4">
                  <h3 className="font-display text-lg font-bold text-text-main dark:text-white">MCP 协议数据源</h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-secondary dark:text-gray-400">
                    基于 Model Context Protocol (MCP) 连接任意兼容的外部服务或 API。适用于企业内部系统、自定义数据库或特定的 SaaS 服务集成。
                  </p>
                </div>
              </div>
              <div className="mt-6 flex items-center justify-end border-t border-primary/10 pt-4 dark:border-primary/20">
                <button onClick={() => setActiveModal('mcp')} className="flex w-full items-center justify-center gap-2 rounded-lg border border-primary text-primary px-4 py-2 text-sm font-bold transition-colors hover:bg-primary hover:text-white">
                  <span className="material-symbols-outlined text-[18px]">settings</span>
                  配置通用连接
                </button>
              </div>
            </div>

            {/* Add More */}
            <button onClick={() => setActiveModal('add')} className="group flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-border-light bg-surface-light p-6 transition-all hover:border-primary/50 hover:bg-background-light dark:border-border-dark dark:bg-surface-dark dark:hover:border-primary/50 dark:hover:bg-white/5">
              <div className="flex size-14 items-center justify-center rounded-full bg-gray-50 text-gray-400 transition-colors group-hover:bg-primary/10 group-hover:text-primary dark:bg-white/5">
                <span className="material-symbols-outlined text-[32px]">add</span>
              </div>
              <h3 className="mt-4 font-display text-lg font-bold text-text-secondary group-hover:text-primary dark:text-gray-400">浏览更多数据源</h3>
              <p className="mt-2 text-center text-sm text-text-secondary/70 dark:text-gray-500">
                查看集成市场，发现更多应用
              </p>
            </button>
          </div>

          <div className="rounded-xl bg-blue-50 p-6 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/30">
            <div className="flex items-start gap-4">
              <div className="rounded-full bg-blue-100 p-2 text-primary dark:bg-blue-800/40">
                <span className="material-symbols-outlined">security</span>
              </div>
              <div>
                <h4 className="font-bold text-text-main dark:text-white">数据隐私与安全说明</h4>
                <p className="mt-1 text-sm text-text-secondary dark:text-blue-200/80 leading-relaxed">
                  所有通过数据源集成的文档和信息仅在您的本地环境或私有云中进行索引处理。我们使用 OAuth 2.0 协议进行授权，且只请求只读权限。您可以随时在“设置”页面撤销任何服务的访问授权。对于 MCP 协议连接，请确保您信任所连接的服务端点。
                </p>
                <a className="mt-3 inline-block text-sm font-medium text-primary hover:text-primary-dark hover:underline" href="#">了解更多关于数据安全的详情 →</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- Modals --- */}
      
      {/* 1. MCP Configuration Modal */}
      {activeModal === 'mcp' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200" onClick={closeModal}>
          <div className="bg-surface-light dark:bg-surface-dark w-full max-w-lg rounded-xl shadow-2xl border border-border-light dark:border-border-dark flex flex-col overflow-hidden animate-in zoom-in-95 duration-200" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between px-6 py-4 border-b border-border-light dark:border-border-dark">
              <h3 className="font-bold text-lg text-text-main dark:text-white">配置 MCP 协议</h3>
              <button onClick={closeModal} className="text-text-secondary hover:text-text-main dark:text-gray-400 dark:hover:text-white"><span className="material-symbols-outlined">close</span></button>
            </div>
            <div className="p-6 flex flex-col gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-text-main dark:text-white">MCP Server Endpoint</label>
                <input className="w-full rounded-lg border-border-light bg-background-light px-3 py-2 text-sm focus:border-primary focus:ring-primary dark:border-border-dark dark:bg-background-dark dark:text-white" placeholder="wss://your-server.com/mcp" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-text-main dark:text-white">Authentication Secret</label>
                <input type="password" className="w-full rounded-lg border-border-light bg-background-light px-3 py-2 text-sm focus:border-primary focus:ring-primary dark:border-border-dark dark:bg-background-dark dark:text-white" placeholder="****************" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-text-main dark:text-white">Client Capabilities</label>
                <div className="flex gap-4">
                   <label className="flex items-center gap-2 text-sm text-text-secondary dark:text-gray-400"><input type="checkbox" defaultChecked className="rounded text-primary focus:ring-primary"/> Resources</label>
                   <label className="flex items-center gap-2 text-sm text-text-secondary dark:text-gray-400"><input type="checkbox" defaultChecked className="rounded text-primary focus:ring-primary"/> Tools</label>
                   <label className="flex items-center gap-2 text-sm text-text-secondary dark:text-gray-400"><input type="checkbox" defaultChecked className="rounded text-primary focus:ring-primary"/> Prompts</label>
                </div>
              </div>
            </div>
            <div className="bg-background-light/50 dark:bg-white/5 px-6 py-4 border-t border-border-light dark:border-border-dark flex justify-end gap-3">
               <button onClick={closeModal} className="px-4 py-2 rounded-lg text-sm font-medium text-text-secondary hover:bg-background-light dark:hover:bg-white/10 dark:text-gray-400 transition-colors">取消</button>
               <button className="px-4 py-2 rounded-lg bg-primary text-sm font-medium text-white hover:bg-primary-dark shadow-sm">测试连接并保存</button>
            </div>
          </div>
        </div>
      )}

      {/* 2. Add Data Source Modal */}
      {activeModal === 'add' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200" onClick={closeModal}>
          <div className="bg-surface-light dark:bg-surface-dark w-full max-w-4xl h-[80vh] rounded-xl shadow-2xl border border-border-light dark:border-border-dark flex flex-col overflow-hidden animate-in zoom-in-95 duration-200" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between px-6 py-4 border-b border-border-light dark:border-border-dark">
              <h3 className="font-bold text-lg text-text-main dark:text-white">添加新的数据源</h3>
              <button onClick={closeModal} className="text-text-secondary hover:text-text-main dark:text-gray-400 dark:hover:text-white"><span className="material-symbols-outlined">close</span></button>
            </div>
            <div className="p-4 border-b border-border-light dark:border-border-dark bg-background-light/50 dark:bg-white/5">
               <div className="relative">
                 <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary">search</span>
                 <input className="w-full rounded-lg border-border-light bg-surface-light pl-10 pr-4 py-2 text-sm focus:border-primary focus:ring-primary dark:border-border-dark dark:bg-background-dark dark:text-white" placeholder="搜索应用，例如 Jira, Dropbox..." />
               </div>
            </div>
            <div className="flex-1 overflow-y-auto p-6 bg-background-light dark:bg-background-dark">
               <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                 {[
                   { name: 'Jira', icon: 'task', color: 'bg-blue-50 text-blue-600' },
                   { name: 'Confluence', icon: 'article', color: 'bg-blue-50 text-blue-600' },
                   { name: 'Dropbox', icon: 'cloud', color: 'bg-indigo-50 text-indigo-600' },
                   { name: 'OneDrive', icon: 'cloud_queue', color: 'bg-blue-50 text-blue-600' },
                   { name: 'Discord', icon: 'chat_bubble', color: 'bg-indigo-50 text-indigo-500' },
                   { name: 'Trello', icon: 'view_kanban', color: 'bg-blue-50 text-blue-500' },
                   { name: 'Zendesk', icon: 'support_agent', color: 'bg-green-50 text-green-600' },
                   { name: 'Linear', icon: 'timeline', color: 'bg-purple-50 text-purple-600' },
                   { name: 'Figma', icon: 'design_services', color: 'bg-orange-50 text-orange-600' },
                   { name: 'GitLab', icon: 'code', color: 'bg-orange-50 text-orange-600' },
                   { name: 'PostgreSQL', icon: 'database', color: 'bg-blue-50 text-blue-700' },
                   { name: 'MySQL', icon: 'database', color: 'bg-orange-50 text-orange-600' },
                 ].map((app, idx) => (
                   <button key={idx} className="flex flex-col items-center gap-3 p-4 rounded-xl border border-border-light bg-surface-light hover:border-primary hover:shadow-md transition-all dark:border-border-dark dark:bg-surface-dark dark:hover:border-primary">
                     <div className={`size-12 rounded-xl flex items-center justify-center ${app.color} dark:bg-opacity-20`}>
                       <span className="material-symbols-outlined text-[24px]">{app.icon}</span>
                     </div>
                     <span className="text-sm font-medium text-text-main dark:text-white">{app.name}</span>
                   </button>
                 ))}
               </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. Slack Connect Modal */}
      {activeModal === 'slack' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200" onClick={closeModal}>
          <div className="bg-surface-light dark:bg-surface-dark w-full max-w-md rounded-xl shadow-2xl border border-border-light dark:border-border-dark flex flex-col overflow-hidden animate-in zoom-in-95 duration-200" onClick={e => e.stopPropagation()}>
            <div className="flex flex-col items-center p-8 text-center">
               <div className="size-16 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mb-4 dark:bg-purple-900/30 dark:text-purple-400">
                 <span className="material-symbols-outlined text-[32px]">chat</span>
               </div>
               <h3 className="text-xl font-bold text-text-main dark:text-white mb-2">连接 Slack 工作区</h3>
               <p className="text-sm text-text-secondary dark:text-gray-400 mb-6">
                 Knowledge AI 需要访问您的 Slack 公共频道以索引知识。我们不会读取私有消息。
               </p>
               <button 
                 onClick={handleConnectSlack}
                 disabled={isConnecting}
                 className="w-full py-2.5 rounded-lg bg-[#4A154B] text-white font-bold text-sm hover:bg-[#3b113c] transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
               >
                 {isConnecting ? (
                   <>
                     <span className="material-symbols-outlined animate-spin text-[18px]">sync</span> 连接中...
                   </>
                 ) : (
                   "授权访问 Slack"
                 )}
               </button>
               <button onClick={closeModal} className="mt-3 text-xs text-text-secondary hover:underline dark:text-gray-500">取消</button>
            </div>
          </div>
        </div>
      )}

      {/* 4. Manage Connection Modal (Generic) */}
      {(activeModal === 'manage_notion' || activeModal === 'manage_drive' || activeModal === 'manage_local') && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200" onClick={closeModal}>
           <div className="bg-surface-light dark:bg-surface-dark w-full max-w-lg rounded-xl shadow-2xl border border-border-light dark:border-border-dark flex flex-col overflow-hidden animate-in zoom-in-95 duration-200" onClick={e => e.stopPropagation()}>
             <div className="flex items-center justify-between px-6 py-4 border-b border-border-light dark:border-border-dark">
                <h3 className="font-bold text-lg text-text-main dark:text-white">
                  {activeModal === 'manage_notion' && '管理 Notion 连接'}
                  {activeModal === 'manage_drive' && '管理 Google Drive 连接'}
                  {activeModal === 'manage_local' && '管理本地文件系统'}
                </h3>
                <button onClick={closeModal} className="text-text-secondary hover:text-text-main dark:text-gray-400 dark:hover:text-white"><span className="material-symbols-outlined">close</span></button>
             </div>
             <div className="p-6 flex flex-col gap-6">
                <div className="flex items-center justify-between bg-green-50 dark:bg-green-900/20 p-3 rounded-lg border border-green-100 dark:border-green-900/30">
                   <div className="flex items-center gap-2">
                     <span className="material-symbols-outlined text-green-600 dark:text-green-400">check_circle</span>
                     <span className="text-sm font-medium text-green-700 dark:text-green-400">状态：已连接</span>
                   </div>
                   <button className="text-xs font-bold text-green-700 hover:underline dark:text-green-400">立即同步</button>
                </div>
                
                <div className="space-y-3">
                   <h4 className="text-sm font-bold text-text-main dark:text-white">同步设置</h4>
                   <label className="flex items-center justify-between py-2 border-b border-border-light dark:border-border-dark">
                      <span className="text-sm text-text-secondary dark:text-gray-400">自动同步频率</span>
                      <select className="text-sm bg-transparent border-none text-text-main dark:text-white focus:ring-0 cursor-pointer">
                        <option>每 10 分钟</option>
                        <option>每小时</option>
                        <option>每天</option>
                      </select>
                   </label>
                   {activeModal === 'manage_notion' && (
                     <label className="flex items-center justify-between py-2 border-b border-border-light dark:border-border-dark">
                        <span className="text-sm text-text-secondary dark:text-gray-400">同步页面范围</span>
                        <span className="text-sm text-primary cursor-pointer">选择页面 (3)</span>
                     </label>
                   )}
                   {activeModal === 'manage_drive' && (
                     <label className="flex items-center justify-between py-2 border-b border-border-light dark:border-border-dark">
                        <span className="text-sm text-text-secondary dark:text-gray-400">同步文件夹</span>
                        <span className="text-sm text-primary cursor-pointer">选择文件夹 (5)</span>
                     </label>
                   )}
                </div>

                <div className="pt-2">
                   <h4 className="text-sm font-bold text-text-main dark:text-white mb-2">最近活动</h4>
                   <div className="text-xs text-text-secondary dark:text-gray-400 space-y-1">
                     <p>• 10:45 AM - 同步完成 (新增 2 个文档)</p>
                     <p>• 09:30 AM - 同步完成 (无变更)</p>
                     <p>• 昨天 - 重新建立连接授权</p>
                   </div>
                </div>
             </div>
             <div className="bg-background-light/50 dark:bg-white/5 px-6 py-4 border-t border-border-light dark:border-border-dark flex justify-between items-center">
                <button className="text-sm font-medium text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300">断开连接</button>
                <button onClick={closeModal} className="px-4 py-2 rounded-lg bg-primary text-sm font-medium text-white hover:bg-primary-dark shadow-sm">完成</button>
             </div>
           </div>
        </div>
      )}

    </div>
  );
};