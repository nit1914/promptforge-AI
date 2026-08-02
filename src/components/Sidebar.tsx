import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Gauge, 
  Wand2, 
  BookOpen, 
  Microscope, 
  Image as ImageIcon, 
  Video, 
  Layout, 
  Code2, 
  FileText, 
  GraduationCap, 
  PenTool, 
  Briefcase, 
  Megaphone, 
  FileSpreadsheet, 
  Share2, 
  Search, 
  BarChart3, 
  Terminal, 
  Database, 
  PieChart, 
  Table, 
  Presentation, 
  GitFork, 
  FileCheck2, 
  FolderArchive, 
  Bookmark, 
  Star, 
  History, 
  Settings, 
  ChevronRight,
  Flame
} from 'lucide-react';
import type { NavigationTab } from '../types';

interface SidebarProps {
  activeTab: NavigationTab;
  setActiveTab: (tab: NavigationTab) => void;
  collapsed: boolean;
  setCollapsed: (val: boolean) => void;
}

interface NavItem {
  id: NavigationTab;
  label: string;
  icon: React.ElementType;
  badge?: string;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  collapsed,
  setCollapsed
}) => {
  const sections: NavSection[] = [
    {
      title: 'CORE STUDIO',
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'analyzer', label: 'Prompt Analyzer', icon: Gauge, badge: 'AI Judge' },
        { id: 'generator', label: 'Prompt Generator', icon: Wand2 },
        { id: 'templates', label: 'Prompt Templates', icon: BookOpen },
        { id: 'research', label: 'Deep Research AI', icon: Microscope, badge: 'Pro' }
      ]
    },
    {
      title: 'CREATIVE & BUILDER STUDIOS',
      items: [
        { id: 'image-studio', label: 'Image Prompt Studio', icon: ImageIcon },
        { id: 'video-studio', label: 'Video Prompt Studio', icon: Video },
        { id: 'ui-generator', label: 'UI UX Generator', icon: Layout },
        { id: 'code-prompt', label: 'Code Prompt', icon: Code2 },
        { id: 'notes-generator', label: 'Notes Generator', icon: FileText },
        { id: 'study-assistant', label: 'Study Assistant', icon: GraduationCap },
        { id: 'handwritten-notes', label: 'Handwritten Notes', icon: PenTool }
      ]
    },
    {
      title: 'SPECIALIZED PROMPTS',
      items: [
        { id: 'business', label: 'Business Prompts', icon: Briefcase },
        { id: 'marketing', label: 'Marketing Prompts', icon: Megaphone },
        { id: 'resume', label: 'Resume Builder', icon: FileSpreadsheet },
        { id: 'linkedin', label: 'LinkedIn Generator', icon: Share2 },
        { id: 'youtube', label: 'YouTube Prompt', icon: Video },
        { id: 'social-media', label: 'Social Media', icon: Share2 },
        { id: 'seo', label: 'SEO Prompt', icon: Search },
        { id: 'data-analysis', label: 'Data Analysis', icon: BarChart3 },
        { id: 'python', label: 'Python Prompt', icon: Terminal },
        { id: 'sql', label: 'SQL Prompt', icon: Database },
        { id: 'power-bi', label: 'Power BI Prompt', icon: PieChart },
        { id: 'excel', label: 'Excel Prompt', icon: Table },
        { id: 'presentation', label: 'Presentation Prompt', icon: Presentation },
        { id: 'mind-map', label: 'Mind Map', icon: GitFork },
        { id: 'research-papers', label: 'Research Papers', icon: FileCheck2 }
      ]
    },
    {
      title: 'PERSONAL & LIBRARY',
      items: [
        { id: 'library', label: 'Prompt Library', icon: FolderArchive },
        { id: 'saved', label: 'Saved Prompts', icon: Bookmark },
        { id: 'favorites', label: 'Favorites', icon: Star },
        { id: 'history', label: 'History', icon: History },
        { id: 'achievements', label: 'Streak & Badges', icon: Flame },
        { id: 'settings', label: 'Settings', icon: Settings }
      ]
    }
  ];

  return (
    <aside 
      className={`sticky top-16 h-[calc(100vh-4rem)] border-r border-slate-200/80 dark:border-slate-800/80 bg-white/60 dark:bg-dark-bg/60 backdrop-blur-xl transition-all duration-300 flex flex-col z-30 ${
        collapsed ? 'w-16' : 'w-64'
      }`}
    >
      {/* Collapse Toggle Button */}
      <div className="p-3 flex justify-end border-b border-slate-100 dark:border-slate-800/80">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors"
          title={collapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          <ChevronRight className={`w-4 h-4 transition-transform duration-300 ${collapsed ? '' : 'rotate-180'}`} />
        </button>
      </div>

      {/* Navigation Scroll Container */}
      <div className="flex-1 overflow-y-auto p-2 space-y-6">
        {sections.map((sec, sIdx) => (
          <div key={sIdx}>
            {!collapsed && (
              <h3 className="px-3 text-[10px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
                {sec.title}
              </h3>
            )}
            <div className="space-y-0.5">
              {sec.items.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-all group relative ${
                      isActive 
                        ? 'bg-gradient-to-r from-brand-600 to-purple-600 text-white font-semibold shadow-md shadow-brand-500/20' 
                        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-white'
                    }`}
                    title={collapsed ? item.label : undefined}
                  >
                    <Icon className={`w-4 h-4 shrink-0 transition-transform group-hover:scale-110 ${
                      isActive ? 'text-white' : 'text-slate-500 dark:text-slate-400 group-hover:text-brand-500'
                    }`} />
                    {!collapsed && (
                      <span className="truncate flex-1 text-left">{item.label}</span>
                    )}
                    {!collapsed && item.badge && (
                      <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${
                        isActive 
                          ? 'bg-white/20 text-white' 
                          : 'bg-brand-500/10 text-brand-500 border border-brand-500/20'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};
