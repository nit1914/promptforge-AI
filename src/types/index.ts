export type NavigationTab = 
  | 'dashboard'
  | 'analyzer'
  | 'generator'
  | 'templates'
  | 'research'
  | 'image-studio'
  | 'video-studio'
  | 'ui-generator'
  | 'code-prompt'
  | 'notes-generator'
  | 'study-assistant'
  | 'handwritten-notes'
  | 'business'
  | 'marketing'
  | 'resume'
  | 'linkedin'
  | 'youtube'
  | 'social-media'
  | 'seo'
  | 'data-analysis'
  | 'python'
  | 'sql'
  | 'power-bi'
  | 'excel'
  | 'presentation'
  | 'mind-map'
  | 'research-papers'
  | 'library'
  | 'saved'
  | 'favorites'
  | 'history'
  | 'settings'
  | 'comparison'
  | 'achievements';

export interface ScoreMetric {
  name: string;
  score: number; // 0-100
  color: string;
  description: string;
  suggestion: string;
  isInverse?: boolean; // For hallucination risk & ambiguity score
}

export interface PromptAnalysisResult {
  overallScore: number;
  wordCount: number;
  tokenEstimate: number;
  metrics: ScoreMetric[];
  judge: {
    strengths: string[];
    weaknesses: string[];
    missingContext: string[];
    missingConstraints: string[];
    missingAudience: string[];
    missingFormat: string[];
    suggestedImprovements: string[];
  };
  versions: {
    better: string;
    professional: string;
    expert: string;
  };
}

export interface PromptComparisonData {
  originalText: string;
  improvedText: string;
  originalScore: number;
  improvedScore: number;
  originalTokens: number;
  improvedTokens: number;
  qualityDiffPercent: number;
  tokenDiffPercent: number;
  readabilityOriginal: number;
  readabilityImproved: number;
  successProbabilityOriginal: number;
  successProbabilityImproved: number;
}

export interface SavedPrompt {
  id: string;
  title: string;
  category: string;
  content: string;
  improvedContent?: string;
  model: string;
  score: number;
  tags: string[];
  createdAt: string;
  isFavorite: boolean;
  notes?: string;
}

export interface PromptTemplate {
  id: string;
  title: string;
  category: string;
  description: string;
  promptText: string;
  targetModel: string;
  tags: string[];
  rating: number;
  usesCount: number;
  technique: string;
}

export interface AIModelInfo {
  id: string;
  name: string;
  provider: string;
  iconName: string;
  badgeColor: string;
  contextWindow: string;
  bestFor: string;
}

export interface PromptGeneratorOptions {
  category: string;
  promptType: string;
  technique: string;
  outputStyle: string;
  targetModel: string;
  topic: string;
  audience: string;
  constraints: string;
  goal: string;
  tone: string;
  examples: string;
}

export interface AchievementItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  progress: number; // 0-100
  unlocked: boolean;
  unlockedAt?: string;
}

export interface DailyStreakData {
  currentStreak: number;
  bestStreak: number;
  totalPromptsGenerated: number;
  totalPromptsAnalyzed: number;
  lastActiveDate: string;
  weeklyProgress: boolean[]; // 7 days (Mon-Sun)
}

export interface DeepResearchState {
  topic: string;
  goal: string;
  sources: string[];
  depth: 'standard' | 'comprehensive' | 'exhaustive';
  academicStyle: 'IEEE' | 'APA' | 'Harvard' | 'Standard Executive';
}
