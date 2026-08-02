import React, { useState } from 'react';
import { Video, Camera, Sparkles, Copy, Check, Film, Play } from 'lucide-react';
import { exportPromptAsTXT } from '../utils/exportUtils';

export const VideoStudioView: React.FC = () => {
  const [model, setModel] = useState('Runway Gen-3 Alpha');
  const [cameraMotion, setCameraMotion] = useState('FPV Drone Flythrough');
  const [motionSpeed, setMotionSpeed] = useState('6');
  const [duration, setDuration] = useState('10 seconds');
  const [concept, setConcept] = useState('Cinematic journey through a futuristic cyberpunk metropolis at twilight, neon holographic billboards reflecting off rain-slicked glass skybridges.');
  const [copied, setCopied] = useState(false);

  const videoModels = ['Runway Gen-3 Alpha', 'Google Veo 2', 'OpenAI Sora', 'Luma Dream Machine', 'Kling AI 1.5', 'Pika 2.0'];
  const cameraMotions = ['FPV Drone Flythrough', 'Smooth Cinematic Zoom-In', 'Pan Left-to-Right', 'Orbit 360', 'Low-Angle Tracking Shot', 'Over-the-Shoulder Glide'];

  const promptOutput = `${cameraMotion} shot: ${concept}, hyper-realistic physical simulation, 4K resolution, 60fps, volumetric atmospheric fog, cinematic lighting, realistic fluid dynamics, motion strength: ${motionSpeed}/10, duration: ${duration}.`;

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
          <div className="flex items-center gap-2 text-amber-500 font-bold text-xs uppercase tracking-wider mb-1">
            <Video className="w-4 h-4" />
            <span>AI Motion & Video Studio</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">Video Prompt Studio</h1>
          <p className="text-xs text-slate-400 mt-1">
            Build camera movement & motion directives for Runway Gen-3, Veo 2, Sora, Luma & Kling AI.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Controls */}
        <div className="lg:col-span-7 glass-panel p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-6">
          
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-800 dark:text-slate-200">Target Video Generator</label>
            <div className="flex flex-wrap gap-2">
              {videoModels.map((m, idx) => (
                <button
                  key={idx}
                  onClick={() => setModel(m)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                    model === m ? 'bg-amber-500 text-white shadow-md' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-800 dark:text-slate-200">Camera Directive</label>
            <div className="flex flex-wrap gap-2">
              {cameraMotions.map((cam, idx) => (
                <button
                  key={idx}
                  onClick={() => setCameraMotion(cam)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                    cameraMotion === cam ? 'bg-purple-500 text-white shadow-md' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  {cam}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-800 dark:text-slate-200">Video Scene & Storyboard Concept</label>
              <textarea
                value={concept}
                onChange={(e) => setConcept(e.target.value)}
                rows={4}
                className="w-full p-3 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-800 dark:text-slate-200">Motion Strength (1-10)</label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={motionSpeed}
                  onChange={(e) => setMotionSpeed(e.target.value)}
                  className="w-full p-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-800 dark:text-slate-200">Target Duration</label>
                <select
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="w-full p-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none"
                >
                  <option value="5 seconds">5 Seconds</option>
                  <option value="10 seconds">10 Seconds</option>
                  <option value="15 seconds">15 Seconds</option>
                </select>
              </div>
            </div>
          </div>

        </div>

        {/* Live Output */}
        <div className="lg:col-span-5 glass-panel p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4 flex flex-col">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Generated Video Prompt</span>
            </h3>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/20">
              {model}
            </span>
          </div>

          <div className="flex-1 relative">
            <textarea
              readOnly
              value={promptOutput}
              rows={12}
              className="w-full h-full p-4 text-xs font-mono rounded-2xl bg-slate-900 text-amber-400 border border-slate-800 focus:outline-none leading-relaxed resize-none"
            />
          </div>

          <div className="flex items-center gap-2 pt-2">
            <button
              onClick={handleCopy}
              className="flex-1 py-2.5 rounded-xl bg-amber-500 text-white font-bold text-xs shadow-md flex items-center justify-center gap-2"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied to Clipboard!' : 'Copy Video Prompt'}</span>
            </button>
            <button
              onClick={() => exportPromptAsTXT('Video Prompt', promptOutput)}
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
