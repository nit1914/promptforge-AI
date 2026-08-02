import React, { useState } from 'react';
import { 
  Sparkles, 
  Sun, 
  Moon, 
  Bell, 
  Settings, 
  User, 
  Search, 
  ChevronDown, 
  Check, 
  SlidersHorizontal,
  Flame,
  ShieldCheck
} from 'lucide-react';
import type { NavigationTab, AIModelInfo } from '../types';
import { AI_MODELS } from '../data/mockData';

interface HeaderProps {
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  activeTab: NavigationTab;
  setActiveTab: (tab: NavigationTab) => void;
  selectedModel: AIModelInfo;
  setSelectedModel: (model: AIModelInfo) => void;
  onOpenSettings: () => void;
  streakCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  darkMode,
  setDarkMode,
  setActiveTab,
  selectedModel,
  setSelectedModel,
  onOpenSettings,
  streakCount
}) => {
  const [modelDropdownOpen, setModelDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [profileOpen, setProfileOpen] = useState(false);

  const notifications = [
    { id: 1, title: 'DeepSeek R1 Model Support Added', time: '10m ago', unread: true },
    { id: 2, title: '🔥 7-Day Prompt Streak Unlocked!', time: '1h ago', unread: true },
    { id: 3, title: 'New Template: Next.js Clean Architecture', time: '1d ago', unread: false }
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-dark-bg/80 backdrop-blur-xl transition-colors duration-200">
      <div className="max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Left: Logo & Subtitle */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('dashboard')}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 via-purple-600 to-cyan-400 p-0.5 shadow-lg shadow-brand-500/20 flex items-center justify-center group">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center transition-transform group-hover:scale-95">
              <Sparkles className="w-5 h-5 text-brand-400 animate-pulse" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl tracking-tight text-slate-900 dark:text-white">
                Prompt<span className="gradient-text">Forge</span> <span className="text-xs px-2 py-0.5 rounded-full bg-brand-500/10 text-brand-500 font-semibold border border-brand-500/20">AI</span>
              </span>
            </div>
            <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400 hidden md:block">
              The Ultimate Prompt Engineering Studio
            </p>
          </div>
        </div>

        {/* Middle: AI Model Selector & Quick Search */}
        <div className="flex-1 max-w-xl hidden lg:flex items-center gap-3">
          
          {/* Quick Search */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search prompts, categories, generators... (Press '/' to focus)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-1.5 text-xs rounded-xl bg-slate-100 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/50"
            />
          </div>

          {/* Model Switcher Dropdown */}
          <div className="relative">
            <button
              onClick={() => setModelDropdownOpen(!modelDropdownOpen)}
              className={`flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-xl border transition-all ${selectedModel.badgeColor} hover:opacity-90`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{selectedModel.name}</span>
              <ChevronDown className="w-3.5 h-3.5 opacity-70" />
            </button>

            {modelDropdownOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2">
                <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800/80 mb-1">
                  <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Select AI Target Model</p>
                </div>
                <div className="max-h-72 overflow-y-auto space-y-1">
                  {AI_MODELS.map((model) => (
                    <button
                      key={model.id}
                      onClick={() => {
                        setSelectedModel(model);
                        setModelDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between transition-colors ${
                        selectedModel.id === model.id 
                          ? 'bg-brand-500/10 text-brand-600 dark:text-brand-400 font-semibold' 
                          : 'hover:bg-slate-100 dark:hover:bg-slate-800/60 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <div>
                        <div className="font-semibold">{model.name}</div>
                        <div className="text-[10px] text-slate-400">{model.provider} • {model.contextWindow}</div>
                      </div>
                      {selectedModel.id === model.id && <Check className="w-4 h-4 text-brand-500" />}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Action Icons: Streak, Theme Toggle, Notifications, Settings, Profile */}
        <div className="flex items-center gap-2">
          
          {/* Daily Streak Pill */}
          <button 
            onClick={() => setActiveTab('achievements')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 text-amber-500 text-xs font-bold hover:scale-105 transition-transform"
            title="Daily Prompt Streak"
          >
            <Flame className="w-4 h-4 fill-amber-500 animate-bounce" />
            <span>{streakCount} Days</span>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors"
            title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
          </button>

          {/* Notifications Drawer */}
          <div className="relative">
            <button
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors relative"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-brand-500 animate-ping" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-brand-500" />
            </button>

            {notificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl p-3 z-50">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-xs font-bold text-slate-900 dark:text-white">Notifications</span>
                  <span className="text-[10px] text-brand-500 font-semibold cursor-pointer">Mark all as read</span>
                </div>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {notifications.map((n) => (
                    <div key={n.id} className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/40 text-xs border border-slate-100 dark:border-slate-800">
                      <div className="font-semibold text-slate-800 dark:text-slate-200">{n.title}</div>
                      <div className="text-[10px] text-slate-400 mt-1">{n.time}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Settings */}
          <button
            onClick={onOpenSettings}
            className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors"
            title="Settings"
          >
            <Settings className="w-4 h-4" />
          </button>

          {/* Profile Pill */}
          <div className="relative">
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-2 p-1 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors"
            >
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-brand-500 to-purple-500 flex items-center justify-center text-white font-bold text-xs shadow-md">
                NV
              </div>
            </button>

            {profileOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl p-2 z-50">
                <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800 mb-1">
                  <div className="font-bold text-xs text-slate-900 dark:text-white">Nitesh Verma</div>
                  <div className="text-[10px] text-slate-400">nitesh@promptforge.ai</div>
                  <div className="mt-1.5 inline-block text-[9px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-brand-500/10 text-brand-400 border border-brand-500/20">
                    Pro SaaS Enterprise
                  </div>
                </div>
                <button 
                  onClick={() => { setActiveTab('settings'); setProfileOpen(false); }}
                  className="w-full text-left px-3 py-2 text-xs rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
                >
                  Account Settings
                </button>
                <button 
                  onClick={() => { setActiveTab('achievements'); setProfileOpen(false); }}
                  className="w-full text-left px-3 py-2 text-xs rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
                >
                  My Badges & Streak
                </button>
              </div>
            )}
          </div>

        </div>

      </div>
    </header>
  );
};
