import React, { useState, useRef, useEffect } from 'react';
import { Header } from '../components/Header';

// --- Types ---
interface Source {
  name: string;
  type: string;
  page?: string;
  snippet?: string; // The specific text used by AI
  fullContent?: string; // Mock content of the original file
}

interface Message {
  id: string;
  role: 'user' | 'ai';
  content: React.ReactNode | string;
  timestamp: string;
  sources?: Source[];
}

interface Conversation {
  id: string;
  title: string;
  subtitle: string;
  time: string;
  group: '今天' | '昨天' | '更早';
  messages: Message[];
}

// --- Mock Data Helpers ---
const MOCK_PDF_CONTENT = `2023年度财务报告
一、 财务概览
本季度公司整体表现强劲，各项核心指标均达到或超出预期。
1.1 收入分析
Q3 总营收达到 $1.5B，同比增长 18%。
其中，核心 SaaS 订阅收入同比增长 25%，主要得益于企业级客户的续费率提升。企业客户（ARR > $100k）数量增加了 120 家。
1.2 成本与利润
运营成本控制有效，毛利率从上一季度的 65% 提升至 68%。
通过引入 AI 自动化工具，运营成本降低了 8%。研发投入持续增加，占总营收的 22%。

二、 市场表现
2.1 区域增长
北美市场保持稳健，增长 12%。
亚太地区（APAC）市场营收环比增长 15%，新开设的新加坡办事处开始产生显著效益。
欧洲市场受宏观经济影响，增速放缓至 5%。

三、 风险与展望
汇率波动可能对 Q4 利润率造成 1-2% 的影响。管理层对全年目标保持乐观。`;

const MOCK_XLSX_CONTENT = `项目,Q2 金额 ($M),Q3 金额 ($M),环比变化,备注
数字广告投放,1.2,1.5,+25%,主要投放于 LinkedIn 和 Google Ads
线下活动与会议,0.6,0.8,+33%,包含 TechCrunch Disrupt 赞助费
品牌合作与赞助,0.4,0.5,+25%,与知名科技博主的年度合作
内容营销,0.3,0.3,0%,博客与白皮书制作
其他,0.2,0.1,-50%,杂项支出
总计,2.7,3.2,+18.5%,`;

const MOCK_HISTORY: Conversation[] = [
  {
    id: '1',
    title: 'Q3 季度财报分析总结',
    subtitle: '请总结一下 Q3 财报中的主要增长点...',
    time: '10:42',
    group: '今天',
    messages: [
      {
        id: 'm1',
        role: 'user',
        content: '请总结一下 Q3 财报中的主要增长点。',
        timestamp: '今天 10:42'
      },
      {
        id: 'm2',
        role: 'ai',
        timestamp: '今天 10:42',
        sources: [
          { 
            name: '2023年度财务报告.pdf', 
            type: 'pdf', 
            page: 'P.14', 
            snippet: '核心 SaaS 订阅收入同比增长 25%，主要得益于企业级客户的续费率提升。',
            fullContent: MOCK_PDF_CONTENT 
          },
          { 
            name: '2023年度财务报告.pdf', 
            type: 'pdf', 
            page: 'P.16', 
            snippet: '亚太地区（APAC）市场营收环比增长 15%，新开设的新加坡办事处开始产生显著效益。',
            fullContent: MOCK_PDF_CONTENT
          },
          { 
            name: '2023年度财务报告.pdf', 
            type: 'pdf', 
            page: 'P.18', 
            snippet: '通过引入 AI 自动化工具，运营成本降低了 8%，毛利率从上一季度的 65% 提升至 68%。',
            fullContent: MOCK_PDF_CONTENT
          }
        ],
        content: (
          <>
            <p className="mb-2">根据 <span className="font-medium text-primary">2023年度财务报告.pdf</span>，Q3 季度的主要增长点如下：</p>
            <ol className="mb-3 list-decimal space-y-1 pl-4">
              <li><strong>核心业务收入增长：</strong> 核心 SaaS 订阅收入同比增长 25%，主要得益于企业级客户的续费率提升 <span className="inline-flex size-4 cursor-pointer items-center justify-center rounded-full bg-primary/10 text-[10px] font-bold text-primary hover:bg-primary hover:text-white transition-colors" data-source-index="0">[1]</span>。</li>
              <li><strong>海外市场扩张：</strong> 亚太地区（APAC）市场营收环比增长 15%，新开设的新加坡办事处开始产生显著效益 <span className="inline-flex size-4 cursor-pointer items-center justify-center rounded-full bg-primary/10 text-[10px] font-bold text-primary hover:bg-primary hover:text-white transition-colors" data-source-index="1">[2]</span>。</li>
              <li><strong>运营效率优化：</strong> 通过引入 AI 自动化工具，运营成本降低了 8%，毛利率从上一季度的 65% 提升至 68% <span className="inline-flex size-4 cursor-pointer items-center justify-center rounded-full bg-primary/10 text-[10px] font-bold text-primary hover:bg-primary hover:text-white transition-colors" data-source-index="2">[3]</span>。</li>
            </ol>
            <p>此外，报告还提到虽然营销费用有所增加，但获客成本（CAC）保持稳定。</p>
          </>
        )
      },
      {
        id: 'm3',
        role: 'user',
        content: '关于市场营销费用的具体数据呢？',
        timestamp: '今天 10:44'
      },
      {
        id: 'm4',
        role: 'ai',
        timestamp: '今天 10:44',
        sources: [
          { 
            name: 'Q3_Expense_Breakdown.xlsx', 
            type: 'sheet', 
            page: 'Sheet2',
            snippet: '数字广告投放,1.2,1.5,+25%,主要投放于 LinkedIn 和 Google Ads',
            fullContent: MOCK_XLSX_CONTENT
          }
        ],
        content: (
          <>
            <p className="mb-2">根据 Q3 财务报表，市场营销总费用为 <strong>$3.2M</strong>，较上一季度增长了 12%。主要支出分布如下：</p>
            <ul className="my-2 list-disc space-y-1 pl-4 marker:text-primary">
              <li>数字广告投放：$1.5M (47%) <span className="inline-flex size-4 cursor-pointer items-center justify-center rounded-full bg-primary/10 text-[10px] font-bold text-primary hover:bg-primary hover:text-white transition-colors" data-source-index="0">[1]</span></li>
              <li>线下活动与会议：$0.8M (25%)</li>
              <li>品牌合作与赞助：$0.5M (15%)</li>
            </ul>
            <p>管理层认为这笔投入是必要的，特别是在 Q4 旺季来临之前建立品牌知名度。</p>
          </>
        )
      }
    ]
  },
  {
    id: '2',
    title: '营销策略文档润色',
    subtitle: '帮我检查一下这份文档的语气是否...',
    time: '09:15',
    group: '今天',
    messages: [
      { id: 'm2-1', role: 'user', content: '帮我检查一下这份文档的语气是否足够专业。', timestamp: '09:15' },
      { id: 'm2-2', role: 'ai', content: '没问题，请发送文档内容或上传文件。一般来说，专业文档应避免过于口语化的表达...', timestamp: '09:15' }
    ]
  },
];

export const ChatPage: React.FC = () => {
  const [conversations, setConversations] = useState<Conversation[]>(MOCK_HISTORY);
  const [activeId, setActiveId] = useState<string>(MOCK_HISTORY[0].id);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showHistory, setShowHistory] = useState(true);
  
  // Grounding / Source Viewer State
  const [activeSource, setActiveSource] = useState<Source | null>(null);
  const sourceViewerRef = useRef<HTMLDivElement>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeConversation = conversations.find(c => c.id === activeId) || conversations[0];

  // Auto scroll to bottom of chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [activeConversation.messages, activeId, isTyping]);

  // Handle Highlighting Scroll
  useEffect(() => {
    if (activeSource && sourceViewerRef.current) {
      // Small delay to ensure render is complete
      setTimeout(() => {
        const highlightedElement = sourceViewerRef.current?.querySelector('.highlight-source');
        if (highlightedElement) {
          highlightedElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
    }
  }, [activeSource]);

  // --- Actions ---

  const handleNewChat = () => {
    const newId = Date.now().toString();
    const newChat: Conversation = {
      id: newId,
      title: '新对话',
      subtitle: '开始一个新的话题...',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      group: '今天',
      messages: []
    };
    setConversations([newChat, ...conversations]);
    setActiveId(newId);
    if (!showHistory) setShowHistory(true);
    setActiveSource(null); // Close source panel on new chat
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isTyping) return;

    const userText = inputValue;
    setInputValue('');

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setConversations(prev => prev.map(c => {
      if (c.id === activeId) {
        return {
          ...c,
          title: c.messages.length === 0 ? userText.slice(0, 15) + (userText.length > 15 ? '...' : '') : c.title,
          subtitle: userText,
          messages: [...c.messages, userMsg]
        };
      }
      return c;
    }));

    setIsTyping(true);

    setTimeout(() => {
      const aiMsgId = (Date.now() + 1).toString();
      const aiResponseFull = "这是一个模拟的智能回答。我正在实时生成这段文本来演示流式输出的效果。\n\n根据您的提问，我查询了知识库中的相关信息：\n1. **数据准确性**：所有的回答都基于您上传的文档，确保真实可靠。\n2. **实时性**：新上传的文档会在几秒钟内被索引。\n\n如果您有具体的文件需要分析，请告诉我。";
      
      setConversations(prev => prev.map(c => {
        if (c.id === activeId) {
          return {
            ...c,
            messages: [...c.messages, {
              id: aiMsgId,
              role: 'ai',
              content: '',
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }]
          };
        }
        return c;
      }));

      let currentIndex = 0;
      const streamInterval = setInterval(() => {
        if (currentIndex < aiResponseFull.length) {
          setConversations(prev => prev.map(c => {
            if (c.id === activeId) {
              const msgs = [...c.messages];
              const lastMsg = { ...msgs[msgs.length - 1] };
              lastMsg.content = aiResponseFull.substring(0, currentIndex + 1); 
              msgs[msgs.length - 1] = lastMsg;
              return { ...c, messages: msgs };
            }
            return c;
          }));
          currentIndex++;
        } else {
          clearInterval(streamInterval);
          setIsTyping(false);
        }
      }, 30);
    }, 600);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Helper: Render content with highlight
  const renderSourceContent = (source: Source) => {
    if (!source.fullContent) return <div className="text-gray-400 italic">暂无预览内容</div>;
    
    // Simple split-join based highligting for demo purpose.
    // In production, use a more robust fuzzy match library.
    if (source.snippet && source.fullContent.includes(source.snippet)) {
       const parts = source.fullContent.split(source.snippet);
       // Handle only the first occurrence for simplicity in this demo
       return (
         <div className="whitespace-pre-wrap font-mono text-sm leading-relaxed text-text-main dark:text-gray-300">
           {parts[0]}
           <mark className="highlight-source bg-yellow-200 text-black px-1 rounded dark:bg-yellow-600 dark:text-white">
             {source.snippet}
           </mark>
           {parts.slice(1).join(source.snippet)}
         </div>
       );
    }

    return <div className="whitespace-pre-wrap font-mono text-sm leading-relaxed text-text-main dark:text-gray-300">{source.fullContent}</div>;
  };

  // Handle click on citations in JSX content
  const handleChatClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.dataset.sourceIndex) {
      const index = parseInt(target.dataset.sourceIndex, 10);
      // Find the message (this is a bit hacky for the demo, assuming we know which message context we are in or we pass it down)
      // For this demo, we look at the last AI message of active conversation or iterate to find it. 
      // A better way is to attach the handler to the message component directly.
      // Let's assume user clicked on the LAST AI message for simplicity in this global handler, 
      // OR we just find the message that contains this source.
      
      // Finding the source: In a real app, the `onClick` would be attached to the `<span>` when rendering the message.
      // Since we are using `dangerouslySetInnerHTML` equivalent or React Nodes, we rely on event delegation here, 
      // but React Nodes allow direct onClick.
    }
  };

  const openSourcePanel = (source: Source) => {
    setActiveSource(source);
  };

  const getSourceIcon = (type: string) => {
    switch (type) {
      case 'pdf': return 'picture_as_pdf';
      case 'doc': return 'description';
      case 'sheet': return 'table_chart';
      default: return 'article';
    }
  };

  const getSourceColor = (type: string) => {
    switch (type) {
      case 'pdf': return 'text-red-700 bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:text-red-300';
      case 'doc': return 'text-blue-700 bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-300';
      case 'sheet': return 'text-green-700 bg-green-50 hover:bg-green-100 dark:bg-green-900/20 dark:text-green-300';
      default: return 'text-gray-700 bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  return (
    <div className="flex flex-col h-full bg-background-light overflow-hidden">
      <Header breadcrumbs={['仪表盘', '智能问答']} />
      
      <div className="flex flex-1 overflow-hidden">
        {/* Left: Chat History Sidebar */}
        <div className={`${showHistory ? 'lg:flex' : 'lg:hidden'} hidden flex-col w-72 shrink-0 border-r border-border-light bg-surface-light dark:border-border-dark dark:bg-surface-dark transition-all duration-300 z-10`}>
          <div className="p-4 border-b border-border-light dark:border-border-dark">
            <button 
              onClick={handleNewChat}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary-dark hover:shadow-primary/40"
            >
              <span className="material-symbols-outlined text-[20px]">add</span>
              新建对话
            </button>
          </div>
          <div className="flex-1 overflow-y-auto px-2 custom-scrollbar pt-2">
            {['今天', '昨天'].map(group => {
              const groupItems = conversations.filter(c => c.group === group);
              if (groupItems.length === 0) return null;
              
              return (
                <div className="mb-4" key={group}>
                  <h3 className="px-3 py-2 text-xs font-semibold uppercase text-text-secondary dark:text-gray-500">{group}</h3>
                  <div className="flex flex-col gap-1">
                    {groupItems.map(chat => (
                      <button 
                        key={chat.id}
                        onClick={() => setActiveId(chat.id)}
                        className={`group flex w-full flex-col gap-1 rounded-lg px-3 py-3 text-left transition-colors ${
                          activeId === chat.id 
                            ? 'bg-primary/5 ring-1 ring-primary/20 dark:bg-primary/10' 
                            : 'hover:bg-background-light dark:hover:bg-white/5'
                        }`}
                      >
                        <div className="flex w-full items-center justify-between">
                          <span className="line-clamp-1 text-sm font-medium text-text-main dark:text-white">{chat.title}</span>
                          <span className="shrink-0 text-[10px] text-text-secondary dark:text-gray-400">{chat.time}</span>
                        </div>
                        <p className="line-clamp-1 text-xs text-text-secondary dark:text-gray-400">{chat.subtitle}</p>
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Center: Main Chat Area */}
        <div className="flex flex-1 flex-col min-w-0 bg-background-light dark:bg-background-dark relative">
          <div className="flex h-14 shrink-0 items-center justify-between border-b border-border-light bg-surface-light px-6 dark:bg-surface-dark dark:border-border-dark z-10">
             <div className="flex items-center gap-3">
                <button className="lg:hidden text-text-secondary dark:text-gray-400">
                  <span className="material-symbols-outlined">menu_open</span>
                </button>
                <button 
                  onClick={() => setShowHistory(!showHistory)}
                  className="hidden lg:flex items-center justify-center rounded-lg p-2 text-text-secondary hover:bg-background-light dark:text-gray-400 dark:hover:bg-white/5 transition-colors"
                  title={showHistory ? "折叠历史记录" : "展开历史记录"}
                >
                  <span className="material-symbols-outlined text-[20px]">
                    {showHistory ? 'keyboard_double_arrow_left' : 'keyboard_double_arrow_right'}
                  </span>
                </button>
                <div className="flex flex-col">
                  <h2 className="text-sm font-bold text-text-main dark:text-white">{activeConversation.title}</h2>
                  <p className="text-[10px] text-text-secondary dark:text-gray-400">
                    {activeConversation.messages.length > 0 
                      ? `基于 ${activeConversation.messages.length} 条对话` 
                      : '新对话'}
                  </p>
                </div>
              </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 sm:p-6 custom-scrollbar scroll-smooth">
            <div className="mx-auto flex max-w-4xl flex-col gap-6">
               <div className="flex items-center justify-center py-2">
                <span className="rounded-full bg-border-light px-3 py-1 text-xs font-medium text-text-secondary dark:bg-white/5 dark:text-gray-400">
                  {activeConversation.messages.length > 0 ? activeConversation.messages[0].timestamp : '开始新对话'}
                </span>
               </div>
               
               {activeConversation.messages.length === 0 && (
                 <div className="flex flex-col items-center justify-center py-10 text-center opacity-60">
                   <div className="size-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                     <span className="material-symbols-outlined text-4xl text-primary">smart_toy</span>
                   </div>
                   <h3 className="text-lg font-bold text-text-main dark:text-white">我可以帮您做什么？</h3>
                   <p className="text-sm text-text-secondary dark:text-gray-400 max-w-md mt-2">
                     您可以询问有关知识库文档的问题，请求总结报告，或者进行创意写作。
                   </p>
                 </div>
               )}

               {activeConversation.messages.map((msg) => (
                 <div key={msg.id} className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                   <div className={`size-8 shrink-0 rounded-full flex items-center justify-center shadow-sm ${
                     msg.role === 'user' 
                      ? 'bg-cover bg-center' 
                      : 'bg-gradient-to-br from-indigo-500 to-purple-500 text-white'
                   }`} 
                   style={msg.role === 'user' ? { backgroundImage: "url('https://picsum.photos/200/200')" } : {}}>
                     {msg.role === 'ai' && <span className="material-symbols-outlined text-[18px]">smart_toy</span>}
                   </div>
                   
                   <div className={`flex max-w-[90%] lg:max-w-[85%] flex-col gap-2 ${msg.role === 'user' ? 'items-end' : ''}`}>
                     <div className={`rounded-2xl px-5 py-4 text-sm leading-relaxed shadow-sm ${
                       msg.role === 'user'
                        ? 'rounded-tr-none bg-primary text-white'
                        : 'rounded-tl-none border border-border-light bg-surface-light text-text-main dark:border-border-dark dark:bg-surface-dark dark:text-gray-200'
                     }`}
                     // Attach event delegation for the dynamically rendered source chips in React Node
                     onClick={(e) => {
                       const target = e.target as HTMLElement;
                       // Check if the clicked element is a source citation [1]
                       if (target.dataset.sourceIndex && msg.sources) {
                         const index = parseInt(target.dataset.sourceIndex, 10);
                         if (msg.sources[index]) {
                           openSourcePanel(msg.sources[index]);
                         }
                       }
                     }}
                     >
                       {/* Content Rendering */}
                       {typeof msg.content === 'string' ? (
                         <p className="whitespace-pre-wrap">{msg.content}</p>
                       ) : (
                         msg.content
                       )}

                       {/* Footer Citations for AI messages */}
                       {msg.role === 'ai' && msg.sources && (
                          <div className="mt-4 flex flex-wrap gap-2 border-t border-border-light pt-3 dark:border-border-dark">
                            <span className="text-xs font-semibold text-text-secondary dark:text-gray-500">引用来源:</span>
                            {msg.sources.map((source, idx) => (
                              <button 
                                key={idx} 
                                onClick={(e) => { e.stopPropagation(); openSourcePanel(source); }}
                                className={`flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium transition-colors ${getSourceColor(source.type)}`}
                              >
                                 <span className="material-symbols-outlined text-[14px]">{getSourceIcon(source.type)}</span>
                                 {source.name} {source.page && `(${source.page})`}
                              </button>
                            ))}
                          </div>
                       )}
                     </div>
                   </div>
                 </div>
               ))}
               
               {isTyping && (
                 <div className="flex gap-4">
                    <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 text-white shadow-sm">
                      <span className="material-symbols-outlined text-[18px] animate-pulse">smart_toy</span>
                    </div>
                    <div className="flex items-center gap-1 h-8">
                       <span className="size-2 rounded-full bg-gray-400 animate-bounce"></span>
                       <span className="size-2 rounded-full bg-gray-400 animate-bounce delay-100"></span>
                       <span className="size-2 rounded-full bg-gray-400 animate-bounce delay-200"></span>
                    </div>
                 </div>
               )}
               <div ref={messagesEndRef} />
            </div>
          </div>
          
          <div className="shrink-0 p-4 sm:p-6 pb-6 pt-2">
            <div className="mx-auto max-w-4xl">
              <div className="relative flex items-end rounded-xl border border-border-light bg-surface-light shadow-sm ring-1 ring-black/5 focus-within:ring-2 focus-within:ring-primary dark:border-border-dark dark:bg-surface-dark dark:ring-white/5">
                <button className="mb-2 ml-2 rounded-lg p-2 text-text-secondary hover:bg-background-light hover:text-primary dark:text-gray-400 dark:hover:bg-white/10 transition-colors" title="上传文件">
                   <span className="material-symbols-outlined text-[20px]">add_circle</span>
                </button>
                <textarea
                  className="max-h-48 min-h-[56px] w-full resize-none border-none bg-transparent py-4 text-sm text-text-main placeholder-text-secondary focus:ring-0 dark:text-white dark:placeholder-gray-500 custom-scrollbar"
                  placeholder="输入您的问题，例如：'分析这份文档的风险点'..."
                  rows={1}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  disabled={isTyping}
                ></textarea>
                <button 
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isTyping}
                  className="mb-2 mr-2 rounded-lg bg-primary p-2 text-white shadow-md transition-all hover:bg-primary-dark hover:shadow-lg disabled:cursor-not-allowed disabled:bg-gray-300 dark:disabled:bg-gray-700"
                >
                   <span className="material-symbols-outlined text-[20px]">send</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Source Viewer Panel (Grounding) */}
        {activeSource && (
          <div className="w-[450px] shrink-0 border-l border-border-light bg-surface-light dark:border-border-dark dark:bg-surface-dark flex flex-col shadow-xl z-20 animate-in slide-in-from-right-10 duration-200">
            <div className="flex h-14 items-center justify-between border-b border-border-light px-4 dark:border-border-dark">
              <div className="flex items-center gap-2 overflow-hidden">
                <span className="material-symbols-outlined text-primary">fact_check</span>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-text-main dark:text-white truncate max-w-[280px]">{activeSource.name}</span>
                  <span className="text-[10px] text-text-secondary dark:text-gray-400">{activeSource.page || 'Full Document'} • 置信度 98%</span>
                </div>
              </div>
              <div className="flex items-center gap-1">
                 <button className="p-1.5 rounded-lg text-text-secondary hover:bg-background-light dark:text-gray-400 dark:hover:bg-white/10" title="打开原始文件">
                    <span className="material-symbols-outlined text-[18px]">open_in_new</span>
                 </button>
                 <button onClick={() => setActiveSource(null)} className="p-1.5 rounded-lg text-text-secondary hover:bg-background-light dark:text-gray-400 dark:hover:bg-white/10">
                    <span className="material-symbols-outlined text-[20px]">close</span>
                 </button>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 custom-scrollbar bg-background-light dark:bg-background-dark/50 relative">
               <div ref={sourceViewerRef} className="rounded-xl bg-white p-6 shadow-sm border border-border-light dark:bg-surface-dark dark:border-border-dark min-h-full">
                  {renderSourceContent(activeSource)}
               </div>
            </div>
            
            <div className="p-3 border-t border-border-light bg-surface-light dark:border-border-dark dark:bg-surface-dark text-center">
              <p className="text-[10px] text-text-secondary dark:text-gray-500">
                 高亮部分为 AI 生成回答时参考的具体片段。
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};