import React, { useState, useEffect, useRef, useCallback } from 'react';

// --- Simulation Data ---
const MOCK_AI_RESPONSES: Record<string, string> = {
  continue: " 此外，随着计算能力的提升和算法的优化，AGI 有望在医疗诊断、科学研究、甚至艺术创作等领域展现出超越人类的创造力。这不仅将重塑经济结构，也可能重新定义人类在社会中的角色。",
  polish: "人工通用智能（AGI）指具备与人类同等甚至超越人类智能水平的系统。它不仅能跨领域学习和推理，还能像人类一样解决复杂问题。",
  expand: " 举例来说，Gemini 1.5 Pro 在长上下文处理上的突破，以及 GPT-4o 在语音、视觉多模态交互上的流畅度，都展示了向 AGI 迈进的重要一步。这些模型不再局限于单一任务，而是开始展现出跨模态的理解与生成能力。",
  summary: "本段主要讨论了 Transformer 架构和 LLM 在通往 AGI 路径上的重要性，同时也指出了单纯语言模型的局限性。"
};

export const AiEditorPage: React.FC = () => {
  // --- State ---
  const [content, setContent] = useState<string>(`
    <h2>引言：AGI 的定义</h2>
    <p>人工通用智能（Artificial General Intelligence, AGI）指的是具备与人类同等甚至超越人类的智能水平，能够像人类一样跨领域学习、推理、解决复杂问题的人工智能系统。</p>
    <p>与狭义人工智能（ANI）不同，ANI 通常专注于特定任务（如围棋、图像识别），而 AGI 具有极强的泛化能力。</p>
    <h2>技术架构演进</h2>
    <p>当前，基于 Transformer 架构的大语言模型（LLM）被认为是通往 AGI 的重要路径之一。通过海量数据的预训练和人类反馈强化学习（RLHF），模型展现出了惊人的涌现能力。</p>
    <pre># 简单的 Transformer Attention 机制伪代码
def attention(Q, K, V):
    return softmax(Q @ K.T / sqrt(d_k)) @ V</pre>
    <p>然而，单纯的语言模型可能不足以实现真正的 AGI，未来的发展方向可能包括多模态融合与具身智能。</p>
  `);
  
  const [headings, setHeadings] = useState<{ text: string, id: string, level: number }[]>([]);
  const [isAiGenerating, setIsAiGenerating] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving' | 'unsaved'>('saved');
  const [wordCount, setWordCount] = useState(0);

  // Document Action States
  const [isSaveAsModalOpen, setIsSaveAsModalOpen] = useState(false);
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [newTitle, setNewTitle] = useState('');

  // Menus State
  const [slashMenu, setSlashMenu] = useState<{ show: boolean, x: number, y: number } | null>(null);
  const [selectionMenu, setSelectionMenu] = useState<{ show: boolean, x: number, y: number, text: string } | null>(null);
  
  // Refs
  const editorRef = useRef<HTMLDivElement>(null);
  const titleInputRef = useRef<HTMLInputElement>(null);

  // --- Helpers ---
  
  // Parse headings from HTML string
  const updateHeadings = useCallback(() => {
    if (!editorRef.current) return;
    const elements = editorRef.current.querySelectorAll('h1, h2, h3');
    const newHeadings: { text: string, id: string, level: number }[] = [];
    elements.forEach((el, index) => {
      const id = `heading-${index}`;
      el.id = id;
      newHeadings.push({
        text: el.textContent || '',
        id,
        level: parseInt(el.tagName[1])
      });
    });
    setHeadings(newHeadings);
    setWordCount(editorRef.current.innerText.length);
  }, []);

  useEffect(() => {
    updateHeadings();
  }, [content, updateHeadings]);

  // Global Keyboard Shortcuts
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      // Cmd/Ctrl + S
      if ((e.metaKey || e.ctrlKey) && e.key === 's') {
        e.preventDefault();
        handleSave();
      }
    };
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, []);

  // Handle Input Changes
  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    // Don't setContent on every keystroke to avoid cursor jumping in simple contentEditable
    setSaveStatus('unsaved');
    
    // Auto save debounce
    const timeoutId = setTimeout(() => setSaveStatus('saved'), 2000);
    return () => clearTimeout(timeoutId);
  };

  // Keyboard Handling (Slash Menu Trigger)
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === '/') {
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const rect = range.getBoundingClientRect();
        // Adjust coordinates relative to viewport
        setSlashMenu({
          show: true,
          x: rect.left,
          y: rect.bottom + 10
        });
      }
    } else {
      setSlashMenu(null);
    }
  };

  // Selection Handling (Bubble Menu Trigger)
  useEffect(() => {
    const handleSelectionChange = () => {
      const selection = window.getSelection();
      if (selection && !selection.isCollapsed && editorRef.current?.contains(selection.anchorNode)) {
        const text = selection.toString();
        if (text.trim().length > 0) {
          const range = selection.getRangeAt(0);
          const rect = range.getBoundingClientRect();
          setSelectionMenu({
            show: true,
            x: rect.left + (rect.width / 2),
            y: rect.top - 10,
            text
          });
          return;
        }
      }
      setSelectionMenu(null);
    };

    document.addEventListener('selectionchange', handleSelectionChange);
    return () => document.removeEventListener('selectionchange', handleSelectionChange);
  }, []);

  // Editor Commands
  const execCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
  };

  const handleAddLink = () => {
    const url = prompt('请输入链接地址:', 'https://');
    if (url) {
      execCommand('createLink', url);
    }
  };

  const scrollToHeading = (id: string) => {
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  // --- Document Actions Handlers ---

  const handleSave = () => {
    setSaveStatus('saving');
    // Simulate async save
    setTimeout(() => {
      setSaveStatus('saved');
    }, 800);
  };

  const handleSaveAsOpen = () => {
    if (titleInputRef.current) {
        setNewTitle(titleInputRef.current.value);
    }
    setIsSaveAsModalOpen(true);
  };

  const confirmSaveAs = () => {
    if (titleInputRef.current) {
        titleInputRef.current.value = newTitle;
    }
    setIsSaveAsModalOpen(false);
    handleSave();
  };

  const handleExport = (format: 'html' | 'txt' | 'pdf') => {
    setShowExportMenu(false);
    const title = titleInputRef.current?.value || 'document';
    
    if (format === 'pdf') {
        window.print();
        return;
    }

    let data = '';
    let type = '';
    let ext = '';

    if (format === 'html') {
        const style = `<style>body { font-family: sans-serif; max-width: 800px; margin: 2rem auto; line-height: 1.6; color: #333; }</style>`;
        data = `<!DOCTYPE html><html><head><title>${title}</title>${style}</head><body><h1>${title}</h1>${editorRef.current?.innerHTML || ''}</body></html>`;
        type = 'text/html';
        ext = 'html';
    } else if (format === 'txt') {
        data = editorRef.current?.innerText || '';
        type = 'text/plain';
        ext = 'txt';
    }

    const blob = new Blob([data], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title}.${ext}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // AI Simulation Logic
  const triggerAiAction = async (action: 'continue' | 'polish' | 'expand' | 'summary') => {
    // Hide menus
    setSlashMenu(null);
    setSelectionMenu(null);
    setIsAiGenerating(true);

    const selection = window.getSelection();
    let range: Range | null = null;
    if (selection && selection.rangeCount > 0) {
      range = selection.getRangeAt(0);
    }

    // Simulate Network Delay
    await new Promise(r => setTimeout(r, 600));

    const responseText = MOCK_AI_RESPONSES[action] || "AI generated content...";
    let currentText = "";

    // Simulate Streaming
    for (let i = 0; i < responseText.length; i++) {
      await new Promise(r => setTimeout(r, 30)); // Typing speed
      currentText += responseText[i];
      
      if (action === 'polish' && range) {
        // Replace selection
        execCommand('insertText', responseText[i]); // Simplification: real replace is harder with execCommand
      } else {
        // Insert at cursor
         // For React state drive contentEditable, this is tricky. 
         // We will manipulate DOM directly for simulation visual, then sync state.
         if (range) {
           range.deleteContents();
           range.insertNode(document.createTextNode(responseText[i]));
           range.collapse(false); // Move cursor to end
         } else if (editorRef.current) {
            // Append if no focus
            editorRef.current.innerHTML += responseText[i];
         }
      }
    }
    
    // Sync React State
    if (editorRef.current) {
      setContent(editorRef.current.innerHTML);
      updateHeadings();
    }
    setIsAiGenerating(false);
  };

  const handlePolishSelection = () => {
    if (!selectionMenu) return;
    // Replace text logic simulation
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      range.deleteContents(); // Clear current
      triggerAiAction('polish');
    }
  };

  return (
    <div className="flex flex-col h-full bg-background-light dark:bg-background-dark overflow-hidden font-display relative">
      <style>{`
        .editor-content h1 { font-size: 2.25rem; font-weight: 700; margin-bottom: 1.5rem; line-height: 1.2; color: inherit; }
        .editor-content h2 { font-size: 1.5rem; font-weight: 600; margin-top: 2rem; margin-bottom: 1rem; line-height: 1.3; color: inherit; }
        .editor-content p { margin-bottom: 1.25rem; line-height: 1.8; color: inherit; }
        .editor-content ul { list-style-type: disc; padding-left: 1.5rem; margin-bottom: 1.25rem; }
        .editor-content ol { list-style-type: decimal; padding-left: 1.5rem; margin-bottom: 1.25rem; }
        .editor-content blockquote { border-left: 4px solid #e2e8f0; padding-left: 1rem; font-style: italic; color: #64748b; margin-bottom: 1.25rem; }
        .editor-content pre { background-color: #f1f5f9; padding: 1rem; border-radius: 0.5rem; font-family: monospace; font-size: 0.875rem; margin-bottom: 1.25rem; overflow-x: auto; }
        .dark .editor-content pre { background-color: #1e293b; color: #e2e8f0; }
        .editor-content a { color: #3b82f6; text-decoration: underline; cursor: pointer; }
        .editor-content hr { margin: 2rem 0; border: 0; border-top: 1px solid #e2e8f0; }
        .dark .editor-content hr { border-color: #334155; }
        
        .cursor-blink { animation: blink 1s step-end infinite; }
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        
        .animate-bounce-in { animation: bounce-in 0.3s cubic-bezier(0.18, 0.89, 0.32, 1.28) forwards; }
        @keyframes bounce-in { 0% { transform: scale(0.9); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }
        
        /* Hide scrollbar for menu */
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }

        @media print {
            aside, header, .no-print { display: none !important; }
            #editor-container { 
                position: static; 
                overflow: visible; 
                height: auto; 
                padding: 0;
                background: white !important;
                color: black !important;
            }
            #editor-wrapper {
                margin: 0;
                padding: 0;
                border: none;
                box-shadow: none;
                min-height: auto;
                background: white !important;
            }
            .dark #editor-container, .dark #editor-wrapper {
                background: white !important;
                color: black !important;
                border: none !important;
            }
            /* Reset text colors for print */
            .editor-content { color: black !important; }
            .editor-content * { color: black !important; }
            /* Hide UI elements inside editor */
            input[type="text"] { border: none !important; }
        }
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
            <div className="overflow-y-auto p-3 flex-1 custom-scrollbar">
              <div className="flex flex-col gap-1 border-l-2 border-border-light dark:border-gray-700 ml-1 pl-3">
                {headings.length === 0 && <p className="text-xs text-text-secondary dark:text-gray-500">文档中暂无标题</p>}
                {headings.map((h, i) => (
                  <button 
                    key={i}
                    onClick={() => scrollToHeading(h.id)}
                    className={`text-left text-xs py-1 transition-colors truncate w-full ${
                      i === 0 ? 'text-primary font-medium -ml-[14px] pl-[10px] border-l-2 border-primary' : 'text-text-secondary hover:text-text-main dark:text-gray-400 dark:hover:text-white'
                    }`}
                    style={{ paddingLeft: i === 0 ? undefined : `${(h.level - 1) * 8}px` }}
                  >
                    {h.text}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          {/* Document Actions - UPDATED */}
          <div className="flex flex-col border-b border-border-light dark:border-border-dark p-3 gap-2 relative">
            <h3 className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-1">文档操作</h3>
            <button 
                onClick={handleSave}
                className="flex items-center gap-2 rounded px-2 py-1.5 text-xs text-text-main hover:bg-background-light dark:text-gray-300 dark:hover:bg-white/5 transition-colors"
            >
              <span className="material-symbols-outlined text-[16px]">save</span>
              <span>保存文档</span>
              <span className="ml-auto text-[10px] text-text-secondary">⌘S</span>
            </button>
            <button 
                onClick={handleSaveAsOpen}
                className="flex items-center gap-2 rounded px-2 py-1.5 text-xs text-text-main hover:bg-background-light dark:text-gray-300 dark:hover:bg-white/5 transition-colors"
            >
              <span className="material-symbols-outlined text-[16px]">save_as</span>
              <span>另存为...</span>
            </button>
            
            <div className="relative">
                <button 
                    onClick={() => setShowExportMenu(!showExportMenu)}
                    className="flex w-full items-center gap-2 rounded px-2 py-1.5 text-xs text-text-main hover:bg-background-light dark:text-gray-300 dark:hover:bg-white/5 transition-colors"
                >
                <span className="material-symbols-outlined text-[16px]">ios_share</span>
                <span>导出</span>
                <span className={`material-symbols-outlined text-[14px] ml-auto transition-transform ${showExportMenu ? 'rotate-180' : ''}`}>expand_more</span>
                </button>
                
                {showExportMenu && (
                    <div className="absolute left-0 top-full mt-1 w-full rounded-lg bg-surface-light border border-border-light shadow-lg z-20 flex flex-col p-1 dark:bg-surface-dark dark:border-border-dark animate-in fade-in zoom-in-95 duration-100">
                        <button onClick={() => handleExport('pdf')} className="flex items-center gap-2 px-2 py-1.5 text-xs text-text-main hover:bg-background-light rounded dark:text-white dark:hover:bg-white/5 text-left">
                            <span className="material-symbols-outlined text-[14px] text-red-500">picture_as_pdf</span> PDF / 打印
                        </button>
                        <button onClick={() => handleExport('html')} className="flex items-center gap-2 px-2 py-1.5 text-xs text-text-main hover:bg-background-light rounded dark:text-white dark:hover:bg-white/5 text-left">
                            <span className="material-symbols-outlined text-[14px] text-orange-500">html</span> HTML 文件
                        </button>
                        <button onClick={() => handleExport('txt')} className="flex items-center gap-2 px-2 py-1.5 text-xs text-text-main hover:bg-background-light rounded dark:text-white dark:hover:bg-white/5 text-left">
                            <span className="material-symbols-outlined text-[14px] text-gray-500">description</span> 纯文本
                        </button>
                    </div>
                )}
            </div>
          </div>

          <div className="flex flex-col flex-1 min-h-0 bg-background-light/30 dark:bg-surface-dark/50">
            <div className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-background-light dark:hover:bg-white/5">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px] text-text-secondary dark:text-gray-400">history</span>
                <span className="text-xs font-bold text-text-secondary uppercase tracking-wider dark:text-gray-400">历史版本</span>
              </div>
            </div>
            <div className="flex flex-col px-4 gap-3 overflow-y-auto pb-4 custom-scrollbar">
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
            </div>
          </div>
        </aside>

        {/* Center: Editor Area */}
        <div className="relative flex flex-1 flex-col overflow-hidden bg-background-light dark:bg-background-dark">
          {/* Editor Toolbar */}
          <div className="flex h-12 items-center justify-between border-b border-border-light bg-surface-light px-4 shadow-sm z-[5] shrink-0 dark:bg-surface-dark dark:border-border-dark select-none no-print">
            <div className="flex items-center gap-1 overflow-x-auto text-text-secondary scrollbar-hide">
              <button onMouseDown={(e) => {e.preventDefault(); execCommand('undo');}} className="rounded p-1.5 hover:bg-gray-100 hover:text-text-main dark:hover:bg-gray-800 dark:hover:text-white" title="Undo (⌘Z)"><span className="material-symbols-outlined text-[20px]">undo</span></button>
              <button onMouseDown={(e) => {e.preventDefault(); execCommand('redo');}} className="rounded p-1.5 hover:bg-gray-100 hover:text-text-main dark:hover:bg-gray-800 dark:hover:text-white" title="Redo (⌘Shift+Z)"><span className="material-symbols-outlined text-[20px]">redo</span></button>
              <div className="h-4 w-px bg-border-light mx-2 dark:bg-border-dark"></div>
              
              <button onMouseDown={(e) => {e.preventDefault(); execCommand('bold');}} className="rounded p-1.5 hover:bg-gray-100 hover:text-text-main dark:hover:bg-gray-800 dark:hover:text-white" title="Bold (⌘B)"><span className="material-symbols-outlined text-[20px]">format_bold</span></button>
              <button onMouseDown={(e) => {e.preventDefault(); execCommand('italic');}} className="rounded p-1.5 hover:bg-gray-100 hover:text-text-main dark:hover:bg-gray-800 dark:hover:text-white" title="Italic (⌘I)"><span className="material-symbols-outlined text-[20px]">format_italic</span></button>
              <button onMouseDown={(e) => {e.preventDefault(); execCommand('underline');}} className="rounded p-1.5 hover:bg-gray-100 hover:text-text-main dark:hover:bg-gray-800 dark:hover:text-white" title="Underline (⌘U)"><span className="material-symbols-outlined text-[20px]">format_underlined</span></button>
              <button onMouseDown={(e) => {e.preventDefault(); execCommand('strikeThrough');}} className="rounded p-1.5 hover:bg-gray-100 hover:text-text-main dark:hover:bg-gray-800 dark:hover:text-white" title="Strikethrough"><span className="material-symbols-outlined text-[20px]">format_strikethrough</span></button>
              
              <div className="h-4 w-px bg-border-light mx-2 dark:bg-border-dark"></div>
              
              <button onMouseDown={(e) => {e.preventDefault(); execCommand('formatBlock', 'H1');}} className="rounded p-1.5 hover:bg-gray-100 hover:text-text-main dark:hover:bg-gray-800 dark:hover:text-white" title="Heading 1"><span className="material-symbols-outlined text-[20px]">format_h1</span></button>
              <button onMouseDown={(e) => {e.preventDefault(); execCommand('formatBlock', 'H2');}} className="rounded p-1.5 hover:bg-gray-100 hover:text-text-main dark:hover:bg-gray-800 dark:hover:text-white" title="Heading 2"><span className="material-symbols-outlined text-[20px]">format_h2</span></button>
              <button onMouseDown={(e) => {e.preventDefault(); execCommand('formatBlock', 'BLOCKQUOTE');}} className="rounded p-1.5 hover:bg-gray-100 hover:text-text-main dark:hover:bg-gray-800 dark:hover:text-white" title="Quote"><span className="material-symbols-outlined text-[20px]">format_quote</span></button>
              <button onMouseDown={(e) => {e.preventDefault(); execCommand('formatBlock', 'PRE');}} className="rounded p-1.5 hover:bg-gray-100 hover:text-text-main dark:hover:bg-gray-800 dark:hover:text-white" title="Code Block"><span className="material-symbols-outlined text-[20px]">code</span></button>
              
              <div className="h-4 w-px bg-border-light mx-2 dark:bg-border-dark"></div>
              
              <button onMouseDown={(e) => {e.preventDefault(); execCommand('insertUnorderedList');}} className="rounded p-1.5 hover:bg-gray-100 hover:text-text-main dark:hover:bg-gray-800 dark:hover:text-white" title="Bullet List"><span className="material-symbols-outlined text-[20px]">format_list_bulleted</span></button>
              <button onMouseDown={(e) => {e.preventDefault(); execCommand('insertOrderedList');}} className="rounded p-1.5 hover:bg-gray-100 hover:text-text-main dark:hover:bg-gray-800 dark:hover:text-white" title="Numbered List"><span className="material-symbols-outlined text-[20px]">format_list_numbered</span></button>
              
              <div className="h-4 w-px bg-border-light mx-2 dark:bg-border-dark"></div>
              
              <button onMouseDown={(e) => {e.preventDefault(); handleAddLink();}} className="rounded p-1.5 hover:bg-gray-100 hover:text-text-main dark:hover:bg-gray-800 dark:hover:text-white" title="Link"><span className="material-symbols-outlined text-[20px]">link</span></button>
              <button onMouseDown={(e) => {e.preventDefault(); execCommand('insertImage', 'https://picsum.photos/400/300');}} className="rounded p-1.5 hover:bg-gray-100 hover:text-text-main dark:hover:bg-gray-800 dark:hover:text-white" title="Image"><span className="material-symbols-outlined text-[20px]">image</span></button>
              <button onMouseDown={(e) => {e.preventDefault(); execCommand('insertHorizontalRule');}} className="rounded p-1.5 hover:bg-gray-100 hover:text-text-main dark:hover:bg-gray-800 dark:hover:text-white" title="Horizontal Rule"><span className="material-symbols-outlined text-[20px]">horizontal_rule</span></button>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-text-secondary dark:text-gray-500 mr-2">{wordCount} 字</span>
              <div className="flex items-center gap-1 text-xs text-text-secondary dark:text-gray-400">
                {saveStatus === 'saving' ? (
                   <>
                     <span className="material-symbols-outlined text-[14px] animate-spin">sync</span>
                     <span>保存中...</span>
                   </>
                ) : saveStatus === 'saved' ? (
                   <>
                     <span className="material-symbols-outlined text-[14px]">cloud_done</span>
                     <span>已保存</span>
                   </>
                ) : (
                   <>
                     <span className="size-2 bg-yellow-500 rounded-full mr-1"></span>
                     <span>未保存</span>
                   </>
                )}
              </div>
            </div>
          </div>

          {/* Editor Canvas */}
          <div className="flex-1 overflow-y-auto p-4 md:p-8 relative bg-background-light dark:bg-background-dark custom-scrollbar" id="editor-container">
            <div id="editor-wrapper" className="mx-auto max-w-[850px] min-h-[900px] rounded-xl bg-surface-light p-16 shadow-sm border border-border-light dark:bg-surface-dark dark:border-border-dark relative">
              
              <input 
                ref={titleInputRef}
                className="w-full text-4xl font-bold text-text-main bg-transparent border-none p-0 focus:ring-0 placeholder-gray-300 mb-8 leading-tight dark:text-white" 
                placeholder="文档标题" 
                type="text" 
                defaultValue="关于人工通用智能（AGI）的未来展望"
              />
              
              <div 
                ref={editorRef}
                className="editor-content text-lg text-text-main dark:text-gray-200 font-body outline-none min-h-[500px]"
                contentEditable
                suppressContentEditableWarning
                onInput={handleInput}
                onKeyDown={handleKeyDown}
                dangerouslySetInnerHTML={{ __html: content }}
              >
              </div>

              {/* Slash Command Menu */}
              {slashMenu?.show && (
                <div 
                  className="fixed z-50 w-80 overflow-hidden rounded-xl border border-border-light bg-surface-light shadow-2xl dark:bg-surface-dark dark:border-border-dark ring-1 ring-black/5 animate-in fade-in zoom-in-95 duration-150 no-print"
                  style={{ top: slashMenu.y, left: slashMenu.x }}
                >
                    <div className="bg-gradient-to-r from-[#8b5cf6]/10 to-primary/10 px-3 py-2 text-xs font-bold text-[#8b5cf6] uppercase tracking-wider flex items-center gap-2">
                        <span className="material-symbols-outlined text-[14px]">magic_button</span> AI 协作编写
                    </div>
                    <div className="p-1 max-h-[350px] overflow-y-auto custom-scrollbar">
                        <button 
                          onClick={() => triggerAiAction('continue')}
                          className="flex w-full items-center gap-3 rounded-lg bg-[#8b5cf6]/5 px-3 py-2 text-left text-sm text-text-main hover:bg-[#8b5cf6]/10 dark:text-white transition-colors group border border-transparent hover:border-[#8b5cf6]/20"
                        >
                            <div className="flex size-6 items-center justify-center rounded-md bg-white text-[#8b5cf6] shadow-sm dark:bg-surface-dark">
                                <span className="material-symbols-outlined text-[16px]">draw</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="font-medium group-hover:text-[#8b5cf6]">续写下一段</span>
                                <span className="text-[10px] text-text-secondary dark:text-gray-400">AI 自动补全后续内容</span>
                            </div>
                        </button>
                        <div className="mt-1 flex flex-col gap-0.5">
                            <button onClick={() => triggerAiAction('expand')} className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm text-text-main hover:bg-background-light dark:text-white dark:hover:bg-white/5 transition-colors">
                                <span className="material-symbols-outlined text-[18px] text-blue-500">expand</span>
                                <span className="font-medium">扩写内容</span>
                            </button>
                            <button onClick={() => triggerAiAction('summary')} className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm text-text-main hover:bg-background-light dark:text-white dark:hover:bg-white/5 transition-colors">
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
                        </div>
                    </div>
                </div>
              )}

              {/* Selection Bubble Menu */}
              {selectionMenu?.show && (
                <div 
                  className="fixed z-50 flex flex-col items-center animate-in fade-in zoom-in-95 duration-150 transform -translate-x-1/2 no-print"
                  style={{ top: selectionMenu.y - 45, left: selectionMenu.x }}
                >
                   <div className="flex items-center gap-1 rounded-full bg-surface-dark px-1.5 py-1 text-white shadow-xl dark:bg-white dark:text-surface-dark ring-1 ring-black/10">
                        <button 
                          onClick={handlePolishSelection}
                          className="flex items-center gap-1 rounded-full px-2 py-1 hover:bg-white/10 dark:hover:bg-black/10 text-xs font-medium whitespace-nowrap transition-colors"
                        >
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
                    <div className="h-2 w-2 rotate-45 bg-surface-dark dark:bg-white -mt-1 shadow-sm"></div>
                </div>
              )}

              {/* Generating Indicator */}
              {isAiGenerating && (
                <div className="absolute top-4 right-4 flex items-center gap-2 bg-surface-light dark:bg-surface-dark shadow-lg rounded-full px-3 py-1.5 border border-border-light dark:border-border-dark animate-pulse no-print">
                   <span className="material-symbols-outlined text-[#8b5cf6] animate-spin text-[18px]">sync</span>
                   <span className="text-xs font-bold text-text-main dark:text-white">AI 正在思考...</span>
                </div>
              )}

            </div>
            
            {/* AI Suggestion Toast */}
            <div className="absolute bottom-6 right-6 lg:right-12 max-w-sm animate-bounce-in no-print">
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
                        <button 
                          onClick={() => triggerAiAction('expand')}
                          className="rounded-lg bg-[#8b5cf6] px-3 py-1.5 text-xs font-medium text-white hover:bg-[#8b5cf6]/90 transition-colors"
                        >
                          生成案例补充
                        </button>
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
                <button onClick={() => triggerAiAction('polish')} className="flex flex-col items-center gap-2 rounded-lg border border-border-light bg-white p-3 hover:border-[#8b5cf6] hover:shadow-sm dark:bg-surface-dark dark:border-border-dark transition-all">
                  <span className="material-symbols-outlined text-green-500">check_circle</span>
                  <span className="text-xs font-medium text-text-main dark:text-white">语法纠错</span>
                </button>
                <button onClick={() => triggerAiAction('summary')} className="flex flex-col items-center gap-2 rounded-lg border border-border-light bg-white p-3 hover:border-[#8b5cf6] hover:shadow-sm dark:bg-surface-dark dark:border-border-dark transition-all">
                  <span className="material-symbols-outlined text-blue-500">short_text</span>
                  <span className="text-xs font-medium text-text-main dark:text-white">全文摘要</span>
                </button>
                <button onClick={() => triggerAiAction('polish')} className="flex flex-col items-center gap-2 rounded-lg border border-border-light bg-white p-3 hover:border-[#8b5cf6] hover:shadow-sm dark:bg-surface-dark dark:border-border-dark transition-all">
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

      {/* Save As Modal */}
      {isSaveAsModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200" onClick={() => setIsSaveAsModalOpen(false)}>
            <div className="bg-surface-light dark:bg-surface-dark w-full max-w-sm rounded-xl shadow-2xl border border-border-light dark:border-border-dark p-6" onClick={e => e.stopPropagation()}>
                <h3 className="text-lg font-bold text-text-main dark:text-white mb-4">另存为</h3>
                <div className="mb-4">
                    <label className="block text-xs font-medium text-text-secondary dark:text-gray-400 mb-1">文档名称</label>
                    <input 
                        className="w-full rounded-lg border-border-light bg-background-light px-3 py-2 text-sm focus:border-primary focus:ring-primary dark:border-border-dark dark:bg-background-dark dark:text-white"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        autoFocus
                        onKeyDown={(e) => e.key === 'Enter' && confirmSaveAs()}
                    />
                </div>
                <div className="flex justify-end gap-2">
                    <button onClick={() => setIsSaveAsModalOpen(false)} className="px-3 py-1.5 rounded-lg text-sm text-text-secondary hover:bg-background-light dark:text-gray-400 dark:hover:bg-white/5">取消</button>
                    <button onClick={confirmSaveAs} className="px-3 py-1.5 rounded-lg bg-primary text-sm font-bold text-white hover:bg-primary-dark shadow-sm">确认</button>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};