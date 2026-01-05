import React from 'react';

interface HeaderProps {
  title?: string;
  breadcrumbs?: string[];
  showSearch?: boolean;
  extraContent?: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({ title, breadcrumbs, showSearch = true, extraContent }) => {
  return (
    <header className="flex h-16 w-full shrink-0 items-center justify-between border-b border-border-light bg-surface-light px-6 dark:bg-surface-dark dark:border-border-dark z-20">
      <div className="flex items-center gap-4 lg:hidden">
        <button className="text-text-secondary hover:text-text-main dark:text-gray-400 dark:hover:text-white">
          <span className="material-symbols-outlined">menu</span>
        </button>
        <span className="font-display font-bold text-text-main dark:text-white">Knowledge AI</span>
      </div>

      <div className="hidden lg:flex items-center gap-2 text-sm text-text-secondary dark:text-gray-400">
        {breadcrumbs?.map((crumb, index) => (
          <React.Fragment key={index}>
             {index === 0 && <span className="material-symbols-outlined text-[20px]">{crumb === 'RAG 实验室' ? 'science' : 'home'}</span>}
            {index > 0 && <span className="material-symbols-outlined text-[16px]">chevron_right</span>}
            <span className={index === breadcrumbs.length - 1 ? "font-medium text-text-main dark:text-white" : ""}>
              {crumb}
            </span>
          </React.Fragment>
        ))}
      </div>

      <div className="flex items-center gap-6">
        {extraContent}
        {showSearch && (
          <div className="relative hidden sm:block w-96">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary dark:text-gray-400">search</span>
            <input
              className="h-10 w-full rounded-lg border-none bg-background-light pl-10 pr-4 text-sm text-text-main placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary/50 dark:bg-background-dark dark:text-white dark:placeholder-gray-500"
              placeholder="搜索文档或历史问答..."
              type="text"
            />
          </div>
        )}
        <button className="relative flex items-center justify-center rounded-lg p-2 text-text-secondary hover:bg-background-light hover:text-text-main dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white transition-colors">
          <span className="material-symbols-outlined">notifications</span>
          <span className="absolute right-2 top-2 size-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-surface-dark"></span>
        </button>
      </div>
    </header>
  );
};