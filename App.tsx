import React, { useState } from 'react';
import { GlobalSidebar } from './components/GlobalSidebar';
import { DashboardPage } from './pages/DashboardPage';
import { ChatPage } from './pages/ChatPage';
import { KnowledgeBasePage } from './pages/KnowledgeBasePage';
import { KnowledgeGraphPage } from './pages/KnowledgeGraphPage';
import { KnowledgeCapsulesPage } from './pages/KnowledgeCapsulesPage';
import { AiEditorPage } from './pages/AiEditorPage';
import { RagLabPage } from './pages/RagLabPage';
import { AgentManagementPage } from './pages/AgentManagementPage';
import { IntegrationsPage } from './pages/IntegrationsPage';
import { SettingsPage } from './pages/SettingsPage';
import { Page } from './types';

const App: React.FC = () => {
  const [activePage, setActivePage] = useState<Page>(Page.DASHBOARD);

  const renderPage = () => {
    switch (activePage) {
      case Page.DASHBOARD:
        return <DashboardPage />;
      case Page.CHAT:
        return <ChatPage />;
      case Page.KNOWLEDGE_BASE:
        return <KnowledgeBasePage />;
      case Page.KNOWLEDGE_GRAPH:
        return <KnowledgeGraphPage />;
      case Page.KNOWLEDGE_CAPSULES:
        return <KnowledgeCapsulesPage />;
      case Page.AI_EDITOR:
        return <AiEditorPage />;
      case Page.RAG_LAB:
        return <RagLabPage />;
      case Page.AGENT_MANAGEMENT:
        return <AgentManagementPage />;
      case Page.INTEGRATIONS:
        return <IntegrationsPage />;
      case Page.SETTINGS:
        return <SettingsPage />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <div className="relative flex h-full w-full overflow-hidden bg-background-light dark:bg-background-dark text-text-main">
      <GlobalSidebar activePage={activePage} onNavigate={setActivePage} />
      <main className="flex flex-1 flex-col overflow-hidden h-full min-w-0">
        {renderPage()}
      </main>
    </div>
  );
};

export default App;