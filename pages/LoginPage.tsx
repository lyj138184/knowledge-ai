import React, { useState } from 'react';
import { Page } from '../types';

interface LoginPageProps {
  onNavigate: (page: Page) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate login
    setTimeout(() => {
      setIsLoading(false);
      onNavigate(Page.DASHBOARD);
    }, 1000);
  };

  const handleGithubLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onNavigate(Page.DASHBOARD);
    }, 1500);
  }

  return (
    <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8 bg-background-light dark:bg-background-dark h-full overflow-y-auto">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="flex items-center justify-center rounded-xl bg-primary/10 p-3 text-primary">
            <span className="material-symbols-outlined text-[32px]">auto_stories</span>
          </div>
        </div>
        <h2 className="mt-6 text-center font-display text-3xl font-bold tracking-tight text-text-main dark:text-white">
          登录您的账户
        </h2>
        <p className="mt-2 text-center text-sm text-text-secondary dark:text-gray-400">
          还没有账户？{' '}
          <button onClick={() => onNavigate(Page.REGISTER)} className="font-medium text-primary hover:text-primary-dark transition-colors">
            立即注册
          </button>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-surface-light px-4 py-8 shadow-xl sm:rounded-xl sm:px-10 border border-border-light dark:bg-surface-dark dark:border-border-dark">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-text-main dark:text-white">
                邮箱地址
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full appearance-none rounded-lg border border-border-light bg-background-light px-3 py-2 placeholder-text-secondary shadow-sm focus:border-primary focus:outline-none focus:ring-primary sm:text-sm dark:border-border-dark dark:bg-background-dark dark:text-white dark:placeholder-gray-500"
                  placeholder="例如：alex@example.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-text-main dark:text-white">
                密码
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full appearance-none rounded-lg border border-border-light bg-background-light px-3 py-2 placeholder-text-secondary shadow-sm focus:border-primary focus:outline-none focus:ring-primary sm:text-sm dark:border-border-dark dark:bg-background-dark dark:text-white dark:placeholder-gray-500"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary dark:border-gray-600 dark:bg-gray-700"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-text-main dark:text-gray-300">
                  记住我
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-primary hover:text-primary-dark">
                  忘记密码?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="flex w-full justify-center rounded-lg border border-transparent bg-primary px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-primary/25 hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed transition-all"
              >
                {isLoading ? (
                  <span className="material-symbols-outlined animate-spin text-[20px]">sync</span>
                ) : (
                  '登录'
                )}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border-light dark:border-border-dark" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-surface-light px-2 text-text-secondary dark:bg-surface-dark dark:text-gray-400">
                  或者继续使用
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-3">
              <button 
                onClick={handleGithubLogin}
                className="inline-flex w-full justify-center items-center rounded-lg border border-border-light bg-surface-light py-2.5 px-4 text-sm font-medium text-text-secondary shadow-sm hover:bg-background-light dark:border-border-dark dark:bg-surface-dark dark:text-gray-300 dark:hover:bg-white/5 transition-all"
              >
                <img className="h-5 w-5 dark:invert" src="https://www.svgrepo.com/show/512317/github-142.svg" alt="GitHub" />
                <span className="ml-2">GitHub</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};