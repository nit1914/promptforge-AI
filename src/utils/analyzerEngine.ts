import type { PromptAnalysisResult, ScoreMetric, PromptComparisonData } from '../types';

export function analyzePromptText(promptText: string): PromptAnalysisResult {
  const text = promptText.trim();
  const wordCount = text ? text.split(/\s+/).length : 0;
  const tokenEstimate = Math.ceil(wordCount * 1.35);

  if (wordCount === 0) {
    return createEmptyAnalysis();
  }

  // Check key factors in prompt
  const hasFormatSpec = /json|markdown|table|bullet|list|code|html|csv|yaml|format|output|schema/i.test(text);
  const hasConstraints = /do not|never|must|only|limit|maximum|minimum|avoid|require|strict/i.test(text);
  const hasAudience = /target audience|for developers|for beginner|for executive|for students|end user|client/i.test(text);
  const hasContext = /background|context|given that|scenario|considering|as a|environment|stack/i.test(text);
  const hasRole = /act as|you are|role|expert|senior|specialist|persona/i.test(text);
  const hasReasoning = /step by step|chain of thought|explain why|think before|reasoning|rationale|breakdown/i.test(text);
  const hasExamples = /example|sample|e\.g\.|instance|input:|output:/i.test(text);
  const hasGoal = /goal|objective|aim|task|create|build|generate|analyze|write|draft/i.test(text);
  const isVague = wordCount < 10 || /something|anything|stuff|etc/i.test(text);

  // Calculate Scores
  const clarity = Math.min(100, Math.max(30, 50 + (wordCount > 15 ? 25 : wordCount * 1.5) - (isVague ? 35 : 0)));
  const specificity = Math.min(100, Math.max(25, 40 + (hasConstraints ? 20 : 0) + (hasExamples ? 25 : 0) + (wordCount > 30 ? 15 : 0)));
  const contextScore = Math.min(100, Math.max(20, 30 + (hasContext ? 35 : 0) + (hasRole ? 25 : 0) + (wordCount > 25 ? 10 : 0)));
  const goalScore = Math.min(100, Math.max(35, 45 + (hasGoal ? 35 : 0) + (wordCount > 8 ? 20 : 0)));
  const constraintScore = Math.min(100, Math.max(15, 20 + (hasConstraints ? 55 : 0) + (hasFormatSpec ? 25 : 0)));
  const audienceScore = Math.min(100, Math.max(15, 25 + (hasAudience ? 65 : 0) + (hasRole ? 10 : 0)));
  const outputFormatScore = Math.min(100, Math.max(20, 25 + (hasFormatSpec ? 65 : 0) + (hasExamples ? 10 : 0)));
  const reasoningQuality = Math.min(100, Math.max(20, 30 + (hasReasoning ? 55 : 0) + (hasExamples ? 15 : 0)));
  const creativity = Math.min(100, Math.max(40, 60 + (hasRole ? 20 : 0) + (hasContext ? 15 : 0)));
  const promptEngScore = Math.min(100, Math.max(25, 25 + (hasRole ? 20 : 0) + (hasFormatSpec ? 20 : 0) + (hasConstraints ? 20 : 0) + (hasReasoning ? 15 : 0)));
  
  // Inverse metrics (lower is better)
  const hallucinationRisk = Math.max(5, Math.min(85, 80 - (hasConstraints ? 25 : 0) - (hasContext ? 20 : 0) - (hasFormatSpec ? 20 : 0) - (hasExamples ? 10 : 0)));
  const ambiguityScore = Math.max(8, Math.min(90, 85 - (specificity * 0.4) - (clarity * 0.3) - (hasConstraints ? 15 : 0)));
  
  const completeness = Math.round((clarity + specificity + contextScore + goalScore + constraintScore + outputFormatScore) / 6);

  // Overall Weighted Score
  const overallScore = Math.round(
    clarity * 0.15 +
    specificity * 0.15 +
    contextScore * 0.12 +
    goalScore * 0.12 +
    constraintScore * 0.12 +
    outputFormatScore * 0.12 +
    promptEngScore * 0.14 +
    (100 - hallucinationRisk) * 0.10
  );

  const metrics: ScoreMetric[] = [
    {
      name: 'Clarity',
      score: Math.round(clarity),
      color: clarity >= 75 ? '#10b981' : clarity >= 50 ? '#f59e0b' : '#ef4444',
      description: 'Measures how unambiguous and straightforward the prompt instructions are.',
      suggestion: clarity < 75 ? 'Use direct imperative action verbs (e.g. "Draft", "Analyze", "Synthesize").' : 'Excellent readability and crisp wording.'
    },
    {
      name: 'Specificity',
      score: Math.round(specificity),
      color: specificity >= 75 ? '#10b981' : specificity >= 50 ? '#f59e0b' : '#ef4444',
      description: 'Evaluates concrete parameters, scope boundaries, and explicit details.',
      suggestion: specificity < 75 ? 'Add specific scope boundaries, length limits, or domain parameters.' : 'Strong specific parameters included.'
    },
    {
      name: 'Context',
      score: Math.round(contextScore),
      color: contextScore >= 75 ? '#10b981' : contextScore >= 50 ? '#f59e0b' : '#ef4444',
      description: 'Measures background information and situational context provided to the LLM.',
      suggestion: contextScore < 75 ? 'Provide background details, user personas, or tech stack constraints.' : 'Rich context given.'
    },
    {
      name: 'Goal Definition',
      score: Math.round(goalScore),
      color: goalScore >= 75 ? '#10b981' : goalScore >= 50 ? '#f59e0b' : '#ef4444',
      description: 'Assesses whether the primary objective is clearly stated.',
      suggestion: goalScore < 75 ? 'State the exact expected outcome in 1 sentence.' : 'Clear primary objective.'
    },
    {
      name: 'Constraints',
      score: Math.round(constraintScore),
      color: constraintScore >= 75 ? '#10b981' : constraintScore >= 50 ? '#f59e0b' : '#ef4444',
      description: 'Checks for negative constraints, boundaries, and things the AI must avoid.',
      suggestion: constraintScore < 75 ? 'Define what the AI MUST NOT do (e.g., "No fluff", "Maximum 3 paragraphs").' : 'Negative rules established.'
    },
    {
      name: 'Target Audience',
      score: Math.round(audienceScore),
      color: audienceScore >= 75 ? '#10b981' : audienceScore >= 50 ? '#f59e0b' : '#ef4444',
      description: 'Checks if the intended consumer or reader of the output is specified.',
      suggestion: audienceScore < 75 ? 'Specify the target reader (e.g. "For C-level Executives", "For Grade 8 Students").' : 'Audience explicitly set.'
    },
    {
      name: 'Output Format',
      score: Math.round(outputFormatScore),
      color: outputFormatScore >= 75 ? '#10b981' : outputFormatScore >= 50 ? '#f59e0b' : '#ef4444',
      description: 'Checks for explicit formatting directives (JSON, Markdown, Table, Bullet points).',
      suggestion: outputFormatScore < 75 ? 'Specify exact output structure (e.g., Markdown headers, JSON schema, or Table).' : 'Output structure explicitly defined.'
    },
    {
      name: 'Reasoning Quality',
      score: Math.round(reasoningQuality),
      color: reasoningQuality >= 75 ? '#10b981' : reasoningQuality >= 50 ? '#f59e0b' : '#ef4444',
      description: 'Assesses if the prompt asks the AI to demonstrate Step-by-Step reasoning (Chain of Thought).',
      suggestion: reasoningQuality < 75 ? 'Add "Think step-by-step before providing your final response".' : 'Encourages structured reasoning.'
    },
    {
      name: 'Creativity',
      score: Math.round(creativity),
      color: creativity >= 75 ? '#10b981' : creativity >= 50 ? '#f59e0b' : '#ef4444',
      description: 'Evaluates conceptual richness and room for innovative LLM problem solving.',
      suggestion: creativity < 75 ? 'Allow room for alternative perspectives or novelty.' : 'Balanced room for creative output.'
    },
    {
      name: 'Prompt Engineering Score',
      score: Math.round(promptEngScore),
      color: promptEngScore >= 75 ? '#10b981' : promptEngScore >= 50 ? '#f59e0b' : '#ef4444',
      description: 'Adherence to advanced Prompt Engineering practices (Persona + Task + Context + Format + Rules).',
      suggestion: promptEngScore < 75 ? 'Utilize systematic prompt frameworks like CARE or CREATE.' : 'Follows advanced prompt engineering patterns.'
    },
    {
      name: 'Hallucination Risk',
      score: Math.round(hallucinationRisk),
      color: hallucinationRisk <= 25 ? '#10b981' : hallucinationRisk <= 50 ? '#f59e0b' : '#ef4444',
      description: 'Probability of model inventing false facts or ungrounded statements.',
      suggestion: hallucinationRisk > 25 ? 'Instruct the model: "If data is missing or unverified, state \'Unknown\' rather than guessing."' : 'Low risk of ungrounded output.',
      isInverse: true
    },
    {
      name: 'Ambiguity Score',
      score: Math.round(ambiguityScore),
      color: ambiguityScore <= 25 ? '#10b981' : ambiguityScore <= 50 ? '#f59e0b' : '#ef4444',
      description: 'Likelihood of the AI misinterpreting your intent.',
      suggestion: ambiguityScore > 25 ? 'Eliminate vague terms like "good", "nice", or "a few". Use exact numbers.' : 'Minimal ambiguity detected.',
      isInverse: true
    },
    {
      name: 'Completeness',
      score: Math.round(completeness),
      color: completeness >= 75 ? '#10b981' : completeness >= 50 ? '#f59e0b' : '#ef4444',
      description: 'Overall structural integrity across all essential prompt components.',
      suggestion: completeness < 75 ? 'Fill in missing context, constraints, and audience details.' : 'High structural completeness.'
    }
  ];

  // AI Judge Feedback Generation
  const strengths: string[] = [];
  const weaknesses: string[] = [];
  const missingContext: string[] = [];
  const missingConstraints: string[] = [];
  const missingAudience: string[] = [];
  const missingFormat: string[] = [];
  const suggestedImprovements: string[] = [];

  if (hasGoal) strengths.push('Clear core action goal specified.');
  if (hasRole) strengths.push('Persona & role definition provided.');
  if (hasConstraints) strengths.push('Explicit negative rules & constraints defined.');
  if (hasFormatSpec) strengths.push('Output format directives included.');
  if (wordCount > 25) strengths.push('Sufficient length for initial context.');

  if (!hasRole) {
    weaknesses.push('Lacks AI Persona definition (e.g. "Act as a Senior AI Architect").');
    missingContext.push('Specify the AI expert persona to set tone and knowledge depth.');
    suggestedImprovements.push('Define persona: "Act as a Principal Staff Engineer with 15+ years of experience".');
  }

  if (!hasConstraints) {
    weaknesses.push('No negative constraints or boundary guardrails.');
    missingConstraints.push('Missing explicit rules (e.g. max tokens, tone, topics to avoid).');
    suggestedImprovements.push('Add constraint: "Do not include unnecessary preamble or meta-commentary."');
  }

  if (!hasAudience) {
    weaknesses.push('Target audience is unspecified.');
    missingAudience.push('Who is this response intended for? (e.g. Technical Leads, Beginners, Board Members).');
    suggestedImprovements.push('Define audience: "Target audience: C-Level Executives looking for concise takeaways."');
  }

  if (!hasFormatSpec) {
    weaknesses.push('Missing explicit output structure instructions.');
    missingFormat.push('Unclear whether response should be Markdown, JSON, Bullet points, or Table.');
    suggestedImprovements.push('Add format instruction: "Format your response as a clean Markdown document with headers and tables."');
  }

  if (!hasReasoning) {
    suggestedImprovements.push('Include Chain-of-Thought directive: "First list key assumptions, then provide the solution step-by-step."');
  }

  // Generate Enhanced Versions
  const betterVersion = generateBetterVersion(text, hasRole, hasFormatSpec, hasConstraints);
  const professionalVersion = generateProfessionalVersion(text);
  const expertVersion = generateExpertVersion(text);

  return {
    overallScore,
    wordCount,
    tokenEstimate,
    metrics,
    judge: {
      strengths: strengths.length ? strengths : ['Basic prompt structure present.'],
      weaknesses: weaknesses.length ? weaknesses : ['Minor polish required for maximum token efficiency.'],
      missingContext: missingContext.length ? missingContext : ['None. Excellent contextual grounding!'],
      missingConstraints: missingConstraints.length ? missingConstraints : ['None. Well-constrained prompt.'],
      missingAudience: missingAudience.length ? missingAudience : ['None. Audience explicitly clear.'],
      missingFormat: missingFormat.length ? missingFormat : ['None. Output format defined.'],
      suggestedImprovements
    },
    versions: {
      better: betterVersion,
      professional: professionalVersion,
      expert: expertVersion
    }
  };
}

function createEmptyAnalysis(): PromptAnalysisResult {
  return {
    overallScore: 0,
    wordCount: 0,
    tokenEstimate: 0,
    metrics: [],
    judge: {
      strengths: [],
      weaknesses: [],
      missingContext: [],
      missingConstraints: [],
      missingAudience: [],
      missingFormat: [],
      suggestedImprovements: []
    },
    versions: {
      better: '',
      professional: '',
      expert: ''
    }
  };
}

function generateBetterVersion(original: string, hasRole: boolean, hasFormat: boolean, hasConstraints: boolean): string {
  let res = '';
  if (!hasRole) res += '### Persona\nYou are an expert consultant and world-class domain specialist.\n\n';
  res += `### Primary Task\n${original}\n\n`;
  if (!hasConstraints) res += `### Constraints\n- Provide direct, clear, and actionable responses.\n- Avoid unnecessary conversational filler or pleasantries.\n\n`;
  if (!hasFormat) res += `### Output Format\nStructure your output using clear Markdown headings, bullet points, and code/table blocks where appropriate.`;
  return res.trim();
}

function generateProfessionalVersion(original: string): string {
  return `### SYSTEM ROLE
You are a Senior Technical Consultant specializing in high-impact execution and strategic clarity.

### CONTEXT & TASK
The user requires a comprehensive solution for:
"${original}"

### CORE DIRECTIVES
1. **Depth & Precision**: Analyze the request thoroughly, accounting for edge cases, performance, and best practices.
2. **Structure**: Organize the response into logical sections with key takeaways highlighted.
3. **Actionability**: Ensure all recommendations or deliverables are immediately implementable.

### CONSTRAINTS
- Strict adherence to accuracy; do not speculate or extrapolate facts without explicitly noting assumptions.
- Maintain a professional, crisp tone throughout.

### OUTPUT FORMAT
Present the final result in clean GitHub-flavored Markdown with table summaries where applicable.`;
}

function generateExpertVersion(original: string): string {
  return `<!-- PROMPTFORGE AI EXPERT PROMPT FRAMEWORK v2.4 -->
[SYSTEM_INSTRUCTION]
Act as a Lead AI Researcher and Principal Domain Architect. Execute the following multi-stage reasoning task with maximum precision.

[INPUT_OBJECTIVE]
${original}

[CHAIN_OF_THOUGHT_PROTOCOL]
Before presenting your final answer, execute these internal reasoning steps:
1. **Deconstruct Requirement**: Identify core constraints, explicit requirements, and implicit expectations.
2. **Synthesize Best Practices**: Compare potential approaches against industry standards.
3. **Formulate Solution**: Build the final response step-by-step, validating consistency.

[OUTPUT_SCHEMA]
Provide your final output structured as follows:
- **Executive Summary**: 2-3 sentence high-level overview.
- **Detailed Solution**: Bulleted or step-by-step breakdown with exact technical depth.
- **Implementation Guide**: Concrete action items or runnable code snippets.
- **Risks & Edge Cases**: Potential pitfalls and mitigation strategies.

[GUARDRAILS & RULES]
- IF data is incomplete THEN explicitly state assumptions instead of hallucinating.
- DO NOT include introduction/outro filler (e.g. "Sure, here is your answer").
- Output language: Technical, unambiguous, structured.`;
}

export function comparePrompts(originalText: string, improvedText: string): PromptComparisonData {
  const origAnalysis = analyzePromptText(originalText);
  const impAnalysis = analyzePromptText(improvedText);

  const qualityDiffPercent = impAnalysis.overallScore - origAnalysis.overallScore;
  const tokenDiffPercent = Math.round(((impAnalysis.tokenEstimate - origAnalysis.tokenEstimate) / Math.max(1, origAnalysis.tokenEstimate)) * 100);
  
  const readabilityOriginal = Math.min(95, Math.max(40, 60 + (origAnalysis.wordCount > 10 ? 15 : 0)));
  const readabilityImproved = Math.min(98, Math.max(75, 82 + (impAnalysis.metrics.find(m => m.name === 'Clarity')?.score || 70) * 0.15));

  const successProbabilityOriginal = Math.min(95, Math.max(30, origAnalysis.overallScore * 0.85));
  const successProbabilityImproved = Math.min(99, Math.max(80, impAnalysis.overallScore * 0.96));

  return {
    originalText,
    improvedText,
    originalScore: origAnalysis.overallScore,
    improvedScore: impAnalysis.overallScore,
    originalTokens: origAnalysis.tokenEstimate,
    improvedTokens: impAnalysis.tokenEstimate,
    qualityDiffPercent,
    tokenDiffPercent,
    readabilityOriginal,
    readabilityImproved,
    successProbabilityOriginal,
    successProbabilityImproved
  };
}
