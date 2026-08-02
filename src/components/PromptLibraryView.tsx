import React, { useState } from 'react';
import { 
  FolderArchive, 
  Search, 
  Tag, 
  Star, 
  Bookmark, 
  Copy, 
  Check, 
  Trash2, 
  Edit3, 
  SlidersHorizontal,
  ExternalLink,
  Gauge
} from 'lucide-react';
import type { SavedPrompt, PromptTemplate } from '../types';
import { MOCK_TEMPLATES, INITIAL_SAVED_PROMPTS } from '../data/mockData';

interface PromptLibraryViewProps {
  savedPrompts: SavedPrompt[];
  setSavedPrompts: React.Dispatch<React.SetStateAction<SavedPrompt[]>>;
  onAnalyzePrompt: (text: string) => void;
}

export const PromptLibraryView: React.FC<PromptLibraryViewProps> = ({
  savedPrompts,
  setSavedPrompts,
  onAnalyzePrompt
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'templates' | 'saved' | 'favorites'>('templates');

  const categories = ['All', 'Coding', 'Image Generation', 'Business', 'Video Creation', 'Deep Research', 'Power BI', 'UI UX Design'];

  const filteredTemplates = MOCK_TEMPLATES.filter((t) => {
    const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase()) || t.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === 'All' || t.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const filteredSaved = savedPrompts.filter((s) => {
    const matchesSearch = s.title.toLowerCase().includes(searchQuery.toLowerCase()) || s.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === 'All' || s.category === selectedCategory;
    const matchesTab = activeTab === 'favorites' ? s.isFavorite : true;
    return matchesSearch && matchesCat && matchesTab;
  });

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const toggleFavorite = (id: string) => {
    setSavedPrompts(prev => prev.map(p => p.id === id ? { ...p, isFavorite: !p.isFavorite } : p));
  };

  const deleteSaved = (id: string) => {
    setSavedPrompts(prev => prev.filter(p => p.id !== id));
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-brand-500 font-bold text-xs uppercase tracking-wider mb-1">
            <FolderArchive className="w-4 h-4" />
            <span>Prompt Vault & Version Control</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">Prompt Library</h1>
          <p className="text-xs text-slate-400 mt-1">
            Access pre-built enterprise templates, manage your saved prompts, and organize prompt collections.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-900 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-800">
          <button
            onClick={() => setActiveTab('templates')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'templates' ? 'bg-brand-500 text-white shadow-md' : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            Templates ({MOCK_TEMPLATES.length})
          </button>
          <button
            onClick={() => setActiveTab('saved')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'saved' ? 'bg-brand-500 text-white shadow-md' : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            Saved Prompts ({savedPrompts.length})
          </button>
          <button
            onClick={() => setActiveTab('favorites')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'favorites' ? 'bg-amber-500 text-white shadow-md' : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            Favorites ({savedPrompts.filter(s => s.isFavorite).length})
          </button>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 glass-panel p-4 rounded-2xl border border-slate-200 dark:border-slate-800">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search prompts by title, keywords, tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/50"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto max-w-full pb-1 sm:pb-0">
          {categories.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedCategory === cat ? 'bg-brand-500 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* TEMPLATES GRID */}
      {activeTab === 'templates' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((t) => (
            <div key={t.id} className="glass-panel p-6 rounded-3xl border border-slate-200 dark:border-slate-800 flex flex-col justify-between space-y-4 hover:border-brand-500/50 transition-all hover:-translate-y-1">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-brand-500/10 text-brand-500 border border-brand-500/20">
                    {t.category}
                  </span>
                  <div className="flex items-center gap-1 text-amber-400 text-xs font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>{t.rating}</span>
                  </div>
                </div>

                <h3 className="font-bold text-base text-slate-900 dark:text-white leading-snug">{t.title}</h3>
                <p className="text-xs text-slate-400 line-clamp-2">{t.description}</p>
              </div>

              <div className="p-3 rounded-2xl bg-slate-900/90 text-xs font-mono text-emerald-400 line-clamp-3">
                {t.promptText}
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
                <span className="text-[10px] text-slate-400">{t.usesCount.toLocaleString()} Uses</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCopy(t.id, t.promptText)}
                    className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 text-xs font-semibold flex items-center gap-1"
                  >
                    {copiedId === t.id ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedId === t.id ? 'Copied' : 'Copy'}</span>
                  </button>

                  <button
                    onClick={() => onAnalyzePrompt(t.promptText)}
                    className="px-3 py-1.5 rounded-xl bg-brand-500 text-white text-xs font-bold flex items-center gap-1"
                  >
                    <Gauge className="w-3.5 h-3.5" />
                    <span>Analyze</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* SAVED & FAVORITES GRID */}
      {(activeTab === 'saved' || activeTab === 'favorites') && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSaved.length === 0 ? (
            <div className="col-span-full text-center py-12 glass-panel rounded-3xl border border-slate-200 dark:border-slate-800">
              <Bookmark className="w-12 h-12 mx-auto text-slate-400 mb-2" />
              <p className="text-sm font-semibold text-slate-400">No saved prompts found in this collection.</p>
            </div>
          ) : (
            filteredSaved.map((s) => (
              <div key={s.id} className="glass-panel p-6 rounded-3xl border border-slate-200 dark:border-slate-800 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-500 border border-purple-500/20">
                      {s.category}
                    </span>
                    <button onClick={() => toggleFavorite(s.id)}>
                      <Star className={`w-4 h-4 ${s.isFavorite ? 'fill-amber-400 text-amber-400' : 'text-slate-400'}`} />
                    </button>
                  </div>

                  <h3 className="font-bold text-base text-slate-900 dark:text-white">{s.title}</h3>
                  <div className="text-[10px] text-slate-400">Model: {s.model} • Quality Score: {s.score}%</div>
                </div>

                <div className="p-3 rounded-2xl bg-slate-900/90 text-xs font-mono text-emerald-400 line-clamp-4">
                  {s.improvedContent || s.content}
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
                  <button
                    onClick={() => deleteSaved(s.id)}
                    className="p-1.5 text-rose-500 hover:bg-rose-500/10 rounded-lg text-xs"
                    title="Delete Prompt"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleCopy(s.id, s.improvedContent || s.content)}
                      className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold flex items-center gap-1"
                    >
                      {copiedId === s.id ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedId === s.id ? 'Copied' : 'Copy'}</span>
                    </button>

                    <button
                      onClick={() => onAnalyzePrompt(s.improvedContent || s.content)}
                      className="px-3 py-1.5 rounded-xl bg-brand-500 text-white text-xs font-bold flex items-center gap-1"
                    >
                      <Gauge className="w-3.5 h-3.5" />
                      <span>Analyze</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

    </div>
  );
};
