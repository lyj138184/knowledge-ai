import React from 'react';
import { Header } from '../components/Header';

export const SettingsPage: React.FC = () => {
  return (
    <div className="flex flex-col h-full bg-background-light dark:bg-background-dark overflow-hidden font-display">
      <Header breadcrumbs={['设置']} showSearch={false} extraContent={
          <div className="relative hidden sm:block w-96">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary dark:text-gray-400">search</span>
            <input 
              className="h-10 w-full rounded-lg border-none bg-background-light pl-10 pr-4 text-sm text-text-main placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary/50 dark:bg-background-dark dark:text-white dark:placeholder-gray-500" 
              placeholder="搜索设置..." 
              type="text"
            />
          </div>
      } />
      
      <div className="flex-1 overflow-y-auto bg-background-light/50 p-6 dark:bg-background-dark/50 lg:p-10 custom-scrollbar">
        <div className="mx-auto flex max-w-[1000px] flex-col gap-8">
          <div className="flex flex-col gap-2">
            <h2 className="font-display text-3xl font-bold text-text-main dark:text-white">设置</h2>
            <p className="text-text-secondary dark:text-gray-400">全面管理您的账户、外观、知识库与AI能力。</p>
          </div>

          {/* Account Settings */}
          <section className="rounded-xl border border-border-light bg-surface-light shadow-sm dark:border-border-dark dark:bg-surface-dark">
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
                    <input className="w-full rounded-lg border-border-light bg-background-light px-4 py-2.5 text-sm text-text-main placeholder-text-secondary focus:border-primary focus:ring-primary dark:border-border-dark dark:bg-background-dark dark:text-white" type="text" defaultValue="Alex Morgan"/>
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-text-main dark:text-white">邮箱地址</label>
                    <div className="relative">
                      <input className="w-full rounded-lg border-border-light bg-background-light px-4 py-2.5 text-sm text-text-secondary cursor-not-allowed opacity-75 dark:border-border-dark dark:bg-background-dark dark:text-gray-400" disabled type="email" defaultValue="alex.morgan@example.com"/>
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
                      <input className="peer sr-only" type="checkbox" />
                      <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 dark:bg-gray-700 dark:border-gray-600"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-text-main dark:text-white">手机绑定</p>
                      <p className="text-xs text-text-secondary dark:text-gray-400">已绑定: +86 138****0000</p>
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
                    <button className="rounded bg-surface-light px-3 py-1.5 text-sm font-medium text-text-main shadow-sm ring-1 ring-inset ring-border-light hover:bg-gray-50 dark:bg-surface-dark dark:text-white dark:ring-border-dark dark:hover:bg-white/5">管理订阅</button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Appearance Settings */}
          <section className="rounded-xl border border-border-light bg-surface-light shadow-sm dark:border-border-dark dark:bg-surface-dark">
            <div className="border-b border-border-light px-6 py-4 dark:border-border-dark flex items-center gap-2">
              <span className="material-symbols-outlined text-purple-500">palette</span>
              <h3 className="font-display text-lg font-bold text-text-main dark:text-white">外观设置</h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                <div className="flex flex-col gap-3">
                  <label className="text-sm font-medium text-text-main dark:text-white">主题偏好</label>
                  <div className="flex gap-4">
                    <label className="cursor-pointer">
                      <input className="peer sr-only" name="theme" type="radio" value="light"/>
                      <div className="flex w-full flex-col gap-2 rounded-xl border border-border-light p-2 peer-checked:border-primary peer-checked:bg-primary/5 hover:bg-background-light dark:border-border-dark dark:peer-checked:border-primary dark:hover:bg-white/5 transition-all">
                        <div className="h-12 w-full rounded-lg bg-[#f6f7f8] border border-gray-200"></div>
                        <span className="text-center text-xs font-medium text-text-main dark:text-white">浅色</span>
                      </div>
                    </label>
                    <label className="cursor-pointer">
                      <input className="peer sr-only" name="theme" type="radio" value="dark"/>
                      <div className="flex w-full flex-col gap-2 rounded-xl border border-border-light p-2 peer-checked:border-primary peer-checked:bg-primary/5 hover:bg-background-light dark:border-border-dark dark:peer-checked:border-primary dark:hover:bg-white/5 transition-all">
                        <div className="h-12 w-full rounded-lg bg-[#101922] border border-gray-700"></div>
                        <span className="text-center text-xs font-medium text-text-main dark:text-white">深色</span>
                      </div>
                    </label>
                    <label className="cursor-pointer">
                      <input defaultChecked className="peer sr-only" name="theme" type="radio" value="system"/>
                      <div className="flex w-full flex-col gap-2 rounded-xl border border-border-light p-2 peer-checked:border-primary peer-checked:bg-primary/5 hover:bg-background-light dark:border-border-dark dark:peer-checked:border-primary dark:hover:bg-white/5 transition-all">
                        <div className="h-12 w-full rounded-lg bg-gradient-to-r from-[#f6f7f8] to-[#101922] border border-gray-300 dark:border-gray-600"></div>
                        <span className="text-center text-xs font-medium text-text-main dark:text-white">跟随系统</span>
                      </div>
                    </label>
                  </div>
                </div>
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-3">
                    <div className="flex justify-between">
                      <label className="text-sm font-medium text-text-main dark:text-white">界面字体大小</label>
                      <span className="text-xs text-text-secondary dark:text-gray-400">14px (默认)</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-xs text-text-secondary dark:text-gray-400">A</span>
                      <input className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-border-light accent-primary dark:bg-border-dark" max="100" min="0" type="range" defaultValue="50"/>
                      <span className="text-lg text-text-secondary dark:text-gray-400">A</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-text-main dark:text-white">显示语言</label>
                    <select className="w-full rounded-lg border-border-light bg-background-light px-4 py-2.5 text-sm text-text-main focus:border-primary focus:ring-primary dark:border-border-dark dark:bg-background-dark dark:text-white" defaultValue="zh-CN">
                      <option value="zh-CN">简体中文 (Chinese Simplified)</option>
                      <option value="en-US">English (US)</option>
                      <option value="ja-JP">日本語 (Japanese)</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Knowledge Base Settings */}
          <section className="rounded-xl border border-border-light bg-surface-light shadow-sm dark:border-border-dark dark:bg-surface-dark">
            <div className="border-b border-border-light px-6 py-4 dark:border-border-dark flex items-center gap-2">
              <span className="material-symbols-outlined text-green-600">database</span>
              <h3 className="font-display text-lg font-bold text-text-main dark:text-white">知识库设置</h3>
            </div>
            <div className="flex flex-col gap-6 p-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-text-main dark:text-white">默认切块策略 (Chunking)</label>
                  <select className="w-full rounded-lg border-border-light bg-background-light px-4 py-2.5 text-sm text-text-main focus:border-primary focus:ring-primary dark:border-border-dark dark:bg-background-dark dark:text-white">
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
                      <span className="text-xs font-bold text-primary">512</span>
                    </div>
                    <input className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-border-light accent-primary dark:bg-border-dark" max="2048" min="128" step="128" type="range" defaultValue="512"/>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <label className="block text-sm font-medium text-text-main dark:text-white">默认重叠窗口 (Tokens)</label>
                      <span className="text-xs font-bold text-primary">50</span>
                    </div>
                    <input className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-border-light accent-primary dark:bg-border-dark" max="200" min="0" step="10" type="range" defaultValue="50"/>
                  </div>
                </div>
              </div>
              <div className="border-t border-border-light pt-6 dark:border-border-dark grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="mb-2 block text-sm font-medium text-text-main dark:text-white">索引频率</label>
                  <div className="flex flex-wrap gap-2">
                    <button className="rounded-lg border border-primary bg-primary/10 px-4 py-2 text-sm font-medium text-primary dark:bg-primary/20 ring-1 ring-primary ring-offset-1 dark:ring-offset-surface-dark">实时</button>
                    <button className="rounded-lg border border-border-light px-4 py-2 text-sm font-medium text-text-secondary hover:bg-background-light dark:border-border-dark dark:text-gray-400 dark:hover:bg-white/5">每小时</button>
                    <button className="rounded-lg border border-border-light px-4 py-2 text-sm font-medium text-text-secondary hover:bg-background-light dark:border-border-dark dark:text-gray-400 dark:hover:bg-white/5">每天</button>
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
          <section className="rounded-xl border border-border-light bg-surface-light shadow-sm dark:border-border-dark dark:bg-surface-dark">
            <div className="border-b border-border-light px-6 py-4 dark:border-border-dark flex items-center gap-2">
              <span className="material-symbols-outlined text-blue-500">psychology</span>
              <h3 className="font-display text-lg font-bold text-text-main dark:text-white">AI 模型与能力设置</h3>
            </div>
            <div className="flex flex-col gap-8 p-6">
              <div>
                <h4 className="mb-4 text-sm font-bold uppercase tracking-wide text-text-secondary dark:text-gray-500">大语言模型 (LLM) 配置</h4>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="space-y-4">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-text-main dark:text-white">模型选择</label>
                      <select className="w-full rounded-lg border-border-light bg-background-light px-4 py-2.5 text-sm text-text-main focus:border-primary focus:ring-primary dark:border-border-dark dark:bg-background-dark dark:text-white" defaultValue="openai-gpt4">
                        <option value="openai-gpt4">OpenAI GPT-4o</option>
                        <option value="openai-gpt3.5">OpenAI GPT-3.5 Turbo</option>
                        <option value="gemini-pro">Google Gemini Pro</option>
                        <option value="claude-3">Anthropic Claude 3</option>
                      </select>
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium text-text-main dark:text-white">API Key 管理</label>
                      <div className="relative">
                        <input className="w-full rounded-lg border-border-light bg-background-light px-4 py-2.5 text-sm text-text-main placeholder-text-secondary focus:border-primary focus:ring-primary dark:border-border-dark dark:bg-background-dark dark:text-white" type="password" value="sk-xxxxxxxxxxxxxxxxxxxxxxxx" readOnly/>
                        <button className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text-main dark:text-gray-400">
                          <span className="material-symbols-outlined text-[18px]">visibility_off</span>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div>
                      <div className="mb-2 flex items-center justify-between">
                        <label className="text-sm font-medium text-text-main dark:text-white">模型温度 (Temperature): <span className="text-primary font-bold">0.7</span></label>
                        <span className="text-xs text-text-secondary dark:text-gray-400">精确 &lt;—&gt; 创意</span>
                      </div>
                      <input className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-border-light accent-primary dark:bg-border-dark" max="1" min="0" step="0.1" type="range" defaultValue="0.7"/>
                    </div>
                    <div>
                      <div className="mb-2 flex items-center justify-between">
                        <label className="text-sm font-medium text-text-main dark:text-white">最大输出 Tokens: <span className="text-primary font-bold">2048</span></label>
                      </div>
                      <input className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-border-light accent-primary dark:bg-border-dark" max="4096" min="256" step="256" type="range" defaultValue="2048"/>
                    </div>
                  </div>
                </div>
              </div>
              <div className="border-t border-border-light dark:border-border-dark"></div>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <h4 className="mb-4 text-sm font-bold uppercase tracking-wide text-text-secondary dark:text-gray-500">嵌入模型 (Embedding)</h4>
                  <label className="mb-2 block text-sm font-medium text-text-main dark:text-white">模型选择</label>
                  <select className="w-full rounded-lg border-border-light bg-background-light px-4 py-2.5 text-sm text-text-main focus:border-primary focus:ring-primary dark:border-border-dark dark:bg-background-dark dark:text-white" defaultValue="openai-small">
                    <option value="openai-small">OpenAI text-embedding-3-small</option>
                    <option value="openai-large">OpenAI text-embedding-3-large</option>
                    <option value="cohere">Cohere Embed v3</option>
                  </select>
                </div>
                <div>
                  <h4 className="mb-4 text-sm font-bold uppercase tracking-wide text-text-secondary dark:text-gray-500">默认检索参数</h4>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <label className="block text-sm font-medium text-text-main dark:text-white">默认 Top K 结果</label>
                        <span className="text-xs font-bold text-primary">5</span>
                      </div>
                      <input className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-border-light accent-primary dark:bg-border-dark" max="20" min="1" step="1" type="range" defaultValue="5"/>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col">
                        <label className="text-sm font-medium text-text-main dark:text-white">启用重排序 (Rerank)</label>
                        <span className="text-xs text-text-secondary dark:text-gray-400">提高结果相关性</span>
                      </div>
                      <label className="relative inline-flex cursor-pointer items-center">
                        <input defaultChecked className="peer sr-only" type="checkbox" />
                        <div className="peer h-5 w-9 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-4 after:w-4 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 dark:bg-gray-700 dark:border-gray-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Data Source Integration Settings */}
          <section className="rounded-xl border border-border-light bg-surface-light shadow-sm dark:border-border-dark dark:bg-surface-dark">
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
          <section className="rounded-xl border border-border-light bg-surface-light shadow-sm dark:border-border-dark dark:bg-surface-dark">
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
          <section className="rounded-xl border border-border-light bg-surface-light shadow-sm dark:border-border-dark dark:bg-surface-dark">
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
                  <input defaultChecked className="peer sr-only" type="checkbox" />
                  <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 dark:bg-gray-700 dark:border-gray-600"></div>
                </label>
              </div>
              <div className="flex items-center justify-between py-4">
                <div>
                  <p className="font-medium text-text-main dark:text-white">邮件通知</p>
                  <p className="text-xs text-text-secondary dark:text-gray-400">接收文档处理完成报告、Agent 运行报告</p>
                </div>
                <label className="relative inline-flex cursor-pointer items-center">
                  <input className="peer sr-only" type="checkbox" />
                  <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 dark:bg-gray-700 dark:border-gray-600"></div>
                </label>
              </div>
            </div>
          </section>

          <div className="flex justify-end gap-4 pb-10">
            <button className="rounded-lg border border-border-light bg-surface-light px-6 py-2.5 text-sm font-medium text-text-main hover:bg-background-light dark:border-border-dark dark:bg-surface-dark dark:text-white dark:hover:bg-white/5">
              取消
            </button>
            <button className="rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-white shadow-lg shadow-primary/30 transition-all hover:bg-primary-dark hover:shadow-primary/50">
              保存更改
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};