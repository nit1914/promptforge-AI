import React from 'react';
import { Flame, Award, Crown, Trophy, Layers, Download, CheckCircle2, Sparkles } from 'lucide-react';
import type { AchievementItem, DailyStreakData } from '../types';
import confetti from 'canvas-confetti';

interface AchievementsViewProps {
  streakData: DailyStreakData;
  achievements: AchievementItem[];
}

export const AchievementsView: React.FC<AchievementsViewProps> = ({
  streakData,
  achievements
}) => {
  const triggerConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const leaderboard = [
    { rank: 1, name: 'Nitesh Verma', prompts: 1420, score: '98.6%', badge: 'Master Architect 👑' },
    { rank: 2, name: 'Alex Rivera', prompts: 980, score: '96.2%', badge: 'Prompt Artisan' },
    { rank: 3, name: 'Sarah Chen', prompts: 875, score: '95.4%', badge: 'LLM Engineer' },
    { rank: 4, name: 'Marcus Vance', prompts: 620, score: '94.1%', badge: 'Research Fellow' },
    { rank: 5, name: 'Elena Rostova', prompts: 540, score: '93.8%', badge: 'AI Specialist' }
  ];

  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-amber-500 font-bold text-xs uppercase tracking-wider mb-1">
            <Flame className="w-4 h-4" />
            <span>Gamification & Daily Progress</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">Streak & Leaderboard</h1>
          <p className="text-xs text-slate-400 mt-1">
            Track daily engineering streaks, unlock badges, and climb the global PromptForge leaderboard.
          </p>
        </div>

        <button
          onClick={triggerConfetti}
          className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold text-xs shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2 transition-transform hover:scale-105"
        >
          <Sparkles className="w-4 h-4 animate-spin" />
          <span>Celebrate Progress 🎉</span>
        </button>
      </div>

      {/* Streak Grid & Weekly Heatmap */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Streak Flame Card */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-200 dark:border-slate-800 flex items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center text-white shadow-xl shadow-amber-500/20">
            <Flame className="w-8 h-8 fill-white animate-bounce" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-400">Current Streak</div>
            <div className="text-3xl font-black text-slate-900 dark:text-white">{streakData.currentStreak} Days 🔥</div>
            <div className="text-[10px] text-amber-500 font-semibold mt-0.5">Best: {streakData.bestStreak} Days</div>
          </div>
        </div>

        {/* Total Stats */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-200 dark:border-slate-800 flex items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-brand-500 to-purple-500 flex items-center justify-center text-white shadow-xl shadow-brand-500/20">
            <Trophy className="w-8 h-8" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-400">Prompts Engineered</div>
            <div className="text-3xl font-black text-slate-900 dark:text-white">{streakData.totalPromptsGenerated}</div>
            <div className="text-[10px] text-brand-500 font-semibold mt-0.5">{streakData.totalPromptsAnalyzed} Analyzed</div>
          </div>
        </div>

        {/* Weekly Progress Heatmap */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-200 dark:border-slate-800 flex flex-col justify-center space-y-2">
          <div className="text-xs font-bold text-slate-900 dark:text-white">This Week's Activity</div>
          <div className="flex items-center justify-between gap-1">
            {daysOfWeek.map((day, idx) => (
              <div key={idx} className="flex flex-col items-center gap-1">
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold ${
                  streakData.weeklyProgress[idx] 
                    ? 'bg-amber-500 text-white shadow-md shadow-amber-500/20' 
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
                }`}>
                  {streakData.weeklyProgress[idx] ? '✓' : ''}
                </div>
                <span className="text-[9px] text-slate-400 font-semibold">{day}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Main Grid: Badges + Leaderboard */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Achievements Badges (7 cols) */}
        <div className="lg:col-span-7 glass-panel p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4">
          <h2 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-500" />
            <span>Engineering Achievements & Badges</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {achievements.map((ach) => (
              <div 
                key={ach.id}
                className={`p-4 rounded-2xl border transition-all ${
                  ach.unlocked 
                    ? 'bg-amber-500/10 border-amber-500/30' 
                    : 'bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 opacity-70'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm ${
                    ach.unlocked ? 'bg-amber-500 text-white shadow-md' : 'bg-slate-200 dark:bg-slate-800 text-slate-400'
                  }`}>
                    {ach.unlocked ? '🏆' : '🔒'}
                  </div>
                  <div>
                    <h3 className="font-bold text-xs text-slate-900 dark:text-white">{ach.title}</h3>
                    <p className="text-[10px] text-slate-400">{ach.description}</p>
                  </div>
                </div>

                <div className="mt-3">
                  <div className="w-full h-1.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all ${ach.unlocked ? 'bg-amber-500' : 'bg-slate-400'}`}
                      style={{ width: `${ach.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Global Leaderboard (5 cols) */}
        <div className="lg:col-span-5 glass-panel p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4">
          <h2 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
            <Crown className="w-4 h-4 text-amber-500" />
            <span>Global PromptForge Leaderboard</span>
          </h2>

          <div className="space-y-2">
            {leaderboard.map((user) => (
              <div 
                key={user.rank}
                className={`p-3 rounded-2xl flex items-center justify-between border transition-all ${
                  user.rank === 1 
                    ? 'bg-gradient-to-r from-amber-500/10 to-orange-500/10 border-amber-500/30 font-bold' 
                    : 'bg-slate-50 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black ${
                    user.rank === 1 ? 'bg-amber-500 text-white' : user.rank === 2 ? 'bg-slate-300 dark:bg-slate-700 text-slate-900' : 'bg-slate-200 dark:bg-slate-800 text-slate-400'
                  }`}>
                    {user.rank}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <span>{user.name}</span>
                      {user.rank === 1 && <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-amber-500/20 text-amber-500 font-bold">#1</span>}
                    </div>
                    <div className="text-[10px] text-slate-400">{user.badge}</div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xs font-black text-brand-500">{user.score}</div>
                  <div className="text-[10px] text-slate-400">{user.prompts} Prompts</div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
