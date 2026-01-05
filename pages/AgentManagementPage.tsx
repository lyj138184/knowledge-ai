import React, { useState, useEffect } from 'react';
import { Header } from '../components/Header';

// --- Types ---
interface Agent {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'inactive';
  icon: string;
  colorTheme: 'indigo' | 'orange' | 'teal' | 'pink' | 'blue';
  createdAt: string;
  systemPrompt: string;
  sources: string[];
  runMode: 'manual' | 'scheduled' | 'event';
}

interface Log {
  id: string;
  time: string;
  level: 'INFO' | 'WARN' | 'ERROR';
  content: string;
}

// --- Mock Data ---
const MOCK_AGENTS: Agent[] = [
  {
    id: '1',
    name: '科研助手 Pro',
    description: '专注于分析学术论文 PDF，能够提取关键论点、实验数据并生成综述报告。已连接 Zotero 知识库。',
    status: 'active',
    icon: 'science',
    colorTheme: 'indigo',
    createdAt: '2023-10-15',
    systemPrompt: 'You are a helpful research assistant. \n1. Always cite sources from the connected Knowledge Base.\n2. If the user asks for a summary, provide bullet points.\n3. Use a formal tone.',
    sources: ['notion'],
    runMode: 'manual'
  },
  {
    id: '2',
    name: '代码审查员',
    description: '辅助进行 Python 代码审查，检查 PEP8 规范并提供优化建议。',
    status: 'inactive',
    icon: 'code',
    colorTheme: 'orange',
    createdAt: '2023-11-02',
    systemPrompt: 'You are a senior software engineer specializing in Python. Review the code for bugs, security vulnerabilities, and style issues.',
    sources: ['github'],
    runMode: 'event'
  },
  {
    id: '3',
    name: '多语言翻译官',
    description: '提供专业的中英互译服务，特别针对技术文档进行优化，保持术语一致性。',
    status: 'active',
    icon: 'translate',
    colorTheme: 'teal',
    createdAt: '2023-09-20',
    systemPrompt: 'You are a professional translator. Translate the following text into English/Chinese. Ensure technical terms are accurate.',
    sources: [],
    runMode: 'manual'
  }
];

const MOCK_LOGS: Log[] = [
  { id: 'l1', time: '10:42:05', level: 'INFO', content: '收到用户请求: "分析..."' },
  { id: 'l2', time: '10:42:08', level: 'INFO', content: '检索到 3 个相关片段' },
  { id: 'l3', time: '10:42:15', level: 'WARN', content: '响应时间超过阈值 (2s)' },
  { id: 'l4', time: '10:45:00', level: 'INFO', content: '任务完成，已生成回答' },
];

// --- Helpers ---
const getColorClasses = (theme: string) => {
  switch (theme) {
    case 'indigo': return { bg: 'bg-indigo-50 dark:bg-indigo-900/30', text: 'text-indigo-600 dark:text-indigo-400', border: 'border-indigo-200 dark:border-indigo-800' };
    case 'orange': return { bg: 'bg-orange-50 dark:bg-orange-900/30', text: 'text-orange-600 dark:text-orange-400', border: 'border-orange-200 dark:border-orange-800' };
    case 'teal': return { bg: 'bg-teal-50 dark:bg-teal-900/30', text: 'text-teal-600 dark:text-teal-400', border: 'border-teal-200 dark:border-teal-800' };
    case 'pink': return { bg: 'bg-pink-50 dark:bg-pink-900/30', text: 'text-pink-600 dark:text-pink-400', border: 'border-pink-200 dark:border-pink-800' };
    case 'blue': return { bg: 'bg-blue-50 dark:bg-blue-900/30', text: 'text-blue-600 dark:text-blue-400', border: 'border-blue-200 dark:border-blue-800' };
    default: return { bg: 'bg-gray-50 dark:bg-gray-800', text: 'text-gray-600 dark:text-gray-400', border: 'border-gray-200 dark:border-gray-700' };
  }
};

export const AgentManagementPage: React.FC = () => {
  const [agents, setAgents] = useState<Agent[]>(MOCK_AGENTS);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [configTab, setConfigTab] = useState<'settings' | 'logs'>('settings');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Form state for creating/editing
  const [formData, setFormData] = useState<Partial<Agent>>({});

  // Effect to sync selected agent to form data when opened
  useEffect(() => {
    if (selectedAgent) {
      setFormData(selectedAgent);
    }
  }, [selectedAgent]);

  const handleOpenConfig = (agent: Agent, tab: 'settings' | 'logs' = 'settings') => {
    setSelectedAgent(agent);
    setConfigTab(tab);
    setIsConfigOpen(true);
  };

  const handleCloseConfig = () => {
    setIsConfigOpen(false);
    setTimeout(() => setSelectedAgent(null), 300); // Wait for animation if we add one
  };

  const handleToggleStatus = (e: React.MouseEvent, agentId: string) => {
    e.stopPropagation();
    setAgents(prev => prev.map(a => a.id === agentId ? { ...a, status: a.status === 'active' ? 'inactive' : 'active' } : a));
    // If we are editing this one, update the form data too
    if (selectedAgent?.id === agentId) {
       setSelectedAgent(prev => prev ? { ...prev, status: prev.status === 'active' ? 'inactive' : 'active' } : null);
    }
  };

  const handleSaveConfig = () => {
    if (!selectedAgent) return;
    setAgents(prev => prev.map(a => a.id === selectedAgent.id ? { ...a, ...formData } as Agent : a));
    setIsConfigOpen(false);
  };

  const handleCreateAgent = () => {
    const newAgent: Agent = {
      id: Date.now().toString(),
      name: formData.name || '未命名 Agent',
      description: formData.description || '暂无描述',
      status: 'active',
      icon: formData.icon || 'smart_toy',
      colorTheme: (formData.colorTheme as any) || 'blue',
      createdAt: new Date().toISOString().split('T')[0],
      systemPrompt: formData.systemPrompt || 'You are a helpful assistant.',
      sources: [],
      runMode: 'manual'
    };
    setAgents([...agents, newAgent]);
    setIsCreateModalOpen(false);
    setFormData({});
  };

  const openCreateModal = () => {
    setFormData({ icon: 'smart_toy', colorTheme: 'blue' });
    setIsCreateModalOpen(true);
  };

  return (
    <div className="flex flex-col h-full bg-background-light dark:bg-background-dark overflow-hidden">
      <Header 
        breadcrumbs={['Agent 管理']} 
        showSearch={true}
      />
      
      <div className="flex flex-1 overflow-hidden relative">
        {/* Main List Area */}
        <div className="flex-1 flex flex-col min-w-0 overflow-y-auto p-6 lg:p-8 custom-scrollbar">
          <div className="mx-auto w-full max-w-[1400px] flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-display text-2xl font-bold text-text-main dark:text-white">我的 Agents</h2>
                <p className="text-sm text-text-secondary dark:text-gray-400 mt-1">管理您的个性化 AI 助手，配置能力与数据源。</p>
              </div>
              <button 
                onClick={openCreateModal}
                className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-primary/30 transition-all hover:bg-primary-dark hover:shadow-primary/50"
              >
                <span className="material-symbols-outlined text-[20px]">add</span>
                创建新 Agent
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-4 pb-20">
              {agents.map(agent => {
                const colors = getColorClasses(agent.colorTheme);
                return (
                  <div 
                    key={agent.id}
                    onClick={() => handleOpenConfig(agent)}
                    className={`group relative flex flex-col justify-between rounded-xl border-2 bg-surface-light p-5 shadow-sm hover:shadow-md transition-all cursor-pointer ${
                      selectedAgent?.id === agent.id 
                        ? `border-primary ${colors.bg.split(' ')[0]} dark:bg-surface-dark` 
                        : 'border-transparent hover:border-primary/50 dark:bg-surface-dark dark:border-transparent dark:hover:border-primary/50'
                    }`}
                  >
                    <div>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`flex size-12 items-center justify-center rounded-lg ${colors.bg} ${colors.text}`}>
                            <span className="material-symbols-outlined text-[28px]">{agent.icon}</span>
                          </div>
                          <div>
                            <h3 className="font-bold text-text-main dark:text-white">{agent.name}</h3>
                            <div className="flex items-center gap-2 mt-0.5">
                                <span className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide border ${
                                  agent.status === 'active' 
                                    ? 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800' 
                                    : 'bg-gray-100 text-gray-500 border-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700'
                                }`}>
                                  <span className={`size-1.5 rounded-full ${agent.status === 'active' ? 'bg-green-500' : 'bg-gray-400'}`}></span> 
                                  {agent.status === 'active' ? '启用' : '禁用'}
                                </span>
                            </div>
                          </div>
                        </div>
                        <div className="relative z-10">
                          <button onClick={(e) => { e.stopPropagation(); /* Menu logic */ }} className="rounded-lg p-1 text-text-secondary hover:bg-background-light dark:hover:bg-white/5 transition-colors">
                            <span className="material-symbols-outlined">more_vert</span>
                          </button>
                        </div>
                      </div>
                      <p className="mt-4 text-sm text-text-secondary dark:text-gray-400 line-clamp-2 h-10">
                        {agent.description}
                      </p>
                    </div>
                    <div className="mt-5 flex items-center justify-between border-t border-border-light pt-4 dark:border-border-dark">
                      <span className="text-xs text-text-secondary dark:text-gray-500">创建于 {agent.createdAt}</span>
                      <div className="flex gap-1 z-10">
                        <button 
                          onClick={(e) => { e.stopPropagation(); handleOpenConfig(agent, 'logs'); }}
                          className="flex items-center gap-1 rounded px-2 py-1 text-xs font-medium text-text-secondary hover:bg-background-light hover:text-text-main dark:hover:bg-white/5 dark:text-gray-400 transition-colors"
                        >
                          <span className="material-symbols-outlined text-[16px]">history</span>
                          日志
                        </button>
                        <button 
                          onClick={(e) => { e.stopPropagation(); handleOpenConfig(agent, 'settings'); }}
                          className="flex items-center gap-1 rounded px-2 py-1 text-xs font-medium text-primary hover:bg-primary/5 transition-colors"
                        >
                          <span className="material-symbols-outlined text-[16px]">edit</span>
                          配置
                        </button>
                      </div>
                    </div>
                    {/* Active Indicator Strip */}
                    {agent.status === 'active' && <div className="absolute -right-0.5 top-1/2 h-8 w-1 -translate-y-1/2 rounded-l-full bg-primary opacity-50 group-hover:opacity-100 transition-opacity"></div>}
                  </div>
                );
              })}
              
              {/* Add New Placeholder */}
              <button onClick={openCreateModal} className="group flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-border-light bg-surface-light/50 p-5 transition-all hover:border-primary/50 hover:bg-background-light dark:border-border-dark dark:bg-surface-dark/50 dark:hover:border-primary/50 dark:hover:bg-white/5 min-h-[220px]">
                <div className="flex size-14 items-center justify-center rounded-full bg-gray-50 text-gray-400 transition-colors group-hover:bg-primary/10 group-hover:text-primary dark:bg-white/5">
                  <span className="material-symbols-outlined text-[32px]">add</span>
                </div>
                <h3 className="mt-4 font-display text-lg font-bold text-text-secondary group-hover:text-primary dark:text-gray-400">创建新 Agent</h3>
              </button>
            </div>
          </div>
        </div>

        {/* Configuration Panel (Side Drawer) */}
        {selectedAgent && (
          <div className={`absolute inset-y-0 right-0 w-full sm:w-[500px] border-l border-border-light bg-surface-light shadow-2xl dark:bg-surface-dark dark:border-border-dark z-20 transform transition-transform duration-300 ease-in-out flex flex-col ${isConfigOpen ? 'translate-x-0' : 'translate-x-full'}`}>
            {/* Panel Header */}
            <div className="flex h-14 items-center justify-between border-b border-border-light px-6 dark:border-border-dark shrink-0">
              <div className="flex items-center gap-2">
                 <div className={`size-2 rounded-full ${selectedAgent.status === 'active' ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                 <h3 className="font-display font-bold text-text-main dark:text-white truncate max-w-[200px]">{formData.name}</h3>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={(e) => handleToggleStatus(e, selectedAgent.id)}
                  className={`rounded p-1.5 transition-colors ${
                    selectedAgent.status === 'active' 
                      ? 'text-green-600 hover:bg-green-50 dark:text-green-400 dark:hover:bg-green-900/20' 
                      : 'text-gray-400 hover:bg-gray-100 dark:hover:bg-white/10'
                  }`}
                  title={selectedAgent.status === 'active' ? '暂停 Agent' : '启用 Agent'}
                >
                  <span className="material-symbols-outlined text-[20px]">{selectedAgent.status === 'active' ? 'pause_circle' : 'play_circle'}</span>
                </button>
                <button onClick={handleCloseConfig} className="rounded p-1.5 text-text-secondary hover:bg-background-light dark:text-gray-400 dark:hover:bg-white/5" title="关闭面板">
                  <span className="material-symbols-outlined text-[20px]">close</span>
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-border-light px-6 dark:border-border-dark shrink-0">
              <button 
                onClick={() => setConfigTab('settings')}
                className={`border-b-2 py-3 text-sm font-medium transition-colors ${configTab === 'settings' ? 'border-primary text-primary' : 'border-transparent text-text-secondary hover:text-text-main dark:text-gray-400 dark:hover:text-white'}`}
              >
                基本设置
              </button>
              <button 
                onClick={() => setConfigTab('logs')}
                className={`ml-6 border-b-2 py-3 text-sm font-medium transition-colors ${configTab === 'logs' ? 'border-primary text-primary' : 'border-transparent text-text-secondary hover:text-text-main dark:text-gray-400 dark:hover:text-white'}`}
              >
                运行日志
              </button>
            </div>

            {/* Panel Content */}
            <div className="flex-1 overflow-y-auto p-6 custom-scrollbar bg-background-light/30 dark:bg-black/5">
              {configTab === 'settings' ? (
                <div className="flex flex-col gap-6">
                  {/* Basic Info */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-medium text-text-secondary dark:text-gray-400 mb-1">Agent 名称</label>
                      <input 
                        className="w-full rounded-lg border-border-light bg-surface-light px-3 py-2 text-sm text-text-main focus:border-primary focus:ring-primary dark:border-border-dark dark:bg-surface-dark dark:text-white" 
                        type="text" 
                        value={formData.name || ''}
                        onChange={e => setFormData({...formData, name: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-text-secondary dark:text-gray-400 mb-1">功能描述</label>
                      <textarea 
                        className="w-full rounded-lg border-border-light bg-surface-light px-3 py-2 text-sm text-text-main focus:border-primary focus:ring-primary dark:border-border-dark dark:bg-surface-dark dark:text-white resize-none" 
                        rows={3} 
                        value={formData.description || ''}
                        onChange={e => setFormData({...formData, description: e.target.value})}
                      ></textarea>
                    </div>
                  </div>
                  
                  {/* Data Sources */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-xs font-medium text-text-secondary dark:text-gray-400">关联数据源</label>
                      <button className="text-xs text-primary hover:underline">管理数据源</button>
                    </div>
                    <div className="grid grid-cols-1 gap-2">
                      <label className={`flex cursor-pointer items-start gap-3 rounded-lg border p-3 transition-colors ${
                          formData.sources?.includes('notion') 
                          ? 'border-primary bg-primary/5 dark:bg-primary/10' 
                          : 'border-border-light bg-surface-light dark:border-border-dark dark:bg-surface-dark'
                        }`}>
                        <input 
                          type="checkbox" 
                          className="mt-1 rounded border-gray-300 text-primary focus:ring-primary dark:bg-background-dark"
                          checked={formData.sources?.includes('notion')}
                          onChange={e => {
                            const newSources = e.target.checked 
                              ? [...(formData.sources || []), 'notion']
                              : (formData.sources || []).filter(s => s !== 'notion');
                            setFormData({...formData, sources: newSources});
                          }}
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <img alt="Notion" className="size-4 opacity-80" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBFAP5XambKd5lQevWQFC_l7QGhRdXqnF50g9ws4IpVzhgbCHDUaZNneVyLBZWcVuUg4hUj-gXvi_abYv1M2PYYrxFukjhtClCIppmRxOK5DTyj9hDWpQC-Kmo7GK--JXJXqhmYdOHdQzVrWMvgj4ELzb3rq7CqMLZ-bsj9C_4ktPb2UbnKU9hUE8ch02J_0R7VgEA_ZV3i5uPCnhATQDWtJP1MJe17DA_L0pT-wf7wicEQPo0BPoQxNf9GpqKcEMVoH6cBWehg2Xo"/>
                            <span className="text-sm font-medium text-text-main dark:text-white">Notion: 论文库</span>
                          </div>
                          <p className="text-xs text-text-secondary dark:text-gray-400 mt-0.5">上次同步: 10分钟前</p>
                        </div>
                      </label>
                      <label className={`flex cursor-pointer items-start gap-3 rounded-lg border p-3 transition-colors ${
                          formData.sources?.includes('drive') 
                          ? 'border-primary bg-primary/5 dark:bg-primary/10' 
                          : 'border-border-light bg-surface-light dark:border-border-dark dark:bg-surface-dark'
                        }`}>
                         <input 
                          type="checkbox" 
                          className="mt-1 rounded border-gray-300 text-primary focus:ring-primary dark:bg-background-dark"
                          checked={formData.sources?.includes('drive')}
                          onChange={e => {
                            const newSources = e.target.checked 
                              ? [...(formData.sources || []), 'drive']
                              : (formData.sources || []).filter(s => s !== 'drive');
                            setFormData({...formData, sources: newSources});
                          }}
                        />
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

                  {/* System Prompt */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-xs font-medium text-text-secondary dark:text-gray-400">系统指令 (Prompt)</label>
                      <span className="text-xs text-text-secondary bg-background-light px-2 py-0.5 rounded dark:bg-white/10 dark:text-gray-400">Markdown 支持</span>
                    </div>
                    <div className="relative rounded-lg border border-border-light bg-surface-light dark:border-border-dark dark:bg-surface-dark overflow-hidden group focus-within:ring-1 focus-within:ring-primary focus-within:border-primary">
                      <div className="flex items-center gap-2 border-b border-border-light bg-background-light/50 px-2 py-1.5 dark:border-border-dark dark:bg-white/5">
                        <button className="p-1 text-text-secondary hover:text-primary"><span className="material-symbols-outlined text-[18px]">code</span></button>
                        <button className="p-1 text-text-secondary hover:text-primary"><span className="material-symbols-outlined text-[18px]">format_bold</span></button>
                        <button className="p-1 text-text-secondary hover:text-primary"><span className="material-symbols-outlined text-[18px]">link</span></button>
                      </div>
                      <textarea 
                        className="w-full resize-none border-none bg-transparent p-3 text-sm font-mono text-text-main focus:ring-0 dark:text-white placeholder-gray-400 custom-scrollbar" 
                        placeholder="输入系统指令..." 
                        rows={10}
                        value={formData.systemPrompt || ''}
                        onChange={e => setFormData({...formData, systemPrompt: e.target.value})}
                      ></textarea>
                    </div>
                  </div>
                </div>
              ) : (
                /* Logs Tab */
                <div className="flex flex-col gap-4 h-full">
                  <div className="flex items-center gap-2">
                    <input className="flex-1 h-9 rounded border-border-light bg-surface-light px-3 text-sm focus:border-primary focus:ring-primary dark:border-border-dark dark:bg-surface-dark dark:text-white" placeholder="筛选日志关键字..."/>
                    <button className="h-9 px-3 rounded border border-border-light bg-surface-light hover:bg-background-light text-text-secondary dark:border-border-dark dark:bg-surface-dark dark:text-gray-400">
                      <span className="material-symbols-outlined text-[18px]">filter_list</span>
                    </button>
                  </div>
                  <div className="flex-1 rounded-lg border border-border-light bg-surface-light overflow-hidden dark:border-border-dark dark:bg-surface-dark overflow-y-auto custom-scrollbar">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-background-light text-text-secondary dark:bg-white/5 dark:text-gray-400 sticky top-0">
                        <tr>
                          <th className="px-3 py-2.5 font-medium">时间</th>
                          <th className="px-3 py-2.5 font-medium">级别</th>
                          <th className="px-3 py-2.5 font-medium">内容</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border-light dark:divide-border-dark">
                        {MOCK_LOGS.map(log => (
                          <tr key={log.id} className="hover:bg-background-light dark:hover:bg-white/5">
                            <td className="px-3 py-2 text-text-secondary font-mono">{log.time}</td>
                            <td className="px-3 py-2">
                              <span className={`font-medium ${
                                log.level === 'INFO' ? 'text-green-600 dark:text-green-400' :
                                log.level === 'WARN' ? 'text-orange-500 dark:text-orange-400' :
                                'text-red-500 dark:text-red-400'
                              }`}>{log.level}</span>
                            </td>
                            <td className="px-3 py-2 text-text-main dark:text-white truncate max-w-[200px]" title={log.content}>{log.content}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>

            {/* Panel Footer */}
            <div className="border-t border-border-light bg-surface-light p-4 dark:bg-surface-dark dark:border-border-dark flex justify-end gap-3 shrink-0">
              <button 
                onClick={handleCloseConfig}
                className="rounded-lg px-4 py-2 text-sm font-medium text-text-secondary hover:bg-background-light dark:text-gray-400 dark:hover:bg-white/5 transition-colors"
              >
                取消
              </button>
              <button 
                onClick={handleSaveConfig}
                className="rounded-lg bg-primary px-4 py-2 text-sm font-bold text-white shadow-md shadow-primary/20 hover:bg-primary-dark transition-all"
              >
                保存配置
              </button>
            </div>
          </div>
        )}

        {/* Create Agent Modal */}
        {isCreateModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200" onClick={() => setIsCreateModalOpen(false)}>
            <div className="bg-surface-light dark:bg-surface-dark w-full max-w-lg rounded-xl shadow-2xl border border-border-light dark:border-border-dark flex flex-col overflow-hidden animate-in zoom-in-95 duration-200" onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between px-6 py-4 border-b border-border-light dark:border-border-dark">
                <h3 className="font-bold text-lg text-text-main dark:text-white">创建新 Agent</h3>
                <button onClick={() => setIsCreateModalOpen(false)} className="text-text-secondary hover:text-text-main dark:text-gray-400 dark:hover:text-white"><span className="material-symbols-outlined">close</span></button>
              </div>
              <div className="p-6 flex flex-col gap-4">
                 <div>
                    <label className="block text-sm font-medium text-text-main dark:text-white mb-1">Agent 名称</label>
                    <input 
                      className="w-full rounded-lg border-border-light bg-background-light px-3 py-2 text-sm focus:border-primary focus:ring-primary dark:border-border-dark dark:bg-background-dark dark:text-white" 
                      placeholder="例如：论文阅读助手"
                      value={formData.name || ''}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                    />
                 </div>
                 <div>
                    <label className="block text-sm font-medium text-text-main dark:text-white mb-1">描述</label>
                    <textarea 
                      className="w-full rounded-lg border-border-light bg-background-light px-3 py-2 text-sm focus:border-primary focus:ring-primary dark:border-border-dark dark:bg-background-dark dark:text-white resize-none" 
                      placeholder="简要描述该 Agent 的功能..."
                      rows={2}
                      value={formData.description || ''}
                      onChange={e => setFormData({...formData, description: e.target.value})}
                    ></textarea>
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                   <div>
                      <label className="block text-sm font-medium text-text-main dark:text-white mb-1">图标</label>
                      <select 
                        className="w-full rounded-lg border-border-light bg-background-light px-3 py-2 text-sm focus:border-primary focus:ring-primary dark:border-border-dark dark:bg-background-dark dark:text-white"
                        value={formData.icon || 'smart_toy'}
                        onChange={e => setFormData({...formData, icon: e.target.value})}
                      >
                         <option value="smart_toy">机器人 (Smart Toy)</option>
                         <option value="science">科学 (Science)</option>
                         <option value="code">代码 (Code)</option>
                         <option value="translate">翻译 (Translate)</option>
                         <option value="edit_note">写作 (Write)</option>
                      </select>
                   </div>
                   <div>
                      <label className="block text-sm font-medium text-text-main dark:text-white mb-1">颜色主题</label>
                      <select 
                        className="w-full rounded-lg border-border-light bg-background-light px-3 py-2 text-sm focus:border-primary focus:ring-primary dark:border-border-dark dark:bg-background-dark dark:text-white"
                        value={formData.colorTheme || 'blue'}
                        onChange={e => setFormData({...formData, colorTheme: e.target.value as any})}
                      >
                         <option value="blue">蓝色 (Blue)</option>
                         <option value="indigo">靛青 (Indigo)</option>
                         <option value="orange">橙色 (Orange)</option>
                         <option value="teal">青色 (Teal)</option>
                         <option value="pink">粉色 (Pink)</option>
                      </select>
                   </div>
                 </div>
              </div>
              <div className="bg-background-light/50 dark:bg-white/5 px-6 py-4 border-t border-border-light dark:border-border-dark flex justify-end gap-3">
                 <button onClick={() => setIsCreateModalOpen(false)} className="px-4 py-2 rounded-lg text-sm font-medium text-text-secondary hover:bg-background-light dark:hover:bg-white/10 dark:text-gray-400 transition-colors">取消</button>
                 <button onClick={handleCreateAgent} className="px-4 py-2 rounded-lg bg-primary text-sm font-medium text-white hover:bg-primary-dark shadow-sm">立即创建</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};