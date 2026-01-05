import React, { useState, useEffect, useRef } from 'react';
import { Header } from '../components/Header';

const SECTIONS = [
  { id: 'account', label: '账户设置', icon: 'person' },
  { id: 'appearance', label: '外观设置', icon: 'palette' },
  { id: 'billing', label: '成本中心', icon: 'payments' }, // New Section
  { id: 'kb', label: '知识库设置', icon: 'database' },
  { id: 'ai', label: 'AI 模型与能力', icon: 'psychology' },
  { id: 'integrations', label: '数据源集成', icon: 'hub' },
  { id: 'agents', label: 'Agent 管理', icon: 'smart_toy' },
  { id: 'notifications', label: '通知设置', icon: 'notifications' },
];

// --- Types for AI Settings ---
interface LLMModel {
  id: string;
  name: string;
}

interface LLMProvider {
  id: string;
  name: string;
  type: 'openai' | 'anthropic' | 'gemini' | 'custom';
  baseUrl: string;
  apiKey: string;
  models: LLMModel[];
  isExpanded?: boolean; // UI state
}

export const SettingsPage: React.FC = () => {
  // --- State Management ---
  const [loading, setLoading] = useState(false);
  const [activeSection, setActiveSection] = useState('account');
  
  // Profile
  const [profile, setProfile] = useState({
    nickname: 'Alex Morgan',
    email: 'alex.morgan@example.com',
    phone: '+86 138****0000'
  });

  // Security
  const [security, setSecurity] = useState({
    twoFactor: false,
  });

  // Appearance
  const [appearance, setAppearance] = useState({
    theme: 'system', // 'light' | 'dark' | 'system'
    fontSize: 50,
    language: 'zh-CN'
  });

  // Billing & Cost Center State
  const [billing, setBilling] = useState({
    budget: 50.00,
    alertThreshold: 80, // percentage
    enableAlerts: true,
    currency: 'USD'
  });

  // Mock Usage Data
  const usageStats = {
    currentMonthCost: 12.45,
    projectedCost: 18.20,
    totalTokens: 1245000,
    lastMonthCost: 15.30,
    breakdown: [
      { id: 1, name: '科研助手 (GPT-4o)', tokens: '450k', type: 'Agent', cost: 8.50, trend: 'up' },
      { id: 2, name: '智能问答 (GPT-3.5)', tokens: '680k', type: 'Chat', cost: 1.20, trend: 'stable' },
      { id: 3, name: '知识库索引 (Embedding)', tokens: '115k', type: 'System', cost: 0.45, trend: 'down' },
      { id: 4, name: '代码审查员 (Claude 3.5)', tokens: '0', type: 'Agent', cost: 0.00, trend: 'stable' },
      { id: 5, name: '多语言翻译 (Gemini Pro)', tokens: '50k', type: 'Agent', cost: 2.30, trend: 'up' },
    ]
  };

  // Knowledge Base
  const [kbSettings, setKbSettings] = useState({
    chunkingStrategy: 'recursive',
    chunkSize: 512,
    overlap: 50,
    indexingFreq: 'realtime'
  });

  // AI Config - Providers
  const [providers, setProviders] = useState<LLMProvider[]>([
    {
      id: 'openai',
      name: 'OpenAI',
      type: 'openai',
      baseUrl: 'https://api.openai.com/v1',
      apiKey: 'sk-xxxxxxxxxxxxxxxxxxxxxxxx',
      models: [
        { id: 'gpt-4o', name: 'GPT-4o' },
        { id: 'gpt-4-turbo', name: 'GPT-4 Turbo' },
        { id: 'gpt-3.5-turbo', name: 'GPT-3.5 Turbo' }
      ],
      isExpanded: true
    },
    {
      id: 'gemini',
      name: 'Google Gemini',
      type: 'gemini',
      baseUrl: 'https://generativelanguage.googleapis.com',
      apiKey: '',
      models: [
        { id: 'gemini-1.5-pro', name: 'Gemini 1.5 Pro' },
        { id: 'gemini-pro', name: 'Gemini Pro' }
      ],
      isExpanded: false
    }
  ]);

  // AI Config - Active Settings
  const [aiConfig, setAiConfig] = useState({
    activeProviderId: 'openai',
    activeModelId: 'gpt-4o',
    temperature: 0.7,
    maxTokens: 2048,
    embeddingModel: 'openai-small',
    topK: 5,
    rerank: true
  });

  // Temporary state for adding new model tag
  const [newModelInput, setNewModelInput] = useState<{providerId: string, value: string} | null>(null);

  // Notifications
  const [notifications, setNotifications] = useState({
    inApp: true,
    email: false
  });

  // Scroll Spy Logic
  const contentRef = useRef<HTMLDivElement>(null);
  const isScrollingRef = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (isScrollingRef.current) return;
        
        // Find the visible section that is closest to the top
        const visibleSections = entries.filter(e => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        
        if (visibleSections.length > 0) {
          setActiveSection(visibleSections[0].target.id);
        }
      },
      { root: contentRef.current, threshold: 0.2, rootMargin: '-10% 0px -50% 0px' }
    );

    SECTIONS.forEach(section => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // --- Handlers ---

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    isScrollingRef.current = true;
    const element = document.getElementById(id);
    if (element && contentRef.current) {
      // Calculate offset to handle header or padding if necessary, mainly scrollIntoView is enough
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      
      // Reset scrolling lock after animation
      setTimeout(() => {
        isScrollingRef.current = false;
      }, 500);
    }
  };

  const handleSave = () => {
    setLoading(true);
    // Simulate API request
    setTimeout(() => {
      setLoading(false);
      // In a real app, use a toast notification here
      alert("设置已成功保存！");
    }, 1000);
  };

  const handleThemeChange = (newTheme: string) => {
    setAppearance(prev => ({ ...prev, theme: newTheme }));
    
    // Apply theme immediately for demo purposes
    const html = document.documentElement;
    if (newTheme === 'dark') {
      html.classList.add('dark');
      html.classList.remove('light');
    } else if (newTheme === 'light') {
      html.classList.remove('dark');
      html.classList.add('light');
    } else {
      // System
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        html.classList.add('dark');
        html.classList.remove('light');
      } else {
        html.classList.remove('dark');
        html.classList.add('light');
      }
    }
  };

  // --- AI Provider Handlers ---

  const handleAddProvider = () => {
    const newProvider: LLMProvider = {
      id: Date.now().toString(),
      name: 'Custom Provider',
      type: 'custom',
      baseUrl: 'https://api.example.com/v1',
      apiKey: '',
      models: [],
      isExpanded: true
    };
    setProviders([...providers, newProvider]);
  };

  const handleRemoveProvider = (id: string) => {
    if (confirm('确定要删除此提供商配置吗？')) {
      setProviders(providers.filter(p => p.id !== id));
      if (aiConfig.activeProviderId === id && providers.length > 1) {
        // Fallback to first available
        const fallback = providers.find(p => p.id !== id);
        if (fallback) {
          setAiConfig(prev => ({ ...prev, activeProviderId: fallback.id, activeModelId: fallback.models[0]?.id || '' }));
        }
      }
    }
  };

  const handleUpdateProvider = (id: string, updates: Partial<LLMProvider>) => {
    setProviders(providers.map(p => p.id === id ? { ...p, ...updates } : p));
  };

  const handleAddModel = (providerId: string) => {
    if (!newModelInput || newModelInput.providerId !== providerId || !newModelInput.value.trim()) return;
    
    const modelName = newModelInput.value.trim();
    setProviders(providers.map(p => {
      if (p.id === providerId) {
        return {
          ...p,
          models: [...p.models, { id: modelName, name: modelName }]
        };
      }
      return p;
    }));
    setNewModelInput(null);
  };

  const handleRemoveModel = (providerId: string, modelId: string) => {
    setProviders(providers.map(p => {
      if (p.id === providerId) {
        return {
          ...p,
          models: p.models.filter(m => m.id !== modelId)
        };
      }
      return p;
    }));
  };

  const getActiveProviderModels = () => {
    const provider = providers.find(p => p.id === aiConfig.activeProviderId);
    return provider ? provider.models : [];
  };

  // Helper for Cost Center progress bar color
  const getBudgetColor = (spent: number, total: number) => {
    const percentage = (spent / total) * 100;
    if (percentage > 90) return 'bg-red-500';
    if (percentage > 70) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div className="flex flex-col h-full bg-background-light dark:bg-background-dark overflow-hidden font-display">
      <Header breadcrumbs={['设置']} showSearch={false} />
      
      <div className="flex flex-1 overflow-hidden relative">
        {/* Settings Sidebar Navigation (Desktop) */}
        <aside className="hidden lg:flex w-64 flex-col border-r border-border-light bg-surface-light/50 dark:border-border-dark dark:bg-surface-dark/50 overflow-y-auto custom-scrollbar pt-6 pb-20">
          <div className="px-6 mb-4">
             <h2 className="text-xs font-bold text-text-secondary uppercase tracking-wider dark:text-gray-500">通用</h2>
          </div>
          <nav className="flex flex-col px-4 gap-1">
            {SECTIONS.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all text-left ${
                  activeSection === section.id
                    ? 'bg-primary text-white shadow-md shadow-primary/20'
                    : 'text-text-secondary hover:bg-background-light hover:text-text-main dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-white'
                }`}
              >
                <span className={`material-symbols-outlined text-[20px] ${activeSection === section.id ? 'text-white' : ''}`}>{section.icon}</span>
                {section.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content Area */}
        <div ref={contentRef} className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-10 custom-scrollbar scroll-smooth">
          <div className="mx-auto flex max-w-[850px] flex-col gap-8 pb-20">
            <div className="flex flex-col gap-2">
              <h2 className="font-display text-3xl font-bold text-text-main dark:text-white">设置</h2>
              <p className="text-text-secondary dark:text-gray-400">全面管理您的账户、外观、知识库与AI能力。</p>
            </div>

            {/* Account Settings */}
            <section id="account" className="scroll-mt-6 rounded-xl border border-border-light bg-surface-light shadow-sm dark:border-border-dark dark:bg-surface-dark transition-all duration-300">
              <div className="border-b border-border-light px-6 py-4 dark:border-border-dark flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">person</span>
                <h3 className="font-display text-lg font-bold text-text-main dark:text-white">账户设置</h3>
              </div>
              <div className="p-6 flex flex-col gap-8">
                <div className="flex flex-col md:flex-row gap-8 items-start">
                  <div className="relative group">
                    <div className="size-24 rounded-full bg-cover bg-center ring-4 ring-background-light dark:ring-background-dark" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAUhxcQRsnPKLIXZ_1841L4B_AiNekaCFDozENBoHrVlqwXQQQtwt5EW_v9nyStZV3eSUEr_jtbAiq8syYgzaPYuJqoy85CtcJea0qoGIU-BUyx7EEttNj4VPwvm94_Jfytlk9gZQDisKRvRE989EN9TYE6TwQqnutGCPDQ-Ez_wg7Qs36n90-fclZCYUDyInCDTiW7HsRO5OHdFLt0UkWRNfZzjCrqirLsgvr8E8JBZCW4FpipfKow8vYZ3vtjYvFNNao6hs5DA9U')" }}></div>
                    <button className="absolute bottom-0 right-0 flex size-8 items-center justify-center rounded-full bg-primary text-white shadow-sm hover:bg-primary-dark transition-colors">
                      <span className="material-symbols-outlined text-[16px]">photo_camera</span>
                    </button>
                  </div>
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-text-main dark:text-white">昵称</label>
                      <input 
                        className="w-full rounded-lg border-border-light bg-background-light px-4 py-2.5 text-sm text-text-main placeholder-text-secondary focus:border-primary focus:ring-primary dark:border-border-dark dark:bg-background-dark dark:text-white" 
                        type="text" 
                        value={profile.nickname}
                        onChange={(e) => setProfile({...profile, nickname: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium text-text-main dark:text-white">邮箱地址</label>
                      <div className="relative">
                        <input 
                          className="w-full rounded-lg border-border-light bg-background-light px-4 py-2.5 text-sm text-text-secondary cursor-not-allowed opacity-75 dark:border-border-dark dark:bg-background-dark dark:text-gray-400" 
                          disabled 
                          type="email" 
                          value={profile.email}
                        />
                        <span className="absolute right-3 top-2.5 text-xs font-medium text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400 px-2 py-0.5 rounded-full">已验证</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="border-t border-border-light pt-6 dark:border-border-dark">
                  <h4 className="mb-4 text-base font-semibold text-text-main dark:text-white">密码与安全</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-text-main dark:text-white">登录密码</p>
                        <p className="text-xs text-text-secondary dark:text-gray-400">建议定期更换高强度密码</p>
                      </div>
                      <button className="text-sm font-medium text-primary hover:text-primary-dark">修改密码</button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-text-main dark:text-white">两步验证 (2FA)</p>
                        <p className="text-xs text-text-secondary dark:text-gray-400">为您的账户添加额外的安全层</p>
                      </div>
                      <label className="relative inline-flex cursor-pointer items-center">
                        <input 
                          className="peer sr-only" 
                          type="checkbox" 
                          checked={security.twoFactor}
                          onChange={(e) => setSecurity({...security, twoFactor: e.target.checked})}
                        />
                        <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 dark:bg-gray-700 dark:border-gray-600"></div>
                      </label>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-text-main dark:text-white">手机绑定</p>
                        <p className="text-xs text-text-secondary dark:text-gray-400">已绑定: {profile.phone}</p>
                      </div>
                      <button className="text-sm font-medium text-primary hover:text-primary-dark">更换号码</button>
                    </div>
                  </div>
                </div>
                <div className="border-t border-border-light pt-6 dark:border-border-dark">
                  <h4 className="mb-4 text-base font-semibold text-text-main dark:text-white">订阅与账单</h4>
                  <div className="flex items-center justify-between rounded-lg bg-background-light p-4 dark:bg-background-dark border border-border-light dark:border-border-dark">
                    <div className="flex items-center gap-4">
                      <div className="flex size-10 items-center justify-center rounded-full bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400">
                        <span className="material-symbols-outlined">workspace_premium</span>
                      </div>
                      <div>
                        <p className="font-bold text-text-main dark:text-white">个人专业版 Plan</p>
                        <p className="text-xs text-text-secondary dark:text-gray-400">下次扣费日期: 2023年12月15日</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <button className="text-sm text-text-secondary hover:text-text-main dark:text-gray-400 dark:hover:text-white">历史账单</button>
                      <button className="rounded bg-surface-light px-3 py-1.5 text-sm font-medium text-text-main shadow-sm ring-1 ring-inset ring-border-light hover:bg-gray-5 dark:bg-surface-dark dark:text-white dark:ring-border-dark dark:hover:bg-white/5">管理订阅</button>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Appearance Settings */}
            <section id="appearance" className="scroll-mt-6 rounded-xl border border-border-light bg-surface-light shadow-sm dark:border-border-dark dark:bg-surface-dark transition-all duration-300">
              <div className="border-b border-border-light px-6 py-4 dark:border-border-dark flex items-center gap-2">
                <span className="material-symbols-outlined text-purple-500">palette</span>
                <h3 className="font-display text-lg font-bold text-text-main dark:text-white">外观设置</h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                  <div className="flex flex-col gap-3">
                    <label className="text-sm font-medium text-text-main dark:text-white">主题偏好</label>
                    <div className="flex gap-4">
                      {['light', 'dark', 'system'].map((themeOption) => (
                        <label key={themeOption} className="cursor-pointer flex-1">
                          <input 
                            className="peer sr-only" 
                            name="theme" 
                            type="radio" 
                            value={themeOption} 
                            checked={appearance.theme === themeOption}
                            onChange={() => handleThemeChange(themeOption)}
                          />
                          <div className="flex w-full flex-col gap-2 rounded-xl border border-border-light p-2 peer-checked:border-primary peer-checked:bg-primary/5 hover:bg-background-light dark:border-border-dark dark:peer-checked:border-primary dark:hover:bg-white/5 transition-all">
                            <div className={`h-12 w-full rounded-lg border ${
                              themeOption === 'light' ? 'bg-[#f6f7f8] border-gray-200' :
                              themeOption === 'dark' ? 'bg-[#101922] border-gray-700' :
                              'bg-gradient-to-r from-[#f6f7f8] to-[#101922] border-gray-300 dark:border-gray-600'
                            }`}></div>
                            <span className="text-center text-xs font-medium text-text-main dark:text-white">
                              {themeOption === 'light' ? '浅色' : themeOption === 'dark' ? '深色' : '跟随系统'}
                            </span>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-3">
                      <div className="flex justify-between">
                        <label className="text-sm font-medium text-text-main dark:text-white">界面字体大小</label>
                        <span className="text-xs text-text-secondary dark:text-gray-400">{appearance.fontSize}%</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-xs text-text-secondary dark:text-gray-400">A</span>
                        <input 
                          className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-border-light accent-primary dark:bg-border-dark" 
                          max="100" min="0" 
                          type="range" 
                          value={appearance.fontSize}
                          onChange={(e) => setAppearance({...appearance, fontSize: Number(e.target.value)})}
                        />
                        <span className="text-lg text-text-secondary dark:text-gray-400">A</span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-medium text-text-main dark:text-white">显示语言</label>
                      <select 
                        className="w-full rounded-lg border-border-light bg-background-light px-4 py-2.5 text-sm text-text-main focus:border-primary focus:ring-primary dark:border-border-dark dark:bg-background-dark dark:text-white" 
                        value={appearance.language}
                        onChange={(e) => setAppearance({...appearance, language: e.target.value})}
                      >
                        <option value="zh-CN">简体中文 (Chinese Simplified)</option>
                        <option value="en-US">English (US)</option>
                        <option value="ja-JP">日本語 (Japanese)</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            
            {/* Cost Center / Billing Settings */}
            <section id="billing" className="scroll-mt-6 rounded-xl border border-border-light bg-surface-light shadow-sm dark:border-border-dark dark:bg-surface-dark transition-all duration-300">
               <div className="border-b border-border-light px-6 py-4 dark:border-border-dark flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-green-500">payments</span>
                  <h3 className="font-display text-lg font-bold text-text-main dark:text-white">成本中心</h3>
                </div>
                <span className="text-xs font-medium text-text-secondary dark:text-gray-400">计费周期: 每月 1 号</span>
              </div>
              <div className="p-6 flex flex-col gap-8">
                 {/* Overview Cards */}
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="rounded-xl bg-background-light p-4 dark:bg-background-dark border border-border-light dark:border-border-dark">
                       <p className="text-xs font-medium text-text-secondary dark:text-gray-400 mb-1">本月累计消费</p>
                       <div className="flex items-end gap-2">
                          <span className="text-2xl font-bold text-text-main dark:text-white">${usageStats.currentMonthCost.toFixed(2)}</span>
                          <span className="text-xs text-text-secondary dark:text-gray-500 mb-1">/ ${billing.budget}</span>
                       </div>
                       <div className="mt-3 h-1.5 w-full bg-gray-200 rounded-full dark:bg-gray-700 overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${getBudgetColor(usageStats.currentMonthCost, billing.budget)}`} 
                            style={{ width: `${Math.min((usageStats.currentMonthCost / billing.budget) * 100, 100)}%` }}
                          ></div>
                       </div>
                    </div>
                    <div className="rounded-xl bg-background-light p-4 dark:bg-background-dark border border-border-light dark:border-border-dark">
                       <p className="text-xs font-medium text-text-secondary dark:text-gray-400 mb-1">预估本月总消费</p>
                       <div className="flex items-end gap-2">
                          <span className="text-2xl font-bold text-text-main dark:text-white">${usageStats.projectedCost.toFixed(2)}</span>
                          <span className={`text-xs mb-1 font-medium ${usageStats.projectedCost > billing.budget ? 'text-red-500' : 'text-green-500'}`}>
                             {usageStats.projectedCost > billing.budget ? '超支预警' : '预算内'}
                          </span>
                       </div>
                       <p className="mt-2 text-[10px] text-text-secondary dark:text-gray-500">基于当前日均使用量测算</p>
                    </div>
                    <div className="rounded-xl bg-background-light p-4 dark:bg-background-dark border border-border-light dark:border-border-dark">
                       <p className="text-xs font-medium text-text-secondary dark:text-gray-400 mb-1">Token 总消耗量</p>
                       <div className="flex items-end gap-2">
                          <span className="text-2xl font-bold text-text-main dark:text-white">{(usageStats.totalTokens / 1000000).toFixed(2)}M</span>
                          <span className="text-xs text-text-secondary dark:text-gray-500 mb-1">Tokens</span>
                       </div>
                       <p className="mt-2 text-[10px] text-text-secondary dark:text-gray-500">较上月同期增长 12%</p>
                    </div>
                 </div>

                 {/* Budget Controls */}
                 <div>
                    <h4 className="mb-4 text-sm font-bold text-text-main dark:text-white">预算控制与报警</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                       <div className="space-y-4">
                          <div>
                            <label className="block text-xs font-medium text-text-secondary dark:text-gray-400 mb-1.5">月度预算金额 (USD)</label>
                            <div className="relative">
                               <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary">$</span>
                               <input 
                                 type="number" 
                                 className="w-full rounded-lg border-border-light bg-background-light pl-7 pr-3 py-2 text-sm text-text-main focus:border-primary focus:ring-primary dark:border-border-dark dark:bg-background-dark dark:text-white"
                                 value={billing.budget}
                                 onChange={(e) => setBilling({...billing, budget: parseFloat(e.target.value)})}
                               />
                            </div>
                          </div>
                          <div>
                             <div className="flex justify-between mb-1.5">
                                <label className="block text-xs font-medium text-text-secondary dark:text-gray-400">使用量报警阈值</label>
                                <span className="text-xs font-bold text-primary">{billing.alertThreshold}%</span>
                             </div>
                             <input 
                               type="range" 
                               min="50" max="100" step="5"
                               className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-border-light accent-primary dark:bg-border-dark" 
                               value={billing.alertThreshold}
                               onChange={(e) => setBilling({...billing, alertThreshold: parseInt(e.target.value)})}
                             />
                             <p className="mt-1 text-[10px] text-text-secondary dark:text-gray-500">当消费达到预算的 {billing.alertThreshold}% (${(billing.budget * billing.alertThreshold / 100).toFixed(2)}) 时触发报警。</p>
                          </div>
                       </div>
                       <div className="flex flex-col justify-center gap-4 rounded-xl border border-dashed border-border-light bg-background-light/50 p-4 dark:border-border-dark dark:bg-white/5">
                          <div className="flex items-center justify-between">
                             <div>
                                <p className="text-sm font-medium text-text-main dark:text-white">邮件报警通知</p>
                                <p className="text-xs text-text-secondary dark:text-gray-400">发送至 {profile.email}</p>
                             </div>
                             <label className="relative inline-flex cursor-pointer items-center">
                                <input 
                                  className="peer sr-only" 
                                  type="checkbox" 
                                  checked={billing.enableAlerts}
                                  onChange={(e) => setBilling({...billing, enableAlerts: e.target.checked})}
                                />
                                <div className="peer h-5 w-9 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-4 after:w-4 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 dark:bg-gray-700 dark:border-gray-600"></div>
                             </label>
                          </div>
                          <div className="flex items-center justify-between">
                             <div>
                                <p className="text-sm font-medium text-text-main dark:text-white">自动熔断机制</p>
                                <p className="text-xs text-text-secondary dark:text-gray-400">超预算时暂停 API 调用 (推荐)</p>
                             </div>
                             <label className="relative inline-flex cursor-pointer items-center">
                                <input className="peer sr-only" type="checkbox" />
                                <div className="peer h-5 w-9 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-4 after:w-4 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 dark:bg-gray-700 dark:border-gray-600"></div>
                             </label>
                          </div>
                       </div>
                    </div>
                 </div>

                 {/* Usage Breakdown Table */}
                 <div>
                    <h4 className="mb-4 text-sm font-bold text-text-main dark:text-white">Token 消耗明细 (Top 5)</h4>
                    <div className="overflow-hidden rounded-lg border border-border-light bg-background-light dark:border-border-dark dark:bg-background-dark">
                       <table className="w-full text-left text-xs">
                          <thead className="bg-surface-light text-text-secondary dark:bg-surface-dark dark:text-gray-400">
                             <tr>
                                <th className="px-4 py-3 font-medium">来源 / 任务</th>
                                <th className="px-4 py-3 font-medium">类型</th>
                                <th className="px-4 py-3 font-medium">Token 用量</th>
                                <th className="px-4 py-3 font-medium">预估成本</th>
                                <th className="px-4 py-3 font-medium text-right">趋势</th>
                             </tr>
                          </thead>
                          <tbody className="divide-y divide-border-light dark:divide-border-dark">
                             {usageStats.breakdown.map((item) => (
                                <tr key={item.id} className="group hover:bg-surface-light dark:hover:bg-white/5">
                                   <td className="px-4 py-3 font-medium text-text-main dark:text-white">{item.name}</td>
                                   <td className="px-4 py-3 text-text-secondary dark:text-gray-400">
                                      <span className="inline-flex items-center rounded bg-gray-100 px-1.5 py-0.5 text-[10px] text-gray-600 dark:bg-white/10 dark:text-gray-300">{item.type}</span>
                                   </td>
                                   <td className="px-4 py-3 font-mono text-text-secondary dark:text-gray-400">{item.tokens}</td>
                                   <td className="px-4 py-3 font-bold text-text-main dark:text-white">${item.cost.toFixed(2)}</td>
                                   <td className="px-4 py-3 text-right">
                                      {item.trend === 'up' && <span className="material-symbols-outlined text-[16px] text-red-500">trending_up</span>}
                                      {item.trend === 'down' && <span className="material-symbols-outlined text-[16px] text-green-500">trending_down</span>}
                                      {item.trend === 'stable' && <span className="material-symbols-outlined text-[16px] text-gray-400">trending_flat</span>}
                                   </td>
                                </tr>
                             ))}
                          </tbody>
                       </table>
                    </div>
                 </div>
              </div>
            </section>

            {/* Knowledge Base Settings */}
            <section id="kb" className="scroll-mt-6 rounded-xl border border-border-light bg-surface-light shadow-sm dark:border-border-dark dark:bg-surface-dark transition-all duration-300">
              <div className="border-b border-border-light px-6 py-4 dark:border-border-dark flex items-center gap-2">
                <span className="material-symbols-outlined text-green-600">database</span>
                <h3 className="font-display text-lg font-bold text-text-main dark:text-white">知识库设置</h3>
              </div>
              <div className="flex flex-col gap-6 p-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-text-main dark:text-white">默认切块策略 (Chunking)</label>
                    <select 
                      className="w-full rounded-lg border-border-light bg-background-light px-4 py-2.5 text-sm text-text-main focus:border-primary focus:ring-primary dark:border-border-dark dark:bg-background-dark dark:text-white"
                      value={kbSettings.chunkingStrategy}
                      onChange={(e) => setKbSettings({...kbSettings, chunkingStrategy: e.target.value})}
                    >
                      <option value="recursive">递归字符切分 (Recursive Character)</option>
                      <option value="fixed">固定字符长度切分 (Fixed Size)</option>
                      <option value="markdown">Markdown段落切分</option>
                    </select>
                    <p className="mt-1 text-xs text-text-secondary dark:text-gray-400">决定新文档被导入时的默认处理方式。</p>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <label className="block text-sm font-medium text-text-main dark:text-white">默认切块大小 (Tokens)</label>
                        <span className="text-xs font-bold text-primary">{kbSettings.chunkSize}</span>
                      </div>
                      <input 
                        className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-border-light accent-primary dark:bg-border-dark" 
                        max="2048" min="128" step="128" type="range" 
                        value={kbSettings.chunkSize}
                        onChange={(e) => setKbSettings({...kbSettings, chunkSize: Number(e.target.value)})}
                      />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <label className="block text-sm font-medium text-text-main dark:text-white">默认重叠窗口 (Tokens)</label>
                        <span className="text-xs font-bold text-primary">{kbSettings.overlap}</span>
                      </div>
                      <input 
                        className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-border-light accent-primary dark:bg-border-dark" 
                        max="200" min="0" step="10" type="range" 
                        value={kbSettings.overlap}
                        onChange={(e) => setKbSettings({...kbSettings, overlap: Number(e.target.value)})}
                      />
                    </div>
                  </div>
                </div>
                <div className="border-t border-border-light pt-6 dark:border-border-dark grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-text-main dark:text-white">索引频率</label>
                    <div className="flex flex-wrap gap-2">
                      {['realtime', 'hourly', 'daily'].map(freq => (
                        <button 
                          key={freq}
                          onClick={() => setKbSettings({...kbSettings, indexingFreq: freq})}
                          className={`rounded-lg border px-4 py-2 text-sm font-medium transition-all ${
                            kbSettings.indexingFreq === freq
                              ? 'border-primary bg-primary/10 text-primary ring-1 ring-primary'
                              : 'border-border-light text-text-secondary hover:bg-background-light dark:border-border-dark dark:text-gray-400 dark:hover:bg-white/5'
                          }`}
                        >
                          {freq === 'realtime' ? '实时' : freq === 'hourly' ? '每小时' : '每天'}
                        </button>
                      ))}
                    </div>
                    <p className="mt-2 text-xs text-text-secondary dark:text-gray-400">控制系统自动重新索引文档的频率。</p>
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-text-main dark:text-white">知识库维护</label>
                    <div className="rounded-lg border border-border-light p-3 dark:border-border-dark bg-background-light dark:bg-background-dark flex items-center justify-between">
                      <div className="text-sm text-text-secondary dark:text-gray-400">
                        清理无效引用和重复索引
                      </div>
                      <button className="text-xs font-bold text-red-600 hover:underline dark:text-red-400">立即清理</button>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* AI Model Settings */}
            <section id="ai" className="scroll-mt-6 rounded-xl border border-border-light bg-surface-light shadow-sm dark:border-border-dark dark:bg-surface-dark transition-all duration-300">
              <div className="border-b border-border-light px-6 py-4 dark:border-border-dark flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-blue-500">psychology</span>
                  <h3 className="font-display text-lg font-bold text-text-main dark:text-white">AI 模型与能力配置</h3>
                </div>
                <button 
                  onClick={handleAddProvider}
                  className="flex items-center gap-1 rounded bg-primary/10 px-2 py-1 text-xs font-bold text-primary hover:bg-primary/20 transition-colors"
                >
                  <span className="material-symbols-outlined text-[14px]">add</span>
                  添加提供商
                </button>
              </div>
              <div className="flex flex-col gap-8 p-6">
                
                {/* Global Defaults */}
                <div>
                  <h4 className="mb-4 text-sm font-bold uppercase tracking-wide text-text-secondary dark:text-gray-500">默认生成设置</h4>
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="space-y-4">
                      <div>
                        <label className="mb-2 block text-sm font-medium text-text-main dark:text-white">默认提供商</label>
                        <select 
                          className="w-full rounded-lg border-border-light bg-background-light px-4 py-2.5 text-sm text-text-main focus:border-primary focus:ring-primary dark:border-border-dark dark:bg-background-dark dark:text-white"
                          value={aiConfig.activeProviderId}
                          onChange={(e) => setAiConfig({...aiConfig, activeProviderId: e.target.value, activeModelId: ''})}
                        >
                          {providers.map(p => (
                            <option key={p.id} value={p.id}>{p.name}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="mb-2 block text-sm font-medium text-text-main dark:text-white">默认模型</label>
                        <select 
                          className="w-full rounded-lg border-border-light bg-background-light px-4 py-2.5 text-sm text-text-main focus:border-primary focus:ring-primary dark:border-border-dark dark:bg-background-dark dark:text-white"
                          value={aiConfig.activeModelId}
                          onChange={(e) => setAiConfig({...aiConfig, activeModelId: e.target.value})}
                        >
                           {getActiveProviderModels().length > 0 ? (
                             getActiveProviderModels().map(m => (
                               <option key={m.id} value={m.id}>{m.name}</option>
                             ))
                           ) : (
                             <option value="" disabled>该提供商暂无配置模型</option>
                           )}
                        </select>
                      </div>
                    </div>
                    <div className="space-y-6">
                      <div>
                        <div className="mb-2 flex items-center justify-between">
                          <label className="text-sm font-medium text-text-main dark:text-white">温度 (Temperature): <span className="text-primary font-bold">{aiConfig.temperature}</span></label>
                          <span className="text-xs text-text-secondary dark:text-gray-400">精确 &lt;—&gt; 创意</span>
                        </div>
                        <input 
                          className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-border-light accent-primary dark:bg-border-dark" 
                          max="1" min="0" step="0.1" type="range" 
                          value={aiConfig.temperature}
                          onChange={(e) => setAiConfig({...aiConfig, temperature: Number(e.target.value)})}
                        />
                      </div>
                      <div>
                        <div className="mb-2 flex items-center justify-between">
                          <label className="text-sm font-medium text-text-main dark:text-white">最大 Tokens: <span className="text-primary font-bold">{aiConfig.maxTokens}</span></label>
                        </div>
                        <input 
                          className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-border-light accent-primary dark:bg-border-dark" 
                          max="8192" min="256" step="256" type="range" 
                          value={aiConfig.maxTokens}
                          onChange={(e) => setAiConfig({...aiConfig, maxTokens: Number(e.target.value)})}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-border-light dark:border-border-dark"></div>

                {/* Providers Management */}
                <div>
                  <h4 className="mb-4 text-sm font-bold uppercase tracking-wide text-text-secondary dark:text-gray-500">LLM 提供商管理</h4>
                  <div className="flex flex-col gap-4">
                    {providers.map(provider => (
                      <div key={provider.id} className="rounded-xl border border-border-light bg-background-light overflow-hidden transition-all dark:border-border-dark dark:bg-background-dark">
                         {/* Provider Header */}
                         <div 
                           className="flex items-center justify-between px-4 py-3 bg-surface-light dark:bg-surface-dark cursor-pointer hover:bg-gray-50 dark:hover:bg-white/5"
                           onClick={() => handleUpdateProvider(provider.id, { isExpanded: !provider.isExpanded })}
                         >
                            <div className="flex items-center gap-3">
                              <span className={`material-symbols-outlined text-[20px] transition-transform ${provider.isExpanded ? 'rotate-90' : ''}`}>chevron_right</span>
                              <div className="flex flex-col">
                                 <span className="text-sm font-bold text-text-main dark:text-white">{provider.name}</span>
                                 <span className="text-xs text-text-secondary dark:text-gray-400 truncate max-w-[200px]">{provider.baseUrl}</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                               <div className="flex items-center gap-1 bg-gray-100 px-2 py-0.5 rounded text-[10px] text-gray-600 dark:bg-white/10 dark:text-gray-300">
                                  <span>{provider.models.length} 模型</span>
                               </div>
                               <button 
                                 onClick={(e) => { e.stopPropagation(); handleRemoveProvider(provider.id); }}
                                 className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                               >
                                 <span className="material-symbols-outlined text-[18px]">delete</span>
                               </button>
                            </div>
                         </div>
                         
                         {/* Provider Details (Collapsible) */}
                         {provider.isExpanded && (
                           <div className="p-4 border-t border-border-light dark:border-border-dark flex flex-col gap-4 animate-in slide-in-from-top-2 duration-200">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                   <label className="mb-1 block text-xs font-medium text-text-secondary dark:text-gray-400">提供商名称</label>
                                   <input 
                                     className="w-full rounded border-border-light bg-surface-light px-3 py-2 text-sm text-text-main focus:border-primary focus:ring-primary dark:border-border-dark dark:bg-surface-dark dark:text-white"
                                     value={provider.name}
                                     onChange={(e) => handleUpdateProvider(provider.id, { name: e.target.value })}
                                   />
                                </div>
                                <div>
                                   <label className="mb-1 block text-xs font-medium text-text-secondary dark:text-gray-400">Base URL</label>
                                   <input 
                                     className="w-full rounded border-border-light bg-surface-light px-3 py-2 text-sm text-text-main font-mono focus:border-primary focus:ring-primary dark:border-border-dark dark:bg-surface-dark dark:text-white"
                                     value={provider.baseUrl}
                                     onChange={(e) => handleUpdateProvider(provider.id, { baseUrl: e.target.value })}
                                     placeholder="https://api.example.com/v1"
                                   />
                                </div>
                              </div>
                              <div>
                                 <label className="mb-1 block text-xs font-medium text-text-secondary dark:text-gray-400">API Key</label>
                                 <div className="relative">
                                    <input 
                                      className="w-full rounded border-border-light bg-surface-light px-3 py-2 text-sm text-text-main font-mono focus:border-primary focus:ring-primary dark:border-border-dark dark:bg-surface-dark dark:text-white"
                                      type="password"
                                      value={provider.apiKey}
                                      onChange={(e) => handleUpdateProvider(provider.id, { apiKey: e.target.value })}
                                      placeholder="sk-..."
                                    />
                                 </div>
                              </div>
                              <div>
                                 <label className="mb-2 block text-xs font-medium text-text-secondary dark:text-gray-400">可用模型列表</label>
                                 <div className="flex flex-wrap gap-2 rounded-lg border border-border-light bg-surface-light p-3 dark:border-border-dark dark:bg-surface-dark min-h-[60px]">
                                    {provider.models.map(model => (
                                      <div key={model.id} className="flex items-center gap-1 rounded bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                                        <span>{model.name}</span>
                                        <button 
                                          onClick={() => handleRemoveModel(provider.id, model.id)}
                                          className="flex size-4 items-center justify-center rounded-full hover:bg-blue-200 dark:hover:bg-blue-800"
                                        >
                                          <span className="material-symbols-outlined text-[12px]">close</span>
                                        </button>
                                      </div>
                                    ))}
                                    
                                    {newModelInput?.providerId === provider.id ? (
                                      <div className="flex items-center gap-1">
                                         <input 
                                           autoFocus
                                           className="h-6 w-24 rounded border border-primary px-1 text-xs focus:outline-none dark:bg-surface-dark dark:text-white"
                                           value={newModelInput.value}
                                           onChange={(e) => setNewModelInput({ ...newModelInput, value: e.target.value })}
                                           onKeyDown={(e) => {
                                             if (e.key === 'Enter') handleAddModel(provider.id);
                                             if (e.key === 'Escape') setNewModelInput(null);
                                           }}
                                           onBlur={() => handleAddModel(provider.id)}
                                         />
                                      </div>
                                    ) : (
                                      <button 
                                        onClick={() => setNewModelInput({ providerId: provider.id, value: '' })}
                                        className="flex items-center gap-1 rounded border border-dashed border-gray-300 px-2 py-1 text-xs text-gray-500 hover:border-primary hover:text-primary dark:border-gray-600 dark:text-gray-400 dark:hover:border-primary"
                                      >
                                        <span className="material-symbols-outlined text-[12px]">add</span>
                                        添加模型
                                      </button>
                                    )}
                                 </div>
                              </div>
                           </div>
                         )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Additional AI Settings (Embeddings, Rerank) - Kept simplified for brevity but functional */}
                 <div className="border-t border-border-light dark:border-border-dark pt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <h4 className="mb-4 text-sm font-bold uppercase tracking-wide text-text-secondary dark:text-gray-500">嵌入与检索</h4>
                    <label className="mb-2 block text-sm font-medium text-text-main dark:text-white">嵌入模型</label>
                    <select 
                      className="w-full rounded-lg border-border-light bg-background-light px-4 py-2.5 text-sm text-text-main focus:border-primary focus:ring-primary dark:border-border-dark dark:bg-background-dark dark:text-white" 
                      value={aiConfig.embeddingModel}
                      onChange={(e) => setAiConfig({...aiConfig, embeddingModel: e.target.value})}
                    >
                      <option value="openai-small">OpenAI text-embedding-3-small</option>
                      <option value="openai-large">OpenAI text-embedding-3-large</option>
                      <option value="cohere">Cohere Embed v3</option>
                    </select>
                  </div>
                  <div>
                    <h4 className="mb-4 text-sm font-bold uppercase tracking-wide text-text-secondary dark:text-gray-500">高级选项</h4>
                    <div className="flex items-center justify-between">
                        <div className="flex flex-col">
                          <label className="text-sm font-medium text-text-main dark:text-white">启用重排序 (Rerank)</label>
                          <span className="text-xs text-text-secondary dark:text-gray-400">提高结果相关性</span>
                        </div>
                        <label className="relative inline-flex cursor-pointer items-center">
                          <input 
                            className="peer sr-only" 
                            type="checkbox" 
                            checked={aiConfig.rerank}
                            onChange={(e) => setAiConfig({...aiConfig, rerank: e.target.checked})}
                          />
                          <div className="peer h-5 w-9 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-4 after:w-4 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 dark:bg-gray-700 dark:border-gray-600"></div>
                        </label>
                      </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Data Source Integration Settings */}
            <section id="integrations" className="scroll-mt-6 rounded-xl border border-border-light bg-surface-light shadow-sm dark:border-border-dark dark:bg-surface-dark transition-all duration-300">
              <div className="border-b border-border-light px-6 py-4 dark:border-border-dark flex items-center gap-2">
                <span className="material-symbols-outlined text-orange-500">hub</span>
                <h3 className="font-display text-lg font-bold text-text-main dark:text-white">数据源集成设置</h3>
              </div>
              <div className="flex flex-col gap-6 p-6">
                <div>
                  <h4 className="mb-4 text-sm font-bold uppercase tracking-wide text-text-secondary dark:text-gray-500">MCP 协议配置</h4>
                  <div className="rounded-lg bg-background-light p-4 dark:bg-background-dark border border-border-light dark:border-border-dark">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3 mb-4">
                      <div className="md:col-span-2">
                        <label className="mb-1 block text-xs font-medium text-text-secondary dark:text-gray-400">Server Endpoint</label>
                        <input className="w-full rounded border-border-light bg-surface-light px-3 py-2 text-sm text-text-main focus:border-primary focus:ring-primary dark:border-border-dark dark:bg-surface-dark dark:text-white" defaultValue="ws://localhost:8080/mcp"/>
                      </div>
                      <div>
                        <label className="mb-1 block text-xs font-medium text-text-secondary dark:text-gray-400">Port</label>
                        <input className="w-full rounded border-border-light bg-surface-light px-3 py-2 text-sm text-text-main focus:border-primary focus:ring-primary dark:border-border-dark dark:bg-surface-dark dark:text-white" defaultValue="8080"/>
                      </div>
                    </div>
                    <div className="mb-4">
                      <label className="mb-1 block text-xs font-medium text-text-secondary dark:text-gray-400">Client Secret</label>
                      <input className="w-full rounded border-border-light bg-surface-light px-3 py-2 text-sm text-text-main focus:border-primary focus:ring-primary dark:border-border-dark dark:bg-surface-dark dark:text-white" type="password" defaultValue="****************"/>
                    </div>
                    <div className="flex items-center gap-2">
                      <label className="text-xs font-medium text-text-secondary dark:text-gray-400">允许的应用:</label>
                      <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10 dark:bg-blue-400/10 dark:text-blue-400 dark:ring-blue-400/30">VS Code</span>
                      <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10 dark:bg-blue-400/10 dark:text-blue-400 dark:ring-blue-400/30">Obsidian</span>
                      <button className="text-xs text-primary hover:underline">+ 添加</button>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-bold uppercase tracking-wide text-text-secondary dark:text-gray-500">已连接数据源</h4>
                    <button className="text-sm text-primary hover:underline">管理所有</button>
                  </div>
                  <div className="flex gap-4 overflow-x-auto pb-2 custom-scrollbar">
                    <div className="flex min-w-[140px] items-center gap-3 rounded-lg border border-border-light bg-surface-light p-3 shadow-sm dark:border-border-dark dark:bg-surface-dark">
                      <img alt="Notion" className="size-6" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCz4TrDPx6__3fRG4jy0DB5YaYS9viySxSxtPMJ_DTR0R-WAxtB52H6zpDxbjZJVjuItkzfUner7UVJdfUnUzXKWc0rkRdjsjgQMbA4omST_WnsR0eQTnaymO-npvlhWLEHhPdihSpMZFx0w5miBlfJkvbSnGQg268wOMUebCCEXnDDX9iGRLCfGoyJwgXl6Mg6PT9kLMw-kcMOfc6tgJqjJrETw7qos1Uih1l6p5IXd-tjE0wk7uCFJi256JG7IPK98qZl5MPK75s"/>
                      <span className="text-sm font-medium text-text-main dark:text-white">Notion</span>
                    </div>
                    <div className="flex min-w-[140px] items-center gap-3 rounded-lg border border-border-light bg-surface-light p-3 shadow-sm dark:border-border-dark dark:bg-surface-dark">
                      <img alt="GitHub" className="size-6 dark:invert" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA7nZO8HvCROwGbmT5clGD_l5renFEnHDUlNs7hgfUuGkd4gMS_b1Ff1yXdoWiZshrVPZ84Ch45cKqQ-PIoK0kfs2WnnYvksRgcrVPDKGRIEJXSNNClPHlR7JKaZhPVWxLrS_gXGZfHvKgYnmAQ8iUiALECkSa6DYsqTOqs2WVZWFk_uP5H6w85wxefBfKO934DBlAmY7tQQnwFexKgfe1HFsqqSXi1D2r53RGjn60CK_ftTYphxKHU_engrfrgYG1CjEvpgwOqv6A"/>
                      <span className="text-sm font-medium text-text-main dark:text-white">GitHub</span>
                    </div>
                    <div className="flex min-w-[140px] items-center justify-center gap-2 rounded-lg border border-dashed border-border-light bg-background-light p-3 hover:bg-surface-light cursor-pointer dark:border-border-dark dark:bg-background-dark dark:hover:bg-surface-dark">
                      <span className="material-symbols-outlined text-text-secondary">add</span>
                      <span className="text-sm text-text-secondary">添加</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Agent Management Settings */}
            <section id="agents" className="scroll-mt-6 rounded-xl border border-border-light bg-surface-light shadow-sm dark:border-border-dark dark:bg-surface-dark transition-all duration-300">
              <div className="border-b border-border-light px-6 py-4 dark:border-border-dark flex items-center gap-2">
                <span className="material-symbols-outlined text-pink-500">smart_toy</span>
                <h3 className="font-display text-lg font-bold text-text-main dark:text-white">Agent 管理设置</h3>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="mb-2 block text-sm font-medium text-text-main dark:text-white">默认 Agent 运行模式</label>
                  <select className="w-full rounded-lg border-border-light bg-background-light px-4 py-2.5 text-sm text-text-main focus:border-primary focus:ring-primary dark:border-border-dark dark:bg-background-dark dark:text-white" defaultValue="manual">
                    <option value="manual">手动触发 (Manual)</option>
                    <option value="scheduled">定时任务 (Scheduled)</option>
                    <option value="event">事件驱动 (Event-driven)</option>
                  </select>
                  <p className="mt-1 text-xs text-text-secondary dark:text-gray-400">设置新创建 Agent 的默认激活方式。</p>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-text-main dark:text-white">默认数据访问权限</label>
                  <div className="flex flex-col gap-2">
                    <label className="flex items-center gap-2">
                      <input defaultChecked className="rounded border-gray-300 text-primary focus:ring-primary dark:border-gray-600 dark:bg-gray-700" type="checkbox"/>
                      <span className="text-sm text-text-main dark:text-white">只读访问知识库</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input className="rounded border-gray-300 text-primary focus:ring-primary dark:border-gray-600 dark:bg-gray-700" type="checkbox"/>
                      <span className="text-sm text-text-main dark:text-white">允许写入新文档</span>
                    </label>
                  </div>
                </div>
              </div>
            </section>

            {/* Notification Settings */}
            <section id="notifications" className="scroll-mt-6 rounded-xl border border-border-light bg-surface-light shadow-sm dark:border-border-dark dark:bg-surface-dark transition-all duration-300">
              <div className="border-b border-border-light px-6 py-4 dark:border-border-dark flex items-center gap-2">
                <span className="material-symbols-outlined text-yellow-500">notifications</span>
                <h3 className="font-display text-lg font-bold text-text-main dark:text-white">通知设置</h3>
              </div>
              <div className="divide-y divide-border-light px-6 dark:divide-border-dark">
                <div className="flex items-center justify-between py-4">
                  <div>
                    <p className="font-medium text-text-main dark:text-white">应用内通知</p>
                    <p className="text-xs text-text-secondary dark:text-gray-400">开启消息弹窗与提示音</p>
                  </div>
                  <label className="relative inline-flex cursor-pointer items-center">
                    <input 
                      className="peer sr-only" 
                      type="checkbox" 
                      checked={notifications.inApp}
                      onChange={(e) => setNotifications({...notifications, inApp: e.target.checked})}
                    />
                    <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 dark:bg-gray-700 dark:border-gray-600"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between py-4">
                  <div>
                    <p className="font-medium text-text-main dark:text-white">邮件通知</p>
                    <p className="text-xs text-text-secondary dark:text-gray-400">接收文档处理完成报告、Agent 运行报告</p>
                  </div>
                  <label className="relative inline-flex cursor-pointer items-center">
                    <input 
                      className="peer sr-only" 
                      type="checkbox" 
                      checked={notifications.email}
                      onChange={(e) => setNotifications({...notifications, email: e.target.checked})}
                    />
                    <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 dark:bg-gray-700 dark:border-gray-600"></div>
                  </label>
                </div>
              </div>
            </section>

            <div className="flex justify-end gap-4">
              <button 
                onClick={() => {
                  // Reset to defaults or reload page logic
                  if (confirm('确定要重置所有设置吗？未保存的更改将丢失。')) {
                    window.location.reload();
                  }
                }}
                className="rounded-lg border border-border-light bg-surface-light px-6 py-2.5 text-sm font-medium text-text-main hover:bg-background-light dark:border-border-dark dark:bg-surface-dark dark:text-white dark:hover:bg-white/5"
              >
                重置
              </button>
              <button 
                onClick={handleSave}
                disabled={loading}
                className="rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-white shadow-lg shadow-primary/30 transition-all hover:bg-primary-dark hover:shadow-primary/50 disabled:opacity-70 flex items-center gap-2"
              >
                {loading && <span className="material-symbols-outlined animate-spin text-[16px]">sync</span>}
                {loading ? '保存中...' : '保存更改'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};