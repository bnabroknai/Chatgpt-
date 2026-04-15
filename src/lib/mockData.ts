import { Project, AIModel, SystemHealth } from '../types';

export const AI_MODELS: AIModel[] = [
  { id: 'gemini-pro', name: 'Gemini Pro', provider: 'Gemini', specialty: 'Long Research / NotebookLM', color: 'bg-blue-500' },
  { id: 'gpt-4', name: 'ChatGPT', provider: 'OpenAI', specialty: 'Fast Brainstorming / Cleanup', color: 'bg-green-500' },
  { id: 'claude-3', name: 'Claude 3', provider: 'Anthropic', specialty: 'Structured Writing / Long Form', color: 'bg-orange-500' },
  { id: 'flash-ui', name: 'Flash UI', provider: 'Gemini', specialty: 'Rapid Frontends / UI Code', color: 'bg-purple-500' },
  { id: 'elevenlabs', name: 'ElevenLabs', provider: 'ElevenLabs', specialty: 'Voice Generation', color: 'bg-yellow-500' },
  { id: 'midjourney', name: 'Midjourney', provider: 'Midjourney', specialty: 'Image Generation', color: 'bg-pink-500' },
];

export const MOCK_PROJECTS: Project[] = [
  {
    id: 'crawfish-app',
    name: 'Crawfish App MVP',
    status: 'active',
    tasks: [
      { id: 't1', title: 'Finalize recipe database', status: 'ready' },
      { id: 't2', title: 'Generate UI mockups', status: 'in-progress' },
      { id: 't3', title: 'API Integration', status: 'blocked' },
    ],
    blocks: [
      { id: 'b1', type: 'research', title: 'Competitor Analysis', content: 'Analyzing 5 local crawfish apps...', assignedAIId: 'gemini-pro', status: 'completed' },
      { id: 'b2', type: 'build', title: 'React Components', content: 'Generating Card and Grid components...', assignedAIId: 'flash-ui', status: 'running' },
      { id: 'b3', type: 'media', title: 'Branding Assets', content: 'Creating logo and splash screen...', assignedAIId: 'midjourney', status: 'idle' },
    ],
    memory: [
      { id: 'm1', key: 'Brand Color', value: '#E11D48', category: 'brand' },
      { id: 'm2', key: 'Voice Tone', value: 'Casual, Southern', category: 'style' },
    ],
  },
  {
    id: 'bop-chronicles',
    name: 'BOP Chronicles',
    status: 'active',
    tasks: [
      { id: 't4', title: 'Script for Episode 2', status: 'in-progress' },
      { id: 't5', title: 'Voiceover recording', status: 'todo' },
    ],
    blocks: [
      { id: 'b4', type: 'media', title: 'Script Draft', content: 'Drafting the narrative arc...', assignedAIId: 'claude-3', status: 'completed' },
    ],
    memory: [
      { id: 'm3', key: 'Character Voice', value: 'Gravely, Noir', category: 'style' },
    ],
  },
];

export const INITIAL_HEALTH: SystemHealth = {
  tokenUsage: 65,
  storageUsage: 42,
  costEstimate: 12.45,
  activeExports: 2,
  failedTasks: 1,
};
