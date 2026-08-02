import type { PromptGeneratorOptions } from '../types';

export function buildGeneratedPrompt(opts: PromptGeneratorOptions): string {
  const {
    category,
    promptType = 'Open Ended',
    technique = 'Role Playing (Persona)',
    outputStyle = 'Markdown Document',
    targetModel = 'ChatGPT (GPT-4o)',
    topic = 'Artificial Intelligence Application Architecture',
    audience = 'Senior Software Engineers & Product Leaders',
    constraints = 'Provide modular code, explicit parameters, and eliminate conversational filler.',
    goal = 'Create a scalable, battle-tested production implementation.',
    tone = 'Professional, Authoritative, Crisp',
    examples = ''
  } = opts;

  let header = `<!-- PROMPTFORGE AI OPTIMIZED PROMPT FOR ${targetModel.toUpperCase()} -->\n`;
  
  // Custom Specialized Generators based on Category
  if (category === 'Image Generation') {
    return `${topic}, highly detailed photography, shot on 35mm lens f/1.4, cinematic lighting, volumetric atmosphere, 8K resolution, octane render quality, photorealistic textures, masterwork artwork --ar 16:9 --v 6.0 --stylize 750 --style raw`;
  }

  if (category === 'Video Creation' || category === 'AI Video' || category === 'YouTube') {
    return `FPV cinematic drone camera motion gliding smoothly over ${topic}, 4k ultra-high definition, 60fps fluid frame rate, realistic physics, volumetric fog, dramatic twilight lighting, shallow depth of field, professional color grading, cinematic motion blur.`;
  }

  if (category === 'UI UX Design' || category === 'Landing Page' || category === 'Dashboard' || category === 'Mobile App') {
    return `Act as a Principal UI/UX Designer at Apple & Vercel.
Design a sleek modern interface for: "${topic}"

[DESIGN SYSTEM & TOKENS]
- Aesthetic: Glassmorphism, dark mode (#090a0f), soft ambient glow, rounded cards (16px border-radius).
- Color Palette: Obsidian background, indigo accents (#6366f1), cyan highlights (#06b6d4), subtle white borders (rgba(255,255,255,0.08)).
- Typography: Inter Font, balanced line-height, crisp hierarchy (H1: 48px, H2: 24px, Body: 14px).

[LAYOUT STRUCTURE]
1. Header & Navigation: Brand logo, search bar, active tab indicators, user profile pill.
2. Main Content Area: Responsive grid container with stats widgets, dynamic chart widgets (Recharts), and primary action panel.
3. Micro-Animations: Hover scale transitions (1.02x), smooth tab switching, glass blur backdrop.

[DELIVERABLE]
Provide the full component code structure in Tailwind CSS and React TS.`;
  }

  if (category === 'SQL' || category === 'Python' || category === 'Coding' || category === 'Next.js' || category === 'React') {
    return `### SYSTEM ROLE
Act as a Lead Software Architect specializing in ${category}.

### TASK OBJECTIVE
${goal}: "${topic}"

### TECHNICAL SPECIFICATIONS & CONSTRAINTS
- Strict adherence to ${category} best practices and clean architecture.
- ${constraints}
- Target Audience: ${audience}.
- Tone: ${tone}.

### STEP-BY-STEP REASONING PROTOCOL
1. Analyze domain logic and data structures.
2. Formulate optimized algorithm with strict error boundary checks.
3. Deliver production-ready code with complete type annotations.

### OUTPUT FORMAT
Provide the output strictly in ${outputStyle} format.`;
  }

  if (category === 'Deep Research' || category === 'Research Papers' || category === 'Scientific Research') {
    return `[DEEP RESEARCH PROTOCOL v4]
SYSTEM ROLE: Principal Research Fellow and Data Scientist.

RESEARCH OBJECTIVE:
"${topic}"

RESEARCH SCOPE & METHODOLOGY:
1. Executive Abstract & Contextual Grounding
2. Core Findings & Systematic Literature Analysis
3. Empirical Evidence, Comparative Benchmarks & Statistical Insights
4. Methodological Limitations & Risk Factors
5. Strategic Recommendations & Actionable Next Steps

TARGET AUDIENCE: ${audience}
OUTPUT FORMAT: ${outputStyle} with standard academic citations and structured comparison tables.
CONSTRAINTS: ${constraints}`;
  }

  if (category === 'Notes' || category === 'Lecture Notes' || category === 'Study Notes' || category === 'Exam Preparation') {
    return `Act as an Elite Study Coach and Academic Tutor.
Transform the following material on "${topic}" into comprehensive, exam-ready study notes.

[STRUCTURED STUDY MODULE]
1. **Executive Summary**: Core concepts in 3 bullet points.
2. **Key Terms & Definitions**: Clear glossary of non-negotiable jargon.
3. **Core Formulae / Frameworks**: Deep breakdown of principles.
4. **Practice Questions & Worked Solutions**: 5 high-probability exam questions with step-by-step reasoning.
5. **Mind-Map Outline**: ASCII / Markdown visual hierarchy tree.

CONSTRAINTS: Maximum readability, active recall formatting, clear headers.`;
  }

  // Default Standard Prompt Template Engine
  return `${header}### 1. SYSTEM ROLE / PERSONA
You are an expert specialist in ${category} utilizing the ${technique} framework.

### 2. PRIMARY OBJECTIVE
${goal}: "${topic}"

### 3. CONTEXT & TARGET AUDIENCE
- Target Audience: ${audience}
- Prompt Type: ${promptType}
- Tone / Communication Style: ${tone}

### 4. STRICT CONSTRAINTS & NEGATIVE DIRECTIVES
- ${constraints}
- Do not make assumptions without stating them explicitly.
- Avoid redundant introductory conversational filler.

${examples ? `### 5. REFERENCE EXEMPLARS\n${examples}\n\n` : ''}### ${examples ? '6' : '5'}. OUTPUT SCHEMA & FORMAT
Deliver your response strictly as a ${outputStyle}.`;
}
