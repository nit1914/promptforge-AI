import React from 'react';
import { 
  Sparkles, 
  Gauge, 
  Wand2, 
  BookOpen, 
  Flame, 
  TrendingUp, 
  Layers, 
  Cpu, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  Star,
  Image as ImageIcon,
  Video,
  Layout,
  Code2,
  FileText
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import type { NavigationTab } from '../types';
import { AI_MODELS, PROMPT_CATEGORIES } from '../data/mockData';

interface DashboardViewProps {
  setActiveTab: (tab: NavigationTab) => void;
  onQuickAnalyze: (promptText: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ setActiveTab, onQuickAnalyze }) => {

  const chartData = [
    { day: 'Mon', score: 78, prompts: 12 },
    { day: 'Tue', score: 82, prompts: 19 },
    { day: 'Wed', score: 88, prompts: 24 },
    { day: 'Thu', score: 84, prompts: 18 },
    { day: 'Fri', score: 92, prompts: 31 },
    { day: 'Sat', score: 95, prompts: 28 },
    { day: 'Sun', score: 97, prompts: 35 },
  ];

  const quickLaunchers = [
    { title: 'Prompt Quality Analyzer', tab: 'analyzer' as NavigationTab, desc: 'Judge & optimize prompt score 0-100%', icon: Gauge, color: 'from-blue-500 to-indigo-600' },
    { title: 'Category Generator', tab: 'generator' as NavigationTab, desc: 'Build prompts for 40+ use cases', icon: Wand2, color: 'from-purple-500 to-pink-600' },
    { title: 'Image Prompt Studio', tab: 'image-studio' as NavigationTab, desc: 'Midjourney, Flux, Imagen & DALL-E', icon: ImageIcon, color: 'from-emerald-500 to-teal-600' },
    { title: 'Video Prompt Studio', tab: 'video-studio' as NavigationTab, desc: 'Runway, Veo, Sora & Kling AI', icon: Video, color: 'from-amber-500 to-orange-600' },
    { title: 'UI UX Studio', tab: 'ui-generator' as NavigationTab, desc: 'SaaS, Dashboards & Figma prompts', icon: Layout, color: 'from-cyan-500 to-blue-600' },
    { title: 'Deep Research AI', tab: 'research' as NavigationTab, desc: 'Academic reports & synthesis', icon: Sparkles, color: 'from-rose-500 to-purple-600' },
  ];

  const sampleQuickPrompts = [
    { title: 'Next.js App Router Architecture', category: 'Coding', text: 'Act as a Senior Architect. Review Next.js 14 App Router layout for server-side rendering performance.' },
    { title: 'Midjourney Cyberpunk Photorealism', category: 'Image Gen', text: 'Hyperrealistic portrait of an AI researcher in obsidian lab, 8K resolution, Hasselblad lens --v 6.0' },
    { title: 'Y-Combinator SaaS Pitch Deck', category: 'Business', text: 'Draft a 10-slide YC pitch deck structure for an AI document search startup.' }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-brand-950 to-purple-950 p-8 sm:p-10 border border-slate-800 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-96 h-96 bg-brand-500/20 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />
        <div className="absolute bottom-0 left-1/3 -mb-10 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-semibold backdrop-blur-md border border-white/20">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Welcome Back — Prompt Quality Starts Here</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Forge Perfect Prompts. <br />
            <span className="gradient-text">Power Any AI Model.</span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            PromptForge AI analyzes prompt clarity, calculates 13 score metrics, detects hallucination risks, and refactors prompts for ChatGPT, Gemini, Claude, DeepSeek & Midjourney.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={() => setActiveTab('analyzer')}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-brand-500 to-purple-600 hover:from-brand-600 hover:to-purple-700 text-white font-bold text-sm shadow-xl shadow-brand-500/25 flex items-center gap-2 transition-transform hover:scale-105"
            >
              <Gauge className="w-4 h-4" />
              <span>Analyze Prompt Quality</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setActiveTab('generator')}
              className="px-6 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm backdrop-blur-md border border-white/20 flex items-center gap-2 transition-all"
            >
              <Wand2 className="w-4 h-4 text-purple-400" />
              <span>Open Prompt Generator</span>
            </button>
          </div>
        </div>
      </div>

      {/* 7 Key Statistics Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
        
        <div className="glass-panel p-4 rounded-2xl border border-slate-200 dark:border-slate-800">
          <div className="text-slate-400 text-xs font-medium mb-1">Total Prompts</div>
          <div className="text-2xl font-black text-slate-900 dark:text-white">1,420</div>
          <div className="text-[10px] text-emerald-500 font-semibold mt-1 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> +14% this week
          </div>
        </div>

        <div className="glass-panel p-4 rounded-2xl border border-slate-200 dark:border-slate-800">
          <div className="text-slate-400 text-xs font-medium mb-1">Prompt Score</div>
          <div className="text-2xl font-black text-brand-500">94.8%</div>
          <div className="text-[10px] text-slate-400 mt-1">AI Judge Score</div>
        </div>

        <div className="glass-panel p-4 rounded-2xl border border-slate-200 dark:border-slate-800">
          <div className="text-slate-400 text-xs font-medium mb-1">Average Quality</div>
          <div className="text-2xl font-black text-purple-500">92 / 100</div>
          <div className="text-[10px] text-purple-400 mt-1">High Optimization</div>
        </div>

        <div className="glass-panel p-4 rounded-2xl border border-slate-200 dark:border-slate-800">
          <div className="text-slate-400 text-xs font-medium mb-1">Today's Usage</div>
          <div className="text-2xl font-black text-slate-900 dark:text-white">35 Runs</div>
          <div className="text-[10px] text-amber-500 font-semibold mt-1">Active Session</div>
        </div>

        <div className="glass-panel p-4 rounded-2xl border border-slate-200 dark:border-slate-800">
          <div className="text-slate-400 text-xs font-medium mb-1">Saved Templates</div>
          <div className="text-2xl font-black text-slate-900 dark:text-white">40+</div>
          <div className="text-[10px] text-slate-400 mt-1">Ready to use</div>
        </div>

        <div className="glass-panel p-4 rounded-2xl border border-slate-200 dark:border-slate-800">
          <div className="text-slate-400 text-xs font-medium mb-1">Categories</div>
          <div className="text-2xl font-black text-cyan-500">{PROMPT_CATEGORIES.length}</div>
          <div className="text-[10px] text-cyan-400 mt-1">Domain specific</div>
        </div>

        <div className="glass-panel p-4 rounded-2xl border border-slate-200 dark:border-slate-800 col-span-2 sm:col-span-1">
          <div className="text-slate-400 text-xs font-medium mb-1">AI Models</div>
          <div className="text-2xl font-black text-emerald-500">{AI_MODELS.length}</div>
          <div className="text-[10px] text-emerald-400 mt-1">ChatGPT, Claude, Gemini</div>
        </div>

      </div>

      {/* Main Grid: Quality Chart + Quick Sample Launcher */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Quality Trend Chart */}
        <div className="lg:col-span-2 glass-panel p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-bold text-base text-slate-900 dark:text-white">Prompt Quality Index Over Time</h2>
              <p className="text-xs text-slate-400">Weekly average quality scores & generation volume</p>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-brand-500 bg-brand-500/10 px-3 py-1 rounded-full border border-brand-500/20">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+18.4% Quality Gain</span>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="scoreColor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.1)" />
                <XAxis dataKey="day" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis domain={[50, 100]} stroke="#94a3b8" fontSize={11} tickLine={false} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#0f172a', 
                    borderColor: '#334155', 
                    borderRadius: '12px',
                    color: '#ffffff',
                    fontSize: '12px'
                  }} 
                />
                <Area type="monotone" dataKey="score" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#scoreColor)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quick Sample Prompts */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4">
          <div>
            <h2 className="font-bold text-base text-slate-900 dark:text-white">Instant Quick Analyze</h2>
            <p className="text-xs text-slate-400">Click any sample to analyze quality immediately</p>
          </div>

          <div className="space-y-3">
            {sampleQuickPrompts.map((p, idx) => (
              <div 
                key={idx}
                onClick={() => onQuickAnalyze(p.text)}
                className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 hover:border-brand-500/50 cursor-pointer transition-all hover:scale-[1.02] group"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-brand-500">{p.title}</span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                    {p.category}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 line-clamp-2">{p.text}</p>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Quick Launchers Grid */}
      <div className="space-y-4">
        <h2 className="font-bold text-lg text-slate-900 dark:text-white">Engineering Studios Launcher</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickLaunchers.map((tool, idx) => {
            const Icon = tool.icon;
            return (
              <div
                key={idx}
                onClick={() => setActiveTab(tool.tab)}
                className="glass-panel p-5 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-brand-500/50 cursor-pointer transition-all hover:-translate-y-1 group"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${tool.color} flex items-center justify-center text-white shadow-lg shadow-brand-500/10 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-brand-500 transition-colors">
                      {tool.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">{tool.desc}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
