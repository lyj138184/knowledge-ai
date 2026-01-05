import React from 'react';
import { Header } from '../components/Header';

export const DashboardPage: React.FC = () => {
  return (
    <div className="flex flex-col h-full overflow-hidden bg-background-light">
      <Header breadcrumbs={['仪表盘']} />
      
      <div className="flex-1 overflow-y-auto p-6 lg:p-10">
        <div className="mx-auto flex max-w-[1200px] flex-col gap-8">
          {/* Welcome Section */}
          <div className="flex flex-col gap-1">
            <h2 className="font-display text-3xl font-bold text-text-main dark:text-white">欢迎回来, Alex</h2>
            <p className="text-text-secondary dark:text-gray-400">您的知识库已准备就绪，今日已索引 5 个新文档。</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: 'description', color: 'text-primary', bg: 'bg-blue-50', label: '总文档数量', value: '1,240', trend: '+5%', trendColor: 'text-green-700 bg-green-50' },
              { icon: 'memory', color: 'text-purple-600', bg: 'bg-purple-50', label: '知识切片 (Chunks)', value: '15.4k', trend: '+12%', trendColor: 'text-green-700 bg-green-50' },
              { icon: 'chat', color: 'text-orange-600', bg: 'bg-orange-50', label: '今日提问', value: '12', trend: '今日', trendColor: 'text-text-secondary bg-gray-100' },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col gap-4 rounded-xl bg-surface-light p-6 shadow-sm ring-1 ring-black/5 dark:bg-surface-dark dark:ring-white/10 transition-transform hover:-translate-y-1 duration-300">
                <div className="flex items-center justify-between">
                  <div className={`rounded-lg p-2 ${stat.bg} ${stat.color}`}>
                    <span className="material-symbols-outlined">{stat.icon}</span>
                  </div>
                  <span className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${stat.trendColor}`}>
                    {stat.trend.includes('+') && <span className="material-symbols-outlined text-[14px]">trending_up</span>}
                    {stat.trend}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-text-secondary dark:text-gray-400">{stat.label}</p>
                  <p className="mt-1 font-display text-3xl font-bold text-text-main dark:text-white">{stat.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Actions / Composer */}
          <div className="rounded-xl bg-gradient-to-r from-primary/10 to-purple-500/10 p-6 dark:from-primary/20 dark:to-purple-900/20">
            <div className="flex flex-col gap-4">
              <h3 className="font-display text-lg font-bold text-text-main dark:text-white">开始智能问答</h3>
              <div className="relative flex items-center rounded-xl bg-surface-light shadow-sm dark:bg-surface-dark">
                <span className="material-symbols-outlined absolute left-4 text-text-secondary dark:text-gray-400">auto_awesome</span>
                <input
                  className="h-14 w-full rounded-xl border-none bg-transparent pl-12 pr-32 text-base text-text-main placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary dark:text-white dark:placeholder-gray-500"
                  placeholder="向你的知识库提问，例如：'总结上周的会议记录'..."
                  type="text"
                />
                <div className="absolute right-2 flex items-center gap-2">
                  <button className="rounded-lg bg-primary px-4 py-2 text-sm font-bold text-white shadow-lg shadow-primary/30 transition-all hover:bg-primary-dark hover:shadow-primary/50">
                    发送
                  </button>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 text-xs text-text-secondary dark:text-gray-400">
                <span className="font-medium">热门提问:</span>
                {['Q3 季度财报总结', '产品发布计划', '竞争对手分析'].map(tag => (
                  <button key={tag} className="rounded-full bg-white px-3 py-1 hover:bg-gray-50 dark:bg-white/5 dark:hover:bg-white/10 transition-colors border border-transparent hover:border-primary/20">
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Two Column Section */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 pb-8">
            {/* Recent Uploads List */}
            <div className="lg:col-span-2 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-lg font-bold text-text-main dark:text-white">最近上传</h3>
                <div className="flex gap-2">
                  <button className="flex items-center gap-2 rounded-lg border border-border-light bg-surface-light px-3 py-1.5 text-sm font-medium text-text-main hover:bg-background-light dark:border-border-dark dark:bg-surface-dark dark:text-white dark:hover:bg-white/5">
                    <span className="material-symbols-outlined text-[18px]">add</span>
                    上传文档
                  </button>
                  <button className="rounded-lg p-1.5 text-text-secondary hover:bg-background-light dark:text-gray-400 dark:hover:bg-white/5">
                    <span className="material-symbols-outlined">more_horiz</span>
                  </button>
                </div>
              </div>
              <div className="overflow-hidden rounded-xl border border-border-light bg-surface-light shadow-sm dark:border-border-dark dark:bg-surface-dark">
                <table className="w-full text-left text-sm">
                  <thead className="bg-background-light text-text-secondary dark:bg-white/5 dark:text-gray-400">
                    <tr>
                      <th className="px-6 py-3 font-medium">文档名称</th>
                      <th className="px-6 py-3 font-medium hidden sm:table-cell">类型</th>
                      <th className="px-6 py-3 font-medium hidden sm:table-cell">上传时间</th>
                      <th className="px-6 py-3 font-medium">状态</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border-light dark:divide-border-dark">
                    {[
                      { name: '2023年度财务报告.pdf', type: 'PDF', time: '2小时前', status: '已索引', icon: 'picture_as_pdf', color: 'text-red-600 bg-red-100' },
                      { name: '产品需求文档_v2.docx', type: 'Word', time: '昨天', status: '已索引', icon: 'description', color: 'text-blue-600 bg-blue-100' },
                      { name: 'Notion: 营销策略', type: 'Web', time: '2天前', status: '更新中', icon: 'link', color: 'text-gray-600 bg-gray-100' },
                    ].map((row, i) => (
                      <tr key={i} className="group hover:bg-background-light dark:hover:bg-white/5 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className={`flex size-8 shrink-0 items-center justify-center rounded ${row.color}`}>
                              <span className="material-symbols-outlined text-[20px]">{row.icon}</span>
                            </div>
                            <span className="font-medium text-text-main dark:text-white">{row.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-text-secondary dark:text-gray-400 hidden sm:table-cell">{row.type}</td>
                        <td className="px-6 py-4 text-text-secondary dark:text-gray-400 hidden sm:table-cell">{row.time}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center gap-1.5 rounded-full px-2 py-1 text-xs font-medium ${
                            row.status === '已索引' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                          }`}>
                            <span className={`size-1.5 rounded-full ${row.status === '已索引' ? 'bg-green-500' : 'bg-yellow-500 animate-pulse'}`}></span>
                            {row.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="border-t border-border-light bg-background-light p-3 text-center dark:border-border-dark dark:bg-white/5">
                  <button className="text-sm font-medium text-primary hover:text-primary-dark">查看所有文档</button>
                </div>
              </div>
            </div>

            {/* Data Sources Status */}
            <div className="flex flex-col gap-4">
              <h3 className="font-display text-lg font-bold text-text-main dark:text-white">数据源状态</h3>
              <div className="flex flex-col gap-3 rounded-xl border border-border-light bg-surface-light p-4 shadow-sm dark:border-border-dark dark:bg-surface-dark">
                <div className="flex items-center justify-between rounded-lg p-3 hover:bg-background-light transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-lg bg-gray-100">
                       <span className="material-symbols-outlined text-gray-600">edit_note</span>
                    </div>
                    <div>
                      <p className="font-medium text-text-main">Notion</p>
                      <p className="text-xs text-text-secondary">上次同步: 10分钟前</p>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-green-500">check_circle</span>
                </div>
                <div className="flex items-center justify-between rounded-lg p-3 hover:bg-background-light transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-lg bg-gray-100">
                      <span className="material-symbols-outlined text-gray-600">folder_shared</span>
                    </div>
                    <div>
                      <p className="font-medium text-text-main">Google Drive</p>
                      <p className="text-xs text-text-secondary">已连接 3 个文件夹</p>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-green-500">check_circle</span>
                </div>
                <div className="flex items-center justify-between rounded-lg p-3 hover:bg-background-light transition-colors opacity-75">
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-lg bg-gray-100">
                      <span className="material-symbols-outlined text-gray-500">chat</span>
                    </div>
                    <div>
                      <p className="font-medium text-text-main">Slack</p>
                      <p className="text-xs text-text-secondary">未连接</p>
                    </div>
                  </div>
                  <button className="rounded-full border border-border-light px-3 py-1 text-xs font-medium text-text-secondary hover:bg-gray-100">连接</button>
                </div>
                <button className="mt-2 w-full rounded-lg border border-dashed border-primary/40 bg-primary/5 py-3 text-sm font-medium text-primary hover:bg-primary/10 transition-colors flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">add_circle</span>
                  添加新数据源
                </button>
              </div>
              
              <div className="mt-2 rounded-xl bg-blue-50 p-4 dark:bg-blue-900/20">
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined mt-0.5 text-primary">lightbulb</span>
                  <div>
                    <p className="text-sm font-bold text-text-main dark:text-white">每日贴士</p>
                    <p className="mt-1 text-xs text-text-secondary dark:text-blue-200">
                      您可以上传包含表格的 PDF 文件，AI 助手现在能够更好地解析并回答有关表格数据的问题。
                    </p>
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