import React, { useState, useEffect } from 'react';
import { Page } from '../types';

interface RegisterPageProps {
  onNavigate: (page: Page) => void;
}

export const RegisterPage: React.FC<RegisterPageProps> = ({ onNavigate }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    graphicCode: '',
    emailCode: '',
    password: '',
    agreeTerms: false
  });
  
  // States for interaction
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [generatedGraphicCode, setGeneratedGraphicCode] = useState('A7X2'); // Mock initial code
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Timer effect for countdown
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const refreshGraphicCode = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let result = '';
    for (let i = 0; i < 4; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setGeneratedGraphicCode(result);
  };

  const handleSendEmailCode = () => {
    // 1. Validate Email
    if (!formData.email) {
      setErrors({ ...errors, email: '请输入邮箱地址' });
      return;
    }
    // 2. Validate Graphic Code
    if (formData.graphicCode.toUpperCase() !== generatedGraphicCode) {
      setErrors({ ...errors, graphicCode: '图形验证码错误' });
      refreshGraphicCode();
      setFormData({ ...formData, graphicCode: '' });
      return;
    }

    // 3. Clear errors and start countdown
    setErrors({});
    setCountdown(60);
    // Simulate API call
    alert(`模拟：验证码已发送至 ${formData.email}，验证码为 123456`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!formData.name) newErrors.name = '请输入全名';
    if (!formData.email) newErrors.email = '请输入邮箱地址';
    if (formData.emailCode !== '123456') newErrors.emailCode = '邮箱验证码无效 (测试码: 123456)';
    if (!formData.password || formData.password.length < 6) newErrors.password = '密码长度至少为6位';
    if (!formData.agreeTerms) newErrors.terms = '请同意服务条款';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    // Simulate Register API
    setTimeout(() => {
      setIsLoading(false);
      onNavigate(Page.DASHBOARD);
    }, 1500);
  };

  return (
    <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8 bg-background-light dark:bg-background-dark h-full overflow-y-auto custom-scrollbar">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="flex items-center justify-center rounded-xl bg-primary/10 p-3 text-primary">
            <span className="material-symbols-outlined text-[32px]">auto_stories</span>
          </div>
        </div>
        <h2 className="mt-6 text-center font-display text-3xl font-bold tracking-tight text-text-main dark:text-white">
          创建新账户
        </h2>
        <p className="mt-2 text-center text-sm text-text-secondary dark:text-gray-400">
          已有账户？{' '}
          <button onClick={() => onNavigate(Page.LOGIN)} className="font-medium text-primary hover:text-primary-dark transition-colors">
            直接登录
          </button>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md pb-10">
        <div className="bg-surface-light px-4 py-8 shadow-xl sm:rounded-xl sm:px-10 border border-border-light dark:bg-surface-dark dark:border-border-dark">
          <form className="space-y-5" onSubmit={handleSubmit}>
            
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-text-main dark:text-white">
                全名
              </label>
              <div className="mt-1">
                <input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className={`block w-full appearance-none rounded-lg border bg-background-light px-3 py-2 placeholder-text-secondary shadow-sm focus:border-primary focus:outline-none focus:ring-primary sm:text-sm dark:bg-background-dark dark:text-white dark:placeholder-gray-500 ${errors.name ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-border-light dark:border-border-dark'}`}
                />
                {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-text-main dark:text-white">
                邮箱地址
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className={`block w-full appearance-none rounded-lg border bg-background-light px-3 py-2 placeholder-text-secondary shadow-sm focus:border-primary focus:outline-none focus:ring-primary sm:text-sm dark:bg-background-dark dark:text-white dark:placeholder-gray-500 ${errors.email ? 'border-red-500' : 'border-border-light dark:border-border-dark'}`}
                />
                {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
              </div>
            </div>

            {/* Graphic Captcha */}
            <div>
              <label htmlFor="graphicCode" className="block text-sm font-medium text-text-main dark:text-white">
                图形验证码
              </label>
              <div className="mt-1 flex gap-3">
                <input
                  id="graphicCode"
                  type="text"
                  placeholder="输入右侧字符"
                  value={formData.graphicCode}
                  onChange={(e) => setFormData({...formData, graphicCode: e.target.value})}
                  className={`block w-full appearance-none rounded-lg border bg-background-light px-3 py-2 placeholder-text-secondary shadow-sm focus:border-primary focus:outline-none focus:ring-primary sm:text-sm dark:bg-background-dark dark:text-white dark:placeholder-gray-500 ${errors.graphicCode ? 'border-red-500' : 'border-border-light dark:border-border-dark'}`}
                />
                <div 
                  className="flex w-32 shrink-0 cursor-pointer items-center justify-center rounded-lg bg-gray-200 text-lg font-bold tracking-widest text-gray-600 dark:bg-gray-700 dark:text-gray-300 select-none"
                  onClick={refreshGraphicCode}
                  title="点击刷新"
                >
                  {generatedGraphicCode}
                </div>
              </div>
              {errors.graphicCode && <p className="mt-1 text-xs text-red-500">{errors.graphicCode}</p>}
            </div>

            {/* Email Verification Code */}
            <div>
              <label htmlFor="emailCode" className="block text-sm font-medium text-text-main dark:text-white">
                邮箱验证码
              </label>
              <div className="mt-1 flex gap-3">
                <input
                  id="emailCode"
                  type="text"
                  placeholder="输入6位验证码"
                  value={formData.emailCode}
                  onChange={(e) => setFormData({...formData, emailCode: e.target.value})}
                  className={`block w-full appearance-none rounded-lg border bg-background-light px-3 py-2 placeholder-text-secondary shadow-sm focus:border-primary focus:outline-none focus:ring-primary sm:text-sm dark:bg-background-dark dark:text-white dark:placeholder-gray-500 ${errors.emailCode ? 'border-red-500' : 'border-border-light dark:border-border-dark'}`}
                />
                <button
                  type="button"
                  onClick={handleSendEmailCode}
                  disabled={countdown > 0}
                  className="w-32 shrink-0 rounded-lg border border-primary bg-transparent px-3 py-2 text-sm font-medium text-primary hover:bg-primary/5 disabled:border-border-light disabled:text-text-secondary disabled:opacity-50 dark:disabled:border-border-dark"
                >
                  {countdown > 0 ? `${countdown}s 后重发` : '获取验证码'}
                </button>
              </div>
              {errors.emailCode && <p className="mt-1 text-xs text-red-500">{errors.emailCode}</p>}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-text-main dark:text-white">
                设置密码
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className={`block w-full appearance-none rounded-lg border bg-background-light px-3 py-2 placeholder-text-secondary shadow-sm focus:border-primary focus:outline-none focus:ring-primary sm:text-sm dark:bg-background-dark dark:text-white dark:placeholder-gray-500 ${errors.password ? 'border-red-500' : 'border-border-light dark:border-border-dark'}`}
                />
                {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password}</p>}
              </div>
            </div>

            {/* Terms */}
            <div className="flex items-start">
              <div className="flex h-5 items-center">
                <input
                  id="terms"
                  type="checkbox"
                  checked={formData.agreeTerms}
                  onChange={(e) => setFormData({...formData, agreeTerms: e.target.checked})}
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary dark:border-gray-600 dark:bg-gray-700"
                />
              </div>
              <div className="ml-2 text-sm">
                <label htmlFor="terms" className="text-text-secondary dark:text-gray-400">
                  我已阅读并同意{' '}
                  <a href="#" className="font-medium text-primary hover:text-primary-dark">
                    服务条款
                  </a>{' '}
                  和{' '}
                  <a href="#" className="font-medium text-primary hover:text-primary-dark">
                    隐私政策
                  </a>
                </label>
                {errors.terms && <p className="mt-1 text-xs text-red-500">{errors.terms}</p>}
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
                  '立即注册'
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
                  或者使用第三方账号注册
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-3">
              <button className="inline-flex w-full justify-center items-center rounded-lg border border-border-light bg-surface-light py-2.5 px-4 text-sm font-medium text-text-secondary shadow-sm hover:bg-background-light dark:border-border-dark dark:bg-surface-dark dark:text-gray-300 dark:hover:bg-white/5 transition-all">
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