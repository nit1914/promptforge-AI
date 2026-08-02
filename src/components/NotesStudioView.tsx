import React, { useState } from 'react';
import { FileText, GraduationCap, PenTool, Sparkles, Copy, Check, Download, BookOpen, Layers } from 'lucide-react';
import { exportPromptAsPDF, exportPromptAsMarkdown } from '../utils/exportUtils';

export const NotesStudioView: React.FC = () => {
  const [noteType, setNoteType] = useState('Lecture Notes');
  const [subject, setSubject] = useState('Quantum Computing & Shor\'s Algorithm');
  const [styleMode, setStyleMode] = useState<'standard' | 'handwritten'>('standard');
  const [copied, setCopied] = useState(false);

  const noteTypes = ['Lecture Notes', 'Exam Preparation', 'Mind Map Outline', 'Flashcards Deck', 'Executive Summary', 'Handwritten Style Notes', 'PDF Ready Study Guide'];

  const generatedNotesPrompt = `Act as an Elite Academic Tutor and Study Specialist.
Transform the core material on "${subject}" into structured ${noteType}.

[STUDY FORMAT PROTOCOL]
1. Executive Overview: 3 key takeaways.
2. Key Jargon & Formulae: Exact definitions with real-world analogies.
3. Active Recall Flashcards: 5 high-probability questions with step-by-step solutions.
4. Strategic Mind Map Tree: Clear visual outline.

${styleMode === 'handwritten' ? '[VISUAL HANDWRITTEN DIRECTIVE]\nStructure note headers using simulated organic handwriting formatting, bullet dots, and highlight boxes.' : ''}

Format response using clean GitHub Markdown with copyable code blocks for formulas.`;

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedNotesPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div className="glass-panel p-6 rounded-3xl border border-slate-200 dark:border-slate-800 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-brand-500 font-bold text-xs uppercase tracking-wider mb-1">
            <GraduationCap className="w-4 h-4" />
            <span>Academic & Notes Creator</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">Notes & Study Assistant</h1>
          <p className="text-xs text-slate-400 mt-1">
            Generate lecture notes, exam prep flashcards, mind maps, and handwritten-style study guides.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 glass-panel p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-800 dark:text-slate-200">Study Guide Type</label>
            <div className="flex flex-wrap gap-2">
              {noteTypes.map((t, idx) => (
                <button
                  key={idx}
                  onClick={() => setNoteType(t)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                    noteType === t ? 'bg-brand-500 text-white shadow-md' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-800 dark:text-slate-200">Subject / Course Module</label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full p-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-800 dark:text-slate-200">Presentation Aesthetics</label>
              <div className="flex gap-3">
                <button
                  onClick={() => setStyleMode('standard')}
                  className={`flex-1 p-3 rounded-2xl border text-xs font-bold flex items-center justify-center gap-2 ${
                    styleMode === 'standard' ? 'bg-brand-500/10 border-brand-500 text-brand-500' : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-400'
                  }`}
                >
                  <FileText className="w-4 h-4" />
                  <span>Standard Clean PDF</span>
                </button>
                <button
                  onClick={() => setStyleMode('handwritten')}
                  className={`flex-1 p-3 rounded-2xl border text-xs font-bold flex items-center justify-center gap-2 ${
                    styleMode === 'handwritten' ? 'bg-purple-500/10 border-purple-500 text-purple-500' : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-400'
                  }`}
                >
                  <PenTool className="w-4 h-4" />
                  <span>Organic Handwritten Style</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 glass-panel p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4 flex flex-col">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-brand-500" />
              <span>Notes Prompt Output</span>
            </h3>
          </div>

          <div className="flex-1 relative">
            <textarea
              readOnly
              value={generatedNotesPrompt}
              rows={14}
              className="w-full h-full p-4 text-xs font-mono rounded-2xl bg-slate-900 text-purple-300 border border-slate-800 focus:outline-none leading-relaxed resize-none"
            />
          </div>

          <div className="flex items-center gap-2 pt-2">
            <button
              onClick={handleCopy}
              className="flex-1 py-2.5 rounded-xl bg-brand-500 text-white font-bold text-xs shadow-md flex items-center justify-center gap-2"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied!' : 'Copy Notes Prompt'}</span>
            </button>
            <button
              onClick={() => exportPromptAsPDF('Study Notes Prompt', generatedNotesPrompt, 'Notes')}
              className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold"
            >
              Export PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
