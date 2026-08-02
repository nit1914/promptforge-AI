import React, { useState } from 'react';
import { Microscope, Sparkles, Copy, Check, Download, BookOpen, Layers, CheckCircle2 } from 'lucide-react';
import { exportPromptAsPDF, exportPromptAsMarkdown } from '../utils/exportUtils';

export const DeepResearchView: React.FC = () => {
  const [topic, setTopic] = useState('Autonomous AI Agent Orchestration and Multi-Agent Consensus');
  const [goal, setGoal] = useState('Evaluate fault tolerance, state sync protocols, and LLM reasoning benchmarks across multi-agent workflows.');
  const [depth, setDepth] = useState<'standard' | 'comprehensive' | 'exhaustive'>('exhaustive');
  const [academicStyle, setAcademicStyle] = useState('IEEE');
  const [copied, setCopied] = useState(false);

  const researchPromptOutput = `[DEEP RESEARCH SYNTHESIS DIRECTIVE - ${depth.toUpperCase()}]
SYSTEM ROLE: Principal AI Scientist & Senior Research Fellow.

RESEARCH TOPIC:
"${topic}"

CORE OBJECTIVE:
"${goal}"

[EXHAUSTIVE RESEARCH METHODOLOGY]
1. **Executive Abstract**: Synthesize key findings in 300 words.
2. **Theoretical Architecture & Taxonomy**: Deconstruct underlying models, algorithms, and protocols.
3. **Empirical Benchmarks & Comparative Matrix**: Compare performance, latency, accuracy, and failure rates across industry implementations.
4. **Counter-Arguments & Critical Edge Cases**: Highlight security vulnerabilities, hallucination vectors, and scaling bottlenecks.
5. **Action Plan & Future Horizons**: Provide concrete 6-month technical implementation roadmap.

CITATION STYLE: ${academicStyle}
FORMAT Directives: Markdown document with IEEE tables, mathematical equations (LaTeX notation), and explicit literature references.`;

  const handleCopy = () => {
    navigator.clipboard.writeText(researchPromptOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div className="glass-panel p-6 rounded-3xl border border-slate-200 dark:border-slate-800 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-rose-500 font-bold text-xs uppercase tracking-wider mb-1">
            <Microscope className="w-4 h-4" />
            <span>Academic & Deep Research AI</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">Deep Research AI Studio</h1>
          <p className="text-xs text-slate-400 mt-1">
            Generate exhaustive research synthesis prompts, IEEE paper breakdowns, and technical action plans.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 glass-panel p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-6">
          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-800 dark:text-slate-200">Research Topic</label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full p-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-800 dark:text-slate-200">Primary Research Goal & Scope</label>
              <textarea
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                rows={3}
                className="w-full p-3 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-rose-500/50"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-800 dark:text-slate-200">Research Depth</label>
                <div className="flex gap-2">
                  {(['standard', 'comprehensive', 'exhaustive'] as const).map((d) => (
                    <button
                      key={d}
                      onClick={() => setDepth(d)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-colors ${
                        depth === d ? 'bg-rose-500 text-white shadow-md' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-800 dark:text-slate-200">Academic Citation Style</label>
                <select
                  value={academicStyle}
                  onChange={(e) => setAcademicStyle(e.target.value)}
                  className="w-full p-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none"
                >
                  <option value="IEEE">IEEE Citation Format</option>
                  <option value="APA 7th">APA 7th Edition</option>
                  <option value="Harvard">Harvard Reference System</option>
                  <option value="Executive Briefing">Executive Briefing Style</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 glass-panel p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4 flex flex-col">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-rose-500" />
              <span>Deep Research Prompt</span>
            </h3>
          </div>

          <div className="flex-1 relative">
            <textarea
              readOnly
              value={researchPromptOutput}
              rows={14}
              className="w-full h-full p-4 text-xs font-mono rounded-2xl bg-slate-900 text-rose-300 border border-slate-800 focus:outline-none leading-relaxed resize-none"
            />
          </div>

          <div className="flex items-center gap-2 pt-2">
            <button
              onClick={handleCopy}
              className="flex-1 py-2.5 rounded-xl bg-rose-500 text-white font-bold text-xs shadow-md flex items-center justify-center gap-2"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied!' : 'Copy Research Directive'}</span>
            </button>
            <button
              onClick={() => exportPromptAsMarkdown('Deep Research Protocol', researchPromptOutput, 'Research')}
              className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold"
            >
              Export
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
