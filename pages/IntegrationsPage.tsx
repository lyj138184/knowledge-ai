import React from 'react';
import { Header } from '../components/Header';

export const IntegrationsPage: React.FC = () => {
  return (
    <div className="flex flex-col h-full bg-background-light dark:bg-background-dark overflow-hidden">
      <Header 
        breadcrumbs={['数据源集成']} 
        showSearch={true}
      />
      
      <div className="flex-1 overflow-y-auto p-6 lg:p-10">
        <div className="mx-auto flex max-w-[1200px] flex-col gap-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex flex-col gap-1">
              <h2 className="font-display text-3xl font-bold text-text-main dark:text-white">数据源集成</h2>
              <p className="text-text-secondary dark:text-gray-400 max-w-2xl">
                管理您的外部知识源连接，AI 助手将自动同步并索引这些数据源中的内容，为您提供更全面的智能问答服务。
              </p>
            </div>
            <div className="flex gap-3">
              <button className="flex items-center gap-2 rounded-lg border border-border-light bg-surface-light px-4 py-2 text-sm font-medium text-text-main hover:bg-background-light dark:border-border-dark dark:bg-surface-dark dark:text-white dark:hover:bg-white/5 transition-colors">
                <span className="material-symbols-outlined text-[18px]">settings_ethernet</span>
                配置 MCP 协议
              </button>
              <button className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white shadow-lg shadow-primary/30 transition-all hover:bg-primary-dark hover:shadow-primary/50">
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
                  <button className="rounded-lg px-3 py-1.5 text-xs font-medium text-text-main hover:bg-background-light dark:text-white dark:hover:bg-white/10 transition-colors border border-border-light dark:border-border-dark">管理连接</button>
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
                  <button className="rounded-lg px-3 py-1.5 text-xs font-medium text-text-main hover:bg-background-light dark:text-white dark:hover:bg-white/10 transition-colors border border-border-light dark:border-border-dark">管理连接</button>
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
                  <button className="rounded-lg px-3 py-1.5 text-xs font-medium text-text-main hover:bg-background-light dark:text-white dark:hover:bg-white/10 transition-colors border border-border-light dark:border-border-dark">管理连接</button>
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
                <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-text-main px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-gray-800 dark:bg-white dark:text-surface-dark dark:hover:bg-gray-200">
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
                <button className="flex w-full items-center justify-center gap-2 rounded-lg border border-primary text-primary px-4 py-2 text-sm font-bold transition-colors hover:bg-primary hover:text-white">
                  <span className="material-symbols-outlined text-[18px]">settings</span>
                  配置通用连接
                </button>
              </div>
            </div>

            {/* Add More */}
            <button className="group flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-border-light bg-surface-light p-6 transition-all hover:border-primary/50 hover:bg-background-light dark:border-border-dark dark:bg-surface-dark dark:hover:border-primary/50 dark:hover:bg-white/5">
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
    </div>
  );
};