export enum Page {
  DASHBOARD = 'DASHBOARD',
  RAG_LAB = 'RAG_LAB',
  KNOWLEDGE_BASE = 'KNOWLEDGE_BASE',
  KNOWLEDGE_GRAPH = 'KNOWLEDGE_GRAPH',
  KNOWLEDGE_CAPSULES = 'KNOWLEDGE_CAPSULES',
  AI_EDITOR = 'AI_EDITOR',
  CHAT = 'CHAT',
  INTEGRATIONS = 'INTEGRATIONS',
  AGENT_MANAGEMENT = 'AGENT_MANAGEMENT',
  SETTINGS = 'SETTINGS'
}

export interface User {
  name: string;
  role: string;
  avatarUrl: string;
}

export interface SidebarItem {
  icon: string;
  label: string;
  page: Page;
  filled?: boolean;
}