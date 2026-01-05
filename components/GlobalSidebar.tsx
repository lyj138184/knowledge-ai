import React from 'react';
import { Page, SidebarItem } from '../types';

interface GlobalSidebarProps {
  activePage: Page;
  onNavigate: (page: Page) => void;
}

const ITEMS: SidebarItem[] = [
  { icon: 'dashboard', label: '仪表盘', page: Page.DASHBOARD },
  { icon: 'lightbulb', label: '知识胶囊', page: Page.KNOWLEDGE_CAPSULES },
  { icon: 'science', label: 'RAG 实验室', page: Page.RAG_LAB, filled: true },
  { icon: 'library_books', label: '知识库管理', page: Page.KNOWLEDGE_BASE },
  { icon: 'edit_note', label: 'AI 协同编辑器', page: Page.AI_EDITOR },
  { icon: 'hub', label: '知识图谱', page: Page.KNOWLEDGE_GRAPH },
  { icon: 'forum', label: '智能问答', page: Page.CHAT, filled: true },
  { icon: 'settings_input_component', label: '数据源集成', page: Page.INTEGRATIONS },
  { icon: 'support_agent', label: 'Agent 管理', page: Page.AGENT_MANAGEMENT, filled: true },
  { icon: 'settings', label: '设置', page: Page.SETTINGS },
];

export const GlobalSidebar: React.FC<GlobalSidebarProps> = ({ activePage, onNavigate }) => {
  return (
    <aside className="hidden md:flex flex-col w-64 shrink-0 border-r border-border-light bg-surface-light h-full dark:bg-surface-dark dark:border-border-dark z-20">
      <div className="flex h-16 items-center gap-3 border-b border-border-light px-6 dark:border-border-dark shrink-0">
        <div className="flex items-center justify-center rounded bg-primary/10 p-1.5 text-primary">
          <span className="material-symbols-outlined">auto_stories</span>
        </div>
        <h1 className="font-display text-lg font-bold tracking-tight text-text-main dark:text-white">Knowledge AI</h1>
      </div>

      <div className="flex flex-1 flex-col justify-between overflow-y-auto p-4 custom-scrollbar">
        <nav className="flex flex-col gap-2">
          {ITEMS.map((item) => {
            const isActive = activePage === item.page;
            return (
              <button
                key={item.page}
                onClick={() => onNavigate(item.page)}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors text-left ${
                  isActive
                    ? 'bg-primary/10 text-primary'
                    : 'text-text-secondary hover:bg-background-light hover:text-text-main dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white'
                }`}
              >
                <span className={`material-symbols-outlined ${isActive && item.filled ? 'fill' : ''}`}>
                  {item.icon}
                </span>
                <span className="font-medium text-sm">{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="flex flex-col gap-4 mt-auto">
          <div className="flex items-center justify-between gap-2 border-t border-border-light pt-4 dark:border-border-dark">
            <div className="flex items-center gap-3">
              <div
                className="size-10 rounded-full bg-cover bg-center"
                style={{ backgroundImage: "url('https://picsum.photos/200/200')" }}
              ></div>
              <div className="flex flex-col">
                <p className="text-sm font-bold text-text-main dark:text-white">Alex Morgan</p>
                <p className="text-xs text-text-secondary dark:text-gray-400">个人专业版</p>
              </div>
            </div>
            <button 
              onClick={() => onNavigate(Page.LOGIN)}
              className="text-text-secondary hover:text-primary dark:text-gray-400 dark:hover:text-white transition-colors p-1 rounded" 
              title="退出登录"
            >
              <span className="material-symbols-outlined text-[20px]">logout</span>
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};