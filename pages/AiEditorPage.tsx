import React from 'react';

export const AiEditorPage: React.FC = () => {
  return (
    <div className="flex flex-col h-full bg-background-light dark:bg-background-dark overflow-hidden font-display">
      <style>{`
        .editor-content h1 { font-size: 2.25rem; font-weight: 700; margin-bottom: 1.5rem; line-height: 1.2; }
        .editor-content h2 { font-size: 1.5rem; font-weight: 600; margin-top: 2rem; margin-bottom: 1rem; line-height: 1.3; }
        .editor-content p { margin-bottom: 1.25rem; line-height: 1.8; color: #334155; }
        .dark .editor-content p { color: #cbd5e1; }
        .editor-content ul { list-style-type: disc; padding-left: 1.5rem; margin-bottom: 1.25rem; }
        .editor-content blockquote { border-left: 4px solid #e2e8f0; padding-left: 1rem; font-style: italic; color: #64748b; margin-bottom: 1.25rem; }
        .editor-content pre { background: #f1f5f9; padding: 1rem; border-radius: 0.5rem; font-family: monospace; font-size: 0.9em; margin-bottom: 1.25rem; overflow-x: auto; }
        .cursor-blink {
            animation: blink 1s step-end infinite;
        }
        @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
        }
        @keyframes bounce-in {
            0% { transform: scale(0.9); opacity: 0; }
            100% { transform: scale(1); opacity: 1; }
        }
        .animate-bounce-in {
            animation: bounce-in 0.3s cubic-bezier(0.18, 0.89, 0.32, 1.28) forwards;
        }
        .text-ai-accent { color: #8b5cf6; }
        .bg-ai-accent { background-color: #8b5cf6; }
        .border-ai-accent { border-color: #8b5cf6; }
      `}</style>
      
      {/* Header */}
      <header className="flex h-16 w-full shrink-0 items-center justify-between border-b border-border-light bg-surface-light px-6 dark:bg-surface-dark dark:border-border-dark z-10">
        <div className="flex items-center gap-4 lg:hidden">
          <button className="text-text-secondary hover:text-text-main dark:text-gray-400 dark:hover:text-white">
            <span className="material-symbols-outlined">menu</span>
          </button>
          <span className="font-display font-bold text-text-main dark:text-white">AI Editor</span>
        </div>
        <div className="hidden lg:flex items-center gap-2 text-sm text-text-secondary dark:text-gray-400">
          <span className="material-symbols-outlined text-[20px]">edit_note</span>
          <span className="font-medium text-text-main dark:text-white">AI Markdown Editor</span>
          <span className="bg-[#8b5cf6]/10 text-[#8b5cf6] text-[10px] px-2 py-0.5 rounded-full font-bold">WYSIWYG</span>
        </div>
        <div className="flex items-center gap-6">
          <div className="relative hidden sm:block w-96">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary dark:text-gray-400">search</span>
            <input 
                className="h-10 w-full rounded-lg border-none bg-background-light pl-10 pr-4 text-sm text-text-main placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary/50 dark:bg-background-dark dark:text-white dark:placeholder-gray-500" 
                placeholder="搜索文档内容..." 
                type="text"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
              <span className="text-[10px] text-text-secondary border border-border-light dark:border-gray-700 px-1.5 py-0.5 rounded">⌘K</span>
            </div>
          </div>
        </div>
      </header>
      
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar: Outline & History */}
        <aside className="flex w-64 flex-col border-r border-border-light bg-surface-light dark:bg-surface-dark dark:border-border-dark hidden lg:flex">
          <div className="flex flex-col border-b border-border-light dark:border-border-dark flex-shrink-0 h-1/2">
            <div className="flex items-center justify-between p-3 bg-background-light/30 dark:bg-white/5">
              <h3 className="text-xs font-bold text-text-secondary uppercase tracking-wider">大纲视图</h3>
              <button className="text-text-secondary hover:text-primary"><span className="material-symbols-outlined text-[16px]">segment</span></button>
            </div>
            <div className="overflow-y-auto p-3">
              <div className="flex flex-col gap-1 border-l-2 border-border-light dark:border-gray-700 ml-1 pl-3">
                <button className="text-left text-xs font-medium text-primary py-1 transition-colors relative -ml-[14px] pl-[10px] border-l-2 border-primary truncate">引言：AGI 的定义</button>
                <button className="text-left text-xs text-text-secondary hover:text-text-main py-1 transition-colors truncate dark:text-gray-400 dark:hover:text-white">技术架构演进</button>
                <button className="text-left text-xs text-text-secondary hover:text-text-main py-1 transition-colors pl-3 truncate dark:text-gray-400 dark:hover:text-white">Transformer 模型</button>
                <button className="text-left text-xs text-text-secondary hover:text-text-main py-1 transition-colors pl-3 truncate dark:text-gray-400 dark:hover:text-white">多模态融合</button>
                <button className="text-left text-xs text-text-secondary hover:text-text-main py-1 transition-colors truncate dark:text-gray-400 dark:hover:text-white">应用场景预测</button>
                <button className="text-left text-xs text-text-secondary hover:text-text-main py-1 transition-colors truncate dark:text-gray-400 dark:hover:text-white">伦理与安全挑战</button>
              </div>
            </div>
          </div>
          <div className="flex flex-col border-b border-border-light dark:border-border-dark p-3 gap-2">
            <h3 className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-1">文档操作</h3>
            <button className="flex items-center gap-2 rounded px-2 py-1.5 text-xs text-text-main hover:bg-background-light dark:text-gray-300 dark:hover:bg-white/5 transition-colors">
              <span className="material-symbols-outlined text-[16px]">save</span>
              <span>保存文档</span>
              <span className="ml-auto text-[10px] text-text-secondary">⌘S</span>
            </button>
            <button className="flex items-center gap-2 rounded px-2 py-1.5 text-xs text-text-main hover:bg-background-light dark:text-gray-300 dark:hover:bg-white/5 transition-colors">
              <span className="material-symbols-outlined text-[16px]">save_as</span>
              <span>另存为...</span>
            </button>
            <button className="flex items-center gap-2 rounded px-2 py-1.5 text-xs text-text-main hover:bg-background-light dark:text-gray-300 dark:hover:bg-white/5 transition-colors">
              <span className="material-symbols-outlined text-[16px]">ios_share</span>
              <span>导出 (PDF/HTML/Word)</span>
            </button>
          </div>
          <div className="flex flex-col flex-1 min-h-0 bg-background-light/30 dark:bg-surface-dark/50">
            <div className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-background-light dark:hover:bg-white/5">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px] text-text-secondary dark:text-gray-400">history</span>
                <span className="text-xs font-bold text-text-secondary uppercase tracking-wider dark:text-gray-400">历史版本</span>
              </div>
            </div>
            <div className="flex flex-col px-4 gap-3 overflow-y-auto pb-4">
              <div className="flex items-start gap-3 relative pl-2 group cursor-pointer">
                <div className="absolute left-0 top-1.5 bottom-0 w-px bg-border-light dark:bg-border-dark"></div>
                <div className="z-10 mt-1.5 size-2 rounded-full bg-primary ring-2 ring-surface-light dark:ring-surface-dark"></div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-xs font-medium text-text-main dark:text-white">当前版本</span>
                  <span className="text-[10px] text-text-secondary dark:text-gray-400">刚刚 • 自动保存</span>
                </div>
              </div>
              <div className="flex items-start gap-3 relative pl-2 group cursor-pointer opacity-70 hover:opacity-100 transition-opacity">
                <div className="absolute left-0 top-1.5 bottom-0 w-px bg-border-light dark:bg-border-dark"></div>
                <div className="z-10 mt-1.5 size-2 rounded-full bg-border-dark/50 ring-2 ring-surface-light dark:ring-surface-dark"></div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-xs font-medium text-text-main dark:text-white">Draft v4</span>
                  <span className="text-[10px] text-text-secondary dark:text-gray-400">10 分钟前</span>
                </div>
              </div>
              <div className="flex items-start gap-3 relative pl-2 group cursor-pointer opacity-70 hover:opacity-100 transition-opacity">
                <div className="z-10 mt-1.5 size-2 rounded-full bg-border-dark/50 ring-2 ring-surface-light dark:ring-surface-dark"></div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-xs font-medium text-text-main dark:text-white">Draft v3</span>
                  <span className="text-[10px] text-text-secondary dark:text-gray-400">1 小时前</span>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Center: Editor Area */}
        <div className="relative flex flex-1 flex-col overflow-hidden bg-background-light dark:bg-background-dark">
          {/* Editor Toolbar */}
          <div className="flex h-12 items-center justify-between border-b border-border-light bg-surface-light px-4 shadow-sm z-[5] shrink-0 dark:bg-surface-dark dark:border-border-dark">
            <div className="flex items-center gap-1 overflow-x-auto text-text-secondary scrollbar-hide">
              <button className="rounded p-1.5 hover:bg-gray-100 hover:text-text-main dark:hover:bg-gray-800 dark:hover:text-white" title="Bold (⌘B)"><span className="material-symbols-outlined text-[20px]">format_bold</span></button>
              <button className="rounded p-1.5 hover:bg-gray-100 hover:text-text-main dark:hover:bg-gray-800 dark:hover:text-white" title="Italic (⌘I)"><span className="material-symbols-outlined text-[20px]">format_italic</span></button>
              <button className="rounded p-1.5 hover:bg-gray-100 hover:text-text-main dark:hover:bg-gray-800 dark:hover:text-white" title="Underline (⌘U)"><span className="material-symbols-outlined text-[20px]">format_underlined</span></button>
              <button className="rounded p-1.5 hover:bg-gray-100 hover:text-text-main dark:hover:bg-gray-800 dark:hover:text-white" title="Strikethrough"><span className="material-symbols-outlined text-[20px]">format_strikethrough</span></button>
              <div className="h-4 w-px bg-border-light mx-2 dark:bg-border-dark"></div>
              <button className="rounded p-1.5 hover:bg-gray-100 hover:text-text-main dark:hover:bg-gray-800 dark:hover:text-white" title="Heading 1"><span className="material-symbols-outlined text-[20px]">format_h1</span></button>
              <button className="rounded p-1.5 hover:bg-gray-100 hover:text-text-main dark:hover:bg-gray-800 dark:hover:text-white" title="Heading 2"><span className="material-symbols-outlined text-[20px]">format_h2</span></button>
              <button className="rounded p-1.5 hover:bg-gray-100 hover:text-text-main dark:hover:bg-gray-800 dark:hover:text-white" title="Quote"><span className="material-symbols-outlined text-[20px]">format_quote</span></button>
              <div className="h-4 w-px bg-border-light mx-2 dark:bg-border-dark"></div>
              <button className="rounded p-1.5 hover:bg-gray-100 hover:text-text-main dark:hover:bg-gray-800 dark:hover:text-white" title="Code Block"><span className="material-symbols-outlined text-[20px]">code</span></button>
              <button className="rounded p-1.5 hover:bg-gray-100 hover:text-text-main dark:hover:bg-gray-800 dark:hover:text-white" title="Link"><span className="material-symbols-outlined text-[20px]">link</span></button>
              <button className="rounded p-1.5 hover:bg-gray-100 hover:text-text-main dark:hover:bg-gray-800 dark:hover:text-white" title="Image"><span className="material-symbols-outlined text-[20px]">image</span></button>
              <button className="rounded p-1.5 hover:bg-gray-100 hover:text-text-main dark:hover:bg-gray-800 dark:hover:text-white" title="Table"><span className="material-symbols-outlined text-[20px]">table_chart</span></button>
              <button className="rounded p-1.5 hover:bg-gray-100 hover:text-text-main dark:hover:bg-gray-800 dark:hover:text-white" title="Math Formula"><span className="material-symbols-outlined text-[20px]">functions</span></button>
              <button className="rounded p-1.5 hover:bg-gray-100 hover:text-text-main dark:hover:bg-gray-800 dark:hover:text-white" title="Footnote"><span className="material-symbols-outlined text-[20px]">vertical_align_bottom</span></button>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 text-xs text-text-secondary dark:text-gray-400">
                <span className="material-symbols-outlined text-[14px]">cloud_done</span>
                <span>已保存</span>
              </div>
            </div>
          </div>

          {/* Editor Canvas */}
          <div className="flex-1 overflow-y-auto p-4 md:p-8 relative bg-background-light dark:bg-background-dark custom-scrollbar" id="editor-container">
            <div className="mx-auto max-w-[850px] min-h-[900px] rounded-xl bg-surface-light p-16 shadow-sm border border-border-light dark:bg-surface-dark dark:border-border-dark relative">
              <input 
                className="w-full text-4xl font-bold text-text-main bg-transparent border-none p-0 focus:ring-0 placeholder-gray-300 mb-8 leading-tight dark:text-white" 
                placeholder="文档标题" 
                type="text" 
                defaultValue="关于人工通用智能（AGI）的未来展望"
              />
              <div className="editor-content text-lg text-text-main dark:text-gray-200 font-body">
                <h2>引言：AGI 的定义</h2>
                <p>
                    人工通用智能（Artificial General Intelligence, AGI）指的是具备与人类同等甚至超越人类的智能水平，能够像人类一样跨领域学习、推理、解决复杂问题的人工智能系统。
                </p>
                <div className="relative group inline">
                    <span className="bg-[#8b5cf6]/20 dark:bg-[#8b5cf6]/30 rounded selection:bg-blue-200 px-0.5">与狭义人工智能（ANI）不同，ANI 通常专注于特定任务（如围棋、图像识别），而 AGI 具有极强的泛化能力。</span>
                    <div className="absolute left-1/2 -translate-x-1/2 -top-14 z-50 flex flex-col items-center">
                        <div className="flex items-center gap-1 rounded-full bg-surface-dark px-1.5 py-1 text-white shadow-xl dark:bg-white dark:text-surface-dark ring-1 ring-black/10">
                            <button className="flex items-center gap-1 rounded-full px-2 py-1 hover:bg-white/10 dark:hover:bg-black/10 text-xs font-medium whitespace-nowrap transition-colors">
                                <span className="material-symbols-outlined text-[14px] text-[#8b5cf6]">auto_fix</span> 润色
                            </button>
                            <div className="h-3 w-px bg-white/20 dark:bg-black/20"></div>
                            <button className="flex items-center gap-1 rounded-full px-2 py-1 hover:bg-white/10 dark:hover:bg-black/10 text-xs font-medium whitespace-nowrap transition-colors">
                                <span className="material-symbols-outlined text-[14px]">short_text</span> 摘要
                            </button>
                            <button className="flex items-center gap-1 rounded-full px-2 py-1 hover:bg-white/10 dark:hover:bg-black/10 text-xs font-medium whitespace-nowrap transition-colors">
                                <span className="material-symbols-outlined text-[14px]">translate</span> 翻译
                            </button>
                            <button className="flex items-center gap-1 rounded-full px-2 py-1 hover:bg-white/10 dark:hover:bg-black/10 text-xs font-medium whitespace-nowrap transition-colors">
                                <span className="material-symbols-outlined text-[14px]">help</span> 解释
                            </button>
                        </div>
                        <div className="h-2 w-2 rotate-45 bg-surface-dark dark:bg-white -mt-1"></div>
                    </div>
                </div>
                
                <h2>技术架构演进</h2>
                <p>
                    当前，基于 Transformer 架构的大语言模型（LLM）被认为是通往 AGI 的重要路径之一。通过海量数据的预训练和人类反馈强化学习（RLHF），模型展现出了惊人的涌现能力。
                </p>
                <p className="relative">
                    然而，单纯的语言模型可能不足以实现真正的 AGI，未来的发展方向可能包括<span className="text-[#8b5cf6] font-medium">/</span><span className="h-5 w-0.5 align-middle inline-block bg-[#8b5cf6] cursor-blink ml-0.5"></span>
                </p>
                
                {/* Floating AI Menu */}
                <div className="absolute left-12 top-[420px] z-50 w-80 overflow-hidden rounded-xl border border-border-light bg-surface-light shadow-2xl dark:bg-surface-dark dark:border-border-dark ring-1 ring-black/5">
                    <div className="bg-gradient-to-r from-[#8b5cf6]/10 to-primary/10 px-3 py-2 text-xs font-bold text-[#8b5cf6] uppercase tracking-wider flex items-center gap-2">
                        <span className="material-symbols-outlined text-[14px]">magic_button</span> AI 协作编写
                    </div>
                    <div className="p-1 max-h-[350px] overflow-y-auto custom-scrollbar">
                        <button className="flex w-full items-center gap-3 rounded-lg bg-[#8b5cf6]/5 px-3 py-2 text-left text-sm text-text-main hover:bg-[#8b5cf6]/10 dark:text-white transition-colors group border border-transparent hover:border-[#8b5cf6]/20">
                            <div className="flex size-6 items-center justify-center rounded-md bg-white text-[#8b5cf6] shadow-sm dark:bg-surface-dark">
                                <span className="material-symbols-outlined text-[16px]">draw</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="font-medium group-hover:text-[#8b5cf6]">续写下一段</span>
                                <span className="text-[10px] text-text-secondary dark:text-gray-400">AI 自动补全后续内容</span>
                            </div>
                        </button>
                        <div className="mt-1 flex flex-col gap-0.5">
                            <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm text-text-main hover:bg-background-light dark:text-white dark:hover:bg-white/5 transition-colors">
                                <span className="material-symbols-outlined text-[18px] text-blue-500">expand</span>
                                <span className="font-medium">基于 [关键词] 扩写</span>
                            </button>
                            <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm text-text-main hover:bg-background-light dark:text-white dark:hover:bg-white/5 transition-colors">
                                <span className="material-symbols-outlined text-[18px] text-green-500">summarize</span>
                                <span className="font-medium">总结当前部分</span>
                            </button>
                            <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm text-text-main hover:bg-background-light dark:text-white dark:hover:bg-white/5 transition-colors">
                                <span className="material-symbols-outlined text-[18px] text-purple-500">auto_awesome</span>
                                <div className="flex flex-col">
                                    <span className="font-medium">润色风格</span>
                                    <span className="text-[10px] text-text-secondary dark:text-gray-400">学术 / 正式 / 简洁</span>
                                </div>
                            </button>
                            <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm text-text-main hover:bg-background-light dark:text-white dark:hover:bg-white/5 transition-colors">
                                <span className="material-symbols-outlined text-[18px] text-pink-500">format_list_bulleted</span>
                                <span className="font-medium">生成大纲</span>
                            </button>
                            <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm text-text-main hover:bg-background-light dark:text-white dark:hover:bg-white/5 transition-colors">
                                <span className="material-symbols-outlined text-[18px] text-teal-500">short_text</span>
                                <span className="font-medium">生成摘要</span>
                            </button>
                            <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm text-text-main hover:bg-background-light dark:text-white dark:hover:bg-white/5 transition-colors">
                                <span className="material-symbols-outlined text-[18px] text-orange-500">translate</span>
                                <span className="font-medium">翻译内容</span>
                            </button>
                            <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm text-text-main hover:bg-background-light dark:text-white dark:hover:bg-white/5 transition-colors">
                                <span className="material-symbols-outlined text-[18px] text-indigo-500">spellcheck</span>
                                <span className="font-medium">检查语法和拼写</span>
                            </button>
                        </div>
                    </div>
                    <div className="border-t border-border-light bg-background-light px-3 py-1.5 text-[10px] text-text-secondary dark:bg-white/5 dark:border-border-dark flex justify-between">
                        <span>↑↓ 导航</span>
                        <span>↵ 确认</span>
                    </div>
                </div>
                <p></p>
              </div>
            </div>
            
            {/* AI Suggestion Toast */}
            <div className="absolute bottom-6 right-6 lg:right-12 max-w-sm animate-bounce-in">
                <div className="flex flex-col gap-2 rounded-xl border border-[#8b5cf6]/30 bg-white p-4 shadow-xl shadow-[#8b5cf6]/10 dark:bg-surface-dark dark:border-[#8b5cf6]/20">
                    <div className="flex items-start gap-3">
                        <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#8b5cf6]/10 text-[#8b5cf6]">
                            <span className="material-symbols-outlined text-[18px]">lightbulb</span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <h4 className="text-sm font-bold text-text-main dark:text-white">AI 写作建议</h4>
                            <p className="text-xs text-text-secondary leading-relaxed dark:text-gray-400">检测到您正在讨论 "多模态融合"。建议补充关于 Gemini 或 GPT-4o 的最新案例，以增强文章时效性。</p>
                        </div>
                        <button className="text-text-secondary hover:text-text-main dark:text-gray-400 dark:hover:text-white"><span className="material-symbols-outlined text-[16px]">close</span></button>
                    </div>
                    <div className="flex gap-2 pl-11">
                        <button className="rounded-lg bg-[#8b5cf6] px-3 py-1.5 text-xs font-medium text-white hover:bg-[#8b5cf6]/90 transition-colors">生成案例补充</button>
                    </div>
                </div>
            </div>
            <div className="h-24"></div>
          </div>
        </div>

        {/* Right Sidebar: Toolkit */}
        <aside className="flex w-72 flex-col border-l border-border-light bg-surface-light dark:bg-surface-dark dark:border-border-dark hidden xl:flex">
          <div className="flex items-center gap-2 border-b border-border-light px-6 py-4 dark:border-border-dark bg-background-light/30 dark:bg-white/5">
            <span className="material-symbols-outlined text-[#8b5cf6]">handyman</span>
            <h3 className="text-sm font-bold text-text-main dark:text-white">AI 工具箱</h3>
          </div>
          <div className="flex-1 overflow-y-auto p-4">
            <div className="mb-6">
              <h4 className="mb-3 text-xs font-bold text-text-secondary uppercase tracking-wider dark:text-gray-500">常用工具</h4>
              <div className="grid grid-cols-2 gap-2">
                <button className="flex flex-col items-center gap-2 rounded-lg border border-border-light bg-white p-3 hover:border-[#8b5cf6] hover:shadow-sm dark:bg-surface-dark dark:border-border-dark transition-all">
                  <span className="material-symbols-outlined text-green-500">check_circle</span>
                  <span className="text-xs font-medium text-text-main dark:text-white">语法纠错</span>
                </button>
                <button className="flex flex-col items-center gap-2 rounded-lg border border-border-light bg-white p-3 hover:border-[#8b5cf6] hover:shadow-sm dark:bg-surface-dark dark:border-border-dark transition-all">
                  <span className="material-symbols-outlined text-blue-500">short_text</span>
                  <span className="text-xs font-medium text-text-main dark:text-white">全文摘要</span>
                </button>
                <button className="flex flex-col items-center gap-2 rounded-lg border border-border-light bg-white p-3 hover:border-[#8b5cf6] hover:shadow-sm dark:bg-surface-dark dark:border-border-dark transition-all">
                  <span className="material-symbols-outlined text-purple-500">style</span>
                  <span className="text-xs font-medium text-text-main dark:text-white">风格润色</span>
                </button>
                <button className="flex flex-col items-center gap-2 rounded-lg border border-border-light bg-white p-3 hover:border-[#8b5cf6] hover:shadow-sm dark:bg-surface-dark dark:border-border-dark transition-all">
                  <span className="material-symbols-outlined text-orange-500">translate</span>
                  <span className="text-xs font-medium text-text-main dark:text-white">翻译文档</span>
                </button>
              </div>
            </div>
            <div>
              <h4 className="mb-3 text-xs font-bold text-text-secondary uppercase tracking-wider dark:text-gray-500">任务记录</h4>
              <div className="flex flex-col gap-3">
                <div className="relative flex gap-3 pl-2">
                  <div className="absolute left-0 top-1.5 h-full w-px bg-border-light dark:bg-border-dark"></div>
                  <div className="z-10 flex size-2 shrink-0 translate-y-2 rounded-full bg-green-500 ring-4 ring-surface-light dark:ring-surface-dark"></div>
                  <div className="flex flex-1 flex-col gap-1 rounded-lg bg-background-light p-3 dark:bg-white/5">
                    <div className="flex justify-between items-start">
                      <span className="text-xs font-bold text-text-main dark:text-white">段落润色</span>
                      <span className="text-[10px] text-text-secondary dark:text-gray-400">刚刚</span>
                    </div>
                    <p className="text-[10px] text-text-secondary dark:text-gray-400">对“技术架构演进”部分进行了学术风格润色。</p>
                  </div>
                </div>
                <div className="relative flex gap-3 pl-2 opacity-60">
                  <div className="absolute left-0 top-1.5 h-full w-px bg-border-light dark:bg-border-dark"></div>
                  <div className="z-10 flex size-2 shrink-0 translate-y-2 rounded-full bg-gray-400 ring-4 ring-surface-light dark:ring-surface-dark"></div>
                  <div className="flex flex-1 flex-col gap-1 rounded-lg bg-white border border-border-light p-3 dark:bg-surface-dark dark:border-border-dark">
                    <span className="text-xs font-medium text-text-main dark:text-white">生成大纲</span>
                    <span className="text-[10px] text-text-secondary dark:text-gray-400">30分钟前</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};