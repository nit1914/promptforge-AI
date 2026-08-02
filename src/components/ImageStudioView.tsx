import React, { useState } from 'react';
import { Image as ImageIcon, Camera, Sparkles, Copy, Check, Download, Layers, Sliders } from 'lucide-react';
import { exportPromptAsMarkdown, exportPromptAsTXT } from '../utils/exportUtils';

export const ImageStudioView: React.FC = () => {
  const [model, setModel] = useState('Midjourney v6');
  const [style, setStyle] = useState('Photorealistic');
  const [aspectRatio, setAspectRatio] = useState('--ar 16:9');
  const [lens, setLens] = useState('85mm portrait lens f/1.4');
  const [lighting, setLighting] = useState('Volumetric cinematic twilight');
  const [subject, setSubject] = useState('Visionary AI researcher in an obsidian laboratory, soft glowing holograms reflecting on glass');
  const [stylize, setStylize] = useState('750');
  const [copied, setCopied] = useState(false);

  const imageModels = ['Midjourney v6', 'Flux.1 Pro', 'Imagen 3 (Google)', 'Gemini Ultra', 'Stable Diffusion XL', 'DALL-E 3 (ChatGPT)', 'Nano Banana'];
  const styles = ['Photorealistic', '3D Render (Octane)', 'Anime / Cyberpunk', 'Illustration', 'Product Photography', 'Poster Art', 'Architecture', 'High Fashion', 'Realistic'];
  const aspectRatios = ['--ar 16:9', '--ar 9:16', '--ar 1:1', '--ar 4:3', '--ar 21:9'];

  const promptOutput = `${subject}, ${style.toLowerCase()} style, shot on ${lens}, ${lighting}, hyper-detailed textures, 8K resolution ${model.includes('Midjourney') ? `${aspectRatio} --v 6.0 --stylize ${stylize} --style raw` : ''}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(promptOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-200 dark:border-slate-800 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-emerald-500 font-bold text-xs uppercase tracking-wider mb-1">
            <ImageIcon className="w-4 h-4" />
            <span>AI Image Engineering Studio</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">Image Prompt Studio</h1>
          <p className="text-xs text-slate-400 mt-1">
            Craft photorealistic prompts for Midjourney, Flux, Imagen, DALL-E & Stable Diffusion.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Controls (7 cols) */}
        <div className="lg:col-span-7 glass-panel p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-6">
          
          {/* Target Model */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-800 dark:text-slate-200">Target Image Engine</label>
            <div className="flex flex-wrap gap-2">
              {imageModels.map((m, idx) => (
                <button
                  key={idx}
                  onClick={() => setModel(m)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                    model === m ? 'bg-emerald-500 text-white shadow-md' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          {/* Aesthetic Style */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-800 dark:text-slate-200">Art & Aesthetic Style</label>
            <div className="flex flex-wrap gap-2">
              {styles.map((s, idx) => (
                <button
                  key={idx}
                  onClick={() => setStyle(s)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                    style === s ? 'bg-purple-500 text-white shadow-md' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Subject & Parameters */}
          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-800 dark:text-slate-200">Subject Description</label>
              <textarea
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                rows={3}
                className="w-full p-3 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-800 dark:text-slate-200">Camera Lens & Sensor</label>
                <input
                  type="text"
                  value={lens}
                  onChange={(e) => setLens(e.target.value)}
                  className="w-full p-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-800 dark:text-slate-200">Lighting Environment</label>
                <input
                  type="text"
                  value={lighting}
                  onChange={(e) => setLighting(e.target.value)}
                  className="w-full p-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-800 dark:text-slate-200">Aspect Ratio</label>
                <div className="flex gap-2">
                  {aspectRatios.map((ar, idx) => (
                    <button
                      key={idx}
                      onClick={() => setAspectRatio(ar)}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-bold ${
                        aspectRatio === ar ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {ar.replace('--ar ', '')}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-800 dark:text-slate-200">Midjourney Stylize (0 - 1000)</label>
                <input
                  type="number"
                  value={stylize}
                  onChange={(e) => setStylize(e.target.value)}
                  className="w-full p-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none"
                />
              </div>
            </div>

          </div>

        </div>

        {/* Live Output (5 cols) */}
        <div className="lg:col-span-5 glass-panel p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4 flex flex-col">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-500" />
              <span>Final Image Prompt</span>
            </h3>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
              {model}
            </span>
          </div>

          <div className="flex-1 relative">
            <textarea
              readOnly
              value={promptOutput}
              rows={12}
              className="w-full h-full p-4 text-xs font-mono rounded-2xl bg-slate-900 text-emerald-400 border border-slate-800 focus:outline-none leading-relaxed resize-none"
            />
          </div>

          <div className="flex items-center gap-2 pt-2">
            <button
              onClick={handleCopy}
              className="flex-1 py-2.5 rounded-xl bg-emerald-500 text-white font-bold text-xs shadow-md flex items-center justify-center gap-2"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied to Clipboard!' : 'Copy Image Prompt'}</span>
            </button>
            <button
              onClick={() => exportPromptAsTXT('Image Prompt', promptOutput)}
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
