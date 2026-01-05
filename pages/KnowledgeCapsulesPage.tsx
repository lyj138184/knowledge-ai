import React, { useState, useMemo } from 'react';
import { Header } from '../components/Header';

// --- Types ---
interface RelatedLink {
  id: string;
  title: string;
  url: string;
  subtitle: string;
  icon: string;
  colorClass: string;
}

interface Capsule {
  id: string;
  title: string;
  content: string; // HTML string for simplicity in this demo
  aiSummary: string;
  tags: string[];
  createdAt: string;
  lastReviewedAt?: string;
  reviewFrequency: 'daily' | 'weekly' | 'monthly';
  status: 'active' | 'archived'; // For 'To Review' filter logic
  relatedLinks: RelatedLink[];
}

// --- Mock Data ---
const MOCK_CAPSULES: Capsule[] = [
  {
    id: '1',
    title: 'React Hooks 最佳实践总结',
    content: `
      <p>在现代 React 开发中，Hooks 已经成为逻辑复用的标准。以下是在项目实战中总结的一些关键点。</p>
      <h3 class="text-xl font-bold mt-6 mb-3">1. useEffect 的依赖管理</h3>
      <p>永远不要对 React 撒谎。如果你在 effect 中使用了一个变量，它必须在依赖数组中。如果这导致了无限循环，通常意味着你需要重构 effect 内部的逻辑，或者使用 <code class="rounded bg-gray-100 px-1 py-0.5 text-sm dark:bg-gray-800">useCallback</code> 包裹函数。</p>
      <ul class="list-disc list-inside space-y-2 pl-4 border-l-2 border-border-light dark:border-border-dark mt-4">
        <li>移除不必要的对象依赖</li>
        <li>使用 primitive 类型作为依赖</li>
        <li>分离关注点，不要在一个 effect 做太多事</li>
      </ul>
      <h3 class="text-xl font-bold mt-6 mb-3">2. useMemo 与 useCallback</h3>
      <p>并不是所有计算都需要缓存。过度优化会带来代码复杂度的提升和微小的性能开销。只有在进行昂贵计算或作为子组件 props 且子组件使用了 React.memo 时才考虑使用。</p>
    `,
    aiSummary: '本胶囊总结了 React 18 中 Hooks 的核心使用原则，重点强调了依赖项数组的正确配置、useMemo 在昂贵计算中的应用，以及何时应该提取自定义 Hook 来复用逻辑。',
    tags: ['前端开发', 'React'],
    createdAt: '2023-10-24',
    lastReviewedAt: '2023-10-24',
    reviewFrequency: 'weekly',
    status: 'active',
    relatedLinks: [
      { id: 'l1', title: 'React_Official_Docs_v18.pdf', url: '#', subtitle: 'Page 45-50', icon: 'picture_as_pdf', colorClass: 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400' },
      { id: 'l2', title: 'Overreacted Blog: A Complete Guide to useEffect', url: '#', subtitle: 'overreacted.io', icon: 'public', colorClass: 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400' }
    ]
  },
  {
    id: '2',
    title: 'Q4 产品发布会筹备清单',
    content: `
      <p>发布会定于 12 月 15 日举行，以下是关键路径上的待办事项：</p>
      <ul class="list-disc list-inside mt-4">
        <li><strong>场地：</strong> 已确认主会场，需跟进餐饮服务 (Deadline: 11/30)</li>
        <li><strong>演示文稿：</strong> Keynote 初稿已完成，需设计团队美化 (Deadline: 12/05)</li>
        <li><strong>媒体邀请：</strong> 邀请函已发送，确认名单中 (Deadline: 12/10)</li>
      </ul>
    `,
    aiSummary: 'Q4 发布会筹备概览，涵盖场地、物料、媒体三个核心维度的进度追踪与截止日期提醒。',
    tags: ['项目管理', '待办事项'],
    createdAt: '2023-11-20',
    reviewFrequency: 'daily',
    status: 'active',
    relatedLinks: []
  },
  {
    id: '3',
    title: 'SaaS 定价策略研究笔记',
    content: `
      <p>分析了竞品A和竞品B的定价模型，PLG（Product-Led Growth）模式下的分层策略优势明显。</p>
      <p>关键发现：</p>
      <ol class="list-decimal list-inside mt-2">
        <li>免费增值模式能显著降低获客成本（CAC）。</li>
        <li>企业级功能的溢价空间主要在于安全性和合规性。</li>
      </ol>
    `,
    aiSummary: '关于 SaaS 产品定价策略的市场调研笔记，对比了竞品并分析了 PLG 模式的优势。',
    tags: ['市场调研', 'SaaS'],
    createdAt: '2023-11-15',
    reviewFrequency: 'monthly',
    status: 'active',
    relatedLinks: []
  }
];

export const KnowledgeCapsulesPage: React.FC = () => {
  // --- State ---
  const [capsules, setCapsules] = useState<Capsule[]>(MOCK_CAPSULES);
  const [selectedId, setSelectedId] = useState<string | null>(MOCK_CAPSULES[0].id);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'recent' | 'review'>('all');
  
  // Edit Mode State
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<Partial<Capsule>>({});
  const [newTagInput, setNewTagInput] = useState('');

  // --- Derived State ---
  const filteredCapsules = useMemo(() => {
    let result = capsules;

    // Filter by type
    if (filterType === 'review') {
      // Mock logic: randomly select some or check dates (omitted for brevity)
      result = result.filter(c => c.status === 'active'); 
    } else if (filterType === 'recent') {
       result = [...result].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }

    // Filter by search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(c => 
        c.title.toLowerCase().includes(q) || 
        c.tags.some(t => t.toLowerCase().includes(q))
      );
    }

    return result;
  }, [capsules, filterType, searchQuery]);

  const selectedCapsule = useMemo(() => 
    capsules.find(c => c.id === selectedId) || null
  , [capsules, selectedId]);

  // --- Handlers ---

  const handleSelect = (id: string) => {
    if (isEditing) {
      if (confirm('当前有未保存的更改，确定要离开吗？')) {
        setIsEditing(false);
        setSelectedId(id);
      }
    } else {
      setSelectedId(id);
    }
  };

  const handleCreateNew = () => {
    const newId = Date.now().toString();
    const newCapsule: Capsule = {
      id: newId,
      title: '未命名知识胶囊',
      content: '<p>在此输入您的笔记内容...</p>',
      aiSummary: 'AI 摘要将在您保存内容后自动生成。',
      tags: [],
      createdAt: new Date().toISOString().split('T')[0],
      reviewFrequency: 'weekly',
      status: 'active',
      relatedLinks: []
    };
    setCapsules([newCapsule, ...capsules]);
    setSelectedId(newId);
    // Enter edit mode immediately
    setEditForm(newCapsule);
    setIsEditing(true);
  };

  const handleDelete = () => {
    if (!selectedId) return;
    if (confirm('确定要删除这个胶囊吗？')) {
      setCapsules(prev => prev.filter(c => c.id !== selectedId));
      setSelectedId(null);
      setIsEditing(false);
    }
  };

  const handleReview = () => {
    if (!selectedId) return;
    const now = new Date().toISOString().split('T')[0];
    setCapsules(prev => prev.map(c => c.id === selectedId ? { ...c, lastReviewedAt: now } : c));
    alert('已标记为今日回顾完成！');
  };

  const handleStartEdit = () => {
    if (!selectedCapsule) return;
    setEditForm({ ...selectedCapsule });
    setIsEditing(true);
  };

  const handleSave = () => {
    if (!selectedId) return;
    setCapsules(prev => prev.map(c => c.id === selectedId ? { ...c, ...editForm } as Capsule : c));
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditForm({});
  };

  const handleAddTag = () => {
    if (newTagInput.trim() && editForm.tags) {
      if (!editForm.tags.includes(newTagInput.trim())) {
        setEditForm(prev => ({ ...prev, tags: [...(prev.tags || []), newTagInput.trim()] }));
      }
      setNewTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setEditForm(prev => ({ ...prev, tags: (prev.tags || []).filter(t => t !== tagToRemove) }));
  };

  return (
    <div className="flex flex-col h-full bg-background-light dark:bg-background-dark overflow-hidden font-display">
      <Header breadcrumbs={['知识胶囊']} showSearch={false} />
      
      <div className="flex flex-1 overflow-hidden">
        {/* Inner Sidebar for Capsules List */}
        <div className="w-full md:w-80 lg:w-96 flex flex-col border-r border-border-light bg-surface-light dark:bg-surface-dark dark:border-border-dark z-0">
          <div className="p-4 border-b border-border-light dark:border-border-dark flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-lg font-bold text-text-main dark:text-white">我的胶囊</h2>
              <button 
                onClick={handleCreateNew}
                className="flex items-center gap-1 rounded-md bg-primary px-3 py-1.5 text-xs font-bold text-white hover:bg-primary-dark transition-colors shadow-sm"
              >
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
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
              <button 
                onClick={() => setFilterType('all')}
                className={`shrink-0 rounded-full border px-3 py-1 text-xs font-medium transition-colors ${filterType === 'all' ? 'border-primary bg-primary/10 text-primary' : 'border-border-light bg-surface-light text-text-secondary hover:border-primary hover:text-primary dark:border-border-dark dark:bg-surface-dark'}`}
              >
                全部
              </button>
              <button 
                onClick={() => setFilterType('review')}
                className={`shrink-0 rounded-full border px-3 py-1 text-xs font-medium transition-colors ${filterType === 'review' ? 'border-primary bg-primary/10 text-primary' : 'border-border-light bg-surface-light text-text-secondary hover:border-primary hover:text-primary dark:border-border-dark dark:bg-surface-dark'}`}
              >
                待回顾
              </button>
              <button 
                onClick={() => setFilterType('recent')}
                className={`shrink-0 rounded-full border px-3 py-1 text-xs font-medium transition-colors ${filterType === 'recent' ? 'border-primary bg-primary/10 text-primary' : 'border-border-light bg-surface-light text-text-secondary hover:border-primary hover:text-primary dark:border-border-dark dark:bg-surface-dark'}`}
              >
                最近
              </button>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-3 space-y-2 custom-scrollbar">
            {filteredCapsules.length === 0 && (
              <div className="flex flex-col items-center justify-center py-10 text-text-secondary opacity-60">
                <span className="material-symbols-outlined text-4xl mb-2">inbox</span>
                <p className="text-sm">没有找到相关胶囊</p>
              </div>
            )}
            {filteredCapsules.map(capsule => (
              <div 
                key={capsule.id}
                onClick={() => handleSelect(capsule.id)}
                className={`group relative flex cursor-pointer flex-col gap-2 rounded-xl border p-4 transition-all ${
                  selectedId === capsule.id 
                    ? 'border-primary/30 bg-primary/5 dark:border-primary/20 dark:bg-primary/10' 
                    : 'border-transparent bg-background-light hover:border-border-light hover:shadow-sm dark:bg-background-dark dark:hover:border-border-dark'
                }`}
              >
                <div className="flex items-start justify-between">
                  <h3 className="font-bold text-text-main dark:text-white text-sm line-clamp-1">{capsule.title}</h3>
                  <span className="text-[10px] text-text-secondary dark:text-gray-400 whitespace-nowrap">{capsule.createdAt}</span>
                </div>
                <div 
                  className="text-xs text-text-secondary dark:text-gray-400 line-clamp-2"
                  dangerouslySetInnerHTML={{ __html: capsule.content.replace(/<[^>]+>/g, '').slice(0, 100) }}
                />
                <div className="flex items-center gap-2 mt-1 flex-wrap">
                  {capsule.tags.slice(0, 2).map(tag => (
                    <span key={tag} className="inline-flex items-center rounded bg-gray-100 px-1.5 py-0.5 text-[10px] font-medium text-gray-700 dark:bg-gray-800 dark:text-gray-300">#{tag}</span>
                  ))}
                  {capsule.tags.length > 2 && <span className="text-[10px] text-text-secondary">+{capsule.tags.length - 2}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Capsule Detail View */}
        <div className="flex-1 flex flex-col bg-background-light/50 dark:bg-background-dark overflow-hidden relative">
          {!selectedCapsule ? (
             <div className="flex-1 flex flex-col items-center justify-center text-text-secondary opacity-50">
                <span className="material-symbols-outlined text-[64px] mb-4">lightbulb</span>
                <p>选择或创建一个胶囊以开始学习</p>
             </div>
          ) : (
            <>
              {/* Header */}
              <div className="h-14 flex items-center justify-between px-6 border-b border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark shrink-0">
                <div className="flex items-center gap-3 text-sm text-text-secondary dark:text-gray-400">
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[18px]">calendar_today</span>
                    创建于 {selectedCapsule.createdAt}
                  </span>
                  <span className="h-4 w-px bg-border-light dark:bg-border-dark"></span>
                  <span className="flex items-center gap-1 text-primary">
                    <span className="material-symbols-outlined text-[18px]">update</span>
                    {selectedCapsule.lastReviewedAt ? `上次回顾: ${selectedCapsule.lastReviewedAt}` : '从未回顾'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {!isEditing && (
                    <>
                      <button onClick={handleReview} className="flex items-center justify-center rounded-lg p-2 text-text-secondary hover:bg-background-light hover:text-green-600 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-green-400 transition-colors" title="标记为已回顾">
                        <span className="material-symbols-outlined">check_circle</span>
                      </button>
                      <button onClick={handleDelete} className="flex items-center justify-center rounded-lg p-2 text-text-secondary hover:bg-background-light hover:text-red-600 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-red-400 transition-colors" title="删除">
                        <span className="material-symbols-outlined">delete</span>
                      </button>
                      <button onClick={handleStartEdit} className="ml-2 rounded-lg bg-primary/10 px-4 py-1.5 text-sm font-bold text-primary hover:bg-primary/20 transition-colors">
                        编辑
                      </button>
                    </>
                  )}
                  {isEditing && (
                    <>
                      <button onClick={handleCancelEdit} className="rounded-lg px-4 py-1.5 text-sm font-medium text-text-secondary hover:bg-background-light dark:text-gray-400 dark:hover:bg-white/5 transition-colors">
                        取消
                      </button>
                      <button onClick={handleSave} className="ml-2 rounded-lg bg-primary px-4 py-1.5 text-sm font-bold text-white hover:bg-primary-dark transition-colors shadow-sm">
                        保存
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto custom-scrollbar">
                <div className="mx-auto max-w-4xl p-8 pb-32">
                  {/* Title & Tags */}
                  <div className="mb-8">
                    {isEditing ? (
                      <input
                        className="w-full bg-transparent text-3xl font-bold text-text-main dark:text-white border-b border-dashed border-border-light dark:border-border-dark focus:border-primary focus:outline-none mb-4 pb-1"
                        value={editForm.title}
                        onChange={(e) => setEditForm({...editForm, title: e.target.value})}
                        placeholder="输入标题..."
                      />
                    ) : (
                      <h1 className="font-display text-3xl font-bold text-text-main dark:text-white mb-4">{selectedCapsule.title}</h1>
                    )}

                    <div className="flex flex-wrap gap-2 items-center">
                      {(isEditing ? editForm.tags : selectedCapsule.tags)?.map(tag => (
                        <span key={tag} className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700 dark:border-blue-800 dark:bg-blue-900/20 dark:text-blue-400">
                          #{tag}
                          {isEditing && (
                            <button onClick={() => removeTag(tag)} className="ml-1 text-blue-400 hover:text-blue-700 dark:hover:text-blue-200"><span className="material-symbols-outlined text-[12px]">close</span></button>
                          )}
                        </span>
                      ))}
                      {isEditing && (
                        <div className="flex items-center gap-1">
                          <input 
                            className="bg-transparent text-xs border-b border-border-light dark:border-border-dark focus:border-primary outline-none w-20 px-1 py-0.5"
                            placeholder="新标签..."
                            value={newTagInput}
                            onChange={(e) => setNewTagInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleAddTag()}
                          />
                          <button onClick={handleAddTag} className="inline-flex items-center rounded-full border border-gray-200 bg-gray-50 px-2.5 py-0.5 text-xs font-medium text-gray-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 hover:bg-gray-100">
                            <span className="material-symbols-outlined text-[14px]">add</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="prose prose-slate dark:prose-invert max-w-none">
                    {/* AI Summary Block */}
                    <div className="rounded-xl border border-blue-100 bg-blue-50/50 p-4 dark:border-blue-900/30 dark:bg-blue-900/10 mb-6">
                      <div className="flex gap-2">
                        <span className="material-symbols-outlined text-blue-600 dark:text-blue-400">auto_awesome</span>
                        <div>
                          <p className="text-sm font-bold text-blue-900 dark:text-blue-200 mb-1">AI 摘要</p>
                          <p className="text-sm text-blue-800 dark:text-blue-300">
                            {selectedCapsule.aiSummary}
                          </p>
                        </div>
                      </div>
                    </div>

                    {isEditing ? (
                      <textarea
                        className="w-full h-[500px] bg-background-light dark:bg-white/5 border border-border-light dark:border-border-dark rounded-lg p-4 font-mono text-sm leading-relaxed focus:border-primary focus:ring-1 focus:ring-primary outline-none resize-none"
                        value={editForm.content}
                        onChange={(e) => setEditForm({...editForm, content: e.target.value})}
                        placeholder="支持 HTML 格式..."
                      />
                    ) : (
                      <div dangerouslySetInnerHTML={{ __html: selectedCapsule.content }} />
                    )}
                  </div>

                  {/* Related Links */}
                  {selectedCapsule.relatedLinks && selectedCapsule.relatedLinks.length > 0 && (
                    <div className="mt-10 border-t border-border-light dark:border-border-dark pt-6">
                      <h3 className="text-sm font-bold uppercase tracking-wider text-text-secondary dark:text-gray-400 mb-4 flex items-center gap-2">
                        <span className="material-symbols-outlined text-[18px]">link</span> 关联来源
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {selectedCapsule.relatedLinks.map(link => (
                          <a key={link.id} className="flex items-center gap-3 rounded-lg border border-border-light bg-surface-light p-3 hover:border-primary hover:shadow-sm dark:border-border-dark dark:bg-surface-dark transition-all" href={link.url}>
                            <div className={`flex size-8 shrink-0 items-center justify-center rounded ${link.colorClass}`}>
                              <span className="material-symbols-outlined text-[20px]">{link.icon}</span>
                            </div>
                            <div className="overflow-hidden">
                              <p className="truncate text-sm font-medium text-text-main dark:text-white">{link.title}</p>
                              <p className="text-xs text-text-secondary dark:text-gray-400">{link.subtitle}</p>
                            </div>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Smart Suggestions (Static Demo) */}
                  {!isEditing && (
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
                            <p className="text-sm font-bold text-text-main dark:text-white">延伸阅读: Redux Toolkit</p>
                            <p className="text-xs text-text-secondary dark:text-gray-400 mt-1">相关度 85% • 建议作为下一阶段学习内容</p>
                          </div>
                          <button className="ml-auto text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/50 p-1 rounded" title="添加到待办">
                            <span className="material-symbols-outlined text-[18px]">add</span>
                          </button>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white/60 dark:bg-white/5 border border-transparent hover:border-indigo-200 dark:hover:border-indigo-700 cursor-pointer transition-colors">
                          <div className="mt-1 size-2 rounded-full bg-indigo-500"></div>
                          <div>
                            <p className="text-sm font-bold text-text-main dark:text-white">概念关联: TypeScript 高级类型</p>
                            <p className="text-xs text-text-secondary dark:text-gray-400 mt-1">相关度 72%</p>
                          </div>
                          <button className="ml-auto text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/50 p-1 rounded" title="添加到待办">
                            <span className="material-symbols-outlined text-[18px]">add</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};