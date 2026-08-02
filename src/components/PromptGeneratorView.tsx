import React, { useState } from 'react';
import { 
  Wand2, 
  Sparkles, 
  Copy, 
  Check, 
  Download, 
  SlidersHorizontal, 
  FileCode, 
  Bot, 
  Layers,
  ChevronDown
} from 'lucide-react';
import { PROMPT_CATEGORIES, PROMPT_TECHNIQUES, OUTPUT_STYLES, PROMPT_TYPES, AI_MODELS } from '../data/mockData';
import { buildGeneratedPrompt } from '../utils/promptGeneratorEngine';
import { exportPromptAsPDF, exportPromptAsWord, exportPromptAsMarkdown, exportPromptAsTXT, exportPromptAsJSON } from '../utils/exportUtils';
import type { AIModelInfo } from '../types';

interface PromptGeneratorViewProps {
  selectedModel: AIModelInfo;
  onAnalyzePrompt: (promptText: string) => void;
  onSavePrompt?: (title: string, promptText: string, category: string, score: number) => void;
}

export const PromptGeneratorView: React.FC<PromptGeneratorViewProps> = ({
  selectedModel,
  onAnalyzePrompt,
  onSavePrompt
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Coding');
  const [promptType, setPromptType] = useState<string>('Open Ended');
  const [technique, setTechnique] = useState<string>('Role Playing (Persona)');
  const [outputStyle, setOutputStyle] = useState<string>('Markdown Document');
  const [targetModel, setTargetModel] = useState<string>(selectedModel.name);
  
  const [topic, setTopic] = useState<string>('Next.js 14 Clean Architecture and State Management');
  const [audience, setAudience] = useState<string>('Senior Software Engineers');
  const [constraints, setConstraints] = useState<string>('Provide production-grade code, avoid conversational filler, and include TypeScript interfaces.');
  const [goal, setGoal] = useState<string>('Build a scalable micro-frontend component system');
  const [tone, setTone] = useState<string>('Authoritative, Crisp, Technical');
  const [examples, setExamples] = useState<string>('');

  const [generatedPrompt, setGeneratedPrompt] = useState<string>(() => 
    buildGeneratedPrompt({
      category: 'Coding',
      promptType: 'Open Ended',
      technique: 'Role Playing (Persona)',
      outputStyle: 'Markdown Document',
      targetModel: selectedModel.name,
      topic: 'Next.js 14 Clean Architecture and State Management',
      audience: 'Senior Software Engineers',
      constraints: 'Provide production-grade code, avoid conversational filler, and include TypeScript interfaces.',
      goal: 'Build a scalable micro-frontend component system',
      tone: 'Authoritative, Crisp, Technical',
      examples: ''
    })
  );

  const [copied, setCopied] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);

  const handleGenerate = () => {
    const prompt = buildGeneratedPrompt({
      category: selectedCategory,
      promptType,
      technique,
      outputStyle,
      targetModel,
      topic,
      audience,
      constraints,
      goal,
      tone,
      examples
    });
    setGeneratedPrompt(prompt);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-purple-500 font-bold text-xs uppercase tracking-wider mb-1">
            <Wand2 className="w-4 h-4" />
            <span>Universal AI Prompt Generator</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">AI Prompt Generator Studio</h1>
          <p className="text-xs text-slate-400 mt-1">
            Build specialized prompts for 40+ use cases across ChatGPT, Claude, Gemini, DeepSeek & Midjourney.
          </p>
        </div>

        <button
          onClick={handleGenerate}
          className="px-6 py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-brand-600 hover:from-purple-700 hover:to-brand-700 text-white font-bold text-xs shadow-lg shadow-purple-500/25 flex items-center justify-center gap-2 transition-transform hover:scale-105"
        >
          <Sparkles className="w-4 h-4 animate-pulse" />
          <span>Generate Prompt Now</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Form Controls (7 cols) */}
        <div className="lg:col-span-7 glass-panel p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-6">
          
          {/* Category Selector Grid */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-800 dark:text-slate-200">
              Select Category ({PROMPT_CATEGORIES.length} Available)
            </label>
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
              {PROMPT_CATEGORIES.slice(0, 15).map((cat, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                    selectedCategory === cat
                      ? 'bg-brand-500 text-white shadow-md'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            {/* Extended category dropdown */}
            <div className="relative pt-1">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full p-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-500/50"
              >
                {PROMPT_CATEGORIES.map((cat, idx) => (
                  <option key={idx} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Advanced Prompt Options Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-b border-slate-200 dark:border-slate-800 py-4">
            
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300">Prompt Type</label>
              <select
                value={promptType}
                onChange={(e) => setPromptType(e.target.value)}
                className="w-full p-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none"
              >
                {PROMPT_TYPES.map((t, idx) => (
                  <option key={idx} value={t}>{t}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300">Prompt Technique</label>
              <select
                value={technique}
                onChange={(e) => setTechnique(e.target.value)}
                className="w-full p-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none"
              >
                {PROMPT_TECHNIQUES.map((tech, idx) => (
                  <option key={idx} value={tech}>{tech}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300">Output Style</label>
              <select
                value={outputStyle}
                onChange={(e) => setOutputStyle(e.target.value)}
                className="w-full p-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none"
              >
                {OUTPUT_STYLES.map((out, idx) => (
                  <option key={idx} value={out}>{out}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300">Target AI Model</label>
              <select
                value={targetModel}
                onChange={(e) => setTargetModel(e.target.value)}
                className="w-full p-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none"
              >
                {AI_MODELS.map((m) => (
                  <option key={m.id} value={m.name}>{m.name}</option>
                ))}
              </select>
            </div>

          </div>

          {/* Detailed Inputs */}
          <div className="space-y-4">
            
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-800 dark:text-slate-200">Topic / Core Subject</label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g. Next.js 14 Clean Architecture, Photorealistic Midjourney Cyberpunk, YC Pitch Deck"
                className="w-full p-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-800 dark:text-slate-200">Target Audience</label>
                <input
                  type="text"
                  value={audience}
                  onChange={(e) => setAudience(e.target.value)}
                  placeholder="e.g. Senior Engineers, C-Level Executives"
                  className="w-full p-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-800 dark:text-slate-200">Tone & Style</label>
                <input
                  type="text"
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                  placeholder="e.g. Technical, Authoritative, Concise"
                  className="w-full p-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-800 dark:text-slate-200">Constraints & Rules</label>
              <textarea
                value={constraints}
                onChange={(e) => setConstraints(e.target.value)}
                placeholder="e.g. Maximum 3 paragraphs, no conversational fluff, include code block..."
                rows={2}
                className="w-full p-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none"
              />
            </div>

          </div>

        </div>

        {/* Right Column: Live Output Preview (5 cols) */}
        <div className="lg:col-span-5 glass-panel p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4 flex flex-col">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-500" />
              <span>Generated Prompt Output</span>
            </h3>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-500 border border-purple-500/20">
              {targetModel}
            </span>
          </div>

          <div className="flex-1 relative">
            <textarea
              readOnly
              value={generatedPrompt}
              rows={16}
              className="w-full h-full min-h-[350px] p-4 text-xs font-mono rounded-2xl bg-slate-900 text-emerald-400 border border-slate-800 focus:outline-none leading-relaxed resize-none"
            />
          </div>

          {/* Actions */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="px-4 py-2 rounded-xl bg-brand-500 text-white hover:bg-brand-600 text-xs font-bold flex items-center gap-1.5 shadow-md transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy Prompt'}</span>
              </button>

              <button
                onClick={() => onAnalyzePrompt(generatedPrompt)}
                className="px-3.5 py-2 rounded-xl bg-purple-500/10 text-purple-500 hover:bg-purple-500/20 text-xs font-bold flex items-center gap-1.5 transition-colors border border-purple-500/20"
              >
                <span>Analyze Quality</span>
              </button>
            </div>

            <div className="relative">
              <button
                onClick={() => setExportOpen(!exportOpen)}
                className="px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold flex items-center gap-1 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export</span>
                <ChevronDown className="w-3 h-3" />
              </button>

              {exportOpen && (
                <div className="absolute right-0 bottom-full mb-2 w-48 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl p-2 z-50">
                  <button
                    onClick={() => { exportPromptAsMarkdown(selectedCategory, generatedPrompt, selectedCategory); setExportOpen(false); }}
                    className="w-full text-left px-3 py-2 text-xs rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
                  >
                    Markdown (.md)
                  </button>
                  <button
                    onClick={() => { exportPromptAsPDF(selectedCategory, generatedPrompt, selectedCategory); setExportOpen(false); }}
                    className="w-full text-left px-3 py-2 text-xs rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
                  >
                    PDF Document (.pdf)
                  </button>
                  <button
                    onClick={() => { exportPromptAsTXT(selectedCategory, generatedPrompt); setExportOpen(false); }}
                    className="w-full text-left px-3 py-2 text-xs rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
                  >
                    Text (.txt)
                  </button>
                </div>
              )}
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
