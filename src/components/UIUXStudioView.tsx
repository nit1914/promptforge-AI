import React, { useState } from 'react';
import { Layout, Sparkles, Copy, Check, Download, Layers, Palette } from 'lucide-react';
import { exportPromptAsMarkdown, exportPromptAsTXT } from '../utils/exportUtils';

export const UIUXStudioView: React.FC = () => {
  const [appType, setAppType] = useState('SaaS Platform');
  const [themeMode, setThemeMode] = useState('Dark Glassmorphism');
  const [accentColor, setAccentColor] = useState('Indigo & Cyan (#6366f1, #06b6d4)');
  const [componentScope, setComponentScope] = useState('Analytics Dashboard with Recharts, Sidebar Navigation, Stats Cards, and Settings Drawer');
  const [copied, setCopied] = useState(false);

  const appTypes = ['SaaS Platform', 'Admin Dashboard', 'CRM System', 'ERP Platform', 'Portfolio Website', 'Education Portal', 'Healthcare Dashboard', 'Fintech App', 'AI Product Studio', 'Mobile App (iOS)', 'Landing Page', 'Figma Wireframe'];
  const themeModes = ['Dark Glassmorphism', 'Sleek Light Apple Style', 'Minimalist Notion Aesthetic', 'Vercel / Linear Monochromatic', 'Cyberpunk Glowing Neons'];

  const generatedSpec = `### SYSTEM ROLE
Act as a Lead UI/UX Designer at Apple & Vercel.

### PROJECT DIRECTIVE
Design a production-ready user interface for a ${appType}.

[DESIGN TOKENS & VISUAL STYLE]
- Aesthetic: ${themeMode} with smooth backdrop-blur (16px) and subtle 1px border highlights.
- Color Palette: Primary obsidian dark mode background (#090a0f), ${accentColor}.
- Typography: Inter font, crisp hierarchy, 1.5x line height.
- Component Radius: 16px rounded corners.

[REQUIRED COMPONENT BREAKDOWN]
1. ${componentScope}
2. Interactive micro-animations for hover states, active tab transitions, and loading skeletons.
3. Mobile responsive breakpoints (Desktop, Laptop, Tablet, Mobile).

[DELIVERABLE FORMAT]
Provide clean, modular Tailwind CSS code with TypeScript component props.`;

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedSpec);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div className="glass-panel p-6 rounded-3xl border border-slate-200 dark:border-slate-800 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-cyan-500 font-bold text-xs uppercase tracking-wider mb-1">
            <Layout className="w-4 h-4" />
            <span>UI/UX & Figma Studio</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">UI UX Prompt Studio</h1>
          <p className="text-xs text-slate-400 mt-1">
            Generate component specifications for SaaS, Admin Dashboards, Mobile Apps, CRM & Figma Wireframes.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 glass-panel p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-800 dark:text-slate-200">Application Type</label>
            <div className="flex flex-wrap gap-2">
              {appTypes.map((t, idx) => (
                <button
                  key={idx}
                  onClick={() => setAppType(t)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                    appType === t ? 'bg-cyan-500 text-white shadow-md' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-800 dark:text-slate-200">Visual Aesthetic</label>
            <div className="flex flex-wrap gap-2">
              {themeModes.map((tm, idx) => (
                <button
                  key={idx}
                  onClick={() => setThemeMode(tm)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                    themeMode === tm ? 'bg-purple-500 text-white shadow-md' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  {tm}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-800 dark:text-slate-200">Color Palette & Accents</label>
              <input
                type="text"
                value={accentColor}
                onChange={(e) => setAccentColor(e.target.value)}
                className="w-full p-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-800 dark:text-slate-200">Component Scope & Requirements</label>
              <textarea
                value={componentScope}
                onChange={(e) => setComponentScope(e.target.value)}
                rows={4}
                className="w-full p-3 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
              />
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 glass-panel p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4 flex flex-col">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-500" />
              <span>UI Directive Output</span>
            </h3>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-500 border border-cyan-500/20">
              {appType}
            </span>
          </div>

          <div className="flex-1 relative">
            <textarea
              readOnly
              value={generatedSpec}
              rows={14}
              className="w-full h-full p-4 text-xs font-mono rounded-2xl bg-slate-900 text-cyan-400 border border-slate-800 focus:outline-none leading-relaxed resize-none"
            />
          </div>

          <div className="flex items-center gap-2 pt-2">
            <button
              onClick={handleCopy}
              className="flex-1 py-2.5 rounded-xl bg-cyan-500 text-white font-bold text-xs shadow-md flex items-center justify-center gap-2"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied!' : 'Copy UI Prompt'}</span>
            </button>
            <button
              onClick={() => exportPromptAsMarkdown('UI Directive', generatedSpec, 'UI UX Design')}
              className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold"
            >
              Export .md
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
