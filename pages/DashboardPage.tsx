import React, { useState, useEffect, useRef } from 'react';
import { Header } from '../components/Header';

interface RecentFile {
  id: string;
  name: string;
  type: string;
  time: string;
  status: '已索引' | '索引中' | '更新中' | '失败';
  icon: string;
  color: string;
}

export const DashboardPage: React.FC = () => {
  // --- State ---
  const [greeting, setGreeting] = useState('你好');
  const [inputValue, setInputValue] = useState('');
  const [recentFiles, setRecentFiles] = useState<RecentFile[]>([
    { id: '1', name: '2023年度财务报告.pdf', type: 'PDF', time: '2小时前', status: '已索引', icon: 'picture_as_pdf', color: 'text-red-600 bg-red-100 dark:bg-red-900/30 dark:text-red-400' },
    { id: '2', name: '产品需求文档_v2.docx', type: 'Word', time: '昨天', status: '已索引', icon: 'description', color: 'text-blue-600 bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400' },
    { id: '3', name: 'Notion: 营销策略', type: 'Web', time: '2天前', status: '更新中', icon: 'link', color: 'text-gray-600 bg-gray-100 dark:bg-gray-800 dark:text-gray-400' },
  ]);
  
  // Q&A Modal State
  const [showAnswerModal, setShowAnswerModal] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [answerContent, setAnswerContent] = useState('');
  
  // Data Source State
  const [slackConnected, setSlackConnected] = useState(false);
  const [isConnectingSlack, setIsConnectingSlack] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // --- Effects ---
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('早上好');
    else if (hour < 18) setGreeting('下午好');
    else setGreeting('晚上好');
  }, []);

  // --- Handlers ---

  const handleQuickAsk = () => {
    if (!inputValue.trim()) return;
    
    setShowAnswerModal(true);
    setIsAnalyzing(true);
    setAnswerContent('');

    // Simulate AI thinking and streaming
    setTimeout(() => {
      setIsAnalyzing(false);
      const mockAnswer = `针对您的问题 "${inputValue}"，我检索了知识库中的相关内容。\n\n根据**2023年度财务报告**和**产品需求文档**，目前的策略重点在于：\n1. **降本增效**：通过引入自动化工具降低 15% 的运营成本。\n2. **市场扩张**：Q4 重点发力亚太市场，预计投入 $2M 用于本地化营销。\n\n如果您需要更详细的数据分析，请查看具体的财务报表。`;
      
      let i = 0;
      const interval = setInterval(() => {
        setAnswerContent(mockAnswer.slice(0, i));
        i++;
        if (i > mockAnswer.length) clearInterval(interval);
      }, 20);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleQuickAsk();
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const newFile: RecentFile = {
        id: Date.now().toString(),
        name: file.name,
        type: file.name.split('.').pop()?.toUpperCase() || 'FILE',
        time: '刚刚',
        status: '索引中',
        icon: 'description',
        color: 'text-blue-600 bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400'
      };
      setRecentFiles([newFile, ...recentFiles]);
      
      // Simulate indexing finish
      setTimeout(() => {
        setRecentFiles(prev => prev.map(f => f.id === newFile.id ? { ...f, status: '已索引' } : f));
      }, 3000);
    }
  };

  const handleConnectSlack = () => {
    setIsConnectingSlack(true);
    setTimeout(() => {
      setSlackConnected(true);
      setIsConnectingSlack(false);
    }, 1500);
  };

  const handleTagClick = (tag: string) => {
    setInputValue(tag);
    // Optional: auto submit
    // handleQuickAsk(); 
  };

  return (
    <div className="flex flex-col h-full overflow-hidden bg-background-light dark:bg-background-dark relative">
      <Header breadcrumbs={['仪表盘']} />
      
      <div className="flex-1 overflow-y-auto p-6 lg:p-10 custom-scrollbar">
        <div className="mx-auto flex max-w-[1200px] flex-col gap-8">
          {/* Welcome Section */}
          <div className="flex flex-col gap-1">
            <h2 className="font-display text-3xl font-bold text-text-main dark:text-white">{greeting}, Alex</h2>
            <p className="text-text-secondary dark:text-gray-400">您的知识库已准备就绪，今日已索引 {recentFiles.length} 个新文档。</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: 'description', color: 'text-primary', bg: 'bg-blue-50 dark:bg-blue-900/20', label: '总文档数量', value: '1,240', trend: '+5%', trendColor: 'text-green-700 bg-green-50 dark:bg-green-900/30 dark:text-green-400' },
              { icon: 'memory', color: 'text-purple-600 dark:text-purple-400', bg: 'bg-purple-50 dark:bg-purple-900/20', label: '知识切片 (Chunks)', value: '15.4k', trend: '+12%', trendColor: 'text-green-700 bg-green-50 dark:bg-green-900/30 dark:text-green-400' },
              { icon: 'chat', color: 'text-orange-600 dark:text-orange-400', bg: 'bg-orange-50 dark:bg-orange-900/20', label: '今日提问', value: '12', trend: '今日', trendColor: 'text-text-secondary bg-gray-100 dark:bg-gray-800 dark:text-gray-400' },
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
              <div className="relative flex items-center rounded-xl bg-surface-light shadow-sm dark:bg-surface-dark ring-1 ring-black/5 dark:ring-white/10 focus-within:ring-2 focus-within:ring-primary transition-all">
                <span className="material-symbols-outlined absolute left-4 text-text-secondary dark:text-gray-400">auto_awesome</span>
                <input
                  className="h-14 w-full rounded-xl border-none bg-transparent pl-12 pr-32 text-base text-text-main placeholder-text-secondary focus:outline-none focus:ring-0 dark:text-white dark:placeholder-gray-500"
                  placeholder="向你的知识库提问，例如：'总结上周的会议记录'..."
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                <div className="absolute right-2 flex items-center gap-2">
                  <button 
                    onClick={handleQuickAsk}
                    className="rounded-lg bg-primary px-4 py-2 text-sm font-bold text-white shadow-lg shadow-primary/30 transition-all hover:bg-primary-dark hover:shadow-primary/50"
                  >
                    发送
                  </button>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 text-xs text-text-secondary dark:text-gray-400">
                <span className="font-medium">热门提问:</span>
                {['Q3 季度财报总结', '产品发布计划', '竞争对手分析'].map(tag => (
                  <button 
                    key={tag} 
                    onClick={() => handleTagClick(tag)}
                    className="rounded-full bg-white px-3 py-1 hover:bg-gray-50 dark:bg-white/5 dark:hover:bg-white/10 transition-colors border border-transparent hover:border-primary/20 cursor-pointer"
                  >
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
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    className="hidden" 
                    onChange={handleFileUpload} 
                  />
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center gap-2 rounded-lg border border-border-light bg-surface-light px-3 py-1.5 text-sm font-medium text-text-main hover:bg-background-light dark:border-border-dark dark:bg-surface-dark dark:text-white dark:hover:bg-white/5 shadow-sm transition-all"
                  >
                    <span className="material-symbols-outlined text-[18px]">add</span>
                    上传文档
                  </button>
                  <button className="rounded-lg p-1.5 text-text-secondary hover:bg-background-light dark:text-gray-400 dark:hover:bg-white/5 transition-colors">
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
                    {recentFiles.map((row) => (
                      <tr key={row.id} className="group hover:bg-background-light dark:hover:bg-white/5 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className={`flex size-8 shrink-0 items-center justify-center rounded ${row.color}`}>
                              <span className="material-symbols-outlined text-[20px]">{row.icon}</span>
                            </div>
                            <span className="font-medium text-text-main dark:text-white line-clamp-1">{row.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-text-secondary dark:text-gray-400 hidden sm:table-cell">{row.type}</td>
                        <td className="px-6 py-4 text-text-secondary dark:text-gray-400 hidden sm:table-cell">{row.time}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center gap-1.5 rounded-full px-2 py-1 text-xs font-medium ${
                            row.status === '已索引' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 
                            row.status === '失败' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' :
                            'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                          }`}>
                            <span className={`size-1.5 rounded-full ${
                              row.status === '已索引' ? 'bg-green-500' : 
                              row.status === '失败' ? 'bg-red-500' :
                              'bg-yellow-500 animate-pulse'
                            }`}></span>
                            {row.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="border-t border-border-light bg-background-light p-3 text-center dark:border-border-dark dark:bg-white/5">
                  <button className="text-sm font-medium text-primary hover:text-primary-dark transition-colors">查看所有文档</button>
                </div>
              </div>
            </div>

            {/* Data Sources Status */}
            <div className="flex flex-col gap-4">
              <h3 className="font-display text-lg font-bold text-text-main dark:text-white">数据源状态</h3>
              <div className="flex flex-col gap-3 rounded-xl border border-border-light bg-surface-light p-4 shadow-sm dark:border-border-dark dark:bg-surface-dark">
                <div className="flex items-center justify-between rounded-lg p-3 hover:bg-background-light transition-colors dark:hover:bg-white/5">
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-lg bg-gray-100 dark:bg-white/10">
                       <span className="material-symbols-outlined text-gray-600 dark:text-gray-300">edit_note</span>
                    </div>
                    <div>
                      <p className="font-medium text-text-main dark:text-white">Notion</p>
                      <p className="text-xs text-text-secondary dark:text-gray-400">上次同步: 10分钟前</p>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-green-500">check_circle</span>
                </div>
                <div className="flex items-center justify-between rounded-lg p-3 hover:bg-background-light transition-colors dark:hover:bg-white/5">
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-lg bg-gray-100 dark:bg-white/10">
                      <span className="material-symbols-outlined text-gray-600 dark:text-gray-300">folder_shared</span>
                    </div>
                    <div>
                      <p className="font-medium text-text-main dark:text-white">Google Drive</p>
                      <p className="text-xs text-text-secondary dark:text-gray-400">已连接 3 个文件夹</p>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-green-500">check_circle</span>
                </div>
                <div className={`flex items-center justify-between rounded-lg p-3 transition-colors ${slackConnected ? 'hover:bg-background-light dark:hover:bg-white/5' : 'opacity-100'}`}>
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-lg bg-gray-100 dark:bg-white/10">
                      <span className="material-symbols-outlined text-gray-500 dark:text-gray-400">chat</span>
                    </div>
                    <div>
                      <p className="font-medium text-text-main dark:text-white">Slack</p>
                      <p className="text-xs text-text-secondary dark:text-gray-400">{slackConnected ? '正在监控 #general' : '未连接'}</p>
                    </div>
                  </div>
                  {slackConnected ? (
                    <span className="material-symbols-outlined text-green-500">check_circle</span>
                  ) : (
                    <button 
                      onClick={handleConnectSlack}
                      disabled={isConnectingSlack}
                      className="rounded-full border border-border-light px-3 py-1 text-xs font-medium text-text-secondary hover:bg-gray-100 dark:border-border-dark dark:hover:bg-white/10 dark:text-gray-400 transition-colors disabled:opacity-50"
                    >
                      {isConnectingSlack ? '...' : '连接'}
                    </button>
                  )}
                </div>
                <button className="mt-2 w-full rounded-lg border border-dashed border-primary/40 bg-primary/5 py-3 text-sm font-medium text-primary hover:bg-primary/10 transition-colors flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">add_circle</span>
                  添加新数据源
                </button>
              </div>
              
              <div className="mt-2 rounded-xl bg-blue-50 p-4 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/50">
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

      {/* Quick Answer Modal */}
      {showAnswerModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200" onClick={() => setShowAnswerModal(false)}>
          <div className="bg-surface-light dark:bg-surface-dark w-full max-w-2xl rounded-xl shadow-2xl border border-border-light dark:border-border-dark flex flex-col overflow-hidden animate-in zoom-in-95 duration-200" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between px-6 py-4 border-b border-border-light dark:border-border-dark bg-background-light/50 dark:bg-white/5">
              <div className="flex items-center gap-2">
                 <span className="material-symbols-outlined text-primary">auto_awesome</span>
                 <h3 className="font-bold text-lg text-text-main dark:text-white">快速问答</h3>
              </div>
              <button onClick={() => setShowAnswerModal(false)} className="text-text-secondary hover:text-text-main dark:text-gray-400 dark:hover:text-white">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="p-6 flex flex-col gap-4 max-h-[60vh] overflow-y-auto custom-scrollbar">
               <div className="flex gap-4">
                 <div className="size-8 shrink-0 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                   <span className="material-symbols-outlined text-gray-500 text-[18px]">person</span>
                 </div>
                 <div className="flex-1">
                   <p className="text-sm font-medium text-text-main dark:text-white leading-relaxed">{inputValue}</p>
                 </div>
               </div>

               <div className="flex gap-4">
                 <div className="size-8 shrink-0 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 text-white flex items-center justify-center shadow-md">
                   {isAnalyzing ? (
                     <span className="material-symbols-outlined text-[18px] animate-spin">sync</span>
                   ) : (
                     <span className="material-symbols-outlined text-[18px]">smart_toy</span>
                   )}
                 </div>
                 <div className="flex-1">
                   {isAnalyzing ? (
                     <div className="flex items-center gap-2 text-sm text-text-secondary dark:text-gray-400 h-6">
                        <span>正在检索知识库...</span>
                        <span className="flex gap-1">
                          <span className="size-1.5 bg-gray-400 rounded-full animate-bounce"></span>
                          <span className="size-1.5 bg-gray-400 rounded-full animate-bounce delay-100"></span>
                          <span className="size-1.5 bg-gray-400 rounded-full animate-bounce delay-200"></span>
                        </span>
                     </div>
                   ) : (
                     <div className="prose prose-sm dark:prose-invert max-w-none text-text-main dark:text-gray-200">
                       <p className="whitespace-pre-wrap leading-relaxed">{answerContent}</p>
                     </div>
                   )}
                 </div>
               </div>
            </div>
            <div className="p-4 border-t border-border-light dark:border-border-dark bg-background-light/30 dark:bg-white/5 flex justify-end gap-2">
               <button onClick={() => setShowAnswerModal(false)} className="px-4 py-2 rounded-lg text-sm font-medium text-text-secondary hover:bg-background-light dark:hover:bg-white/10 transition-colors">关闭</button>
               <button className="px-4 py-2 rounded-lg bg-primary text-sm font-medium text-white hover:bg-primary-dark shadow-sm">继续追问</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};