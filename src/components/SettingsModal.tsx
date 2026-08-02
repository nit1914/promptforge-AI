import React, { useState } from 'react';
import { X, Settings, ShieldCheck, Key, Bell, Sliders, Moon, Sun, Save } from 'lucide-react';
import type { AIModelInfo } from '../types';
import { AI_MODELS } from '../data/mockData';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  selectedModel: AIModelInfo;
  setSelectedModel: (m: AIModelInfo) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  darkMode,
  setDarkMode,
  selectedModel,
  setSelectedModel
}) => {
  const [activeTab, setActiveTab] = useState<'general' | 'models' | 'api-keys' | 'custom-rules'>('general');
  const [openaiKey, setOpenaiKey] = useState('');
  const [anthropicKey, setAnthropicKey] = useState('');
  const [geminiKey, setGeminiKey] = useState('');
  const [customSystemDirective, setCustomSystemDirective] = useState(
    'Always prioritize clean modular structure, zero conversational filler, and strict type annotations.'
  );
  const [savedNotice, setSavedNotice] = useState(false);

  if (!isOpen) return null;

  const handleSave = () => {
    setSavedNotice(true);
    setTimeout(() => {
      setSavedNotice(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md animate-in fade-in">
      <div className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-brand-500" />
            <h2 className="font-extrabold text-lg text-slate-900 dark:text-white">Studio Settings</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="flex border-b border-slate-100 dark:border-slate-800 px-6 gap-4 text-xs font-bold text-slate-500">
          <button
            onClick={() => setActiveTab('general')}
            className={`py-3 border-b-2 transition-all ${
              activeTab === 'general' ? 'border-brand-500 text-brand-500' : 'border-transparent hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            General & Theme
          </button>
          <button
            onClick={() => setActiveTab('models')}
            className={`py-3 border-b-2 transition-all ${
              activeTab === 'models' ? 'border-brand-500 text-brand-500' : 'border-transparent hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            AI Models ({AI_MODELS.length})
          </button>
          <button
            onClick={() => setActiveTab('api-keys')}
            className={`py-3 border-b-2 transition-all ${
              activeTab === 'api-keys' ? 'border-brand-500 text-brand-500' : 'border-transparent hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            API Keys & Integrations
          </button>
          <button
            onClick={() => setActiveTab('custom-rules')}
            className={`py-3 border-b-2 transition-all ${
              activeTab === 'custom-rules' ? 'border-brand-500 text-brand-500' : 'border-transparent hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            System Rules
          </button>
        </div>

        {/* Content */}
        <div className="p-6 flex-1 overflow-y-auto space-y-6">
          
          {activeTab === 'general' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white">Theme Preference</div>
                  <div className="text-[11px] text-slate-400">Switch between sleek dark obsidian and light mode</div>
                </div>
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white text-xs font-bold flex items-center gap-2"
                >
                  {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
                  <span>{darkMode ? 'Dark Mode' : 'Light Mode'}</span>
                </button>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-800 dark:text-slate-200">Default Target Model</label>
                <select
                  value={selectedModel.id}
                  onChange={(e) => {
                    const m = AI_MODELS.find(x => x.id === e.target.value);
                    if (m) setSelectedModel(m);
                  }}
                  className="w-full p-3 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none"
                >
                  {AI_MODELS.map(m => (
                    <option key={m.id} value={m.id}>{m.name} ({m.provider})</option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {activeTab === 'models' && (
            <div className="space-y-3">
              {AI_MODELS.map(m => (
                <div 
                  key={m.id}
                  onClick={() => setSelectedModel(m)}
                  className={`p-3.5 rounded-2xl border cursor-pointer flex items-center justify-between transition-all ${
                    selectedModel.id === m.id ? 'bg-brand-500/10 border-brand-500 text-brand-500' : 'bg-slate-50 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800'
                  }`}
                >
                  <div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white">{m.name}</div>
                    <div className="text-[10px] text-slate-400">{m.bestFor}</div>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-400">
                    {m.contextWindow}
                  </span>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'api-keys' && (
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-800 dark:text-slate-200">OpenAI API Key (Optional)</label>
                <input
                  type="password"
                  value={openaiKey}
                  onChange={(e) => setOpenaiKey(e.target.value)}
                  placeholder="sk-proj-..."
                  className="w-full p-2.5 text-xs font-mono rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-800 dark:text-slate-200">Anthropic API Key (Optional)</label>
                <input
                  type="password"
                  value={anthropicKey}
                  onChange={(e) => setAnthropicKey(e.target.value)}
                  placeholder="sk-ant-..."
                  className="w-full p-2.5 text-xs font-mono rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-800 dark:text-slate-200">Google Gemini API Key (Optional)</label>
                <input
                  type="password"
                  value={geminiKey}
                  onChange={(e) => setGeminiKey(e.target.value)}
                  placeholder="AIzaSy..."
                  className="w-full p-2.5 text-xs font-mono rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none"
                />
              </div>
            </div>
          )}

          {activeTab === 'custom-rules' && (
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-800 dark:text-slate-200">Global PromptForge Directive Rules</label>
              <textarea
                value={customSystemDirective}
                onChange={(e) => setCustomSystemDirective(e.target.value)}
                rows={5}
                className="w-full p-3 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none"
              />
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-900/50">
          <span className="text-[11px] text-slate-400">
            {savedNotice ? '✓ Settings Saved Successfully!' : 'All configurations saved locally.'}
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 text-xs font-bold"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-5 py-2 rounded-xl bg-brand-500 hover:bg-brand-600 text-white text-xs font-bold shadow-md flex items-center gap-1.5"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Changes</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
