import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { Footer } from './components/Footer';
import { DashboardView } from './components/DashboardView';
import { PromptAnalyzerView } from './components/PromptAnalyzerView';
import { PromptGeneratorView } from './components/PromptGeneratorView';
import { ImageStudioView } from './components/ImageStudioView';
import { VideoStudioView } from './components/VideoStudioView';
import { UIUXStudioView } from './components/UIUXStudioView';
import { NotesStudioView } from './components/NotesStudioView';
import { DeepResearchView } from './components/DeepResearchView';
import { PromptLibraryView } from './components/PromptLibraryView';
import { AchievementsView } from './components/AchievementsView';
import { SettingsModal } from './components/SettingsModal';
import type { NavigationTab, AIModelInfo, SavedPrompt, DailyStreakData, AchievementItem } from './types';
import { AI_MODELS, INITIAL_SAVED_PROMPTS, INITIAL_STREAK, INITIAL_ACHIEVEMENTS } from './data/mockData';

export function App() {
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<NavigationTab>('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);
  const [selectedModel, setSelectedModel] = useState<AIModelInfo>(AI_MODELS[0]);
  const [savedPrompts, setSavedPrompts] = useState<SavedPrompt[]>(INITIAL_SAVED_PROMPTS);
  const [streakData, setStreakData] = useState<DailyStreakData>(INITIAL_STREAK);
  const [achievements, setAchievements] = useState<AchievementItem[]>(INITIAL_ACHIEVEMENTS);
  const [analyzerPromptText, setAnalyzerPromptText] = useState<string>('');
  const [settingsOpen, setSettingsOpen] = useState<boolean>(false);

  // Sync Dark Mode class to <html> element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleQuickAnalyze = (promptText: string) => {
    setAnalyzerPromptText(promptText);
    setActiveTab('analyzer');
  };

  const handleSavePrompt = (title: string, content: string, category: string, score: number) => {
    const newPrompt: SavedPrompt = {
      id: `saved-${Date.now()}`,
      title,
      content,
      improvedContent: content,
      category,
      model: selectedModel.name,
      score,
      tags: [category, 'Generated'],
      createdAt: new Date().toISOString().split('T')[0],
      isFavorite: false
    };
    setSavedPrompts(prev => [newPrompt, ...prev]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-light-bg dark:bg-dark-bg text-slate-900 dark:text-slate-100 transition-colors duration-200">
      
      {/* Top Navigation Header */}
      <Header
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectedModel={selectedModel}
        setSelectedModel={setSelectedModel}
        onOpenSettings={() => setSettingsOpen(true)}
        streakCount={streakData.currentStreak}
      />

      {/* Main Body Layout with Sidebar */}
      <div className="flex-1 flex max-w-[1700px] w-full mx-auto">
        
        {/* Left Sidebar */}
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          collapsed={sidebarCollapsed}
          setCollapsed={setSidebarCollapsed}
        />

        {/* Dynamic Main Workspace Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0 overflow-x-hidden">
          
          {activeTab === 'dashboard' && (
            <DashboardView
              setActiveTab={setActiveTab}
              onQuickAnalyze={handleQuickAnalyze}
            />
          )}

          {activeTab === 'analyzer' && (
            <PromptAnalyzerView
              initialPromptText={analyzerPromptText}
              onSavePrompt={handleSavePrompt}
            />
          )}

          {(activeTab === 'generator' || activeTab === 'code-prompt' || activeTab === 'business' || activeTab === 'marketing' || activeTab === 'resume' || activeTab === 'linkedin' || activeTab === 'youtube' || activeTab === 'social-media' || activeTab === 'seo' || activeTab === 'data-analysis' || activeTab === 'python' || activeTab === 'sql' || activeTab === 'power-bi' || activeTab === 'excel' || activeTab === 'presentation' || activeTab === 'mind-map' || activeTab === 'research-papers') && (
            <PromptGeneratorView
              selectedModel={selectedModel}
              onAnalyzePrompt={handleQuickAnalyze}
              onSavePrompt={handleSavePrompt}
            />
          )}

          {activeTab === 'image-studio' && <ImageStudioView />}

          {activeTab === 'video-studio' && <VideoStudioView />}

          {activeTab === 'ui-generator' && <UIUXStudioView />}

          {(activeTab === 'notes-generator' || activeTab === 'study-assistant' || activeTab === 'handwritten-notes') && (
            <NotesStudioView />
          )}

          {(activeTab === 'research' || activeTab === 'research-papers') && (
            <DeepResearchView />
          )}

          {(activeTab === 'templates' || activeTab === 'library' || activeTab === 'saved' || activeTab === 'favorites' || activeTab === 'history') && (
            <PromptLibraryView
              savedPrompts={savedPrompts}
              setSavedPrompts={setSavedPrompts}
              onAnalyzePrompt={handleQuickAnalyze}
            />
          )}

          {activeTab === 'achievements' && (
            <AchievementsView
              streakData={streakData}
              achievements={achievements}
            />
          )}

          {activeTab === 'settings' && (
            <div className="glass-panel p-8 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4">
              <h2 className="text-xl font-bold">Settings Workspace</h2>
              <p className="text-xs text-slate-400">Click below to manage model parameters, theme variables, and API keys.</p>
              <button
                onClick={() => setSettingsOpen(true)}
                className="px-5 py-2.5 rounded-2xl bg-brand-500 text-white font-bold text-xs shadow-md"
              >
                Open Settings Dialog
              </button>
            </div>
          )}

        </main>
      </div>

      {/* Footer */}
      <Footer />

      {/* Global Settings Modal */}
      <SettingsModal
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        selectedModel={selectedModel}
        setSelectedModel={setSelectedModel}
      />

    </div>
  );
}

export default App;
