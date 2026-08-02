import React, { useState, useEffect } from 'react';
import { 
  Gauge, 
  Sparkles, 
  Wand2, 
  RotateCcw, 
  Download, 
  Copy, 
  Share2, 
  Check, 
  AlertCircle, 
  CheckCircle2, 
  HelpCircle, 
  ArrowRight,
  Split,
  Zap,
  TrendingUp,
  FileCode,
  Award,
  Layers,
  ChevronDown
} from 'lucide-react';
import type { PromptAnalysisResult, ScoreMetric, PromptComparisonData } from '../types';
import { analyzePromptText, comparePrompts } from '../utils/analyzerEngine';
import { exportPromptAsPDF, exportPromptAsWord, exportPromptAsMarkdown, exportPromptAsTXT, exportPromptAsJSON } from '../utils/exportUtils';
import confetti from 'canvas-confetti';

interface PromptAnalyzerViewProps {
  initialPromptText?: string;
  onSavePrompt?: (title: string, promptText: string, category: string, score: number) => void;
}

export const PromptAnalyzerView: React.FC<PromptAnalyzerViewProps> = ({
  initialPromptText = '',
  onSavePrompt
}) => {
  const [promptText, setPromptText] = useState(initialPromptText);
  const [analysis, setAnalysis] = useState<PromptAnalysisResult | null>(null);
  const [activeVersionTab, setActiveVersionTab] = useState<'better' | 'professional' | 'expert'>('expert');
  const [copied, setCopied] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'judge' | 'breakdown' | 'versions' | 'comparison'>('judge');

  // Initial analysis if initial text is passed
  useEffect(() => {
    if (initialPromptText) {
      handleAnalyze(initialPromptText);
    }
  }, [initialPromptText]);

  const handleAnalyze = (textToAnalyze?: string) => {
    const targetText = textToAnalyze !== undefined ? textToAnalyze : promptText;
    if (!targetText.trim()) return;
    const res = analyzePromptText(targetText);
    setAnalysis(res);

    if (res.overallScore >= 90) {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 }
      });
    }
  };

  const handleReset = () => {
    setPromptText('');
    setAnalysis(null);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const samplePrompts = [
    { label: 'Basic Code Request (Weak)', text: 'Write a python script for web scraping.' },
    { label: 'Standard Marketing (Moderate)', text: 'Write a blog post about artificial intelligence trends in 2026 for tech enthusiasts.' },
    { label: 'Advanced System Prompt (Expert)', text: 'Act as a Senior AI Architect. Analyze the following microservice design for edge-case vulnerabilities, state serialization bugs, and latency bottlenecks. Return your findings in a structured Markdown table with severity metrics (High, Medium, Low) and proposed patches.' }
  ];

  const currentVersionText = analysis?.versions[activeVersionTab] || '';
  const comparisonData: PromptComparisonData | null = analysis && currentVersionText
    ? comparePrompts(promptText, currentVersionText)
    : null;

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 glass-panel p-6 rounded-3xl border border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-brand-500 font-bold text-xs uppercase tracking-wider mb-1">
            <Gauge className="w-4 h-4" />
            <span>AI Quality Judge & Optimizer</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">Prompt Quality Analyzer</h1>
          <p className="text-xs text-slate-400 mt-1">
            Judge prompt clarity, specificity, hallucination risks, and generate expert refactored versions instantly.
          </p>
        </div>

        {/* Quick Preset Pickers */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-semibold text-slate-400">Load Sample:</span>
          {samplePrompts.map((s, idx) => (
            <button
              key={idx}
              onClick={() => {
                setPromptText(s.text);
                handleAnalyze(s.text);
              }}
              className="text-[11px] px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-brand-500/10 hover:text-brand-500 font-medium transition-colors"
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Input Box Area */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-brand-500" />
            <span>Input Prompt</span>
          </label>
          <div className="flex items-center gap-3 text-xs text-slate-400">
            <span>Words: <strong>{promptText.trim() ? promptText.trim().split(/\s+/).length : 0}</strong></span>
            <span>•</span>
            <span>Tokens: <strong>~{Math.ceil((promptText.trim().split(/\s+/).length || 0) * 1.35)}</strong></span>
          </div>
        </div>

        <textarea
          value={promptText}
          onChange={(e) => setPromptText(e.target.value)}
          placeholder="Paste your prompt here..."
          rows={6}
          className="w-full p-4 text-xs font-mono rounded-2xl bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/50 transition-all resize-y"
        />

        {/* Action Button Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => handleAnalyze()}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-600 to-purple-600 hover:from-brand-700 hover:to-purple-700 text-white text-xs font-bold shadow-lg shadow-brand-500/20 flex items-center gap-2 transition-transform hover:scale-105"
            >
              <Gauge className="w-4 h-4" />
              <span>Analyze</span>
            </button>

            <button
              onClick={() => {
                handleAnalyze();
                setActiveTab('versions');
              }}
              className="px-4 py-2.5 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 hover:bg-purple-500/20 text-xs font-bold flex items-center gap-2 transition-colors"
            >
              <Wand2 className="w-4 h-4" />
              <span>Improve & Rewrite</span>
            </button>

            <button
              onClick={() => {
                handleAnalyze();
                setActiveTab('comparison');
              }}
              className="px-4 py-2.5 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 hover:bg-cyan-500/20 text-xs font-bold flex items-center gap-2 transition-colors"
            >
              <Split className="w-4 h-4" />
              <span>Compare Versions</span>
            </button>

            <button
              onClick={handleReset}
              className="px-3 py-2.5 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-medium flex items-center gap-1.5 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleCopy(promptText)}
              className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy'}</span>
            </button>

            {/* Export Menu */}
            <div className="relative">
              <button
                onClick={() => setExportOpen(!exportOpen)}
                className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export</span>
                <ChevronDown className="w-3 h-3" />
              </button>

              {exportOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl p-2 z-50">
                  <button
                    onClick={() => { exportPromptAsPDF('Prompt Quality Analysis', promptText, 'General', analysis?.overallScore); setExportOpen(false); }}
                    className="w-full text-left px-3 py-2 text-xs rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
                  >
                    Export as PDF (.pdf)
                  </button>
                  <button
                    onClick={() => { exportPromptAsWord('Prompt Analysis', promptText, 'General'); setExportOpen(false); }}
                    className="w-full text-left px-3 py-2 text-xs rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
                  >
                    Export as Word (.doc)
                  </button>
                  <button
                    onClick={() => { exportPromptAsMarkdown('Prompt Analysis', promptText, 'General', analysis?.overallScore); setExportOpen(false); }}
                    className="w-full text-left px-3 py-2 text-xs rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
                  >
                    Export as Markdown (.md)
                  </button>
                  <button
                    onClick={() => { exportPromptAsTXT('Prompt Analysis', promptText); setExportOpen(false); }}
                    className="w-full text-left px-3 py-2 text-xs rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
                  >
                    Export as Text (.txt)
                  </button>
                  <button
                    onClick={() => { exportPromptAsJSON('Prompt Analysis', promptText, { analysis }); setExportOpen(false); }}
                    className="w-full text-left px-3 py-2 text-xs rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
                  >
                    Export as JSON (.json)
                  </button>
                </div>
              )}
            </div>

            {onSavePrompt && (
              <button
                onClick={() => onSavePrompt('Analyzed Prompt', promptText, 'General', analysis?.overallScore || 85)}
                className="px-3.5 py-2 rounded-xl bg-brand-500/10 text-brand-500 border border-brand-500/20 hover:bg-brand-500/20 text-xs font-semibold transition-colors"
              >
                Save Prompt
              </button>
            )}
          </div>

        </div>
      </div>

      {/* Analysis Results Display */}
      {analysis && (
        <div className="space-y-6">
          
          {/* Top Score Banner: Circular Gauge + High-level Verdict */}
          <div className="glass-panel p-6 rounded-3xl border border-slate-200 dark:border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            
            {/* Circular Gauge Score */}
            <div className="flex items-center gap-6 justify-center md:justify-start">
              <div className="relative w-28 h-28 flex items-center justify-center">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    className="stroke-slate-200 dark:stroke-slate-800 fill-none"
                    strokeWidth="10"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    className="fill-none circle-progress-bar"
                    strokeWidth="10"
                    strokeDasharray="251.2"
                    strokeDashoffset={251.2 - (251.2 * analysis.overallScore) / 100}
                    strokeLinecap="round"
                    stroke={
                      analysis.overallScore >= 80 ? '#10b981' : analysis.overallScore >= 60 ? '#f59e0b' : '#ef4444'
                    }
                  />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="text-2xl font-black text-slate-900 dark:text-white">
                    {analysis.overallScore}%
                  </span>
                  <span className="text-[9px] font-extrabold uppercase text-slate-400">Quality Score</span>
                </div>
              </div>

              <div>
                <div className="text-xs font-semibold text-slate-400">Prompt Grade</div>
                <div className={`text-xl font-black ${
                  analysis.overallScore >= 80 ? 'text-emerald-500' : analysis.overallScore >= 60 ? 'text-amber-500' : 'text-rose-500'
                }`}>
                  {analysis.overallScore >= 90 ? 'S-Tier Expert' : analysis.overallScore >= 80 ? 'A-Tier Strong' : analysis.overallScore >= 60 ? 'B-Tier Moderate' : 'Needs Optimization'}
                </div>
                <div className="text-[11px] text-slate-400 mt-1">
                  Est. LLM Success Rate: <strong className="text-slate-700 dark:text-slate-200">{Math.round(analysis.overallScore * 0.96)}%</strong>
                </div>
              </div>
            </div>

            {/* Middle: Word & Token metrics */}
            <div className="space-y-2 border-y md:border-y-0 md:border-x border-slate-200 dark:border-slate-800 py-4 md:py-0 md:px-6">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Completeness Index:</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">
                  {analysis.metrics.find(m => m.name === 'Completeness')?.score || 75}%
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Hallucination Risk:</span>
                <span className="font-bold text-emerald-500">
                  {analysis.metrics.find(m => m.name === 'Hallucination Risk')?.score}% (Low)
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Ambiguity Score:</span>
                <span className="font-bold text-brand-500">
                  {analysis.metrics.find(m => m.name === 'Ambiguity Score')?.score}%
                </span>
              </div>
            </div>

            {/* Right: Quick Action to View Versions */}
            <div className="flex flex-col items-center md:items-end justify-center gap-2">
              <button
                onClick={() => setActiveTab('versions')}
                className="w-full md:w-auto px-5 py-2.5 rounded-2xl bg-gradient-to-r from-brand-600 to-purple-600 text-white font-bold text-xs shadow-md hover:scale-105 transition-transform flex items-center justify-center gap-2"
              >
                <Wand2 className="w-4 h-4" />
                <span>Get Refactored Versions</span>
              </button>
              <span className="text-[10px] text-slate-400">3 AI Enhanced Prompt Options</span>
            </div>

          </div>

          {/* Tab Navigation for Detailed Views */}
          <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
            {[
              { id: 'judge', label: 'AI Judge Feedback', icon: Award },
              { id: 'breakdown', label: '13 Score Breakdown', icon: Layers },
              { id: 'versions', label: 'Improved Versions', icon: Wand2 },
              { id: 'comparison', label: 'Prompt Comparison', icon: Split }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                    isActive 
                      ? 'bg-brand-500 text-white shadow-md' 
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* TAB 1: AI JUDGE FEEDBACK */}
          {activeTab === 'judge' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Strengths & Weaknesses */}
              <div className="glass-panel p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4">
                <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Prompt Strengths & Positives</span>
                </h3>
                <div className="space-y-2">
                  {analysis.judge.strengths.map((s, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-600 dark:text-emerald-400 font-medium flex items-start gap-2">
                      <Check className="w-4 h-4 shrink-0 mt-0.5" />
                      <span>{s}</span>
                    </div>
                  ))}
                </div>

                <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2 pt-2">
                  <AlertCircle className="w-4 h-4 text-amber-500" />
                  <span>Areas for Improvement</span>
                </h3>
                <div className="space-y-2">
                  {analysis.judge.weaknesses.map((w, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-600 dark:text-amber-400 font-medium flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                      <span>{w}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Missing Components & Recommendations */}
              <div className="glass-panel p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4">
                <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                  <Zap className="w-4 h-4 text-brand-500" />
                  <span>AI Judge Actionable Recommendations</span>
                </h3>

                <div className="space-y-3">
                  <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                    <div className="text-[11px] font-bold text-brand-500 uppercase tracking-wider mb-1">Missing Context</div>
                    <p className="text-xs text-slate-600 dark:text-slate-300">{analysis.judge.missingContext.join(' ')}</p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                    <div className="text-[11px] font-bold text-purple-500 uppercase tracking-wider mb-1">Missing Constraints</div>
                    <p className="text-xs text-slate-600 dark:text-slate-300">{analysis.judge.missingConstraints.join(' ')}</p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                    <div className="text-[11px] font-bold text-cyan-500 uppercase tracking-wider mb-1">Suggested Refinements</div>
                    <ul className="list-disc list-inside text-xs text-slate-600 dark:text-slate-300 space-y-1">
                      {analysis.judge.suggestedImprovements.map((imp, idx) => (
                        <li key={idx}>{imp}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: 13 SCORE BREAKDOWN */}
          {activeTab === 'breakdown' && (
            <div className="glass-panel p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-base text-slate-900 dark:text-white">13 Quality Metric Breakdown</h3>
                  <p className="text-xs text-slate-400">Detailed diagnostic evaluation across essential prompt parameters</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {analysis.metrics.map((metric, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-800 dark:text-slate-200">{metric.name}</span>
                      <span className="text-xs font-black" style={{ color: metric.color }}>{metric.score}%</span>
                    </div>

                    {/* Progress bar */}
                    <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                      <div 
                        className="h-full rounded-full transition-all duration-500" 
                        style={{ width: `${metric.score}%`, backgroundColor: metric.color }} 
                      />
                    </div>

                    <p className="text-[10px] text-slate-400 leading-relaxed">{metric.description}</p>
                    <div className="text-[10px] text-brand-500 font-medium italic pt-1 border-t border-slate-200/50 dark:border-slate-800/50">
                      💡 {metric.suggestion}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: IMPROVED VERSIONS */}
          {activeTab === 'versions' && (
            <div className="glass-panel p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
                <div>
                  <h3 className="font-bold text-base text-slate-900 dark:text-white">AI Refactored Versions</h3>
                  <p className="text-xs text-slate-400">Choose between Better, Professional, and Expert Chain-of-Thought structures</p>
                </div>

                <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-900 p-1 rounded-2xl border border-slate-200 dark:border-slate-800">
                  <button
                    onClick={() => setActiveVersionTab('better')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                      activeVersionTab === 'better' ? 'bg-brand-500 text-white shadow-md' : 'text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    Better Version
                  </button>
                  <button
                    onClick={() => setActiveVersionTab('professional')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                      activeVersionTab === 'professional' ? 'bg-brand-500 text-white shadow-md' : 'text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    Professional Version
                  </button>
                  <button
                    onClick={() => setActiveVersionTab('expert')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                      activeVersionTab === 'expert' ? 'bg-gradient-to-r from-purple-600 to-brand-600 text-white shadow-md' : 'text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    Expert CoT Version ⭐
                  </button>
                </div>
              </div>

              <div className="relative">
                <textarea
                  readOnly
                  value={currentVersionText}
                  rows={12}
                  className="w-full p-4 text-xs font-mono rounded-2xl bg-slate-900 text-slate-100 border border-slate-800 focus:outline-none leading-relaxed"
                />

                <div className="absolute top-3 right-3 flex items-center gap-2">
                  <button
                    onClick={() => handleCopy(currentVersionText)}
                    className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold backdrop-blur-md border border-white/20 flex items-center gap-1.5 transition-colors"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied!' : 'Copy Version'}</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: PROMPT COMPARISON */}
          {activeTab === 'comparison' && comparisonData && (
            <div className="glass-panel p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-base text-slate-900 dark:text-white">Side-by-Side Prompt Comparison</h3>
                  <p className="text-xs text-slate-400">Original Prompt vs Expert Refactored Prompt metrics</p>
                </div>
              </div>

              {/* Metric Difference Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center">
                  <div className="text-xs font-bold text-slate-400">Quality Score Diff</div>
                  <div className="text-2xl font-black text-emerald-500">+{comparisonData.qualityDiffPercent}%</div>
                  <div className="text-[10px] text-slate-400">{comparisonData.originalScore}% ➔ {comparisonData.improvedScore}%</div>
                </div>

                <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-center">
                  <div className="text-xs font-bold text-slate-400">Token Efficiency</div>
                  <div className="text-2xl font-black text-purple-500">{comparisonData.tokenDiffPercent}%</div>
                  <div className="text-[10px] text-slate-400">{comparisonData.originalTokens} ➔ {comparisonData.improvedTokens} Tokens</div>
                </div>

                <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-center">
                  <div className="text-xs font-bold text-slate-400">Readability Score</div>
                  <div className="text-2xl font-black text-cyan-500">{comparisonData.readabilityImproved}%</div>
                  <div className="text-[10px] text-slate-400">High Structural Clarity</div>
                </div>

                <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-center">
                  <div className="text-xs font-bold text-slate-400">LLM Success Rate</div>
                  <div className="text-2xl font-black text-amber-500">{comparisonData.successProbabilityImproved}%</div>
                  <div className="text-[10px] text-slate-400">Vs {comparisonData.successProbabilityOriginal}% Original</div>
                </div>
              </div>

              {/* Side by Side Code Comparison */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="text-xs font-bold text-slate-400 flex items-center justify-between">
                    <span>Original Prompt</span>
                    <span className="px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-800 text-[10px]">
                      Score: {comparisonData.originalScore}%
                    </span>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-700 dark:text-slate-300 min-h-48 whitespace-pre-wrap">
                    {comparisonData.originalText}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-xs font-bold text-brand-500 flex items-center justify-between">
                    <span>Improved Expert Prompt</span>
                    <span className="px-2 py-0.5 rounded-full bg-brand-500/10 text-brand-500 border border-brand-500/20 text-[10px] font-bold">
                      Score: {comparisonData.improvedScore}% ⭐
                    </span>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-900 border border-brand-500/30 text-xs font-mono text-emerald-400 min-h-48 whitespace-pre-wrap">
                    {comparisonData.improvedText}
                  </div>
                </div>
              </div>

            </div>
          )}

        </div>
      )}

    </div>
  );
};
