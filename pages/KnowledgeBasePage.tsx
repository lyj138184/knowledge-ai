import React, { useState } from 'react';
import { Header } from '../components/Header';

export const KnowledgeBasePage: React.FC = () => {
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const toggleSelection = (index: number) => {
    if (selectedItems.includes(index)) {
      setSelectedItems(selectedItems.filter(i => i !== index));
    } else {
      setSelectedItems([...selectedItems, index]);
    }
  };

  const files = [
    { 
      name: '2023_Q3_财务报告.pdf', 
      size: '2.4 MB', 
      tag: '财务', 
      type: 'PDF 文档', 
      date: '10月 24日', 
      status: 'ready', 
      icon: 'picture_as_pdf', 
      color: 'text-red-500 bg-red-50 border-red-100',
      tagIcon: 'sell'
    },
    { 
      name: '产品路线图_v2.docx', 
      size: '450 KB', 
      type: 'Word 文档', 
      date: '2分钟前', 
      status: 'indexing', 
      icon: 'description', 
      color: 'text-blue-500 bg-blue-50 border-blue-100',
      tagIcon: ''
    },
    { 
      name: '系统架构_v1.png', 
      size: '1.8 MB', 
      tag: '技术', 
      type: '图片', 
      date: '10月 20日', 
      status: 'ready', 
      icon: 'image', 
      color: 'text-purple-500 bg-purple-50 border-purple-100',
      tagIcon: 'sell',
      starred: true,
      highlight: 'bg-amber-50/30'
    },
    { 
      name: '旧版_API_接口规范.txt', 
      size: '12 KB', 
      type: '文本文件', 
      date: '10月 15日', 
      status: 'failed', 
      icon: 'article', 
      color: 'text-slate-500 bg-slate-100 border-slate-200',
      tagIcon: ''
    },
    { 
      name: '客户数据导出_2023.csv', 
      size: '15.2 MB', 
      tag: '数据', 
      type: 'CSV 表格', 
      date: '9月 28日', 
      status: 'ready', 
      icon: 'table_chart', 
      color: 'text-green-600 bg-green-50 border-green-100',
      tagIcon: 'sell'
    },
  ];

  return (
    <div className="flex flex-col h-full bg-background-light dark:bg-background-dark overflow-hidden font-display">
      <Header breadcrumbs={['知识库管理']} showSearch={false} />
      
      <div className="flex flex-1 overflow-hidden relative bg-background-light dark:bg-black/5">
        {/* Inner Sidebar */}
        <nav className="w-64 border-r border-border-light bg-surface-light flex flex-col shrink-0 overflow-y-auto hidden xl:flex dark:bg-surface-dark dark:border-border-dark">
          <div className="p-4">
            <div className="flex flex-col gap-2 mb-6">
              <div className="flex items-center justify-between px-2 mb-2">
                <h3 className="text-xs font-semibold text-text-secondary uppercase tracking-wider dark:text-gray-500">我的知识库</h3>
                <button className="text-text-secondary hover:text-primary transition-colors" title="新建知识库">
                  <span className="material-symbols-outlined text-[16px]">add</span>
                </button>
              </div>
              
              <details className="group" open>
                <summary className="flex cursor-pointer items-center justify-between rounded-md px-2 py-2 hover:bg-background-light text-text-main transition-colors dark:text-white dark:hover:bg-white/5">
                  <div className="flex items-center gap-2">
                     <span className="material-symbols-outlined text-[18px] text-primary transition-transform group-open:rotate-90">arrow_right</span>
                     <span className="material-symbols-outlined text-[18px] text-primary">folder_open</span>
                     <span className="text-sm font-medium">项目 Alpha</span>
                  </div>
                </summary>
                <div className="flex flex-col ml-3 pl-3 border-l border-border-light mt-1 gap-0.5 dark:border-border-dark">
                  <a className="flex items-center justify-between rounded-md px-2 py-1.5 bg-primary/10 text-primary text-sm font-medium" href="#">
                    <span className="truncate">文档</span>
                    <span className="text-[10px] bg-surface-light/50 px-1.5 rounded-full dark:bg-black/20">12</span>
                  </a>
                  <a className="flex items-center justify-between rounded-md px-2 py-1.5 hover:bg-background-light text-text-secondary text-sm transition-colors dark:text-gray-400 dark:hover:bg-white/5" href="#">
                    <span className="truncate">会议记录</span>
                     <span className="text-[10px] bg-background-light px-1.5 rounded-full dark:bg-white/10">4</span>
                  </a>
                  <a className="flex items-center justify-between rounded-md px-2 py-1.5 hover:bg-background-light text-text-secondary text-sm transition-colors dark:text-gray-400 dark:hover:bg-white/5" href="#">
                     <span className="truncate">技术规范</span>
                     <span className="text-[10px] bg-background-light px-1.5 rounded-full dark:bg-white/10">8</span>
                  </a>
                </div>
              </details>
              
               <details className="group">
                <summary className="flex cursor-pointer items-center justify-between rounded-md px-2 py-2 hover:bg-background-light text-text-secondary transition-colors dark:text-gray-400 dark:hover:bg-white/5">
                  <div className="flex items-center gap-2">
                     <span className="material-symbols-outlined text-[18px] text-gray-400 transition-transform group-open:rotate-90">arrow_right</span>
                     <span className="material-symbols-outlined text-[18px] text-gray-400">folder</span>
                     <span className="text-sm font-medium">个人研究</span>
                  </div>
                </summary>
                 <div className="flex flex-col ml-3 pl-3 border-l border-border-light mt-1 dark:border-border-dark">
                    <span className="px-2 py-1 text-xs text-text-secondary dark:text-gray-500">加载中...</span>
                 </div>
              </details>
               <details className="group">
                <summary className="flex cursor-pointer items-center justify-between rounded-md px-2 py-2 hover:bg-background-light text-text-secondary transition-colors dark:text-gray-400 dark:hover:bg-white/5">
                  <div className="flex items-center gap-2">
                     <span className="material-symbols-outlined text-[18px] text-gray-400 transition-transform group-open:rotate-90">arrow_right</span>
                     <span className="material-symbols-outlined text-[18px] text-gray-400">folder</span>
                     <span className="text-sm font-medium">2023 归档</span>
                  </div>
                </summary>
              </details>
            </div>
            
            <div className="flex flex-col gap-1">
               <h3 className="px-2 text-xs font-semibold text-text-secondary uppercase tracking-wider mb-2 dark:text-gray-500">快速访问</h3>
               <a className="flex items-center gap-3 px-2 py-2 rounded-md hover:bg-background-light text-text-secondary hover:text-text-main group transition-colors dark:text-gray-400 dark:hover:text-white dark:hover:bg-white/5" href="#">
                 <span className="material-symbols-outlined text-[20px] text-gray-400 group-hover:text-amber-400 transition-colors">star</span>
                 <span className="text-sm font-medium">收藏夹</span>
               </a>
               <a className="flex items-center gap-3 px-2 py-2 rounded-md hover:bg-background-light text-text-secondary hover:text-text-main group transition-colors dark:text-gray-400 dark:hover:text-white dark:hover:bg-white/5" href="#">
                 <span className="material-symbols-outlined text-[20px] text-gray-400 group-hover:text-primary transition-colors">schedule</span>
                 <span className="text-sm font-medium">最近访问</span>
               </a>
               <a className="flex items-center gap-3 px-2 py-2 rounded-md hover:bg-background-light text-text-secondary hover:text-text-main group transition-colors dark:text-gray-400 dark:hover:text-white dark:hover:bg-white/5" href="#">
                 <span className="material-symbols-outlined text-[20px] text-gray-400 group-hover:text-purple-500 transition-colors">label</span>
                 <span className="text-sm font-medium">标签</span>
               </a>
               <a className="flex items-center gap-3 px-2 py-2 rounded-md hover:bg-background-light text-text-secondary hover:text-text-main group transition-colors dark:text-gray-400 dark:hover:text-white dark:hover:bg-white/5" href="#">
                 <span className="material-symbols-outlined text-[20px] text-gray-400 group-hover:text-red-500 transition-colors">delete</span>
                 <span className="text-sm font-medium">回收站</span>
               </a>
            </div>
          </div>
          
          <div className="mt-auto p-4">
             <div className="bg-gradient-to-br from-[#137fec] to-[#0b5cbe] rounded-xl p-4 text-white shadow-lg shadow-blue-500/20">
               <div className="flex items-start justify-between mb-2">
                 <span className="material-symbols-outlined text-[24px] opacity-80">cloud_upload</span>
                 <button className="hover:bg-white/20 rounded p-0.5 transition-colors"><span className="material-symbols-outlined text-[16px]">close</span></button>
               </div>
               <h4 className="text-sm font-bold mb-1">导入数据</h4>
               <p className="text-xs opacity-90 mb-3 leading-relaxed">连接 Google Drive 或 Notion 自动同步文件。</p>
               <button className="w-full bg-white text-primary text-xs font-bold py-2 rounded-lg hover:bg-slate-50 transition-colors">去连接</button>
             </div>
          </div>
        </nav>

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col h-full overflow-hidden min-w-0 bg-surface-light shadow-sm m-0 md:m-2 md:rounded-tl-2xl border-l border-t border-border-light dark:bg-surface-dark dark:border-border-dark">
          {/* Main Header */}
          <div className="px-6 py-5 border-b border-border-light flex flex-col gap-4 dark:border-border-dark">
            <div className="flex items-center text-sm text-text-secondary dark:text-gray-400">
               <a className="hover:text-primary transition-colors" href="#">我的知识库</a>
               <span className="material-symbols-outlined text-[14px] mx-2">chevron_right</span>
               <a className="hover:text-primary transition-colors" href="#">项目 Alpha</a>
               <span className="material-symbols-outlined text-[14px] mx-2">chevron_right</span>
               <span className="font-medium text-text-main dark:text-white">文档</span>
            </div>
            <div className="flex items-end justify-between gap-4 flex-wrap">
               <div>
                 <h1 className="text-2xl font-bold text-text-main mb-1 dark:text-white">项目 Alpha 文档</h1>
                 <p className="text-sm text-text-secondary dark:text-gray-400">基于检索增强生成的个人知识管理人工智能助手，用于管理个人数字资产并提供智能问答。</p>
               </div>
               <div className="flex items-center gap-3">
                 <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border-light text-text-secondary hover:bg-background-light hover:text-text-main font-medium text-sm transition-colors dark:border-border-dark dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-white">
                    <span className="material-symbols-outlined text-[20px]">tune</span>
                    <span>设置</span>
                 </button>
                 <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary hover:bg-primary-dark text-white font-medium text-sm transition-colors shadow-sm shadow-blue-200 dark:shadow-none">
                    <span className="material-symbols-outlined text-[20px]">upload_file</span>
                    <span>上传文件</span>
                 </button>
               </div>
            </div>
          </div>
          
          {/* Toolbar */}
          <div className="px-6 py-3 bg-background-light/50 border-b border-border-light flex flex-col sm:flex-row items-center justify-between gap-4 dark:bg-white/5 dark:border-border-dark">
             <div className="relative w-full sm:w-80 group">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary group-focus-within:text-primary transition-colors dark:text-gray-400">search</span>
                <input
                  className="w-full pl-10 pr-4 py-2 bg-surface-light border border-border-light rounded-lg text-sm text-text-main focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-shadow placeholder:text-text-secondary dark:bg-surface-dark dark:border-border-dark dark:text-white dark:placeholder-gray-500"
                  placeholder="在此文件夹中搜索文件..."
                  type="text"
                />
             </div>
             <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0 scrollbar-hide">
                <div className="flex items-center bg-surface-light border border-border-light rounded-lg p-1 shrink-0 dark:bg-surface-dark dark:border-border-dark">
                   <button className="p-1.5 rounded hover:bg-background-light text-text-secondary hover:text-text-main transition-colors dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-white" title="网格视图"><span className="material-symbols-outlined text-[20px]">grid_view</span></button>
                   <button className="p-1.5 rounded bg-background-light text-primary shadow-sm transition-colors dark:bg-white/10" title="列表视图"><span className="material-symbols-outlined text-[20px]">view_list</span></button>
                </div>
                <span className="w-px h-6 bg-border-light mx-1 shrink-0 dark:bg-border-dark"></span>
                <select className="bg-transparent text-sm font-medium text-text-secondary border-none focus:ring-0 cursor-pointer hover:text-primary pr-8 shrink-0 dark:text-gray-400 dark:bg-transparent">
                   <option>所有状态</option>
                   <option>已索引</option>
                   <option>处理中</option>
                   <option>失败</option>
                </select>
                 <span className="w-px h-6 bg-border-light mx-1 shrink-0 dark:bg-border-dark"></span>
                 <button className="flex items-center gap-1 text-sm font-medium text-text-secondary hover:text-primary shrink-0 transition-colors dark:text-gray-400">
                   <span>排序：日期</span>
                   <span className="material-symbols-outlined text-[16px]">arrow_downward</span>
                 </button>
             </div>
          </div>

          {/* File Table */}
          <div className="flex-1 overflow-auto bg-surface-light relative dark:bg-surface-dark">
             <table className="w-full text-left border-collapse">
               <thead className="bg-background-light sticky top-0 z-10 shadow-sm dark:bg-white/5">
                  <tr>
                     <th className="py-3 px-6 w-12 border-b border-border-light dark:border-border-dark">
                        <input className="rounded border-gray-300 text-primary focus:ring-primary h-4 w-4 dark:bg-surface-dark dark:border-gray-600" type="checkbox"/>
                     </th>
                     <th className="py-3 px-6 text-xs font-semibold text-text-secondary uppercase tracking-wider border-b border-border-light cursor-pointer hover:text-text-main dark:border-border-dark dark:text-gray-400 dark:hover:text-white">名称</th>
                     <th className="py-3 px-6 text-xs font-semibold text-text-secondary uppercase tracking-wider border-b border-border-light w-32 hidden sm:table-cell dark:border-border-dark dark:text-gray-400">格式</th>
                     <th className="py-3 px-6 text-xs font-semibold text-text-secondary uppercase tracking-wider border-b border-border-light w-32 cursor-pointer hover:text-text-main hidden md:table-cell dark:border-border-dark dark:text-gray-400 dark:hover:text-white">日期</th>
                     <th className="py-3 px-6 text-xs font-semibold text-text-secondary uppercase tracking-wider border-b border-border-light w-40 dark:border-border-dark dark:text-gray-400">状态</th>
                     <th className="py-3 px-6 text-xs font-semibold text-text-secondary uppercase tracking-wider border-b border-border-light w-20 text-right dark:border-border-dark dark:text-gray-400">操作</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-border-light dark:divide-border-dark">
                  {files.map((file, index) => (
                    <tr key={index} className={`group hover:bg-background-light/80 transition-colors ${file.highlight || ''} dark:hover:bg-white/5`}>
                       <td className="py-4 px-6">
                          <input 
                            className="rounded border-gray-300 text-primary focus:ring-primary h-4 w-4 opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity cursor-pointer dark:bg-surface-dark dark:border-gray-600" 
                            type="checkbox"
                            checked={selectedItems.includes(index)}
                            onChange={() => toggleSelection(index)}
                          />
                       </td>
                       <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                             <div className={`size-9 rounded flex items-center justify-center border ${file.color}`}>
                                <span className="material-symbols-outlined text-[20px]">{file.icon}</span>
                             </div>
                             <div>
                                <div className="flex items-center gap-2">
                                  <p className="text-sm font-medium text-text-main group-hover:text-primary cursor-pointer dark:text-white">{file.name}</p>
                                  {file.starred && <span className="material-symbols-outlined text-[14px] text-amber-400 fill-current">star</span>}
                                </div>
                                <div className="flex items-center gap-2 mt-0.5">
                                  <span className="text-[11px] text-text-secondary dark:text-gray-500">{file.size}</span>
                                  {file.tag && (
                                    <div className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-background-light text-[10px] text-text-secondary dark:bg-white/10 dark:text-gray-400">
                                       {file.tagIcon && <span className="material-symbols-outlined text-[10px]">{file.tagIcon}</span>}
                                       {file.tag}
                                    </div>
                                  )}
                                </div>
                             </div>
                          </div>
                       </td>
                       <td className="py-4 px-6 text-sm text-text-secondary hidden sm:table-cell dark:text-gray-400">{file.type}</td>
                       <td className="py-4 px-6 text-sm text-text-secondary hidden md:table-cell dark:text-gray-400">{file.date}</td>
                       <td className="py-4 px-6">
                          {file.status === 'ready' && (
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-700 border border-green-100 dark:bg-green-900/20 dark:text-green-400 dark:border-green-900/30">
                               <span className="size-1.5 rounded-full bg-green-500"></span>
                               已就绪
                            </span>
                          )}
                          {file.status === 'indexing' && (
                             <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700 border border-blue-100 animate-pulse dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-900/30">
                                <span className="material-symbols-outlined text-[12px] animate-spin">sync</span>
                                索引中...
                             </span>
                          )}
                          {file.status === 'failed' && (
                             <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-2.5 py-1 text-xs font-medium text-red-700 border border-red-100 cursor-help dark:bg-red-900/20 dark:text-red-400 dark:border-red-900/30" title="解析器不支持该文件格式">
                                <span className="material-symbols-outlined text-[14px]">error</span>
                                失败
                             </span>
                          )}
                       </td>
                       <td className="py-4 px-6 text-right">
                          <div className="invisible group-hover:visible flex items-center justify-end gap-1">
                             {file.status === 'failed' ? (
                                <button className="p-1.5 text-text-secondary hover:text-primary rounded-full hover:bg-blue-50 transition-colors dark:text-gray-400 dark:hover:bg-white/10" title="重试">
                                   <span className="material-symbols-outlined text-[18px]">refresh</span>
                                </button>
                             ) : (
                                <>
                                  <button className="p-1.5 text-text-secondary hover:text-primary rounded-full hover:bg-blue-50 transition-colors dark:text-gray-400 dark:hover:bg-white/10" title="查看">
                                     <span className="material-symbols-outlined text-[18px]">visibility</span>
                                  </button>
                                  <button className="p-1.5 text-text-secondary hover:text-primary rounded-full hover:bg-blue-50 transition-colors dark:text-gray-400 dark:hover:bg-white/10" title="编辑元数据">
                                     <span className="material-symbols-outlined text-[18px]">edit</span>
                                  </button>
                                </>
                             )}
                             <button className="p-1.5 text-text-secondary hover:text-red-500 rounded-full hover:bg-red-50 transition-colors dark:text-gray-400 dark:hover:bg-white/10 dark:hover:text-red-400" title="删除">
                                <span className="material-symbols-outlined text-[18px]">delete</span>
                             </button>
                          </div>
                       </td>
                    </tr>
                  ))}
               </tbody>
             </table>
             
             {/* Drag Drop Overlay */}
             <div className="pointer-events-none absolute inset-0 m-4 border-2 border-dashed border-primary/20 bg-primary/5 rounded-xl flex flex-col items-center justify-center opacity-0 hover:opacity-100 transition-opacity z-20">
                <span className="material-symbols-outlined text-4xl text-primary mb-2">cloud_upload</span>
                <p className="text-primary font-medium">拖拽文件到此处上传</p>
             </div>
          </div>
          
          {/* Pagination */}
          <div className="px-6 py-3 border-t border-border-light flex items-center justify-between bg-surface-light shrink-0 dark:bg-surface-dark dark:border-border-dark">
             <p className="text-xs text-text-secondary dark:text-gray-500">显示 1-5 项，共 24 项</p>
             <div className="flex items-center gap-2">
                <button className="p-1 rounded hover:bg-background-light text-text-secondary disabled:opacity-50 dark:hover:bg-white/10 dark:text-gray-400" disabled><span className="material-symbols-outlined text-[20px]">chevron_left</span></button>
                <button className="p-1 rounded hover:bg-background-light text-text-main dark:hover:bg-white/10 dark:text-white"><span className="material-symbols-outlined text-[20px]">chevron_right</span></button>
             </div>
          </div>
        </main>
      </div>
    </div>
  );
};