import type { AIModelInfo, PromptTemplate, SavedPrompt, AchievementItem, DailyStreakData } from '../types';

export const AI_MODELS: AIModelInfo[] = [
  {
    id: 'chatgpt-gpt4o',
    name: 'ChatGPT (GPT-4o)',
    provider: 'OpenAI',
    iconName: 'Sparkles',
    badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    contextWindow: '128k Tokens',
    bestFor: 'General Purpose, Coding, Complex Reasoning & Multimodal Tasks'
  },
  {
    id: 'claude-3-5-sonnet',
    name: 'Claude 3.5 Sonnet',
    provider: 'Anthropic',
    iconName: 'Cpu',
    badgeColor: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    contextWindow: '200k Tokens',
    bestFor: 'Writing, Code Architecture, Nuanced Analysis & Long Context'
  },
  {
    id: 'gemini-1-5-pro',
    name: 'Gemini 1.5 Pro',
    provider: 'Google AI',
    iconName: 'Zap',
    badgeColor: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    contextWindow: '2M Tokens',
    bestFor: 'Massive Context, Video Analysis, Audio & Document Synthesis'
  },
  {
    id: 'deepseek-r1',
    name: 'DeepSeek R1 / V3',
    provider: 'DeepSeek',
    iconName: 'BrainCircuit',
    badgeColor: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
    contextWindow: '64k Tokens',
    bestFor: 'Open-Weight Reasoning, Advanced Math, Algorithmic Code'
  },
  {
    id: 'grok-2',
    name: 'Grok 2',
    provider: 'xAI',
    iconName: 'Rocket',
    badgeColor: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    contextWindow: '128k Tokens',
    bestFor: 'Real-time Information, Unfiltered Research & Visual Gen'
  },
  {
    id: 'perplexity',
    name: 'Perplexity AI',
    provider: 'Perplexity',
    iconName: 'Search',
    badgeColor: 'bg-teal-500/10 text-teal-400 border-teal-500/20',
    contextWindow: '32k Tokens',
    bestFor: 'Cites & Live Web Search Research'
  },
  {
    id: 'copilot',
    name: 'Microsoft Copilot',
    provider: 'Microsoft',
    iconName: 'Bot',
    badgeColor: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
    contextWindow: '128k Tokens',
    bestFor: 'Office Integration, Corporate Workflows & Windows OS'
  },
  {
    id: 'llama-3-3',
    name: 'Llama 3.3 70B',
    provider: 'Meta AI',
    iconName: 'Flame',
    badgeColor: 'bg-pink-500/10 text-pink-400 border-pink-500/20',
    contextWindow: '128k Tokens',
    bestFor: 'Local Deployment, Custom Enterprise Fine-tuning'
  },
  {
    id: 'qwen-2-5',
    name: 'Qwen 2.5 72B',
    provider: 'Alibaba Cloud',
    iconName: 'Layers',
    badgeColor: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
    contextWindow: '128k Tokens',
    bestFor: 'Multilingual Tasks, Structured Data Extraction & Coding'
  },
  {
    id: 'mistral-large',
    name: 'Mistral Large 2',
    provider: 'Mistral AI',
    iconName: 'Compass',
    badgeColor: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
    contextWindow: '128k Tokens',
    bestFor: 'European Languages, Precise Function Calling & Logic'
  }
];

export const PROMPT_CATEGORIES = [
  'Image Generation',
  'UI UX Design',
  'Logo Design',
  'Dashboard',
  'Landing Page',
  'Web App',
  'Mobile App',
  'Figma Prompt',
  'Wireframe',
  'Coding',
  'Python',
  'Java',
  'C++',
  'React',
  'Next.js',
  'Flutter',
  'Prompt Engineering',
  'Research',
  'Deep Research',
  'Book Summary',
  'Article Analysis',
  'Scientific Research',
  'Notes',
  'Lecture Notes',
  'Study Notes',
  'Exam Preparation',
  'Handwritten Notes',
  'Resume',
  'Cover Letter',
  'LinkedIn',
  'Portfolio',
  'Presentation',
  'Pitch Deck',
  'Marketing',
  'SEO',
  'Instagram',
  'Twitter',
  'Facebook',
  'Video Creation',
  'YouTube',
  'Shorts',
  'Reels',
  'Ads',
  'AI Video',
  'Animation',
  'Business',
  'Startup',
  'Sales',
  'Customer Support',
  'Finance',
  'Healthcare',
  'Legal',
  'Education',
  'Power BI',
  'Excel',
  'SQL',
  'Data Science',
  'Machine Learning',
  'Cyber Security',
  'Cloud',
  'DevOps',
  'Career Roadmap',
  'Interview Preparation',
  'Mock Interview',
  'Custom Prompt'
];

export const PROMPT_TECHNIQUES = [
  'Role Playing (Persona)',
  'Meta Prompting',
  'World Building',
  'Deep Research & Synthesis',
  'Gap Finder Protocol',
  'Confidence Scoring & Critique',
  'Chain-of-Thought Breakdown',
  'If-Then Conditional Logic',
  'Few-Shot Exemplar Guided',
  'TREE of Thoughts (ToT)',
  'Socratic Questioning'
];

export const OUTPUT_STYLES = [
  'Markdown Document',
  'JSON Schema',
  'Structured Table',
  'Executable Code Block',
  'Step-by-Step Checklist',
  'Executive Summary / Essay',
  'Interactive Blog Post',
  'Professional Audit Report'
];

export const PROMPT_TYPES = [
  'Open Ended',
  'Close Ended',
  'Scenario Based',
  'Opinion Based',
  'Multi Part Workflow'
];

export const MOCK_TEMPLATES: PromptTemplate[] = [
  {
    id: 'tmpl-1',
    title: 'Senior React / Next.js Clean Architecture Auditor',
    category: 'Coding',
    description: 'Deconstructs any React/Next.js component or page for performance, accessibility, state management, and enterprise clean architecture.',
    promptText: `Act as a Principal Frontend Engineer specializing in Next.js App Router, React Server Components, and TypeScript. Review the provided component code against clean architecture standards:
1. Performance bottlenecks & unnecessary re-renders.
2. Accessibility (a11y) aria attributes and semantic HTML.
3. Type safety & strict TypeScript interfaces.
4. Tailwind CSS maintainability & token consistency.
Provide refactored drop-in code along with architectural notes.`,
    targetModel: 'Claude 3.5 Sonnet',
    tags: ['Next.js', 'React', 'TypeScript', 'Clean Code'],
    rating: 4.9,
    usesCount: 14200,
    technique: 'Role Playing (Persona)'
  },
  {
    id: 'tmpl-2',
    title: 'Midjourney v6 Photorealistic Cinematic Portrait',
    category: 'Image Generation',
    description: 'Generates hyper-realistic 8K cinematic portrait prompts with exact camera lens specs, volumetric lighting, and color grading.',
    promptText: `Cinematic 35mm film photograph of a visionary AI researcher in a high-tech obsidian lab, soft volumetric twilight lighting, shot on Hasselblad X2D 100C, 85mm lens f/1.4, shallow depth of field, subtle lens flare, ultra-detailed skin textures, atmospheric background, 8k resolution --ar 16:9 --v 6.0 --style raw --stylize 750`,
    targetModel: 'Midjourney',
    tags: ['Midjourney', 'Photography', '35mm', 'Cinematic'],
    rating: 4.98,
    usesCount: 28900,
    technique: 'Few-Shot Exemplar Guided'
  },
  {
    id: 'tmpl-3',
    title: 'Executive Pitch Deck & SaaS Business Blueprint',
    category: 'Business',
    description: 'Transforms a rough SaaS idea into a Y-Combinator style 10-slide pitch deck script with financial projections.',
    promptText: `Act as a Partner at Y Combinator. Take the following SaaS product description and draft a compelling 10-slide pitch deck structure:
Slide 1: Problem & Pain Point (Quantified)
Slide 2: Solution & Product Demo Flow
Slide 3: Market Size (TAM, SAM, SOM)
Slide 4: Business Model & Pricing Strategy
Slide 5: Traction & Key Performance Indicators
Slide 6: Competitive Moat & Unfair Advantage
Slide 7: Go-To-Market Strategy (GTM)
Slide 8: Financial Projections (3-Year)
Slide 9: Team & Advisory Board
Slide 10: The Ask ($ Raise & Milestones)`,
    targetModel: 'ChatGPT (GPT-4o)',
    tags: ['SaaS', 'Startup', 'Pitch Deck', 'YC'],
    rating: 4.92,
    usesCount: 18500,
    technique: 'Role Playing (Persona)'
  },
  {
    id: 'tmpl-4',
    title: 'Runway Gen-3 / Veo 2 Drone FPV Flythrough Prompt',
    category: 'Video Creation',
    description: 'Creates dynamic camera motion and atmosphere directives for AI video generators like Runway Gen-3 and Veo 2.',
    promptText: `FPV drone camera movement smoothly gliding through a futuristic cyberpunk megacity at dusk, glowing neon holograms reflecting off wet asphalt, hyper-speed transition through a glass skybridge, 4K resolution, 60fps motion, cinematic motion blur, realistic atmospheric fog, hyper-detailed rendering.`,
    targetModel: 'Runway Gen-3',
    tags: ['Video', 'Runway', 'Veo', 'Sora'],
    rating: 4.88,
    usesCount: 9400,
    technique: 'World Building'
  },
  {
    id: 'tmpl-5',
    title: 'Deep Research & Literature Review Synthesizer',
    category: 'Deep Research',
    description: 'Extracts core hypotheses, methodology breakdown, empirical results, and counter-arguments from academic research papers.',
    promptText: `Act as an AI Research Fellow. Perform an exhaustive academic analysis of the attached topic or paper draft:
1. Core Claim & Novel Contribution
2. Theoretical Framework & Methodology Assessment
3. Empirical Evidence & Benchmark Results
4. Critical Limitations & Potential Edge Cases
5. Future Research Horizons
Format output using IEEE style citations and structured markdown comparison tables.`,
    targetModel: 'Gemini 1.5 Pro',
    tags: ['Research', 'Academic', 'Literature Review'],
    rating: 4.95,
    usesCount: 12100,
    technique: 'Deep Research & Synthesis'
  },
  {
    id: 'tmpl-6',
    title: 'Power BI & DAX Formula Optimizer',
    category: 'Power BI',
    description: 'Generates fast, non-blocking DAX measures, time-intelligence calculations, and data model star-schema optimizations.',
    promptText: `Act as a Senior BI Architect. Write an optimized DAX measure for calculating Year-Over-Year (YoY) Sales Growth with error handling for blank previous periods:
Requirements:
- Handle filter context transition gracefully.
- Prevent Divide by Zero errors using DIVIDE().
- Provide step-by-step commentary explaining performance impact on tabular data model storage engine vs formula engine.`,
    targetModel: 'Copilot',
    tags: ['Power BI', 'DAX', 'Analytics', 'Excel'],
    rating: 4.85,
    usesCount: 7800,
    technique: 'Chain-of-Thought Breakdown'
  }
];

export const INITIAL_SAVED_PROMPTS: SavedPrompt[] = [
  {
    id: 'saved-1',
    title: 'Master System Prompt for Coding Assistant',
    category: 'Coding',
    content: `You are an elite Staff Software Engineer. Write production-ready code with complete error handling, TypeScript types, modular structure, and performance optimization. Avoid placeholder code or pseudo-code.`,
    improvedContent: `### SYSTEM INSTRUCTION
Act as a Staff Software Engineer and Senior Systems Architect.

### OBJECTIVE
Deliver production-grade, bug-free implementations that strictly adhere to clean code principles, SOLID design patterns, and high-performance algorithms.

### RULES & CONSTRAINTS
- NEVER use pseudocode, '// TODO', or placeholder logic.
- Provide comprehensive TypeScript interfaces and strict null checks.
- Include unit test suggestions and edge-case handling.`,
    model: 'Claude 3.5 Sonnet',
    score: 96,
    tags: ['Coding', 'System Prompt', 'TypeScript'],
    createdAt: '2026-08-01',
    isFavorite: true,
    notes: 'Used for all enterprise React & Node.js architecture projects.'
  },
  {
    id: 'saved-2',
    title: 'SaaS Landing Page UI/UX Prompt Directive',
    category: 'UI UX Design',
    content: `Design a sleek dark mode landing page for an AI productivity app with glassmorphism, hero section, features grid, pricing table, and testimonials.`,
    improvedContent: `Act as a Lead UI/UX Designer at Apple and Vercel. Create a design specification for a Next-Gen AI SaaS Landing Page:
1. Hero Section: Gradient text h1, dynamic floating product mockup, CTA button with glowing hover animation.
2. Value Proposition: 3-column glassmorphism cards with micro-interactions.
3. Interactive Demo: Live preview tabbed container.
4. Pricing Tier Matrix: Monthly/Annual toggle, highlighted Pro plan with gradient border.
5. Tech Tokens: Dark mode (#090a0f), Inter typography, smooth Framer Motion transitions.`,
    model: 'ChatGPT (GPT-4o)',
    score: 94,
    tags: ['UI/UX', 'SaaS', 'Figma', 'Landing Page'],
    createdAt: '2026-08-02',
    isFavorite: true,
    notes: 'Great prompt for generating initial v0 / Tailwind component prompts.'
  }
];

export const INITIAL_STREAK: DailyStreakData = {
  currentStreak: 7,
  bestStreak: 14,
  totalPromptsGenerated: 142,
  totalPromptsAnalyzed: 89,
  lastActiveDate: '2026-08-02',
  weeklyProgress: [true, true, true, true, true, true, true]
};

export const INITIAL_ACHIEVEMENTS: AchievementItem[] = [
  {
    id: 'ach-1',
    title: 'Prompt Artisan',
    description: 'Analyze 50 prompts with an average score above 85%',
    icon: 'Award',
    progress: 100,
    unlocked: true,
    unlockedAt: '2026-07-28'
  },
  {
    id: 'ach-2',
    title: '7-Day Streak Master',
    description: 'Engineering prompts every day for 7 consecutive days',
    icon: 'Flame',
    progress: 100,
    unlocked: true,
    unlockedAt: '2026-08-02'
  },
  {
    id: 'ach-3',
    title: 'Prompt Perfectionist',
    description: 'Achieve a perfect 100% Quality Score on an AI Judge analysis',
    icon: 'Crown',
    progress: 75,
    unlocked: false
  },
  {
    id: 'ach-4',
    title: 'Polyglot Architect',
    description: 'Generate specialized prompts across 10 different AI models',
    icon: 'Layers',
    progress: 80,
    unlocked: false
  },
  {
    id: 'ach-5',
    title: 'Export Master',
    description: 'Export 25 prompt guides in PDF, Word, Markdown, or JSON formats',
    icon: 'Download',
    progress: 60,
    unlocked: false
  }
];
