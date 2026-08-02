import React from 'react';
import { Sparkles, Heart, ShieldCheck, Code, MessageSquare, Globe } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-auto border-t border-slate-200/80 dark:border-slate-800/80 bg-white/40 dark:bg-dark-bg/40 backdrop-blur-xl py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1700px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
        
        {/* Left: Branding & Tagline */}
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-brand-500" />
          <span className="font-semibold text-slate-900 dark:text-white">PromptForge AI</span>
          <span>—</span>
          <span>"Create Better Prompts. Build Smarter AI."</span>
        </div>

        {/* Center: Author & Version */}
        <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
          <span>Made with</span>
          <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500 animate-pulse" />
          <span>by <strong className="text-slate-900 dark:text-white font-bold">Nitesh Verma</strong></span>
          <span className="px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-800 text-[10px] font-mono font-bold">v1.0</span>
        </div>

        {/* Right: Status & Socials */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-emerald-500 font-medium text-[11px]">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>All AI Systems Operational</span>
          </div>
          <div className="flex items-center gap-3 border-l border-slate-200 dark:border-slate-800 pl-4">
            <a href="https://promptforge.ai" target="_blank" rel="noreferrer" className="hover:text-brand-500 transition-colors" title="Source Code">
              <Code className="w-4 h-4" />
            </a>
            <a href="https://promptforge.ai" target="_blank" rel="noreferrer" className="hover:text-brand-500 transition-colors" title="Community">
              <MessageSquare className="w-4 h-4" />
            </a>
            <a href="https://promptforge.ai" target="_blank" rel="noreferrer" className="hover:text-brand-500 transition-colors" title="Website">
              <Globe className="w-4 h-4" />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
