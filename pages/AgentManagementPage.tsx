import React, { useState, useEffect, useRef, useMemo } from 'react';
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
  // Enhanced Configuration
  modelProvider: string;
  modelName: string;
  temperature: number;
  systemPrompt: string;
  tools: string[]; // IDs of enabled MCP tools
  sources: string[];
  runMode: 'manual' | 'scheduled' | 'event';
}

interface McpTool {
  id: string;
  name: string;
  description: string;
  icon: string;
  provider: 'Built-in' | 'MCP Server';
}

interface Log {
  id: string;
  time: string;
  level: 'INFO' | 'WARN' | 'ERROR';
  content: string;
}

// --- Workflow Types ---
type NodeType = 'trigger' | 'agent' | 'tool' | 'router' | 'end';

interface WorkflowNode {
  id: string;
  type: NodeType;
  label: string;
  x: number;
  y: number;
  agentId?: string; // If type is agent
  routerConfig?: { conditions: { label: string, expression: string }[] }; // If type is router
  description?: string;
  inputs: string[];
  outputs: string[];
}

interface WorkflowEdge {
  id: string;
  source: string;
  sourceHandle?: string;
  target: string;
  targetHandle?: string;
}

// --- Mock Data ---
const MCP_TOOLS: McpTool[] = [
  { id: 'google_search', name: 'Google Search', description: '联网搜索实时信息', icon: 'search', provider: 'MCP Server' },
  { id: 'calculator', name: 'Calculator', description: '执行数学计算', icon: 'calculate', provider: 'Built-in' },
  { id: 'github_api', name: 'GitHub Action', description: '读取仓库或提交 Issue', icon: 'code', provider: 'MCP Server' },
  { id: 'send_email', name: 'Send Email', description: '发送邮件通知', icon: 'mail', provider: 'MCP Server' },
  { id: 'database_query', name: 'SQL Query', description: '查询业务数据库', icon: 'database', provider: 'MCP Server' },
];

const LLM_MODELS = {
  openai: [{ id: 'gpt-4o', name: 'GPT-4o' }, { id: 'gpt-3.5-turbo', name: 'GPT-3.5 Turbo' }],
  anthropic: [{ id: 'claude-3-5-sonnet', name: 'Claude 3.5 Sonnet' }, { id: 'claude-3-opus', name: 'Claude 3 Opus' }],
  gemini: [{ id: 'gemini-1.5-pro', name: 'Gemini 1.5 Pro' }, { id: 'gemini-flash', name: 'Gemini Flash' }],
};

const MOCK_AGENTS: Agent[] = [
  {
    id: '1',
    name: '科研助手 Pro',
    description: '专注于分析学术论文 PDF，能够提取关键论点。',
    status: 'active',
    icon: 'science',
    colorTheme: 'indigo',
    createdAt: '2023-10-15',
    modelProvider: 'openai',
    modelName: 'gpt-4o',
    temperature: 0.2,
    systemPrompt: 'You are a helpful research assistant. Use the attached knowledge base to answer questions.',
    tools: ['calculator'],
    sources: ['notion'],
    runMode: 'manual'
  },
  {
    id: '2',
    name: '意图识别',
    description: '分析用户输入是否需要联网搜索。',
    status: 'active',
    icon: 'psychology',
    colorTheme: 'orange',
    createdAt: '2023-11-02',
    modelProvider: 'anthropic',
    modelName: 'claude-3-5-sonnet',
    temperature: 0,
    systemPrompt: 'Classify the user intent into: SEARCH, CHAT, or CODE.',
    tools: [],
    sources: [],
    runMode: 'event'
  },
  {
    id: '3',
    name: '多语言翻译官',
    description: '提供专业的中英互译服务。',
    status: 'active',
    icon: 'translate',
    colorTheme: 'teal',
    createdAt: '2023-09-20',
    modelProvider: 'gemini',
    modelName: 'gemini-1.5-pro',
    temperature: 0.5,
    systemPrompt: 'Translate text to the target language maintaining professional tone.',
    tools: [],
    sources: [],
    runMode: 'manual'
  }
];

const INITIAL_NODES: WorkflowNode[] = [
  { id: 'start', type: 'trigger', label: '用户输入', x: 50, y: 300, inputs: [], outputs: ['output'] },
  { id: 'node-1', type: 'agent', label: '意图识别', agentId: '2', x: 350, y: 300, description: '分析意图', inputs: ['input'], outputs: ['output'] },
  { 
    id: 'node-router', type: 'router', label: '路由判断', x: 650, y: 300, 
    routerConfig: { conditions: [{ label: 'Need Search', expression: 'intent == "SEARCH"' }, { label: 'Chat', expression: 'intent == "CHAT"' }] },
    inputs: ['input'], outputs: ['Need Search', 'Chat'] 
  },
  { id: 'node-2', type: 'tool', label: 'Google Search', x: 950, y: 150, description: '执行联网搜索', inputs: ['query'], outputs: ['results'] },
  { id: 'node-3', type: 'agent', label: '科研助手 Pro', agentId: '1', x: 950, y: 450, description: '基于内部知识库回答', inputs: ['context'], outputs: ['response'] },
  { id: 'end', type: 'end', label: '最终输出', x: 1300, y: 300, inputs: ['result'], outputs: [] },
];

const INITIAL_EDGES: WorkflowEdge[] = [
  { id: 'e1', source: 'start', target: 'node-1' },
  { id: 'e2', source: 'node-1', target: 'node-router' },
  { id: 'e3', source: 'node-router', sourceHandle: 'Need Search', target: 'node-2' },
  { id: 'e4', source: 'node-router', sourceHandle: 'Chat', target: 'node-3' },
  { id: 'e5', source: 'node-2', target: 'end' },
  { id: 'e6', source: 'node-3', target: 'end' },
];

const MOCK_LOGS: Log[] = [
  { id: 'l1', time: '10:42:05', level: 'INFO', content: 'Workflow started with input: "Apple stock price"' },
  { id: 'l2', time: '10:42:06', level: 'INFO', content: '[意图识别] Output: SEARCH' },
  { id: 'l3', time: '10:42:06', level: 'INFO', content: '[路由判断] Matched condition: Need Search' },
  { id: 'l4', time: '10:42:08', level: 'INFO', content: '[Google Search] Executing search query...' },
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

const getNodeStyles = (type: NodeType) => {
  switch (type) {
    case 'trigger': return { header: 'bg-emerald-500', body: 'border-emerald-200 dark:border-emerald-800', icon: 'play_arrow' };
    case 'agent': return { header: 'bg-blue-500', body: 'border-blue-200 dark:border-blue-800', icon: 'smart_toy' };
    case 'router': return { header: 'bg-orange-500', body: 'border-orange-200 dark:border-orange-800', icon: 'alt_route' };
    case 'tool': return { header: 'bg-purple-500', body: 'border-purple-200 dark:border-purple-800', icon: 'extension' };
    case 'end': return { header: 'bg-gray-600', body: 'border-gray-300 dark:border-gray-600', icon: 'flag' };
  }
};

export const AgentManagementPage: React.FC = () => {
  const [viewMode, setViewMode] = useState<'list' | 'canvas'>('list');
  const [agents, setAgents] = useState<Agent[]>(MOCK_AGENTS);
  
  // Drawer / Modal State
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [configTab, setConfigTab] = useState<'model' | 'tools' | 'prompt' | 'debug'>('model');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<Agent>>({});

  // Canvas State
  const [nodes, setNodes] = useState<WorkflowNode[]>(INITIAL_NODES);
  const [edges, setEdges] = useState<WorkflowEdge[]>(INITIAL_EDGES);
  const [isDragging, setIsDragging] = useState(false);
  const [dragNodeId, setDragNodeId] = useState<string | null>(null);
  const [canvasOffset, setCanvasOffset] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [lastMousePos, setLastMousePos] = useState({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLDivElement>(null);

  // Debug State
  const [debugInput, setDebugInput] = useState('');
  const [debugOutput, setDebugOutput] = useState('');
  const [isDebugRunning, setIsDebugRunning] = useState(false);

  // --- Common Handlers ---
  useEffect(() => {
    if (selectedAgent) setFormData(selectedAgent);
  }, [selectedAgent]);

  const handleOpenConfig = (agent: Agent, tab: typeof configTab = 'model') => {
    setSelectedAgent(agent);
    setConfigTab(tab);
    setIsConfigOpen(true);
  };

  const handleCloseConfig = () => {
    setIsConfigOpen(false);
    setTimeout(() => setSelectedAgent(null), 300);
  };

  const handleSaveConfig = () => {
    if (!selectedAgent) return;
    setAgents(prev => prev.map(a => a.id === selectedAgent.id ? { ...a, ...formData } as Agent : a));
    
    // Also update canvas nodes labels if name changed
    if (viewMode === 'canvas') {
       setNodes(prev => prev.map(n => {
         if (n.agentId === selectedAgent.id && formData.name) {
           return { ...n, label: formData.name };
         }
         return n;
       }));
    }
    
    setIsConfigOpen(false);
  };

  const handleToggleStatus = (e: React.MouseEvent, agentId: string) => {
    e.stopPropagation();
    setAgents(prev => prev.map(a => a.id === agentId ? { ...a, status: a.status === 'active' ? 'inactive' : 'active' } : a));
    if (selectedAgent?.id === agentId) {
       setSelectedAgent(prev => prev ? { ...prev, status: prev.status === 'active' ? 'inactive' : 'active' } : null);
    }
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
      modelProvider: 'openai',
      modelName: 'gpt-4o',
      temperature: 0.7,
      systemPrompt: '',
      tools: [],
      sources: [],
      runMode: 'manual'
    };
    setAgents([...agents, newAgent]);
    setIsCreateModalOpen(false);
    setFormData({});
    handleOpenConfig(newAgent, 'model'); // Immediately open config
  };

  const openCreateModal = () => {
    setFormData({ icon: 'smart_toy', colorTheme: 'blue' });
    setIsCreateModalOpen(true);
  };

  const handleRunDebug = () => {
    setIsDebugRunning(true);
    setDebugOutput('');
    setTimeout(() => {
        setDebugOutput(`[模拟输出] 基于输入 "${debugInput}"\n\nAgent (${formData.name}) 使用模型 ${formData.modelName} 处理了请求。\n\n> 思考过程：\n1. 接收到用户输入。\n2. 检索知识库... 命中 2 条记录。\n3. 调用工具: ${formData.tools?.length ? formData.tools[0] : '无'}。\n\n最终回答：\n这是一个模拟的调试响应。您的 Agent 配置运转正常。`);
        setIsDebugRunning(false);
    }, 1500);
  };

  // --- Canvas Logic ---
  const handleCanvasWheel = (e: React.WheelEvent) => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault(); 
      const scaleFactor = 1.05;
      const direction = e.deltaY > 0 ? -1 : 1;
      let newZoom = zoom * (direction > 0 ? scaleFactor : 1 / scaleFactor);
      newZoom = Math.max(0.4, Math.min(newZoom, 2));
      setZoom(newZoom);
    } else {
      setCanvasOffset(prev => ({ x: prev.x - e.deltaX, y: prev.y - e.deltaY }));
    }
  };

  const handleCanvasMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).classList.contains('canvas-bg')) {
      setIsDragging(true);
      setDragNodeId(null);
      setLastMousePos({ x: e.clientX, y: e.clientY });
    }
  };

  const handleNodeMouseDown = (e: React.MouseEvent, nodeId: string) => {
    e.stopPropagation();
    setIsDragging(true);
    setDragNodeId(nodeId);
    setLastMousePos({ x: e.clientX, y: e.clientY });
  };

  const handleCanvasMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;

    const dx = e.clientX - lastMousePos.x;
    const dy = e.clientY - lastMousePos.y;
    setLastMousePos({ x: e.clientX, y: e.clientY });

    if (dragNodeId) {
      setNodes(prev => prev.map(n => 
        n.id === dragNodeId ? { ...n, x: n.x + dx / zoom, y: n.y + dy / zoom } : n
      ));
    } else {
      setCanvasOffset(prev => ({ x: prev.x + dx, y: prev.y + dy }));
    }
  };

  const handleCanvasMouseUp = () => {
    setIsDragging(false);
    setDragNodeId(null);
  };

  const handleNodeClick = (e: React.MouseEvent, node: WorkflowNode) => {
    if (isDragging || dragNodeId) return;
    if (node.type === 'agent' && node.agentId) {
      const agent = agents.find(a => a.id === node.agentId);
      if (agent) handleOpenConfig(agent);
    } else if (node.type === 'router') {
        alert("路由配置功能将在下一版本上线。");
    }
  };

  const handleAddNode = (type: NodeType) => {
    const id = `node-${Date.now()}`;
    const newNode: WorkflowNode = {
      id,
      type,
      label: type === 'agent' ? '新 Agent' : type === 'tool' ? '新工具' : type === 'router' ? '逻辑判断' : '新节点',
      x: -canvasOffset.x / zoom + 100 + Math.random() * 50,
      y: -canvasOffset.y / zoom + 100 + Math.random() * 50,
      inputs: ['in'],
      outputs: type === 'router' ? ['Yes', 'No'] : ['out']
    };
    
    if (type === 'agent') {
      newNode.agentId = agents[0].id;
      newNode.label = agents[0].name;
    }

    setNodes([...nodes, newNode]);
  };

  return (
    <div className="flex flex-col h-full bg-background-light dark:bg-background-dark overflow-hidden">
      <Header 
        breadcrumbs={['Agent 管理']} 
        showSearch={true}
        extraContent={
          <div className="flex items-center gap-3 mr-4">
             {viewMode === 'canvas' && (
                 <button className="flex items-center gap-1 rounded bg-green-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-green-700 shadow-sm transition-colors">
                    <span className="material-symbols-outlined text-[16px]">play_arrow</span>
                    运行工作流
                 </button>
             )}
             <div className="flex items-center bg-surface-light border border-border-light rounded-lg p-0.5 dark:bg-surface-dark dark:border-border-dark">
                <button 
                onClick={() => setViewMode('list')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all flex items-center gap-1 ${viewMode === 'list' ? 'bg-background-light text-text-main shadow-sm dark:bg-white/10 dark:text-white' : 'text-text-secondary hover:text-text-main dark:text-gray-400'}`}
                >
                <span className="material-symbols-outlined text-[16px]">grid_view</span>
                列表
                </button>
                <button 
                onClick={() => setViewMode('canvas')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all flex items-center gap-1 ${viewMode === 'canvas' ? 'bg-primary/10 text-primary shadow-sm dark:bg-primary/20' : 'text-text-secondary hover:text-text-main dark:text-gray-400'}`}
                >
                <span className="material-symbols-outlined text-[16px]">account_tree</span>
                画布
                </button>
             </div>
          </div>
        }
      />
      
      <div className="flex flex-1 overflow-hidden relative">
        {viewMode === 'list' ? (
          /* --- LIST VIEW --- */
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
                                  <span className="text-[10px] text-text-secondary bg-background-light px-1.5 py-0.5 rounded border border-border-light dark:bg-white/5 dark:border-border-dark dark:text-gray-400">
                                    {agent.modelName}
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
                        <div className="flex items-center gap-2 text-xs text-text-secondary dark:text-gray-500">
                           <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">extension</span> {agent.tools.length}</span>
                           <span>•</span>
                           <span>{agent.createdAt}</span>
                        </div>
                        <div className="flex gap-1 z-10">
                          <button 
                            onClick={(e) => { e.stopPropagation(); handleOpenConfig(agent, 'debug'); }}
                            className="flex items-center gap-1 rounded px-2 py-1 text-xs font-medium text-text-secondary hover:bg-background-light hover:text-text-main dark:hover:bg-white/5 dark:text-gray-400 transition-colors"
                          >
                            <span className="material-symbols-outlined text-[16px]">bug_report</span>
                            调试
                          </button>
                          <button 
                            onClick={(e) => { e.stopPropagation(); handleOpenConfig(agent, 'model'); }}
                            className="flex items-center gap-1 rounded px-2 py-1 text-xs font-medium text-primary hover:bg-primary/5 transition-colors"
                          >
                            <span className="material-symbols-outlined text-[16px]">edit</span>
                            配置
                          </button>
                        </div>
                      </div>
                      {agent.status === 'active' && <div className="absolute -right-0.5 top-1/2 h-8 w-1 -translate-y-1/2 rounded-l-full bg-primary opacity-50 group-hover:opacity-100 transition-opacity"></div>}
                    </div>
                  );
                })}
                
                <button onClick={openCreateModal} className="group flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-border-light bg-surface-light/50 p-5 transition-all hover:border-primary/50 hover:bg-background-light dark:border-border-dark dark:bg-surface-dark/50 dark:hover:border-primary/50 dark:hover:bg-white/5 min-h-[220px]">
                  <div className="flex size-14 items-center justify-center rounded-full bg-gray-50 text-gray-400 transition-colors group-hover:bg-primary/10 group-hover:text-primary dark:bg-white/5">
                    <span className="material-symbols-outlined text-[32px]">add</span>
                  </div>
                  <h3 className="mt-4 font-display text-lg font-bold text-text-secondary group-hover:text-primary dark:text-gray-400">创建新 Agent</h3>
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* --- CANVAS VIEW --- */
          <div className="flex flex-1 relative bg-background-light dark:bg-[#0d1218] overflow-hidden">
             {/* Left Toolbar (Palette) */}
             <div className="absolute left-4 top-4 bottom-4 w-48 bg-surface-light/95 backdrop-blur shadow-lg border border-border-light rounded-xl z-10 flex flex-col dark:bg-surface-dark/95 dark:border-border-dark">
                <div className="p-3 border-b border-border-light dark:border-border-dark">
                   <h3 className="text-xs font-bold uppercase tracking-wider text-text-secondary dark:text-gray-500">组件库</h3>
                </div>
                <div className="flex-1 overflow-y-auto p-2 space-y-2">
                   <button onClick={() => handleAddNode('trigger')} className="flex w-full items-center gap-2 p-2 rounded-lg hover:bg-background-light dark:hover:bg-white/5 text-left group">
                      <div className="size-8 rounded bg-emerald-100 text-emerald-600 flex items-center justify-center dark:bg-emerald-900/30 dark:text-emerald-400">
                         <span className="material-symbols-outlined text-[18px]">play_arrow</span>
                      </div>
                      <span className="text-sm font-medium text-text-main dark:text-gray-200">触发器</span>
                      <span className="ml-auto opacity-0 group-hover:opacity-100 material-symbols-outlined text-[14px] text-text-secondary">add</span>
                   </button>
                   <button onClick={() => handleAddNode('agent')} className="flex w-full items-center gap-2 p-2 rounded-lg hover:bg-background-light dark:hover:bg-white/5 text-left group">
                      <div className="size-8 rounded bg-blue-100 text-blue-600 flex items-center justify-center dark:bg-blue-900/30 dark:text-blue-400">
                         <span className="material-symbols-outlined text-[18px]">smart_toy</span>
                      </div>
                      <span className="text-sm font-medium text-text-main dark:text-gray-200">AI Agent</span>
                      <span className="ml-auto opacity-0 group-hover:opacity-100 material-symbols-outlined text-[14px] text-text-secondary">add</span>
                   </button>
                   <button onClick={() => handleAddNode('router')} className="flex w-full items-center gap-2 p-2 rounded-lg hover:bg-background-light dark:hover:bg-white/5 text-left group">
                      <div className="size-8 rounded bg-orange-100 text-orange-600 flex items-center justify-center dark:bg-orange-900/30 dark:text-orange-400">
                         <span className="material-symbols-outlined text-[18px]">alt_route</span>
                      </div>
                      <span className="text-sm font-medium text-text-main dark:text-gray-200">逻辑路由</span>
                      <span className="ml-auto opacity-0 group-hover:opacity-100 material-symbols-outlined text-[14px] text-text-secondary">add</span>
                   </button>
                   <button onClick={() => handleAddNode('tool')} className="flex w-full items-center gap-2 p-2 rounded-lg hover:bg-background-light dark:hover:bg-white/5 text-left group">
                      <div className="size-8 rounded bg-purple-100 text-purple-600 flex items-center justify-center dark:bg-purple-900/30 dark:text-purple-400">
                         <span className="material-symbols-outlined text-[18px]">extension</span>
                      </div>
                      <span className="text-sm font-medium text-text-main dark:text-gray-200">外部工具</span>
                      <span className="ml-auto opacity-0 group-hover:opacity-100 material-symbols-outlined text-[14px] text-text-secondary">add</span>
                   </button>
                   <button onClick={() => handleAddNode('end')} className="flex w-full items-center gap-2 p-2 rounded-lg hover:bg-background-light dark:hover:bg-white/5 text-left group">
                      <div className="size-8 rounded bg-gray-200 text-gray-600 flex items-center justify-center dark:bg-gray-700 dark:text-gray-400">
                         <span className="material-symbols-outlined text-[18px]">flag</span>
                      </div>
                      <span className="text-sm font-medium text-text-main dark:text-gray-200">结束</span>
                      <span className="ml-auto opacity-0 group-hover:opacity-100 material-symbols-outlined text-[14px] text-text-secondary">add</span>
                   </button>
                </div>
                <div className="p-3 border-t border-border-light dark:border-border-dark text-[10px] text-center text-text-secondary">
                   拖拽或点击添加
                </div>
             </div>

             {/* Canvas Container */}
             <div 
               ref={canvasRef}
               className="flex-1 overflow-hidden relative cursor-grab active:cursor-grabbing canvas-bg"
               onMouseDown={handleCanvasMouseDown}
               onMouseMove={handleCanvasMouseMove}
               onMouseUp={handleCanvasMouseUp}
               onWheel={handleCanvasWheel}
             >
                {/* Grid Pattern */}
                <div 
                  className="absolute inset-0 pointer-events-none opacity-20 dark:opacity-10"
                  style={{
                    backgroundImage: 'radial-gradient(circle, #888 1px, transparent 1px)',
                    backgroundSize: `${20 * zoom}px ${20 * zoom}px`,
                    backgroundPosition: `${canvasOffset.x}px ${canvasOffset.y}px`
                  }}
                />

                {/* Content Container (Zoom/Pan) */}
                <div 
                  className="absolute left-0 top-0 w-full h-full origin-top-left pointer-events-none"
                  style={{
                    transform: `translate(${canvasOffset.x}px, ${canvasOffset.y}px) scale(${zoom})`
                  }}
                >
                   {/* Connections Layer (SVG) */}
                   <svg className="overflow-visible absolute left-0 top-0 w-full h-full">
                      {edges.map(edge => {
                        const source = nodes.find(n => n.id === edge.source);
                        const target = nodes.find(n => n.id === edge.target);
                        if (!source || !target) return null;

                        // Calculate handle positions - simplified logic
                        // In a real app, use the handles IDs to calculate exact offsets
                        let sx = source.x + 240; 
                        let sy = source.y + 50;  
                        
                        // Adjust for Router multiple outputs
                        if (source.type === 'router' && edge.sourceHandle) {
                            const idx = source.outputs.indexOf(edge.sourceHandle);
                            sy = source.y + 60 + (idx * 24); 
                        }

                        const tx = target.x;
                        const ty = target.y + 50;

                        // Bezier path
                        const path = `M ${sx} ${sy} C ${sx + 80} ${sy}, ${tx - 80} ${ty}, ${tx} ${ty}`;

                        return (
                          <g key={edge.id}>
                            <path d={path} strokeWidth="3" stroke="gray" strokeOpacity="0.3" fill="none" />
                            <path d={path} strokeWidth="1.5" stroke="#3b82f6" fill="none" className="dark:stroke-blue-500" />
                          </g>
                        );
                      })}
                   </svg>

                   {/* Nodes Layer */}
                   <div className="pointer-events-auto">
                      {nodes.map(node => {
                        const style = getNodeStyles(node.type);
                        return (
                          <div
                            key={node.id}
                            onMouseDown={(e) => handleNodeMouseDown(e, node.id)}
                            onClick={(e) => handleNodeClick(e, node)}
                            className={`absolute w-60 rounded-xl shadow-lg border bg-surface-light dark:bg-surface-dark transition-shadow hover:shadow-xl hover:ring-2 hover:ring-primary/50 group ${style.body} ${selectedAgent?.id === node.agentId && node.type === 'agent' ? 'ring-2 ring-primary' : ''}`}
                            style={{ 
                              left: node.x, 
                              top: node.y,
                              cursor: 'grab' 
                            }}
                          >
                             {/* Input Handles */}
                             {node.inputs.map((_, i) => (
                               <div key={i} className="absolute -left-2 top-10 size-4 rounded-full bg-white border-2 border-gray-400 hover:border-primary hover:bg-blue-50 transition-colors z-20 dark:bg-surface-dark dark:border-gray-500"></div>
                             ))}

                             {/* Header */}
                             <div className={`h-10 ${style.header} rounded-t-xl flex items-center px-3 gap-2`}>
                                <span className="material-symbols-outlined text-white text-[18px]">{style.icon}</span>
                                <span className="text-white text-sm font-bold truncate">{node.label}</span>
                                <div className="ml-auto flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                   <button className="text-white/80 hover:text-white"><span className="material-symbols-outlined text-[16px]">settings</span></button>
                                   <button className="text-white/80 hover:text-white"><span className="material-symbols-outlined text-[16px]">close</span></button>
                                </div>
                             </div>

                             {/* Body */}
                             <div className="p-3">
                                {node.type === 'router' ? (
                                    <div className="flex flex-col gap-1">
                                        {node.outputs.map((out, idx) => (
                                            <div key={out} className="flex items-center justify-between text-xs text-text-secondary h-6">
                                                <span>{out}</span>
                                                {/* Output Handles specific for router */}
                                                <div className="absolute -right-2 size-4 rounded-full bg-white border-2 border-orange-400 hover:border-orange-600 transition-colors z-20 dark:bg-surface-dark dark:border-orange-500" style={{ top: 60 + (idx * 24) }}></div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <>
                                        <p className="text-xs text-text-secondary dark:text-gray-400 line-clamp-2 h-8">
                                        {node.description || '暂无描述'}
                                        </p>
                                        {node.type === 'agent' && (
                                        <div className="mt-2 flex items-center gap-1 text-[10px] text-text-secondary bg-background-light dark:bg-white/5 rounded px-2 py-1">
                                            <span className="material-symbols-outlined text-[12px]">model_training</span>
                                            <span>GPT-4o</span>
                                        </div>
                                        )}
                                        {/* Standard Output Handle */}
                                        {node.outputs.map((_, i) => (
                                            <div key={i} className="absolute -right-2 top-10 size-4 rounded-full bg-white border-2 border-gray-400 hover:border-primary hover:bg-blue-50 transition-colors z-20 dark:bg-surface-dark dark:border-gray-500"></div>
                                        ))}
                                    </>
                                )}
                             </div>
                          </div>
                        );
                      })}
                   </div>
                </div>
             </div>

             {/* Canvas Controls */}
             <div className="absolute bottom-6 right-6 flex gap-2">
                <div className="bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-lg p-1 shadow-lg flex flex-col gap-1">
                   <button onClick={() => setZoom(z => Math.min(z + 0.1, 2))} className="p-2 rounded hover:bg-background-light dark:hover:bg-white/10 text-text-secondary"><span className="material-symbols-outlined text-[20px]">add</span></button>
                   <button onClick={() => setZoom(z => Math.max(z - 0.1, 0.4))} className="p-2 rounded hover:bg-background-light dark:hover:bg-white/10 text-text-secondary"><span className="material-symbols-outlined text-[20px]">remove</span></button>
                   <div className="h-px w-full bg-border-light dark:bg-border-dark my-0.5"></div>
                   <button onClick={() => { setZoom(1); setCanvasOffset({x:0,y:0}); }} className="p-2 rounded hover:bg-background-light dark:hover:bg-white/10 text-text-secondary" title="重置视图"><span className="material-symbols-outlined text-[20px]">center_focus_strong</span></button>
                </div>
             </div>
          </div>
        )}

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
            <div className="flex border-b border-border-light px-6 dark:border-border-dark shrink-0 overflow-x-auto scrollbar-hide">
              <button 
                onClick={() => setConfigTab('model')}
                className={`border-b-2 py-3 text-sm font-medium transition-colors whitespace-nowrap mr-6 ${configTab === 'model' ? 'border-primary text-primary' : 'border-transparent text-text-secondary hover:text-text-main dark:text-gray-400 dark:hover:text-white'}`}
              >
                身份与模型
              </button>
              <button 
                onClick={() => setConfigTab('tools')}
                className={`border-b-2 py-3 text-sm font-medium transition-colors whitespace-nowrap mr-6 ${configTab === 'tools' ? 'border-primary text-primary' : 'border-transparent text-text-secondary hover:text-text-main dark:text-gray-400 dark:hover:text-white'}`}
              >
                工具 (MCP)
              </button>
              <button 
                onClick={() => setConfigTab('prompt')}
                className={`border-b-2 py-3 text-sm font-medium transition-colors whitespace-nowrap mr-6 ${configTab === 'prompt' ? 'border-primary text-primary' : 'border-transparent text-text-secondary hover:text-text-main dark:text-gray-400 dark:hover:text-white'}`}
              >
                提示词
              </button>
              <button 
                onClick={() => setConfigTab('debug')}
                className={`border-b-2 py-3 text-sm font-medium transition-colors whitespace-nowrap ${configTab === 'debug' ? 'border-primary text-primary' : 'border-transparent text-text-secondary hover:text-text-main dark:text-gray-400 dark:hover:text-white'}`}
              >
                调试
              </button>
            </div>

            {/* Panel Content */}
            <div className="flex-1 overflow-y-auto p-6 custom-scrollbar bg-background-light/30 dark:bg-black/5">
              {configTab === 'model' && (
                <div className="flex flex-col gap-6">
                  {/* Identity */}
                  <div className="space-y-4">
                    <h4 className="text-xs font-bold uppercase tracking-wide text-text-secondary dark:text-gray-500">基本信息</h4>
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
                        rows={2} 
                        value={formData.description || ''}
                        onChange={e => setFormData({...formData, description: e.target.value})}
                      ></textarea>
                    </div>
                  </div>
                  
                  <div className="h-px bg-border-light dark:bg-border-dark"></div>

                  {/* Model Config */}
                  <div className="space-y-4">
                    <h4 className="text-xs font-bold uppercase tracking-wide text-text-secondary dark:text-gray-500">模型参数</h4>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-medium text-text-secondary dark:text-gray-400 mb-1">提供商</label>
                            <select 
                                className="w-full rounded-lg border-border-light bg-surface-light px-3 py-2 text-sm text-text-main focus:border-primary focus:ring-primary dark:border-border-dark dark:bg-surface-dark dark:text-white"
                                value={formData.modelProvider}
                                onChange={e => setFormData({...formData, modelProvider: e.target.value, modelName: LLM_MODELS[e.target.value as keyof typeof LLM_MODELS][0].id})}
                            >
                                <option value="openai">OpenAI</option>
                                <option value="anthropic">Anthropic</option>
                                <option value="gemini">Google Gemini</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-text-secondary dark:text-gray-400 mb-1">模型</label>
                            <select 
                                className="w-full rounded-lg border-border-light bg-surface-light px-3 py-2 text-sm text-text-main focus:border-primary focus:ring-primary dark:border-border-dark dark:bg-surface-dark dark:text-white"
                                value={formData.modelName}
                                onChange={e => setFormData({...formData, modelName: e.target.value})}
                            >
                                {(LLM_MODELS[formData.modelProvider as keyof typeof LLM_MODELS] || []).map(m => (
                                    <option key={m.id} value={m.id}>{m.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    
                    <div>
                        <div className="flex justify-between mb-2">
                            <label className="block text-xs font-medium text-text-secondary dark:text-gray-400">温度 (Temperature)</label>
                            <span className="text-xs font-mono font-bold text-primary">{formData.temperature}</span>
                        </div>
                        <input 
                            type="range" min="0" max="1" step="0.1"
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-primary"
                            value={formData.temperature}
                            onChange={e => setFormData({...formData, temperature: parseFloat(e.target.value)})}
                        />
                        <div className="flex justify-between text-[10px] text-text-secondary mt-1">
                            <span>精确</span>
                            <span>创意</span>
                        </div>
                    </div>
                  </div>
                </div>
              )}

              {configTab === 'tools' && (
                  <div className="flex flex-col gap-4">
                      <div className="rounded-lg bg-blue-50 p-3 text-xs text-blue-800 dark:bg-blue-900/20 dark:text-blue-200 border border-blue-100 dark:border-blue-900/30">
                          <p>MCP (Model Context Protocol) 允许 Agent 安全地连接到您的数据和工具。选中下方工具以挂载。</p>
                      </div>
                      
                      <div className="space-y-3">
                          {MCP_TOOLS.map(tool => {
                              const isChecked = formData.tools?.includes(tool.id);
                              return (
                                  <label key={tool.id} className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${isChecked ? 'border-primary bg-primary/5 dark:bg-primary/10' : 'border-border-light bg-surface-light dark:border-border-dark dark:bg-surface-dark hover:border-primary/50'}`}>
                                      <div className="mt-0.5">
                                          <input 
                                              type="checkbox" 
                                              className="rounded text-primary focus:ring-primary dark:bg-background-dark dark:border-gray-600"
                                              checked={isChecked}
                                              onChange={e => {
                                                  const newTools = e.target.checked 
                                                      ? [...(formData.tools || []), tool.id]
                                                      : (formData.tools || []).filter(t => t !== tool.id);
                                                  setFormData({...formData, tools: newTools});
                                              }}
                                          />
                                      </div>
                                      <div className="flex-1">
                                          <div className="flex items-center gap-2 mb-1">
                                              <span className="material-symbols-outlined text-[18px] text-text-secondary dark:text-gray-400">{tool.icon}</span>
                                              <span className="text-sm font-bold text-text-main dark:text-white">{tool.name}</span>
                                              <span className="text-[10px] px-1.5 py-0.5 rounded bg-gray-100 text-gray-500 dark:bg-white/10 dark:text-gray-400">{tool.provider}</span>
                                          </div>
                                          <p className="text-xs text-text-secondary dark:text-gray-400">{tool.description}</p>
                                      </div>
                                  </label>
                              );
                          })}
                      </div>
                  </div>
              )}

              {configTab === 'prompt' && (
                <div className="flex flex-col gap-4 h-full">
                    <div className="flex items-center justify-between">
                      <label className="block text-xs font-medium text-text-secondary dark:text-gray-400">系统提示词 (System Prompt)</label>
                      <div className="flex gap-2">
                          <button 
                            className="text-[10px] px-2 py-1 rounded bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                            onClick={() => setFormData({...formData, systemPrompt: (formData.systemPrompt || '') + ' {{user_query}} '})}
                          >
                              + 插入变量
                          </button>
                      </div>
                    </div>
                    <div className="flex-1 relative rounded-lg border border-border-light bg-surface-light dark:border-border-dark dark:bg-surface-dark overflow-hidden group focus-within:ring-1 focus-within:ring-primary focus-within:border-primary flex flex-col">
                      <textarea 
                        className="flex-1 w-full resize-none border-none bg-transparent p-3 text-sm font-mono text-text-main focus:ring-0 dark:text-white placeholder-gray-400 custom-scrollbar" 
                        placeholder="你是一个专业的AI助手..." 
                        value={formData.systemPrompt || ''}
                        onChange={e => setFormData({...formData, systemPrompt: e.target.value})}
                      ></textarea>
                      <div className="bg-background-light/50 dark:bg-white/5 px-3 py-1.5 border-t border-border-light dark:border-border-dark text-[10px] text-text-secondary flex justify-between">
                          <span>Markdown 支持</span>
                          <span>{formData.systemPrompt?.length || 0} 字符</span>
                      </div>
                    </div>
                </div>
              )}

              {configTab === 'debug' && (
                  <div className="flex flex-col h-full gap-4">
                      <div className="flex-1 flex flex-col gap-2 min-h-0">
                          <label className="text-xs font-bold uppercase text-text-secondary dark:text-gray-500">模拟输出</label>
                          <div className="flex-1 rounded-lg border border-border-light bg-black/5 p-3 font-mono text-xs text-text-main dark:border-border-dark dark:bg-black/30 dark:text-green-400 overflow-y-auto custom-scrollbar whitespace-pre-wrap">
                              {isDebugRunning ? (
                                  <span className="animate-pulse">正在运行 Agent 逻辑...</span>
                              ) : debugOutput || <span className="text-gray-400 opacity-50">等待输入以开始测试...</span>}
                          </div>
                      </div>
                      <div className="shrink-0 pt-4 border-t border-border-light dark:border-border-dark">
                          <label className="block text-xs font-medium text-text-secondary dark:text-gray-400 mb-2">测试输入变量 (Input)</label>
                          <div className="flex gap-2">
                              <input 
                                  className="flex-1 rounded-lg border-border-light bg-surface-light px-3 py-2 text-sm focus:border-primary focus:ring-primary dark:border-border-dark dark:bg-surface-dark dark:text-white"
                                  placeholder="输入测试内容..."
                                  value={debugInput}
                                  onChange={e => setDebugInput(e.target.value)}
                                  onKeyDown={e => e.key === 'Enter' && handleRunDebug()}
                              />
                              <button 
                                  onClick={handleRunDebug}
                                  disabled={isDebugRunning || !debugInput}
                                  className="rounded-lg bg-green-600 px-4 py-2 text-sm font-bold text-white hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm flex items-center gap-2"
                              >
                                  <span className="material-symbols-outlined text-[18px]">play_arrow</span>
                                  运行
                              </button>
                          </div>
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

        {/* Create Agent Modal (Simplified to just name, redirects to drawer) */}
        {isCreateModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200" onClick={() => setIsCreateModalOpen(false)}>
            <div className="bg-surface-light dark:bg-surface-dark w-full max-w-md rounded-xl shadow-2xl border border-border-light dark:border-border-dark flex flex-col overflow-hidden animate-in zoom-in-95 duration-200" onClick={e => e.stopPropagation()}>
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
                      autoFocus
                    />
                 </div>
                 <div>
                    <label className="block text-sm font-medium text-text-main dark:text-white mb-1">描述 (可选)</label>
                    <textarea 
                      className="w-full rounded-lg border-border-light bg-background-light px-3 py-2 text-sm focus:border-primary focus:ring-primary dark:border-border-dark dark:bg-background-dark dark:text-white resize-none" 
                      placeholder="简要描述该 Agent 的功能..."
                      rows={2}
                      value={formData.description || ''}
                      onChange={e => setFormData({...formData, description: e.target.value})}
                    ></textarea>
                 </div>
              </div>
              <div className="bg-background-light/50 dark:bg-white/5 px-6 py-4 border-t border-border-light dark:border-border-dark flex justify-end gap-3">
                 <button onClick={() => setIsCreateModalOpen(false)} className="px-4 py-2 rounded-lg text-sm font-medium text-text-secondary hover:bg-background-light dark:hover:bg-white/10 dark:text-gray-400 transition-colors">取消</button>
                 <button onClick={handleCreateAgent} disabled={!formData.name} className="px-4 py-2 rounded-lg bg-primary text-sm font-medium text-white hover:bg-primary-dark shadow-sm disabled:opacity-50">创建并配置</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};